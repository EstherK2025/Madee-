"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { DICT } from "./dictionaries";

export type Locale = "fr" | "en" | "ar";

export const LOCALES: { code: Locale; label: string; dir: "ltr" | "rtl" }[] = [
  { code: "fr", label: "Français", dir: "ltr" },
  { code: "en", label: "English", dir: "ltr" },
  { code: "ar", label: "العربية", dir: "rtl" },
];

export function localeDir(l: Locale): "ltr" | "rtl" {
  return l === "ar" ? "rtl" : "ltr";
}

export function bcp47(l: Locale): string {
  return l === "fr" ? "fr-FR" : l === "en" ? "en-CA" : "ar";
}

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
};

const LocaleContext = createContext<Ctx | null>(null);
const KEY = "madee.locale";

function lookup(locale: Locale, key: string): string {
  const parts = key.split(".");
  const dig = (obj: any) => parts.reduce((o, p) => (o == null ? o : o[p]), obj);
  const v = dig(DICT[locale]);
  if (typeof v === "string") return v;
  const fr = dig(DICT.fr);
  return typeof fr === "string" ? fr : key;
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fr");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY) as Locale | null;
      if (saved && LOCALES.some((l) => l.code === saved)) setLocaleState(saved);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const dir = localeDir(locale);
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const t = useCallback((key: string) => lookup(locale, key), [locale]);

  return (
    <LocaleContext.Provider
      value={{ locale, setLocale, t, dir: localeDir(locale) }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): Ctx {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}

// Raccourci pour ne récupérer que la fonction de traduction.
export function useT() {
  return useLocale().t;
}

// Type d'une chaîne localisée (dans les données produit).
export type L = { fr: string; en: string; ar: string };

export function loc(value: L | string, locale: Locale): string {
  if (typeof value === "string") return value;
  return value[locale] || value.fr;
}
