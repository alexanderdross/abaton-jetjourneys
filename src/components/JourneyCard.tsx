import { useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { type Journey, pick, formatEUR } from "@/lib/journeys";
import { Media } from "./ui/Media";
import { JourneyStatusBadge } from "./JourneyStatusBadge";
import { ConvertedPrice } from "./fx/ConvertedPrice";

export function JourneyCard({
  journey,
  locale,
}: {
  journey: Journey;
  locale: Locale;
}) {
  const t = useTranslations("Journeys");

  return (
    <Link
      href={{ pathname: "/journeys/[slug]", params: { slug: journey.slug } }}
      title={t("cardTitle", { journey: pick(journey.title, locale) })}
      className="group block"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-ink">
        <div className="absolute inset-0 transition-transform duration-[1.2s] ease-out group-hover:scale-105">
          <Media
            src={journey.heroImage.src}
            alt={pick(journey.heroImage.alt, locale)}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
        <JourneyStatusBadge
          status={journey.status}
          tone="dark"
          className="absolute left-4 top-4 backdrop-blur-sm"
        />
      </div>

      <div className="mt-5">
        <p className="eyebrow mb-2">
          {journey.nights ? `${t("nights", { count: journey.nights })} · ` : ""}
          {pick(journey.guestsLabel, locale)}
        </p>
        <h3 className="font-serif text-2xl text-ink leading-snug group-hover:text-champagne-ink transition-colors">
          {pick(journey.title, locale)}
        </h3>
        <p className="mt-2 text-sm text-slate leading-relaxed line-clamp-2">
          {pick(journey.tagline, locale)}
        </p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-champagne-ink">
            {journey.status === "open"
              ? t("viewJourney")
              : t("joinInterestList")}
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </span>
          {journey.priceFrom ? (
            <span className="text-right">
              <span className="block text-xs text-slate whitespace-nowrap">
                {t("fromPrice", {
                  price: formatEUR(journey.priceFrom, locale),
                })}
              </span>
              {/* Reserved line: the converted price appears after hydration and
                  must not push the EUR figure around. */}
              <ConvertedPrice
                amount={journey.priceFrom}
                className="block h-4 text-[11px] leading-4 text-slate/70 whitespace-nowrap"
              />
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
