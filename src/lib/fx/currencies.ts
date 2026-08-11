/**
 * The currency set ABATON displays, and how a visitor's country maps onto it.
 *
 * Confirmed set: EUR, USD, CAD, JPY, AUD. Every currency here except EUR must
 * exist in the ECB reference rates, which is what `REQUIRED_RATES` asserts
 * against an incoming payload. Anything unmapped stays on EUR, which is also
 * the contractual currency, so the fallback is never wrong, only less helpful.
 */

export const DISPLAY_CURRENCIES = ["EUR", "USD", "CAD", "JPY", "AUD"] as const;

export type DisplayCurrency = (typeof DISPLAY_CURRENCIES)[number];

/** Currencies an ECB payload must carry to be considered usable. */
export const REQUIRED_RATES = DISPLAY_CURRENCIES.filter(
  (c): c is Exclude<DisplayCurrency, "EUR"> => c !== "EUR",
);

/** Visitor choice (set by the switcher) and the country-derived preselection. */
export const CURRENCY_COOKIE = "abaton_fx";
export const GEO_COOKIE = "abaton_fx_geo";

// ISO 3166-1 alpha-2 to display currency. US territories that officially use
// the US dollar are included so a visitor from San Juan is not shown euros.
const COUNTRY_CURRENCY: Record<string, DisplayCurrency> = {
  US: "USD",
  PR: "USD",
  VI: "USD",
  GU: "USD",
  MP: "USD",
  AS: "USD",
  CA: "CAD",
  JP: "JPY",
  AU: "AUD",
};

export function isDisplayCurrency(value: unknown): value is DisplayCurrency {
  return (
    typeof value === "string" &&
    (DISPLAY_CURRENCIES as readonly string[]).includes(value)
  );
}

/**
 * Preselected currency for a visitor country (Cloudflare's `CF-IPCountry`).
 * Unknown, missing and Cloudflare's "XX"/"T1" placeholders all fall back to EUR.
 */
export function currencyForCountry(
  country: string | null | undefined,
): DisplayCurrency {
  if (!country) return "EUR";
  return COUNTRY_CURRENCY[country.toUpperCase()] ?? "EUR";
}
