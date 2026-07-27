import { z } from "zod";

// Pure, framework-free validation for the enquiry form. Kept separate from the
// server action (src/lib/actions.ts) so it can be unit-tested without pulling in
// Resend or the Cloudflare runtime.

export const requestSchema = z.object({
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

export type RequestInput = z.infer<typeof requestSchema>;

/** Escape user text before embedding it in the notification email HTML. */
export function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
