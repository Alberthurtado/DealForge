"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { CotizacionWizard } from "@/components/cotizaciones/cotizacion-wizard";

function NuevaCotizacionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedClienteId = searchParams.get("clienteId") || "";
  const [saving, setSaving] = useState(false);

  async function handleSubmit(data: Record<string, unknown>) {
    setSaving(true);
    try {
      const res = await fetch("/api/cotizaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const cot = await res.json();
        router.push(`/cotizaciones/${cot.id}`);
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
