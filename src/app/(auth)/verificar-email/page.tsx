"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Mail, ArrowRight, RefreshCw } from "lucide-react";
import { useState, Suspense } from "react";

function VerificarEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "tu email";
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);

  async function handleResend() {
    setResending(true);
    try {
      const res = await fetch("/api/auth/reenviar-verificacion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) setResent(true);
    } finally {
      setResending(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          <div className="w-16 h-16 rounded-2xl bg-[#3a9bb5]/10 flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-[#3a9bb5]" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Revisa tu bandeja de entrada
          </h1>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            Hemos enviado un enlace de verificacion a{" "}
            <strong className="text-gray-700">{email}</strong>.
            <br />
            Haz clic en el enlace para activar tu cuenta.
          </p>

          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
            <p className="text-xs text-gray-500 leading-relaxed">
              <strong className="text-gray-700">¿No ves el email?</strong> Revisa la carpeta de spam o correo no deseado. El email viene de <strong>soporte@dealforge.es</strong>.
            </p>
          </div>

          {!resent ? (
            <button
              onClick={handleResend}
              disabled={resending}
              className="inline-flex items-center gap-2 text-sm text-[#3a9bb5] font-medium hover:text-[#2d7d94] transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${resending ? "animate-spin" : ""}`} />
              {resending ? "Reenviando..." : "Reenviar email de verificacion"}
            </button>
          ) : (
            <p className="text-sm text-green-600 font-medium">
              Email reenviado correctamente
            </p>
          )}

          <hr className="my-6 border-gray-100" />

          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Ya he verificado, ir al login <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function VerificarEmailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Mail className="w-8 h-8 text-gray-300 animate-pulse" /></div>}>
      <VerificarEmailContent />
    </Suspense>
  );
}
