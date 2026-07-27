import { describe, it, expect } from "vitest";
import {
  TURNSTILE_TEST_SITE_KEY,
  TURNSTILE_TEST_SECRET_KEY,
  turnstileSiteKey,
} from "./turnstile";

describe("turnstile keys", () => {
  it("uses Cloudflare's official always-passing test keys as the fallback", () => {
    // These are the documented Turnstile dummy keys; changing them would break
    // the local/interim challenge flow.
    expect(TURNSTILE_TEST_SITE_KEY).toBe("1x00000000000000000000AA");
    expect(TURNSTILE_TEST_SECRET_KEY).toBe(
      "1x0000000000000000000000000000000AA",
    );
  });

  it("falls back to the test site key when no real key is configured", () => {
    // The test environment sets no NEXT_PUBLIC_TURNSTILE_SITE_KEY, so the form
    // still receives a usable site key (Turnstile is always present).
    expect(turnstileSiteKey).toBe(
      process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || TURNSTILE_TEST_SITE_KEY,
    );
    expect(turnstileSiteKey.length).toBeGreaterThan(0);
  });
});
