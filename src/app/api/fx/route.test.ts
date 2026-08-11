import { describe, it, expect, vi, afterEach } from "vitest";
import { GET } from "./route";
import { FALLBACK_RATES } from "@/lib/fx/fallback-rates";

const DAILY_XML = `<Cube><Cube time='2026-08-11'>
  <Cube currency='USD' rate='1.0921'/>
  <Cube currency='JPY' rate='171.44'/>
  <Cube currency='CAD' rate='1.4832'/>
  <Cube currency='AUD' rate='1.6603'/>
</Cube></Cube>`;

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("GET /api/fx", () => {
  it("serves the live ECB payload", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(DAILY_XML, { status: 200 })),
    );

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toMatchObject({
      base: "EUR",
      date: "2026-08-11",
      source: "ecb",
      stale: false,
    });
    expect(body.rates.USD).toBe(1.0921);
    expect(response.headers.get("cache-control")).toContain("s-maxage=21600");
  });

  // A price page must not break because the ECB is unreachable. Every failure
  // mode answers 200 with the snapshot, and the freshness check in the UI
  // decides whether that snapshot is recent enough to show.
  const failures: [string, () => unknown][] = [
    ["an upstream error status", async () => new Response("", { status: 500 })],
    [
      "a network failure",
      async () => {
        throw new Error("network down");
      },
    ],
    [
      "a timeout",
      async () => {
        throw new DOMException("timed out", "TimeoutError");
      },
    ],
    ["a malformed document", async () => new Response("<html/>")],
  ];

  for (const [label, impl] of failures) {
    it(`falls back to the snapshot on ${label}`, async () => {
      vi.stubGlobal("fetch", vi.fn(impl));

      const response = await GET();
      const body = await response.json();

      expect(response.status).toBe(200);
      expect(body).toMatchObject({
        source: "fallback",
        stale: true,
        date: FALLBACK_RATES.date,
      });
      expect(body.rates).toEqual(FALLBACK_RATES.rates);
      expect(response.headers.get("cache-control")).toContain("max-age=300");
    });
  }
});
