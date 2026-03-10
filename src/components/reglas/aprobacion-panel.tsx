"use client";

import { useState } from "react";
import { Check, X, Clock, UserCheck, Mail, Copy, RotateCw, Link as LinkIcon } from "lucide-react";
import { useToast } from "@/components/ui/toast";

interface AprobacionData {
  id: string;
  reglaId: string;
  aprobadorNombre: string;
  aprobadorEmail: string;
  estado: string;
  comentario: string | null;
  respondidoAt: string | null;
  createdAt: string;
  token?: string | null;
  emailEnviadoAt?: string | null;
}

interface Props {
  cotizacionId: string;
  aprobaciones: AprobacionData[];
  onUpdate: () => void;
}

export function AprobacionPanel({ cotizacionId, aprobaciones, onUpdate }: Props) {
  const { success, error: showError } = useToast();
  const [processing, setProcessing] = useState<string | null>(null);
  const [resending, setResending] = useState<string | null>(null);

  if (aprobaciones.length === 0) return null;

  async function handleRespond(aprobacionId: string, estado: "APROBADA" | "RECHAZADA") {
    setProcessing(aprobacionId);
    try {
      const res = await fetch(
        `/api/cotizaciones/${cotizacionId}/aprobaciones/${aprobacionId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ estado }),
        }
      );
      if (res.ok) {
        success(estado === "APROBADA" ? "Aprobación registrada" : "Rechazo registrado");
        onUpdate();
      } else {
        showError("Error al responder");
      }
    } catch {
      showError("Error de conexión");
    } finally {
      setProcessing(null);
    }
  }

  async function handleResendEmail(aprobacionId: string) {
    setResending(aprobacionId);
    try {
      const res = await fetch(
        `/api/cotizaciones/${cotizacionId}/aprobaciones/${aprobacionId}/resend`,
        { method: "POST" }
      );
      if (res.ok) {
        success("Email de aprobación reenviado");
        onUpdate();
      } else {
        const data = await res.json().catch(() => null);
        showError(data?.error || "Error al reenviar email");
      }
    } catch {
      showError("Error de conexión");
    } finally {
      setResending(null);
    }
  }

  function copyApprovalLink(token: string) {
    const url = `${window.location.origin}/aprobar/${token}`;
    navigator.clipboard.writeText(url).then(
      () => success("Enlace copiado"),
      () => showError("No se pudo copiar")
    );
  }

  const pendientes = aprobaciones.filter((a) => a.estado === "PENDIENTE");
  const resueltas = aprobaciones.filter((a) => a.estado !== "PENDIENTE");

  return (
    <div className="bg-white rounded-xl border border-border p-5">
      <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
        <UserCheck className="w-4 h-4 text-primary" />
        Aprobaciones
      </h3>

      <div className="space-y-2">
        {pendientes.map((a) => (
          <div key={a.id} className="p-2 bg-amber-50 rounded-lg border border-amber-100">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-amber-800 truncate">{a.aprobadorNombre}</p>
                <p className="text-[10px] text-amber-600">{a.aprobadorEmail}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => handleRespond(a.id, "APROBADA")}
                  disabled={processing === a.id}
                  className="p-1 rounded bg-green-100 text-green-700 hover:bg-green-200 transition-colors disabled:opacity-50"
                  title="Aprobar"
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleRespond(a.id, "RECHAZADA")}
                  disabled={processing === a.id}
                  className="p-1 rounded bg-red-100 text-red-700 hover:bg-red-200 transition-colors disabled:opacity-50"
                  title="Rechazar"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            {/* Email status + actions */}
            <div className="flex items-center gap-1.5 mt-1.5 ml-5">
              {a.emailEnviadoAt ? (
                <span className="inline-flex items-center gap-1 text-[10px] text-green-700">
                  <Mail className="w-3 h-3" /> Email enviado
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[10px] text-gray-400">
                  <Mail className="w-3 h-3" /> Sin email
                </span>
              )}
              <span className="text-gray-200">|</span>
              <button
                onClick={() => handleResendEmail(a.id)}
                disabled={resending === a.id}
                className="inline-flex items-center gap-0.5 text-[10px] text-primary hover:text-primary/80 transition-colors disabled:opacity-50"
                title="Reenviar email de aprobación"
              >
                <RotateCw className={`w-3 h-3 ${resending === a.id ? "animate-spin" : ""}`} />
                Reenviar
              </button>
              {a.token && (
                <>
                  <span className="text-gray-200">|</span>
                  <button
                    onClick={() => copyApprovalLink(a.token!)}
                    className="inline-flex items-center gap-0.5 text-[10px] text-primary hover:text-primary/80 transition-colors"
                    title="Copiar enlace de aprobación"
                  >
                    <LinkIcon className="w-3 h-3" />
                    Copiar enlace
                  </button>
                </>
              )}
            </div>
          </div>
        ))}

        {resueltas.map((a) => (
          <div
            key={a.id}
            className={`flex items-center gap-2 p-2 rounded-lg border ${
              a.estado === "APROBADA"
                ? "bg-green-50 border-green-100"
                : "bg-red-50 border-red-100"
            }`}
          >
            {a.estado === "APROBADA" ? (
              <Check className="w-3.5 h-3.5 text-green-600 shrink-0" />
            ) : (
              <X className="w-3.5 h-3.5 text-red-600 shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <p className={`text-xs font-medium truncate ${a.estado === "APROBADA" ? "text-green-800" : "text-red-800"}`}>
                {a.aprobadorNombre}
              </p>
              <p className={`text-[10px] ${a.estado === "APROBADA" ? "text-green-600" : "text-red-600"}`}>
                {a.estado === "APROBADA" ? "Aprobada" : "Rechazada"}
                {a.comentario && ` — ${a.comentario}`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
