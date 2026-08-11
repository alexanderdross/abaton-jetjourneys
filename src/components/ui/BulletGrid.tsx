type Tone = "ink" | "bone";

/**
 * Two-column marker list. Extracted from the journey detail page's inclusions
 * block so included, excluded and any other flat list share one renderer.
 */
export function BulletGrid({
  items,
  tone = "bone",
  marker = "✦",
}: {
  items: string[];
  tone?: Tone;
  marker?: string;
}) {
  const dark = tone === "ink";
  return (
    <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className={`flex gap-3 pb-4 border-b ${
            dark ? "text-bone/80 border-bone/10" : "text-slate border-line"
          }`}
        >
          <span className="text-champagne shrink-0" aria-hidden>
            {marker}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
