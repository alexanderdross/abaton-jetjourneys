import { describe, it, expect, vi, beforeEach } from "vitest";

// robots.ts reads `noindex` from @/lib/site at module load, so each branch is
// exercised with its own mocked value and a fresh module import.

describe("robots.txt", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.doUnmock("@/lib/site");
  });

  it("indexing domain: allows crawling, disallows legal pages, links sitemap", async () => {
    vi.doMock("@/lib/site", () => ({
      siteUrl: "https://www.abaton-jetjourneys.com",
      noindex: false,
    }));
    const robots = (await import("./robots")).default;
    const r = robots();

    const rules = Array.isArray(r.rules) ? r.rules[0] : r.rules;
    expect(rules.allow).toBe("/");
    expect(r.sitemap).toBe("https://www.abaton-jetjourneys.com/sitemap.xml");

    const disallow = (rules.disallow ?? []) as string[];
    // Legal pages blocked in both locales.
    expect(disallow).toContain("/imprint/");
    expect(disallow).toContain("/de/impressum/");
  });

  it("interim domain (noindex): blocks everything and omits the sitemap", async () => {
    vi.doMock("@/lib/site", () => ({
      siteUrl: "https://abaton-jetjourneys.example.workers.dev",
      noindex: true,
    }));
    const robots = (await import("./robots")).default;
    const r = robots();

    const rules = Array.isArray(r.rules) ? r.rules[0] : r.rules;
    expect(rules.disallow).toBe("/");
    expect(r.sitemap).toBeUndefined();
  });
});
