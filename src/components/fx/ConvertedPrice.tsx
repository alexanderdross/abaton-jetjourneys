"use client";

import { useTranslations } from "next-intl";
import { useFx } from "./FxProvider";

/**
 * The indicative local-currency line that accompanies a EUR price.
 *
 * Renders nothing for EUR visitors and nothing while the rates are missing or
 * stale. Callers that sit above the fold pass a reserved height so the EUR
 * figure never moves when the line appears.
 */
export function ConvertedPrice({
  amount,
  className = "",
}: {
  amount: number;
  className?: string;
}) {
  const t = useTranslations("Currency");
  const { convertEur } = useFx();
  const converted = convertEur(amount);

  return (
    <span className={className} aria-live="polite">
      {converted ? t("approx", { price: converted }) : null}
    </span>
  );
}
