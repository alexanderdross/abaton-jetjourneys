import { describe, it, expect, vi, beforeEach } from "vitest";

// Hoisted mock state (referenced inside vi.mock factories).
const { sendMock, envMock } = vi.hoisted(() => ({
  sendMock: vi.fn(),
  envMock: { value: {} as Record<string, string | undefined> },
}));

vi.mock("resend", () => ({
  Resend: vi.fn(() => ({ emails: { send: sendMock } })),
}));

vi.mock("@/lib/env", () => ({ getEnv: () => envMock.value }));

import { submitRequest } from "./actions";

const idle = { status: "idle" as const };

function form(fields: Record<string, string | undefined>): FormData {
  const f = new FormData();
  for (const [k, v] of Object.entries(fields)) {
    if (v !== undefined) f.append(k, v);
  }
  return f;
}

const validFields = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  consent: "on",
  locale: "en",
  "cf-turnstile-response": "tok",
};

function mockTurnstile(success: boolean) {
  global.fetch = vi.fn(
    async () => new Response(JSON.stringify({ success }), { status: 200 }),
  ) as unknown as typeof fetch;
}

describe("submitRequest", () => {
  beforeEach(() => {
    sendMock.mockReset().mockResolvedValue({ error: null });
    envMock.value = { TURNSTILE_SECRET_KEY: "secret" };
    mockTurnstile(true);
  });

  it("rejects a submission without a Turnstile token", async () => {
    const res = await submitRequest(
      idle,
      form({ ...validFields, "cf-turnstile-response": undefined }),
    );
    expect(res).toEqual({ status: "error", message: "turnstile" });
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("rejects a failed Turnstile challenge", async () => {
    mockTurnstile(false);
    const res = await submitRequest(idle, form(validFields));
    expect(res).toEqual({ status: "error", message: "turnstile" });
  });

  it("reports a validation error for a missing name", async () => {
    const res = await submitRequest(
      idle,
      form({ ...validFields, name: undefined }),
    );
    expect(res).toEqual({ status: "error", message: "validation" });
  });

  it("reports a consent error when consent is not given", async () => {
    const res = await submitRequest(
      idle,
      form({ ...validFields, consent: undefined }),
    );
    expect(res).toEqual({ status: "error", message: "consent" });
  });

  it("succeeds without a Resend key but does not send email", async () => {
    envMock.value = { TURNSTILE_SECRET_KEY: "secret" }; // no RESEND_API_KEY
    const res = await submitRequest(idle, form(validFields));
    expect(res).toEqual({ status: "success" });
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("sends the enquiry email when a Resend key is configured", async () => {
    envMock.value = {
      TURNSTILE_SECRET_KEY: "secret",
      RESEND_API_KEY: "re_test",
    };
    const res = await submitRequest(
      idle,
      form({ ...validFields, journey: "Finest of Europe" }),
    );
    expect(res).toEqual({ status: "success" });
    expect(sendMock).toHaveBeenCalledTimes(1);
    const payload = sendMock.mock.calls[0][0];
    expect(payload.replyTo).toBe("ada@example.com");
    expect(payload.subject).toContain("Finest of Europe");
  });

  it("escapes user input in the email HTML", async () => {
    envMock.value = {
      TURNSTILE_SECRET_KEY: "secret",
      RESEND_API_KEY: "re_test",
    };
    await submitRequest(
      idle,
      form({ ...validFields, message: "<script>alert(1)</script>" }),
    );
    const payload = sendMock.mock.calls[0][0];
    expect(payload.html).not.toContain("<script>alert(1)</script>");
    expect(payload.html).toContain("&lt;script&gt;");
  });
});
