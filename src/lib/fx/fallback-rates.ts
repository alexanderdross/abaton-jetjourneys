import type { FxPayload } from "./ecb";

/**
 * Committed last-resort snapshot.
 *
 * Its job is to keep `/api/fx` answering with a valid shape when the ECB is
 * unreachable. Freshness is enforced separately (`isRateFresh` in ./convert),
 * and the UI renders no conversion at all once a payload is older than the
 * window, so an outage that outlasts the window shows nothing rather than a
 * number nobody can vouch for.
 *
 * Read from the live endpoint on 11 August 2026, the day the feature went out.
 * Refresh date and rates together, never one without the other, otherwise the
 * freshness check vouches for figures it has no business vouching for.
 *
 *   curl -s https://abaton.drossmedia.de/api/fx/
 */
export const FALLBACK_RATES: FxPayload = {
  base: "EUR",
  date: "2026-08-11",
  rates: {
    USD: 1.154,
    CAD: 1.6084,
    JPY: 183.72,
    AUD: 1.6336,
  },
};
