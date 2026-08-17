"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { slugifyHeading } from "@/lib/slug";

type HashAccordionProps = {
  /**
   * Headline text. Used for the SEO `title` attribute on the summary and, by
   * default, as the source for the hash slug.
   */
  title: string;
  /** Body content revealed when the item is open. */
  children: ReactNode;
  /**
   * Custom summary content. Defaults to the title text plus a "+" indicator.
   * Provide this for accordions whose headline is a richer layout (e.g. the
   * itinerary day row with its day number and label).
   */
  summary?: ReactNode;
  /**
   * Overrides the string the hash slug is derived from. Use when the visible
   * title is not guaranteed unique on the page (e.g. itinerary days). The SEO
   * `title` attribute still uses `title`.
   */
  slugSource?: string;
  /** Classes for the outer `<details>` element. */
  className?: string;
  /** Classes for the `<summary>` headline. */
  summaryClassName?: string;
};

/**
 * A single deep-linkable accordion.
 *
 * Requirements (client brief):
 *  - the headline carries an SEO `title` attribute;
 *  - clicking the headline opens the item (native `<details>` toggle);
 *  - opening an item appends a hash built from the headline to the URL;
 *  - entering/visiting that hash opens the matching item and scrolls to it.
 *
 * The element `id` and the location hash are the same headline slug, so links
 * like `/good-to-know#stornierung` deep-link straight to an answer.
 */
export function HashAccordion({
  title,
  children,
  summary,
  slugSource,
  className,
  summaryClassName,
}: HashAccordionProps) {
  const id = slugifyHeading(slugSource ?? title);
  const ref = useRef<HTMLDetailsElement>(null);

  // Open + scroll to this item when its slug is (or becomes) the URL hash.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const openFromHash = () => {
      const hash = decodeURIComponent(window.location.hash.slice(1));
      if (hash !== id) return;
      if (!el.open) el.open = true;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [id]);

  // Keep the URL hash in sync with the open state, without polluting history
  // or triggering a scroll jump.
  const handleToggle = () => {
    const el = ref.current;
    if (!el) return;
    const current = decodeURIComponent(window.location.hash.slice(1));
    if (el.open) {
      if (current !== id) history.replaceState(null, "", `#${id}`);
    } else if (current === id) {
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
    }
  };

  return (
    <details
      id={id}
      ref={ref}
      onToggle={handleToggle}
      className={`scroll-mt-32 ${className ?? ""}`}
    >
      <summary title={title} className={summaryClassName}>
        {summary ?? (
          <>
            {title}
            <span
              className="mt-1 shrink-0 text-champagne-ink transition-transform group-open:rotate-45"
              aria-hidden
            >
              +
            </span>
          </>
        )}
      </summary>
      {children}
    </details>
  );
}
