"use client";

import {
  DollarSign,
  TrendingUp,
  Target,
  Users,
  FileText,
  Trophy,
} from "lucide-react";
import { formatCurrency, formatPercent } from "@/lib/utils";

interface KpiCardsProps {
  kpis: {
    totalPipeline: number;
    tasaConversion: number;
    ticketPromedio: number;
    ingresoTotal: number;
    totalClientes: number;
    cotizacionesActivas: number;
  };
}

export function KpiCards({ kpis }: KpiCardsProps) {
  const cards = [
    {
      title: "Pipeline Total",
      value: formatCurrency(kpis.totalPipeline),
      icon: DollarSign,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Tasa de Conversión",
      value: formatPercent(kpis.tasaConversion),
      icon: Target,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Ticket Promedio",
      value: formatCurrency(kpis.ticketPromedio),
      icon: TrendingUp,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      title: "Ingresos Ganados",
      value: formatCurrency(kpis.ingresoTotal),
      icon: Trophy,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      title: "Clientes",
      value: kpis.totalClientes.toString(),
      icon: Users,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      title: "Cotizaciones Activas",
      value: kpis.cotizacionesActivas.toString(),
      icon: FileText,
      color: "text-rose-600",
      bg: "bg-rose-50",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-xl border border-border p-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className={`${card.bg} p-2 rounded-lg`}>
              <card.icon className={`w-4 h-4 ${card.color}`} />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">{card.value}</p>
          <p className="text-xs text-muted-foreground mt-1">{card.title}</p>
        </div>
      ))}
    </div>
  );
}
