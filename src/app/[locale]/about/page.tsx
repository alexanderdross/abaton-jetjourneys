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
    openGraph: { type: "website", title: t("title"), description: t("lead") },
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
            <div className="prose-editorial mt-10">
              <p>{t("body1")}</p>
              <p>{t("body2")}</p>
              <p>{t("body3")}</p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <Reveal>
            <h2 className="display-serif text-3xl sm:text-4xl text-center mb-16">
              {t("valuesTitle")}
            </h2>
          </Reveal>
          <div className="grid gap-12 md:grid-cols-3">
            {[1, 2, 3].map((n, i) => (
              <Reveal key={n} delay={i * 120}>
                <div className="text-center">
                  <span className="font-serif text-champagne-ink text-5xl">
                    0{n}
                  </span>
                  <h3 className="font-serif text-2xl mt-4 mb-3 text-ink">
                    {t(`value${n}Title` as "value1Title")}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate">
                    {t(`value${n}Body` as "value1Body")}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="ink">
        <Container size="narrow" className="text-center">
          <Reveal>
            <h2 className="display-serif text-4xl sm:text-5xl text-bone">
              {t("ctaTitle")}
            </h2>
            <p className="mt-6 text-lg text-bone/70">{t("ctaBody")}</p>
            <div className="mt-10">
              <LinkButton
                href="/contact"
                variant="outline"
                className="text-bone"
                title={nav("contactTitle")}
              >
                {t("ctaButton")}
              </LinkButton>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
