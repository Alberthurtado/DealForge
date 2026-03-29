"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { TEMPLATE_VARIABLES, DEFAULT_CONTRACT_TEMPLATE } from "@/lib/contract-template";
import { Loader2, Copy, Check } from "lucide-react";

export default function NuevaPlantillaPage() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [contenido, setContenido] = useState(DEFAULT_CONTRACT_TEMPLATE);
  const [esDefault, setEsDefault] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [copiedKey, setCopiedKey] = useState("");

  async function handleSave() {
    if (!nombre.trim() || !contenido.trim()) {
      setError("El nombre y el contenido son obligatorios");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/plantillas-contrato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, descripcion, contenido, esDefault }),
      });
      if (res.ok) {
        router.push("/contratos/plantillas");
      } else {
        const data = await res.json();
        setError(data.error || "Error al guardar");
      }
    } finally {
      setSaving(false);
    }
  }

  function copyVariable(key: string) {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(""), 1500);
  }

  return (
    <div>
      <PageHeader
        title="Nueva plantilla de contrato"
        description="Crea una plantilla HTML con variables dinámicas"
        breadcrumbs={[
          { label: "Contratos", href: "/contratos" },
          { label: "Plantillas", href: "/contratos/plantillas" },
          { label: "Nueva" },
        ]}
      />

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main form */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej: Contrato estándar de servicios"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <input
                  type="text"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  placeholder="Descripción opcional"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="esDefault"
                  checked={esDefault}
                  onChange={(e) => setEsDefault(e.target.checked)}
                  className="w-4 h-4 accent-primary"
                />
                <label htmlFor="esDefault" className="text-sm text-gray-700">
                  Usar como plantilla predeterminada
                </label>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contenido HTML <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-400 mb-3">
                HTML con variables entre dobles llaves, ej: {`{{cliente.nombre}}`}
              </p>
              <textarea
                value={contenido}
                onChange={(e) => setContenido(e.target.value)}
                rows={28}
                spellCheck={false}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs font-mono focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-y"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => router.push("/contratos/plantillas")}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg border border-gray-200"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 flex items-center gap-1.5"
              >
                {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                Guardar plantilla
              </button>
            </div>
          </div>

          {/* Variables sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Variables disponibles</h3>
              <p className="text-xs text-gray-400 mb-3">
                Haz clic para copiar al portapapeles
              </p>
              <div className="space-y-1 max-h-[600px] overflow-y-auto">
                {TEMPLATE_VARIABLES.map((v) => (
                  <button
                    key={v.key}
                    onClick={() => copyVariable(v.key)}
                    className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-gray-50 transition-colors text-left group"
                  >
                    <div>
                      <code className="text-xs font-mono text-primary">{v.key}</code>
                      <p className="text-xs text-gray-400">{v.label}</p>
                    </div>
                    {copiedKey === v.key ? (
                      <Check className="w-3.5 h-3.5 text-green-500 shrink-0" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
