import Image from "next/image";

/**
 * Media renders real photography when a usable image path is provided, and an
 * elegant editorial placeholder otherwise. Until the hi-res photography is
 * supplied (see plan → "Offene Punkte"), placeholders keep the design intact.
 *
 * Real images live under /public (e.g. /images/journeys/…). Set
 * NEXT_PUBLIC_USE_REAL_IMAGES=1 once assets exist to switch on <Image>.
 */

const useRealImages = process.env.NEXT_PUBLIC_USE_REAL_IMAGES === "1";

type MediaProps = {
  src: string;
  alt: string;
  label?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
};

// Deterministic gradient per label so cities keep a consistent placeholder.
function gradientFor(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 360;
  }
  const h = hash;
  return `linear-gradient(135deg, hsl(${h} 18% 24%), hsl(${(h + 40) % 360} 22% 14%))`;
}

export function Media({
  src,
  alt,
  label,
  className = "",
  priority = false,
  sizes = "100vw",
  fill = true,
}: MediaProps) {
  if (useRealImages) {
    return (
      <Image
        src={src}
        alt={alt}
        fill={fill}
        priority={priority}
        sizes={sizes}
        className={`object-cover ${className}`}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={`absolute inset-0 flex items-end ${className}`}
      style={{ backgroundImage: gradientFor(label ?? alt) }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 1px, transparent 22px)",
        }}
      />
      {label && (
        <span className="relative z-10 m-6 font-serif text-2xl tracking-wide text-bone/85">
          {label}
        </span>
      )}
    </div>
  );
}
