// Multi-currency pricing config — single source of truth for the amounts
// shown on the pricing page and the plan selector. Round, market-specific
// numbers (not exact FX conversions) per the product decision.
//
// Stripe Price IDs live in src/lib/stripe.ts (PRICE_ID_MATRIX). This file
// is display-only; it never talks to Stripe.

export const CURRENCIES = ["EUR", "USD", "GBP"] as const;
export type Currency = (typeof CURRENCIES)[number];

export const CURRENCY_SYMBOL: Record<Currency, string> = {
  EUR: "€",
  USD: "$",
  GBP: "£",
};

// Where the symbol goes relative to the number ("29€" vs "$29").
export const CURRENCY_SYMBOL_POSITION: Record<Currency, "before" | "after"> = {
  EUR: "after",
  USD: "before",
  GBP: "before",
};

export const CURRENCY_LABEL: Record<Currency, string> = {
  EUR: "EUR €",
  USD: "USD $",
  GBP: "GBP £",
};

export type PaidPlan = "pro" | "business";
export type BillingInterval = "monthly" | "annual";

interface PlanPricePoint {
  monthly: number;     // per-month price
  annual: number;      // per-month price when billed annually
  annualTotal: number; // total charged once per year
  save: number;        // savings per year vs paying monthly
}

// Round, market-specific price points.
export const PRICING: Record<PaidPlan, Record<Currency, PlanPricePoint>> = {
  pro: {
    EUR: { monthly: 29, annual: 23, annualTotal: 276, save: 72 },
    USD: { monthly: 29, annual: 23, annualTotal: 276, save: 72 },
    GBP: { monthly: 25, annual: 19, annualTotal: 228, save: 72 },
  },
  business: {
    EUR: { monthly: 79, annual: 63, annualTotal: 756, save: 192 },
    USD: { monthly: 79, annual: 63, annualTotal: 756, save: 192 },
    GBP: { monthly: 69, annual: 55, annualTotal: 660, save: 168 },
  },
};

// Formats an integer amount with the currency symbol in the right place.
// formatMoney(29, "EUR") → "29€"  ·  formatMoney(29, "USD") → "$29"
export function formatMoney(amount: number, currency: Currency): string {
  const symbol = CURRENCY_SYMBOL[currency];
  return CURRENCY_SYMBOL_POSITION[currency] === "before"
    ? `${symbol}${amount}`
    : `${amount}${symbol}`;
}

// Countries in the eurozone (+ EUR-using microstates). Used to bill in EUR.
const EUROZONE = new Set([
  "AT", "BE", "HR", "CY", "EE", "FI", "FR", "DE", "GR", "IE", "IT", "LV",
  "LT", "LU", "MT", "NL", "PT", "SK", "SI", "ES", // 20 eurozone members
  "AD", "MC", "SM", "VA", "ME", "XK", // microstates / unilateral EUR users
]);

// Maps an ISO 3166-1 alpha-2 country to the currency we bill it in:
//   GBP for the UK, EUR for the eurozone, USD for everywhere else.
// When the country is unknown (no geo header) we fall back to EUR, our
// home currency, since DealForge is a Spain-based (.es) product.
export function countryToCurrency(country: string | null | undefined): Currency {
  const c = (country || "").toUpperCase();
  if (!c) return "EUR";
  if (c === "GB" || c === "UK") return "GBP";
  if (EUROZONE.has(c)) return "EUR";
  return "USD";
}

export function isValidCurrency(value: string): value is Currency {
  return (CURRENCIES as readonly string[]).includes(value);
}
