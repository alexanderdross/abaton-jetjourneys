import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Media } from "@/components/ui/Media";
import { JourneyCard } from "@/components/JourneyCard";
import { JourneyStatusBadge } from "@/components/JourneyStatusBadge";
import { RouteMap } from "@/components/RouteMap";
import { getFeaturedJourney, pick, formatEUR } from "@/lib/journeys";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/JsonLd";
import { FxNote } from "@/components/fx/FxNote";

type PageProps = { params: Promise<{ locale: Locale }> };

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");
  const nav = await getTranslations("Nav");
  const jt = await getTranslations("Journeys");
  const featured = getFeaturedJourney();

  const pillars = [1, 2, 3, 4].map((n) => ({
    title: t(`pillar${n}Title` as "pillar1Title"),
    body: t(`pillar${n}Body` as "pillar1Body"),
  }));

  // Facts line under the featured journey, mirroring the client home layout:
  // dates, nights, group size and hub, whichever are set.
  const featuredFacts = featured
    ? [
        featured.nextDeparture ? pick(featured.nextDeparture, locale) : null,
        featured.nights ? jt("nights", { count: featured.nights }) : null,
        pick(featured.guestsLabel, locale),
        featured.departureCity ? pick(featured.departureCity, locale) : null,
      ].filter((f): f is string => Boolean(f))
    : [];

  return (
    <>
      <OrganizationJsonLd locale={locale} />
      <WebSiteJsonLd locale={locale} />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <Media
            src="/images/home-hero.jpg"
            alt={t("heroTitle")}
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-ink/70" />
        </div>
        <Container className="relative z-10 pt-24">
          <Reveal className="max-w-3xl">
            <p className="eyebrow text-champagne-light">{t("heroEyebrow")}</p>
            <h1 className="display-serif mt-6 text-5xl sm:text-6xl lg:text-7xl text-bone">
              {t("heroTitle")}
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-bone/80">
              {t("heroSubtitle")}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <LinkButton
                href="/journeys"
                variant="primary"
                title={nav("journeysTitle")}
              >
                {t("heroCta")}
              </LinkButton>
              <LinkButton
                href="/experience"
                variant="heroSecondary"
                title={nav("experienceTitle")}
              >
                {t("heroSecondaryCta")}
              </LinkButton>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Intro */}
      <Section tone="bone">
        <Container size="narrow" className="text-center">
          <Reveal>
            <p className="eyebrow">{t("introEyebrow")}</p>
            <h2 className="display-serif mt-5 text-4xl sm:text-5xl">
              {t("introTitle")}
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-slate">
              {t("introBody")}
            </p>
            <div className="mt-8">
              <Link
                href="/experience"
                title={nav("experienceTitle")}
                className="text-xs uppercase tracking-[0.18em] text-champagne-ink hover:text-ink transition-colors"
              >
                {t("introLink")} →
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Pillars */}
      <Section tone="white">
        <Container>
          <Reveal>
            <h2 className="display-serif text-3xl sm:text-4xl text-center mb-16">
              {t("pillarsTitle")}
            </h2>
          </Reveal>
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={Math.min(i * 120, 360)}>
                <div className="text-center">
                  <span className="font-serif text-champagne-ink text-5xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-serif text-2xl mt-4 mb-3 text-ink">
                    {p.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Featured journey */}
      {featured && (
        <Section tone="ink">
          <Container>
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <Reveal>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2px]">
                  <Media
                    src={featured.heroImage.src}
                    alt={pick(featured.heroImage.alt, locale)}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </Reveal>
              <Reveal delay={120}>
                <p className="eyebrow text-champagne-light">
                  {t("featuredEyebrow")}
                </p>
                <div className="mt-4">
                  <JourneyStatusBadge status={featured.status} tone="dark" />
                </div>
                <h2 className="display-serif mt-5 text-4xl text-bone">
                  {pick(featured.title, locale)}
                </h2>
                {featured.countries && (
                  <p className="mt-3 text-xs uppercase tracking-[0.2em] text-champagne-light">
                    {pick(featured.countries, locale)}
                  </p>
                )}
                <p className="mt-6 text-lg text-bone/70 leading-relaxed">
                  {pick(featured.summary, locale)}
                </p>
                {featuredFacts.length > 0 && (
                  <p className="mt-6 text-sm text-bone/80">
                    {featuredFacts.join(" · ")}
                  </p>
                )}
                {featured.priceFrom && (
                  <p className="mt-2 font-serif text-2xl text-bone">
                    {t("featuredPrice", {
                      price: formatEUR(featured.priceFrom, locale),
                    })}
                  </p>
                )}
                <div className="mt-8">
                  <RouteMap route={featured.route} tone="dark" />
                </div>
                <div className="mt-10">
                  <LinkButton
                    href={{
                      pathname: "/journeys/[slug]",
                      params: { slug: featured.slug },
                    }}
                    variant="outline"
                    className="text-bone"
                    title={jt("cardTitle", {
                      journey: pick(featured.title, locale),
                    })}
                  >
                    {t("featuredCta")}
                  </LinkButton>
                </div>
              </Reveal>
            </div>
          </Container>
        </Section>
      )}

      {/* Collection CTA */}
      <Section tone="bone">
        <Container size="narrow" className="text-center">
          <Reveal>
            <h2 className="display-serif text-3xl sm:text-4xl">
              {t("collectionTitle")}
            </h2>
            <p className="mt-6 text-lg text-slate leading-relaxed">
              {t("collectionBody")}
            </p>
            <div className="mt-10">
              <LinkButton
                href="/journeys"
                variant="outline"
                title={nav("journeysTitle")}
              >
                {t("collectionCta")}
              </LinkButton>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Founder */}
      <Section tone="white">
        <Container size="narrow" className="text-center">
          <Reveal>
            <p className="eyebrow">{t("founderEyebrow")}</p>
            <h2 className="display-serif mt-5 text-4xl sm:text-5xl">
              {t("founderTitle")}
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-slate">
              <p>{t("founderBody1")}</p>
              <p>{t("founderBody2")}</p>
            </div>
            <div className="mt-10">
              <LinkButton
                href="/about"
                variant="outline"
                title={nav("aboutTitle")}
              >
                {t("founderCta")}
              </LinkButton>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Closing CTA */}
      <Section tone="bone">
        <Container size="narrow" className="text-center">
          <Reveal>
            <h2 className="display-serif text-4xl sm:text-5xl">
              {t("closingTitle")}
            </h2>
            <p className="mt-6 text-lg text-slate leading-relaxed">
              {t("closingBody")}
            </p>
            <div className="mt-10">
              <LinkButton href="/contact" title={nav("contactTitle")}>
                {t("closingCta")}
              </LinkButton>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Latest journeys teaser */}
      <JourneysTeaser locale={locale} />

      {/* Partners */}
      <Section tone="white" className="pt-0">
        <Container className="text-center">
          <Reveal>
            <p className="eyebrow">{t("partnersTitle")}</p>
            <div className="mt-8 flex min-h-[80px] items-center justify-center rounded-[2px] border border-dashed border-line">
              <span className="text-sm text-slate/60">{t("partnersNote")}</span>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

function JourneysTeaser({ locale }: { locale: Locale }) {
  const featured = getFeaturedJourney();
  if (!featured) return null;
  return (
    <Section tone="bone" className="pt-0">
      <Container>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <JourneyCard journey={featured} locale={locale} />
        </div>
        <FxNote className="mt-10 text-xs leading-relaxed text-slate/70" />
      </Container>
    </Section>
  );
}
