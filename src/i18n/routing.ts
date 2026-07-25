import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "de"],
  defaultLocale: "en",
  // English lives at the root (abaton-jetjourneys.com), German under /de.
  // "as-needed" omits the prefix for the default locale only.
  localePrefix: "as-needed",
  // Localised URL segments: German URLs use German words (e.g. /de/kontakt).
  // Keys are the internal (app-router) pathnames; values are the external paths
  // per locale. next-intl rewrites localised URLs to the internal routes.
  pathnames: {
    "/": "/",
    "/journeys": { en: "/journeys", de: "/reisen" },
    "/journeys/[slug]": { en: "/journeys/[slug]", de: "/reisen/[slug]" },
    "/about": { en: "/about", de: "/philosophie" },
    "/contact": { en: "/contact", de: "/kontakt" },
    "/imprint": { en: "/imprint", de: "/impressum" },
    "/terms-conditions": { en: "/terms-conditions", de: "/agb" },
    "/privacy": { en: "/privacy", de: "/datenschutz" },
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
