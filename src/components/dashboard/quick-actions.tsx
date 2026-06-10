"use client";

import { Plus, UserPlus, BarChart3, Bell } from "lucide-react";
import Link from "next/link";
import { DASHBOARD_STRINGS, type DashboardLang } from "@/lib/dashboard-i18n";

export function QuickActions({ lang = "es" }: { lang?: DashboardLang }) {
  const t = DASHBOARD_STRINGS[lang].panel;
  const actions = [
    { label: t.newQuote, href: "/cotizaciones/nueva", icon: Plus, color: "bg-primary/10 text-primary" },
    { label: t.newClient, href: "/clientes/nuevo", icon: UserPlus, color: "bg-blue-50 text-blue-600" },
    { label: t.viewPipeline, href: "/cotizaciones", icon: BarChart3, color: "bg-amber-50 text-amber-600" },
    { label: t.reports, href: "/reportes", icon: Bell, color: "bg-green-50 text-green-600" },
  ];
  return (
    <div className="bg-white rounded-xl border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        {t.quickActions}
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
