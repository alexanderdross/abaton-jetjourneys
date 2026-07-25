import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/imprint", "/terms-conditions", "/privacy", "/de/imprint", "/de/terms-conditions", "/de/privacy"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
