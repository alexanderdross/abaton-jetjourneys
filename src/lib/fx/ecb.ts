import { z } from "zod";
import { REQUIRED_RATES } from "./currencies";

/**
 * ECB euro foreign exchange reference rates, daily file.
 *
 * One request returns every published currency in about 2 KB, quoted as units
 * of foreign currency per 1 EUR, which is the direction we need. The file is
 * updated around 16:00 CET on TARGET working days; at weekends and on holidays
 * the previous rate stays current, which is why every converted price on the
 * site carries the reference date from the payload rather than the fetch time.
 *
 * The rates are published for information, not for transactions. See
 * docs/CURRENCY-CONVERSION-PLAN.md for the disclaimer that follows from that.
 */
export const ECB_DAILY_URL =
  "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml";

export const fxPayloadSchema = z.object({
  base: z.literal("EUR"),
  /** ECB reference date, `YYYY-MM-DD`. Not the time we fetched it. */
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  rates: z.record(
    z.string().regex(/^[A-Z]{3}$/),
    z.number().finite().positive(),
  ),
});

export type FxPayload = z.infer<typeof fxPayloadSchema>;

// The daily file is a fixed, one-line-per-currency shape:
//   <Cube time='2026-08-11'>
//     <Cube currency='USD' rate='1.0921'/>
// There is no DOMParser on Workers and `nodejs_compat` does not add one, so a
// 2 KB document with a stable format is read with two expressions and then
// validated, rather than pulling in an XML library.
const DATE_RE = /time=['"](\d{4}-\d{2}-\d{2})['"]/;
const RATE_RE = /currency=['"]([A-Z]{3})['"]\s+rate=['"]([0-9]*\.?[0-9]+)['"]/g;

/**
 * Parse the ECB daily file. Throws when the document is malformed or is
 * missing a currency the site displays, so a half-read payload can never
 * reach a price.
 */
export function parseEcbDaily(xml: string): FxPayload {
  const date = DATE_RE.exec(xml)?.[1];
  if (!date) throw new Error("ECB payload: no reference date found");

  const rates: Record<string, number> = {};
  for (const match of xml.matchAll(RATE_RE)) {
    const value = Number(match[2]);
    if (Number.isFinite(value) && value > 0) rates[match[1]] = value;
  }

  const missing = REQUIRED_RATES.filter((c) => !(c in rates));
  if (missing.length > 0) {
    throw new Error(`ECB payload: missing rates for ${missing.join(", ")}`);
  }

  return fxPayloadSchema.parse({ base: "EUR", date, rates });
}

/**
 * Fetch and parse the daily file. Returns null on any failure (network,
 * timeout, malformed document) so the caller can fall back rather than fail:
 * a price page must not break because a central bank had a bad afternoon.
 */
export async function fetchEcbRates(): Promise<FxPayload | null> {
  try {
    const response = await fetch(ECB_DAILY_URL, {
      signal: AbortSignal.timeout(2500),
      // Cache the upstream document at the Cloudflare edge, so visitor traffic
      // does not turn into ECB traffic. Ignored outside Workers.
      cf: { cacheTtl: 21600, cacheEverything: true },
    } as RequestInit);
    if (!response.ok) return null;
    return parseEcbDaily(await response.text());
  } catch {
    return null;
  }
}
