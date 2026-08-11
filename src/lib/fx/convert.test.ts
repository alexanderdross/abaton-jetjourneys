import { describe, it, expect } from "vitest";
import {
  convert,
  formatPrice,
  formatRateDate,
  isRateFresh,
  MAX_RATE_AGE_DAYS,
} from "./convert";

describe("convert", () => {
  it("rounds up to the next hundred for dollar currencies", () => {
    // 29,980 EUR at 1.0921 = 32,741.16 USD
    expect(convert(29980, 1.0921, "USD")).toBe(32800);
    expect(convert(29980, 1.4832, "CAD")).toBe(44500);
    expect(convert(29980, 1.6603, "AUD")).toBe(49800);
  });

  it("rounds up to the next ten thousand for yen", () => {
    // 29,980 EUR at 171.44 = 5,139,771.20 JPY
    expect(convert(29980, 171.44, "JPY")).toBe(5140000);
  });

  it("never rounds down, so the figure cannot undersell the EUR price", () => {
    for (const rate of [0.9, 1.0921, 1.4832, 1.6603]) {
      for (const amount of [28850, 29980, 30220, 33880, 35980]) {
        expect(convert(amount, rate, "USD")).toBeGreaterThanOrEqual(
          amount * rate,
        );
      }
    }
  });

  it("leaves an exact step untouched", () => {
    expect(convert(1000, 2, "USD")).toBe(2000);
  });

  it("passes EUR through unchanged", () => {
    expect(convert(29980, 1, "EUR")).toBe(29980);
  });
});

describe("formatPrice", () => {
  it("formats without decimals in both locales", () => {
    expect(formatPrice(32800, "USD", "en")).toBe("$32,800");
    expect(formatPrice(5140000, "JPY", "en")).toBe("¥5,140,000");
  });

  it("uses German grouping and a trailing symbol for de", () => {
    const de = formatPrice(32800, "USD", "de");
    expect(de).toContain("32.800");
    expect(de).not.toContain(",00");
  });

  it("formats yen without decimals, which the currency has none of", () => {
    expect(formatPrice(5140000, "JPY", "de")).not.toContain(",00");
  });
});

describe("formatRateDate", () => {
  it("writes the reference date out in the page locale", () => {
    expect(formatRateDate("2026-08-11", "en")).toBe("August 11, 2026");
    expect(formatRateDate("2026-08-11", "de")).toBe("11. August 2026");
  });

  it("returns the raw value when the date is unparseable", () => {
    expect(formatRateDate("not-a-date", "en")).toBe("not-a-date");
  });
});

describe("isRateFresh", () => {
  const now = new Date("2026-08-11T09:00:00Z");

  it("accepts today's rate", () => {
    expect(isRateFresh("2026-08-11", now)).toBe(true);
  });

  it("accepts a rate carried over a weekend or holiday", () => {
    expect(isRateFresh("2026-08-07", now)).toBe(true);
  });

  it("rejects a rate beyond the window", () => {
    expect(isRateFresh("2026-08-03", now)).toBe(false);
    expect(isRateFresh("2026-01-02", now)).toBe(false);
  });

  it("accepts the boundary exactly", () => {
    expect(isRateFresh("2026-08-04", now, MAX_RATE_AGE_DAYS)).toBe(true);
  });

  it("tolerates a day ahead but rejects a clearly future date", () => {
    expect(isRateFresh("2026-08-12", now)).toBe(true);
    expect(isRateFresh("2026-09-01", now)).toBe(false);
  });

  it("rejects a malformed date", () => {
    expect(isRateFresh("", now)).toBe(false);
    expect(isRateFresh("11.08.2026", now)).toBe(false);
  });
});
