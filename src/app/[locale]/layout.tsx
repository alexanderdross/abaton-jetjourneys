import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FxProvider } from "@/components/fx/FxProvider";
import { getUpcomingJourneys } from "@/lib/journeys";
import { siteUrl, noindex } from "@/lib/site";
import { altLinks } from "@/lib/i18n-urls";
import type { Locale } from "@/i18n/routing";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-cormorant",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t("defaultTitle"),
      template: `%s · ${t("siteName")}`,
    },
    description: t("defaultDescription"),
    alternates: altLinks(locale as Locale, "/"),
    openGraph: {
      type: "website",
      siteName: t("siteName"),
      title: t("defaultTitle"),
      description: t("defaultDescription"),
      locale: locale === "de" ? "de_DE" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: t("defaultTitle"),
      description: t("defaultDescription"),
    },
    icons: { icon: "/favicon.svg" },
    // Interim/staging domain: keep it out of search results.
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Nav" });

  // Journeys on the interest list carry no price, so their pages hide the
  // currency selector (client brief, journey detail section).
  const interestSlugs = getUpcomingJourneys().map((j) => j.slug);

  return (
    <html lang={locale} className={`${inter.variable} ${cormorant.variable}`}>
      <body className="min-h-screen flex flex-col">
        <NextIntlClientProvider>
          <FxProvider>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[2px] focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-bone focus:outline-none focus:ring-2 focus:ring-champagne"
            >
              {t("skipToContent")}
            </a>
            <Header interestSlugs={interestSlugs} />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
          </FxProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
