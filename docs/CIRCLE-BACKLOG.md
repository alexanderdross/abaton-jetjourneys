# The ABATON Circle, deferred backlog

> **Status: DEFERRED. Not scheduled, not started, nothing built.**
>
> Section 12 of the client brief ([SPEC.md](./SPEC.md)) specifies a login-gated
> member portal. On explicit instruction it is parked: *"portal set-up not needed
> yet, but can be stored in markdown for later."* This file exists so the
> requirement is not lost, and so that anyone picking the work up later starts
> from the original wording rather than a summary of it.

## What exists today: nothing

Verified against the repo at the time of writing:

- No authentication library in `package.json`, no session handling, no user model.
- `src/middleware.ts` is a bare `createMiddleware(routing)` from next-intl; its
  matcher excludes `/api`, and there are no protected routes.
- `wrangler.jsonc` declares no D1, KV, R2, Durable Object or Hyperdrive binding,
  only the static `ASSETS` binding. There is no data store of any kind.
- `src/app` contains no `api/` directory. The only server entry point in the whole
  codebase is the `submitRequest` server action in `src/lib/actions.ts`.
- Journey content is compile-time TypeScript validated by zod
  (`src/lib/journeys.ts`), not rows in a database.

**Implication:** building the Circle is greenfield work, not an extension of what
is here. It requires, at minimum, a real data store, an auth provider, a
roles-and-permissions model, and a migration of journey content away from
content-as-code. Budget it accordingly.

Two public-facing promises already reference this portal (per the brief: the
About page's Membership section, and the FAQ line *"Yes. Upon booking, guests
receive access to the ABATON Member Portal"*). If those lines are carried onto
the new site before the Circle exists, the site is promising something it cannot
deliver. Either omit them until the Circle ships, or ship the Circle.

---

## Section 12 of the brief, reproduced in full

Position this publicly as **"The ABATON Circle"**, not "member portal" or "login area" (avoid anything that reads like a fitness-studio loyalty program). The current live site already references this concept twice (About page's Membership section, and the FAQ: "Yes. Upon booking, guests receive access to the ABATON Member Portal"), so the promise is already public-facing and must be delivered.

Access is granted only after a confirmed booking. On first login: "Welcome to the ABATON Circle."

### Dashboard
"Welcome back, [First name]." -> Upcoming Journey card (name, dates, live countdown "X days to departure").

### 12.1 My Journey
The most important section, and the one place the full operational detail lives (times, meeting points, dress code, exact flight schedule), this is what stays out of the public journey pages by design. Structure per day:

```
Day 1, London
  Hotel: [name]
  Welcome Dinner: [details]
  Dress suggestion: [text]
  Meeting point: [text]
  Time: [time]

Day 2, London -> Killarney
  08:30 Chauffeur Collection
  09:30 Private Terminal
  10:15 Departure
  ...
```

Detail should be able to roll out progressively rather than all at once (this also gives Isabell operational flexibility):
- 6 months before departure: destinations + hotels
- 8 weeks before: activities
- 2 weeks before: exact day-by-day schedule

### 12.2 My Preferences ("ABATON Guest Profile")
Saved per guest and reused automatically for future journeys, this is the actual differentiator vs. a one-off travel agency.
- **Personal details:** name, date of birth, nationality
- **Travel:** passport details (see security requirements below), frequent flyer info if relevant
- **Food:** allergies, intolerances, vegetarian/vegan, "foods I particularly dislike"
- **Room:** king/twin, pillow preference, etc.
- **Drinks:** wine, champagne, non-alcoholic preference
- **Interests:** art, history, food, wine, aviation, nature, golf, wellness, etc.

### 12.3 My Choices, Activities & Dining
Per-stop activity selection, e.g. for Ashford Castle:

```
Choose your afternoon
o Falconry
o Horseback Riding
o Clay Shooting
o Spa
o Free time at the estate
[Save selection]
```

Isabell needs an admin view aggregating this per journey, e.g.:

```
Guest     Falconry   Riding   Shooting
Smith     x
Miller               x
Jones     x
```

Same pattern for dining, e.g.:

```
George V Dining Room
Please select your preferred menu:
o Beef  o Fish  o Vegetarian
Dietary requirements already saved: Gluten intolerance   [auto-applied]
```

### 12.4 Concierge
Version 1 does **not** need real-time booking integrations, it generates requests that Isabell fulfils manually, while still feeling like a concierge service to the guest:
- **Arrival Services**, "Book Chauffeur to London": pickup type (Airport/Private Address/Hotel), flight number, arrival time, passengers -> "Request Chauffeur" button, which creates a request Isabell sees and actions.
- Additional Hotel Nights ("I would like to arrive one night earlier.")
- Restaurant reservations
- Spa appointments
- Private shopping
- Additional chauffeur
- Airport assistance

Each of these is a simple `ConciergeRequest { guestId, journeyId, type, details, status: "requested"|"confirmed"|"declined" }` record, not a live booking engine.

### 12.5 Documents
- Booking Confirmation
- Invoice
- Payment Schedule
- Sicherungsschein (statutory travel-protection certificate)
- Insurance Information
- Final Travel Documents
- Flight Information
- Passport upload, **see security requirements immediately below.**

**Passport / sensitive travel documents, hard requirement.** These must NOT be treated like an ordinary file upload in the general website CMS/storage. GDPR requires purpose limitation, data minimisation, and privacy-by-design; the EU's guidance points to restricted access rights and encryption as concrete measures. Before implementing this feature, the build must include:
- a roles-and-permissions concept (who can see whose documents),
- secure authentication,
- encryption (at rest and in transit),
- clearly scoped access rights (RLS or equivalent, a guest sees only their own documents; only authorised ABATON staff see any guest's documents),
- a deletion/retention concept,
- vetting of the hosting/service provider and, where applicable, a Data Processing Agreement (AVV),
- documented purposes of processing.

**This point must be confirmed with Isabell's data protection advisor before this feature is built**, do not ship passport upload without that sign-off. If the timeline requires shipping the rest of the Circle first, passport upload can be the one component explicitly deferred.

### 12.6 Payments
Status display only, no on-site payment collection (payment stays via bank transfer per the current booking process):

```
Payment Status
Journey Price      EUR 31,980
Deposit             Paid
Final payment       Due 14 June 2027
[View Invoice]
```

A "Payment Link" integration can be a later phase, not part of the initial build.

### 12.7 The Circle, community
Build this as a small, private **member lounge**, not a public-style forum with threads and avatars, that reads as empty or low-quality at low guest volumes (a forum only makes sense once a journey has, realistically, 6+ guests active in it).

- **Fellow travellers**, visible only if a guest actively opts in: name, location, interests, "Connect" button. Nothing shared by default, privacy-by-default means personal information is never visible to an unnecessarily large group automatically.
- **Journey Conversation**, a simple threaded discussion scoped to one journey's guest list, e.g. "Elegant Islands Circle" ("We arrive in London one day early, anyone else?").
- **Recommendations**, member-submitted recommendations (hotels, restaurants, golf, wine, travel, aviation) tagged by category. Treat this as a stronger long-term community feature than the forum.

### 12.8 Private Previews
Members see new journeys before the public does, this turns the Circle from a pure admin/servicing tool into a retention and sales channel:
> "A new journey is coming. Mediterranean Essence, Private Member Preview. Members receive 14-day priority access before public release."

---

## Prerequisites before any of this starts

From section 16 of the brief, the Circle is phases 3 to 6 and is explicitly
gated behind two earlier pieces of work that also do not exist yet:

1. **Public site completion** (phase 1). See [GAP-ANALYSIS.md](./GAP-ANALYSIS.md).
2. **`Journey` data model + `/admin` CRUD** (phase 2), so content lives in a
   store rather than in `src/content/journeys/*.ts`. The Circle needs the same
   store, so this is the natural first step towards it, not a detour.

Additionally, before section 12.5 is touched at all: written sign-off from
Isabell's data protection advisor, per the hard requirement above. Track that in
[OPEN-DECISIONS.md](./OPEN-DECISIONS.md).
