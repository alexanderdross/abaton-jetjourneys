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

function valueAt(obj: unknown, path: string): unknown {
  return path
    .split(".")
    .reduce<unknown>((acc, k) => (acc as Record<string, unknown>)?.[k], obj);
}

// ICU placeholders like {price} or {count, plural, ...}: collect the argument
// names so both locales can be compared.
function placeholders(value: unknown): string[] {
  if (typeof value !== "string") return [];
  const names = new Set<string>();
  const re = /\{\s*([a-zA-Z0-9_]+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(value)) !== null) names.add(m[1]);
  return [...names].sort();
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
      const value = valueAt(en, path);
      return typeof value === "string" && value.trim() === "";
    });
    expect(emptyEn, `Empty values in en.json: ${emptyEn.join(", ")}`).toEqual([]);
  });

  it("uses the same ICU placeholders in both locales", () => {
    const mismatches = keyPaths(en)
      .filter((path) => typeof valueAt(en, path) === "string")
      .map((path) => ({
        path,
        en: placeholders(valueAt(en, path)),
        de: placeholders(valueAt(de, path)),
      }))
      .filter(({ en: e, de: d }) => e.join(",") !== d.join(","));

    expect(
      mismatches,
      `Placeholder mismatch: ${mismatches
        .map((m) => `${m.path} (en:[${m.en}] de:[${m.de}])`)
        .join("; ")}`,
    ).toEqual([]);
  });
});
