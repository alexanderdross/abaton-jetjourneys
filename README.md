# ABATON JetJourneys

Marketing site for **ABATON JetJourneys GmbH** — a founder-led boutique offering
private jet roundtrips through Europe for six to ten guests.

Rebuilt in **Next.js 15 (App Router)**, bilingual **English / German**, and
deployed to **Cloudflare Workers** via the OpenNext adapter.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router, React 19, Server Components) |
| Hosting | Cloudflare Workers via [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare) + Wrangler |
| i18n | [`next-intl`](https://next-intl.dev) — English at `/`, German at `/de` (`localePrefix: "as-needed"`) |
| Styling | Tailwind CSS v4 with design tokens (`src/app/globals.css`) |
| Content | Content-as-code — typed journeys in `src/content/journeys`, validated with `zod` |
| Enquiries | Server Action → [Resend](https://resend.com) email, protected by Cloudflare Turnstile |
| Analytics | Cloudflare Web Analytics (cookieless) |

## URL scheme

- English: `abaton-jetjourneys.com/…`
- German: `abaton-jetjourneys.com/de/…`

`hreflang`/canonical are centralised in `src/lib/i18n-urls.ts`.

## Local development

```bash
npm install
cp .dev.vars.example .dev.vars   # fill in secrets
npm run dev                      # Next dev server (fast DX)
npm run preview                  # build + run in the workerd runtime (prod-like)
```

## Content

Journeys live in `src/content/journeys/`. To add one:

1. Create `src/content/journeys/<name>.ts` (see `the-premiere-edition.ts`).
2. Register it in `src/content/journeys/index.ts`.

Each journey carries `en` and `de` fields side by side and is validated at build
time by `src/lib/journeys.ts` — a malformed journey fails the build.

UI strings live in `messages/en.json` and `messages/de.json`.

## Images

Until real photography is supplied, `src/components/ui/Media.tsx` renders elegant
placeholders. Drop assets into `public/images/` (matching the paths in the journey
files) and set `NEXT_PUBLIC_USE_REAL_IMAGES=1` to switch to optimised `<Image>`.

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
| `NEXT_PUBLIC_SITE_URL` | Canonical/hreflang/sitemap base URL |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Public Turnstile widget key |

If `RESEND_API_KEY` or `TURNSTILE_SECRET_KEY` are unset, the form degrades
gracefully (accepts input; Turnstile is skipped) so previews keep working.

## CI & tests

Quality is gated by **GitHub Actions** (`.github/workflows/ci.yml`) on every push and PR:
`typecheck` → `lint` → `test` (Vitest) → `next build`, plus a separate job that runs the
real `opennextjs-cloudflare build`. Run the same checks locally:

```bash
npm run typecheck
npm run lint
npm run test          # Vitest — i18n URLs, journey loader, EN/DE translation parity
npm run build
```

## Deploy

Deployment runs through **Cloudflare Workers Builds** (git-connected): a push to `main`
builds with `npx opennextjs-cloudflare build` and deploys with `npx wrangler deploy`.
Full setup — dashboard connection, build variables/secrets, custom domain — is in
**[DEPLOYMENT.md](./DEPLOYMENT.md)**.

Manual deploy from a local machine (fallback):

```bash
npm run deploy    # opennextjs-cloudflare build && … deploy
```
