"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { ClienteForm } from "@/components/clientes/cliente-form";
import { DASHBOARD_STRINGS } from "@/lib/dashboard-i18n";
import { useEmpresaLocale } from "@/lib/use-empresa-locale";

export default function EditarClientePage() {
  const router = useRouter();
  const params = useParams();
  const { lang } = useEmpresaLocale();
  const t = DASHBOARD_STRINGS[lang].clients;
  const [cliente, setCliente] = useState<Record<string, unknown> | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/clientes/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setCliente(data);
        setLoading(false);
      });
  }, [params.id]);

  async function handleSubmit(data: Record<string, unknown>) {
    setSaving(true);
    try {
      const res = await fetch(`/api/clientes/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        router.push(`/clientes/${params.id}`);
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-muted rounded" />
          <div className="h-64 bg-muted rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={t.editClient}
        breadcrumbs={[
          { label: t.title, href: "/clientes" },
          {
            label: (cliente as { nombre?: string })?.nombre || "",
            href: `/clientes/${params.id}`,
          },
          { label: t.editBreadcrumb },
        ]}
      />
      <div className="p-6 max-w-3xl">
        <ClienteForm
          initialData={cliente as Record<string, unknown>}
          onSubmit={handleSubmit}
          saving={saving}
          lang={lang}
        />
      </div>
    </div>
  );
}
