# Deployment, Cloudflare Workers Builds

This project deploys through **[Cloudflare Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/)**, Cloudflare's git-connected CI/CD. On every push to the connected branch, Cloudflare runs a two-step pipeline:

1. **Build command** → `npx opennextjs-cloudflare build` (produces `.open-next/worker.js` + assets)
2. **Deploy command** → `npx wrangler deploy` (deploys per `wrangler.jsonc`)

Pushes to non-production branches instead run the **preview deploy command** (`npx wrangler versions upload`), creating a preview version without promoting it to production.

> GitHub Actions (`.github/workflows/ci.yml`) is the **quality gate only** (typecheck, lint, tests, build). It does **not** deploy, deployment is exclusively Workers Builds, so no Cloudflare API token is stored in GitHub.

## Current target: interim `*.workers.dev`

The site currently runs interim on the account's **`*.workers.dev`** subdomain, no custom domain:

- `wrangler.jsonc` sets `"workers_dev": true` and declares **no custom route**. A Worker can only bind a custom domain whose zone lives in the **same** Cloudflare account, so no custom domain is used while the Worker lives in the business account without its own zone.
- The exact URL is `https://abaton-jetjourneys.<account-subdomain>.workers.dev`; set `NEXT_PUBLIC_SITE_URL` to it as a **Build variable** (see below).
- **`NEXT_PUBLIC_NOINDEX=1`** keeps the interim site out of search engines (robots.txt `Disallow: /` + `<meta name="robots" content="noindex">`).

See **[Moving the Worker to another Cloudflare account](#moving-the-worker-to-another-cloudflare-account)** and **[Going live on the production domain](#going-live-on-the-production-domain)**.

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
| `NEXT_PUBLIC_SITE_URL` | Build variable | Canonical/hreflang/sitemap base URL, interim the account's `https://abaton-jetjourneys.<subdomain>.workers.dev` |
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

Interim there is **no custom domain**, the Worker is reachable at
`https://abaton-jetjourneys.<account-subdomain>.workers.dev`. If the account has no
workers.dev subdomain yet, set one under **Workers & Pages → (account) → Subdomain**.
The production custom domain is added at go-live, see
[Going live on the production domain](#going-live-on-the-production-domain).

## Moving the Worker to another Cloudflare account

Cloudflare has **no "move Worker between accounts" action**. You recreate the Worker in
the target account by connecting the same repo to Workers Builds there, then remove it
from the old account. This Worker is clean to move: no KV/R2/D1/Durable Objects/queues,
no hard-coded `account_id`, only the static `ASSETS` binding. The one account/zone
coupling, the custom domain, is already removed in favour of `workers.dev` (above).

Recommended order:

1. **Merge this config** (`workers_dev: true`, no custom route, `NEXT_PUBLIC_NOINDEX=1`) to `main`. Any account still connected to the repo will redeploy and **drop the previous custom domain**, expected when leaving it behind.
2. **Old account** (optional, avoids double-deploys): open the Worker → **Settings → Builds → Git → Disconnect**. Keep the Worker as a rollback until the new one is verified.
3. **New account:** **Workers & Pages → Create application → Workers → Import a repository** → authorize/install the Cloudflare GitHub app for **`alexanderdross/abaton-jetjourneys`** → select it. Worker name **`abaton-jetjourneys`**, production branch `main`, build `npx opennextjs-cloudflare build`, deploy `npx wrangler deploy`, root `/`.
4. Set **Build variables**: `NEXT_PUBLIC_NOINDEX=1`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, optional `NEXT_PUBLIC_TURNSTILE_SITE_KEY`. Set **Secrets**: `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY` (interim optional, without them Turnstile uses always-passing test keys and no email is delivered).
5. **Save and Deploy**, then note the `*.workers.dev` URL (Worker → **Settings → Domains & Routes**). If the account has no subdomain yet, set one first (see above).
6. Set the `NEXT_PUBLIC_SITE_URL` build variable to that `https://abaton-jetjourneys.<subdomain>.workers.dev` and **retry the build** so canonicals/sitemap are correct.
7. **Verify:** the workers.dev URL serves the site, `/robots.txt` shows `Disallow: /`, a journey page renders, the contact form loads.
8. **Old account:** delete the old Worker (**Settings → Delete**) once the new one is verified, and remove any leftover `abaton` DNS record in the old zone.

## Image optimization (Cloudflare best practice)

Images use a custom Next loader (`src/lib/imageLoader.ts`) that rewrites to
Cloudflare edge transformations (`/cdn-cgi/image/…`, `format=auto`).

1. Enable **Transformations** on the production zone (added at go-live):
   dashboard → **Images → Transformations → Enable for zone** (free monthly allowance).
2. Set build variable `NEXT_PUBLIC_CF_IMAGES=1` and redeploy.

> Not applicable on `*.workers.dev` (no zone); `NEXT_PUBLIC_CF_IMAGES` stays `0` interim.

Until step 1 is done, keep `NEXT_PUBLIC_CF_IMAGES=0` (the default), the site serves
the downscaled originals directly, so nothing breaks.

## Going live on the production domain

When ready to move off the interim `*.workers.dev`:

1. Add the production zone (`abaton-jetjourneys.com`) to the **same account** as the Worker (registrar nameservers → Cloudflare).
2. In `wrangler.jsonc`, add a custom-domain route for the production host(s), e.g.
   `routes: [{ pattern: "abaton-jetjourneys.com", custom_domain: true }, { pattern: "www.abaton-jetjourneys.com", custom_domain: true }]` (you can drop `workers_dev` or leave it).
3. Set `NEXT_PUBLIC_SITE_URL` (Workers Builds build variable) to `https://www.abaton-jetjourneys.com`.
4. Set `NEXT_PUBLIC_NOINDEX` to `0` (or remove it) so the site becomes indexable, and enable Transformations + `NEXT_PUBLIC_CF_IMAGES=1` (see above).
5. Push to `main` → Workers Builds redeploys and provisions the production domain.

## Manual deploy (fallback)

Workers Builds is the normal path, but you can deploy from any machine:

```bash
npm run deploy        # opennextjs-cloudflare build && … deploy
# validate config without deploying:
npx wrangler deploy --dry-run
```

## Rollback

In the dashboard: **Worker → Deployments** → select a previous deployment → **Rollback**. Or with Wrangler: `wrangler rollback`.
