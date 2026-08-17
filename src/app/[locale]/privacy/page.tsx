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
    title: t("privacyTitle"),
    alternates: altLinks(locale, "/privacy"),
    robots: { index: false },
  };
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Legal");
  const de = locale === "de";

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
      <LegalReviewNote
        heading={
          de
            ? "Für die anwaltliche Prüfung, vor Veröffentlichung bestätigen"
            : "For legal review, confirm before publishing"
        }
      >
        <p>
          {de
            ? "Diese Datenschutzerklärung beschreibt die tatsächlich eingesetzten Dienste (Hosting über Cloudflare, Formularversand über Resend, Cloudflare Turnstile, kein Analyse- oder Tracking-Dienst). Bitte folgende Punkte bestätigen, die im Text gelb hervorgehoben sind:"
            : "This privacy policy describes the services actually in use (hosting via Cloudflare, form delivery via Resend, Cloudflare Turnstile, no analytics or tracking). Please confirm the following points, highlighted in amber in the text:"}
        </p>
        <ul className="ml-5 list-disc space-y-1">
          <li>
            {de
              ? "Geschäftsanschrift: bislang Gehrenstraße 7, die frühere Datenschutzerklärung nannte Gehrenstr. 11. Bitte die korrekte Adresse bestätigen."
              : "Business address: currently Gehrenstraße 7, while the earlier privacy policy stated Gehrenstr. 11. Please confirm the correct address."}
          </li>
          <li>
            {de
              ? "Cookie abaton_fx_geo: wird ohne Zutun der Besucher aus der Cloudflare-Länderkennung gesetzt und als technisch notwendig (§ 25 Abs. 2 Nr. 2 TDDDG) eingestuft. Bitte diese Einstufung bestätigen oder die automatische Länder-Vorauswahl entfernen lassen."
              : "Cookie abaton_fx_geo: set without visitor action from Cloudflare's country signal and classified as strictly necessary (§ 25(2) no. 2 TDDDG). Please confirm this classification or have the automatic country preselection removed."}
          </li>
          <li>
            {de
              ? "Reichweitenmessung: es wird bewusst kein Analyse- oder Tracking-Dienst eingesetzt. Bitte bestätigen, dass dies so bleiben soll (sonst sind Ergänzung und Consent-Banner nötig)."
              : "Analytics: no analytics or tracking service is used, deliberately. Please confirm this should remain the case (otherwise an addition and a consent banner would be required)."}
          </li>
        </ul>
      </LegalReviewNote>

      {de ? <PrivacyDE /> : <PrivacyEN />}
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
        <LegalGap>{company.street}</LegalGap>, {company.postalCode}{" "}
        {company.city}, {company.country}
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

      <h2>Cookies</h2>
      <p>
        Diese Website verwendet ausschließlich technisch notwendige Cookies. Sie
        enthalten keine Kennung, mit der sich einzelne Besucherinnen und
        Besucher wiedererkennen lassen, und werden weder zu Analyse- noch zu
        Werbezwecken ausgewertet. Rechtsgrundlage für die Speicherung ist § 25
        Abs. 2 Nr. 2 TDDDG, für die anschließende Verarbeitung Art. 6 Abs. 1
        lit. f DSGVO.
      </p>
      <ul>
        <li>
          <strong>NEXT_LOCALE</strong>: speichert die gewählte Sprachfassung,
          damit Sie beim Wechsel zwischen Seiten in Ihrer Sprache bleiben.
          Gültigkeit: bis zum Schließen des Browsers.
        </li>
        <li>
          <strong>abaton_fx</strong>: speichert die von Ihnen im Kopfbereich
          gewählte Anzeigewährung. Gültigkeit: ein Jahr.
        </li>
        <li>
          <strong>abaton_fx_geo</strong>: enthält die aus der Länderkennung
          Ihres Zugriffs abgeleitete Anzeigewährung, damit Preise ohne weiteres
          Zutun in einer vertrauten Währung erscheinen. Gespeichert wird
          ausschließlich ein Währungscode wie „USD", nicht Ihre IP-Adresse. Die
          Länderkennung stellt unser Hosting-Dienstleister Cloudflare bereit.
          Gültigkeit: 30 Tage.
        </li>
      </ul>
      <p>
        Beträge in anderen Währungen als Euro sind eine unverbindliche
        Umrechnung zum Referenzkurs der Europäischen Zentralbank. Alle Journeys
        werden ausschließlich in Euro vereinbart und abgerechnet. Die
        Anzeigewährung, einschließlich Euro, können Sie jederzeit selbst über
        die Auswahl im Kopfbereich festlegen. Cookies lassen sich darüber hinaus
        in Ihrem Browser löschen oder blockieren. Beim Einsatz von Cloudflare
        Turnstile können zusätzlich technisch notwendige Cookies gesetzt werden,
        siehe den Abschnitt Spam-Schutz.
      </p>

      <h2>Reichweitenmessung</h2>
      <p>
        <LegalGap>
          Wir setzen auf dieser Website keine Analyse- oder Tracking-Dienste
          ein.
        </LegalGap>{" "}
        Es werden keine Cookies zu Analysezwecken gesetzt und keine einzelnen
        Personen über Websites hinweg nachverfolgt.
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
        <LegalGap>{company.street}</LegalGap>, {company.postalCode}{" "}
        {company.city}, {company.country}
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

      <h2>Cookies</h2>
      <p>
        This website uses strictly necessary cookies only. They carry no
        identifier that would allow an individual visitor to be recognised, and
        they are not evaluated for analytics or advertising purposes. The legal
        basis for storage is Section 25(2) no. 2 TDDDG, and for the subsequent
        processing Art. 6(1)(f) GDPR.
      </p>
      <ul>
        <li>
          <strong>NEXT_LOCALE</strong>: stores the language version you are
          reading, so you stay in that language as you move between pages.
          Lifetime: until you close your browser.
        </li>
        <li>
          <strong>abaton_fx</strong>: stores the display currency you selected
          in the header. Lifetime: one year.
        </li>
        <li>
          <strong>abaton_fx_geo</strong>: holds the display currency derived
          from the country your visit originates from, so prices appear in a
          familiar currency without you having to do anything. Only a currency
          code such as &quot;USD&quot; is stored, not your IP address. The
          country signal is provided by our hosting provider Cloudflare.
          Lifetime: 30 days.
        </li>
      </ul>
      <p>
        Amounts in currencies other than the euro are an indicative conversion
        at the European Central Bank reference rate. All journeys are agreed and
        invoiced exclusively in euro. You can set the display currency yourself
        at any time, including euro, using the selector in the header, and
        cookies can also be deleted or blocked in your browser. Cloudflare
        Turnstile may set further strictly necessary cookies, see the spam
        protection section.
      </p>

      <h2>Analytics</h2>
      <p>
        <LegalGap>
          We do not use any analytics or tracking services on this website.
        </LegalGap>{" "}
        No analytics cookies are set and no individuals are tracked across
        websites.
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
