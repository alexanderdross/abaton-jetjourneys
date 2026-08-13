"use client";

import { useId } from "react";
import { useTranslations } from "next-intl";
import { DISPLAY_CURRENCIES, isDisplayCurrency } from "@/lib/fx/currencies";
import { useFx } from "./FxProvider";

// Symbols read faster than codes in a header, the code stays for clarity.
const LABELS: Record<string, string> = {
  EUR: "EUR €",
  USD: "USD $",
  CAD: "CAD $",
  JPY: "JPY ¥",
  AUD: "AUD $",
};

/**
 * Currency selector, next to the language switcher. A native select so it
 * behaves on touch devices and stays keyboard accessible. The choice is stored
 * in a cookie and always wins over the country-derived preselection.
 */
export function CurrencySwitcher({
  className = "",
  light = false,
}: {
  className?: string;
  // See LanguageSwitcher: bright gold over a dark hero, accessible darker gold
  // on light grounds.
  light?: boolean;
}) {
  const t = useTranslations("Currency");
  const { currency, setCurrency } = useFx();
  const id = useId();
  const accent = light
    ? "hover:text-champagne focus-visible:ring-champagne"
    : "hover:text-champagne-ink focus-visible:ring-champagne-ink";

  return (
    <div className={`text-xs tracking-[0.15em] ${className}`}>
      <label htmlFor={id} className="sr-only">
        {t("switcherLabel")}
      </label>
      <select
        id={id}
        value={currency}
        onChange={(event) => {
          if (isDisplayCurrency(event.target.value)) {
            setCurrency(event.target.value);
          }
        }}
        title={t("switcherTitle")}
        className={`cursor-pointer appearance-none bg-transparent pr-1 opacity-70 transition-colors focus-visible:outline-none focus-visible:ring-2 ${accent}`}
      >
        {DISPLAY_CURRENCIES.map((code) => (
          <option key={code} value={code} className="bg-bone text-ink">
            {LABELS[code]}
          </option>
        ))}
      </select>
    </div>
  );
}
