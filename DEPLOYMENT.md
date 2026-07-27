# Deployment, Cloudflare Workers Builds

This project deploys through **[Cloudflare Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/)**, Cloudflare's git-connected CI/CD. On every push to the connected branch, Cloudflare runs a two-step pipeline:

1. **Build command** → `npx opennextjs-cloudflare build` (produces `.open-next/worker.js` + assets)
2. **Deploy command** → `npx wrangler deploy` (deploys per `wrangler.jsonc`)

Pushes to non-production branches instead run the **preview deploy command** (`npx wrangler versions upload`), creating a preview version without promoting it to production.

> GitHub Actions (`.github/workflows/ci.yml`) is the **quality gate only** (typecheck, lint, tests, build). It does **not** deploy, deployment is exclusively Workers Builds, so no Cloudflare API token is stored in GitHub.

## Current target: interim domain `abaton.drossmedia.de`

The site currently runs on the interim subdomain **`abaton.drossmedia.de`**:

- `wrangler.jsonc` declares it as a **custom domain route** (`routes: [{ pattern: "abaton.drossmedia.de", custom_domain: true }]`), on deploy Cloudflare provisions the DNS record + TLS certificate automatically. This requires `drossmedia.de` to be an **active Cloudflare zone** and **no pre-existing DNS record** on `abaton`.
- `NEXT_PUBLIC_SITE_URL` is set to `https://abaton.drossmedia.de` and **`NEXT_PUBLIC_NOINDEX=1`** keeps the interim site out of search engines (robots.txt `Disallow: /` + `<meta name="robots" content="noindex">`).

See **[Going live on the production domain](#going-live-on-the-production-domain)** for the switch-over.

## One-time setup (Cloudflare dashboard)

The repo → Worker connection must be made in the dashboard; there is no CLI/API step for it.

1. Go to **Workers & Pages** → **Create application** → **Import a repository** (or, for an existing Worker: open it → **Settings** → **Builds** → **Connect**).
2. Select the **`alexanderdross/abaton-jetjourneys`** repository.
3. Configure the build:
   - **Production branch:** `main`
   - **Build command:** `npx opennextjs-cloudflare build`
   - **Deploy command:** `npx wrangler deploy` *(default, leave as is)*
   - **Preview deploy command:** `npx wrangler versions upload` *(default)*
   - **Root directory:** `/` *(default)*
4. **Save and Deploy.**

> ⚠️ **Name must match.** The Worker's name in the dashboard must equal `name` in `wrangler.jsonc` (**`abaton-jetjourneys`**), or the build fails. Node version is pinned via `.node-version` (`22`).

## Build variables & secrets

Set these under **Worker → Settings → Builds → Build variables and secrets** so the Next.js build can inline `NEXT_PUBLIC_*` values and the runtime has its secrets.

| Name | Type | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Build variable | Canonical/hreflang/sitemap base URL, currently `https://abaton.drossmedia.de` |
| `NEXT_PUBLIC_NOINDEX` | Build variable | `1` on the interim domain (robots `Disallow: /` + meta noindex). Set `0`/remove at go-live |
| `NEXT_PUBLIC_CF_IMAGES` | Build variable | `1` = Cloudflare edge image transformations (needs zone Transformations enabled); `0` = serve originals |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Build variable | Public Turnstile widget key (inlined at build time) |
| `RESEND_API_KEY` | Secret | Sending enquiry emails |
| `TURNSTILE_SECRET_KEY` | Secret | Server-side Turnstile verification |
| `CONTACT_TO_EMAIL` | Variable | Where enquiries are delivered |
| `CONTACT_FROM_EMAIL` | Variable | Verified Resend sender address |

> `NEXT_PUBLIC_*` values are **inlined at build time**. They already have defaults in `wrangler.jsonc` (`vars`), but Workers Builds must also carry the same values as **Build variables** for the build to pick them up.

`CONTACT_*` and a placeholder `NEXT_PUBLIC_*` already have non-secret defaults in `wrangler.jsonc` (`vars`). Runtime secrets can alternatively be set from a machine with Wrangler:

```bash
wrangler secret put RESEND_API_KEY
wrangler secret put TURNSTILE_SECRET_KEY
```

## Custom domain

The interim domain `abaton.drossmedia.de` is declared in `wrangler.jsonc` (`routes` with `custom_domain: true`), so **no manual step is needed**, the deploy provisions the DNS record + certificate automatically. Preconditions:

- `drossmedia.de` is an active Cloudflare zone on this account (✓).
- No pre-existing DNS record on `abaton.drossmedia.de` (a conflicting CNAME blocks custom-domain creation).

## Image optimization (Cloudflare best practice)

Images use a custom Next loader (`src/lib/imageLoader.ts`) that rewrites to
Cloudflare edge transformations (`/cdn-cgi/image/…`, `format=auto`).

1. Enable **Transformations** on the `drossmedia.de` zone:
   dashboard → **Images → Transformations → Enable for zone** (free monthly allowance).
2. Set build variable `NEXT_PUBLIC_CF_IMAGES=1` and redeploy.

Until step 1 is done, keep `NEXT_PUBLIC_CF_IMAGES=0` (the default), the site serves
the downscaled originals directly, so nothing breaks.

## Going live on the production domain

When ready to move off the interim domain:

1. In `wrangler.jsonc`, replace the route pattern with the production host(s), e.g.
   `abaton-jetjourneys.com` and `www.abaton-jetjourneys.com`.
2. Set `NEXT_PUBLIC_SITE_URL` (var **and** Workers Builds build variable) to `https://www.abaton-jetjourneys.com`.
3. Set `NEXT_PUBLIC_NOINDEX` to `0` (or remove it) so the site becomes indexable.
4. Push to `main` → Workers Builds redeploys and provisions the production domain.

## Manual deploy (fallback)

Workers Builds is the normal path, but you can deploy from any machine:

```bash
npm run deploy        # opennextjs-cloudflare build && … deploy
# validate config without deploying:
npx wrangler deploy --dry-run
```

## Rollback

In the dashboard: **Worker → Deployments** → select a previous deployment → **Rollback**. Or with Wrangler: `wrangler rollback`.
