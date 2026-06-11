"use client";

// Client hook that resolves the company's dashboard language, currency and
// number locale from /api/empresa. Used by client-side form pages that need
// to localize without prop-drilling from a server component.

import { useState, useEffect } from "react";
import { resolveDashboardLang, type DashboardLang } from "@/lib/dashboard-i18n";

export interface EmpresaLocale {
  lang: DashboardLang;
  currency: string;
  locale: string;
}

export function useEmpresaLocale(): EmpresaLocale {
  const [state, setState] = useState<EmpresaLocale>({
    lang: "es",
    currency: "EUR",
    locale: "es-ES",
  });

  useEffect(() => {
    fetch("/api/empresa")
      .then((r) => r.json())
      .then((d) => {
        setState({
          lang: resolveDashboardLang(d?.locale),
          currency: d?.currencyCode || "EUR",
          locale: d?.locale || "es-ES",
        });
      })
      .catch(() => {});
  }, []);

  return state;
}
