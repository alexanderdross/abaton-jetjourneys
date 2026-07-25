import { describe, it, expect } from "vitest";
import { altLinks } from "./i18n-urls";

describe("altLinks", () => {
  it("puts English at the root (no prefix) and German under /de", () => {
    const en = altLinks("en", "/");
    expect(en.canonical).toBe("/");
    expect(en.languages.en).toBe("/");
    expect(en.languages.de).toBe("/de");
    expect(en.languages["x-default"]).toBe("/");
  });

  it("uses the German path as canonical for the de locale", () => {
    const de = altLinks("de", "/journeys");
    expect(de.canonical).toBe("/de/journeys");
    // Alternates are locale-independent — always both languages + x-default.
    expect(de.languages.en).toBe("/journeys");
    expect(de.languages.de).toBe("/de/journeys");
    expect(de.languages["x-default"]).toBe("/journeys");
  });

  it("builds nested paths for both locales", () => {
    const slug = "/journeys/the-premiere-edition-finest-of-europe";
    const en = altLinks("en", slug);
    expect(en.canonical).toBe(slug);
    expect(en.languages.de).toBe(`/de${slug}`);
  });

  it("x-default always points at the English variant", () => {
    for (const path of ["/", "/about", "/contact", "/journeys"]) {
      expect(altLinks("de", path).languages["x-default"]).toBe(
        path === "/" ? "/" : path,
      );
    }
  });
});
