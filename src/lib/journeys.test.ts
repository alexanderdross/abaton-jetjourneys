import { describe, it, expect } from "vitest";
import {
  getPublishedJourneys,
  getJourneySlugs,
  getJourneyBySlug,
  getFeaturedJourney,
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
