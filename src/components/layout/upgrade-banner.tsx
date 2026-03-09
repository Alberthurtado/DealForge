"use client";

import Link from "next/link";
import { ArrowUpCircle } from "lucide-react";

interface UpgradeBannerProps {
  resource: string;   // e.g. "clientes", "productos", "cotizaciones este mes"
  current: number;
  limit: number;
  plan: string;       // e.g. "Starter"
}

export function UpgradeBanner({ resource, current, limit, plan }: UpgradeBannerProps) {
  return (
    <div className="mx-6 mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
          <ArrowUpCircle className="w-5 h-5 text-amber-600" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-amber-900">
            Has alcanzado el limite de {resource}
          </p>
          <p className="text-xs text-amber-700 mt-0.5">
            Tu plan {plan} permite hasta <strong>{limit} {resource}</strong> y ya tienes <strong>{current}</strong>.
            Mejora tu plan para obtener mas capacidad.
          </p>
        </div>
      </div>
      <Link
        href="/configuracion"
        className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors"
      >
        <ArrowUpCircle className="w-4 h-4" />
        Mejorar plan
      </Link>
    </div>
  );
}
