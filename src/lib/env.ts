import { getCloudflareContext } from "@opennextjs/cloudflare";

export type AppEnv = {
  RESEND_API_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
  NEXT_PUBLIC_SITE_URL?: string;
  NEXT_PUBLIC_TURNSTILE_SITE_KEY?: string;
};

/**
 * Read runtime configuration. On Cloudflare Workers the values come from the
 * Worker env (vars + secrets); locally they fall back to process.env / .dev.vars.
 */
export function getEnv(): AppEnv {
  try {
    const { env } = getCloudflareContext();
    return env as unknown as AppEnv;
  } catch {
    return process.env as AppEnv;
  }
}
