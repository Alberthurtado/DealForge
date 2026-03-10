"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Flame, Eye, EyeOff, Loader2, CheckCircle } from "lucide-react";
import { TurnstileWidget } from "@/components/ui/turnstile-widget";

export default function RegistroPage() {
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const handleToken = useCallback((token: string | null) => {
    setTurnstileToken(token);
  }, []);

  const passwordValid = password.length >= 8;
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!passwordValid) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    if (!passwordsMatch) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password, turnstileToken }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error al crear la cuenta");
        setLoading(false);
        return;
      }

      // Success — redirect to dashboard
      router.push("/panel");
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-[#3a9bb5]/10 flex items-center justify-center mx-auto mb-4">
            <Flame className="w-6 h-6 text-[#3a9bb5]" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Crea tu cuenta</h1>
          <p className="text-sm text-gray-500 mt-1">
            Empieza a cotizar con inteligencia artificial
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
              Nombre
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              autoFocus
              autoComplete="name"
              placeholder="Tu nombre"
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3a9bb5]/50 focus:border-[#3a9bb5] transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="tu@email.com"
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3a9bb5]/50 focus:border-[#3a9bb5] transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                placeholder="Mínimo 8 caracteres"
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3a9bb5]/50 focus:border-[#3a9bb5] transition-all pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {password.length > 0 && (
              <div className="flex items-center gap-1.5 mt-1.5">
                <div
                  className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${
                    passwordValid ? "bg-green-100" : "bg-gray-100"
                  }`}
                >
                  {passwordValid && (
                    <CheckCircle className="w-3 h-3 text-green-600" />
                  )}
                </div>
                <span
                  className={`text-xs ${
                    passwordValid ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  Mínimo 8 caracteres
                </span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirmar contraseña
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
              placeholder="Repite la contraseña"
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3a9bb5]/50 focus:border-[#3a9bb5] transition-all"
            />
            {confirmPassword.length > 0 && !passwordsMatch && (
              <p className="text-xs text-red-500 mt-1">
                Las contraseñas no coinciden
              </p>
            )}
          </div>

          <TurnstileWidget action="registro" onToken={handleToken} />

          <button
            type="submit"
            disabled={loading || !passwordValid || !passwordsMatch}
            className="w-full flex items-center justify-center gap-2 py-3 bg-[#3a9bb5] hover:bg-[#2d7d94] text-white font-semibold rounded-xl transition-colors disabled:opacity-50 shadow-lg shadow-[#3a9bb5]/25"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creando cuenta...
              </>
            ) : (
              <>
                <Flame className="w-4 h-4" />
                Crear Cuenta Gratis
              </>
            )}
          </button>
        </form>

        {/* Plan info */}
        <div className="mt-4 p-3 bg-[#3a9bb5]/5 border border-[#3a9bb5]/10 rounded-xl">
          <p className="text-xs text-[#3a9bb5] text-center font-medium">
            Plan Starter gratuito: 10 cotizaciones/mes, 5 clientes, Forge IA incluido
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            ¿Ya tienes cuenta?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#3a9bb5] hover:text-[#2d7d94] transition-colors"
            >
              Iniciar Sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
