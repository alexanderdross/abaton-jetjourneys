"use server";

import { Resend } from "resend";
import { z } from "zod";
import { getEnv } from "./env";
import { company } from "./site";

export type RequestState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(60).optional().or(z.literal("")),
  guests: z.string().trim().max(20).optional().or(z.literal("")),
  journey: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().max(4000).optional().or(z.literal("")),
  locale: z.enum(["en", "de"]).default("en"),
  consent: z.literal("on", {
    errorMap: () => ({ message: "consent" }),
  }),
  token: z.string().optional(),
});

async function verifyTurnstile(
  token: string | undefined,
  secret: string | undefined,
  ip?: string,
): Promise<boolean> {
  // If Turnstile isn't configured yet, don't block submissions.
  if (!secret) return true;
  if (!token) return false;

  const form = new FormData();
  form.append("secret", secret);
  form.append("response", token);
  if (ip) form.append("remoteip", ip);

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    { method: "POST", body: form },
  );
  const data = (await res.json()) as { success: boolean };
  return data.success === true;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function submitRequest(
  _prev: RequestState,
  formData: FormData,
): Promise<RequestState> {
  const env = getEnv();

  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") ?? "",
    guests: formData.get("guests") ?? "",
    journey: formData.get("journey") ?? "",
    message: formData.get("message") ?? "",
    locale: formData.get("locale") ?? "en",
    consent: formData.get("consent"),
    token: formData.get("cf-turnstile-response") ?? undefined,
  });

  if (!parsed.success) {
    const isConsent = parsed.error.issues.some((i) => i.message === "consent");
    return { status: "error", message: isConsent ? "consent" : "validation" };
  }

  const data = parsed.data;

  const human = await verifyTurnstile(
    data.token,
    env.TURNSTILE_SECRET_KEY,
    undefined,
  );
  if (!human) {
    return { status: "error", message: "turnstile" };
  }

  // Without an API key (e.g. previews) we accept but cannot deliver.
  if (!env.RESEND_API_KEY) {
    console.warn("[submitRequest] RESEND_API_KEY missing, email not sent.");
    return { status: "success" };
  }

  const to = env.CONTACT_TO_EMAIL ?? company.email;
  const from = env.CONTACT_FROM_EMAIL ?? "no-reply@abaton-jetjourneys.com";

  const subject = data.journey
    ? `Journey enquiry, ${data.journey}`
    : "New enquiry, ABATON JetJourneys";

  const rows: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone || "-"],
    ["Guests", data.guests || "-"],
    ["Journey", data.journey || "General enquiry"],
    ["Language", data.locale.toUpperCase()],
    ["Message", data.message || "-"],
  ];

  const html = `
    <div style="font-family:Georgia,serif;color:#14171c;max-width:560px">
      <h2 style="font-weight:normal;letter-spacing:2px">ABATON, New Enquiry</h2>
      <table style="width:100%;border-collapse:collapse">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:8px 0;color:#4a5361;width:120px;vertical-align:top">${k}</td><td style="padding:8px 0">${escapeHtml(v)}</td></tr>`,
          )
          .join("")}
      </table>
    </div>`;

  try {
    const resend = new Resend(env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: `ABATON JetJourneys <${from}>`,
      to: [to],
      replyTo: data.email,
      subject,
      html,
    });
    if (error) {
      console.error("[submitRequest] Resend error", error);
      return { status: "error", message: "send" };
    }
    return { status: "success" };
  } catch (err) {
    console.error("[submitRequest] unexpected error", err);
    return { status: "error", message: "send" };
  }
}
