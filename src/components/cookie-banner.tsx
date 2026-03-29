"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const COOKIE_KEY = "dealforge_cookie_consent";

type ConsentLevel = "all" | "essential" | null;

export function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [consent, setConsent] = useState<ConsentLevel>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(COOKIE_KEY);
    if (stored) {
      setConsent(stored as ConsentLevel);
      if (stored === "all") enableAnalytics();
    }
  }, []);

  function enableAnalytics() {
    // GA is loaded via next/script with afterInteractive,
    // but we can gate it with consent mode
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
      });
    }
  }

  function handleAcceptAll() {
    localStorage.setItem(COOKIE_KEY, "all");
    setConsent("all");
    enableAnalytics();
  }

  function handleEssentialOnly() {
    localStorage.setItem(COOKIE_KEY, "essential");
    setConsent("essential");
    // Disable GA tracking
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
      });
    }
  }

  // Don't render until mounted (avoids SSR mismatch)
  // Don't render if consent already given
  if (!mounted || consent !== null) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6">
      <div className="mx-auto max-w-3xl bg-white rounded-2xl shadow-2xl border border-gray-200 p-5 sm:p-6">
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">
              Utilizamos cookies
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Usamos cookies esenciales para el funcionamiento del sitio y cookies
              de análisis (Google Analytics) para mejorar tu experiencia. Puedes
              aceptar todas o solo las esenciales.{" "}
              <Link
                href="/privacidad"
                className="text-[#3a9bb5] hover:underline font-medium"
              >
                Política de privacidad
              </Link>
            </p>
          </div>

          {/* Details toggle */}
          {showDetails && (
            <div className="bg-gray-50 rounded-xl p-4 text-sm space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Cookies esenciales</p>
                  <p className="text-gray-500">
                    Necesarias para el funcionamiento básico: sesión de usuario,
                    preferencias de idioma y seguridad. No se pueden desactivar.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Cookies de análisis</p>
                  <p className="text-gray-500">
                    Google Analytics (G-97QZPF80KT): nos ayudan a entender cómo
                    usas el sitio para mejorar la experiencia. Datos anonimizados.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-sm text-gray-500 hover:text-gray-700 underline underline-offset-2 order-3 sm:order-1 sm:mr-auto"
            >
              {showDetails ? "Ocultar detalles" : "Ver detalles"}
            </button>
            <button
              onClick={handleEssentialOnly}
              className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors order-2"
            >
              Solo esenciales
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-5 py-2.5 text-sm font-medium text-white bg-[#3a9bb5] hover:bg-[#2d7d94] rounded-lg transition-colors order-1 sm:order-3"
            >
              Aceptar todas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
