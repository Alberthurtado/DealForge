"use client";

import { formatCurrency } from "@/lib/utils";

interface FunnelStage {
  estado: string;
  cantidad: number;
  valor: number;
  color: string;
}

export function ConversionFunnel({ data }: { data: FunnelStage[] }) {
  // Only show active pipeline stages (not Perdida)
  const stages = data.filter((d) => d.estado !== "Perdida");
  const maxCantidad = Math.max(...stages.map((s) => s.cantidad), 1);

  return (
    <div className="bg-white rounded-xl border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-1">
        Embudo de Conversion
      </h3>
      <p className="text-xs text-muted-foreground mb-4">
        Flujo de cotizaciones por etapa
      </p>
      <div className="space-y-3">
        {stages.map((stage) => {
          const widthPercent = Math.max(
            (stage.cantidad / maxCantidad) * 100,
            12
          );
          return (
            <div key={stage.estado}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-foreground">
                  {stage.estado}
                </span>
                <span className="text-xs text-muted-foreground">
                  {stage.cantidad} &bull; {formatCurrency(stage.valor)}
                </span>
              </div>
              <div className="h-8 bg-gray-50 rounded-lg overflow-hidden">
                <div
                  className="h-full rounded-lg flex items-center px-3 transition-all duration-500"
                  style={{
                    width: `${widthPercent}%`,
                    backgroundColor: stage.color,
                  }}
                >
                  <span className="text-[10px] font-bold text-white">
                    {stage.cantidad}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lost stats */}
      {data.find((d) => d.estado === "Perdida") && (
        <div className="mt-4 pt-3 border-t border-border">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              Perdidas: {data.find((d) => d.estado === "Perdida")!.cantidad}
            </span>
            <span className="text-red-500 font-medium">
              {formatCurrency(
                data.find((d) => d.estado === "Perdida")!.valor
              )}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
