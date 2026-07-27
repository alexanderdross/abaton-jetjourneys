import { describe, it, expect } from "vitest";
import {
  legacyJourneyRedirects,
  legacyRedirectRules,
} from "./legacy-redirects";
import { getJourneySlugs } from "./journeys";

describe("legacy journey redirects", () => {
  const slugs = getJourneySlugs();
  const rules = legacyRedirectRules();

  it("maps every legacy slug to a slash-terminated /journeys destination", () => {
    for (const rule of rules) {
      expect(rule.source.startsWith("/jetjourneys/")).toBe(true);
      expect(rule.destination.startsWith("/journeys")).toBe(true);
      expect(rule.destination.endsWith("/")).toBe(true);
      expect(rule.permanent).toBe(true);
    }
  });

  it("only points at published journeys or the collection overview", () => {
    for (const destination of Object.values(legacyJourneyRedirects)) {
      if (destination === "/journeys/") continue;
      const slug = destination.replace(/^\/journeys\//, "").replace(/\/$/, "");
      expect(slugs).toContain(slug);
    }
  });

  it("gives every published journey an inbound redirect target", () => {
    const destinations = new Set(Object.values(legacyJourneyRedirects));
    for (const slug of slugs) {
      expect(destinations.has(`/journeys/${slug}/`)).toBe(true);
    }
  });

  it("has unique legacy sources", () => {
    const sources = rules.map((r) => r.source);
    expect(new Set(sources).size).toBe(sources.length);
  });
});
