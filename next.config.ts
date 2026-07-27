import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { legacyRedirectRules } from "./src/lib/legacy-redirects";

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
    return legacyRedirectRules();
  },
};

export default withNextIntl(nextConfig);

// Enable access to Cloudflare bindings (env) during `next dev` via OpenNext.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
