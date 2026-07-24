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
  return { title: t("privacyTitle"), robots: { index: false } };
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Legal");
  const de = locale === "de";

  return (
    <LegalLayout title={t("privacyTitle")}>
      <p className="text-sm text-slate/70 italic">{t("placeholderNote")}</p>

      <h2>{de ? "Verantwortlicher" : "Data Controller"}</h2>
      <p>
        {company.name}
        <br />
        {company.street}, {company.postalCode} {company.city}, {company.country}
        <br />
        <a href={`mailto:${company.email}`}>{company.email}</a>
      </p>

      <h2>{de ? "Kontaktanfragen" : "Contact Enquiries"}</h2>
      <p>
        {de
          ? "Wenn Sie uns über das Anfrageformular kontaktieren, verarbeiten wir die von Ihnen angegebenen Daten (Name, E-Mail, ggf. Telefon und Nachricht) ausschließlich zur Bearbeitung Ihrer Anfrage. Die Übermittlung erfolgt per E-Mail über unseren Dienstleister Resend."
          : "When you contact us via the enquiry form, we process the details you provide (name, email, and optionally phone and message) solely to handle your enquiry. Delivery is by email through our provider Resend."}
      </p>

      <h2>{de ? "Spam-Schutz" : "Spam Protection"}</h2>
      <p>
        {de
          ? "Zum Schutz vor missbräuchlichen Übermittlungen setzen wir Cloudflare Turnstile ein."
          : "To protect against abusive submissions we use Cloudflare Turnstile."}
      </p>

      <h2>{de ? "Reichweitenmessung" : "Analytics"}</h2>
      <p>
        {de
          ? "Wir nutzen Cloudflare Web Analytics — eine cookielose, datenschutzfreundliche Messung ohne Nachverfolgung einzelner Personen."
          : "We use Cloudflare Web Analytics — a cookieless, privacy-friendly measurement that does not track individuals."}
      </p>

      <h2>{de ? "Ihre Rechte" : "Your Rights"}</h2>
      <p>
        {de
          ? "Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer personenbezogenen Daten sowie ein Beschwerderecht bei einer Aufsichtsbehörde. [Platzhalter — bitte finalisieren.]"
          : "You have the right to access, rectify, erase and restrict the processing of your personal data, as well as the right to lodge a complaint with a supervisory authority. [Placeholder — please finalise.]"}
      </p>
    </LegalLayout>
  );
}
