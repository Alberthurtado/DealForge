// next-intl request config — loads translation messages per request.
// Used by middleware and server components to resolve the active locale.
//
// Not wired into the app router yet — the [locale] route migration
// happens in Phase 0.5. Until then, getRequestConfig returns the
// default (Spanish) so the app continues to behave as before.

import { getRequestConfig } from "next-intl/server";
import { defaultLocale, isValidLocale, type Locale } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale: Locale = requested && isValidLocale(requested) ? requested : defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
