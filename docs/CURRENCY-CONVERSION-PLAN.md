# Plan: local currency display via the ECB reference rates

> **Status.** Live on the interim domain since 11 August 2026, drawing real ECB
> rates. The currency set is confirmed as EUR, USD, CAD, JPY, AUD (decision D1).
> What is still open, and what deliberately was not built, is in sections 9 and
> 10. Owner decisions are mirrored into
> [OPEN-DECISIONS.md](./OPEN-DECISIONS.md) section 2.4.

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

**Secondary source: deliberately not built.** The obvious candidate is the ECB
Data Portal (`https://data-api.ecb.europa.eu/service/data/EXR/...`), on a second
host. It was left out because its exact response shape could not be verified
from the build sandbox, whose egress proxy blocks the ECB, and a fallback path
tested only against an assumed fixture is worse than no fallback: it looks
covered and is not. Revisit once phase 0 confirms the real payload. Until then
the failure path is the committed snapshot in section 3.1.

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

**Currencies shipped (confirmed, D1).** `EUR`, `USD`, `CAD`, `JPY`, `AUD`. All
four non-EUR currencies are in the ECB reference rates, and a payload missing
any of them is rejected as malformed. Note that AED and other Gulf currencies
are not published by the ECB at all, so a visitor from Dubai stays on EUR, as
does every other unmapped country.

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
  undersells the actual EUR price after a rate move: nearest 100 for USD, CAD
  and AUD, nearest 10,000 for JPY.
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

- `src/lib/fx/currencies.ts`, the shipped currency set, the country map and the
  two cookie names.
- `src/lib/fx/ecb.ts`, fetch plus parse plus validate.
- `src/lib/fx/convert.ts`, conversion, rounding, formatting, freshness.
- `src/lib/fx/fallback-rates.ts`, committed snapshot.
- `src/app/api/fx/route.ts`, the endpoint.
- `src/components/fx/FxProvider.tsx`, client context: selected currency, rates,
  `setCurrency` (writes the cookie), single in-flight fetch shared across all
  price instances via a module level promise, result mirrored to
  `sessionStorage` so navigation inside the site does not refetch. Rates are
  only fetched once a non-EUR currency is in play, so a EUR visitor never pays
  for the request.
- `src/components/fx/CurrencySwitcher.tsx`, a native `select` next to
  `LanguageSwitcher` in the header, desktop and mobile menu.
- `src/components/fx/ConvertedPrice.tsx`, the secondary price line.
- `src/components/fx/FxNote.tsx`, the disclaimer, rendered only when a
  conversion is actually on the page.

Changed files:

- `src/app/[locale]/layout.tsx`, wraps the page in `FxProvider` (inside the
  existing `NextIntlClientProvider`).
- `src/components/Header.tsx`, mounts the switcher.
- `src/components/JourneyCard.tsx`, converted line under the `fromPrice` figure.
- `src/app/[locale]/journeys/[slug]/page.tsx`, converted lines for the double
  and single price in the sticky aside, plus the note.
- `src/app/[locale]/journeys/page.tsx` and `src/app/[locale]/page.tsx`, the note
  under the card grids.
- `messages/en.json` and `messages/de.json`, new `Currency` namespace, and
  `JourneyDetail.priceNote` now states that prices are agreed and invoiced in
  EUR.
- `src/middleware.ts`, geo cookie.
- `.dev.vars.example` and `wrangler.jsonc`, only if phase 3 (KV) is built.

Explicitly **not** changed: `src/components/JsonLd.tsx`. The `Offer` keeps
`priceCurrency: "EUR"` and the EUR amount. Search engines and AI answer engines
must see the contractual price, and a converted `Offer` would be both wrong and a
structured-data policy risk.

**Layout shift.** Everything that can be in view when the rates arrive reserves
its height: a 1rem line on the card, a 1.25rem line plus a 2.5rem note block in
the aside. The EUR figure and the request button never move. The notes under the
card grids are not reserved, they sit below the fold where a shift costs no CLS
and an empty reserved block would just be dead space.

## 6. Copy (new `Currency` namespace, both locales)

The repo enforces "no em dash" (`src/no-em-dashes.test.ts`) and translation
parity (`messages/messages.test.ts`). New keys:

| Key | EN | DE |
| --- | --- | --- |
| `approx` | `approx. {price}` | `ca. {price}` |
| `switcherLabel` | `Currency` | `Währung` |
| `switcherTitle` | `Show journey prices in another currency` | `Journey-Preise in einer anderen Währung anzeigen` |
| `rateNote` | `Amounts in other currencies are indicative, converted at the ECB euro reference rate of {date}. All journeys are agreed and invoiced in EUR.` | `Beträge in anderen Währungen sind Richtwerte, umgerechnet zum EZB-Euro-Referenzkurs vom {date}. Alle Journeys werden in EUR vereinbart und abgerechnet.` |

`rateNote` carries the attribution as well, naming the ECB euro reference rate
and its date, so no separate source line is needed. `JourneyDetail.priceNote`
now also states that prices are agreed and invoiced in EUR, which holds whether
or not a conversion is displayed.

Placement: `approx` next to each converted amount, `rateNote` once per page
wherever converted amounts appear. The rate date is formatted with
`Intl.DateTimeFormat` in the page locale.

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
- `src/lib/fx/currencies.test.ts`, the shipped set, US to USD, CA to CAD, JP to
  JPY, AU to AUD, US dollar territories, DE and AE and unknown to EUR, and that
  the snapshot covers every required rate.
- `src/app/api/fx/route.test.ts`, mocked `fetch`: success path, upstream 500,
  network failure, timeout, malformed XML. All five answer 200, the four
  failures with `stale: true`.
- Existing suites (`messages.test.ts`, `no-em-dashes.test.ts`) cover the new copy
  automatically.

41 tests, run with `npm test` alongside the existing 86. The UI components have
no unit tests, the vitest config only picks up `.ts`, and the logic they render
is fully covered in `src/lib/fx`.

## 9. Phasing and effort

| Phase | Content | Status |
| --- | --- | --- |
| 0 | Verify the live ECB response from a deployed Worker, then refresh `fallback-rates.ts` from it. Confirmed on 11 August 2026: production `/api/fx` answers `"source":"ecb"`, `"stale":false` with that day's reference date and all 29 published currencies, so the parser written against the documented format holds against the real document. Snapshot refreshed from the same response. | done |
| 1 | `src/lib/fx/*`, the API route, the fallback snapshot, tests. No UI. | done |
| 2 | Provider, switcher, `ConvertedPrice`, `FxNote`, card and detail wiring, copy in both locales, geo cookie in the middleware. | done |
| 3 | Optional KV plus cron hardening. | open, 2 to 3 h |
| 4 | Out of scope here: a `ja` locale for Japanese guests. Currency is not language. JPY display works today with the English UI, but actually serving that audience means new routing, translations and hreflang, which is its own project. | separate |

The feature is built but the site is still `NEXT_PUBLIC_NOINDEX=1` on the interim
domain. Going live with visible conversions should wait for OPEN-DECISIONS 2.1,
since converting a price list that is itself unconfirmed just multiplies the
uncertainty.

## 10. Decisions for Isabell

- **D1, currency set. Confirmed:** EUR, USD, CAD, JPY, AUD. Built. AED and other
  Gulf currencies were not available from the ECB in any case.
- **D2, safety margin.** Built with none beyond rounding up. Confirm, or name a
  percentage and the step in `convert.ts` changes.
- **D3, automatic detection.** Built as recommended: preselect by visitor
  country, switcher always visible, EUR always selectable. Drop the middleware
  cookie if manual-only is preferred.
- **D4, placement.** Built on both the cards and the detail page. Removing the
  card line is a two-line change if the collection grid should stay quieter.
- **D5, privacy page.** Drafted, awaiting legal sign-off. The privacy page had
  no cookie section at all, so it now has one naming all three cookies the site
  sets: `NEXT_LOCALE` (session), `abaton_fx` (one year) and `abaton_fx_geo`
  (30 days). All three are described as strictly necessary under Section 25(2)
  no. 2 TDDDG. That classification is uncontroversial for the two the visitor
  triggers themselves. **The one to have confirmed is `abaton_fx_geo`**, which
  is written without any visitor action, from Cloudflare's country signal. It
  holds nothing but a currency code and no identifier, which is the usual
  ground for treating a display preference as necessary, but ABATON's adviser
  should confirm it. If they would rather not argue it, D3 is the escape hatch:
  drop the geo preselection, keep the manual switcher, and the cookie
  disappears with it.
