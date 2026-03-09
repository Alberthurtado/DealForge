"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { ProductoForm } from "@/components/productos/producto-form";
import { UpgradeBanner } from "@/components/layout/upgrade-banner";

export default function NuevoProductoPage() {
  const router = useRouter();
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
        title="Nuevo Producto"
        breadcrumbs={[
          { label: "Productos", href: "/productos" },
          { label: "Nuevo" },
        ]}
      />
      {limitError && (
        <UpgradeBanner
          resource="productos"
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
        />
      </div>
    </div>
  );
}
