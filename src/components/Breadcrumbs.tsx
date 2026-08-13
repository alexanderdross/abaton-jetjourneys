import type { ComponentProps } from "react";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { siteUrl } from "@/lib/site";
import { localizedPath, type Href } from "@/lib/i18n-urls";

type LinkHref = ComponentProps<typeof Link>["href"];

export type Crumb = { href: Href; label: string; title?: string };

/**
 * Accessible breadcrumb trail with schema.org BreadcrumbList JSON-LD.
 *
 * `trail` lists the pages after Home (Home is prepended automatically) and ends
 * with the current page, which is rendered as static text (aria-current="page").
 * Links use locale-aware, slash-terminated paths; the JSON-LD carries absolute
 * URLs for search engines.
 */
export async function Breadcrumbs({
  locale,
  trail,
  className = "",
}: {
  locale: Locale;
  trail: Crumb[];
  className?: string;
}) {
  const t = await getTranslations({ locale, namespace: "Breadcrumbs" });
  const items: Crumb[] = [
    { href: "/", label: t("home"), title: t("homeTitle") },
    ...trail,
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: `${siteUrl}${localizedPath(locale, c.href)}`,
    })),
  };

  return (
    <nav aria-label={t("ariaLabel")} className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] uppercase tracking-[0.16em] text-slate">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-ink">
                  {c.label}
                </span>
              ) : (
                <>
                  <Link
                    href={c.href as LinkHref}
                    title={c.title ?? c.label}
                    className="hover:text-champagne-ink transition-colors"
                  >
                    {c.label}
                  </Link>
                  <span aria-hidden className="text-line">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
      <script
        type="application/ld+json"
        // Structured data is trusted, build-time content.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </nav>
  );
}
