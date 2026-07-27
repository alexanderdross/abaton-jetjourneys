// Custom Next.js image loader — Cloudflare best practice.
//
// In production, images are optimised at the edge via Cloudflare's URL-based
// transformations (`/cdn-cgi/image/…`, `format=auto` → AVIF/WebP). This avoids
// the Worker-based `/_next/image` optimiser entirely (also side-steps the
// self-hosted image-optimiser CVEs).
//
// Requires **Transformations enabled** on the Cloudflare zone. Gated behind
// NEXT_PUBLIC_CF_IMAGES so the site never 404s images if it isn't enabled yet:
//   - unset/"0" → serve the (already downscaled) original asset directly
//   - "1"       → edge-optimised via /cdn-cgi/image
// Local dev always serves the original (no /cdn-cgi/image there).

type LoaderArgs = { src: string; width: number; quality?: number };

export default function cloudflareLoader({
  src,
  width,
  quality,
}: LoaderArgs): string {
  // Remote/absolute URLs (rare here) are returned untouched.
  if (/^https?:\/\//.test(src)) return src;

  if (
    process.env.NODE_ENV === "production" &&
    process.env.NEXT_PUBLIC_CF_IMAGES === "1"
  ) {
    const params = `width=${width},quality=${quality ?? 78},format=auto,fit=scale-down`;
    const path = src.startsWith("/") ? src : `/${src}`;
    return `/cdn-cgi/image/${params}${path}`;
  }

  return src;
}
