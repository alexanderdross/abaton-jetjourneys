import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { LegalLayout } from "@/components/LegalLayout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { company } from "@/lib/site";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Legal" });
  return { title: t("privacyTitle"), robots: { index: false } };
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Legal");

  return (
    <LegalLayout
      title={t("privacyTitle")}
      breadcrumbs={
        <Breadcrumbs
          locale={locale}
          trail={[{ href: "/privacy", label: t("privacyTitle") }]}
        />
      }
    >
      {locale === "de" ? <PrivacyDE /> : <PrivacyEN />}
    </LegalLayout>
  );
}

function PrivacyDE() {
  return (
    <>
      <h2>Verantwortlicher</h2>
      <p>
        Verantwortlich für die Datenverarbeitung auf dieser Website ist:
        <br />
        {company.name}
        <br />
        {company.street}, {company.postalCode} {company.city}, {company.country}
        <br />
        E-Mail: <a href={`mailto:${company.email}`}>{company.email}</a>
        <br />
        Telefon: <a href={`tel:${company.phoneHref}`}>{company.phone}</a>
      </p>

      <h2>Allgemeines</h2>
      <p>
        Wir verarbeiten personenbezogene Daten nur im Einklang mit der
        Datenschutz-Grundverordnung (DSGVO) und dem Bundesdatenschutzgesetz.
        Rechtsgrundlagen sind insbesondere Art. 6 Abs. 1 lit. b DSGVO (Vertrag
        und vorvertragliche Maßnahmen), lit. f DSGVO (berechtigte Interessen)
        sowie lit. a DSGVO (Einwilligung), soweit eine solche erteilt wurde.
      </p>

      <h2>Hosting (Cloudflare)</h2>
      <p>
        Diese Website wird auf der Infrastruktur der Cloudflare, Inc. (101
        Townsend St, San Francisco, CA 94107, USA) als Auftragsverarbeiter
        betrieben. Beim Aufruf der Seiten werden technisch notwendige Daten (z.
        B. IP-Adresse, Datum und Uhrzeit, angeforderte Ressource, Browsertyp)
        zur Auslieferung und Absicherung verarbeitet. Rechtsgrundlage ist Art. 6
        Abs. 1 lit. f DSGVO. Mit Cloudflare besteht ein
        Auftragsverarbeitungsvertrag; Übermittlungen in Drittländer sind durch
        Standardvertragsklauseln abgesichert.
      </p>

      <h2>Kontakt- und Anfrageformular</h2>
      <p>
        Wenn Sie uns über das Anfrageformular kontaktieren, verarbeiten wir die
        von Ihnen angegebenen Daten (Name, E-Mail-Adresse sowie optional
        Telefon, Anzahl der Gäste, gewünschte Journey und Nachricht)
        ausschließlich zur Bearbeitung Ihrer Anfrage und zur Anbahnung eines
        möglichen Vertragsverhältnisses. Der Versand erfolgt per E-Mail über den
        Dienstleister Resend (Resend, Inc., USA) als Auftragsverarbeiter.
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. b und lit. f DSGVO.
      </p>

      <h2>Spam-Schutz (Cloudflare Turnstile)</h2>
      <p>
        Zum Schutz des Formulars vor missbräuchlicher automatisierter Nutzung
        setzen wir Cloudflare Turnstile ein. Dabei werden technische
        Informationen zur Unterscheidung menschlicher von automatisierter
        Nutzung verarbeitet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
      </p>

      <h2>Reichweitenmessung (Cloudflare Web Analytics)</h2>
      <p>
        Wir nutzen Cloudflare Web Analytics, eine cookielose, datenschutz-
        freundliche Reichweitenmessung. Es werden keine Cookies gesetzt und
        keine einzelnen Personen über Websites hinweg nachverfolgt.
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
      </p>

      <h2>Speicherdauer</h2>
      <p>
        Wir speichern personenbezogene Daten nur so lange, wie es für die
        genannten Zwecke erforderlich ist oder gesetzliche Aufbewahrungsfristen
        bestehen. Anfragedaten werden gelöscht, sobald sie für die Bearbeitung
        nicht mehr benötigt werden und keine Aufbewahrungspflichten
        entgegenstehen.
      </p>

      <h2>Ihre Rechte</h2>
      <p>
        Sie haben das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16),
        Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18),
        Datenübertragbarkeit (Art. 20) sowie ein Widerspruchsrecht (Art. 21)
        gegen Verarbeitungen auf Grundlage berechtigter Interessen. Eine
        erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft
        widerrufen.
      </p>

      <h2>Beschwerderecht</h2>
      <p>
        Ihnen steht ein Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde
        zu. Zuständig ist das Bayerische Landesamt für Datenschutzaufsicht
        (BayLDA), Promenade 18, 91522 Ansbach.
      </p>
    </>
  );
}

function PrivacyEN() {
  return (
    <>
      <h2>Data controller</h2>
      <p>
        The controller for data processing on this website is:
        <br />
        {company.name}
        <br />
        {company.street}, {company.postalCode} {company.city}, {company.country}
        <br />
        Email: <a href={`mailto:${company.email}`}>{company.email}</a>
        <br />
        Phone: <a href={`tel:${company.phoneHref}`}>{company.phone}</a>
      </p>

      <h2>General</h2>
      <p>
        We process personal data only in accordance with the General Data
        Protection Regulation (GDPR) and the German Federal Data Protection Act.
        The legal bases are in particular Art. 6(1)(b) GDPR (contract and
        pre-contractual steps), (f) GDPR (legitimate interests) and (a) GDPR
        (consent), where given.
      </p>

      <h2>Hosting (Cloudflare)</h2>
      <p>
        This website runs on the infrastructure of Cloudflare, Inc. (101
        Townsend St, San Francisco, CA 94107, USA) as a processor. When the
        pages are accessed, technically necessary data (e.g. IP address, date
        and time, requested resource, browser type) are processed for delivery
        and security. The legal basis is Art. 6(1)(f) GDPR. A data-processing
        agreement is in place with Cloudflare; transfers to third countries are
        safeguarded by Standard Contractual Clauses.
      </p>

      <h2>Contact and enquiry form</h2>
      <p>
        When you contact us via the enquiry form, we process the details you
        provide (name, email address and, optionally, phone, number of guests,
        preferred journey and message) solely to handle your enquiry and to
        initiate a possible contractual relationship. Delivery is by email
        through the provider Resend (Resend, Inc., USA) as a processor. The
        legal basis is Art. 6(1)(b) and (f) GDPR.
      </p>

      <h2>Spam protection (Cloudflare Turnstile)</h2>
      <p>
        To protect the form against abusive automated use we use Cloudflare
        Turnstile, which processes technical information to distinguish human
        from automated use. The legal basis is Art. 6(1)(f) GDPR.
      </p>

      <h2>Analytics (Cloudflare Web Analytics)</h2>
      <p>
        We use Cloudflare Web Analytics, a cookieless, privacy-friendly
        analytics service. No cookies are set and no individuals are tracked
        across websites. The legal basis is Art. 6(1)(f) GDPR.
      </p>

      <h2>Retention</h2>
      <p>
        We retain personal data only for as long as necessary for the stated
        purposes or as required by statutory retention periods. Enquiry data are
        deleted once they are no longer needed and no retention obligations
        apply.
      </p>

      <h2>Your rights</h2>
      <p>
        You have the right of access (Art. 15), rectification (Art. 16), erasure
        (Art. 17), restriction of processing (Art. 18), data portability (Art.
        20) and the right to object (Art. 21) to processing based on legitimate
        interests. You may withdraw any consent given at any time with effect
        for the future.
      </p>

      <h2>Right to complain</h2>
      <p>
        You have the right to lodge a complaint with a data protection
        supervisory authority. The competent authority is the Bavarian State
        Office for Data Protection Supervision (BayLDA), Promenade 18, 91522
        Ansbach, Germany.
      </p>
    </>
  );
}
