// Internationalization routing config for next-intl.
//
// Locale rules:
// - "es" → default, country-locale es-ES (Spain), currency EUR
// - "en" → English, used for both en-GB (UK&I) and en-US (US).
//          Country/currency are resolved at runtime from Empresa.country
//          and Empresa.currencyCode, not the URL locale.
// - "de" → German, country-locale de-DE (Germany), currency EUR
//
// We use the LANGUAGE locale in the URL ("/en") but distinguish the
// COUNTRY at the data layer (Empresa.country). This avoids needing
// /en-gb and /en-us as separate URL prefixes.

export const locales = ["es", "en", "de"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

// Map URL locale → BCP 47 country-locale defaults (overridable per empresa).
export const localeCountryDefaults: Record<Locale, { lang: string; country: string; currency: string }> = {
  es: { lang: "es-ES", country: "ES", currency: "EUR" },
  en: { lang: "en-GB", country: "GB", currency: "GBP" }, // UK as default English variant
  de: { lang: "de-DE", country: "DE", currency: "EUR" },
};

export function isValidLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
