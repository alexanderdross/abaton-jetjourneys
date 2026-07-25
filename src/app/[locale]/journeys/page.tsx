import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { JourneyCard } from "@/components/JourneyCard";
import { getPublishedJourneys } from "@/lib/journeys";
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
  };
}

export default async function JourneysPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Journeys");
  const journeys = getPublishedJourneys();

  return (
    <div className="pt-32 pb-24">
      <Container>
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

        {journeys.length > 0 ? (
          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {journeys.map((journey, i) => (
              <Reveal key={journey.slug} delay={i * 100}>
                <JourneyCard journey={journey} locale={locale} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="mt-16 text-lg text-slate">{t("emptyState")}</p>
        )}
      </Container>
    </div>
  );
}
