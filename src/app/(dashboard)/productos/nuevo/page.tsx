"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { ProductoForm } from "@/components/productos/producto-form";

export default function NuevoProductoPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetch("/api/categorias")
      .then((r) => r.json())
      .then(setCategorias);
  }, []);

  async function handleSubmit(data: Record<string, unknown>) {
    setSaving(true);
    try {
      const res = await fetch("/api/productos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        router.push("/productos");
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
      <div className="p-6 max-w-2xl">
        <ProductoForm
          categorias={categorias}
          onSubmit={handleSubmit}
          saving={saving}
        />
      </div>
    </div>
  );
}
