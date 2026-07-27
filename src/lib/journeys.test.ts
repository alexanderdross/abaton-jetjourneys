import { describe, it, expect } from "vitest";
import {
  getPublishedJourneys,
  getJourneySlugs,
  getJourneyBySlug,
  getFeaturedJourney,
  journeySchema,
  pick,
} from "./journeys";

describe("journeys content layer", () => {
  it("loads and zod-validates at least one published journey", () => {
    // Importing the module runs the zod parse; a malformed journey would throw.
    const journeys = getPublishedJourneys();
    expect(journeys.length).toBeGreaterThan(0);
  });

  it("exposes the premiere edition by slug", () => {
    const journey = getJourneyBySlug(
      "the-premiere-edition-finest-of-europe",
    );
    expect(journey).toBeDefined();
    expect(journey?.nights).toBe(8);
    expect(journey?.route[0]).toBe("Munich");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getJourneyBySlug("does-not-exist")).toBeUndefined();
  });

  it("always has a featured journey", () => {
    expect(getFeaturedJourney()).toBeDefined();
  });

  it("slugs match the published set", () => {
    expect(getJourneySlugs().sort()).toEqual(
      getPublishedJourneys()
        .map((j) => j.slug)
        .sort(),
    );
  });

  it("pick() selects the right locale from a localised field", () => {
    const journey = getFeaturedJourney()!;
    expect(pick(journey.title, "en")).toBe(journey.title.en);
    expect(pick(journey.title, "de")).toBe(journey.title.de);
    expect(journey.title.en).not.toBe(journey.title.de);
  });

  it("every itinerary day carries both languages", () => {
    for (const journey of getPublishedJourneys()) {
      for (const day of journey.itinerary) {
        expect(day.title.en.length).toBeGreaterThan(0);
        expect(day.title.de.length).toBeGreaterThan(0);
        expect(day.description.en.length).toBeGreaterThan(0);
        expect(day.description.de.length).toBeGreaterThan(0);
      }
    }
  });
});

describe("journey content integrity", () => {
  const journeys = getPublishedJourneys();

  it("every slug is url-safe", () => {
    for (const j of journeys) expect(j.slug).toMatch(/^[a-z0-9-]+$/);
  });

  it("routes have at least two stops", () => {
    for (const j of journeys) expect(j.route.length).toBeGreaterThanOrEqual(2);
  });

  it("itinerary days are positive and inclusions non-empty in both locales", () => {
    for (const j of journeys) {
      expect(j.itinerary.length).toBeGreaterThan(0);
      for (const d of j.itinerary) expect(d.day).toBeGreaterThan(0);
      expect(j.inclusions.en.length).toBeGreaterThan(0);
      expect(j.inclusions.de.length).toBeGreaterThan(0);
    }
  });

  it("hero and gallery images point under /images/", () => {
    for (const j of journeys) {
      expect(j.heroImage.src.startsWith("/images/")).toBe(true);
      for (const g of j.gallery) {
        expect(g.src.startsWith("/images/")).toBe(true);
        expect(g.alt.en.length).toBeGreaterThan(0);
        expect(g.alt.de.length).toBeGreaterThan(0);
      }
    }
  });

  it("journeySchema rejects a malformed journey", () => {
    expect(() =>
      journeySchema.parse({ slug: "Bad Slug!", published: true }),
    ).toThrow();
  });
});
