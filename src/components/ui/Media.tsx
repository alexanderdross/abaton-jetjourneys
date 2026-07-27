import Image from "next/image";

/**
 * Media renders a fill image optimised through the Cloudflare loader
 * (src/lib/imageLoader.ts). Used inside relatively-positioned containers.
 */

type MediaProps = {
  src: string;
  alt: string;
  /** Kept for call-site compatibility; not rendered. */
  label?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
};

export function Media({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "100vw",
  fill = true,
}: MediaProps) {
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
