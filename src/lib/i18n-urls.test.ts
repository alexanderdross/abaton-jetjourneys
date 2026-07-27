import { describe, it, expect } from "vitest";
import { altLinks, localizedPath } from "./i18n-urls";

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
