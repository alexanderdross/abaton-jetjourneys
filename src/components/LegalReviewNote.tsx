import type { ReactNode } from "react";

/**
 * Visible annotations for the legal review of the imprint and privacy pages.
 *
 * They highlight, in amber, what is still missing or needs a lawyer's
 * confirmation before go-live, so the reviewer can spot every open point at a
 * glance. These are review scaffolding, not final copy: remove them (and fill
 * the underlying values in src/lib/site.ts) before the site is launched.
 *
 * Colours are set inline so the highlight is guaranteed regardless of the
 * design-token setup, and it stands out against the editorial prose.
 */
export function LegalReviewNote({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <aside
      className="my-8 rounded-[2px] p-5 text-sm"
      style={{
        borderLeft: "4px solid #B45309",
        background: "#FEF3C7",
        color: "#7C4A03",
      }}
    >
      <p
        className="text-xs font-semibold uppercase tracking-[0.14em]"
        style={{ color: "#B45309" }}
      >
        {heading}
      </p>
      <div className="mt-3 space-y-2 leading-relaxed">{children}</div>
    </aside>
  );
}

/** Inline amber highlight for a missing or to-confirm value inside the text. */
export function LegalGap({ children }: { children: ReactNode }) {
  return (
    <mark
      className="rounded-[2px] px-1"
      style={{ background: "#FDE68A", color: "#7C4A03" }}
    >
      {children}
    </mark>
  );
}
