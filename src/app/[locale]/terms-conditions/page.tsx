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
  return { title: t("termsTitle"), robots: { index: false } };
}

export default async function TermsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Legal");

  return (
    <LegalLayout title={t("termsTitle")}>
      {locale === "de" ? <TermsDE /> : <TermsEN />}
    </LegalLayout>
  );
}

function TermsDE() {
  return (
    <>
      <p>
        Diese Allgemeinen Geschäfts- und Reisebedingungen gelten für Reisen der{" "}
        {company.name}, {company.street}, {company.postalCode} {company.city}{" "}
        (nachfolgend „Veranstalter"). Sie ergänzen die gesetzlichen Bestimmungen
        des Pauschalreiserechts (§§ 651a ff. BGB).
      </p>

      <h2>1. Vertragsschluss</h2>
      <p>
        Mit der Buchung (Reiseanmeldung) bietet der Reisende dem Veranstalter den
        Abschluss eines Reisevertrags verbindlich an. Der Vertrag kommt mit der
        Bestätigung (Reisebestätigung) durch den Veranstalter zustande. Weicht
        die Bestätigung vom Inhalt der Buchung ab, liegt ein neues Angebot vor,
        an das der Veranstalter befristet gebunden ist.
      </p>

      <h2>2. Leistungen und Preise</h2>
      <p>
        Der Umfang der vertraglichen Leistungen ergibt sich aus der Leistungs-
        beschreibung der jeweiligen Journey sowie aus der Reisebestätigung.
        Preise verstehen sich pro Person in Euro einschließlich der gesetzlichen
        Mehrwertsteuer, soweit anwendbar. Nicht enthalten sind persönliche
        Ausgaben, Trinkgelder sowie Leistungen, die nicht ausdrücklich als
        eingeschlossen ausgewiesen sind.
      </p>

      <h2>3. Zahlung</h2>
      <p>
        Nach Vertragsschluss und Aushändigung des Sicherungsscheins wird eine
        Anzahlung in Höhe von 30 % des Reisepreises fällig. Die Restzahlung ist,
        sofern der Sicherungsschein übergeben wurde, 30 Tage vor Reisebeginn ohne
        weitere Aufforderung fällig. Bei Buchungen innerhalb von 30 Tagen vor
        Reisebeginn ist der gesamte Reisepreis sofort fällig.
      </p>

      <h2>4. Leistungs- und Preisänderungen</h2>
      <p>
        Änderungen wesentlicher Reiseleistungen von dem vereinbarten Inhalt des
        Reisevertrags, die nach Vertragsschluss notwendig werden und vom
        Veranstalter nicht wider Treu und Glauben herbeigeführt wurden, sind nur
        gestattet, soweit die Änderungen nicht erheblich sind und den Gesamt-
        zuschnitt der Reise nicht beeinträchtigen. Über Änderungen wird der
        Veranstalter unverzüglich informieren.
      </p>

      <h2>5. Rücktritt durch den Reisenden, Stornokosten</h2>
      <p>
        Der Reisende kann jederzeit vor Reisebeginn zurücktreten. Maßgeblich ist
        der Zugang der Rücktrittserklärung. Tritt der Reisende zurück, kann der
        Veranstalter eine angemessene Entschädigung verlangen. Die Höhe richtet
        sich nach dem Reisepreis abzüglich ersparter Aufwendungen und
        anderweitiger Verwendung der Reiseleistungen. Aufgrund des besonderen
        Charakters dieser Reisen (Privatjet, kleine Gruppe) gelten
        reisespezifische Stornostaffeln, die in der Reisebestätigung ausgewiesen
        werden. Dem Reisenden bleibt der Nachweis vorbehalten, dass kein oder ein
        wesentlich geringerer Schaden entstanden ist.
      </p>

      <h2>6. Umbuchungen und Ersatzperson</h2>
      <p>
        Bis zum Reisebeginn kann der Reisende verlangen, dass ein Dritter in die
        Rechte und Pflichten aus dem Reisevertrag eintritt, sofern dieser den
        besonderen Reiseerfordernissen genügt. Mehrkosten trägt der Reisende
        gesamtschuldnerisch mit dem Dritten.
      </p>

      <h2>7. Rücktritt des Veranstalters wegen Nichterreichens der Mindestteilnehmerzahl</h2>
      <p>
        Die Journeys sind bewusst auf sechs bis zehn Gäste begrenzt. Wird die in
        der Reisebeschreibung genannte Mindestteilnehmerzahl nicht erreicht, kann
        der Veranstalter bis zu 20 Tage vor Reisebeginn vom Vertrag zurücktreten.
        Bereits geleistete Zahlungen werden unverzüglich erstattet.
      </p>

      <h2>8. Kündigung wegen außergewöhnlicher Umstände</h2>
      <p>
        Wird die Reise infolge bei Vertragsschluss nicht vorhersehbarer
        außergewöhnlicher Umstände erheblich erschwert, gefährdet oder
        beeinträchtigt, können beide Vertragsparteien den Vertrag nach Maßgabe
        der §§ 651h, 651l BGB kündigen.
      </p>

      <h2>9. Obliegenheiten des Reisenden, Mängelanzeige</h2>
      <p>
        Wird die Reise nicht vertragsgemäß erbracht, kann der Reisende Abhilfe
        verlangen. Der Reisende ist verpflichtet, auftretende Mängel unverzüglich
        gegenüber dem Veranstalter oder der örtlichen Reiseleitung anzuzeigen und
        Gelegenheit zur Abhilfe zu geben.
      </p>

      <h2>10. Beschränkung der Haftung</h2>
      <p>
        Die vertragliche Haftung des Veranstalters für Schäden, die nicht
        Körperschäden sind und nicht schuldhaft herbeigeführt wurden, ist auf den
        dreifachen Reisepreis beschränkt, soweit gesetzlich zulässig. Weiter
        gehende internationale Übereinkommen und gesetzliche Vorschriften bleiben
        unberührt.
      </p>

      <h2>11. Pass-, Visa-, Zoll-, Devisen- und Gesundheitsbestimmungen</h2>
      <p>
        Der Reisende ist für die Einhaltung der für die Reise maßgeblichen Pass-,
        Visa-, Zoll-, Devisen- und Gesundheitsvorschriften selbst verantwortlich.
        Der Veranstalter informiert über allgemeine Bestimmungen, geht dabei aber
        von Staatsangehörigen des Landes aus, in dem die Reise angeboten wird.
      </p>

      <h2>12. Insolvenzabsicherung</h2>
      <p>
        Der Reisepreis ist im Rahmen der gesetzlichen Vorgaben gegen die
        Insolvenz des Veranstalters abgesichert. Der Reisende erhält vor
        Fälligkeit der Anzahlung einen Sicherungsschein des Kundengeldabsicherers{" "}
        {"[Name des Versicherers / Absicherers]"}.
      </p>

      <h2>13. Streitbeilegung und Rechtswahl</h2>
      <p>
        Der Veranstalter nimmt nicht an einem Streitbeilegungsverfahren vor einer
        Verbraucherschlichtungsstelle teil. Es gilt deutsches Recht. Für Klagen
        des Veranstalters gegen Kaufleute gilt als Gerichtsstand der Sitz des
        Veranstalters.
      </p>
    </>
  );
}

function TermsEN() {
  return (
    <>
      <p>
        These General Terms and Travel Conditions apply to journeys organised by{" "}
        {company.name}, {company.street}, {company.postalCode} {company.city}{" "}
        (the "Operator"). They supplement the statutory provisions of German
        package-travel law (§§ 651a et seq. German Civil Code, BGB).
      </p>

      <h2>1. Conclusion of contract</h2>
      <p>
        By booking, the traveller makes a binding offer to the Operator to
        conclude a travel contract. The contract is formed upon the Operator's
        confirmation. If the confirmation deviates from the booking, it
        constitutes a new offer to which the Operator is bound for a limited
        period.
      </p>

      <h2>2. Services and prices</h2>
      <p>
        The scope of the contractual services follows from the description of the
        respective journey and the travel confirmation. Prices are per person in
        Euro including statutory value added tax where applicable. Personal
        expenses, gratuities and services not expressly stated as included are
        not part of the price.
      </p>

      <h2>3. Payment</h2>
      <p>
        After conclusion of the contract and handover of the insolvency-protection
        certificate, a deposit of 30 % of the travel price is due. The balance is
        due 30 days before departure without further request, provided the
        certificate has been handed over. For bookings made within 30 days of
        departure, the full price is due immediately.
      </p>

      <h2>4. Changes to services and prices</h2>
      <p>
        Changes to essential travel services that become necessary after the
        conclusion of the contract and were not brought about by the Operator in
        bad faith are permitted only where they are not significant and do not
        impair the overall character of the journey. The Operator will inform the
        traveller of any changes without undue delay.
      </p>

      <h2>5. Withdrawal by the traveller, cancellation charges</h2>
      <p>
        The traveller may withdraw at any time before departure; receipt of the
        withdrawal notice is decisive. In that case the Operator may claim
        reasonable compensation, calculated from the travel price less saved
        expenses and any alternative use of the services. Given the particular
        character of these journeys (private jet, small group), journey-specific
        cancellation scales apply and are stated in the travel confirmation. The
        traveller may prove that no loss or a substantially lower loss was
        incurred.
      </p>

      <h2>6. Rebooking and substitute participants</h2>
      <p>
        Up to departure the traveller may request that a third party assume the
        rights and obligations under the contract, provided that person meets the
        specific travel requirements. Additional costs are borne jointly and
        severally by the traveller and the third party.
      </p>

      <h2>7. Withdrawal by the Operator if the minimum number is not reached</h2>
      <p>
        Journeys are intentionally limited to six to ten guests. If the minimum
        number of participants stated in the journey description is not reached,
        the Operator may withdraw up to 20 days before departure. Payments already
        made are refunded without undue delay.
      </p>

      <h2>8. Termination for exceptional circumstances</h2>
      <p>
        If the journey is significantly impaired, endangered or affected as a
        result of unavoidable, extraordinary circumstances not foreseeable at the
        conclusion of the contract, both parties may terminate the contract in
        accordance with §§ 651h, 651l BGB.
      </p>

      <h2>9. Traveller's duties, notice of defects</h2>
      <p>
        If the journey is not provided in accordance with the contract, the
        traveller may demand remedy. The traveller must notify the Operator or the
        local guide of any defects without undue delay and give an opportunity to
        remedy them.
      </p>

      <h2>10. Limitation of liability</h2>
      <p>
        The Operator's contractual liability for damages that are not bodily
        injury and were not caused culpably is limited to three times the travel
        price, to the extent permitted by law. International conventions and
        statutory provisions that grant broader claims remain unaffected.
      </p>

      <h2>11. Passport, visa, customs, currency and health regulations</h2>
      <p>
        The traveller is responsible for complying with the passport, visa,
        customs, currency and health requirements relevant to the journey. The
        Operator provides general information on the assumption of nationals of
        the country in which the journey is offered.
      </p>

      <h2>12. Insolvency protection</h2>
      <p>
        The travel price is protected against the Operator's insolvency within the
        statutory framework. Before the deposit falls due, the traveller receives
        an insolvency-protection certificate from the customer-funds insurer{" "}
        {"[name of insurer / protection provider]"}.
      </p>

      <h2>13. Dispute resolution and governing law</h2>
      <p>
        The Operator does not participate in dispute resolution proceedings before
        a consumer arbitration board. German law applies. For actions brought by
        the Operator against merchants, the place of jurisdiction is the
        Operator's registered office.
      </p>
    </>
  );
}
