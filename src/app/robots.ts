import type { MetadataRoute } from "next";
import { siteUrl, noindex } from "@/lib/site";
import { localizedPath, type Href } from "@/lib/i18n-urls";

// Legal pages: keep out of the index in both locales.
const legalHrefs: Href[] = ["/imprint", "/terms-conditions", "/privacy"];

export default function robots(): MetadataRoute.Robots {
  // Interim/staging domain: block everything, no sitemap.
  if (noindex) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  const disallow = legalHrefs.flatMap((href) => [
    localizedPath("en", href),
    localizedPath("de", href),
  ]);

  return {
    rules: { userAgent: "*", allow: "/", disallow },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
