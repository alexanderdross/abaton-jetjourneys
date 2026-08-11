import type { Locale } from "@/i18n/routing";
import type { DisplayCurrency } from "./currencies";

/**
 * Conversion, rounding and formatting for the indicative local-currency line.
 *
 * EUR is the contractual currency. Everything here produces an orientation
 * figure that accompanies the EUR price, never one that replaces it.
 */

// Rounding step per currency. Prices are five-figure EUR amounts, so a clean
// step reads like a price rather than like a calculation.
const STEP: Record<DisplayCurrency, number> = {
  EUR: 1,
  USD: 100,
  CAD: 100,
  AUD: 100,
  JPY: 10000,
};

/** How long a reference date stays usable, in days. */
export const MAX_RATE_AGE_DAYS = 7;

/**
 * Convert a EUR amount at the given reference rate.
 *
 * Always rounds up to the currency's step, so the indicative figure never
 * undersells the actual EUR price after a rate move. On a 30,000 EUR journey,
 * rounding up to the next 100 absorbs well under a percent of movement, which
 * is why no additional safety margin is applied on top.
 */
export function convert(
  amountEur: number,
  rate: number,
  currency: DisplayCurrency,
): number {
  const step = STEP[currency];
  return Math.ceil((amountEur * rate) / step) * step;
}

/** Whole-unit currency string in the page locale. Never shows decimals. */
export function formatPrice(
  amount: number,
  currency: DisplayCurrency,
  locale: Locale,
): string {
  return new Intl.NumberFormat(locale === "de" ? "de-DE" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** The ECB reference date, written out in the page locale. */
export function formatRateDate(date: string, locale: Locale): string {
  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return date;
  return new Intl.DateTimeFormat(locale === "de" ? "de-DE" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(parsed);
}

/**
 * Whether a reference date is recent enough to display. Rates more than
 * `MAX_RATE_AGE_DAYS` old, or dated in the future, are rejected: showing no
 * conversion is better than showing a wrong-looking one.
 */
export function isRateFresh(
  date: string,
  now: Date = new Date(),
  maxAgeDays: number = MAX_RATE_AGE_DAYS,
): boolean {
  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return false;
  const dayMs = 24 * 60 * 60 * 1000;
  // Compared in whole UTC days, so a reference date is valid for the whole of
  // its last day rather than expiring at some hour in the middle of it.
  const today = Math.floor(now.getTime() / dayMs);
  const ageDays = today - Math.floor(parsed.getTime() / dayMs);
  // One day of slack ahead absorbs timezone edges around the ECB publication.
  return ageDays >= -1 && ageDays <= maxAgeDays;
}
