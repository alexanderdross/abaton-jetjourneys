import type { MetadataRoute } from "next";
import { siteUrl, noindex } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Interim/staging domain: block everything, no sitemap.
  if (noindex) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/imprint",
        "/terms-conditions",
        "/privacy",
        "/de/imprint",
        "/de/terms-conditions",
        "/de/privacy",
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
