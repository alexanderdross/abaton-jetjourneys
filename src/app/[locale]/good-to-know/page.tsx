import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HashAccordion } from "@/components/HashAccordion";
import { altLinks } from "@/lib/i18n-urls";
import { ogImage } from "@/lib/site";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "GoodToKnow" });
  return {
    title: t("title"),
    description: t("intro"),
    alternates: altLinks(locale, "/good-to-know"),
    openGraph: {
      type: "website",
      title: t("title"),
      description: t("intro"),
      images: [ogImage],
    },
    twitter: {
      title: t("title"),
      description: t("intro"),
      images: [ogImage.url],
    },
  };
}

export default async function GoodToKnowPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("GoodToKnow");

  const included = t.raw("included") as string[];
  const baggage = t.raw("baggage") as string[];
  const cancel = t.raw("cancel") as string[];

  return (
    <div className="pt-32 pb-24">
      <Container size="narrow">
        <Breadcrumbs
          locale={locale}
          trail={[{ href: "/good-to-know", label: t("title") }]}
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

        <div className="mt-14">
          <Item title={t("bookTitle")}>
            <p>{t("bookBody")}</p>
          </Item>

          <Item title={t("includedTitle")}>
            <p>{t("includedIntro")}</p>
            <List items={included} />
            <p>{t("includedNot")}</p>
          </Item>

          <Item title={t("suitableTitle")}>
            <p>{t("suitableBody")}</p>
          </Item>

          <Item title={t("healthTitle")}>
            <p>{t("healthBody")}</p>
          </Item>

          <Item title={t("baggageTitle")}>
            <p>{t("baggageIntro")}</p>
            <List items={baggage} />
            <p>{t("baggageBody")}</p>
          </Item>

          <Item title={t("safetyTitle")}>
            <p>{t("safetyBody")}</p>
          </Item>

          <Item title={t("minTitle")}>
            <p>{t("minBody")}</p>
          </Item>

          <Item title={t("paymentTitle")}>
            <p>{t("paymentBody")}</p>
          </Item>

          <Item title={t("protectionTitle")}>
            <p>{t("protectionBody")}</p>
          </Item>

          <Item title={t("insuranceTitle")}>
            <p>{t("insuranceBody")}</p>
          </Item>

          <Item title={t("visaTitle")}>
            <p>{t("visaBody")}</p>
          </Item>

          <Item title={t("cancelTitle")}>
            <p>{t("cancelIntro")}</p>
            <List items={cancel} />
            <p>{t("cancelBody")}</p>
          </Item>

          <Item title={t("portalTitle")}>
            <p>{t("portalBody")}</p>
          </Item>
        </div>
      </Container>
    </div>
  );
}

function Item({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <HashAccordion
      title={title}
      className="group border-b border-line first:border-t"
      summaryClassName="flex cursor-pointer items-start justify-between gap-6 py-5 font-serif text-lg text-ink marker:content-none [&::-webkit-details-marker]:hidden"
    >
      <div className="max-w-2xl space-y-4 pb-6 text-sm leading-relaxed text-slate">
        {children}
      </div>
    </HashAccordion>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-champagne-ink" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
