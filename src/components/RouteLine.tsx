// Elegant horizontal route visualisation: city → city with flight markers.
export function RouteLine({ route }: { route: string[] }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-3 gap-y-4">
      {route.map((city, i) => (
        <li key={`${city}-${i}`} className="flex items-center gap-3">
          <span className="flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 rounded-full bg-champagne"
              aria-hidden
            />
            <span className="text-sm tracking-wide text-ink">{city}</span>
          </span>
          {i < route.length - 1 && (
            <span className="text-champagne/60" aria-hidden>
              ✈
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
