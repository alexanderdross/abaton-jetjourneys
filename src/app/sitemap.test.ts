import { describe, it, expect } from "vitest";
import sitemap from "./sitemap";
import { getJourneySlugs } from "@/lib/journeys";

describe("sitemap", () => {
  const entries = sitemap();
  const urls = entries.map((e) => e.url);

  it("covers the static pages plus every published journey", () => {
    const slugs = getJourneySlugs();
    // 6 static hrefs (/, /journeys, /experience, /about, /good-to-know,
    // /contact) + one per journey.
    expect(entries.length).toBe(6 + slugs.length);
  });

  it("lists every journey detail URL (English, slash-terminated)", () => {
    for (const slug of getJourneySlugs()) {
      expect(urls.some((u) => u.endsWith(`/journeys/${slug}/`))).toBe(true);
    }
  });

  it("uses absolute, slash-terminated URLs with en/de alternates", () => {
    for (const e of entries) {
      expect(e.url).toMatch(/^https?:\/\//);
      expect(e.url.endsWith("/")).toBe(true);
      expect(e.alternates?.languages?.en).toBeTruthy();
      expect(e.alternates?.languages?.de).toBeTruthy();
      // German alternate carries the /de prefix.
      expect(e.alternates?.languages?.de).toContain("/de");
      // x-default falls back to English.
      expect(e.alternates?.languages?.["x-default"]).toBe(
        e.alternates?.languages?.en,
      );
    }
  });

  it("omits the noindex legal pages that robots.txt disallows", () => {
    for (const path of ["/imprint/", "/privacy/", "/terms-conditions/"]) {
      expect(urls.some((u) => u.endsWith(path))).toBe(false);
    }
  });
});
