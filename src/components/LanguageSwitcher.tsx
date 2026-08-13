"use client";

import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const labels: Record<string, string> = { en: "EN", de: "DE" };
const titleKeys = { en: "switchToEn", de: "switchToDe" } as const;

export function LanguageSwitcher({
  className = "",
  light = false,
}: {
  className?: string;
  // `light` = rendered over a dark hero, keep the bright gold; otherwise the
  // accent sits on a light ground and must use the accessible darker gold.
  light?: boolean;
}) {
  const locale = useLocale();
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const active = light ? "text-champagne" : "text-champagne-ink";
  const hover = light ? "hover:text-champagne" : "hover:text-champagne-ink";

  const switchTo = (loc: string) => {
    // pathname + params together resolve dynamic routes (e.g. /journeys/[slug]).
    // They always match for the current route, so the type mismatch is safe.
    // @ts-expect-error -- pathname/params correlation is guaranteed at runtime.
    router.replace({ pathname, params }, { locale: loc });
  };

  return (
    <div
      className={`flex items-center gap-1 text-xs tracking-[0.15em] ${className}`}
      role="group"
      aria-label={t("languageLabel")}
    >
      {routing.locales.map((loc, i) => (
        <span key={loc} className="flex items-center gap-1">
          {i > 0 && <span className="opacity-30">/</span>}
          <button
            type="button"
            onClick={() => switchTo(loc)}
            title={t(titleKeys[loc])}
            aria-current={loc === locale ? "true" : undefined}
            className={`transition-colors ${hover} ${
              loc === locale ? active : "opacity-70"
            }`}
          >
            {labels[loc]}
          </button>
        </span>
      ))}
    </div>
  );
}
