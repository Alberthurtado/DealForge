"use client";

import { Suspense, useState, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Flame, Eye, EyeOff, Loader2 } from "lucide-react";
import { TurnstileWidget } from "@/components/ui/turnstile-widget";
import { AUTH_STRINGS, resolveAuthLang, withLang } from "@/lib/auth-i18n";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/panel";
  const lang = resolveAuthLang(searchParams.get("lang"));
  const t = AUTH_STRINGS[lang];

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

  // The page metadata title is static Spanish (set in the layout); localize the
  // browser tab title for English visitors (?lang=en). Page is noindex, so this
  // is purely cosmetic — no SEO impact.
  useEffect(() => {
    document.title = `${t.signIn} — DealForge`;
  }, [t.signIn]);

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
          router.push(
            withLang(`/verificar-email?email=${encodeURIComponent(data.email || email)}`, lang)
          );
          return;
        }
        setError(data.error || t.genericLoginError);
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
      setError(t.connError);
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
          <h1 className="text-2xl font-bold text-gray-900">{t.loginTitle}</h1>
          <p className="text-sm text-gray-500 mt-1">{t.loginSubtitle}</p>
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
              {t.email}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              autoComplete="email"
              placeholder="you@email.com"
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3a9bb5]/50 focus:border-[#3a9bb5] transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.password}
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder={t.loginPasswordPlaceholder}
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
              <span className="text-xs text-gray-500">{t.rememberMe}</span>
            </label>
            <Link
              href={withLang("/recuperar", lang)}
              className="text-xs text-[#3a9bb5] hover:text-[#2d7d94] font-medium transition-colors"
            >
              {t.forgotPassword}
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
                {t.signingIn}
              </>
            ) : (
              t.signIn
            )}
          </button>
        </form>

        {/* Privacy */}
        <p className="mt-4 text-[11px] text-gray-400 text-center leading-relaxed">
          {t.loginTermsPrefix}{" "}
          <Link href="/terminos" className="underline hover:text-gray-600">{t.terms}</Link>{" "}
          {t.and} <Link href="/privacidad" className="underline hover:text-gray-600">{t.privacy}</Link>.
        </p>

        {/* Footer */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            {t.noAccount}{" "}
            <Link
              href={withLang("/registro", lang)}
              className="font-semibold text-[#3a9bb5] hover:text-[#2d7d94] transition-colors"
            >
              {t.registerFree}
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
