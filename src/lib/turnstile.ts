// Cloudflare Turnstile keys.
//
// The contact and journey-request forms always run Turnstile. Until the real
// production keys are configured (via env at go-live), we fall back to
// Cloudflare's official always-passing test keys so the widget is still present
// and the server-side challenge still runs end to end. The test keys provide no
// bot protection, so real keys must be set before the public launch.
//
// Docs: https://developers.cloudflare.com/turnstile/troubleshooting/testing/
export const TURNSTILE_TEST_SITE_KEY = "1x00000000000000000000AA";
export const TURNSTILE_TEST_SECRET_KEY = "1x0000000000000000000000000000000AA";

/** The site key exposed to the browser (real key if set, else the test key). */
export const turnstileSiteKey =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || TURNSTILE_TEST_SITE_KEY;
