import { fetchEcbRates, type FxPayload } from "@/lib/fx/ecb";
import { FALLBACK_RATES } from "@/lib/fx/fallback-rates";

/**
 * Exchange rates for the indicative local-currency display.
 *
 * Deliberately visitor-independent: the journey pages are prerendered and
 * served from the edge, so the rate cannot be baked into the HTML. The HTML
 * keeps EUR, this endpoint serves one identical payload to everybody, and the
 * client adds the converted line after hydration.
 *
 * Never answers with an error. On any upstream failure it returns the
 * committed snapshot marked `stale`, and the UI drops the conversion when the
 * reference date is too old to trust.
 */
export const dynamic = "force-dynamic";

type FxResponse = FxPayload & {
  source: "ecb" | "fallback";
  stale: boolean;
};

export async function GET(): Promise<Response> {
  const rates = await fetchEcbRates();

  const body: FxResponse = rates
    ? { ...rates, source: "ecb", stale: false }
    : { ...FALLBACK_RATES, source: "fallback", stale: true };

  return Response.json(body, {
    headers: {
      // A failed lookup is held only briefly, a good one for the rest of the
      // ECB publication cycle.
      "Cache-Control": body.stale
        ? "public, max-age=300, s-maxage=300"
        : "public, max-age=3600, s-maxage=21600, stale-while-revalidate=604800",
    },
  });
}
