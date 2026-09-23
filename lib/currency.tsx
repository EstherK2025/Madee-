"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { bcp47, useLocale } from "./i18n";
import { RATES, ZERO_DEC, convert, type CurrencyCode } from "./rates";

export type { CurrencyCode } from "./rates";

export const CURRENCIES: { code: CurrencyCode; label: string }[] = [
  { code: "CAD", label: "CAD $" },
  { code: "EUR", label: "EUR €" },
  { code: "USD", label: "USD $" },
  { code: "XOF", label: "XOF (FCFA)" },
  { code: "GBP", label: "GBP £" },
  { code: "XAF", label: "XAF (FCFA)" },
];

const KEY = "madee.currency";
const DEFAULT: CurrencyCode = "CAD";

export function formatMoney(
  eurCents: number,
  code: CurrencyCode,
  locale = "fr-FR"
): string {
  const dec = ZERO_DEC.has(code) ? 0 : 2;
  const value = convert(eurCents, code);
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: code,
      minimumFractionDigits: dec,
      maximumFractionDigits: dec,
    }).format(value);
  } catch {
    return `${value.toFixed(dec)} ${code}`;
  }
}

type Ctx = {
  code: CurrencyCode;
  setCode: (c: CurrencyCode) => void;
};

const CurrencyContext = createContext<Ctx | null>(null);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [code, setCodeState] = useState<CurrencyCode>(DEFAULT);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY) as CurrencyCode | null;
      if (saved && RATES[saved]) setCodeState(saved);
    } catch {
      /* ignore */
    }
  }, []);

  const setCode = useCallback((c: CurrencyCode) => {
    setCodeState(c);
    try {
      localStorage.setItem(KEY, c);
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <CurrencyContext.Provider value={{ code, setCode }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency(): Ctx {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}

// Composant feuille : affiche un prix (centimes d'euro) dans la devise choisie.
export function Price({ cents }: { cents: number }) {
  const { code } = useCurrency();
  const { locale } = useLocale();
  return <>{formatMoney(cents, code, bcp47(locale))}</>;
}
