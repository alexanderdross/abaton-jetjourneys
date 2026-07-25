"use client";

import { useActionState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Script from "next/script";
import { submitRequest, type RequestState } from "@/lib/actions";
import { Button } from "./ui/Button";

const initialState: RequestState = { status: "idle" };

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function RequestForm({
  defaultJourney,
  journeySlug,
}: {
  defaultJourney?: string;
  journeySlug?: string;
}) {
  const t = useTranslations("RequestForm");
  const locale = useLocale();
  const [state, formAction, pending] = useActionState(
    submitRequest,
    initialState,
  );

  if (state.status === "success") {
    return (
      <div className="text-center py-10">
        <p className="font-serif text-2xl text-ink mb-3">{t("successTitle")}</p>
        <p className="text-slate">{t("successBody")}</p>
      </div>
    );
  }

  const errorText =
    state.message === "consent"
      ? t("validationConsent")
      : state.message === "validation"
        ? t("validationRequired")
        : t("errorBody");

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="locale" value={locale} />
      {journeySlug && (
        <input type="hidden" name="journeySlug" value={journeySlug} />
      )}

      <Field label={t("journeyLabel")}>
        <input
          name="journey"
          defaultValue={defaultJourney ?? ""}
          placeholder={t("journeyPlaceholder")}
          className={inputClass}
          readOnly={Boolean(defaultJourney)}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("name")} required>
          <input name="name" required className={inputClass} autoComplete="name" />
        </Field>
        <Field label={t("email")} required>
          <input
            name="email"
            type="email"
            required
            className={inputClass}
            autoComplete="email"
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("phone")}>
          <input name="phone" className={inputClass} autoComplete="tel" />
        </Field>
        <Field label={t("guests")}>
          <input name="guests" inputMode="numeric" className={inputClass} />
        </Field>
      </div>

      <Field label={t("message")}>
        <textarea
          name="message"
          rows={4}
          placeholder={t("messagePlaceholder")}
          className={`${inputClass} resize-none`}
        />
      </Field>

      <label className="flex items-start gap-3 text-sm text-slate cursor-pointer">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-1 accent-[var(--color-champagne)]"
        />
        <span>{t("consent")}</span>
      </label>

      {siteKey && (
        <>
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            strategy="lazyOnload"
          />
          <div
            className="cf-turnstile"
            data-sitekey={siteKey}
            data-theme="light"
          />
        </>
      )}

      {state.status === "error" && (
        <p className="text-sm text-red-700">{errorText}</p>
      )}

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}

const inputClass =
  "w-full border-b border-line bg-transparent py-3 text-ink placeholder:text-slate/50 focus:border-champagne focus:outline-none transition-colors";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-[0.14em] text-slate mb-1">
        {label}
        {required && <span className="text-champagne"> *</span>}
      </span>
      {children}
    </label>
  );
}
