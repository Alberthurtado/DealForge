"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Package,
  FileText,
  ShieldCheck,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Plug,
  LogOut,
  User,
  Lock,
  ScrollText,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Image from "next/image";
import type { PlanFeatures } from "@/lib/plan-limits";

interface NavItem {
  name: string;
  href: string;
  icon: typeof LayoutDashboard;
  /** If set, the nav item is only available when this feature is enabled */
  requiredFeature?: keyof PlanFeatures;
  /** Plan badge to show when locked */
  requiredPlanLabel?: string;
}

const navigation: NavItem[] = [
  { name: "Dashboard", href: "/panel", icon: LayoutDashboard },
  { name: "Clientes", href: "/clientes", icon: Users },
  { name: "Productos", href: "/productos", icon: Package },
  { name: "Cotizaciones", href: "/cotizaciones", icon: FileText },
  { name: "Contratos", href: "/contratos", icon: ScrollText, requiredFeature: "contratos", requiredPlanLabel: "Business" },
  { name: "Reglas", href: "/reglas", icon: ShieldCheck, requiredFeature: "reglasComerciales", requiredPlanLabel: "Pro" },
  { name: "Reportes", href: "/reportes", icon: BarChart3 },
  { name: "Integraciones", href: "/integraciones", icon: Plug },
  { name: "Configuración", href: "/configuracion", icon: Settings },
  { name: "Soporte", href: "/soporte", icon: HelpCircle },
];

const PLAN_LABELS: Record<string, { label: string; color: string }> = {
  starter: { label: "Starter", color: "bg-gray-100 text-gray-600" },
  pro: { label: "Pro", color: "bg-blue-100 text-blue-700" },
  business: { label: "Business", color: "bg-purple-100 text-purple-700" },
  enterprise: { label: "Enterprise", color: "bg-amber-100 text-amber-700" },
};

interface SidebarUser {
  nombre: string;
  email: string;
  plan: string;
  features?: PlanFeatures;
}

export function Sidebar({ user }: { user: SidebarUser | null }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/");
      router.refresh();
    } catch {
      setLoggingOut(false);
    }
  }

  const planInfo = PLAN_LABELS[user?.plan || "starter"] || PLAN_LABELS.starter;

  return (
    <aside
      role="navigation"
      aria-label="Menú principal"
      data-sidebar
      className={cn(
        "flex flex-col bg-white border-r border-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-border">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.svg"
            alt="DealForge"
            width={36}
            height={36}
            className="rounded-lg shrink-0"
          />
          {!collapsed && (
            <h1 className="font-bold text-lg text-foreground leading-none">
              DealForge
            </h1>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive =
            item.href === "/panel"
              ? pathname === "/panel"
              : pathname.startsWith(item.href);

          // Check if this item is locked by plan
          const isLocked = item.requiredFeature && user?.features
            ? !user.features[item.requiredFeature]
            : false;

          if (isLocked) {
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground/50 cursor-pointer hover:bg-muted/50 transition-colors"
              >
                <item.icon className="w-5 h-5 shrink-0 opacity-40" />
                {!collapsed && (
                  <>
                    <span className="flex-1 opacity-60">{item.name}</span>
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-bold rounded bg-purple-100 text-purple-700 uppercase tracking-wider">
                      <Lock className="w-2.5 h-2.5" />
                      {item.requiredPlanLabel}
                    </span>
                  </>
                )}
              </Link>
            );
          }

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      {user && (
        <div className="px-2 py-3 border-t border-border">
          {!collapsed ? (
            <div className="px-3 py-2">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {user.nombre}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex items-center px-2 py-0.5 text-[10px] font-semibold rounded-full ${planInfo.color}`}
                >
                  {planInfo.label}
                </span>
                <button
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-red-600 transition-colors disabled:opacity-50"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  {loggingOut ? "..." : "Salir"}
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              aria-label="Cerrar sesión"
              className="flex items-center justify-center w-full py-2 text-muted-foreground hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* Collapse toggle */}
      <div className="px-2 py-3 border-t border-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expandir menú" : "Colapsar menú"}
          className="flex items-center justify-center w-full py-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>
    </aside>
  );
}
