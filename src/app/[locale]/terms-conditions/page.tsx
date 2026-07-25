import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { LegalLayout } from "@/components/LegalLayout";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Legal" });
  return { title: t("termsTitle"), robots: { index: false } };
}

export default async function TermsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Legal");

  return (
    <LegalLayout title={t("termsTitle")}>
      <p className="text-sm text-slate/70 italic">{t("placeholderNote")}</p>
      {locale === "de" ? (
        <>
          <h2>1. Geltungsbereich</h2>
          <p>
            Diese Allgemeinen Geschäftsbedingungen gelten für alle von der ABATON
            JetJourneys GmbH veranstalteten Reisen. [Platzhalter — bitte durch die
            finalen AGB ersetzen.]
          </p>
          <h2>2. Preise und Leistungen</h2>
          <p>
            Preise verstehen sich pro Person in Euro einschließlich gesetzlicher
            Mehrwertsteuer, soweit anwendbar. Der genaue Leistungsumfang ergibt
            sich aus der jeweiligen Journey-Broschüre.
          </p>
          <h2>3. Buchung und Zahlung</h2>
          <p>[Platzhalter]</p>
          <h2>4. Rücktritt und Stornierung</h2>
          <p>[Platzhalter]</p>
        </>
      ) : (
        <>
          <h2>1. Scope</h2>
          <p>
            These Terms &amp; Conditions apply to all journeys organised by ABATON
            JetJourneys GmbH. [Placeholder — replace with the final terms.]
          </p>
          <h2>2. Prices and Services</h2>
          <p>
            Prices are per person in Euro including statutory value added tax,
            insofar as applicable. The precise scope of services is set out in the
            respective journey brochure.
          </p>
          <h2>3. Booking and Payment</h2>
          <p>[Placeholder]</p>
          <h2>4. Withdrawal and Cancellation</h2>
          <p>[Placeholder]</p>
        </>
      )}
    </LegalLayout>
  );
}
