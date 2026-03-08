"use client";

import { formatDate } from "@/lib/utils";
import {
  FileText,
  Send,
  Trophy,
  XCircle,
  MessageSquare,
  ArrowRightLeft,
} from "lucide-react";

interface Activity {
  id: string;
  tipo: string;
  descripcion: string;
  cotizacionNumero: string;
  clienteNombre: string;
  fecha: string;
}

const iconMap: Record<string, typeof FileText> = {
  CREADA: FileText,
  ENVIADA: Send,
  ESTADO_CAMBIADO: ArrowRightLeft,
  NOTA: MessageSquare,
};

const colorMap: Record<string, string> = {
  CREADA: "text-blue-500 bg-blue-50",
  ENVIADA: "text-indigo-500 bg-indigo-50",
  ESTADO_CAMBIADO: "text-amber-500 bg-amber-50",
  NOTA: "text-gray-500 bg-gray-50",
};

export function RecentActivity({ activities }: { activities: Activity[] }) {
  return (
    <div className="bg-white rounded-xl border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Actividad Reciente
      </h3>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = iconMap[activity.tipo] || FileText;
          const colorClass = colorMap[activity.tipo] || "text-gray-500 bg-gray-50";
          return (
            <div key={activity.id} className="flex items-start gap-3">
              <div className={`p-1.5 rounded-lg ${colorClass}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground truncate">
                  {activity.descripcion}
                </p>
                <p className="text-xs text-muted-foreground">
                  {activity.cotizacionNumero} &middot; {activity.clienteNombre}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {formatDate(activity.fecha)}
                </p>
              </div>
            </div>
          );
        })}
        {activities.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No hay actividad reciente
          </p>
        )}
      </div>
    </div>
  );
}
