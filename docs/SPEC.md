# ABATON Jet Journeys, Website Rebuild: Build Instructions

> **Status of this file.** This is the client brief, stored verbatim as the
> source of truth for the rebuild. Do not edit it to reflect what has been
> built, that is the job of [GAP-ANALYSIS.md](./GAP-ANALYSIS.md). Open questions
> raised here are tracked in [OPEN-DECISIONS.md](./OPEN-DECISIONS.md), and the
> member portal (section 12) is parked in
> [CIRCLE-BACKLOG.md](./CIRCLE-BACKLOG.md).
>
> Note: the supplied brief has no section 2 and no section 10, although later
> sections reference "the Journal (section 10)". Section numbering below is left
> exactly as received.

---

**Purpose of this document:** This is a self-contained engineering brief for rebuilding the ABATON Jet Journeys website from scratch on GitHub, intended to be handed to Claude Code (or any developer) as the source of truth.

It combines:
1. Isabell Buchner's target structure for the new site (two-world concept: **Public Website** + **The ABATON Circle** member portal), and
2. The actual current content (text and images) inventoried from the live site at `https://www.abaton-jetjourneys.com/` (Wix), so nothing has to be re-written from scratch, only restructured, corrected and extended.

Everywhere the current live content conflicts with decisions already made elsewhere in ABATON's route-planning work, this is flagged explicitly under **"Content reconciliation needed"**, those are open decisions for Isabell, not for the developer to guess at.

---

## 1. Business context (for the coding agent)

ABATON Jet Journeys GmbH (Bad Kohlgrub, Germany, HRB 204597, managing director Isabell Buchner) is a founder-led boutique travel company running curated private-jet round-trips through Europe for small groups (6 to 10 guests). Trips are all-inclusive (flights, hotels, dining, ground transport, activities), sold via personal consultation rather than online checkout, and paid via bank transfer (30% deposit, balance 60 days before departure), **there is no on-site payment processing to build.**

The brand idea: "ABATON" (ancient Greek: a place accessible only to a select few), publicly you see ABATON, but full access is only for those who actually belong. This is the reasoning behind splitting the site into a public marketing layer and a private, login-gated "Circle" that only unlocks after a guest has booked.

---

## 3. Global requirements (apply to every page)

- **Bilingual:** every page and every content field needs German and English versions. Default language: German for `.de`-region visitors / English otherwise, with a manual switcher.
- **Responsive:** desktop, tablet, and phone, this was an explicit requirement from the original design brief and must not regress.
- **Owner-editable content:** Isabell must be able to, without a developer, add/edit/remove journeys, change dates, edit prices, and mark a journey's status (open for booking / interest list / in development / invitation only) from the admin area.
- **Brand look:** minimalistic, elegant, understated, closer to Four Seasons Private Jet, Porsche Travel Experience, or Abercrombie & Kent Private Jet than a package-tour site. Never use language like "BOOK THIS TOUR" for the public site, replace with "Request a Private Consultation" / "Request Journey Details" (see 7.3, this was flagged by Isabell as reading too much like a package-holiday webshop).
- **Colour/type system:** no confirmed digital brand guideline exists yet, use ABATON's established palette from its print materials as the default (gold `#8A6D3B`, dark gold `#6B5326`, light gold background `#F2ECE0`, dark grey `#333333` body text, mid grey `#666666` secondary text; Georgia or similar serif for headings, a clean sans-serif for body text) and confirm/adjust against the current logo before finalizing. **Flag this as a decision needed from Isabell** rather than guessing further.
- **Legal pages required:** Imprint, Privacy Policy (Datenschutz), Terms & Conditions, content already exists (see 9) and just needs porting/updating, not rewriting from scratch.
- **Footer:** company address/contact, legal links, and a dedicated space for partner logos (explicitly requested in the original brief, currently missing on the live site).
- **Brochure download:** a place to host/download the current PDF brochure (Partner Program / Media Information documents already exist as source material for this).
- **SEO Optimization:** every page must contain unique and seo optimized meta data such as meta data, Open Graph Tags, twitter cards and schema markup in JSON-LD format, to optimize for SEO and GEO (Generative Engine Optimization)
- **Image Optimization:** we do not want to serve raw images. Instead, every image will follow NextJS image best practices https://nextjs.org/docs/app/getting-started/images
- **Links/ Hyperlinks:** any link such as hyperlinks or links in header/ footer navigation must contain SEO optimized title attributes

---

## 4. Site map

```
PUBLIC SITE
HOME
|
+-- JOURNEYS
|   +-- Elegant Islands, status: NOW BOOKING / Private Preview
|   +-- Mediterranean Essence, status: INTEREST LIST
|   +-- Fascinating Balkan, status: INTEREST LIST
|   +-- Wild Scandinavia, status: INTEREST LIST
|   [see 13, reconcile against journeys currently live: Founders Edition/Finest of
|    Europe, Finest of Europe, Secrets of Europe, World's Signature Journeys]
|
+-- THE ABATON EXPERIENCE   (replaces "Travel Lifestyle")
+-- ABOUT
+-- CONTACT / Request a Private Consultation
+-- PRIVATE LOGIN
        |
        v
THE ABATON CIRCLE (auth-gated, unlocked only after a confirmed booking)
Dashboard ("Welcome back, [Name]")
|
+-- My Journey, Itinerary / Hotels / Flights / Experiences
+-- My Preferences, Personal Details / Dietary / Room / Interests
+-- Concierge, Chauffeur / Extra Nights / Reservations / Special Requests
+-- My Choices, Activities / Menus
+-- Documents, Confirmation / Invoices / Travel Protection / Travel Documents
+-- The Circle, Fellow Travellers / Journey Conversation / Member Recommendations
+-- Private Previews, Upcoming Journeys (early access for members)
```

Reduced top nav for the public site: `HOME | JOURNEYS | THE ABATON EXPERIENCE | ABOUT | CONTACT | PRIVATE LOGIN`.

---

## 5. Data model, `Journey`

This is the core content entity. Every field needs `de`/`en` text variants where marked (t).

```ts
interface Journey {
  slug: string;                     // e.g. "elegant-islands"
  name: LocalizedString;            // t
  status: "open" | "interest_list" | "in_development" | "invitation_only";
  tagline: LocalizedString;         // t one sentence, used in listings
  heroImage: ImageAsset;
  gallery: ImageAsset[];

  startEndCity: string;             // hub city, e.g. "London (GB)"
  durationDays: number;             // e.g. 9
  nights: number;                   // e.g. 8
  guestsMin: number;                // e.g. 6
  guestsMax: number;                // e.g. 10

  priceFromDoubleOccupancy: number; // EUR per person
  priceFromSingleOccupancy?: number;// EUR per person (brief explicitly asks for both)
  currency: "EUR";

  upcomingDates?: { start: Date; end: Date };
  bookingDeadlineDays: number;      // 90 days before departure per current FAQ

  route: RouteStation[];            // ordered, see below
  signatureMoments: LocalizedString[]; // t short evocative bullets, NOT a day-by-day recap
  dayByDay: DayEntry[];             // t detailed, public site shows a lighter version,
                                    //   full operational detail (times, meeting points) lives
                                    //   only in the Circle, see 11.1
  hotelsDescription: LocalizedString; // t e.g. "Five-star hotels and exceptional historic
                                    //   properties", only name a specific hotel (e.g. Ashford
                                    //   Castle) if it's confirmed as a signature element
  included: LocalizedString[];      // t
  excluded: LocalizedString[];      // t
  whoThisIsFor: LocalizedString;    // t

  brochurePdf?: FileAsset;
}

interface RouteStation {
  name: string;
  country: string;
  nights: number;
  order: number;
}

interface DayEntry {
  day: number;
  title: LocalizedString;           // t
  description: LocalizedString;     // t
}
```

`status` drives the UI: `open` shows price + "Request Journey Details"; `interest_list` shows "Join the Interest List" and hides exact day-by-day detail; `in_development` is the same but without a hero slot on the homepage; `invitation_only` (for World's Signature Journeys) shows "price dependent on the tour" and no fixed dates.

---

## 6. HOME

Must answer within ten seconds: what is ABATON, why is it different, who is it for.

**Hero**
- Headline: "ABATON Jet Journeys"
- Subline: "Curated Private Jet Journeys through Europe. Limited to a small circle of travellers."
- Primary CTA: "Explore Journeys"
- Secondary CTA (smaller): "Discover ABATON"

**Four brand pillars** (real copy exists on the current site under "What We Offer", restructure into four short, equal-weight tiles rather than paragraph form):
- Private Jet Connections
- Exceptional Places
- Founder Hosted, This is ABATON's actual point of difference against CONSUL, TCS, etc., every journey is personally hosted by the founder who created it.
- 6 to 10 Guests Only

**"Why ABATON?"**, one paragraph, strategy implied but not spelled out. Base copy (already exists, keep close to this):
> "Europe is remarkably diverse. Yet many of its most exceptional regions remain difficult to combine seamlessly. ABATON connects carefully selected destinations by private jet, creating journeys that would otherwise require lengthy transfers, multiple commercial connections or compromises in comfort."

Do not publicly explain the underlying selection criteria (airport suitability, regional-airfield strategy etc.), that stays internal.

**Featured Journey**, one journey gets the large hero treatment (image, route, 3 to 4 highlights, price from, CTA). For 2027 this should be **Elegant Islands**. Label as "Now accepting reservations" once bookable, or "Private Preview" until then. CTA: "Discover Elegant Islands".

**Future Journeys**, the other in-development journeys (Mediterranean Essence, Fascinating Balkan, Wild Scandinavia) each get: one strong hero image, one sentence, an approximate region, no fixed date, no full day-by-day. CTA: "Join the Interest List". This is deliberate scarcity, not an unfinished page, do not add "coming soon" placeholders that look incomplete.

---

## 7. JOURNEYS

### 7.1 Listing page
Two sections:
- **Currently Released**, journeys with `status: "open"`.
- **Journeys in Development**, journeys with `status: "interest_list"` with the explanatory line:
  > "A limited number of ABATON journeys are released each year. Guests registered on our Private Interest List receive priority information when a new departure is announced."

### 7.2 Journey detail page, template
Real, already-existing FAQ/included copy (see 9) should be reused. Structure:

1. **Hero**: name, one-line tagline, dates, "9 days | 8 nights", guest count, "From EUR XX,XXX per person", CTA **"Request a Private Consultation"** (not "Book This Tour").
2. **The Journey**, short emotional description (already exists per journey, reuse/adapt, see 10 for per-journey source text).
3. **The Route**, a simple vertical/flow diagram of station names only (`London -> Killarney -> Ashford Castle & Connemara -> Scottish Highlands -> Edinburgh`), no airport names, no technical detail.
4. **Signature Moments**, 5 to 7 evocative bullets, not a day-by-day recap. Example set for Elegant Islands already exists and can be reused near-verbatim:
   - Killarney National Park by private carriage
   - Two nights of estate life at Ashford Castle
   - Falconry, horseback riding or clay shooting
   - Off-road discovery of the Scottish Highlands
   - Private Loch Ness experience
   - Whisky in its Highland home
   - A final evening in historic Edinburgh
5. **Day by Day**, the fuller (but still public-safe) itinerary description. Existing per-journey day text can be reused (see 10). No restaurant names, no operator names, no exact timings, that level of detail belongs only inside the Circle (11.1).
6. **Hotels**, general statement ("Five-star hotels and exceptional historic properties"); name a specific property only where it is a confirmed, contracted signature element.
7. **Included**, reuse existing "Included Services" copy, adapted per journey.
8. **Who this journey is for**, one qualifying paragraph, e.g.: "For travellers who value personal service, cultural depth and the ease of travelling within an intimate group." This is deliberate lead-qualification copy, keep it.
9. **CTA**, always the same single path: "Request Journey Details" -> form -> personal follow-up. Do not offer multiple competing buttons.

### 7.3 Request flow
One consistent process across the whole public site, both from journey pages and from Contact:
`Request Journey Details -> Form -> personal follow-up by Isabell`

The **existing live request form** already has the right shape and can be reused directly:
- First name*, Last name*, Email*, Phone, Country of Residence*, plus a "Journey of Interest" selector, "Number of Travellers", "Additional Travellers" (names), "Further Requests or Remarks", and a note that this is **non-binding** ("A booking is only confirmed after personal contact, written confirmation, and payment of deposit."). Reuse this copy as-is.
- Keep this clearly separate from the actual binding booking process (see 11.6 Documents/Payments, binding booking happens once a member is inside the Circle, matching what the original design brief specified: a hidden booking-form page, accessed only via direct link, is not part of the new IA, it is superseded by the post-confirmation Circle flow. **Flag to Isabell**: confirm this replaces the old "hidden booking link" page rather than needing to exist alongside it.)

---

## 8. THE ABATON EXPERIENCE (replaces "Travel Lifestyle")

Reuse the bulk of the current Travel Lifestyle page content, but tell it as a narrative rather than a feature list.

**The ABATON Rhythm**, walk through a typical day, reusing the existing "Day in the ABATON Rhythm" copy almost verbatim:
- Breakfast with a View, "Enjoy a calm breakfast in a handpicked hotel."
- Private Jet Departure, "No lines. No waiting. You board and take off in minutes."
- Chauffeur Transfer, "smooth transfer into the city"
- Private Cultural Encounter, "often outside regular opening hours"
- Hotel Check-in, "everything is already in place"
- Culinary Experience, "memorable dinner chosen for its atmosphere"

Then the six pillars (existing copy, keep): Private Aviation, Hotels with Character, Culinary Discovery, Privileged Experiences, Founder Hosted, A Small Circle. Trust & Security line can be folded in here or into About: "German-based operator with secured payments, licensed under travel package law."

---

## 9. ABOUT

Currently thin, expand into a proper founder story, not just "Created by a private pilot...". One paragraph exists today:
> "ABATON Jet Journeys is founded and personally curated by Isabell." She holds a private pilot licence and has "background shaped by long-standing exposure to high-end hospitality and international travel."

Expand this into a full section with a high-quality (not corporate-stock) photo of Isabell, one already exists (`Isabell.jpg` on the current site) and can be reused or replaced with something warmer:
- "Founded by Isabell Buchner"
- Private pilot, passion for aviation
- Background in a family with ties to European hospitality
- The idea behind ABATON
- Why journeys stay small
- Why she personally hosts every journey

This paragraph is the actual competitive moat, a competitor can copy a route, but not this sentence:
> "Every journey is personally hosted by the founder who created it."

Also reuse the existing "Why ABATON" bullet list (Boutique Ownership, Aviation Standards, "All flights are operated by selected European operators in accordance with EASA standards," Authentic Discovery, Efficient Routing, Limited Group Size, "maximum of ten guests," Legal & Financial Security, "operates under German package travel law"). CTA: "Speak with the Founder".

---

## 11. CONTACT / Request a Private Consultation

Reuse existing copy and form: "At ABATON, personal contact is at the heart of everything we do," phone `+49 175 729 31 27`, email `info@abaton-jetjourneys.com`, address `ABATON Jet Journeys GmbH, Gehrenstrasse 7, 82433 Bad Kohlgrub, Germany`. Form fields: First name*, Last name*, Email*, Phone, Country of Residence*, an opt-in checkbox for the catalogue, Message, Submit.

Since Isabell currently does the contacting herself personally, consider replacing the generic confirmation copy with: **"Isabell will personally contact you."**, stronger for the brand than an anonymous "a member of our team will be in touch."

---

## 12. THE ABATON CIRCLE (member portal)

> **Deferred.** Section 12 is reproduced in full in
> [CIRCLE-BACKLOG.md](./CIRCLE-BACKLOG.md) and is not scheduled for build.

---

## 13. Content reconciliation needed (flag to Isabell before/during build)

The live site (`abaton-jetjourneys.com`) contains real, usable copy, but several things on it are already out of date relative to work done elsewhere on the route portfolio, and a few things are internally inconsistent. **None of this should be silently "fixed" by the developer, these are calls for Isabell to make**, listed here so nothing gets missed:

| Area | What the live site currently shows | What's since changed / the open question |
|---|---|---|
| Elegant Islands route | London -> Killarney -> **Galway** -> **Dublin** -> Inverness -> Edinburgh (6 stops) | Route work has since replaced Dublin/Galway with a single **Ashford Castle (technical gateway: Ireland West Airport Knock)** stop, on a strict 4-station / 2-nights-per-station format. The live copy needs a full rewrite of the route, day-by-day and Signature Moments to match the current corrected version. |
| "Finest of Europe" / "The Founders Edition, Finest of Europe" | Both listed as separate journeys, with different prices (EUR 29,280 vs EUR 29,980), same route (Munich-Vienna-Venice-Rome-Cannes-Monaco-Paris) | This route was flagged for removal in the portfolio review (too generically "reachable by everyone," not aligned with the new positioning). Confirm whether to delete both, or keep one and drop the duplicate naming. |
| "Secrets of Europe" | Zurich-Como-San Sebastian-Porto-Provence-Florence-Salzburg | Geographically overlaps with the newly designed **Mediterranean Essence** route (San Sebastian-Provence-Sardinia-Suedtirol) but they are not the same route. Confirm whether Mediterranean Essence replaces Secrets of Europe, or both continue to exist as separate journeys. |
| Fascinating Balkan route | Budapest-Brasov-**Sofia**-Kotor-Pula-Rovinj-**Ljubljana** | Both Sofia and Ljubljana have since been removed from this route; the current version is Budapest-Brasov-Rovinj/Pula-Kotor-**Albanian Riviera (Vlora)**, still 4 stations. Live copy needs full rewrite. |
| Wild Scandinavia route | Kopenhagen-Stavanger-Trondheim-Northern Norway-Lapland-Helsinki-Stockholm | Redesigned version starts/ends in **Hamburg**, not Copenhagen, with stops Bergen-Tromsoe-Rovaniemi-Stockholm. Live copy needs full rewrite; also live site says this launches "2028", confirm current target date. |
| Pricing | Three different price lists exist across the Partner Program PDF, the Media Information PDF, and the live site, all showing different numbers for the same journeys (e.g. Elegant Islands: EUR 28,850 / EUR 30,220 / EUR 30,220) | Needs one single, current price list before launch, currently three sources disagree. |
| Booking form | Original design brief specified a *hidden, link-only* binding booking page separate from the "request info" flow | This spec (7.3) folds the binding booking step into the post-confirmation Circle flow instead. Confirm this is the intended replacement, not an addition. |
| Guest count | Live copy is inconsistent between "6 to 10 guests" (Home/About) and per-journey pages that don't always restate it | Standardise on one number across all copy. |

---

## 14. Image assets

The current site (Wix) already has a substantial image library that can be reused as a starting point rather than reshooting/re-licensing everything immediately. Notable existing assets (filenames as found on the live site):

- `ABATON Luxury Travel.jpeg`, `Pilatus PC 12.jpg`, `ABATON ROME.jpg`, `PC12_edited_edited.jpg`, jet/aviation imagery
- `ABOUT ABATON.jpg`, `Isabell.jpg`, About page / founder
- `ABATON Cultural Discovery.jpg`, `ABATON Dining.jpg`, `Restaurant mit Aussicht`, `Hotelbett in Weiss und Gold`, lifestyle imagery
- A set of licensed Unsplash images currently used as filler (credited to Antonio Sessa, Katia De Juan, Keszthelyi Timi, Yuri G., NASA, Mohamed Masaau, Yaroslav Muzychenko, Ishan @seefromthesky, Matheus Bardemaker, chethan-kvs, niklas-jonasson), **these are stock/filler and should be treated as placeholders to replace with ABATON's own photography over time, not as final brand assets.**

There is also a first-draft route-map illustration (`ABATON_Elegant_Islands.png`, hand-illustrated style, ABATON logo watermark) intended for the "Journey Map" element on the Tour Detail page, see the site status document's explicit ask: *"Individual Map, Do you have any possibility to design the tour maps? Layout similar to [a Caribbean cruise-style route map], of course in ABATON CI and colours."* This confirms The Route element (7.2, point 3) should be a custom-illustrated map per journey, in brand colours, the existing Elegant Islands draft needs updating to match the corrected route (13) before reuse.

Do not carry over the raw Wix asset URLs into the new codebase long-term (they are Wix CDN links and will not remain stable), download and re-host anything worth keeping.

---

## 15. Non-functional requirements summary

- **SEO:** the Journal (10) and clean per-journey URLs are the primary SEO surface; ensure server-rendered/static pages, proper meta tags, and `hreflang` for DE/EN.
- **Accessibility:** standard WCAG AA baseline, this is a premium brand, broken accessibility undermines that positioning.
- **Admin/editability:** every field in the `Journey` model (5) must be editable from `/admin` without a deploy. Same for adding/removing a journey entirely and changing its `status`.
- **Legal:** Imprint, Privacy Policy and Terms & Conditions content already exists (current live site + the existing AGB 2025 document) and needs porting/updating rather than drafting from scratch.
- **Security:** see 12.5 for the hard requirement around passport/travel-document handling, this is the one area where "move fast" is explicitly not acceptable without the data-protection sign-off.

---

## 16. Suggested build order

1. Public site: Home, Journeys listing, Journey detail template, About, The ABATON Experience, Contact, legal pages, Journal (structure only, articles later), this alone is a full replacement of the current live site and can ship first.
2. `Journey` data model + `/admin` CRUD, so Isabell can maintain content without waiting for the Circle.
3. Circle phase 1: auth, Dashboard, My Journey (itinerary display, no editing), My Preferences, Payments (status display only).
4. Circle phase 2: My Choices (activities/dining), Concierge (request-generation only, no live booking integration).
5. Circle phase 3: Documents, **passport upload gated on data-protection sign-off**, everything else in this section can ship earlier.
6. Circle phase 4: The Circle (community/recommendations), Private Previews.

This order front-loads what's needed to replace the current public site and to make Isabell's day-to-day (editing journeys, managing the current guest cohort) easier, and defers the most complex/sensitive pieces (passport handling, community features) to the end.
