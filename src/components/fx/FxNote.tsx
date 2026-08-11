"use client";

import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { formatRateDate } from "@/lib/fx/convert";
import { useFx } from "./FxProvider";

/**
 * The disclaimer that has to sit next to every converted figure: indicative
 * only, ECB reference rate with its date, and EUR as the currency ABATON
 * actually contracts and invoices in. Renders nothing when no conversion is on
 * the page, since there is then nothing to disclaim.
 */
export function FxNote({ className = "" }: { className?: string }) {
  const t = useTranslations("Currency");
  const locale = useLocale() as Locale;
  const { rateDate } = useFx();

  if (!rateDate) return null;

  return (
    <p className={className}>
      {t("rateNote", { date: formatRateDate(rateDate, locale) })}
    </p>
  );
}
