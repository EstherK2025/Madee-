"use client";

import { useLocale, LOCALES, type Locale } from "@/lib/i18n";
import { useCurrency, CURRENCIES } from "@/lib/currency";
import type { CurrencyCode } from "@/lib/rates";

export default function Switchers({ className = "" }: { className?: string }) {
  const { locale, setLocale, t } = useLocale();
  const { code, setCode } = useCurrency();
  return (
    <div className={`switchers ${className}`.trim()}>
      <select
        className="switch"
        aria-label={t("switcher.language")}
        value={locale}
        onChange={(e) => setLocale(e.target.value as Locale)}
      >
        {LOCALES.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
      <select
        className="switch"
        aria-label={t("switcher.currency")}
        value={code}
        onChange={(e) => setCode(e.target.value as CurrencyCode)}
      >
        {CURRENCIES.map((c) => (
          <option key={c.code} value={c.code}>
            {c.label}
          </option>
        ))}
      </select>
    </div>
  );
}
