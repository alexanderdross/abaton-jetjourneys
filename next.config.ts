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
    // inbound links, mapping them to the new /journeys/* paths.
    const map: Record<string, string> = {
      "the-premiere-edition---finest-of-europe": "finest-of-europe",
      "finest-of-europe": "finest-of-europe",
      "the-founders-edition-finest-of-europe":
        "the-founders-edition-finest-of-europe",
      "secrets-of-europe": "secrets-of-europe",
      "elegant-islands": "elegant-islands",
      "fascinating-balkan": "fascinating-balkan",
      "wild-scandinavia": "wild-scandinavia",
      "world´s-signature-journeys-": "worlds-signature-journeys",
    };
    return Object.entries(map).map(([from, to]) => ({
      source: `/jetjourneys/${from}`,
      destination: `/journeys/${to}/`,
      permanent: true,
    }));
  },
};

export default withNextIntl(nextConfig);

// Enable access to Cloudflare bindings (env) during `next dev` via OpenNext.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
