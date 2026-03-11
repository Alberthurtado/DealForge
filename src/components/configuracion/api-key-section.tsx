"use client";

import { useState, useEffect } from "react";
import { Key, Copy, RefreshCw, Trash2, Check, Loader2, ArrowUpRight } from "lucide-react";

interface ApiKeyInfo {
  hasKey: boolean;
  prefix: string | null;
  createdAt: string | null;
}

export function ApiKeySection({ plan }: { plan: string }) {
  const [keyInfo, setKeyInfo] = useState<ApiKeyInfo | null>(null);
  const [newKey, setNewKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [revoking, setRevoking] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isPaid = plan !== "starter";

  useEffect(() => {
    if (!isPaid) {
      setLoading(false);
      return;
    }
    fetch("/api/empresa/api-key")
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setKeyInfo(data);
      })
      .catch(() => setError("Error al cargar información de API key"))
      .finally(() => setLoading(false));
  }, [isPaid]);

  const handleGenerate = async () => {
    const msg = keyInfo?.hasKey
      ? "Esto invalidará tu API key actual. Los sistemas que la usen dejarán de funcionar. ¿Continuar?"
      : "Se generará una nueva API key. Solo se mostrará una vez. ¿Continuar?";
    if (!confirm(msg)) return;

    setGenerating(true);
    setError(null);
    setNewKey(null);
    try {
      const res = await fetch("/api/empresa/api-key", { method: "POST" });
      const data = await res.json();
      if (data.error) {
        setError(data.message || data.error);
      } else {
        setNewKey(data.key);
        setKeyInfo({ hasKey: true, prefix: data.prefix, createdAt: data.createdAt });
      }
    } catch {
      setError("Error al generar API key");
    } finally {
      setGenerating(false);
    }
  };

  const handleRevoke = async () => {
    if (!confirm("Esto eliminará tu API key permanentemente. Los sistemas que la usen dejarán de funcionar. ¿Continuar?")) return;

    setRevoking(true);
    setError(null);
    try {
      const res = await fetch("/api/empresa/api-key", { method: "DELETE" });
      const data = await res.json();
      if (data.error) {
        setError(data.message || data.error);
      } else {
        setKeyInfo({ hasKey: false, prefix: null, createdAt: null });
        setNewKey(null);
      }
    } catch {
      setError("Error al revocar API key");
    } finally {
      setRevoking(false);
    }
  };

  const handleCopy = async () => {
    if (!newKey) return;
    try {
      await navigator.clipboard.writeText(newKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = newKey;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="mb-6 rounded-xl border border-border bg-white p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
          <Key className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-gray-900">API Key</h3>
          <p className="text-sm text-gray-500">Conecta sistemas externos con tu cuenta de DealForge</p>
        </div>
      </div>

      {!isPaid && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm text-amber-800 mb-2">
            Las API Keys están disponibles en los planes <strong>Pro</strong> y <strong>Business</strong>.
          </p>
          <a
            href="/configuracion#plan"
            className="inline-flex items-center gap-1 text-sm font-medium text-amber-700 hover:text-amber-900"
          >
            Mejorar plan <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      )}

      {isPaid && loading && (
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Loader2 className="h-4 w-4 animate-spin" />
          Cargando...
        </div>
      )}

      {isPaid && !loading && (
        <div className="space-y-4">
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Newly generated key — show only once */}
          {newKey && (
            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
              <p className="text-sm font-medium text-green-800 mb-2">
                Tu nueva API key (cópiala ahora, no se mostrará de nuevo):
              </p>
              <div className="flex items-center gap-2">
                <code className="flex-1 rounded bg-white px-3 py-2 text-sm font-mono text-gray-900 border border-green-200 break-all">
                  {newKey}
                </code>
                <button
                  onClick={handleCopy}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-green-300 bg-white text-green-700 hover:bg-green-50 transition-colors"
                  title="Copiar"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
              {copied && (
                <p className="text-xs text-green-600 mt-1">Copiada al portapapeles</p>
              )}
            </div>
          )}

          {/* Existing key info */}
          {keyInfo?.hasKey && !newKey && (
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">API Key activa</p>
                  <code className="text-sm font-mono text-gray-900">dfk_...{keyInfo.prefix}</code>
                </div>
                {keyInfo.createdAt && (
                  <p className="text-xs text-gray-500">
                    Creada: {new Date(keyInfo.createdAt).toLocaleDateString("es-ES")}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Usage example */}
          {keyInfo?.hasKey && (
            <details className="text-sm text-gray-600">
              <summary className="cursor-pointer font-medium hover:text-gray-900">
                Cómo usar tu API key
              </summary>
              <div className="mt-2 rounded-lg bg-gray-900 p-3 text-gray-100 font-mono text-xs overflow-x-auto">
                <span className="text-gray-400"># Ejemplo: listar clientes</span>
                <br />
                curl -H &quot;Authorization: Bearer dfk_...{keyInfo.prefix}&quot; \
                <br />
                &nbsp;&nbsp;{typeof window !== "undefined" ? window.location.origin : "https://dealforge.es"}/api/clientes
              </div>
            </details>
          )}

          {/* Action buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleGenerate}
              disabled={generating || revoking}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              {generating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : keyInfo?.hasKey ? (
                <RefreshCw className="h-4 w-4" />
              ) : (
                <Key className="h-4 w-4" />
              )}
              {keyInfo?.hasKey ? "Regenerar" : "Generar API Key"}
            </button>

            {keyInfo?.hasKey && (
              <button
                onClick={handleRevoke}
                disabled={generating || revoking}
                className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50 transition-colors"
              >
                {revoking ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                Revocar
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
