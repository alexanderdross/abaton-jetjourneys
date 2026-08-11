# Plan: local currency display via the ECB reference rates

> **Status.** Implementation plan, nothing of this is built yet. Owner decisions
> are listed in section 10 and mirrored into
> [OPEN-DECISIONS.md](./OPEN-DECISIONS.md) section 2.

## 1. Goal and hard constraint

Journey prices are published in EUR (`priceFrom`, `priceFromSingle` in
`src/content/journeys/*`). The main audiences are guests from the United States,
Canada and Japan, who cannot judge a EUR figure at a glance.

The hard constraint, and the reason this is a display layer and not a pricing
layer: **EUR stays the price.** ABATON contracts, invoices and collects in EUR
(SPEC.md section 1: bank transfer, 30 percent deposit, no on-site payment
processing). A converted number is an orientation aid with no commercial
meaning, so it must:

- never replace the EUR figure, only accompany it,
- always carry the `approx` marker, the rate date and the source,
- never appear in JSON-LD, sitemaps, emails or the request form.

Everything below follows from that.

## 2. Rate source

**Primary: ECB euro foreign exchange reference rates, daily file.**

```
https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml
```

- One request returns every published currency (roughly 30), about 2 KB.
- Quoted as units of foreign currency per 1 EUR, which is exactly the direction
  we need: `amountEur * rate`.
- Updated around 16:00 CET on TARGET working days. No update at weekends or on
  TARGET holidays, the previous rate simply stays current. Since we always print
  the rate date next to the number, that is correct behaviour, not a bug.
- Free to reuse with attribution, and explicitly published for information
  purposes rather than for transactions. Our disclaimer has to say so.

**Secondary (fallback if the daily file fails): ECB Data Portal API.**

```
https://data-api.ecb.europa.eu/service/data/EXR/D.USD+CAD+JPY+GBP+CHF+AUD+SGD.EUR.SP00.A?lastNObservations=1&format=jsondata
```

Verbose, but a second independent host.

**Parsing note (important for the Workers runtime).** There is no `DOMParser` on
Cloudflare Workers, and `nodejs_compat` does not provide one. Do not add an XML
library for a 2 KB file. The daily file has a fixed one-line-per-currency shape:

```xml
<Cube time='2026-08-11'>
  <Cube currency='USD' rate='1.0921'/>
```

Extract with two regular expressions (`time='([\d-]{10})'` and a global
`currency='([A-Z]{3})'\s+rate='([\d.]+)'`), validate the result with zod (date
matches `YYYY-MM-DD`, every rate finite and greater than zero, all required
currencies present) and reject the whole payload if validation fails. This is the
same content-validated-at-the-boundary approach `src/lib/journeys.ts` already
uses.

**Currencies to ship.** Only ECB-covered ones, so the set is limited to what the
reference rates actually contain: `USD`, `CAD`, `JPY`, `GBP`, `CHF`, `AUD`,
`SGD`. Note that AED and other Gulf currencies are **not** in the ECB list, so a
visitor from Dubai stays on EUR. Everything unmapped falls back to EUR.

## 3. Delivery architecture

The journey pages are statically prerendered (`generateStaticParams` in
`src/app/[locale]/journeys/[slug]/page.tsx` and `layout.tsx`) and served from
Cloudflare via OpenNext. A per-visitor rate must therefore not be baked into the
HTML, or the static cache would serve one visitor's currency to everybody.

Split it in three:

1. **Static HTML keeps EUR.** Unchanged server rendering, unchanged JSON-LD,
   unchanged indexability.
2. **A cached JSON endpoint serves the rates**, identical for all visitors, so it
   caches perfectly at the edge.
3. **A small client component adds the converted line after hydration**, driven
   by a cookie plus a manual switcher.

### 3.1 Rate endpoint

`src/app/api/fx/route.ts`, `GET`, response shape:

```jsonc
{
  "base": "EUR",
  "date": "2026-08-11",      // ECB reference date, not fetch time
  "rates": { "USD": 1.0921, "CAD": 1.4832, "JPY": 171.44, ... },
  "source": "ecb",           // "ecb" | "fallback"
  "stale": false             // true when the bundled snapshot was used
}
```

Behaviour:

- `fetch` the ECB file with `AbortSignal.timeout(2500)` and
  `cf: { cacheTtl: 21600, cacheEverything: true }`, so the Cloudflare edge cache
  absorbs almost all upstream traffic.
- On any failure (network, timeout, validation) try the Data Portal, then the
  bundled snapshot `src/lib/fx/fallback-rates.ts`, and answer **200 with
  `stale: true`** rather than an error. A price page must never break because a
  central bank had a bad afternoon. The UI silently omits the converted line when
  `stale` is true and the snapshot is older than the threshold in section 6.
- Response headers:
  `Cache-Control: public, max-age=3600, s-maxage=21600, stale-while-revalidate=604800`.
- The endpoint path sits under `/api`, which `src/middleware.ts` already excludes
  from the next-intl matcher, so no routing change is needed.

The bundled snapshot is a committed TypeScript file with a `date` and the rate
map, refreshed manually now and then. It exists so the very first request after a
cold start, and any total upstream outage, still has something plausible to show.

### 3.2 Optional hardening (phase 3, not required for launch)

Add a Workers KV namespace `FX_RATES` in `wrangler.jsonc` plus a cron trigger at
`0 15 * * *` UTC (roughly 17:00 CET, after the ECB publishes) that writes the
parsed payload to KV. The route handler then reads KV first and only fetches the
ECB on a KV miss. This removes the dependency on a live outbound call in the
request path entirely. Phase 1 does not need it: edge cache plus snapshot already
covers the realistic failure modes, and the KV binding adds deploy surface that
`wrangler.jsonc` currently does not carry.

### 3.3 Currency detection

- `src/middleware.ts` currently just exports `createMiddleware(routing)`. Wrap it:
  run the next-intl middleware, then on the returned response set the cookie
  `abaton_fx_geo` from the `CF-IPCountry` request header, mapped through
  `src/lib/fx/country-currency.ts`. `SameSite=Lax`, not `HttpOnly` (the client
  component reads it), 30 days.
- An explicit visitor choice lives in `abaton_fx` (1 year) and always wins over
  the geo cookie.
- Resolution order: `abaton_fx` cookie, then `abaton_fx_geo` cookie, then EUR.
- Note that currency and language stay independent: a US guest reading the German
  site still gets USD, and a German-domiciled guest reading English stays on EUR.

Setting a cookie in middleware does not vary the cached HTML, because the HTML
does not depend on it. Only the client component reads it.

## 4. Conversion and rounding

`src/lib/fx/convert.ts`, pure and fully unit tested:

```
convert(amountEur, rate, currency) -> number
formatPrice(amount, currency, locale) -> string
```

Rules:

- **Round up, never down**, to a clean step, so the indicative figure never
  undersells the actual EUR price after a rate move: nearest 100 for USD, CAD,
  CHF, GBP, AUD, SGD; nearest 10,000 for JPY.
- No decimals anywhere. `Intl.NumberFormat(locale, { style: "currency", currency,
  maximumFractionDigits: 0 })`, with `locale` being `de-DE` or `en-US` exactly as
  `formatEUR` in `src/lib/journeys.ts` already decides it.
- No extra safety margin on top of the rounding. Rounding up to the next 100 on a
  30,000 EUR journey already absorbs a rate move of well under a percent, and any
  visible markup would make the two numbers disagree in a way a guest can check.
  This is decision D2 in section 10 if Isabell wants a buffer anyway.
- EUR selected means the component renders nothing extra at all, no `approx`
  line, exactly today's output.

`formatEUR` stays untouched and stays the single source for the primary figure.

## 5. UI changes

New files:

- `src/lib/fx/ecb.ts`, fetch plus parse plus validate.
- `src/lib/fx/convert.ts`, conversion, rounding, formatting.
- `src/lib/fx/country-currency.ts`, country to currency map and supported list.
- `src/lib/fx/fallback-rates.ts`, committed snapshot.
- `src/app/api/fx/route.ts`, the endpoint.
- `src/components/fx/FxProvider.tsx`, client context: selected currency, rates,
  `setCurrency` (writes the cookie), single in-flight fetch shared across all
  price instances via a module level promise, result mirrored to
  `sessionStorage` so navigation inside the site does not refetch.
- `src/components/fx/CurrencySwitcher.tsx`, a `select` styled like
  `LanguageSwitcher`, placed next to it in `Header.tsx` for desktop and inside
  the mobile menu.
- `src/components/fx/ConvertedPrice.tsx`, renders the secondary line.

Changed files:

- `src/app/[locale]/layout.tsx`, wrap `children` in `FxProvider` (inside the
  existing `NextIntlClientProvider`).
- `src/components/Header.tsx`, mount the switcher.
- `src/components/JourneyCard.tsx`, add `<ConvertedPrice amount={journey.priceFrom} />`
  after the existing `fromPrice` span.
- `src/app/[locale]/journeys/[slug]/page.tsx`, add the converted line under
  `t("price")` in the sticky aside, plus the rate note under `priceUnit`. The
  single supplement (`priceSingle`) gets the same treatment.
- `messages/en.json` and `messages/de.json`, new `Currency` namespace.
- `src/middleware.ts`, geo cookie.
- `.dev.vars.example` and `wrangler.jsonc`, only if phase 3 (KV) is built.

Explicitly **not** changed: `src/components/JsonLd.tsx`. The `Offer` keeps
`priceCurrency: "EUR"` and the EUR amount. Search engines and AI answer engines
must see the contractual price, and a converted `Offer` would be both wrong and a
structured-data policy risk.

**No layout shift.** The converted line is server-rendered as an empty element
with a reserved height (`min-h-[1.25rem]` on the card, one reserved line in the
aside) and fades in when the rates arrive. The EUR figure never moves.

## 6. Copy (new `Currency` namespace, both locales)

The repo enforces "no em dash" (`src/no-em-dashes.test.ts`) and translation
parity (`messages/messages.test.ts`). New keys:

| Key | EN | DE |
| --- | --- | --- |
| `approx` | `approx. {price}` | `ca. {price}` |
| `switcherLabel` | `Currency` | `Waehrung` |
| `rateNote` | `Indicative conversion at the ECB reference rate of {date}. All journeys are contracted and invoiced in EUR.` | `Unverbindliche Umrechnung zum EZB-Referenzkurs vom {date}. Alle Journeys werden in EUR vereinbart und abgerechnet.` |
| `source` | `Source: European Central Bank` | `Quelle: Europaeische Zentralbank` |

`JourneyDetail.priceNote` gets one sentence appended in both locales, pointing
out that any non-EUR figure on the page is indicative.

Placement: `approx` next to each converted amount, `rateNote` once per page in
the price block, `source` once per page in the same small print. The rate date is
formatted with `Intl.DateTimeFormat` in the page locale.

**Staleness rule.** If the payload is older than 7 days (`stale` true and snapshot
date beyond the window), the component renders nothing. A wrong-looking
conversion is worse than none.

## 7. Legal and trust checklist

- EUR remains the only stated price, in the HTML, in structured data, in the
  brochure request and in every email. German price indication rules (PAngV) and
  the EU consumer-rights regime both key off the price actually charged, and that
  price is the EUR one.
- The ECB publishes these rates for information, not for transactions. The
  disclaimer says "indicative" and names the reference date, so nobody can read
  the number as a quote.
- Attribution to the ECB is shown on every page that displays a conversion.
- The geo cookie is a functional cookie holding a country-derived currency code,
  no identifier, no analytics use. It should still be named in the privacy page,
  which is a copy change on `src/app/[locale]/privacy/page.tsx`. Worth confirming
  with the same lawyer who reviewed the existing legal pages.

## 8. Tests

Following the existing vitest patterns (`src/lib/*.test.ts`):

- `src/lib/fx/ecb.test.ts`, parse a committed fixture of the real daily XML,
  assert date and rates, assert rejection of truncated or malformed payloads and
  of a payload missing a required currency.
- `src/lib/fx/convert.test.ts`, rounding direction and step per currency, JPY
  without decimals, EUR passthrough, `de-DE` and `en-US` formatting.
- `src/lib/fx/country-currency.test.ts`, US to USD, CA to CAD, JP to JPY, DE to
  EUR, unknown and missing country to EUR, and that every mapped currency exists
  in the ECB set.
- `src/app/api/fx/route.test.ts`, mocked `fetch`: success path, upstream 500,
  timeout, malformed XML. All four must answer 200, the last three with
  `stale: true`.
- Existing suites (`messages.test.ts`, `no-em-dashes.test.ts`) cover the new copy
  automatically.

## 9. Phasing and effort

| Phase | Content | Rough effort |
| --- | --- | --- |
| 0 | Verify the live ECB response shape and the exact currency list from a deployed Worker. This could not be checked from the build sandbox, whose egress proxy blocks `ecb.europa.eu`. Everything above assumes the documented format. | 0.5 h |
| 1 | `src/lib/fx/*`, the API route, the fallback snapshot, tests. No UI. | 4 to 6 h |
| 2 | Provider, switcher, `ConvertedPrice`, card and detail wiring, copy in both locales, geo cookie in the middleware. | 4 to 6 h |
| 3 | Optional KV plus cron hardening. | 2 to 3 h |
| 4 | Out of scope here: a `ja` locale for Japanese guests. Currency is not language. JPY display works today with the English UI, but actually serving that audience means new routing, translations and hreflang, which is its own project. | separate |

Phases 1 and 2 are independent of the open pricing decisions and can be built
now. Going live with visible conversions should still wait for OPEN-DECISIONS
2.1, since converting a price list that is itself unconfirmed just multiplies the
uncertainty.

## 10. Decisions for Isabell

- **D1, currency set.** Ship USD, CAD, JPY, GBP, CHF, AUD, SGD, everything else
  EUR? AED and other Gulf currencies are not available from the ECB at all.
- **D2, safety margin.** Recommendation is none beyond rounding up. Confirm, or
  name a percentage.
- **D3, automatic detection.** Recommendation is to preselect by visitor country
  and always keep the switcher visible with EUR as an option. Alternative is
  manual-only, no geo cookie, no privacy-page change.
- **D4, placement.** Converted price on both the journey cards and the detail
  page (recommended), or on the detail page only, to keep the collection grid
  quiet.
- **D5, privacy page.** Who signs off on the cookie wording.
