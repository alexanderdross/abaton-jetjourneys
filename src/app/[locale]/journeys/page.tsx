import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { JourneyCard } from "@/components/JourneyCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FxNote } from "@/components/fx/FxNote";
import { getReleasedJourneys, getUpcomingJourneys } from "@/lib/journeys";
import { altLinks } from "@/lib/i18n-urls";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Journeys" });
  return {
    title: t("title"),
    description: t("intro"),
    alternates: altLinks(locale, "/journeys"),
    // Without this the page inherits the site-default OG title/description.
    openGraph: { type: "website", title: t("title"), description: t("intro") },
  };
}

export default async function JourneysPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Journeys");
  const released = getReleasedJourneys();
  const upcoming = getUpcomingJourneys();

  return (
    <div className="pt-32 pb-24">
      <Container>
        <Breadcrumbs
          locale={locale}
          trail={[{ href: "/journeys", label: t("title") }]}
          className="mb-10"
        />
        <Reveal>
          <header className="max-w-2xl">
            <p className="eyebrow">{t("eyebrow")}</p>
            <h1 className="display-serif mt-5 text-5xl sm:text-6xl">
              {t("title")}
            </h1>
            <p className="mt-6 text-lg text-slate leading-relaxed">
              {t("intro")}
            </p>
          </header>
        </Reveal>

        {released.length === 0 && upcoming.length === 0 && (
          <p className="mt-16 text-lg text-slate">{t("emptyState")}</p>
        )}

        {released.length > 0 && (
          <section className="mt-20">
            <Reveal>
              <h2 className="eyebrow">{t("releasedTitle")}</h2>
            </Reveal>
            <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {released.map((journey, i) => (
                <Reveal key={journey.slug} delay={i * 100}>
                  <JourneyCard journey={journey} locale={locale} />
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {upcoming.length > 0 && (
          <section className="mt-24 border-t border-line pt-16">
            <Reveal>
              <h2 className="eyebrow">{t("upcomingTitle")}</h2>
              <p className="mt-5 max-w-2xl text-slate leading-relaxed">
                {t("upcomingIntro")}
              </p>
            </Reveal>
            <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((journey, i) => (
                <Reveal key={journey.slug} delay={i * 100}>
                  <JourneyCard journey={journey} locale={locale} />
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* Disclaimer for the indicative local-currency figures on the cards.
            Renders only when a conversion is actually shown. */}
        <FxNote className="mt-12 text-xs leading-relaxed text-slate/70" />
      </Container>
    </div>
  );
}
