import { z } from "zod";
import type { Locale } from "@/i18n/routing";
import { journeys as journeyData } from "@/content/journeys";

/**
 * Content-as-code journey model.
 *
 * Journeys live as typed TS objects in `src/content/journeys`. Localised fields
 * carry both `en` and `de` so translation completeness is visible at a glance.
 * Everything is validated with zod at module load, so a malformed journey fails
 * the build rather than shipping broken.
 */

const localized = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({ en: schema, de: schema });

const imageSchema = z.object({
  src: z.string(),
  alt: localized(z.string()),
});

const itineraryDaySchema = z.object({
  day: z.number().int().positive(),
  city: z.string(),
  title: localized(z.string()),
  description: localized(z.string()),
});

const localizedList = localized(z.array(z.string()));

/** A titled card: signature moments, places to stay, brand pillars. */
const titledEntrySchema = z.object({
  title: localized(z.string()),
  description: localized(z.string()),
});

const faqItemSchema = z.object({
  question: localized(z.string()),
  answer: localized(z.string()),
});

/**
 * Release status. Drives the UI, not visibility: `published` decides whether a
 * journey renders at all, `status` decides how. Defaults to "interest_list" so
 * a new journey is never accidentally presented as bookable.
 */
export const journeyStatuses = [
  "open",
  "interest_list",
  "in_development",
  "invitation_only",
] as const;

export type JourneyStatus = (typeof journeyStatuses)[number];

export const journeySchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  published: z.boolean(),
  status: z.enum(journeyStatuses).default("interest_list"),
  featured: z.boolean().default(false),
  order: z.number().default(0),
  // Always present.
  title: localized(z.string()),
  tagline: localized(z.string()),
  summary: localized(z.string()),
  guestsLabel: localized(z.string()),
  heroImage: imageSchema,
  // Detail fields, optional so a journey can be published as a teaser (the full
  // itinerary and pricing are shared in the personal brochure on request).
  nights: z.number().int().positive().optional(),
  // Machine-readable group size, alongside the display string `guestsLabel`.
  guestsMin: z.number().int().positive().optional(),
  guestsMax: z.number().int().positive().optional(),
  departureCity: localized(z.string()).optional(),
  hotelCategory: localized(z.string()).optional(),
  // "from" prices per person (EUR), and the next scheduled departure.
  priceFrom: z.number().int().positive().optional(),
  priceFromSingle: z.number().int().positive().optional(),
  nextDeparture: localized(z.string()).optional(),
  // Optional SEO overrides. Without them the page falls back to title/summary.
  seoTitle: localized(z.string()).optional(),
  seoDescription: localized(z.string()).optional(),
  // Countries shown under the journey title (e.g. "England · Ireland · Scotland").
  countries: localized(z.string()).optional(),
  // Closing note under the day-by-day: what is finalised later (hotels, timings).
  programmeNote: localized(z.string()).optional(),
  route: z.array(z.string()).default([]),
  gallery: z.array(imageSchema).default([]),
  overview: localizedList.default({ en: [], de: [] }),
  itinerary: z.array(itineraryDaySchema).default([]),
  inclusions: localizedList.default({ en: [], de: [] }),
  exclusions: localizedList.default({ en: [], de: [] }),
  signatureMoments: z.array(titledEntrySchema).default([]),
  stays: z.array(titledEntrySchema).default([]),
  faq: z.array(faqItemSchema).default([]),
});

export type Journey = z.infer<typeof journeySchema>;

// Validate all journeys once, at import time.
const parsed = z
  .array(journeySchema)
  .parse(journeyData)
  .sort((a, b) => a.order - b.order);

/** Pick the value for a locale from a localised field. */
export function pick<T>(field: { en: T; de: T }, locale: Locale): T {
  return field[locale];
}

/** Format an amount as a whole-euro currency string for the locale. */
export function formatEUR(amount: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === "de" ? "de-DE" : "en-US", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** All published journeys, ordered. */
export function getPublishedJourneys(): Journey[] {
  return parsed.filter((j) => j.published);
}

/** Journeys open for booking, the "Currently Released" group. */
export function getReleasedJourneys(): Journey[] {
  return getPublishedJourneys().filter((j) => j.status === "open");
}

/** Everything not yet open, the "Journeys in Development" group. */
export function getUpcomingJourneys(): Journey[] {
  return getPublishedJourneys().filter((j) => j.status !== "open");
}

/** All journey slugs (for generateStaticParams). */
export function getJourneySlugs(): string[] {
  return getPublishedJourneys().map((j) => j.slug);
}

/** A single published journey by slug, or undefined. */
export function getJourneyBySlug(slug: string): Journey | undefined {
  return getPublishedJourneys().find((j) => j.slug === slug);
}

/** The featured journey for the homepage (falls back to the first). */
export function getFeaturedJourney(): Journey | undefined {
  const published = getPublishedJourneys();
  return published.find((j) => j.featured) ?? published[0];
}
