"use client";

import { useState } from "react";
import { PenTool, Check, Clock, Send, Link as LinkIcon, Loader2, X } from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { formatDate } from "@/lib/utils";

interface FirmaData {
  id: string;
  signerName: string;
  signerEmail: string;
  signedAt: string | null;
  token: string;
  createdAt: string;
}

interface Props {
  cotizacionId: string;
  firmas: FirmaData[];
  canRequest: boolean; // quote in ENVIADA/NEGOCIACION
  onUpdate: () => void;
}

export function FirmaPanel({ cotizacionId, firmas, canRequest, onUpdate }: Props) {
  const { success, error: showError } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [signerName, setSignerName] = useState("");
  const [signerEmail, setSignerEmail] = useState("");
  const [sending, setSending] = useState(false);

  async function handleRequest() {
    if (!signerName.trim() || !signerEmail.trim()) return;
    setSending(true);
    try {
      const res = await fetch(`/api/cotizaciones/${cotizacionId}/firma`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ signerName: signerName.trim(), signerEmail: signerEmail.trim() }),
      });
      if (res.ok) {
        success("Solicitud de firma enviada");
        setDialogOpen(false);
        setSignerName("");
        setSignerEmail("");
        onUpdate();
      } else {
        const data = await res.json().catch(() => null);
        showError(data?.error || "Error al solicitar firma");
      }
    } catch {
      showError("Error de conexión");
    } finally {
      setSending(false);
    }
  }

  function copySignLink(token: string) {
    const url = `${window.location.origin}/firmar/${token}`;
    navigator.clipboard.writeText(url).then(
      () => success("Enlace de firma copiado"),
      () => showError("No se pudo copiar")
    );
  }

  const pendientes = firmas.filter((f) => !f.signedAt);
  const firmadas = firmas.filter((f) => f.signedAt);

  return (
    <div className="bg-white rounded-xl border border-border p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <PenTool className="w-4 h-4 text-primary" />
          Firma Electrónica
        </h3>
        {canRequest && (
          <button
            onClick={() => setDialogOpen(true)}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Send className="w-3 h-3" />
            Solicitar
          </button>
        )}
      </div>

      {firmas.length === 0 ? (
        <p className="text-xs text-muted-foreground text-center py-2">
          No hay firmas solicitadas
        </p>
      ) : (
        <div className="space-y-2">
          {pendientes.map((f) => (
            <div key={f.id} className="p-3 bg-amber-50 rounded-lg border border-amber-100">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-amber-800 truncate">{f.signerName}</p>
                  <p className="text-[10px] text-amber-600">{f.signerEmail}</p>
                </div>
                <span className="text-[10px] font-medium text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full shrink-0">
                  Pendiente
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-2 ml-5">
                <button
                  onClick={() => copySignLink(f.token)}
                  className="inline-flex items-center gap-0.5 text-[10px] text-primary hover:text-primary/80 transition-colors"
                  title="Copiar enlace de firma"
                >
                  <LinkIcon className="w-3 h-3" />
                  Copiar enlace
                </button>
              </div>
            </div>
          ))}

          {firmadas.map((f) => (
            <div key={f.id} className="flex items-center gap-2 p-2 rounded-lg border bg-green-50 border-green-100">
              <Check className="w-3.5 h-3.5 text-green-600 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-green-800 truncate">{f.signerName}</p>
                <p className="text-[10px] text-green-600">
                  Firmada el {formatDate(f.signedAt!)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Request dialog */}
      {dialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm mx-4">
            <div className="flex items-center justify-between px-5 py-3 border-b border-border">
              <h4 className="text-sm font-semibold flex items-center gap-2">
                <PenTool className="w-4 h-4 text-primary" />
                Solicitar Firma
              </h4>
              <button onClick={() => setDialogOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="px-5 py-4 space-y-3">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  Nombre del firmante
                </label>
                <input
                  type="text"
                  value={signerName}
                  onChange={(e) => setSignerName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-white"
                  placeholder="Juan Pérez"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  Email del firmante
                </label>
                <input
                  type="email"
                  value={signerEmail}
                  onChange={(e) => setSignerEmail(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-white"
                  placeholder="juan@empresa.com"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 px-5 py-3 border-t border-border">
              <button
                onClick={() => setDialogOpen(false)}
                className="px-3 py-1.5 text-xs font-medium border border-border rounded-lg hover:bg-muted transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleRequest}
                disabled={sending || !signerName.trim() || !signerEmail.trim()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {sending ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
                {sending ? "Enviando..." : "Enviar solicitud"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
