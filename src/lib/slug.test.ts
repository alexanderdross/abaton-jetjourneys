import { describe, it, expect } from "vitest";
import { slugifyHeading } from "./slug";

describe("slugifyHeading", () => {
  it("lowercases and hyphenates words", () => {
    expect(slugifyHeading("How do I book?")).toBe("how-do-i-book");
  });

  it("transliterates German umlauts and eszett", () => {
    expect(slugifyHeading("Stornierung & Rückerstattung")).toBe(
      "stornierung-rueckerstattung",
    );
    expect(slugifyHeading("Gepäck")).toBe("gepaeck");
    expect(slugifyHeading("Straße")).toBe("strasse");
  });

  it("collapses runs of punctuation and whitespace into one hyphen", () => {
    expect(slugifyHeading("  What's   included?!  ")).toBe("what-s-included");
  });

  it("strips leading and trailing hyphens", () => {
    expect(slugifyHeading("...Visa?")).toBe("visa");
  });

  it("is stable and idempotent for a given headline", () => {
    const once = slugifyHeading("Payment & Protection");
    expect(slugifyHeading(once)).toBe(once);
  });
});
