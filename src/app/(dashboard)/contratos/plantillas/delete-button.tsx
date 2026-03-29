"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";

export function DeletePlantillaButton({
  id,
  nombre,
  esDefault,
}: {
  id: string;
  nombre: string;
  esDefault: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm(`¿Eliminar la plantilla "${nombre}"?`)) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/plantillas-contrato/${id}`, { method: "DELETE" });
      if (res.ok) {
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || "Error al eliminar");
      }
    } finally {
      setLoading(false);
    }
  }

  if (esDefault) return null;

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-red-500 border border-red-100 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50 ml-auto"
    >
      {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
      Eliminar
    </button>
  );
}
