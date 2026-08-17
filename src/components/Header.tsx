"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { CurrencySwitcher } from "./fx/CurrencySwitcher";

// `titleKey` supplies the SEO title attribute required on every link.
const navItems = [
  { key: "journeys", titleKey: "journeysTitle", href: "/journeys" },
  { key: "experience", titleKey: "experienceTitle", href: "/experience" },
  { key: "about", titleKey: "aboutTitle", href: "/about" },
  { key: "contact", titleKey: "contactTitle", href: "/contact" },
] as const;

// Routes whose top section is a full-bleed dark hero. Over these, the
// transparent header needs light content for contrast; everywhere else the
// page top is light (bone), so the header stays dark.
function hasDarkHero(pathname: string): boolean {
  return (
    pathname === "/" ||
    pathname === "/about" ||
    pathname === "/experience" ||
    (pathname.startsWith("/journeys/") && pathname !== "/journeys")
  );
}

export function Header() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Light content only while transparent over a dark hero (not scrolled/open).
  const light = hasDarkHero(pathname) && !scrolled && !open;

  const navLinkColor = light
    ? "text-bone/85 hover:text-champagne-light"
    : "text-ink/80 hover:text-champagne-ink";
  const ctaColor = light
    ? "border-bone/50 text-bone hover:bg-bone hover:text-ink"
    : "border-ink text-ink hover:bg-ink hover:text-bone";
  const barColor = light ? "bg-bone" : "bg-ink";

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "bg-bone/95 backdrop-blur-sm border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className="relative block h-7 w-[130px]"
            title={t("homeTitle")}
            aria-label="ABATON JetJourneys, home"
          >
            <Image
              src={
                light ? "/logos/abaton-white.png" : "/logos/abaton-black.png"
              }
              alt="ABATON JetJourneys"
              fill
              priority
              sizes="130px"
              className="object-contain object-left"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                title={t(item.titleKey)}
                className={`text-xs uppercase tracking-[0.18em] transition-colors ${navLinkColor}`}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-6">
            <CurrencySwitcher
              className={light ? "text-bone" : "text-ink"}
              light={light}
            />
            <LanguageSwitcher
              className={light ? "text-bone" : "text-ink"}
              light={light}
            />
            <Link
              href="/contact"
              title={t("requestCtaTitle")}
              className={`text-xs uppercase tracking-[0.14em] font-medium border px-5 py-2.5 rounded-[2px] transition-colors ${ctaColor}`}
            >
              {t("requestCta")}
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label={open ? t("close") : t("menu")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`block h-px w-6 transition-transform ${barColor} ${open ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`block h-px w-6 transition-opacity ${barColor} ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-px w-6 transition-transform ${barColor} ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu (always on the bone panel → dark content) */}
      {open && (
        <nav className="md:hidden border-t border-line bg-bone/98 px-6 py-8">
          <ul className="flex flex-col gap-6">
            {navItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  title={t(item.titleKey)}
                  className="font-serif text-2xl text-ink hover:text-champagne-ink transition-colors"
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <LanguageSwitcher className="text-ink" />
              <CurrencySwitcher className="text-ink" />
            </div>
            <Link
              href="/contact"
              title={t("requestCtaTitle")}
              className="text-xs uppercase tracking-[0.14em] font-medium border border-ink text-ink px-5 py-2.5 rounded-[2px]"
            >
              {t("requestCta")}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
