"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { ProductoForm } from "@/components/productos/producto-form";
import { UpgradeBanner } from "@/components/layout/upgrade-banner";
import { DASHBOARD_STRINGS } from "@/lib/dashboard-i18n";
import { useEmpresaLocale } from "@/lib/use-empresa-locale";

export default function NuevoProductoPage() {
  const router = useRouter();
  const { lang } = useEmpresaLocale();
  const t = DASHBOARD_STRINGS[lang].products;
  const [saving, setSaving] = useState(false);
  const [categorias, setCategorias] = useState<Array<{ id: string; nombre: string }>>([]);
  const [limitError, setLimitError] = useState<{
    message: string;
    current: number;
    limit: number;
  } | null>(null);

  useEffect(() => {
    fetch("/api/categorias")
      .then((r) => r.json())
      .then(setCategorias);
  }, []);

  async function handleSubmit(data: Record<string, unknown>) {
    setSaving(true);
    setLimitError(null);
    try {
      const res = await fetch("/api/productos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        router.push("/productos");
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
        title={t.newProduct}
        breadcrumbs={[
          { label: t.title, href: "/productos" },
          { label: t.newBreadcrumb },
        ]}
      />
      {limitError && (
        <UpgradeBanner
          resource={t.upgradeResource}
          current={limitError.current}
          limit={limitError.limit}
          plan="Starter"
        />
      )}
      <div className="p-6 max-w-2xl">
        <ProductoForm
          categorias={categorias}
          onCategoriasChange={setCategorias}
          onSubmit={handleSubmit}
          saving={saving}
          lang={lang}
        />
      </div>
    </div>
  );
}
