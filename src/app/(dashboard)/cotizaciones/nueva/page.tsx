"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { CotizacionWizard } from "@/components/cotizaciones/cotizacion-wizard";
import { UpgradeBanner } from "@/components/layout/upgrade-banner";
import { useEmpresaLocale } from "@/lib/use-empresa-locale";

const STR = {
  es: { title: "Nueva Cotización", crumbList: "Cotizaciones", crumbNew: "Nueva", resource: "cotizaciones este mes" },
  en: { title: "New Quote", crumbList: "Quotes", crumbNew: "New", resource: "quotes this month" },
};

function NuevaCotizacionContent() {
  const router = useRouter();
  const { lang } = useEmpresaLocale();
  const t = STR[lang];
  const searchParams = useSearchParams();
  const preselectedClienteId = searchParams.get("clienteId") || "";
  const [saving, setSaving] = useState(false);
  const [limitError, setLimitError] = useState<{
    message: string;
    current: number;
    limit: number;
  } | null>(null);

  async function handleSubmit(data: Record<string, unknown>) {
    setSaving(true);
    setLimitError(null);
    try {
      const res = await fetch("/api/cotizaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const cot = await res.json();
        router.push(`/cotizaciones/${cot.id}`);
      } else if (res.status === 403) {
        const err = await res.json();
        if (err.error === "PLAN_LIMIT_REACHED") {
          setLimitError({ message: err.message, current: err.current, limit: err.limit });
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <PageHeader
        title={t.title}
        breadcrumbs={[
          { label: t.crumbList, href: "/cotizaciones" },
          { label: t.crumbNew },
        ]}
      />
      {limitError && (
        <UpgradeBanner
          resource={t.resource}
          current={limitError.current}
          limit={limitError.limit}
          plan="Starter"
        />
      )}
      <div className="p-6">
        <CotizacionWizard
          preselectedClienteId={preselectedClienteId}
          onSubmit={handleSubmit}
          saving={saving}
        />
      </div>
    </div>
  );
}

export default function NuevaCotizacionPage() {
  return (
    <Suspense
      fallback={
        <div className="p-6">
          <div className="animate-pulse h-64 bg-muted rounded-xl" />
        </div>
      }
    >
      <NuevaCotizacionContent />
    </Suspense>
  );
}
