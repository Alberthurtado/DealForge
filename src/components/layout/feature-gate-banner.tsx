"use client";

import Link from "next/link";
import { Lock } from "lucide-react";

interface FeatureGateBannerProps {
  feature: string;       // e.g. "Reglas comerciales", "Envio de emails"
  requiredPlan: string;  // e.g. "Pro", "Business"
  description?: string;
}

export function FeatureGateBanner({ feature, requiredPlan, description }: FeatureGateBannerProps) {
  return (
    <div className="mx-6 mt-6 rounded-xl border border-purple-200 bg-purple-50 p-6 text-center">
      <div className="mx-auto w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
        <Lock className="w-6 h-6 text-purple-600" />
      </div>
      <h3 className="text-lg font-semibold text-purple-900 mb-1">
        {feature}
      </h3>
      <p className="text-sm text-purple-700 mb-4 max-w-md mx-auto">
        {description || `Esta funcionalidad esta disponible a partir del plan ${requiredPlan}. Mejora tu plan para desbloquearla.`}
      </p>
      <Link
        href="/configuracion"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
      >
        Ver plan {requiredPlan}
      </Link>
    </div>
  );
}
