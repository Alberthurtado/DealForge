"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { ProductoForm } from "@/components/productos/producto-form";

export default function EditarProductoPage() {
  const router = useRouter();
  const params = useParams();
  const [producto, setProducto] = useState<Record<string, unknown> | null>(null);
  const [categorias, setCategorias] = useState([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`/api/productos/${params.id}`).then((r) => r.json()),
      fetch("/api/categorias").then((r) => r.json()),
    ]).then(([prod, cats]) => {
      setProducto(prod);
      setCategorias(cats);
      setLoading(false);
    });
  }, [params.id]);

  async function handleSubmit(data: Record<string, unknown>) {
    setSaving(true);
    try {
      const res = await fetch(`/api/productos/${params.id}`, {
        method: "PUT",
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

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse h-64 bg-muted rounded-xl" />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Editar Producto"
        breadcrumbs={[
          { label: "Productos", href: "/productos" },
          { label: "Editar" },
        ]}
      />
      <div className="p-6 max-w-2xl">
        <ProductoForm
          initialData={producto as Record<string, unknown>}
          categorias={categorias}
          onSubmit={handleSubmit}
          saving={saving}
        />
      </div>
    </div>
  );
}
