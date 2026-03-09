"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { CotizacionWizard } from "@/components/cotizaciones/cotizacion-wizard";
import { UpgradeBanner } from "@/components/layout/upgrade-banner";

function NuevaCotizacionContent() {
  const router = useRouter();
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
        title="Nueva Cotizacion"
        breadcrumbs={[
          { label: "Cotizaciones", href: "/cotizaciones" },
          { label: "Nueva" },
        ]}
      />
      {limitError && (
        <UpgradeBanner
          resource="cotizaciones este mes"
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
