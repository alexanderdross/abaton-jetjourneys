import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { localizedPath, type Href } from "@/lib/i18n-urls";
import { getJourneySlugs } from "@/lib/journeys";

// Internal hrefs; localised + slash-terminated per locale via localizedPath.
const staticHrefs: Href[] = ["/", "/journeys", "/about", "/contact"];

function entry(href: Href): MetadataRoute.Sitemap[number] {
  const en = `${siteUrl}${localizedPath("en", href)}`;
  const de = `${siteUrl}${localizedPath("de", href)}`;
  return {
    url: en,
    lastModified: new Date("2026-07-01"),
    alternates: { languages: { en, de } },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const journeyHrefs: Href[] = getJourneySlugs().map((slug) => ({
    pathname: "/journeys/[slug]",
    params: { slug },
  }));
  return [...staticHrefs, ...journeyHrefs].map(entry);
}
