import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Media } from "@/components/ui/Media";
import { RouteLine } from "@/components/RouteLine";
import { RequestForm } from "@/components/RequestForm";
import { BulletGrid } from "@/components/ui/BulletGrid";
import { PillarGrid } from "@/components/ui/PillarGrid";
import { JourneyStatusBadge } from "@/components/JourneyStatusBadge";
import { LinkButton } from "@/components/ui/Button";
import { JourneyJsonLd, JourneyFaqJsonLd } from "@/components/JsonLd";
import { ConvertedPrice } from "@/components/fx/ConvertedPrice";
import { FxNote } from "@/components/fx/FxNote";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  getJourneyBySlug,
  getPublishedJourneys,
  pick,
  formatEUR,
} from "@/lib/journeys";
import { altLinks } from "@/lib/i18n-urls";

type PageProps = {
  params: Promise<{ locale: Locale; slug: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getPublishedJourneys().map((j) => ({ locale, slug: j.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const journey = getJourneyBySlug(slug);
  if (!journey) return {};
  const title = pick(journey.title, locale);
  const description = journey.seoDescription
    ? pick(journey.seoDescription, locale)
    : pick(journey.summary, locale);
  // An explicit seoTitle replaces the "%s · ABATON JetJourneys" template so a
  // journey can carry its own full-length search title.
  const metaTitle = journey.seoTitle
    ? { absolute: pick(journey.seoTitle, locale) }
    : title;
  return {
    title: metaTitle,
    description,
    alternates: altLinks(locale, {
      pathname: "/journeys/[slug]",
      params: { slug },
    }),
    openGraph: { title, description, type: "article" },
    twitter: { title, description },
  };
}

export default async function JourneyDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const journey = getJourneyBySlug(slug);
  if (!journey) notFound();

  const t = await getTranslations("JourneyDetail");
  const jt = await getTranslations("Journeys");

  const facts = [
    journey.nights
      ? { label: t("duration"), value: jt("nights", { count: journey.nights }) }
      : null,
    { label: t("guestsLabel"), value: pick(journey.guestsLabel, locale) },
    journey.departureCity
      ? { label: t("departure"), value: pick(journey.departureCity, locale) }
      : null,
    journey.hotelCategory
      ? { label: t("hotels"), value: pick(journey.hotelCategory, locale) }
      : null,
    journey.nextDeparture
      ? {
          label: t("nextDeparture"),
          value: pick(journey.nextDeparture, locale),
        }
      : null,
  ].filter((f): f is { label: string; value: string } => f !== null);

  const differencePillars = [1, 2, 3, 4, 5, 6].map((n) => ({
    title: t(`difference${n}Title` as "difference1Title"),
    body: t(`difference${n}Body` as "difference1Body"),
  }));

  return (
    <>
      <JourneyJsonLd journey={journey} locale={locale} />
      <JourneyFaqJsonLd journey={journey} locale={locale} />

      {/* Hero */}
      <section className="relative h-[80vh] min-h-[520px] flex items-end">
        <div className="absolute inset-0">
          <Media
            src={journey.heroImage.src}
            alt={pick(journey.heroImage.alt, locale)}
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-ink/40" />
        </div>
        <Container className="relative z-10 pb-16">
          <Link
            href="/journeys"
            title={t("backToJourneysTitle")}
            className="text-xs uppercase tracking-[0.18em] text-bone/70 hover:text-champagne transition-colors"
          >
            ← {t("backToJourneys")}
          </Link>
          <div className="mt-5">
            <JourneyStatusBadge status={journey.status} tone="dark" />
          </div>
          <h1 className="display-serif mt-4 text-4xl sm:text-5xl lg:text-6xl text-bone max-w-4xl">
            {pick(journey.title, locale)}
          </h1>
          <p className="mt-4 text-lg text-bone/80 max-w-xl">
            {pick(journey.tagline, locale)}
          </p>
        </Container>
      </section>

      {/* At a glance + overview */}
      <Section tone="bone">
        <Container>
          <Breadcrumbs
            locale={locale}
            trail={[
              { href: "/journeys", label: jt("title") },
              {
                href: { pathname: "/journeys/[slug]", params: { slug } },
                label: pick(journey.title, locale),
              },
            ]}
            className="mb-10"
          />
          <div className="grid gap-14 lg:grid-cols-[1fr_320px]">
            <Reveal>
              <div className="prose-editorial max-w-none">
                <p className="eyebrow">{t("overviewTitle")}</p>
                <h2 className="display-serif mt-4 text-3xl sm:text-4xl text-ink">
                  {pick(journey.summary, locale)}
                </h2>
                <div className="mt-8">
                  {pick(journey.overview, locale).map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
                {journey.route.length >= 2 && (
                  <div className="mt-10">
                    <p className="eyebrow mb-4">{t("route")}</p>
                    <RouteLine route={journey.route} />
                  </div>
                )}
              </div>
            </Reveal>

            <Reveal delay={120}>
              <aside className="bg-white rounded-[2px] p-8 border border-line lg:sticky lg:top-28">
                <p className="eyebrow mb-6">{t("atAGlance")}</p>
                <dl className="space-y-5">
                  {facts.map((f) => (
                    <div key={f.label}>
                      <dt className="text-xs uppercase tracking-[0.14em] text-slate">
                        {f.label}
                      </dt>
                      <dd className="mt-1 text-ink">{f.value}</dd>
                    </div>
                  ))}
                </dl>
                {journey.priceFrom && (
                  <div className="mt-7 border-t border-line pt-6">
                    <p className="font-serif text-3xl text-ink">
                      {t("price", {
                        price: formatEUR(journey.priceFrom, locale),
                      })}
                    </p>
                    {/* Reserved lines: the indicative conversion arrives after
                        hydration and must not move the EUR price or the CTA. */}
                    <ConvertedPrice
                      amount={journey.priceFrom}
                      className="mt-1 block h-5 text-sm leading-5 text-champagne-ink"
                    />
                    <p className="mt-1 text-xs text-slate">{t("priceUnit")}</p>
                    {journey.priceFromSingle && (
                      <>
                        <p className="mt-3 text-xs text-slate">
                          {t("priceSingle", {
                            price: formatEUR(journey.priceFromSingle, locale),
                          })}
                        </p>
                        <ConvertedPrice
                          amount={journey.priceFromSingle}
                          className="block h-4 text-[11px] leading-4 text-slate/70"
                        />
                      </>
                    )}
                    <div className="mt-4 min-h-[2.5rem]">
                      <FxNote className="text-[11px] leading-relaxed text-slate/70" />
                    </div>
                  </div>
                )}
                <a
                  href="#request"
                  title={t("requestCtaTitle", {
                    journey: pick(journey.title, locale),
                  })}
                  className="mt-8 inline-flex w-full items-center justify-center bg-ink text-bone text-xs uppercase tracking-[0.14em] px-6 py-3.5 rounded-[2px] hover:bg-champagne hover:text-ink transition-colors touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-2"
                >
                  {t("requestCta")}
                </a>
              </aside>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Signature moments */}
      {journey.signatureMoments.length > 0 && (
        <Section tone="white">
          <Container>
            <Reveal>
              <p className="eyebrow">{t("signatureTitle")}</p>
            </Reveal>
            <div className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {journey.signatureMoments.map((moment, i) => (
                <Reveal key={moment.title.en} delay={Math.min(i * 80, 320)}>
                  <div className="border-t border-line pt-6">
                    <h3 className="font-serif text-xl text-ink leading-snug">
                      {pick(moment.title, locale)}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate">
                      {pick(moment.description, locale)}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Itinerary */}
      {journey.itinerary.length > 0 && (
        <Section tone="white">
          <Container size="narrow">
            <Reveal>
              <p className="eyebrow text-center">{t("itineraryTitle")}</p>
              <h2 className="display-serif mt-4 text-3xl sm:text-4xl text-center mb-14">
                {pick(journey.title, locale).split(":")[0].trim()}
              </h2>
            </Reveal>
            <ol className="space-y-0">
              {journey.itinerary.map((d, i) => (
                <Reveal key={d.day} delay={Math.min(i * 60, 300)}>
                  <li className="grid grid-cols-[auto_1fr] gap-6 border-t border-line py-8">
                    <div className="text-right">
                      <span className="eyebrow block">{t("day")}</span>
                      <span className="font-serif text-4xl text-champagne-ink">
                        {String(d.day).padStart(2, "0")}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.14em] text-slate">
                        {d.city}
                      </p>
                      <h3 className="font-serif text-2xl mt-1 mb-2 text-ink">
                        {pick(d.title, locale)}
                      </h3>
                      <p className="text-sm leading-relaxed text-slate">
                        {pick(d.description, locale)}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </Container>
        </Section>
      )}

      {/* Places to stay */}
      {journey.stays.length > 0 && (
        <Section tone="bone">
          <Container>
            <Reveal>
              <p className="eyebrow">{t("staysTitle")}</p>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate">
                {t("staysIntro")}
              </p>
            </Reveal>
            <dl className="mt-12 grid gap-x-12 gap-y-8 sm:grid-cols-2">
              {journey.stays.map((stay, i) => (
                <Reveal key={stay.title.en} delay={Math.min(i * 80, 320)}>
                  <div className="border-t border-line pt-6">
                    <dt className="font-serif text-xl text-ink">
                      {pick(stay.title, locale)}
                    </dt>
                    <dd className="mt-3 text-sm leading-relaxed text-slate">
                      {pick(stay.description, locale)}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </Container>
        </Section>
      )}

      {/* Inclusions and exclusions */}
      {pick(journey.inclusions, locale).length > 0 && (
        <Section tone="ink">
          <Container size="narrow">
            <Reveal>
              <h2 className="display-serif text-3xl sm:text-4xl text-bone text-center mb-12">
                {t("inclusionsTitle")}
              </h2>
              <BulletGrid items={pick(journey.inclusions, locale)} tone="ink" />
            </Reveal>
            {pick(journey.exclusions, locale).length > 0 && (
              <Reveal delay={120}>
                <h3 className="display-serif mt-16 mb-8 text-2xl text-bone/90 text-center">
                  {t("exclusionsTitle")}
                </h3>
                <BulletGrid
                  items={pick(journey.exclusions, locale)}
                  tone="ink"
                  marker="·"
                />
              </Reveal>
            )}
          </Container>
        </Section>
      )}

      {/* Gallery */}
      {journey.gallery.length > 0 && (
        <Section tone="bone">
          <Container>
            <Reveal>
              <p className="eyebrow text-center mb-10">{t("galleryTitle")}</p>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {journey.gallery.map((img, i) => (
                <Reveal key={img.src} delay={Math.min(i * 80, 320)}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-ink">
                    <Media
                      src={img.src}
                      alt={pick(img.alt, locale)}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* The ABATON difference */}
      <Section tone="white">
        <Container>
          <Reveal>
            <h2 className="display-serif text-3xl sm:text-4xl text-center">
              {t("differenceTitle")}
            </h2>
          </Reveal>
          <PillarGrid className="mt-16" items={differencePillars} />
        </Container>
      </Section>

      {/* Your host */}
      <Section tone="bone">
        <Container size="narrow">
          <Reveal>
            <h2 className="display-serif text-3xl sm:text-4xl text-ink">
              {t("hostTitle")}
            </h2>
            <div className="prose-editorial mt-8">
              <p>{t("hostBody1")}</p>
              <p>{t("hostBody2")}</p>
            </div>
            <div className="mt-10">
              <LinkButton
                href="/contact"
                variant="outline"
                title={t("hostCtaTitle")}
              >
                {t("hostCta")}
              </LinkButton>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Request */}
      <Section tone="white" id="request">
        <Container size="narrow">
          <Reveal>
            <div className="text-center mb-12">
              <p className="eyebrow">{t("requestTitle")}</p>
              <h2 className="display-serif mt-4 text-3xl sm:text-4xl">
                {pick(journey.title, locale).split(":")[0].trim()}
              </h2>
              <p className="mt-4 text-slate">{t("requestBody")}</p>
              <p className="mt-2 text-xs text-slate/70">{t("priceNote")}</p>
            </div>
            <RequestForm
              defaultJourney={pick(journey.title, locale)}
              journeySlug={journey.slug}
            />
          </Reveal>
        </Container>
      </Section>
      {/* The ABATON Circle teaser */}
      <Section tone="ink">
        <Container size="narrow">
          <Reveal>
            <h2 className="display-serif text-3xl sm:text-4xl text-bone">
              {t("circleTitle")}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-bone/70">
              {t("circleBody")}
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* FAQ */}
      {journey.faq.length > 0 && (
        <Section tone="bone">
          <Container size="narrow">
            <Reveal>
              <h2 className="display-serif text-3xl sm:text-4xl text-ink">
                {t("faqTitle")}
              </h2>
            </Reveal>
            <div className="mt-10">
              {journey.faq.map((item) => (
                <details
                  key={item.question.en}
                  className="group border-b border-line py-5"
                >
                  <summary className="flex cursor-pointer items-start justify-between gap-6 font-serif text-lg text-ink marker:content-none [&::-webkit-details-marker]:hidden">
                    {pick(item.question, locale)}
                    <span
                      className="mt-1 shrink-0 text-champagne-ink transition-transform group-open:rotate-45"
                      aria-hidden
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate">
                    {pick(item.answer, locale)}
                  </p>
                </details>
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
