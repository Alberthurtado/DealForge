"use client";

import Link from "next/link";
import { RefreshCw, Home } from "lucide-react";

export default function PublicError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">⚠️</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Algo ha salido mal
        </h1>
        <p className="text-gray-500 mb-8">
          Ha ocurrido un error inesperado. Puedes intentar recargar la página o
          volver al inicio.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#3a9bb5] text-white font-medium rounded-lg hover:bg-[#2d7d94] transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Reintentar
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Home className="w-4 h-4" />
            Inicio
          </Link>
        </div>
        {error.digest && (
          <p className="mt-6 text-xs text-gray-400">
            Código de error: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
