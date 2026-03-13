"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, AlertTriangle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export function CancelForm({
  alreadyCanceling,
  endDate,
}: {
  alreadyCanceling: boolean;
  endDate: string | null;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCancel() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/stripe/cancel", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Error al cancelar la suscripción");
        setLoading(false);
        return;
      }
      router.push("/configuracion");
      router.refresh();
    } catch {
      setError("Error de conexión");
      setLoading(false);
    }
  }

  if (alreadyCanceling) {
    return (
      <div className="pt-2 space-y-3">
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-800">
            Tu suscripción ya está programada para cancelarse
            {endDate ? ` el ${endDate}` : ""}.
          </p>
        </div>
        <Link
          href="/configuracion"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-border rounded-lg hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a Configuración
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-2 space-y-3">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
      <div className="flex items-center gap-3">
        <button
          onClick={handleCancel}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <AlertTriangle className="w-4 h-4" />
          )}
          {loading ? "Cancelando..." : "Confirmar Cancelación"}
        </button>
        <Link
          href="/configuracion"
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium border border-border rounded-lg hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </Link>
      </div>
    </div>
  );
}
