"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useLocale } from "next-intl";
import type { Locale } from "@/i18n/routing";
import {
  CURRENCY_COOKIE,
  GEO_COOKIE,
  isDisplayCurrency,
  type DisplayCurrency,
} from "@/lib/fx/currencies";
import { convert, formatPrice, isRateFresh } from "@/lib/fx/convert";
import type { FxPayload } from "@/lib/fx/ecb";

/**
 * Client-side state for the indicative local-currency display.
 *
 * The server renders EUR and nothing else, so this provider starts in exactly
 * that state (EUR, no rates) and only resolves the visitor's currency after
 * mount. That keeps the prerendered HTML and the first client render identical,
 * which matters because the journey pages are static and edge-cached.
 */

type FxResponse = FxPayload & { source: string; stale: boolean };

type FxContextValue = {
  currency: DisplayCurrency;
  setCurrency: (currency: DisplayCurrency) => void;
  /** ECB reference date, only set while a conversion is actually displayed. */
  rateDate: string | null;
  /** Formatted local-currency amount, or null when nothing should be shown. */
  convertEur: (amountEur: number) => string | null;
};

const FxContext = createContext<FxContextValue | null>(null);

const SESSION_KEY = "abaton_fx_rates";
const YEAR_SECONDS = 60 * 60 * 24 * 365;

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function writeCookie(name: string, value: string): void {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${YEAR_SECONDS}; samesite=lax`;
}

// One request per session, shared by every price on the page.
let inFlight: Promise<FxResponse | null> | null = null;

function loadRates(): Promise<FxResponse | null> {
  if (inFlight) return inFlight;

  const cached = sessionStorage.getItem(SESSION_KEY);
  if (cached) {
    try {
      inFlight = Promise.resolve(JSON.parse(cached) as FxResponse);
      return inFlight;
    } catch {
      sessionStorage.removeItem(SESSION_KEY);
    }
  }

  inFlight = fetch("/api/fx")
    .then((response) => (response.ok ? response.json() : null))
    .then((payload: FxResponse | null) => {
      if (payload) {
        try {
          sessionStorage.setItem(SESSION_KEY, JSON.stringify(payload));
        } catch {
          // Private mode or a full quota. The rates still work for this page.
        }
      }
      return payload;
    })
    .catch(() => null);

  return inFlight;
}

export function FxProvider({ children }: { children: ReactNode }) {
  const locale = useLocale() as Locale;
  const [currency, setCurrencyState] = useState<DisplayCurrency>("EUR");
  const [rates, setRates] = useState<FxResponse | null>(null);

  // Resolve the visitor's currency once, after mount: an explicit choice wins
  // over the country-derived preselection from the middleware.
  useEffect(() => {
    const chosen = readCookie(CURRENCY_COOKIE);
    const geo = readCookie(GEO_COOKIE);
    const resolved = isDisplayCurrency(chosen)
      ? chosen
      : isDisplayCurrency(geo)
        ? geo
        : "EUR";
    if (resolved !== "EUR") setCurrencyState(resolved);
  }, []);

  // Rates are only worth fetching once a non-EUR currency is in play, so a
  // visitor who sees EUR prices never pays for the request.
  useEffect(() => {
    if (currency === "EUR" || rates) return;
    let active = true;
    loadRates().then((payload) => {
      if (active) setRates(payload);
    });
    return () => {
      active = false;
    };
  }, [currency, rates]);

  const setCurrency = useCallback((next: DisplayCurrency) => {
    setCurrencyState(next);
    writeCookie(CURRENCY_COOKIE, next);
  }, []);

  const value = useMemo<FxContextValue>(() => {
    // A rate that is missing, or too old to trust, means no conversion at all.
    // A wrong-looking figure next to the real EUR price is worse than none.
    const usable =
      currency !== "EUR" &&
      rates !== null &&
      isRateFresh(rates.date) &&
      typeof rates.rates[currency] === "number";

    return {
      currency,
      setCurrency,
      rateDate: usable ? rates.date : null,
      convertEur: (amountEur: number) => {
        if (!usable || !Number.isFinite(amountEur) || amountEur <= 0) {
          return null;
        }
        return formatPrice(
          convert(amountEur, rates.rates[currency], currency),
          currency,
          locale,
        );
      },
    };
  }, [currency, rates, locale, setCurrency]);

  return <FxContext.Provider value={value}>{children}</FxContext.Provider>;
}

export function useFx(): FxContextValue {
  const context = useContext(FxContext);
  if (!context) {
    throw new Error("useFx must be used inside FxProvider");
  }
  return context;
}
