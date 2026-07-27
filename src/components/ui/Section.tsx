import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  tone?: "bone" | "ink" | "white";
  id?: string;
};

const tones = {
  bone: "bg-bone text-ink",
  white: "bg-white text-ink",
  ink: "bg-ink text-bone",
};

export function Section({
  children,
  className = "",
  tone = "bone",
  id,
}: SectionProps) {
  return (
    <section id={id} className={`py-20 sm:py-28 ${tones[tone]} ${className}`}>
      {children}
    </section>
  );
}
