// Interim branded route diagram: numbered station nodes joined by a dashed
// flight path, with a round-trip return to the origin. This is the stopgap for
// the hand-illustrated per-journey map the client brief asks for
// (docs/OFFENE-INHALTE.md item 2.3); it is schematic, not geographic.
//
// `tone="light"` sits on bone/white sections, `tone="dark"` on the ink section.

type Tone = "light" | "dark";

const palette: Record<
  Tone,
  {
    name: string;
    node: string;
    line: string;
    plane: string;
    returnNode: string;
    returnLabel: string;
  }
> = {
  light: {
    name: "text-ink",
    node: "border-champagne text-champagne-ink",
    line: "border-champagne/40",
    plane: "text-champagne/70",
    returnNode: "border-champagne/40 text-champagne-ink",
    returnLabel: "text-slate",
  },
  dark: {
    name: "text-bone/90",
    node: "border-champagne-light/70 text-champagne-light",
    line: "border-bone/30",
    plane: "text-champagne/70",
    returnNode: "border-bone/30 text-champagne-light",
    returnLabel: "text-bone/60",
  },
};

function Connector({ tone }: { tone: Tone }) {
  const c = palette[tone];
  return (
    <span className="mx-1.5 flex items-center gap-1.5" aria-hidden>
      <span className={`block w-6 border-t border-dashed ${c.line}`} />
      <span className={`text-xs ${c.plane}`}>✈</span>
      <span className={`block w-6 border-t border-dashed ${c.line}`} />
    </span>
  );
}

export function RouteMap({
  route,
  tone = "light",
  roundTrip = true,
}: {
  route: string[];
  tone?: Tone;
  roundTrip?: boolean;
}) {
  if (route.length < 2) return null;
  const c = palette[tone];

  return (
    <ol className="flex flex-wrap items-center gap-y-4">
      {route.map((city, i) => (
        <li key={`${city}-${i}`} className="flex items-center">
          <span className="flex items-center gap-2.5">
            <span
              className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border text-[11px] font-medium tabular-nums ${c.node}`}
              aria-hidden
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className={`text-sm tracking-wide ${c.name}`}>{city}</span>
          </span>
          {i < route.length - 1 && <Connector tone={tone} />}
        </li>
      ))}

      {roundTrip && (
        <li className="flex items-center">
          <Connector tone={tone} />
          <span className="flex items-center gap-2.5">
            <span
              className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border text-xs ${c.returnNode}`}
              aria-hidden
            >
              ↩
            </span>
            <span className={`text-sm tracking-wide ${c.returnLabel}`}>
              {route[0]}
            </span>
          </span>
        </li>
      )}
    </ol>
  );
}
