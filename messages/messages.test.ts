import { describe, it, expect } from "vitest";
import en from "./en.json";
import de from "./de.json";

// Recursively collect dotted key paths of a nested object.
function keyPaths(obj: unknown, prefix = ""): string[] {
  if (typeof obj !== "object" || obj === null) return [prefix];
  return Object.entries(obj as Record<string, unknown>).flatMap(([k, v]) =>
    keyPaths(v, prefix ? `${prefix}.${k}` : k),
  );
}

describe("translation parity (en.json / de.json)", () => {
  it("has identical key structure in both locales", () => {
    const enKeys = keyPaths(en).sort();
    const deKeys = keyPaths(de).sort();

    const missingInDe = enKeys.filter((k) => !deKeys.includes(k));
    const missingInEn = deKeys.filter((k) => !enKeys.includes(k));

    expect(missingInDe, `Keys missing in de.json: ${missingInDe.join(", ")}`).toEqual([]);
    expect(missingInEn, `Keys missing in en.json: ${missingInEn.join(", ")}`).toEqual([]);
  });

  it("has no empty string values", () => {
    const emptyEn = keyPaths(en).filter((path) => {
      const value = path
        .split(".")
        .reduce<unknown>((acc, k) => (acc as Record<string, unknown>)?.[k], en);
      return typeof value === "string" && value.trim() === "";
    });
    expect(emptyEn, `Empty values in en.json: ${emptyEn.join(", ")}`).toEqual([]);
  });
});
