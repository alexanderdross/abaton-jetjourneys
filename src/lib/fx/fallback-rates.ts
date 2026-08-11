import type { FxPayload } from "./ecb";

/**
 * Committed last-resort snapshot.
 *
 * Its job is to keep `/api/fx` answering with a valid shape when the ECB is
 * unreachable, not to be accurate. Freshness is enforced separately
 * (`isRateFresh` in ./convert), and the UI renders no conversion at all once a
 * payload is older than the window, so a stale number cannot reach a guest.
 *
 * ! PLACEHOLDER VALUES. These were never read from a live ECB response, the
 * build sandbox has no egress to ecb.europa.eu. The date is deliberately old so
 * the freshness check rejects this snapshot: until someone refreshes it from a
 * real response, an ECB outage means no conversion is shown, which is the safe
 * outcome. Refresh date and rates together, never one without the other.
 */
export const FALLBACK_RATES: FxPayload = {
  base: "EUR",
  date: "2026-01-02",
  rates: {
    USD: 1.09,
    CAD: 1.5,
    JPY: 172,
    AUD: 1.66,
  },
};
