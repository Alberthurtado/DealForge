"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { ClienteForm } from "@/components/clientes/cliente-form";
import { UpgradeBanner } from "@/components/layout/upgrade-banner";

export default function NuevoClientePage() {
  const router = useRouter();
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
      const res = await fetch("/api/clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const cliente = await res.json();
        router.push(`/clientes/${cliente.id}`);
      } else if (res.status === 403) {
        const err = await res.json();
        if (err.error === "PLAN_LIMIT_REACHED") {
          setLimitError({ message: err.message, current: err.current, limit: err.limit });
        }
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <PageHeader
        title="Nuevo Cliente"
        breadcrumbs={[
          { label: "Clientes", href: "/clientes" },
          { label: "Nuevo" },
        ]}
      />
      {limitError && (
        <UpgradeBanner
          resource="clientes"
          current={limitError.current}
          limit={limitError.limit}
          plan="Starter"
        />
      )}
      <div className="p-6 max-w-3xl">
        <ClienteForm onSubmit={handleSubmit} saving={saving} />
      </div>
    </div>
  );
}
