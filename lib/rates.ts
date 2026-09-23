// Taux de conversion et logique de devise — module pur (utilisable
// côté serveur ET client). Prix de base en CENTIMES d'EURO.

export type CurrencyCode = "CAD" | "EUR" | "USD" | "XOF" | "GBP" | "XAF";

export const RATES: Record<CurrencyCode, number> = {
  EUR: 1,
  CAD: 1.48,
  USD: 1.08,
  GBP: 0.85,
  XOF: 655.957,
  XAF: 655.957,
};

export const ZERO_DEC = new Set<CurrencyCode>(["XOF", "XAF"]);

// Devises réellement encaissables par Stripe / PayPal.
const PAYMENT_SUPPORTED = new Set<CurrencyCode>(["CAD", "EUR", "USD", "GBP"]);

export function isCurrency(code: string): code is CurrencyCode {
  return code in RATES;
}

// Montant converti (nombre) dans la devise donnée.
export function convert(eurCents: number, code: CurrencyCode): number {
  const val = (eurCents / 100) * RATES[code];
  if (ZERO_DEC.has(code)) return Math.round(val / 5) * 5;
  return Math.round(val * 100) / 100;
}

// Devise d'encaissement : XOF/XAF (non pris en charge) retombent sur l'euro.
export function paymentCurrency(code: CurrencyCode): CurrencyCode {
  return PAYMENT_SUPPORTED.has(code) ? code : "EUR";
}
