import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Media } from "@/components/ui/Media";
import { PillarGrid } from "@/components/ui/PillarGrid";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { altLinks } from "@/lib/i18n-urls";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Experience" });
  return {
    title: t("title"),
    description: t("lead"),
    alternates: altLinks(locale, "/experience"),
    openGraph: { type: "website", title: t("title"), description: t("lead") },
    twitter: { title: t("title"), description: t("lead") },
  };
}

export default async function ExperiencePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Experience");
  const nav = await getTranslations("Nav");
  const footer = await getTranslations("Footer");

  const rhythm = [1, 2, 3, 4, 5].map((n) => ({
    title: t(`rhythm${n}Title` as "rhythm1Title"),
    body: t(`rhythm${n}Body` as "rhythm1Body"),
  }));

  const standards = [1, 2, 3, 4, 5, 6].map((n) => ({
    title: t(`standard${n}Title` as "standard1Title"),
    body: t(`standard${n}Body` as "standard1Body"),
  }));

  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[440px] flex items-end">
        <div className="absolute inset-0">
          <Media
            src="/images/experiences/experiences.avif"
            alt={t("eyebrow")}
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-ink/40" />
        </div>
        <Container className="relative z-10 pb-14">
          <p className="eyebrow text-champagne-light">{t("eyebrow")}</p>
          <h1 className="display-serif mt-4 text-4xl sm:text-5xl lg:text-6xl text-bone max-w-3xl">
            {t("title")}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-bone/80">
            {t("lead")}
          </p>
          <div className="mt-8">
            <LinkButton
              href="/journeys"
              variant="outline"
              className="text-bone"
              title={nav("journeysTitle")}
            >
              {t("exploreCta")}
            </LinkButton>
          </div>
        </Container>
      </section>

      {/* The privileged experience */}
      <Section tone="bone">
        <Container size="narrow">
          <Breadcrumbs
            locale={locale}
            trail={[{ href: "/experience", label: t("eyebrow") }]}
            className="mb-10"
          />
          <Reveal>
            <h2 className="display-serif text-3xl sm:text-4xl text-ink">
              {t("introTitle")}
            </h2>
            <div className="prose-editorial mt-8">
              <p>{t("introBody1")}</p>
              <p>{t("introBody2")}</p>
              <p>{t("introBody3")}</p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* A day in the ABATON rhythm */}
      <Section tone="white">
        <Container>
          <Reveal>
            <h2 className="display-serif text-3xl sm:text-4xl text-center mb-16">
              {t("rhythmTitle")}
            </h2>
          </Reveal>
          <PillarGrid items={rhythm} variant="ruled" />
        </Container>
      </Section>

      {/* The ABATON standards */}
      <Section tone="bone">
        <Container>
          <Reveal>
            <h2 className="display-serif text-3xl sm:text-4xl text-center mb-16">
              {t("standardsTitle")}
            </h2>
          </Reveal>
          <div className="grid gap-x-12 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {standards.map((s, i) => (
              <Reveal key={s.title} delay={Math.min(i * 100, 400)}>
                <div className="border-t border-line pt-6">
                  <h3 className="font-serif text-xl text-ink">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate">
                    {s.body}
                  </p>
                  {i === standards.length - 1 && (
                    <p className="mt-3 text-sm leading-relaxed text-slate">
                      {t("termsIntro")}{" "}
                      <Link
                        href="/terms-conditions"
                        title={footer("termsTitle")}
                        className="text-champagne-ink underline underline-offset-4 hover:text-ink transition-colors"
                      >
                        {t("termsLink")}
                      </Link>
                      .
                    </p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* The ABATON Circle teaser */}
      <Section tone="ink">
        <Container size="narrow">
          <Reveal>
            <p className="eyebrow text-champagne-light">{t("circleTitle")}</p>
            <h2 className="display-serif mt-4 text-3xl sm:text-4xl text-bone">
              {t("circleLead")}
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-bone/70">
              <p>{t("circleBody1")}</p>
              <p>{t("circleBody2")}</p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Discover ABATON */}
      <Section tone="bone">
        <Container size="narrow" className="text-center">
          <Reveal>
            <h2 className="display-serif text-4xl sm:text-5xl text-ink">
              {t("discoverTitle")}
            </h2>
            <p className="mt-6 text-lg text-slate leading-relaxed">
              {t("discoverBody")}
            </p>
            <div className="mt-10">
              <LinkButton href="/journeys" title={nav("journeysTitle")}>
                {t("discoverCta")}
              </LinkButton>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
