import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { LegalLayout } from "@/components/LegalLayout";
import { LegalReviewNote, LegalGap } from "@/components/LegalReviewNote";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { company } from "@/lib/site";
import { altLinks } from "@/lib/i18n-urls";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Legal" });
  return {
    title: t("imprintTitle"),
    alternates: altLinks(locale, "/imprint"),
    robots: { index: false },
  };
}

export default async function ImprintPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Legal");
  const de = locale === "de";

  return (
    <LegalLayout
      title={t("imprintTitle")}
      breadcrumbs={
        <Breadcrumbs
          locale={locale}
          trail={[{ href: "/imprint", label: t("imprintTitle") }]}
        />
      }
    >
      <LegalReviewNote
        heading={
          de
            ? "Für die anwaltliche Prüfung, vor Veröffentlichung ausfüllen"
            : "For legal review, complete before publishing"
        }
      >
        <p>
          {de
            ? "Die folgenden Pflichtangaben nach § 5 DDG fehlen uns noch und sind im Text gelb hervorgehoben:"
            : "The following mandatory details pursuant to § 5 DDG are still missing and are highlighted in amber in the text below:"}
        </p>
        <ul className="ml-5 list-disc space-y-1">
          <li>
            {de
              ? "Registergericht (zuständiges Amtsgericht)"
              : "Register court (competent local court)"}
          </li>
          <li>
            {de
              ? "Umsatzsteuer-Identifikationsnummer (USt-IdNr. nach § 27a UStG)"
              : "VAT identification number (pursuant to § 27a of the German VAT Act)"}
          </li>
        </ul>
        <p>
          {de
            ? "Bitte zusätzlich bestätigen: die Geschäftsanschrift (die Datenschutzerklärung nannte Gehrenstr. 11, Footer und Impressum verwenden Gehrenstraße 7) sowie die Formulierung zur Verbraucherstreitbeilegung."
            : "Please also confirm: the business address (the privacy policy stated Gehrenstr. 11, while the footer and imprint use Gehrenstraße 7) and the wording on consumer dispute resolution."}
        </p>
      </LegalReviewNote>

      <h2>
        {de ? "Angaben gemäß § 5 DDG" : "Information pursuant to § 5 DDG"}
      </h2>
      <p>
        <strong>{company.name}</strong>
        <br />
        <LegalGap>{company.street}</LegalGap>
        <br />
        {company.postalCode} {company.city}
        <br />
        {company.country}
      </p>

      <h2>{de ? "Vertreten durch" : "Represented by"}</h2>
      <p>
        {company.managingDirector},{" "}
        {de ? "Geschäftsführerin" : "Managing Director"}
      </p>

      <h2>{de ? "Kontakt" : "Contact"}</h2>
      <p>
        {de ? "Telefon" : "Phone"}:{" "}
        <a href={`tel:${company.phoneHref}`}>{company.phone}</a>
        <br />
        {de ? "E-Mail" : "Email"}:{" "}
        <a href={`mailto:${company.email}`}>{company.email}</a>
      </p>

      <h2>{de ? "Registereintrag" : "Register entry"}</h2>
      <p>
        {de
          ? "Eintragung im Handelsregister."
          : "Entry in the commercial register."}
        <br />
        {de ? "Registergericht" : "Register court"}:{" "}
        {company.registerCourt ? (
          company.registerCourt
        ) : (
          <LegalGap>
            {de ? "ausstehend, bitte ergänzen" : "outstanding, to be provided"}
          </LegalGap>
        )}
        <br />
        {de ? "Registernummer" : "Register number"}: {company.registerNumber}
      </p>

      <h2>
        {de
          ? "Umsatzsteuer-Identifikationsnummer"
          : "VAT identification number"}
      </h2>
      <p>
        {de
          ? "Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:"
          : "VAT identification number pursuant to § 27a of the German VAT Act:"}{" "}
        {company.vatId ? (
          company.vatId
        ) : (
          <LegalGap>
            {de ? "ausstehend, bitte ergänzen" : "outstanding, to be provided"}
          </LegalGap>
        )}
      </p>

      <h2>
        {de
          ? "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV"
          : "Responsible for content pursuant to § 18 (2) MStV"}
      </h2>
      <p>
        {company.managingDirector}
        <br />
        {company.street}, {company.postalCode} {company.city}
      </p>

      <h2>{de ? "EU-Streitschlichtung" : "EU dispute resolution"}</h2>
      <p>
        {de
          ? "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:"
          : "The European Commission provides a platform for online dispute resolution (ODR):"}{" "}
        <a
          href="https://ec.europa.eu/consumers/odr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://ec.europa.eu/consumers/odr/
        </a>
        .{" "}
        {de
          ? "Unsere E-Mail-Adresse finden Sie oben."
          : "Our email address is stated above."}
      </p>

      <h2>
        {de
          ? "Verbraucherstreitbeilegung / Universalschlichtungsstelle"
          : "Consumer dispute resolution"}
      </h2>
      <p>
        {de
          ? "Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen."
          : "We are neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board."}
      </p>

      <h2>{de ? "Haftung für Inhalte" : "Liability for content"}</h2>
      <p>
        {de
          ? "Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen."
          : "As a service provider, we are responsible for our own content on these pages in accordance with general law. However, we are not obliged to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity."}
      </p>

      <h2>{de ? "Haftung für Links" : "Liability for links"}</h2>
      <p>
        {de
          ? "Unser Angebot enthält gegebenenfalls Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich."
          : "Our website may contain links to external third-party websites over whose content we have no influence. The respective provider or operator of the linked pages is always responsible for their content."}
      </p>

      <h2>{de ? "Urheberrecht" : "Copyright"}</h2>
      <p>
        {de
          ? "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet."
          : "The content and works created by the site operators on these pages are subject to German copyright law. Third-party contributions are marked as such."}
      </p>
    </LegalLayout>
  );
}
