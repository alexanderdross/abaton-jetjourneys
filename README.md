# ABATON JetJourneys

Marketing site for **ABATON JetJourneys GmbH**, a founder-led boutique offering
private jet roundtrips through Europe for six to ten guests.

Rebuilt in **Next.js 15 (App Router)**, bilingual **English / German**, and
deployed to **Cloudflare Workers** via the OpenNext adapter.

## Project docs

| Document | What it is |
| --- | --- |
| [docs/SPEC.md](./docs/SPEC.md) | The client brief, verbatim. Source of truth for what the site is meant to be. |
| [docs/GAP-ANALYSIS.md](./docs/GAP-ANALYSIS.md) | What is built vs. what the spec asks for, with file references. Start here. |
| [docs/OPEN-DECISIONS.md](./docs/OPEN-DECISIONS.md) | Questions only the client can answer. Several block launch. |
| [docs/CIRCLE-BACKLOG.md](./docs/CIRCLE-BACKLOG.md) | The member portal, deferred and not started. |

> Several journeys in `src/content/journeys/` carry routes the client has since
> revised. They are flagged in-file and listed in **OPEN-DECISIONS**. Do not
> "fix" them from the spec without confirmation.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router, React 19, Server Components) |
| Hosting | Cloudflare Workers via [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare) + Wrangler |
| i18n | [`next-intl`](https://next-intl.dev), English at `/`, German at `/de` (`localePrefix: "as-needed"`) |
| Styling | Tailwind CSS v4 with design tokens (`src/app/globals.css`) |
| Content | Content-as-code, typed journeys in `src/content/journeys`, validated with `zod` |
| Enquiries | Server Action → [Resend](https://resend.com) email, protected by Cloudflare Turnstile |

## URL scheme

- English: `abaton-jetjourneys.com/<path>/` (e.g. `/contact/`)
- German: `abaton-jetjourneys.com/de/<path-de>/`, **localised segments** (e.g. `/de/kontakt/`, `/de/reisen/`, `/de/philosophie/`)

Localised route segments are defined in `routing.pathnames` (`src/i18n/routing.ts`).
Trailing slashes are enforced (`next.config.ts` → `trailingSlash: true`). `hreflang`/
canonical + the sitemap resolve localised paths via `src/lib/i18n-urls.ts`.

## Local development

```bash
npm install
cp .dev.vars.example .dev.vars   # fill in secrets
npm run dev                      # Next dev server (fast DX)
npm run preview                  # build + run in the workerd runtime (prod-like)
```

## Content

Journeys live in `src/content/journeys/`. To add one:

1. Create `src/content/journeys/<name>.ts` (see `finest-of-europe.ts`).
2. Register it in `src/content/journeys/index.ts`.

Each journey carries `en` and `de` fields side by side and is validated at build
time by `src/lib/journeys.ts`, a malformed journey fails the build.

UI strings live in `messages/en.json` and `messages/de.json`.

## Images

Assets live under `public/` in a structured layout: `public/logos/` (white/black/gold
wordmarks) and `public/images/` (`home-hero.jpg`, `about-hero.jpg`,
`journeys/`, `experiences/`, `aircraft/`, `gallery/`). Large sources are downscaled
to ≤2560px. `src/components/ui/Media.tsx` renders optimised `next/image`.

Optimisation follows **Cloudflare best practice** via a custom loader
(`src/lib/imageLoader.ts`): in production it rewrites to `/cdn-cgi/image/…`
(`format=auto` → AVIF/WebP) so images are transformed at the edge, bypassing the
Worker `/_next/image` optimiser.

- Requires **Transformations enabled** on the Cloudflare zone
  (dashboard → *Images → Transformations → Enable for zone*).
- Gated by `NEXT_PUBLIC_CF_IMAGES`: `1` → edge transformations; unset/`0` → serve
  the (downscaled) originals directly (safe default until Transformations are on).
- Local dev always serves originals.

## Configuration

Non-secret defaults live in `wrangler.jsonc` (`vars`). Secrets are set with:

```bash
wrangler secret put RESEND_API_KEY
wrangler secret put TURNSTILE_SECRET_KEY
```

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Sending enquiry emails (secret) |
| `TURNSTILE_SECRET_KEY` | Server-side Turnstile verification (secret) |
| `CONTACT_TO_EMAIL` | Where enquiries are delivered |
| `CONTACT_FROM_EMAIL` | Verified Resend sender address |
| `NEXT_PUBLIC_SITE_URL` | Canonical/hreflang/sitemap base URL (interim: `https://abaton.drossmedia.de`) |
| `NEXT_PUBLIC_NOINDEX` | `1` keeps the interim domain out of search engines; `0`/unset at go-live |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Public Turnstile widget key |
| `NEXT_PUBLIC_CF_IMAGES` | `1` enables Cloudflare edge image transformations (needs zone Transformations on) |

Turnstile is always enforced on the contact and journey-request forms: a
submission without a valid challenge token is rejected. Until real keys are set,
the forms fall back to Cloudflare's official always-passing test keys, so the
challenge runs end to end on previews and the interim domain (with no bot
protection). Set real keys before the public launch. If `RESEND_API_KEY` is
unset, a validated submission is accepted but no email is delivered.

## CI & tests

Quality is gated by **GitHub Actions** (`.github/workflows/ci.yml`) on every push and PR:
`typecheck` → `lint` → `test` (Vitest) → `next build`, plus a separate job that runs the
real `opennextjs-cloudflare build`. Run the same checks locally:

```bash
npm run typecheck
npm run lint
npm run test          # Vitest, i18n URLs, journey loader, EN/DE translation parity
npm run build
```

## Deploy

Deployment runs through **Cloudflare Workers Builds** (git-connected): a push to `main`
builds with `npx opennextjs-cloudflare build` and deploys with `npx wrangler deploy`.
Full setup, dashboard connection, build variables/secrets, custom domain, is in
**[DEPLOYMENT.md](./DEPLOYMENT.md)**.

Manual deploy from a local machine (fallback):

```bash
npm run deploy    # opennextjs-cloudflare build && … deploy
```
