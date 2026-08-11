import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/i18n/navigation";

type Variant = "primary" | "outline" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 text-sm tracking-[0.12em] uppercase font-medium transition-colors duration-300 px-7 py-3.5 rounded-[2px] touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-bone hover:bg-champagne hover:text-ink border border-ink hover:border-champagne",
  outline:
    "bg-transparent text-current border border-current/40 hover:border-champagne hover:text-champagne",
  ghost: "bg-transparent text-current hover:text-champagne px-0 py-0",
};

type LinkButtonProps = {
  href: ComponentProps<typeof Link>["href"];
  children: ReactNode;
  variant?: Variant;
  className?: string;
  /** SEO title attribute, required on every link (see docs/SPEC.md, section 3). */
  title?: string;
};

export function LinkButton({
  href,
  children,
  variant = "primary",
  className = "",
  title,
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      title={title}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

type ButtonProps = ComponentProps<"button"> & {
  variant?: Variant;
};

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
