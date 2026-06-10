"use client";

import { formatCurrency } from "@/lib/utils";
import { DASHBOARD_STRINGS, type DashboardLang } from "@/lib/dashboard-i18n";

interface FunnelStage {
  estado: string;
  cantidad: number;
  valor: number;
  color: string;
}

export function ConversionFunnel({
  data,
  lang = "es",
  currency = "EUR",
  locale = "es-ES",
}: {
  data: FunnelStage[];
  lang?: DashboardLang;
  currency?: string;
  locale?: string;
}) {
  const dict = DASHBOARD_STRINGS[lang];
  const t = dict.panel;
  const stageLabel = (estado: string) => dict.status[estado] ?? estado;
  const money = (n: number) => formatCurrency(n, currency, locale);
  // Only show active pipeline stages (not Perdida — stable Spanish key)
  const stages = data.filter((d) => d.estado !== "Perdida");
  const maxCantidad = Math.max(...stages.map((s) => s.cantidad), 1);

  return (
    <div className="bg-white rounded-xl border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-1">
        {t.conversionFunnel}
      </h3>
      <p className="text-xs text-muted-foreground mb-4">
        {t.conversionFunnelSub}
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
                  {stageLabel(stage.estado)}
                </span>
                <span className="text-xs text-muted-foreground">
                  {stage.cantidad} &bull; {money(stage.valor)}
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
              {t.lost}: {data.find((d) => d.estado === "Perdida")!.cantidad}
            </span>
            <span className="text-red-500 font-medium">
              {money(data.find((d) => d.estado === "Perdida")!.valor)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
