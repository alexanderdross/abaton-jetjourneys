import { describe, it, expect } from "vitest";
import { requestSchema, escapeHtml } from "./request-schema";

const valid = {
  name: "Isabell Buchner",
  email: "guest@example.com",
  consent: "on",
};

describe("requestSchema", () => {
  it("accepts a minimal valid enquiry and defaults locale to en", () => {
    const r = requestSchema.safeParse(valid);
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.locale).toBe("en");
  });

  it("rejects an invalid email", () => {
    const r = requestSchema.safeParse({ ...valid, email: "not-an-email" });
    expect(r.success).toBe(false);
  });

  it("requires consent to equal 'on'", () => {
    const r = requestSchema.safeParse({ ...valid, consent: "off" });
    expect(r.success).toBe(false);
    if (!r.success) {
      expect(r.error.issues.some((i) => i.message === "consent")).toBe(true);
    }
  });

  it("rejects a name shorter than 2 characters", () => {
    expect(requestSchema.safeParse({ ...valid, name: "A" }).success).toBe(
      false,
    );
  });

  it("rejects an over-long message", () => {
    const long = "x".repeat(4001);
    expect(requestSchema.safeParse({ ...valid, message: long }).success).toBe(
      false,
    );
  });

  it("accepts empty optional fields", () => {
    const r = requestSchema.safeParse({
      ...valid,
      phone: "",
      guests: "",
      journey: "",
      message: "",
    });
    expect(r.success).toBe(true);
  });

  it("only allows en/de locales", () => {
    expect(requestSchema.safeParse({ ...valid, locale: "fr" }).success).toBe(
      false,
    );
    expect(requestSchema.safeParse({ ...valid, locale: "de" }).success).toBe(
      true,
    );
  });
});

describe("escapeHtml", () => {
  it("escapes &, < and >", () => {
    expect(escapeHtml('<b>Tom & "Jerry"</b>')).toBe(
      '&lt;b&gt;Tom &amp; "Jerry"&lt;/b&gt;',
    );
  });

  it("leaves plain text untouched", () => {
    expect(escapeHtml("Vienna to Paris")).toBe("Vienna to Paris");
  });
});
