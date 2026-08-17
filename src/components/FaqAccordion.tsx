"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { slugifyHeading } from "@/lib/slug";

type FaqAccordionProps = {
  /** Headline text. Doubles as the SEO `title` attribute and the hash slug. */
  title: string;
  children: ReactNode;
  /** Classes for the outer `<details>` element. */
  className?: string;
  /** Classes for the `<summary>` headline. */
  summaryClassName?: string;
};

/**
 * A single deep-linkable FAQ accordion.
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
export function FaqAccordion({
  title,
  children,
  className,
  summaryClassName,
}: FaqAccordionProps) {
  const id = slugifyHeading(title);
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
        {title}
        <span
          className="mt-1 shrink-0 text-champagne-ink transition-transform group-open:rotate-45"
          aria-hidden
        >
          +
        </span>
      </summary>
      {children}
    </details>
  );
}
