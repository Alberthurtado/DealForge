// Country tax rules for cotización generation.
// Used to default the tax rate, decide reverse-charge applicability, and
// pick the right label ("IVA" / "VAT" / "MwSt" / "Sales Tax") per country.
//
// This file is the single source of truth for country-specific fiscal
// rules. Adding a new market: extend TAX_RULES + add country to TaxCountry.

export type TaxCountry = "ES" | "GB" | "IE" | "DE" | "US" | "OTHER";

export interface TaxRuleSet {
  standard: number;          // Standard VAT/sales-tax rate (%)
  reduced: number[];         // Reduced rates available (e.g. [10, 4] in Spain)
  hasRetencion?: boolean;    // Spain-specific IRPF withholding for self-employed
  retencionRate?: number;    // Default retención rate (%)
  reverseChargeB2B?: boolean; // EU reverse-charge for B2B intra-EU sales
  reverseChargeNote?: string; // Legal reference for the invoice footer
  useStripeTax?: boolean;    // Delegate calculation to Stripe Tax (US)
  symbol: string;            // Currency symbol typical for that country
  defaultCurrency: string;   // ISO 4217 currency code
}

export const TAX_RULES: Record<TaxCountry, TaxRuleSet> = {
  ES: {
    standard: 21,
    reduced: [10, 4],
    hasRetencion: true,
    retencionRate: 15,
    reverseChargeB2B: true,
    reverseChargeNote: "Operación exenta de IVA por inversión del sujeto pasivo (art. 84.1.2º LIVA)",
    symbol: "€",
    defaultCurrency: "EUR",
  },
  GB: {
    standard: 20,
    reduced: [5, 0],
    reverseChargeB2B: true,
    reverseChargeNote: "Reverse charge: customer to account for VAT to HMRC",
    symbol: "£",
    defaultCurrency: "GBP",
  },
  IE: {
    standard: 23,
    reduced: [13.5, 9, 0],
    reverseChargeB2B: true,
    reverseChargeNote: "Reverse charge applies — recipient accountable for VAT (Revenue Commissioners)",
    symbol: "€",
    defaultCurrency: "EUR",
  },
  DE: {
    standard: 19,
    reduced: [7],
    reverseChargeB2B: true,
    reverseChargeNote: "Steuerschuldnerschaft des Leistungsempfängers (§13b UStG)",
    symbol: "€",
    defaultCurrency: "EUR",
  },
  US: {
    standard: 0,     // No federal VAT; sales tax is per-state and computed by Stripe Tax
    reduced: [],
    useStripeTax: true,
    symbol: "$",
    defaultCurrency: "USD",
  },
  OTHER: {
    standard: 0,
    reduced: [],
    symbol: "",
    defaultCurrency: "EUR",
  },
};

// Returns the country key, narrowing unknown values to OTHER.
export function toTaxCountry(code: string | null | undefined): TaxCountry {
  if (!code) return "OTHER";
  const upper = code.toUpperCase();
  if (upper in TAX_RULES) return upper as TaxCountry;
  return "OTHER";
}

// Default tax rate to apply on a new cotización. When the customer is in
// another EU country with a valid VAT number, B2B reverse charge means 0%
// VAT is shown on the invoice (responsibility shifts to the buyer).
export function getDefaultTaxRate(
  empresaCountry: string,
  customerCountry?: string | null,
  customerHasVatId?: boolean
): number {
  const seller = toTaxCountry(empresaCountry);
  if (TAX_RULES[seller].useStripeTax) return 0; // US sellers — Stripe Tax handles it

  // B2B reverse charge: EU seller, EU customer in a different country with VAT ID
  if (
    customerCountry &&
    customerHasVatId &&
    TAX_RULES[seller].reverseChargeB2B &&
    isEU(seller) &&
    isEU(toTaxCountry(customerCountry)) &&
    toTaxCountry(customerCountry) !== seller
  ) {
    return 0;
  }

  return TAX_RULES[seller].standard;
}

// Decides if a transaction qualifies for B2B reverse charge.
export function shouldApplyReverseCharge(
  empresaCountry: string,
  customerCountry: string | null | undefined,
  customerVatId: string | null | undefined
): boolean {
  if (!customerCountry || !customerVatId) return false;
  const seller = toTaxCountry(empresaCountry);
  const buyer = toTaxCountry(customerCountry);
  return (
    TAX_RULES[seller].reverseChargeB2B === true &&
    isEU(seller) &&
    isEU(buyer) &&
    seller !== buyer
  );
}

// Localized tax label for invoice headers and UI strings.
export function getTaxLabel(empresaCountry: string, locale = "es-ES"): string {
  const country = toTaxCountry(empresaCountry);
  const lang = locale.split("-")[0];

  if (country === "US") return "Sales Tax";
  if (lang === "de") return "MwSt";
  if (lang === "en") return "VAT";
  if (lang === "es") {
    // Spanish UI shows "VAT" only when describing a UK/IE/DE invoice; for ES it's IVA.
    return country === "ES" ? "IVA" : "VAT";
  }
  return "VAT";
}

function isEU(country: TaxCountry): boolean {
  return country === "ES" || country === "IE" || country === "DE";
}
