"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Suspense } from "react";

function VerificarErrorContent() {
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");

  const isExpired = reason === "expired";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {isExpired ? "Enlace expirado" : "Enlace no valido"}
          </h1>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            {isExpired
              ? "El enlace de verificacion ha expirado (24 horas). Inicia sesion y te enviaremos uno nuevo."
              : "El enlace de verificacion no es valido o ya ha sido utilizado."}
          </p>

          <div className="flex flex-col gap-3">
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 bg-[#3a9bb5] text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-[#2d7d94] transition-colors"
            >
              Ir al login
            </Link>
            <Link
              href="/registro"
              className="inline-flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Crear nueva cuenta
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VerificarErrorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <VerificarErrorContent />
    </Suspense>
  );
}
