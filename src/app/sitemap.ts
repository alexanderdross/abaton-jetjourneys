import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { localizedPath, type Href } from "@/lib/i18n-urls";
import { getJourneySlugs } from "@/lib/journeys";

// Internal hrefs; localised + slash-terminated per locale via localizedPath.
//
// Legal pages are deliberately absent: they are noindex and Disallow-ed in
// robots.ts, and listing URLs a sitemap asks crawlers not to index is a
// contradiction, not a completeness win.
const staticHrefs: Href[] = ["/", "/journeys", "/about", "/contact"];

function entry(href: Href): MetadataRoute.Sitemap[number] {
  const en = `${siteUrl}${localizedPath("en", href)}`;
  const de = `${siteUrl}${localizedPath("de", href)}`;
  return {
    url: en,
    lastModified: new Date("2026-07-01"),
    // x-default mirrors the hreflang set in src/lib/i18n-urls.ts: English is the
    // fallback for locales we do not serve.
    alternates: { languages: { en, de, "x-default": en } },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const journeyHrefs: Href[] = getJourneySlugs().map((slug) => ({
    pathname: "/journeys/[slug]",
    params: { slug },
  }));
  return [...staticHrefs, ...journeyHrefs].map(entry);
}
