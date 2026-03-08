"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { ClienteForm } from "@/components/clientes/cliente-form";

export default function NuevoClientePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  async function handleSubmit(data: Record<string, unknown>) {
    setSaving(true);
    try {
      const res = await fetch("/api/clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const cliente = await res.json();
        router.push(`/clientes/${cliente.id}`);
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
      <div className="p-6 max-w-3xl">
        <ClienteForm onSubmit={handleSubmit} saving={saving} />
      </div>
    </div>
  );
}
