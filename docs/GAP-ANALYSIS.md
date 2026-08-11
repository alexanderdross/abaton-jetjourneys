# Gap analysis: built site vs. the brief

What the repo actually contains, measured against [SPEC.md](./SPEC.md). Items
blocked on the client are in [OPEN-DECISIONS.md](./OPEN-DECISIONS.md); the member
portal is in [CIRCLE-BACKLOG.md](./CIRCLE-BACKLOG.md).

Legend: **[x]** done, **[~]** partly done, **[ ]** not started,
**[!]** blocked on a client decision.

---

## Summary

The public site is a real, working replacement for the old Wix site: eight
routes, bilingual with localised German URLs, five journeys with full
itineraries, complete legal texts, a working enquiry pipeline, and a deploying
CI. Measured against the brief, the shortfalls fall into three groups:

1. **Two structural pieces are missing entirely**, THE ABATON EXPERIENCE page
   and the `status` field that drives most of the journey UI the brief describes.
2. **The founder story, which the brief calls the actual competitive moat, is
   absent from the site**, Isabell is never named publicly.
3. **Owner-editable content does not exist.** Every price, date or status change
   is a code commit and a redeploy. This is the single largest outstanding item.

Content-wise, four of five journeys carry routes the client has since revised.
Those are flagged in-file and must not be rewritten from the spec without
confirmation.

---

## Section 3, global requirements

| | Requirement | State |
|---|---|---|
| [x] | Bilingual DE/EN, every page and field | next-intl, English at `/`, German at `/de` with localised segments (`src/i18n/routing.ts`). Journey content carries `en`/`de` side by side, zod-validated, so a missing translation fails the build. EN/DE parity is enforced by `messages/messages.test.ts`. |
| [~] | Default language by region | Not implemented. next-intl negotiates from `Accept-Language`, the brief asks for German for `.de`-region visitors specifically. The manual switcher exists. |
| [x] | Responsive | Tailwind breakpoints throughout, mobile nav in `src/components/Header.tsx`. |
| [ ] | Owner-editable content, no developer needed | **Not met.** No `/admin`, no CMS, no API routes, no database. See OPEN-DECISIONS 6.2. |
| [!] | Brand look and colour/type system | The site uses its own tokens (`src/app/globals.css`, Cormorant Garamond + Inter), which do not match the print palette the brief proposes. Needs sign-off, OPEN-DECISIONS 4.1. |
| [x] | Legal pages | Imprint, privacy, T&Cs, all substantial and bilingual. |
| [~] | Footer: address, legal links, partner logos | Address and legal links present. **No partner-logo area** (OPEN-DECISIONS 4.4). |
| [ ] | Brochure download | No PDF in `public/`; the copy promises a brochure by email instead (OPEN-DECISIONS 4.3). |
| [~] | SEO: unique meta, OG, Twitter cards, JSON-LD | Per-page titles/descriptions, canonical + hreflang everywhere including legal pages, `TravelAgency` + `TouristTrip` + `BreadcrumbList` JSON-LD, sitemap, robots. **Missing: any `og:image`/`twitter:image`.** `summary_large_image` is declared with no image behind it. |
| [~] | Image optimisation, no raw images | `next/image` everywhere, zero raw `<img>`, zero Wix URLs. But `NEXT_PUBLIC_CF_IMAGES="0"` in `wrangler.jsonc`, so production currently serves the (downscaled) originals rather than edge-transformed AVIF/WebP. Flipping it needs Transformations enabled on the zone. |
| [x] | SEO title attributes on every link | Header, footer, breadcrumbs, journey cards, CTAs and legal links all carry localised, descriptive titles. Guarded by `src/components/link-titles.test.ts`. |

## Section 4, site map and navigation

| | Item | State |
|---|---|---|
| [x] | HOME, JOURNEYS, ABOUT, CONTACT | All present. |
| [ ] | THE ABATON EXPERIENCE | **Does not exist.** No route, no nav entry, no copy. This is also why 11 assets under `public/images/{experiences,aircraft,gallery}` are unreferenced, they were gathered for this page. |
| [ ] | PRIVATE LOGIN | Absent, expected while the Circle is deferred. |
| [x] | Legal pages | Present and linked from the footer. |

Nav is 3 items (`src/components/Header.tsx`) against the specified 6.

## Section 5, the `Journey` data model

Journeys are compile-time TypeScript validated by zod (`src/lib/journeys.ts`),
not database rows.

| | Spec field | State |
|---|---|---|
| [x] | `slug`, `tagline`, `heroImage`, `gallery`, `nights` | Present. `heroImage`/`gallery` are richer than specified (localised alt text). |
| [~] | `name` | Present as `title`. |
| [~] | `priceFromDoubleOccupancy`, `priceFromSingleOccupancy` | Present as `priceFrom` / `priceFromSingle`; occupancy basis undocumented (OPEN-DECISIONS 2.2). |
| [~] | `dayByDay` | Present as `itinerary` (day, city, title, description). |
| [~] | `included` | Present as `inclusions`. |
| [~] | `hotelsDescription` | Present as `hotelCategory`, a one-line label, not a description. |
| [~] | `startEndCity` | Partially: optional `departureCity`, no end city. |
| [~] | `route` | Degraded: `string[]` of city names, not `RouteStation[]` (no country, no nights-per-station, no order). |
| [ ] | `status` | **Missing.** Only a boolean `published`. Everything the brief hangs off status is therefore unbuildable: the listing split, per-status CTAs, hiding day-by-day for interest-list journeys, `invitation_only` pricing. Wild Scandinavia reads "Preview 2028" yet renders exactly like a bookable journey. |
| [ ] | `durationDays` | Missing; days are inferred from `itinerary.length`. |
| [ ] | `guestsMin` / `guestsMax` | Missing; only the free-text `guestsLabel` ("6 to 10 guests"), not machine-readable. |
| [ ] | `currency` | Missing; EUR is hardcoded in `formatEUR()`. |
| [ ] | `upcomingDates` | Missing; a single free-text `nextDeparture` string, not structured dates. |
| [ ] | `bookingDeadlineDays` | Missing. |
| [ ] | `signatureMoments` | Missing. |
| [ ] | `excluded` | Missing, no exclusions content anywhere. |
| [ ] | `whoThisIsFor` | Missing, the lead-qualification paragraph the brief says to keep. |
| [ ] | `brochurePdf` | Missing. |

## Section 6, HOME

| | Item | State |
|---|---|---|
| [x] | Hero with primary + secondary CTA | Present. |
| [~] | Four brand pillars | Three pillars. **"Founder Hosted" is absent**, the brief calls it ABATON's actual point of difference against CONSUL, TCS et al. |
| [x] | "Why ABATON?" paragraph | Present as the intro section. |
| [!] | Featured journey | Present, but it features **Finest of Europe**, the journey flagged for removal. The brief wants Elegant Islands (OPEN-DECISIONS 1.4). |
| [ ] | Future Journeys section | Missing. The teaser block at the bottom of `src/app/[locale]/page.tsx` just re-renders the same featured journey. |
| [!] | Copy accuracy | Home copy says journeys begin and end in **Munich**; only Finest of Europe does (OPEN-DECISIONS 3.2). |

## Section 7, JOURNEYS

| | Item | State |
|---|---|---|
| [ ] | Listing split into "Currently Released" / "Journeys in Development" | Flat grid. Blocked on `status`. |
| [ ] | Interest-list explanatory line | Missing. |
| [x] | Detail: hero, tagline, at-a-glance, price, day by day, included, gallery, single CTA | All present, and the CTA wording follows the brief ("Request a Journey", not "Book This Tour"). |
| [~] | The Route | Renders as a plain text flow line (`src/components/RouteLine.tsx`). The brief asks for a custom-illustrated map per journey in brand colours (OPEN-DECISIONS 4.2). |
| [ ] | Signature Moments | Missing. |
| [ ] | Hotels narrative | Only the one-line `hotelCategory`. |
| [ ] | Excluded | Missing. |
| [ ] | Who this journey is for | Missing. |
| [~] | Request flow | One consistent enquiry path from both journey pages and Contact, correctly non-binding in effect. But the form is missing required fields, below. |

### Request form (sections 7.3 and 11)

| | Field | State |
|---|---|---|
| [~] | First name*, Last name* | A single `name` field. |
| [x] | Email*, Phone | Present. |
| [ ] | Country of Residence* | **Missing, and the brief marks it required.** |
| [x] | Journey of Interest | Present, prefilled and read-only on detail pages. |
| [x] | Number of Travellers | Present as `guests`. |
| [ ] | Additional Travellers (names) | Missing. |
| [x] | Further Requests or Remarks | Present as `message`. |
| [ ] | Explicit non-binding note | Missing. |
| [ ] | Catalogue opt-in checkbox | Missing. The existing checkbox is privacy consent. |
| [ ] | "Isabell will personally contact you" | Not used; the copy is the generic version the brief suggests replacing. |
| [x] | Submissions reach a human | Server action -> zod -> Turnstile -> Resend (`src/lib/actions.ts`). |
| [ ] | Lead persistence | Nothing is stored. No DB, no CRM, no queue. An email is the only record. |

## Section 8, THE ABATON EXPERIENCE

| | Item | State |
|---|---|---|
| [ ] | Entire page | **Not started.** The ABATON Rhythm narrative and the six pillars (Private Aviation, Hotels with Character, Culinary Discovery, Privileged Experiences, Founder Hosted, A Small Circle) exist nowhere in the codebase. |

## Section 9, ABOUT

| | Item | State |
|---|---|---|
| [~] | Founder-led positioning | Conveyed in the abstract ("founded by a private pilot"). |
| [ ] | Isabell Buchner named | **She is never named publicly**, only as `managingDirector` in `src/lib/site.ts` for the imprint. |
| [ ] | Founder photo | No portrait asset exists (OPEN-DECISIONS 3.3). |
| [ ] | "Every journey is personally hosted by the founder who created it." | Absent. The brief calls this exact sentence the moat. |
| [~] | "Why ABATON" bullets | Three values, not the six specified. Missing: Aviation Standards (EASA), Legal & Financial Security (German package travel law), Boutique Ownership, Efficient Routing. |
| [ ] | CTA "Speak with the Founder" | Currently "Request a Journey". |

## Section 15, non-functional

| | Item | State |
|---|---|---|
| [x] | Server-rendered/static pages, meta tags, hreflang | All pages are SSG; hreflang and canonical resolve through `src/lib/i18n-urls.ts`, unit-tested. |
| [~] | WCAG AA baseline | Good foundations: localised alt text everywhere, labelled form controls, `aria-live` status, focus rings, `prefers-reduced-motion`, breadcrumb landmarks, skip-to-content link, localised language switcher. Gaps: the mobile menu has no `aria-controls`, no focus trap and no body-scroll lock; and there is **no DOM or a11y testing at all** (`vitest.config.ts` runs a node environment, no Playwright/axe/Testing Library), so nothing here is verified by machine. |
| [ ] | `/admin` editability | Not met, see above. |
| [x] | Legal content ported | Done. |
| [!] | Security, passport handling | Deferred with the Circle. The hard requirement is preserved in CIRCLE-BACKLOG.md. |

## Section 16, build order

| Phase | State |
|---|---|
| 1. Public site | **Mostly done.** Missing THE ABATON EXPERIENCE and the Journal (which the brief never actually defines, OPEN-DECISIONS 6.1). |
| 2. `Journey` model + `/admin` CRUD | **Not started.** The largest remaining item and a prerequisite for everything after it. |
| 3 to 6. The Circle | **Not started**, deferred by agreement. |

---

## Fixed in this pass

Documentation, launch blockers and mechanical gaps, all verified against a
production build.

- **Imprint completed.** `HRB 204597` now renders. The registering court and VAT
  ID are still unknown, so those lines are **omitted** rather than shown as
  `[Amtsgericht ...]` / `[DE...]` placeholders (OPEN-DECISIONS 5.1).
- **A fourth placeholder found and handled**: the T&Cs named the
  insolvency-protection provider as `[Name des Versicherers / Absicherers]`
  (Section 651r BGB). Now routed through `company.insolvencyInsurer`
  (OPEN-DECISIONS 5.5). Both are guarded by a test that fails on any
  `"[...]"` literal in a legal page.
- **Privacy policy corrected.** It described Cloudflare Web Analytics that was
  never injected on the site. The clause now states, truthfully, that no
  analytics or tracking is used. The stale README row was removed too.
- **Silent lead loss fixed.** `src/lib/actions.ts` returned `status: "success"`
  when `RESEND_API_KEY` was unset, so a misconfigured deploy accepted enquiries
  and discarded them. It now fails loudly.
- **`journeySlug` wired through.** The detail form had been submitting it since
  it was written; the action never read it. Enquiries now carry the exact
  journey, not just its display title.
- **JSON-LD URLs fixed.** They were built as `${siteUrl}/${locale}/journeys/...`,
  which resolved in **neither** locale (English has no prefix; German uses
  `/de/reisen/`). Now routed through the existing `localizedPath()`, with tests.
- **Link title attributes**, the section 3 requirement, across header, footer,
  breadcrumbs, journey cards, CTAs and legal links, in both locales.
- **Skip-to-content link** and an `id` on `<main>`.
- **Language switcher localised**: `aria-label` was hardcoded English; buttons
  now carry titles.
- **hreflang on the legal pages**, which previously declared none.
- **Per-page Open Graph** on `/journeys`, `/about`, `/contact`, which had been
  inheriting the site-default title and description.
- **Sitemap**: added `x-default`. Legal pages were deliberately **not** added,
  they are `noindex` and disallowed in `robots.ts`, so listing them would
  contradict the crawl directives. A test now pins that.
- **Footer year** no longer hardcoded to 2024.
- **Dead code removed**: seven unreferenced i18n keys and `Media`'s unused
  `label` prop.
- **Contested journey content flagged in-file** so the stale routes are not
  "tidied up" by someone who does not know they are contested.

Test suite grew from 61 to 86 cases; typecheck, lint, format and
`next build` all pass.
