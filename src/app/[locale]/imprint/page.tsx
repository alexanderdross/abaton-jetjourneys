import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { LegalLayout } from "@/components/LegalLayout";
import { company } from "@/lib/site";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Legal" });
  return { title: t("imprintTitle"), robots: { index: false } };
}

export default async function ImprintPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Legal");

  return (
    <LegalLayout title={t("imprintTitle")}>
      <p>
        <strong>{company.name}</strong>
        <br />
        {company.street}
        <br />
        {company.postalCode} {company.city}
        <br />
        {company.country}
      </p>
      <p>
        {locale === "de" ? "Vertreten durch" : "Represented by"}:{" "}
        {company.managingDirector}
      </p>
      <p>
        {locale === "de" ? "Telefon" : "Phone"}:{" "}
        <a href={`tel:${company.phoneHref}`}>{company.phone}</a>
        <br />
        {locale === "de" ? "E-Mail" : "Email"}:{" "}
        <a href={`mailto:${company.email}`}>{company.email}</a>
      </p>
      <p className="text-sm text-slate/70 italic">{t("placeholderNote")}</p>
    </LegalLayout>
  );
}
