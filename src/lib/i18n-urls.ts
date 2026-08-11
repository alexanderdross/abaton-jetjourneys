import { routing, type Locale, type AppPathname } from "@/i18n/routing";
import { siteUrl } from "@/lib/site";

/**
 * Localised canonical + hreflang alternates, a pure function of the routing
 * config (no next-intl navigation import), so it runs anywhere incl. tests.
 *
 * URL scheme (localePrefix: "as-needed", default = en) with localised segments:
 *   English → abaton-jetjourneys.com/<path>/          (e.g. /contact/)
 *   German  → abaton-jetjourneys.com/de/<path-de>/    (e.g. /de/kontakt/)
 *
 * Trailing slashes are enforced app-wide (next.config `trailingSlash: true`).
 */

export type Href =
  AppPathname | { pathname: AppPathname; params?: Record<string, string> };

function withTrailingSlash(path: string): string {
  if (path === "/") return "/";
  return path.endsWith("/") ? path : `${path}/`;
}

/** Localised, slash-terminated path for a locale (e.g. "/de/kontakt/"). */
export function localizedPath(locale: Locale, href: Href): string {
  const internal = typeof href === "string" ? href : href.pathname;
  const params = typeof href === "string" ? {} : (href.params ?? {});

  const mapping = routing.pathnames[internal];
  let path: string = typeof mapping === "string" ? mapping : mapping[locale];

  // Fill dynamic segments, e.g. [slug] → the-premiere-edition.
  for (const [key, value] of Object.entries(params)) {
    path = path.replace(`[${key}]`, value);
  }

  // "as-needed": prefix all locales except the default.
  const prefixed =
    locale === routing.defaultLocale
      ? path
      : `/${locale}${path === "/" ? "" : path}`;

  return withTrailingSlash(prefixed);
}

/**
 * Absolute, locale-correct URL. Used by structured data, which needs the same
 * URLs as canonical/hreflang: English has no locale prefix ("/journeys/x/"),
 * German uses localised segments ("/de/reisen/x/").
 */
export function absoluteUrl(locale: Locale, href: Href): string {
  return `${siteUrl}${localizedPath(locale, href)}`;
}

export function altLinks(locale: Locale, href: Href) {
  const en = localizedPath("en", href);
  const de = localizedPath("de", href);

  return {
    canonical: locale === "de" ? de : en,
    languages: {
      en,
      de,
      "x-default": en,
    },
  };
}
