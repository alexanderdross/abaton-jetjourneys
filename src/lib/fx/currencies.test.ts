import { describe, it, expect } from "vitest";
import {
  DISPLAY_CURRENCIES,
  REQUIRED_RATES,
  currencyForCountry,
  isDisplayCurrency,
} from "./currencies";
import { FALLBACK_RATES } from "./fallback-rates";

describe("display currencies", () => {
  it("is the confirmed set", () => {
    expect([...DISPLAY_CURRENCIES]).toEqual([
      "EUR",
      "USD",
      "CAD",
      "JPY",
      "AUD",
    ]);
  });

  it("requires a rate for every non-EUR currency", () => {
    expect([...REQUIRED_RATES]).toEqual(["USD", "CAD", "JPY", "AUD"]);
  });

  it("has a fallback snapshot covering every required rate", () => {
    for (const currency of REQUIRED_RATES) {
      expect(FALLBACK_RATES.rates[currency]).toBeGreaterThan(0);
    }
  });
});

describe("isDisplayCurrency", () => {
  it("accepts the shipped codes only", () => {
    expect(isDisplayCurrency("USD")).toBe(true);
    expect(isDisplayCurrency("EUR")).toBe(true);
    // Not shipped, and AED is not in the ECB reference rates at all.
    expect(isDisplayCurrency("GBP")).toBe(false);
    expect(isDisplayCurrency("AED")).toBe(false);
    expect(isDisplayCurrency("usd")).toBe(false);
    expect(isDisplayCurrency(undefined)).toBe(false);
  });
});

describe("currencyForCountry", () => {
  it("maps the target markets", () => {
    expect(currencyForCountry("US")).toBe("USD");
    expect(currencyForCountry("CA")).toBe("CAD");
    expect(currencyForCountry("JP")).toBe("JPY");
    expect(currencyForCountry("AU")).toBe("AUD");
  });

  it("maps US dollar territories to USD", () => {
    expect(currencyForCountry("PR")).toBe("USD");
    expect(currencyForCountry("GU")).toBe("USD");
  });

  it("keeps European and unmapped markets on EUR", () => {
    expect(currencyForCountry("DE")).toBe("EUR");
    expect(currencyForCountry("CH")).toBe("EUR");
    expect(currencyForCountry("AE")).toBe("EUR");
    expect(currencyForCountry("BR")).toBe("EUR");
  });

  it("falls back to EUR for missing or placeholder country codes", () => {
    expect(currencyForCountry(null)).toBe("EUR");
    expect(currencyForCountry(undefined)).toBe("EUR");
    expect(currencyForCountry("")).toBe("EUR");
    // Cloudflare uses XX and T1 when it cannot resolve a country.
    expect(currencyForCountry("XX")).toBe("EUR");
    expect(currencyForCountry("T1")).toBe("EUR");
  });

  it("is case insensitive", () => {
    expect(currencyForCountry("us")).toBe("USD");
  });
});
