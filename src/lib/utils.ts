import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Formats a monetary amount in the given currency, with locale-appropriate
// thousand/decimal separators and currency symbol placement.
// Defaults preserve the previous Spanish behavior so existing callers
// don't need to be migrated all at once.
export function formatCurrency(
  amount: number,
  currency = "EUR",
  locale = "es-ES"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
}

// Formats a date with abbreviated month per locale.
// Default es-ES → "12 abr 2026", en-GB → "12 Apr 2026", de-DE → "12. Apr. 2026"
export function formatDate(date: Date | string, locale = "es-ES"): string {
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

export async function generateQuoteNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 9999)
    .toString()
    .padStart(4, "0");
  return `COT-${year}-${random}`;
}
