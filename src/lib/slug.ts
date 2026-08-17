/**
 * Turn a human headline into a stable, URL-safe fragment slug.
 *
 * Used for deep-linkable FAQ accordions: the slug becomes the element `id`
 * and the location hash, so it must be deterministic for a given headline and
 * contain only characters that are safe (and readable) inside a URL fragment.
 * German umlauts are transliterated (ä→ae, ö→oe, ü→ue, ß→ss) rather than
 * stripped, which keeps the slug legible and matches common German SEO usage.
 */
export function slugifyHeading(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // strip any remaining diacritics
    .replace(/[^a-z0-9]+/g, "-") // non-alphanumerics become single hyphens
    .replace(/^-+|-+$/g, ""); // trim leading/trailing hyphens
}
