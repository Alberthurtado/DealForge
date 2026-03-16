"use client";

import { useState, useEffect } from "react";
import { PenTool, Check, Clock, Send, Link as LinkIcon, Loader2, X, ChevronDown, ChevronUp } from "lucide-react";
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

interface ContactData {
  nombre: string;
  email: string | null;
}

interface Props {
  cotizacionId: string;
  firmas: FirmaData[];
  canRequest: boolean;
  onUpdate: () => void;
  defaultContact?: ContactData | null;
}

export function FirmaPanel({ cotizacionId, firmas, canRequest, onUpdate, defaultContact }: Props) {
  const { success, error: showError } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [signerName, setSignerName] = useState("");
  const [signerEmail, setSignerEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [showCustomContact, setShowCustomContact] = useState(false);

  // Pre-fill from default contact when opening dialog
  useEffect(() => {
    if (dialogOpen && defaultContact) {
      setSignerName(defaultContact.nombre || "");
      setSignerEmail(defaultContact.email || "");
      setShowCustomContact(false);
    }
  }, [dialogOpen, defaultContact]);

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
  const hasSigned = firmadas.length > 0;

  return (
    <div className={`rounded-xl border-2 overflow-hidden ${hasSigned ? "border-green-200 bg-green-50/30" : "border-primary/30 bg-gradient-to-b from-primary/5 to-white"}`}>
      {/* Header */}
      <div className={`px-5 py-4 ${hasSigned ? "bg-green-50" : "bg-primary/5"}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${hasSigned ? "bg-green-100" : "bg-primary/10"}`}>
              <PenTool className={`w-4 h-4 ${hasSigned ? "text-green-600" : "text-primary"}`} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Firma Electrónica</h3>
              <p className="text-[11px] text-muted-foreground">
                {hasSigned ? "Documento firmado" : "Solicita la firma digital del cliente"}
              </p>
            </div>
          </div>
          {canRequest && !hasSigned && (
            <button
              onClick={() => setDialogOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              Solicitar firma
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-5 py-4">
        {firmas.length === 0 ? (
          <div className="text-center py-3">
            <p className="text-xs text-muted-foreground mb-1">
              Envía una solicitud de firma al cliente para cerrar el acuerdo.
            </p>
            <p className="text-[11px] text-muted-foreground/70">
              El cliente recibirá un enlace seguro para firmar digitalmente. La cotización se marcará como Ganada automáticamente.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {firmadas.map((f) => (
              <div key={f.id} className="flex items-center gap-2.5 p-3 rounded-lg border bg-green-50 border-green-200">
                <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-green-800 truncate">{f.signerName}</p>
                  <p className="text-[11px] text-green-600">
                    Firmada el {formatDate(f.signedAt!)}
                  </p>
                </div>
              </div>
            ))}

            {pendientes.map((f) => (
              <div key={f.id} className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-amber-800 truncate">{f.signerName}</p>
                    <p className="text-[10px] text-amber-600">{f.signerEmail}</p>
                  </div>
                  <span className="text-[10px] font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full shrink-0">
                    Pendiente
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-2 ml-9">
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
          </div>
        )}
      </div>

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
              {/* Pre-filled contact info */}
              {defaultContact && !showCustomContact ? (
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                  <p className="text-[11px] text-muted-foreground mb-1.5 uppercase tracking-wider font-medium">Firmante</p>
                  <p className="text-sm font-medium text-foreground">{signerName}</p>
                  <p className="text-xs text-muted-foreground">{signerEmail}</p>
                  <button
                    type="button"
                    onClick={() => setShowCustomContact(true)}
                    className="inline-flex items-center gap-1 mt-2 text-[11px] text-primary hover:text-primary/80 font-medium"
                  >
                    <ChevronDown className="w-3 h-3" />
                    Cambiar firmante
                  </button>
                </div>
              ) : (
                <>
                  {defaultContact && (
                    <button
                      type="button"
                      onClick={() => {
                        setSignerName(defaultContact.nombre || "");
                        setSignerEmail(defaultContact.email || "");
                        setShowCustomContact(false);
                      }}
                      className="inline-flex items-center gap-1 text-[11px] text-primary hover:text-primary/80 font-medium"
                    >
                      <ChevronUp className="w-3 h-3" />
                      Usar contacto principal
                    </button>
                  )}
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
                </>
              )}
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
