import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { getPublishedJourneys } from "./journeys";

// Every image path referenced in content must resolve to a real file under
// public/, so a typo in a src (wrong name or extension) fails CI, not the site.

const publicDir = join(process.cwd(), "public");
const onDisk = (src: string) => existsSync(join(publicDir, src));

describe("referenced images exist on disk", () => {
  const journeys = getPublishedJourneys();

  it("every journey hero image exists and lives under /images/", () => {
    for (const j of journeys) {
      expect(j.heroImage.src.startsWith("/images/")).toBe(true);
      expect(onDisk(j.heroImage.src), `missing: ${j.heroImage.src}`).toBe(true);
    }
  });

  it("every journey gallery image exists", () => {
    for (const j of journeys) {
      for (const img of j.gallery) {
        expect(onDisk(img.src), `missing: ${img.src}`).toBe(true);
      }
    }
  });

  it("the static hero and logo assets exist", () => {
    const staticAssets = [
      "/images/home-hero.jpg",
      "/images/about-hero.jpg",
      "/logos/abaton-white.png",
      "/logos/abaton-black.png",
    ];
    for (const src of staticAssets) {
      expect(onDisk(src), `missing: ${src}`).toBe(true);
    }
  });
});
