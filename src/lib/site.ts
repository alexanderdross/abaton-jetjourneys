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
} as const;

export const social = {
  instagram: "https://www.instagram.com/",
} as const;
