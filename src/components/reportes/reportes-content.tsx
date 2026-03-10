"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { formatCurrency } from "@/lib/utils";
import { Trophy, XCircle, FileText } from "lucide-react";

interface Props {
  data: {
    monthlyWinLoss: Array<{
      mes: string;
      ganadas: number;
      perdidas: number;
      valorGanado: number;
    }>;
    topClientes: Array<{
      nombre: string;
      ingresos: number;
      cotizaciones: number;
    }>;
    topProductos: Array<{
      nombre: string;
      veces: number;
      valor: number;
    }>;
    totalCotizaciones: number;
    totalGanadas: number;
    totalPerdidas: number;
  };
}

export function ReportesContent({ data }: Props) {
  const tasaConversion =
    data.totalGanadas + data.totalPerdidas > 0
      ? (
          (data.totalGanadas / (data.totalGanadas + data.totalPerdidas)) *
          100
        ).toFixed(1)
      : "0";

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-border p-6 flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-xl">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-bold">{data.totalCotizaciones}</p>
            <p className="text-sm text-muted-foreground">Total Cotizaciones</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-border p-6 flex items-center gap-4">
          <div className="p-3 bg-green-50 rounded-xl">
            <Trophy className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">
              {data.totalGanadas}
            </p>
            <p className="text-sm text-muted-foreground">
              Ganadas ({tasaConversion}% conversión)
            </p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-border p-6 flex items-center gap-4">
          <div className="p-3 bg-red-50 rounded-xl">
            <XCircle className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-red-600">
              {data.totalPerdidas}
            </p>
            <p className="text-sm text-muted-foreground">Perdidas</p>
          </div>
        </div>
      </div>

      {/* Win/Loss Chart */}
      <div className="bg-white rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Ganadas vs Perdidas por Mes
        </h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.monthlyWinLoss}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="mes" tick={{ fontSize: 12, fill: "#64748b" }} />
              <YAxis tick={{ fontSize: 12, fill: "#64748b" }} />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                }}
              />
              <Legend />
              <Bar
                dataKey="ganadas"
                name="Ganadas"
                fill="#22c55e"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="perdidas"
                name="Perdidas"
                fill="#ef4444"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Customers */}
        <div className="bg-white rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Top Clientes por Ingresos
          </h3>
          <div className="space-y-3">
            {data.topClientes.map((cliente, i) => (
              <div
                key={cliente.nombre}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{cliente.nombre}</p>
                    <p className="text-xs text-muted-foreground">
                      {cliente.cotizaciones} cotizaciones ganadas
                    </p>
                  </div>
                </div>
                <span className="text-sm font-semibold">
                  {formatCurrency(cliente.ingresos)}
                </span>
              </div>
            ))}
            {data.topClientes.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No hay datos todavía
              </p>
            )}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Productos Más Cotizados
          </h3>
          <div className="space-y-3">
            {data.topProductos.map((prod, i) => (
              <div
                key={prod.nombre}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center text-xs font-bold text-indigo-600">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium truncate max-w-[200px]">
                      {prod.nombre}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {prod.veces} veces cotizado
                    </p>
                  </div>
                </div>
                <span className="text-sm font-semibold">
                  {formatCurrency(prod.valor)}
                </span>
              </div>
            ))}
            {data.topProductos.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No hay datos todavía
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
