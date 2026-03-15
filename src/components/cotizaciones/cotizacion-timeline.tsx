"use client";

import { formatDate } from "@/lib/utils";
import {
  FileText,
  Send,
  ArrowRightLeft,
  MessageSquare,
  Mail,
  ShieldCheck,
  Bell,
  PenTool,
  GitBranch,
} from "lucide-react";

interface Actividad {
  id: string;
  tipo: string;
  descripcion: string;
  estadoAnterior: string | null;
  estadoNuevo: string | null;
  createdAt: string;
}

const iconConfig: Record<string, { icon: typeof FileText; color: string }> = {
  CREADA: { icon: FileText, color: "text-blue-500 bg-blue-50 border-blue-200" },
  ENVIADA: { icon: Send, color: "text-indigo-500 bg-indigo-50 border-indigo-200" },
  ESTADO_CAMBIADO: { icon: ArrowRightLeft, color: "text-amber-500 bg-amber-50 border-amber-200" },
  NOTA: { icon: MessageSquare, color: "text-gray-500 bg-gray-50 border-gray-200" },
  EMAIL_ENVIADO: { icon: Mail, color: "text-green-500 bg-green-50 border-green-200" },
  APROBACION_RESUELTA: { icon: ShieldCheck, color: "text-purple-500 bg-purple-50 border-purple-200" },
  RECORDATORIO_ENVIADO: { icon: Bell, color: "text-amber-500 bg-amber-50 border-amber-200" },
  FIRMA_SOLICITADA: { icon: PenTool, color: "text-blue-500 bg-blue-50 border-blue-200" },
  FIRMA_COMPLETADA: { icon: PenTool, color: "text-green-500 bg-green-50 border-green-200" },
  VERSION_CREADA: { icon: GitBranch, color: "text-violet-500 bg-violet-50 border-violet-200" },
};

export function CotizacionTimeline({
  actividades,
}: {
  actividades: Actividad[];
}) {
  return (
    <div className="bg-white rounded-xl border border-border p-6">
      <h3 className="text-base font-semibold text-foreground mb-4">
        Historial de Actividad
      </h3>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

        <div className="space-y-4">
          {actividades.map((act) => {
            const config = iconConfig[act.tipo] || iconConfig.NOTA;
            const Icon = config.icon;
            return (
              <div key={act.id} className="flex gap-3 relative">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${config.color} z-10`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="pb-4">
                  <p className="text-sm text-foreground">
                    {act.descripcion}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {formatDate(act.createdAt)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {actividades.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">
          No hay actividad registrada
        </p>
      )}
    </div>
  );
}
