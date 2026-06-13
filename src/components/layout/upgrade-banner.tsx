"use client";

import Link from "next/link";
import { ArrowUpCircle } from "lucide-react";
import { useEmpresaLocale } from "@/lib/use-empresa-locale";

interface UpgradeBannerProps {
  resource: string;   // e.g. "clientes", "productos", "cotizaciones este mes"
  current: number;
  limit: number;
  plan: string;       // e.g. "Starter"
}

const STR = {
  es: {
    title: (resource: string) => `Has alcanzado el límite de ${resource}`,
    detail: (plan: string, limit: number, resource: string, current: number) =>
      `Tu plan ${plan} permite hasta ${limit} ${resource} y ya tienes ${current}. Mejora tu plan para obtener más capacidad.`,
    cta: "Mejorar plan",
  },
  en: {
    title: (resource: string) => `You've reached your ${resource} limit`,
    detail: (plan: string, limit: number, resource: string, current: number) =>
      `Your ${plan} plan allows up to ${limit} ${resource} and you already have ${current}. Upgrade for more capacity.`,
    cta: "Upgrade plan",
  },
};

export function UpgradeBanner({ resource, current, limit, plan }: UpgradeBannerProps) {
  const { lang } = useEmpresaLocale();
  const t = STR[lang];
  return (
    <div className="mx-6 mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
          <ArrowUpCircle className="w-5 h-5 text-amber-600" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-amber-900">
            {t.title(resource)}
          </p>
          <p className="text-xs text-amber-700 mt-0.5">
            {t.detail(plan, limit, resource, current)}
          </p>
        </div>
      </div>
      <Link
        href="/configuracion"
        className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors"
      >
        <ArrowUpCircle className="w-4 h-4" />
        {t.cta}
      </Link>
    </div>
  );
}
