"use client";

import { Suspense, useState, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Flame, Eye, EyeOff, Loader2 } from "lucide-react";
import { TurnstileWidget } from "@/components/ui/turnstile-widget";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/panel";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  // Load saved email on mount
  useEffect(() => {
    const saved = localStorage.getItem("df_remember_email");
    if (saved) {
      setEmail(saved);
      setRememberMe(true);
    }
  }, []);

  const handleToken = useCallback((token: string | null) => {
    setTurnstileToken(token);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          turnstileToken,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // If email not verified, redirect to verification page
        if (data.needsVerification) {
          router.push(`/verificar-email?email=${encodeURIComponent(data.email || email)}`);
          return;
        }
        setError(data.error || "Error al iniciar sesión");
        setLoading(false);
        return;
      }

      // Save or clear remembered email
      if (rememberMe) {
        localStorage.setItem("df_remember_email", email);
      } else {
        localStorage.removeItem("df_remember_email");
      }

      // Success — redirect
      router.push(redirect);
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
          <h1 className="text-2xl font-bold text-gray-900">Bienvenido</h1>
          <p className="text-sm text-gray-500 mt-1">
            Inicia sesión para acceder a tu cuenta
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
                autoComplete="current-password"
                placeholder="Tu contraseña"
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
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 rounded border-gray-300 text-[#3a9bb5] focus:ring-[#3a9bb5]/50"
              />
              <span className="text-xs text-gray-500">Recordarme</span>
            </label>
            <Link
              href="/recuperar"
              className="text-xs text-[#3a9bb5] hover:text-[#2d7d94] font-medium transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <TurnstileWidget action="login" onToken={handleToken} />

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 bg-[#3a9bb5] hover:bg-[#2d7d94] text-white font-semibold rounded-xl transition-colors disabled:opacity-50 shadow-lg shadow-[#3a9bb5]/25"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Iniciando sesión...
              </>
            ) : (
              "Iniciar Sesión"
            )}
          </button>
        </form>

        {/* Privacy */}
        <p className="mt-4 text-[11px] text-gray-400 text-center leading-relaxed">
          Al iniciar sesión aceptas nuestros{" "}
          <Link href="/terminos" className="underline hover:text-gray-600">Términos de servicio</Link>{" "}
          y <Link href="/privacidad" className="underline hover:text-gray-600">Política de privacidad</Link>.
        </p>

        {/* Footer */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            ¿No tienes cuenta?{" "}
            <Link
              href="/registro"
              className="font-semibold text-[#3a9bb5] hover:text-[#2d7d94] transition-colors"
            >
              Regístrate gratis
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="w-full max-w-md animate-fade-in">
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8 text-center">
          <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#3a9bb5]" />
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
