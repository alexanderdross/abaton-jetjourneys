import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

// Enforce the hard style rule: no em-dash (U+2014) anywhere in source or copy.
// The character is referenced via escape so this file never flags itself.
const EM_DASH = String.fromCharCode(0x2014);
const ROOTS = ["src", "messages"];
const EXTENSIONS = [".ts", ".tsx", ".json", ".css", ".mjs", ".md"];

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(p));
    else if (EXTENSIONS.some((e) => entry.name.endsWith(e))) out.push(p);
  }
  return out;
}

describe("no em-dashes (hard rule)", () => {
  it("source and copy contain no em-dash character", () => {
    const offenders = ROOTS.flatMap(walk).filter((f) =>
      readFileSync(f, "utf8").includes(EM_DASH),
    );
    expect(offenders, `em-dash found in: ${offenders.join(", ")}`).toEqual([]);
  });
});
