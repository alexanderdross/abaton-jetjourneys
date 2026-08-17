// Legacy journey URLs from the previous site (/jetjourneys/*), mapped to the
// current /journeys/* paths for SEO and inbound links. Retired editions point
// to the closest match or to the collection overview.
//
// Kept in its own module (not inline in next.config.ts) so the mapping can be
// unit-tested without loading the Next.js config and its plugins.

export const legacyJourneyRedirects: Record<string, string> = {
  // Retired journeys (Finest of Europe, Secrets of Europe) now point at the
  // collection overview: their detail pages no longer exist.
  "the-premiere-edition---finest-of-europe": "/journeys/",
  "finest-of-europe": "/journeys/",
  "the-founders-edition-finest-of-europe": "/journeys/",
  "secrets-of-europe": "/journeys/",
  "elegant-islands": "/journeys/elegant-islands/",
  "mediterranean-essence": "/journeys/mediterranean-essence/",
  "fascinating-balkan": "/journeys/fascinating-balkan/",
  "wild-scandinavia": "/journeys/wild-scandinavia/",
  "world´s-signature-journeys-": "/journeys/",
};

export type RedirectRule = {
  source: string;
  destination: string;
  permanent: boolean;
};

/** Build Next.js redirect rules from the legacy mapping. */
export function legacyRedirectRules(): RedirectRule[] {
  return Object.entries(legacyJourneyRedirects).map(([from, destination]) => ({
    source: `/jetjourneys/${from}`,
    destination,
    permanent: true,
  }));
}
