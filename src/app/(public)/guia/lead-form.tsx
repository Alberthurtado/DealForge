"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, Download, CheckCircle } from "lucide-react";

function getUtmParams(searchParams: URLSearchParams) {
  return {
    utmSource: searchParams.get("utm_source") || undefined,
    utmMedium: searchParams.get("utm_medium") || undefined,
    utmCampaign: searchParams.get("utm_campaign") || undefined,
    utmContent: searchParams.get("utm_content") || undefined,
  };
}

export function LeadForm() {
  const searchParams = useSearchParams();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [utm, setUtm] = useState<ReturnType<typeof getUtmParams>>({});

  useEffect(() => {
    setUtm(getUtmParams(searchParams));
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          email,
          empresa: empresa || undefined,
          origen: utm.utmSource || "guia",
          recurso: "guia-5-errores-cotizaciones",
          ...utm,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al registrar");
      }

      setSuccess(true);

      // Auto-download the guide
      window.open("/api/leads/guia-pdf", "_blank");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al enviar");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          ¡Tu guía está lista!
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          La descarga debería comenzar automáticamente. Si no, haz clic en el botón.
        </p>
        <a
          href="/api/leads/guia-pdf"
          target="_blank"
          className="inline-flex items-center gap-2 bg-[#3a9bb5] hover:bg-[#2d7d94] text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors"
        >
          <Download className="w-4 h-4" />
          Descargar Guía PDF
        </a>
        <p className="text-xs text-gray-400 mt-4">
          También recibirás consejos por email en los próximos días.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
      <div className="text-center mb-6">
        <div className="w-14 h-14 rounded-2xl bg-[#3a9bb5]/10 flex items-center justify-center mx-auto mb-3">
          <Download className="w-7 h-7 text-[#3a9bb5]" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">
          Descarga la guía gratis
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Acceso inmediato. Sin spam.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre *
          </label>
          <input
            id="nombre"
            type="text"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Tu nombre"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3a9bb5]/20 focus:border-[#3a9bb5] transition-colors"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email profesional *
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@empresa.com"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3a9bb5]/20 focus:border-[#3a9bb5] transition-colors"
          />
        </div>

        <div>
          <label htmlFor="empresa" className="block text-sm font-medium text-gray-700 mb-1">
            Empresa <span className="text-gray-400">(opcional)</span>
          </label>
          <input
            id="empresa"
            type="text"
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
            placeholder="Nombre de tu empresa"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3a9bb5]/20 focus:border-[#3a9bb5] transition-colors"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 bg-[#3a9bb5] hover:bg-[#2d7d94] text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors disabled:opacity-50 shadow-lg shadow-[#3a9bb5]/25"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          {loading ? "Enviando..." : "Descargar Guía Gratis"}
        </button>

        <p className="text-[11px] text-gray-400 text-center leading-relaxed">
          Al descargar aceptas recibir emails con consejos de ventas.
          Puedes darte de baja en cualquier momento.{" "}
          <a href="/privacidad" className="underline hover:text-gray-600">Política de privacidad</a>.
        </p>
      </form>
    </div>
  );
}
