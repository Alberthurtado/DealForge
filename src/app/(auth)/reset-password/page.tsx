"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Flame,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle,
  ArrowLeft,
  AlertTriangle,
} from "lucide-react";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const passwordValid = password.length >= 8;
  const passwordsMatch =
    password === confirmPassword && confirmPassword.length > 0;

  if (!token) {
    return (
      <div className="w-full max-w-md animate-fade-in">
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8">
          <div className="text-center">
            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Enlace invalido
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              Este enlace no es valido. Solicita un nuevo enlace de
              recuperacion.
            </p>
            <Link
              href="/recuperar"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#3a9bb5] hover:text-[#2d7d94] transition-colors"
            >
              Solicitar nuevo enlace
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="w-full max-w-md animate-fade-in">
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8">
          <div className="text-center">
            <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Contrasena actualizada
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              Tu contrasena ha sido actualizada correctamente. Ya puedes iniciar
              sesion con tu nueva contrasena.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 w-full py-3 bg-[#3a9bb5] hover:bg-[#2d7d94] text-white font-semibold rounded-xl transition-colors shadow-lg shadow-[#3a9bb5]/25"
            >
              Iniciar Sesion
            </Link>
          </div>
        </div>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!passwordValid) {
      setError("La contrasena debe tener al menos 8 caracteres");
      return;
    }

    if (!passwordsMatch) {
      setError("Las contrasenas no coinciden");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error al restablecer la contrasena");
        setLoading(false);
        return;
      }

      setSuccess(true);
    } catch {
      setError("Error de conexion. Intenta de nuevo.");
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
          <h1 className="text-2xl font-bold text-gray-900">
            Nueva contrasena
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Introduce tu nueva contrasena
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
              Nueva contrasena
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
                autoComplete="new-password"
                placeholder="Minimo 8 caracteres"
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
                  Minimo 8 caracteres
                </span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirmar contrasena
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
              placeholder="Repite la contrasena"
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3a9bb5]/50 focus:border-[#3a9bb5] transition-all"
            />
            {confirmPassword.length > 0 && !passwordsMatch && (
              <p className="text-xs text-red-500 mt-1">
                Las contrasenas no coinciden
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !passwordValid || !passwordsMatch}
            className="w-full flex items-center justify-center gap-2 py-3 bg-[#3a9bb5] hover:bg-[#2d7d94] text-white font-semibold rounded-xl transition-colors disabled:opacity-50 shadow-lg shadow-[#3a9bb5]/25"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Actualizando...
              </>
            ) : (
              "Restablecer contrasena"
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

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-md animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8 text-center">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#3a9bb5]" />
          </div>
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
