"use client";

import { Plus, UserPlus, BarChart3, Bell } from "lucide-react";
import Link from "next/link";

const actions = [
  {
    label: "Nueva Cotizacion",
    href: "/cotizaciones/nueva",
    icon: Plus,
    color: "bg-primary/10 text-primary",
  },
  {
    label: "Nuevo Cliente",
    href: "/clientes/nuevo",
    icon: UserPlus,
    color: "bg-blue-50 text-blue-600",
  },
  {
    label: "Ver Pipeline",
    href: "/cotizaciones",
    icon: BarChart3,
    color: "bg-amber-50 text-amber-600",
  },
  {
    label: "Reportes",
    href: "/reportes",
    icon: Bell,
    color: "bg-green-50 text-green-600",
  },
];

export function QuickActions() {
  return (
    <div className="bg-white rounded-xl border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Acciones Rapidas
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="flex items-center gap-3 rounded-xl border border-border p-3 hover:border-primary/30 hover:bg-primary/5 transition-all group"
          >
            <div className={`p-2 rounded-lg ${action.color}`}>
              <action.icon className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
              {action.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
