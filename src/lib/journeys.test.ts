import { describe, it, expect } from "vitest";
import {
  getReleasedJourneys,
  getUpcomingJourneys,
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

  it("exposes the mediterranean-essence journey by slug", () => {
    const journey = getJourneyBySlug("mediterranean-essence");
    expect(journey).toBeDefined();
    expect(journey?.nights).toBe(8);
    expect(journey?.route[0]).toBe("Zurich");
  });

  it("no longer carries the retired journeys", () => {
    expect(getJourneyBySlug("finest-of-europe")).toBeUndefined();
    expect(getJourneyBySlug("secrets-of-europe")).toBeUndefined();
  });

  it("carries exactly the four confirmed journeys", () => {
    expect(getJourneySlugs().sort()).toEqual([
      "elegant-islands",
      "fascinating-balkan",
      "mediterranean-essence",
      "wild-scandinavia",
    ]);
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
  // Journeys with a full itinerary (vs. teaser journeys that defer detail to the brochure).
  const full = journeys.filter((j) => j.itinerary.length > 0);

  it("every published journey has title, tagline, summary and hero in both locales", () => {
    for (const j of journeys) {
      expect(j.slug).toMatch(/^[a-z0-9-]+$/);
      expect(j.title.en.length && j.title.de.length).toBeTruthy();
      expect(j.tagline.en.length && j.tagline.de.length).toBeTruthy();
      expect(j.summary.en.length && j.summary.de.length).toBeTruthy();
      expect(j.heroImage.src.startsWith("/images/")).toBe(true);
    }
  });

  it("full journeys have a route of at least two stops", () => {
    for (const j of full) expect(j.route.length).toBeGreaterThanOrEqual(2);
  });

  it("full journeys have positive itinerary days and inclusions in both locales", () => {
    for (const j of full) {
      for (const d of j.itinerary) expect(d.day).toBeGreaterThan(0);
      expect(j.inclusions.en.length).toBeGreaterThan(0);
      expect(j.inclusions.de.length).toBeGreaterThan(0);
    }
  });

  it("gallery images point under /images/ with alt text in both locales", () => {
    for (const j of journeys) {
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

describe("release status", () => {
  const journeys = getPublishedJourneys();

  it("marks exactly one journey as open for booking", () => {
    const open = journeys.filter((j) => j.status === "open");
    expect(open.map((j) => j.slug)).toEqual(["elegant-islands"]);
  });

  it("splits the collection into released and upcoming without overlap", () => {
    const released = getReleasedJourneys();
    const upcoming = getUpcomingJourneys();
    expect(released.length + upcoming.length).toBe(journeys.length);
    const overlap = released.filter((r) =>
      upcoming.some((u) => u.slug === r.slug),
    );
    expect(overlap).toEqual([]);
  });

  it("features the released journey on the homepage", () => {
    const featured = journeys.filter((j) => j.featured);
    expect(featured.map((j) => j.slug)).toEqual(["elegant-islands"]);
    expect(featured[0].status).toBe("open");
  });
});

describe("elegant islands, 2027 briefing", () => {
  const journey = getJourneyBySlug("elegant-islands");

  it("exists and is open", () => {
    expect(journey).toBeDefined();
    expect(journey?.status).toBe("open");
  });

  it("uses the corrected five-chapter route", () => {
    expect(journey?.route).toEqual([
      "London",
      "Killarney & the Lakes",
      "Ashford Castle",
      "Scottish Highlands",
      "Edinburgh",
    ]);
  });

  it("drops the superseded stops", () => {
    const route = journey?.route.join(" ") ?? "";
    for (const stale of ["Galway", "Dublin", "Inverness"]) {
      expect(route).not.toContain(stale);
    }
  });

  it("withholds the internal technical gateway", () => {
    // Briefing section 18: Knock must never appear as a public destination.
    const publicText = JSON.stringify(journey);
    expect(publicText).not.toContain("Knock");
  });

  it("runs nine days with signature moments, exclusions and FAQ", () => {
    expect(journey?.itinerary).toHaveLength(9);
    expect(journey?.itinerary.map((d) => d.day)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9,
    ]);
    expect(journey?.signatureMoments.length).toBeGreaterThanOrEqual(5);
    expect(journey?.exclusions.en.length).toBeGreaterThan(0);
    expect(journey?.exclusions.de.length).toBeGreaterThan(0);
    expect(journey?.faq.length).toBeGreaterThanOrEqual(3);
  });

  it("names no hotel in the stays section", () => {
    // Client decision: properties are described by category only until the
    // allocations are contracted (docs/OPEN-DECISIONS.md item 4.6).
    const named = ["Connaught", "Europe Hotel", "Torridon", "Balmoral"];
    const stays = JSON.stringify(journey?.stays ?? []);
    for (const hotel of named) expect(stays).not.toContain(hotel);
  });
});

describe("group size", () => {
  it("is six to eight across every journey", () => {
    for (const j of getPublishedJourneys()) {
      expect(j.guestsLabel.en).toContain("8");
      expect(j.guestsLabel.en).not.toContain("10");
      expect(j.guestsLabel.de).not.toContain("10");
    }
  });

  it("is machine-readable on the released journey", () => {
    const journey = getJourneyBySlug("elegant-islands");
    expect(journey?.guestsMin).toBe(6);
    expect(journey?.guestsMax).toBe(8);
  });
});
