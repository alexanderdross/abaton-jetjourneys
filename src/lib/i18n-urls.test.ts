import { describe, it, expect } from "vitest";
import { absoluteUrl, altLinks, localizedPath } from "./i18n-urls";
import { siteUrl } from "./site";

describe("localizedPath", () => {
  it("keeps English at the root with a trailing slash", () => {
    expect(localizedPath("en", "/")).toBe("/");
    expect(localizedPath("en", "/contact")).toBe("/contact/");
    expect(localizedPath("en", "/journeys")).toBe("/journeys/");
  });

  it("localises German segments under /de with a trailing slash", () => {
    expect(localizedPath("de", "/")).toBe("/de/");
    expect(localizedPath("de", "/contact")).toBe("/de/kontakt/");
    expect(localizedPath("de", "/journeys")).toBe("/de/reisen/");
    expect(localizedPath("de", "/about")).toBe("/de/philosophie/");
    expect(localizedPath("de", "/imprint")).toBe("/de/impressum/");
    expect(localizedPath("de", "/terms-conditions")).toBe("/de/agb/");
    expect(localizedPath("de", "/privacy")).toBe("/de/datenschutz/");
  });

  it("localises dynamic journey routes", () => {
    const href = {
      pathname: "/journeys/[slug]",
      params: { slug: "x" },
    } as const;
    expect(localizedPath("en", href)).toBe("/journeys/x/");
    expect(localizedPath("de", href)).toBe("/de/reisen/x/");
  });
});

describe("altLinks", () => {
  it("English home: canonical / with de + x-default alternates", () => {
    const en = altLinks("en", "/");
    expect(en.canonical).toBe("/");
    expect(en.languages.en).toBe("/");
    expect(en.languages.de).toBe("/de/");
    expect(en.languages["x-default"]).toBe("/");
  });

  it("German contact: canonical is the localised German path", () => {
    const de = altLinks("de", "/contact");
    expect(de.canonical).toBe("/de/kontakt/");
    expect(de.languages.en).toBe("/contact/");
    expect(de.languages.de).toBe("/de/kontakt/");
    expect(de.languages["x-default"]).toBe("/contact/");
  });

  it("dynamic journey route resolves both locales", () => {
    const en = altLinks("en", {
      pathname: "/journeys/[slug]",
      params: { slug: "the-premiere-edition-finest-of-europe" },
    });
    expect(en.canonical).toBe(
      "/journeys/the-premiere-edition-finest-of-europe/",
    );
    expect(en.languages.de).toBe(
      "/de/reisen/the-premiere-edition-finest-of-europe/",
    );
  });
});

// Structured data (src/components/JsonLd.tsx) must emit the same URLs the
// browser is actually on. The previous hand-built `${siteUrl}/${locale}/...`
// resolved in neither locale: English has no prefix, German uses /de/reisen/.
describe("absoluteUrl (structured data)", () => {
  it("omits the locale prefix for English and localises German segments", () => {
    const href = {
      pathname: "/journeys/[slug]" as const,
      params: { slug: "elegant-islands" },
    };
    expect(absoluteUrl("en", href)).toBe(
      `${siteUrl}/journeys/elegant-islands/`,
    );
    expect(absoluteUrl("de", href)).toBe(
      `${siteUrl}/de/reisen/elegant-islands/`,
    );
  });

  it("resolves the home page per locale", () => {
    expect(absoluteUrl("en", "/")).toBe(`${siteUrl}/`);
    expect(absoluteUrl("de", "/")).toBe(`${siteUrl}/de/`);
  });

  it("never emits an /en/ path", () => {
    expect(absoluteUrl("en", "/contact")).not.toContain("/en/");
  });
});
