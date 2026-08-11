# Open decisions, owner: Isabell

Every item here blocks work that is otherwise ready to do. None of it should be
resolved by a developer guessing, which is the explicit instruction in section 13
of [SPEC.md](./SPEC.md): *"None of this should be silently 'fixed' by the
developer, these are calls for Isabell to make."*

Journey content files carry an in-code comment pointing here, so the stale routes
are not "tidied up" by someone who does not know they are contested.

## 1. Journey portfolio and routes

| # | Decision | Current state in the repo | Blocks |
|---|---|---|---|
| 1.1 | ~~**Elegant Islands route.**~~ **RESOLVED** by the 2027 briefing ([BRIEFING-ELEGANT-ISLANDS-2027.md](./BRIEFING-ELEGANT-ISLANDS-2027.md)). The corrected five-chapter route, nine-day itinerary, signature moments, inclusions, exclusions and FAQ are implemented. | `src/content/journeys/collection.ts`, live and `status: "open"`. | Nothing. Closed. |
| 1.2 | **Fascinating Balkan route.** Sofia and Ljubljana were removed; the current version is Budapest, Brasov, Rovinj/Pula, Kotor, Albanian Riviera (Vlora). Confirm and supply copy. | `src/content/journeys/collection.ts`, still includes Sofia and Ljubljana, no Vlora. | Full rewrite of route and itinerary. |
| 1.3 | **Wild Scandinavia route and year.** Redesign starts and ends in Hamburg, not Copenhagen, with Bergen, Tromsoe, Rovaniemi, Stockholm. The live site said 2028, confirm the current target date. | `src/content/journeys/collection.ts`, still Copenhagen-based, 7 stops, `nextDeparture` reads "Preview 2028". | Full rewrite of route and itinerary, plus the journey's status. |
| 1.4 | **Finest of Europe: keep or delete?** Section 13 flags this route for removal (too generically "reachable by everyone"), and notes the duplicate "Founders Edition" naming. Still open. | Live, now `status: "interest_list"` and no longer featured, the homepage slot moved to Elegant Islands per the briefing. Legacy URLs for both namings still 301 here. | Whether it stays in the portfolio at all. No longer blocks the homepage. |
| 1.5 | **Secrets of Europe vs. Mediterranean Essence.** They overlap geographically but are not the same route. Does Mediterranean Essence replace Secrets of Europe, or do both exist? | Secrets of Europe is live. `mediterranean-essence` does not exist anywhere in the repo or its git history. | Whether to write a new journey, rewrite an existing one, or both. |
| 1.6 | **World's Signature Journeys.** The site map lists it as `invitation_only` ("price dependent on the tour", no fixed dates). Is it still in the portfolio? | Not a journey; the legacy URL 301s to the journeys index. | Whether the `invitation_only` status needs building at all. |

## 2. Pricing

| # | Decision | Current state in the repo | Blocks |
|---|---|---|---|
| 2.1 | **One authoritative price list.** Three sources disagree (Partner Program PDF, Media Information PDF, live site). Example given in the brief: Elegant Islands at EUR 28,850 / EUR 30,220 / EUR 30,220. | The repo holds a fourth snapshot, sourced from the 2026 brochure. Elegant Islands is EUR 30,220 double / EUR 34,420 single. | Publishing any price. This must be settled before the site is indexed. |
| 2.2 | **Is `priceFrom` double occupancy?** The brief's model names the field `priceFromDoubleOccupancy`. The repo's `priceFrom` has no documented occupancy basis. | `src/lib/journeys.ts`. | Correct labelling on the journey detail page and in JSON-LD `Offer`. |
| 2.3 | **Elegant Islands price.** The 2027 briefing contains **no price at all**, and its hero fact line deliberately omits one. The existing figures were left in place. | 30,220 EUR double / 34,420 EUR single, from the 2026 brochure. | Whether the page should show a price at this stage, and which. Feeds decision 2.1. |
| 2.4 | **Local currency display.** The currency set is confirmed (EUR, USD, CAD, JPY, AUD) and built. Four smaller calls remain open, D2 to D5 in [CURRENCY-CONVERSION-PLAN.md](./CURRENCY-CONVERSION-PLAN.md) section 10: safety margin, automatic detection by visitor country, placement on the cards, and privacy-page wording for the two currency cookies. | Built. EUR stays the contractual price, an indicative converted line sits next to it, `src/lib/fx/*` and `src/components/fx/*`. | Nothing blocked, all four are built to a documented default. The display should not go live before 2.1 is settled, since converting an unconfirmed price list only multiplies the uncertainty. |

## 3. Copy and positioning

| # | Decision | Current state in the repo | Blocks |
|---|---|---|---|
| 3.1 | ~~**Guest count.**~~ **RESOLVED**: the 2027 briefing specifies 6 to 8 and asks for consistency across homepage, journey page, enquiry form and sales material. Applied site-wide. | `guestsLabel` on every journey, plus `Meta.defaultDescription`, `Home.heroSubtitle`, `Home.pillar2Body`, `About.body2`, `JsonLd.tsx`, `README.md`. `guestsMin`/`guestsMax` are now machine-readable on Elegant Islands. | Nothing, **except** the T&C clause below. |
| 3.2 | **Guest count in the T&Cs.** `terms-conditions/page.tsx` still says "sechs bis zehn Gaeste" / "six to ten guests" in **two** places. This was deliberately left alone: it is the minimum-participant term of the package-travel contract, not marketing copy. | Unchanged, with an in-file comment explaining why. | **Launch.** Marketing now says 6 to 8 while the contract says 6 to 10. Needs the legal review the briefing asks for in section 19. |
| 3.3 | **Departure hub.** Home copy says journeys begin and end in **Munich**, but only Finest of Europe does; the others start in Zurich, London, Budapest and Copenhagen. | `messages/{en,de}.json`, `Home.pillar1Body` and `Home.step3Body`. | A factual error on the homepage today. Fixing it depends on 1.1 to 1.5, since the hub set changes with the portfolio. |
| 3.4 | **Founder story.** Section 9 asks to name Isabell Buchner publicly, add a warm (non-stock) portrait, the private-pilot background, and the line "Every journey is personally hosted by the founder who created it." | Isabell is never named publicly, only as `managingDirector` in `src/lib/site.ts`. No portrait asset exists. | The About page rewrite, and the "Founder Hosted" pillar the brief calls the actual point of difference. Needs a photo from Isabell. |

## 4. Brand and assets

| # | Decision | Current state in the repo | Blocks |
|---|---|---|---|
| 4.1 | **Colour and type system.** The brief says no confirmed digital brand guideline exists, proposes the print palette (gold `#8A6D3B`, dark gold `#6B5326`, light gold `#F2ECE0`, `#333333` body, `#666666` secondary; serif headings), and asks Isabell to confirm against the current logo. | The built site uses its own token set in `src/app/globals.css` with Cormorant Garamond and Inter, which does not match the print palette above. | Whether the current look is signed off or needs re-tokenising. Cheap to change now, expensive later. |
| 4.2 | **Route-map illustrations.** Section 14 asks for a custom-illustrated map per journey in ABATON colours. A first draft exists for Elegant Islands, on the superseded route. | Routes render as a plain text flow line (`src/components/RouteLine.tsx`). | The "The Route" element of the journey detail template. Blocked on 1.1 to 1.3 for the routes themselves. |
| 4.3 | **Brochure PDF.** Section 3 asks for a downloadable brochure. | No PDF anywhere in `public/`. The site's copy promises a brochure by email instead. | The footer brochure download. |
| 4.4 | **Partner logos.** Section 3 asks for a dedicated footer space for them. | No partner logo area, no logo assets. | Needs the actual partner list and their logo files. |
| 4.5 | **Own photography.** The brief flags the licensed Unsplash filler as placeholder, not final brand assets. | Four of five journeys share generic stock heroes; only Finest of Europe has a dedicated one. | Nothing, but the site looks less bespoke than it claims to be until this is replaced. |
| 4.6 | **Hotel allocations.** The briefing names preferred planning properties (Connaught, Europe Hotel & Resort, Ashford Castle, The Torridon, The Balmoral) but warns: name them publicly only once inventory is secured. Decision taken: **no names**, categories only. | `stays` on Elegant Islands describes each property by category. Ashford Castle still appears as a route station and signature moment, because the briefing itself publishes it there and the journey is unintelligible without it. | Naming any property. Revisit once contracts are signed. |
| 4.7 | **Destination photography for Elegant Islands.** Briefing section 16 specifies a full image sequence (Mayfair, Killarney lakes and carriage, Ashford Castle and falconry, Highland wilderness, Edinburgh at golden hour, understated aviation). | `public/images/` contains **no destination imagery at all**. The journey runs on the generic stock hero it already had. | The editorial, cinematic look the briefing asks for. Needs a shoot or licensing. |

## 5. Legal and compliance

| # | Decision | Current state in the repo | Blocks |
|---|---|---|---|
| 5.1 | **Registergericht and VAT ID.** The imprint carries unfilled placeholders. The brief supplies HRB 204597 but not the registering court or the VAT number. | `src/app/[locale]/imprint/page.tsx`. | **Launch.** A German commercial site cannot go live with an incomplete imprint (Section 5 DDG). Needs the exact court name and the USt-IdNr. from Isabell. |
| 5.2 | **Web analytics.** The README and the privacy policy both described Cloudflare Web Analytics, but no analytics script was ever injected. The policy clause has been removed so the document describes reality. Confirm whether analytics should be added back (and the clause with it). | No analytics on the site. | Nothing. Flagged so the removal is a decision, not an oversight. |
| 5.3 | **Booking flow.** The original design brief specified a hidden, link-only binding booking page. Section 7.3 of this spec folds binding booking into the post-confirmation Circle flow instead. Confirm this replaces the hidden page rather than existing alongside it. | Neither exists. The site has one non-binding enquiry form. | The Circle's booking step, and whether a hidden page needs porting at all. |
| 5.4 | **Data protection sign-off for passport upload.** Section 12.5 is an explicit hard requirement: no passport upload ships without written sign-off from Isabell's data protection advisor. | Not applicable yet, the Circle is deferred. | See [CIRCLE-BACKLOG.md](./CIRCLE-BACKLOG.md). Recorded here so it survives the deferral. |
| 5.5 | **Insolvency-protection provider (Kundengeldabsicherer).** Section 12 of the T&Cs must name the insurer that issues the Sicherungsschein (Section 651r BGB). The name is not in any supplied material. | `src/lib/site.ts` -> `company.insolvencyInsurer`, currently empty, so the clause renders without a name rather than showing a `[...]` placeholder. | **Launch.** A package-travel operator must name its insolvency insurer. Needs the provider name from Isabell. |

## 6. Scope

| # | Decision | Current state in the repo | Blocks |
|---|---|---|---|
| 6.1 | **The Journal.** Sections 15 and 16 call it the primary SEO surface, but the brief contains no section 10 defining it. | Does not exist. | Whether to build it at all, and what it contains. |
| 6.2 | **Admin / owner-editable content.** Section 3 and section 15 require every `Journey` field to be editable at `/admin` without a deploy. This is the single largest outstanding item and is fundamentally at odds with the current content-as-code architecture. | No `/admin`, no CMS, no API routes, no database. Every price or date change is a commit and a redeploy. | Everything in section 16 phase 2 onward, including the Circle, which needs the same data store. |
| 6.3 | **Go-live switches.** The site is deliberately parked: `NEXT_PUBLIC_NOINDEX="1"`, interim domain `abaton.drossmedia.de`, empty Turnstile keys (running on always-pass test keys), and `NEXT_PUBLIC_CF_IMAGES="0"` so raw originals are served instead of edge-optimised images. | `wrangler.jsonc`. | Launch. See `DEPLOYMENT.md` for the cutover checklist. |
| 6.4 | **Journey URL scheme.** The briefing suggests `/jet-journeys/elegant-islands`. Kept at `/journeys/elegant-islands` and `/de/reisen/elegant-islands`. | Unchanged. The switch is a one-line change in `src/i18n/routing.ts`, but all eight targets in `legacy-redirects.ts` would break, three test files fail, and the currently indexable `/journeys/*` URLs would themselves need new 301s. No SEO upside identified. | Nothing today. Reopen only if the SEO specialist asks for it. |
