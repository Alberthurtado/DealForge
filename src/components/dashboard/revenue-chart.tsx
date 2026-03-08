"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatCurrency } from "@/lib/utils";

interface RevenueData {
  mes: string;
  ingresos: number;
}

export function RevenueChart({ data }: { data: RevenueData[] }) {
  return (
    <div className="bg-white rounded-xl border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-1">
        Ingresos Mensuales
      </h3>
      <p className="text-xs text-muted-foreground mb-4">
        Cotizaciones ganadas - ultimos 6 meses
      </p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3a9bb5" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#3a9bb5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="mes"
              tick={{ fontSize: 12, fill: "#64748b" }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#64748b" }}
              tickFormatter={(v) =>
                v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v.toString()
              }
            />
            <Tooltip
              formatter={(value: number | undefined) => [
                formatCurrency(value ?? 0),
                "Ingresos",
              ]}
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                fontSize: "13px",
              }}
            />
            <Area
              type="monotone"
              dataKey="ingresos"
              stroke="#3a9bb5"
              strokeWidth={2}
              fill="url(#revenueGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
