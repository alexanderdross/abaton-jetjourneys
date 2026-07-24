"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";

const navItems = [
  { key: "journeys", href: "/journeys" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

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
            className="font-serif text-2xl tracking-[0.2em] uppercase text-ink"
            aria-label="ABATON JetJourneys — home"
          >
            Abaton
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-xs uppercase tracking-[0.18em] text-ink/80 hover:text-champagne transition-colors"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-6">
            <LanguageSwitcher />
            <Link
              href="/contact"
              className="text-xs uppercase tracking-[0.14em] font-medium border border-ink px-5 py-2.5 rounded-[2px] hover:bg-ink hover:text-bone transition-colors"
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
              className={`block h-px w-6 bg-ink transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`block h-px w-6 bg-ink transition-opacity ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-px w-6 bg-ink transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden border-t border-line bg-bone/98 px-6 py-8">
          <ul className="flex flex-col gap-6">
            {navItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="font-serif text-2xl text-ink hover:text-champagne transition-colors"
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-center justify-between">
            <LanguageSwitcher />
            <Link
              href="/contact"
              className="text-xs uppercase tracking-[0.14em] font-medium border border-ink px-5 py-2.5 rounded-[2px]"
            >
              {t("requestCta")}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
