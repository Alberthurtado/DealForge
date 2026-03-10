"use client";

import Link from "next/link";
import { XCircle, ArrowLeft } from "lucide-react";

export default function CheckoutCanceladoPage() {
  return (
    <div className="w-full max-w-md animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8 text-center">
        {/* Cancel icon */}
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-8 h-8 text-gray-400" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Pago cancelado
        </h1>
        <p className="text-gray-600 mb-6">
          No se ha realizado ningún cobro. Puedes volver a intentarlo cuando quieras
          desde la sección de Configuración.
        </p>

        <Link
          href="/configuracion"
          className="inline-flex items-center justify-center gap-2 w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a Configuración
        </Link>
      </div>
    </div>
  );
}
