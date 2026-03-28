"use client";

import { RefreshCw } from "lucide-react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">⚠️</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Error al cargar
        </h2>
        <p className="text-gray-500 mb-6 text-sm">
          Ha ocurrido un error al cargar esta sección. Inténtalo de nuevo.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#3a9bb5] text-white font-medium rounded-lg hover:bg-[#2d7d94] transition-colors text-sm"
        >
          <RefreshCw className="w-4 h-4" />
          Reintentar
        </button>
        {error.digest && (
          <p className="mt-4 text-xs text-gray-400">
            Código: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
