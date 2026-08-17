import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Media } from "@/components/ui/Media";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { altLinks } from "@/lib/i18n-urls";
import { ogImage } from "@/lib/site";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });
  return {
    title: t("title"),
    description: t("lead"),
    alternates: altLinks(locale, "/about"),
    openGraph: {
      type: "website",
      title: t("title"),
      description: t("lead"),
      images: [ogImage],
    },
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("About");
  const nav = await getTranslations("Nav");

  return (
    <>
      <section className="relative h-[60vh] min-h-[420px] flex items-end">
        <div className="absolute inset-0">
          <Media
            src="/images/about-hero.jpg"
            alt={t("title")}
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-ink/30" />
        </div>
        <Container className="relative z-10 pb-14">
          <p className="eyebrow text-champagne-light">{t("eyebrow")}</p>
          <h1 className="display-serif mt-4 text-5xl sm:text-6xl text-bone max-w-3xl">
            {t("title")}
          </h1>
        </Container>
      </section>

      <Section tone="bone">
        <Container size="narrow">
          <Breadcrumbs
            locale={locale}
            trail={[{ href: "/about", label: t("title") }]}
            className="mb-10"
          />
          <Reveal>
            <p className="display-serif text-2xl sm:text-3xl leading-snug text-ink">
              {t("lead")}
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* The founder */}
      <Section tone="white">
        <Container size="narrow">
          <Reveal>
            <p className="eyebrow">{t("founderEyebrow")}</p>
            <h2 className="display-serif mt-4 text-3xl sm:text-4xl text-ink">
              {t("founderName")}
            </h2>
            <p className="mt-2 text-sm uppercase tracking-[0.16em] text-champagne-ink">
              {t("founderRole")}
            </p>
            <div className="prose-editorial mt-8">
              <p>{t("founderBody1")}</p>
              <p>{t("founderBody2")}</p>
              <p>{t("founderBody3")}</p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* The idea behind ABATON */}
      <Section tone="bone">
        <Container size="narrow">
          <Reveal>
            <p className="eyebrow">{t("ideaEyebrow")}</p>
            <h2 className="display-serif mt-4 text-3xl sm:text-4xl text-ink">
              {t("ideaTitle")}
            </h2>
            <div className="prose-editorial mt-8">
              <p>{t("ideaBody1")}</p>
              <p>{t("ideaBody2")}</p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* The name */}
      <Section tone="ink">
        <Container size="narrow">
          <Reveal>
            <p className="eyebrow text-champagne-light">{t("nameEyebrow")}</p>
            <h2 className="display-serif mt-4 text-4xl sm:text-5xl text-bone">
              {t("nameTitle")}
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-bone/70">
              <p>{t("nameBody1")}</p>
              <p>{t("nameBody2")}</p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Personally hosted */}
      <Section tone="white">
        <Container size="narrow">
          <Reveal>
            <p className="eyebrow">{t("hostedEyebrow")}</p>
            <h2 className="display-serif mt-4 text-3xl sm:text-4xl text-ink">
              {t("hostedTitle")}
            </h2>
            <div className="prose-editorial mt-8">
              <p>{t("hostedBody1")}</p>
              <p>{t("hostedBody2")}</p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section tone="bone">
        <Container size="narrow" className="text-center">
          <Reveal>
            <h2 className="display-serif text-4xl sm:text-5xl text-ink">
              {t("ctaTitle")}
            </h2>
            <p className="mt-6 text-lg text-slate">{t("ctaBody")}</p>
            <div className="mt-10">
              <LinkButton href="/journeys" title={nav("journeysTitle")}>
                {t("ctaButton")}
              </LinkButton>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
