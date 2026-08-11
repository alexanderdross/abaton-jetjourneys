import { describe, it, expect, vi, afterEach } from "vitest";
import { parseEcbDaily, fetchEcbRates } from "./ecb";

// Shape of the real ECB daily file, trimmed to a handful of currencies.
const DAILY_XML = `<?xml version="1.0" encoding="UTF-8"?>
<gesmes:Envelope xmlns:gesmes="http://www.gesmes.org/xml/2002-08-01" xmlns="http://www.ecb.int/vocabulary/2002-08-01/eurofxref">
  <gesmes:subject>Reference rates</gesmes:subject>
  <gesmes:Sender><gesmes:name>European Central Bank</gesmes:name></gesmes:Sender>
  <Cube>
    <Cube time='2026-08-11'>
      <Cube currency='USD' rate='1.0921'/>
      <Cube currency='JPY' rate='171.44'/>
      <Cube currency='GBP' rate='0.8534'/>
      <Cube currency='CAD' rate='1.4832'/>
      <Cube currency='AUD' rate='1.6603'/>
    </Cube>
  </Cube>
</gesmes:Envelope>`;

describe("parseEcbDaily", () => {
  it("reads the reference date and the rates", () => {
    const payload = parseEcbDaily(DAILY_XML);

    expect(payload.base).toBe("EUR");
    expect(payload.date).toBe("2026-08-11");
    expect(payload.rates.USD).toBe(1.0921);
    expect(payload.rates.JPY).toBe(171.44);
    expect(payload.rates.CAD).toBe(1.4832);
    expect(payload.rates.AUD).toBe(1.6603);
  });

  it("keeps currencies the site does not display", () => {
    // Harmless, and it means adding a currency needs no parser change.
    expect(parseEcbDaily(DAILY_XML).rates.GBP).toBe(0.8534);
  });

  it("accepts double-quoted attributes", () => {
    const payload = parseEcbDaily(
      DAILY_XML.replace(/'/g, '"').replace(/^<\?xml version="1.0"/, "<?xml"),
    );
    expect(payload.date).toBe("2026-08-11");
    expect(payload.rates.USD).toBe(1.0921);
  });

  it("rejects a document without a reference date", () => {
    const undated = DAILY_XML.replace("time='2026-08-11'", "");
    expect(() => parseEcbDaily(undated)).toThrow(/reference date/);
  });

  it("rejects a document missing a displayed currency", () => {
    const noYen = DAILY_XML.replace("<Cube currency='JPY' rate='171.44'/>", "");
    expect(() => parseEcbDaily(noYen)).toThrow(/JPY/);
  });

  it("rejects an empty or truncated document", () => {
    expect(() => parseEcbDaily("")).toThrow();
    expect(() => parseEcbDaily("<Cube time='2026-08-11'>")).toThrow();
  });

  it("ignores a non-positive rate rather than trusting it", () => {
    const zeroed = DAILY_XML.replace("rate='1.0921'", "rate='0'");
    expect(() => parseEcbDaily(zeroed)).toThrow(/USD/);
  });
});

describe("fetchEcbRates", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns the parsed payload on success", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(DAILY_XML, { status: 200 })),
    );

    const payload = await fetchEcbRates();
    expect(payload?.date).toBe("2026-08-11");
  });

  it("returns null on an upstream error status", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("nope", { status: 503 })),
    );

    expect(await fetchEcbRates()).toBeNull();
  });

  it("returns null when the request throws (network, timeout)", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new Error("network down");
      }),
    );

    expect(await fetchEcbRates()).toBeNull();
  });

  it("returns null on a malformed document", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async () => new Response("<html>maintenance</html>", { status: 200 }),
      ),
    );

    expect(await fetchEcbRates()).toBeNull();
  });
});
