"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { formatCurrency } from "@/lib/utils";
import { DASHBOARD_STRINGS, type DashboardLang } from "@/lib/dashboard-i18n";

interface PipelineData {
  estado: string;
  valor: number;
  cantidad: number;
  color: string;
}

export function PipelineChart({
  data,
  lang = "es",
  currency = "EUR",
  locale = "es-ES",
}: {
  data: PipelineData[];
  lang?: DashboardLang;
  currency?: string;
  locale?: string;
}) {
  const dict = DASHBOARD_STRINGS[lang];
  const t = dict.panel;
  const stageLabel = (estado: string) => dict.status[estado] ?? estado;
  return (
    <div className="bg-white rounded-xl border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        {t.pipelineByStage}
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="estado"
              tick={{ fontSize: 12, fill: "#64748b" }}
              tickFormatter={(v) => stageLabel(v)}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#64748b" }}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              formatter={(value: number | undefined) => [formatCurrency(value ?? 0, currency, locale), t.value]}
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
              }}
            />
            <Bar dataKey="valor" radius={[6, 6, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap gap-4 mt-4">
        {data.map((item) => (
          <div key={item.estado} className="flex items-center gap-2 text-sm">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-muted-foreground">
              {stageLabel(item.estado)}: {item.cantidad}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
