import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { RequestForm } from "@/components/RequestForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { company, ogImage } from "@/lib/site";
import { altLinks } from "@/lib/i18n-urls";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });
  return {
    title: t("title"),
    description: t("lead"),
    alternates: altLinks(locale, "/contact"),
    openGraph: {
      type: "website",
      title: t("title"),
      description: t("lead"),
      images: [ogImage],
    },
  };
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Contact");

  return (
    <div className="pt-32 pb-24">
      <Container>
        <Breadcrumbs
          locale={locale}
          trail={[{ href: "/contact", label: t("title") }]}
          className="mb-10"
        />
        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div>
              <p className="eyebrow">{t("eyebrow")}</p>
              <h1 className="display-serif mt-5 text-5xl sm:text-6xl">
                {t("title")}
              </h1>
              <p className="mt-6 text-lg text-slate leading-relaxed max-w-md">
                {t("lead")}
              </p>
              <div className="mt-6 space-y-4 text-slate leading-relaxed max-w-md">
                <p>{t("body1")}</p>
                <p>{t("body2")}</p>
              </div>

              <div className="mt-12">
                <h2 className="eyebrow">{t("reserveTitle")}</h2>
                <ol className="mt-6 space-y-6">
                  {[1, 2, 3].map((n) => (
                    <li key={n} className="flex gap-4">
                      <span className="font-serif text-2xl text-champagne-ink leading-none">
                        {String(n).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-serif text-lg text-ink">
                          {t(`reserve${n}Title` as "reserve1Title")}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-slate">
                          {t(`reserve${n}Body` as "reserve1Body")}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-12 space-y-8">
                <h2 className="eyebrow">{t("directTitle")}</h2>
                <dl className="space-y-6 text-ink">
                  <div>
                    <dt className="text-xs uppercase tracking-[0.14em] text-slate">
                      {t("phoneLabel")}
                    </dt>
                    <dd className="mt-1 text-lg">
                      <a
                        href={`tel:${company.phoneHref}`}
                        className="hover:text-champagne-ink transition-colors"
                      >
                        {company.phone}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.14em] text-slate">
                      {t("emailLabel")}
                    </dt>
                    <dd className="mt-1 text-lg">
                      <a
                        href={`mailto:${company.email}`}
                        className="hover:text-champagne-ink transition-colors"
                      >
                        {company.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.14em] text-slate">
                      {t("addressLabel")}
                    </dt>
                    <dd className="mt-1 text-lg not-italic">
                      {company.street}
                      <br />
                      {company.postalCode} {company.city}, {company.country}
                    </dd>
                  </div>
                </dl>
                <p className="text-sm text-slate leading-relaxed max-w-md">
                  {t("consultNote")}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="bg-white border border-line rounded-[2px] p-8 sm:p-10">
              <RequestForm grouped />
            </div>
          </Reveal>
        </div>
      </Container>
    </div>
  );
}
