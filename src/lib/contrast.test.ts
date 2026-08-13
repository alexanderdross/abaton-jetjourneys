import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { contrastRatio } from "./contrast";

// Parse the design tokens straight from globals.css so this guard tracks the
// real palette, not a copy that could drift.
function tokens(): Record<string, string> {
  const css = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf8");
  const map: Record<string, string> = {};
  for (const m of css.matchAll(/--color-([a-z-]+):\s*(#[0-9a-fA-F]{3,6})\b/g)) {
    map[m[1]] = m[2];
  }
  return map;
}

const AA = 4.5; // WCAG AA for normal-size text.

describe("palette contrast (WCAG AA)", () => {
  const t = tokens();

  it("exposes the expected colour tokens", () => {
    for (const key of [
      "bone",
      "ink",
      "slate",
      "champagne",
      "champagne-light",
      "champagne-ink",
    ]) {
      expect(t[key], `missing --color-${key}`).toMatch(/^#[0-9a-fA-F]{6}$/);
    }
  });

  it("gold TEXT on light grounds meets AA (bone and white)", () => {
    expect(contrastRatio(t["champagne-ink"], t["bone"])).toBeGreaterThanOrEqual(
      AA,
    );
    expect(contrastRatio(t["champagne-ink"], "#ffffff")).toBeGreaterThanOrEqual(
      AA,
    );
  });

  it("gold TEXT on the ink ground meets AA (decorative/dark contexts)", () => {
    expect(contrastRatio(t["champagne"], t["ink"])).toBeGreaterThanOrEqual(AA);
    expect(
      contrastRatio(t["champagne-light"], t["ink"]),
    ).toBeGreaterThanOrEqual(AA);
  });

  it("body text tokens meet AA on their grounds", () => {
    expect(contrastRatio(t["ink"], t["bone"])).toBeGreaterThanOrEqual(AA);
    expect(contrastRatio(t["slate"], t["bone"])).toBeGreaterThanOrEqual(AA);
    expect(contrastRatio(t["bone"], t["ink"])).toBeGreaterThanOrEqual(AA);
  });

  it("the bright champagne would FAIL as text on light (why champagne-ink exists)", () => {
    // Documents the regression this fix addresses: the original accent is only
    // ~2.3:1 on bone, so gold text on light must use champagne-ink instead.
    expect(contrastRatio(t["champagne"], t["bone"])).toBeLessThan(3);
  });

  it("sanity-checks the contrast helper against known references", () => {
    expect(contrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 0);
    expect(contrastRatio("#ffffff", "#ffffff")).toBeCloseTo(1, 5);
  });
});
