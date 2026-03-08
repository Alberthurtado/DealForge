"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, Flame, Loader2 } from "lucide-react";
import Link from "next/link";

export default function CheckoutExitoPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/panel");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="w-full max-w-md animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8 text-center">
        {/* Success icon */}
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Pago completado
        </h1>
        <p className="text-gray-600 mb-6">
          Tu plan ha sido actualizado. Ahora tienes acceso a todas las funciones
          de tu nuevo plan, incluyendo <strong>Forge IA con Sonnet</strong>.
        </p>

        {/* Redirect countdown */}
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-6">
          <Loader2 className="w-4 h-4 animate-spin" />
          Redirigiendo al panel en {countdown}s...
        </div>

        <Link
          href="/panel"
          className="inline-flex items-center justify-center gap-2 w-full py-3 bg-[#3a9bb5] hover:bg-[#2d7d94] text-white font-semibold rounded-xl transition-colors shadow-lg shadow-[#3a9bb5]/25"
        >
          <Flame className="w-4 h-4" />
          Ir al Panel
        </Link>
      </div>
    </div>
  );
}
