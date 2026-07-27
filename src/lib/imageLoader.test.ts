import { describe, it, expect, afterEach, vi } from "vitest";
import cloudflareLoader from "./imageLoader";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("cloudflareLoader", () => {
  it("serves the original outside production", () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("NEXT_PUBLIC_CF_IMAGES", "1");
    expect(cloudflareLoader({ src: "/images/home-hero.jpg", width: 800 })).toBe(
      "/images/home-hero.jpg",
    );
  });

  it("serves the original in production when the flag is off", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_CF_IMAGES", "0");
    expect(cloudflareLoader({ src: "/images/home-hero.jpg", width: 800 })).toBe(
      "/images/home-hero.jpg",
    );
  });

  it("rewrites to /cdn-cgi/image in production when enabled", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_CF_IMAGES", "1");
    expect(
      cloudflareLoader({ src: "/images/home-hero.jpg", width: 1280, quality: 90 }),
    ).toBe(
      "/cdn-cgi/image/width=1280,quality=90,format=auto,fit=scale-down/images/home-hero.jpg",
    );
  });

  it("defaults quality to 78 and normalises a missing leading slash", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_CF_IMAGES", "1");
    expect(cloudflareLoader({ src: "images/x.jpg", width: 640 })).toBe(
      "/cdn-cgi/image/width=640,quality=78,format=auto,fit=scale-down/images/x.jpg",
    );
  });

  it("leaves absolute remote URLs untouched", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_CF_IMAGES", "1");
    const remote = "https://imagedelivery.net/abc/def/public";
    expect(cloudflareLoader({ src: remote, width: 800 })).toBe(remote);
  });
});
