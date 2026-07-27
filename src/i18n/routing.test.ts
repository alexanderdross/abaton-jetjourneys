import { describe, it, expect } from "vitest";
import { routing } from "./routing";

describe("routing config", () => {
  it("has en default and en+de locales with as-needed prefix", () => {
    expect(routing.defaultLocale).toBe("en");
    expect([...routing.locales].sort()).toEqual(["de", "en"]);
    expect(routing.localePrefix).toBe("as-needed");
  });

  it("defines a localised path for every locale on every route", () => {
    for (const [key, value] of Object.entries(routing.pathnames)) {
      if (typeof value === "string") {
        expect(value.startsWith("/"), `${key} → ${value}`).toBe(true);
      } else {
        expect(Object.keys(value).sort()).toEqual(["de", "en"]);
        for (const loc of ["en", "de"] as const) {
          expect(value[loc].startsWith("/"), `${key}.${loc}`).toBe(true);
        }
      }
    }
  });

  it("keeps dynamic params consistent across locales", () => {
    for (const [key, value] of Object.entries(routing.pathnames)) {
      if (typeof value === "string" || !key.includes("[")) continue;
      const param = key.match(/\[(\w+)\]/)?.[0] ?? "";
      expect(value.en).toContain(param);
      expect(value.de).toContain(param);
    }
  });

  it("localises German segments (not identical to English)", () => {
    const contact = routing.pathnames["/contact"];
    expect(typeof contact === "object" && contact.de).toBe("/kontakt");
    const journeys = routing.pathnames["/journeys"];
    expect(typeof journeys === "object" && journeys.de).toBe("/reisen");
  });
});
