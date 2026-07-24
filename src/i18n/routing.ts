import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "de"],
  defaultLocale: "en",
  // English lives at the root (abaton-jetjourneys.com), German under /de.
  // "as-needed" omits the prefix for the default locale only.
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
