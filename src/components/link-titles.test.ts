import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import en from "../../messages/en.json";
import de from "../../messages/de.json";

/**
 * docs/SPEC.md section 3: "any link such as hyperlinks or links in header/
 * footer navigation must contain SEO optimized title attributes".
 *
 * A DOM test would be better, but the suite runs in a node environment with no
 * renderer, so this guards the requirement at the source level instead: every
 * navigational component must carry title attributes, and the strings behind
 * them must exist in both locales and actually describe something.
 */

const NAV_COMPONENTS = [
  "src/components/Header.tsx",
  "src/components/Footer.tsx",
  "src/components/Breadcrumbs.tsx",
  "src/components/JourneyCard.tsx",
];

function read(path: string): string {
  return readFileSync(join(process.cwd(), path), "utf8");
}

describe("link title attributes", () => {
  it.each(NAV_COMPONENTS)("%s sets a title on its links", (path) => {
    const src = read(path);
    const links = (src.match(/<(Link|a)\b/g) ?? []).length;
    const titles = (src.match(/\btitle=\{/g) ?? []).length;
    expect(links).toBeGreaterThan(0);
    expect(titles).toBeGreaterThanOrEqual(links);
  });

  it("LinkButton forwards a title to the anchor", () => {
    const src = read("src/components/ui/Button.tsx");
    expect(src).toContain("title?: string");
    expect(src).toContain("title={title}");
  });

  // Explicit list: "*Title" alone is ambiguous, several namespaces use it for
  // headings (e.g. JourneyDetail.overviewTitle) rather than link titles.
  const LINK_TITLE_KEYS = [
    "Nav.homeTitle",
    "Nav.journeysTitle",
    "Nav.aboutTitle",
    "Nav.contactTitle",
    "Nav.requestCtaTitle",
    "Footer.imprintTitle",
    "Footer.termsTitle",
    "Footer.privacyTitle",
    "Footer.phoneTitle",
    "Footer.emailTitle",
    "Journeys.cardTitle",
    "Breadcrumbs.homeTitle",
    "JourneyDetail.backToJourneysTitle",
    "JourneyDetail.requestCtaTitle",
  ];

  it.each(LINK_TITLE_KEYS)("%s is descriptive in both locales", (path) => {
    const [ns, key] = path.split(".");
    for (const [name, bundle] of [
      ["en", en],
      ["de", de],
    ] as const) {
      const value = (bundle as Record<string, Record<string, string>>)[ns]?.[
        key
      ];
      expect(typeof value, `${name}: ${path}`).toBe("string");
      // A title that merely repeats the link text adds nothing; require prose.
      expect(value.trim().length, `${name}: ${path}`).toBeGreaterThan(20);
    }
  });
});

describe("no leftover copy placeholders", () => {
  const LEGAL_DIR = "src/app/[locale]";

  it("legal pages contain no unfilled [...] placeholders", () => {
    for (const page of ["imprint", "privacy", "terms-conditions"]) {
      const dir = join(process.cwd(), LEGAL_DIR, page);
      for (const file of readdirSync(dir)) {
        const src = readFileSync(join(dir, file), "utf8");
        // e.g. "[Amtsgericht …]", "[HRB …]", "[DE…]"
        const hits = src.match(/"\[[^"\]]*\]"/g) ?? [];
        expect(hits, `${page}/${file}`).toEqual([]);
      }
    }
  });
});
