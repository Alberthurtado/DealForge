"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Flame, Loader2, Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { TurnstileWidget } from "@/components/ui/turnstile-widget";

export default function RecuperarPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const handleToken = useCallback((token: string | null) => {
    setTurnstileToken(token);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/recuperar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, turnstileToken }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error al enviar el email");
        setLoading(false);
        return;
      }

      setSent(true);
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="w-full max-w-md animate-fade-in">
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8">
          <div className="text-center">
            <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Revisa tu email
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              Si existe una cuenta con <strong>{email}</strong>, recibirás un
              enlace para restablecer tu contraseña. Revisa también tu carpeta
              de spam.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#3a9bb5] hover:text-[#2d7d94] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-[#3a9bb5]/10 flex items-center justify-center mx-auto mb-4">
            <Flame className="w-6 h-6 text-[#3a9bb5]" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Recuperar contraseña
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Introduce tu email y te enviaremos un enlace para restablecer tu
            contraseña
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
                autoComplete="email"
                placeholder="tu@email.com"
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3a9bb5]/50 focus:border-[#3a9bb5] transition-all"
              />
            </div>
          </div>

          <TurnstileWidget action="recuperar" onToken={handleToken} />

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 bg-[#3a9bb5] hover:bg-[#2d7d94] text-white font-semibold rounded-xl transition-colors disabled:opacity-50 shadow-lg shadow-[#3a9bb5]/25"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Mail className="w-4 h-4" />
                Enviar enlace
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3a9bb5] hover:text-[#2d7d94] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Volver al login
          </Link>
        </div>
      </div>
    </div>
  );
}
