import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "./ui/Container";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { company, buildYear } from "@/lib/site";

export function Footer() {
  const t = useTranslations("Footer");
  const nav = useTranslations("Nav");

  // Stamped once at build time. Deliberately not a runtime `new Date()`: the
  // edge render would make the output non-deterministic across cached responses.
  const year = buildYear;

  // The Explore column mirrors the client footer (Seitenaufbau / Briefing FINAL).
  const explore = [
    { href: "/", label: t("home"), title: nav("homeTitle") },
    { href: "/journeys", label: nav("journeys"), title: nav("journeysTitle") },
    {
      href: "/experience",
      label: nav("experience"),
      title: nav("experienceTitle"),
    },
    { href: "/about", label: nav("about"), title: nav("aboutTitle") },
    {
      href: "/good-to-know",
      label: nav("goodToKnow"),
      title: nav("goodToKnowTitle"),
    },
    { href: "/contact", label: nav("contact"), title: nav("contactTitle") },
  ] as const;

  const legal = [
    {
      href: "/terms-conditions",
      label: t("terms"),
      title: t("termsTitle"),
    },
    { href: "/imprint", label: t("imprint"), title: t("imprintTitle") },
    { href: "/privacy", label: t("privacy"), title: t("privacyTitle") },
  ] as const;

  return (
    <footer className="bg-ink text-bone/80">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="relative h-9 w-44">
              <Image
                src="/logos/abaton-white.png"
                alt="ABATON JetJourneys"
                fill
                sizes="176px"
                className="object-contain object-left"
              />
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-bone/60">
              {t("tagline")}
            </p>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-champagne mb-4">
              {t("explore")}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {explore.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    title={item.title}
                    className="hover:text-champagne transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-champagne mb-4">
              {t("legal")}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    title={item.title}
                    className="hover:text-champagne transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-champagne mb-4">
              {t("contact")}
            </h3>
            <address className="not-italic space-y-2.5 text-sm text-bone/60">
              <p>{t("company")}</p>
              <p>
                {company.street}
                <br />
                {company.postalCode} {company.city}, {company.country}
              </p>
              <p>
                <a
                  href={`mailto:${company.email}`}
                  title={t("emailTitle")}
                  className="hover:text-champagne transition-colors"
                >
                  {company.email}
                </a>
              </p>
              <p>
                <a
                  href={`tel:${company.phoneHref}`}
                  title={t("phoneTitle")}
                  className="hover:text-champagne transition-colors"
                >
                  {company.phone}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-bone/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-bone/50">
            <span>
              © {year} {t("company")}. {t("rights")}
            </span>
            <Link
              href="/terms-conditions"
              title={t("termsTitle")}
              className="hover:text-champagne transition-colors"
            >
              {t("terms")}
            </Link>
            <Link
              href="/imprint"
              title={t("imprintTitle")}
              className="hover:text-champagne transition-colors"
            >
              {t("imprint")}
            </Link>
            <Link
              href="/privacy"
              title={t("privacyTitle")}
              className="hover:text-champagne transition-colors"
            >
              {t("privacy")}
            </Link>
          </div>
          {/* Dark footer: keep the bright champagne accent (champagne-ink is
              only legible on light grounds). */}
          <LanguageSwitcher className="text-bone" light />
        </div>
      </Container>
    </footer>
  );
}
