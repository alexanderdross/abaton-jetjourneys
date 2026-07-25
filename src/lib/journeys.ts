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

export const journeySchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  published: z.boolean(),
  featured: z.boolean().default(false),
  order: z.number().default(0),
  title: localized(z.string()),
  tagline: localized(z.string()),
  summary: localized(z.string()),
  nights: z.number().int().positive(),
  guestsLabel: localized(z.string()),
  departureCity: localized(z.string()),
  hotelCategory: localized(z.string()),
  route: z.array(z.string()).min(2),
  heroImage: imageSchema,
  gallery: z.array(imageSchema).default([]),
  overview: localized(z.array(z.string())),
  itinerary: z.array(itineraryDaySchema),
  inclusions: localized(z.array(z.string())),
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

/** All published journeys, ordered. */
export function getPublishedJourneys(): Journey[] {
  return parsed.filter((j) => j.published);
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
