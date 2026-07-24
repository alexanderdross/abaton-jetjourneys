import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { getJourneySlugs } from "@/lib/journeys";

// Locale-independent paths; English is served at the root, German under /de.
const staticPaths = ["/", "/journeys", "/about", "/contact"];

function entry(path: string): MetadataRoute.Sitemap[number] {
  const en = path === "/" ? "" : path;
  return {
    url: `${siteUrl}${en || "/"}`,
    lastModified: new Date("2026-07-01"),
    alternates: {
      languages: {
        en: `${siteUrl}${en || "/"}`,
        de: `${siteUrl}/de${en}`,
      },
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const journeyPaths = getJourneySlugs().map((slug) => `/journeys/${slug}`);
  return [...staticPaths, ...journeyPaths].map(entry);
}
