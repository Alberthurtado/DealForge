"use client";

import { useState } from "react";
import { Check, X, Clock, UserCheck, Mail, RotateCw, Link as LinkIcon } from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { useEmpresaLocale } from "@/lib/use-empresa-locale";
import { REGLAS_STRINGS } from "@/lib/reglas-i18n";

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
  const { lang } = useEmpresaLocale();
  const t = REGLAS_STRINGS[lang].aprobacionPanel;
  const [resending, setResending] = useState<string | null>(null);

  if (aprobaciones.length === 0) return null;

  async function handleResendEmail(aprobacionId: string) {
    setResending(aprobacionId);
    try {
      const res = await fetch(
        `/api/cotizaciones/${cotizacionId}/aprobaciones/${aprobacionId}/resend`,
        { method: "POST" }
      );
      if (res.ok) {
        success(t.emailResent);
        onUpdate();
      } else {
        const data = await res.json().catch(() => null);
        showError(data?.error || t.errResend);
      }
    } catch {
      showError(t.errConnection);
    } finally {
      setResending(null);
    }
  }

  function copyApprovalLink(token: string) {
    const url = `${window.location.origin}/aprobar/${token}`;
    navigator.clipboard.writeText(url).then(
      () => success(t.linkCopied),
      () => showError(t.errCopy)
    );
  }

  const pendientes = aprobaciones.filter((a) => a.estado === "PENDIENTE");
  const resueltas = aprobaciones.filter((a) => a.estado !== "PENDIENTE");

  return (
    <div className="bg-white rounded-xl border border-border p-5">
      <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
        <UserCheck className="w-4 h-4 text-primary" />
        {t.title}
      </h3>

      <div className="space-y-2">
        {pendientes.map((a) => (
          <div key={a.id} className="p-3 bg-amber-50 rounded-lg border border-amber-100">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-amber-800 truncate">{a.aprobadorNombre}</p>
                <p className="text-[10px] text-amber-600">{a.aprobadorEmail}</p>
              </div>
              <span className="text-[10px] font-medium text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full shrink-0">
                {t.pending}
              </span>
            </div>
            {/* Email status + actions */}
            <div className="flex items-center gap-1.5 mt-2 ml-5">
              {a.emailEnviadoAt ? (
                <span className="inline-flex items-center gap-1 text-[10px] text-green-700">
                  <Mail className="w-3 h-3" /> {t.emailSent}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[10px] text-gray-400">
                  <Mail className="w-3 h-3" /> {t.emailPending}
                </span>
              )}
              <span className="text-gray-200">|</span>
              <button
                onClick={() => handleResendEmail(a.id)}
                disabled={resending === a.id}
                className="inline-flex items-center gap-0.5 text-[10px] text-primary hover:text-primary/80 transition-colors disabled:opacity-50"
                title={t.resendTitle}
              >
                <RotateCw className={`w-3 h-3 ${resending === a.id ? "animate-spin" : ""}`} />
                {t.resend}
              </button>
              {a.token && (
                <>
                  <span className="text-gray-200">|</span>
                  <button
                    onClick={() => copyApprovalLink(a.token!)}
                    className="inline-flex items-center gap-0.5 text-[10px] text-primary hover:text-primary/80 transition-colors"
                    title={t.copyLinkTitle}
                  >
                    <LinkIcon className="w-3 h-3" />
                    {t.copyLink}
                  </button>
                </>
              )}
            </div>
            <p className="text-[10px] text-amber-600/70 mt-1.5 ml-5">
              {t.onlyApproverNote}
            </p>
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
                {a.estado === "APROBADA" ? t.approved : t.rejected}
                {a.comentario && ` — ${a.comentario}`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
