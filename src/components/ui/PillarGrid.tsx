import { Reveal } from "./Reveal";

export type Pillar = { title: string; body: string };

/**
 * Numbered tile grid. The same markup was inlined three times (home pillars,
 * about values, how-it-works), each hard-wired to exactly three items; this
 * takes a variable list so six-item sections work too.
 */
export function PillarGrid({
  items,
  variant = "centered",
  className = "",
}: {
  items: Pillar[];
  variant?: "centered" | "ruled";
  className?: string;
}) {
  const columns = items.length % 3 === 0 ? "md:grid-cols-3" : "md:grid-cols-2";

  return (
    <div className={`grid gap-10 ${columns} ${className}`}>
      {items.map((item, i) => (
        <Reveal key={item.title} delay={Math.min(i * 120, 360)}>
          {variant === "centered" ? (
            <div className="text-center">
              <span className="font-serif text-champagne-ink text-5xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-serif text-2xl mt-4 mb-3 text-ink">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate">{item.body}</p>
            </div>
          ) : (
            <div className="border-t border-line pt-6">
              <span className="eyebrow">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-serif text-2xl mt-3 mb-3 text-ink">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate">{item.body}</p>
            </div>
          )}
        </Reveal>
      ))}
    </div>
  );
}
