// Central place for site-wide constants and business details.

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.abaton-jetjourneys.com";

// Interim/staging domains set NEXT_PUBLIC_NOINDEX=1 to stay out of search engines.
export const noindex = process.env.NEXT_PUBLIC_NOINDEX === "1";

export const company = {
  name: "ABATON JetJourneys GmbH",
  shortName: "ABATON JetJourneys",
  managingDirector: "Isabell Buchner",
  street: "Gehrenstraße 7",
  postalCode: "82433",
  city: "Bad Kohlgrub",
  country: "Germany",
  phone: "+49 175 729 31 27",
  phoneHref: "+491757293127",
  email: "info@abaton-jetjourneys.com",
  // Commercial register. The HRB number is confirmed; the registering court and
  // the VAT ID are still outstanding from the client (docs/OPEN-DECISIONS.md,
  // item 5.1). Empty values are omitted from the imprint rather than rendered
  // as "[…]" placeholders, a German imprint must not ship with visible gaps.
  registerNumber: "HRB 204597",
  // Statutory insolvency-protection provider (Kundengeldabsicherer), named in
  // the T&Cs per § 651r BGB. Outstanding from the client
  // (docs/OPEN-DECISIONS.md, item 5.5).
  insolvencyInsurer: "",
  registerCourt: "",
  vatId: "",
} as const;

/**
 * Year stamped into the footer copyright. Resolved once at build time, because
 * a runtime `new Date()` in an edge render would vary across cached responses.
 * Falls back to the current year so a rebuild always refreshes it.
 */
export const buildYear = Number(
  process.env.NEXT_PUBLIC_BUILD_YEAR ?? new Date().getFullYear(),
);

export const social = {
  instagram: "https://www.instagram.com/",
} as const;

/**
 * Default Open Graph / Twitter share image. Next.js does not inherit
 * `openGraph.images` into a route that defines its own `openGraph`, so pages
 * that set a per-page OG title/description spread this into their `images`.
 */
export const ogImage = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
} as const;
