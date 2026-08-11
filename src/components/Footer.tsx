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

  return (
    <footer className="bg-ink text-bone/80">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
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
              <li>
                <Link
                  href="/journeys"
                  title={nav("journeysTitle")}
                  className="hover:text-champagne transition-colors"
                >
                  {nav("journeys")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  title={nav("aboutTitle")}
                  className="hover:text-champagne transition-colors"
                >
                  {nav("about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  title={nav("contactTitle")}
                  className="hover:text-champagne transition-colors"
                >
                  {nav("contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-champagne mb-4">
              {t("contact")}
            </h3>
            <address className="not-italic space-y-2.5 text-sm text-bone/60">
              <p>
                {company.street}
                <br />
                {company.postalCode} {company.city}
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
              <p>
                <a
                  href={`mailto:${company.email}`}
                  title={t("emailTitle")}
                  className="hover:text-champagne transition-colors"
                >
                  {company.email}
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
              href="/imprint"
              title={t("imprintTitle")}
              className="hover:text-champagne transition-colors"
            >
              {t("imprint")}
            </Link>
            <Link
              href="/terms-conditions"
              title={t("termsTitle")}
              className="hover:text-champagne transition-colors"
            >
              {t("terms")}
            </Link>
            <Link
              href="/privacy"
              title={t("privacyTitle")}
              className="hover:text-champagne transition-colors"
            >
              {t("privacy")}
            </Link>
          </div>
          <LanguageSwitcher className="text-bone" />
        </div>
      </Container>
    </footer>
  );
}
