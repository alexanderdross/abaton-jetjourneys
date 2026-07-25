# Deployment — Cloudflare Workers Builds

This project deploys through **[Cloudflare Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/)** — Cloudflare's git-connected CI/CD. On every push to the connected branch, Cloudflare runs a two-step pipeline:

1. **Build command** → `npx opennextjs-cloudflare build` (produces `.open-next/worker.js` + assets)
2. **Deploy command** → `npx wrangler deploy` (deploys per `wrangler.jsonc`)

Pushes to non-production branches instead run the **preview deploy command** (`npx wrangler versions upload`), creating a preview version without promoting it to production.

> GitHub Actions (`.github/workflows/ci.yml`) is the **quality gate only** (typecheck, lint, tests, build). It does **not** deploy — deployment is exclusively Workers Builds, so no Cloudflare API token is stored in GitHub.

## One-time setup (Cloudflare dashboard)

The repo → Worker connection must be made in the dashboard; there is no CLI/API step for it.

1. Go to **Workers & Pages** → **Create application** → **Import a repository** (or, for an existing Worker: open it → **Settings** → **Builds** → **Connect**).
2. Select the **`alexanderdross/abaton-jetjourneys`** repository.
3. Configure the build:
   - **Production branch:** `main`
   - **Build command:** `npx opennextjs-cloudflare build`
   - **Deploy command:** `npx wrangler deploy` *(default — leave as is)*
   - **Preview deploy command:** `npx wrangler versions upload` *(default)*
   - **Root directory:** `/` *(default)*
4. **Save and Deploy.**

> ⚠️ **Name must match.** The Worker's name in the dashboard must equal `name` in `wrangler.jsonc` (**`abaton-jetjourneys`**), or the build fails. Node version is pinned via `.node-version` (`22`).

## Build variables & secrets

Set these under **Worker → Settings → Builds → Build variables and secrets** so the Next.js build can inline `NEXT_PUBLIC_*` values and the runtime has its secrets.

| Name | Type | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Build variable | Canonical/hreflang/sitemap base URL (`https://www.abaton-jetjourneys.com`) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Build variable | Public Turnstile widget key (inlined at build time) |
| `RESEND_API_KEY` | Secret | Sending enquiry emails |
| `TURNSTILE_SECRET_KEY` | Secret | Server-side Turnstile verification |
| `CONTACT_TO_EMAIL` | Variable | Where enquiries are delivered |
| `CONTACT_FROM_EMAIL` | Variable | Verified Resend sender address |

`CONTACT_*` and a placeholder `NEXT_PUBLIC_*` already have non-secret defaults in `wrangler.jsonc` (`vars`). Runtime secrets can alternatively be set from a machine with Wrangler:

```bash
wrangler secret put RESEND_API_KEY
wrangler secret put TURNSTILE_SECRET_KEY
```

## Custom domain

After the first successful deploy, bind the domain under **Worker → Settings → Domains & Routes → Add → Custom domain**:

- `abaton-jetjourneys.com`
- `www.abaton-jetjourneys.com`

Cloudflare provisions the certificate automatically (the domain must be on this Cloudflare account).

## Manual deploy (fallback)

Workers Builds is the normal path, but you can deploy from any machine:

```bash
npm run deploy        # opennextjs-cloudflare build && … deploy
# validate config without deploying:
npx wrangler deploy --dry-run
```

## Rollback

In the dashboard: **Worker → Deployments** → select a previous deployment → **Rollback**. Or with Wrangler: `wrangler rollback`.
