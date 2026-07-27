import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    // Cloudflare edge transformations via a custom loader (see src/lib/imageLoader.ts).
    loader: "custom",
    loaderFile: "./src/lib/imageLoader.ts",
  },
  async redirects() {
    // Preserve the previous site's journey URLs (/jetjourneys/*) for SEO and
    // inbound links, mapping them to the current /journeys/* paths. Journeys
    // that no longer exist as separate editions point to the closest match or
    // to the collection overview.
    const map: Record<string, string> = {
      "the-premiere-edition---finest-of-europe": "/journeys/finest-of-europe/",
      "finest-of-europe": "/journeys/finest-of-europe/",
      "the-founders-edition-finest-of-europe": "/journeys/finest-of-europe/",
      "secrets-of-europe": "/journeys/secrets-of-europe/",
      "elegant-islands": "/journeys/elegant-islands/",
      "fascinating-balkan": "/journeys/fascinating-balkan/",
      "wild-scandinavia": "/journeys/wild-scandinavia/",
      "world´s-signature-journeys-": "/journeys/",
    };
    return Object.entries(map).map(([from, destination]) => ({
      source: `/jetjourneys/${from}`,
      destination,
      permanent: true,
    }));
  },
};

export default withNextIntl(nextConfig);

// Enable access to Cloudflare bindings (env) during `next dev` via OpenNext.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
