import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Media } from "@/components/ui/Media";
import { JourneyCard } from "@/components/JourneyCard";
import { getFeaturedJourney, pick } from "@/lib/journeys";
import { OrganizationJsonLd } from "@/components/JsonLd";

type PageProps = { params: Promise<{ locale: Locale }> };

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");
  const nav = await getTranslations("Nav");
  const jt = await getTranslations("Journeys");
  const featured = getFeaturedJourney();

  return (
    <>
      <OrganizationJsonLd locale={locale} />

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
                href="/about"
                variant="outline"
                className="text-bone"
                title={nav("aboutTitle")}
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
          <div className="grid gap-12 md:grid-cols-3">
            {[1, 2, 3].map((n, i) => (
              <Reveal key={n} delay={i * 120}>
                <div className="text-center">
                  <span className="font-serif text-champagne text-5xl">
                    0{n}
                  </span>
                  <h3 className="font-serif text-2xl mt-4 mb-3 text-ink">
                    {t(`pillar${n}Title` as "pillar1Title")}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate">
                    {t(`pillar${n}Body` as "pillar1Body")}
                  </p>
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
                <h2 className="display-serif mt-5 text-4xl text-bone">
                  {pick(featured.title, locale)}
                </h2>
                <p className="mt-6 text-lg text-bone/70 leading-relaxed">
                  {pick(featured.summary, locale)}
                </p>
                <div className="mt-8">
                  <RouteLineDark route={featured.route} />
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

      {/* How it works */}
      <HowItWorks />

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

      {/* Show latest journeys teaser */}
      <JourneysTeaser locale={locale} />
    </>
  );
}

// Dark variant of the route line for the ink section.
function RouteLineDark({ route }: { route: string[] }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-3 gap-y-3 text-bone/80">
      {route.map((city, i) => (
        <li key={`${city}-${i}`} className="flex items-center gap-3">
          <span className="text-sm tracking-wide">{city}</span>
          {i < route.length - 1 && (
            <span className="text-champagne/70" aria-hidden>
              ✈
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

function HowItWorks() {
  const t = useTranslations("Home");
  return (
    <Section tone="white">
      <Container>
        <Reveal>
          <div className="text-center mb-16">
            <p className="eyebrow">{t("howEyebrow")}</p>
            <h2 className="display-serif mt-5 text-4xl sm:text-5xl">
              {t("howTitle")}
            </h2>
          </div>
        </Reveal>
        <div className="grid gap-10 md:grid-cols-3">
          {[1, 2, 3].map((n, i) => (
            <Reveal key={n} delay={i * 120}>
              <div className="border-t border-line pt-6">
                <span className="eyebrow">{String(n).padStart(2, "0")}</span>
                <h3 className="font-serif text-2xl mt-3 mb-3 text-ink">
                  {t(`step${n}Title` as "step1Title")}
                </h3>
                <p className="text-sm leading-relaxed text-slate">
                  {t(`step${n}Body` as "step1Body")}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
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
      </Container>
    </Section>
  );
}
