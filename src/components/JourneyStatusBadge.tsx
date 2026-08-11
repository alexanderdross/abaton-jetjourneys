import { useTranslations } from "next-intl";
import type { JourneyStatus } from "@/lib/journeys";

const labelKeys = {
  open: "statusOpen",
  interest_list: "statusInterestList",
  in_development: "statusInDevelopment",
  invitation_only: "statusInvitationOnly",
} as const;

/**
 * Release-status pill. `open` is the only one that reads as an invitation to
 * book, so it carries the accent; everything else stays deliberately quiet.
 */
export function JourneyStatusBadge({
  status,
  tone = "light",
  className = "",
}: {
  status: JourneyStatus;
  tone?: "light" | "dark";
  className?: string;
}) {
  const t = useTranslations("Journeys");
  const open = status === "open";

  const colours = open
    ? "bg-champagne text-ink"
    : tone === "dark"
      ? "border border-bone/40 text-bone/80"
      : "border border-line text-slate";

  return (
    <span
      className={`inline-flex items-center rounded-[2px] px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] ${colours} ${className}`}
    >
      {t(labelKeys[status])}
    </span>
  );
}
