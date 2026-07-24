import type { Locale } from "@/i18n/routing";

/**
 * Build canonical + hreflang alternates for a page.
 *
 * URL scheme (localePrefix: "as-needed", default = en):
 *   English → abaton-jetjourneys.com/<path>
 *   German  → abaton-jetjourneys.com/de/<path>
 *
 * @param path locale-independent pathname, always starting with "/" ("/" for home).
 */
export function altLinks(locale: Locale, path: string) {
  const seg = path === "/" ? "" : path;
  const en = seg === "" ? "/" : seg;
  const de = `/de${seg}`;

  return {
    canonical: locale === "en" ? en : de,
    languages: {
      en,
      de,
      "x-default": en,
    },
  };
}
