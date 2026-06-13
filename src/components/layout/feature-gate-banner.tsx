"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import { useEmpresaLocale } from "@/lib/use-empresa-locale";

interface FeatureGateBannerProps {
  feature: string;       // e.g. "Reglas comerciales", "Envío de emails"
  requiredPlan: string;  // e.g. "Pro", "Business"
  description?: string;
}

const STR = {
  es: {
    fallback: (plan: string) => `Esta funcionalidad está disponible a partir del plan ${plan}. Mejora tu plan para desbloquearla.`,
    cta: (plan: string) => `Ver plan ${plan}`,
  },
  en: {
    fallback: (plan: string) => `This feature is available from the ${plan} plan and up. Upgrade your plan to unlock it.`,
    cta: (plan: string) => `View ${plan} plan`,
  },
};

export function FeatureGateBanner({ feature, requiredPlan, description }: FeatureGateBannerProps) {
  const { lang } = useEmpresaLocale();
  const t = STR[lang];
  return (
    <div className="mx-6 mt-6 rounded-xl border border-purple-200 bg-purple-50 p-6 text-center">
      <div className="mx-auto w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
        <Lock className="w-6 h-6 text-purple-600" />
      </div>
      <h3 className="text-lg font-semibold text-purple-900 mb-1">
        {feature}
      </h3>
      <p className="text-sm text-purple-700 mb-4 max-w-md mx-auto">
        {description || t.fallback(requiredPlan)}
      </p>
      <Link
        href="/configuracion"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
      >
        {t.cta(requiredPlan)}
      </Link>
    </div>
  );
}
