import { prisma } from "@/lib/prisma";

// ─── Plan Limits Definition ──────────────────────
export interface PlanLimits {
  cotizacionesMes: number; // 0 = unlimited
  clientes: number;        // 0 = unlimited
  productos: number;       // 0 = unlimited
  consultasIA: number;     // 0 = unlimited
}

export const PLAN_LIMITS: Record<string, PlanLimits> = {
  starter: {
    cotizacionesMes: 10,
    clientes: 5,
    productos: 20,
    consultasIA: 5,
  },
  pro: {
    cotizacionesMes: 100,
    clientes: 50,
    productos: 200,
    consultasIA: 0, // unlimited
  },
  business: {
    cotizacionesMes: 0, // unlimited
    clientes: 0,
    productos: 0,
    consultasIA: 0,
  },
};

export function getPlanLimits(plan: string): PlanLimits {
  return PLAN_LIMITS[plan] || PLAN_LIMITS.starter;
}

// ─── Usage Counts ────────────────────────────────
export interface UsageCounts {
  cotizacionesMes: number;
  clientes: number;
  productos: number;
}

export async function getUsageCounts(): Promise<UsageCounts> {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [cotizacionesMes, clientes, productos] = await Promise.all([
    prisma.cotizacion.count({
      where: { createdAt: { gte: startOfMonth } },
    }),
    prisma.cliente.count(),
    prisma.producto.count(),
  ]);

  return { cotizacionesMes, clientes, productos };
}

// ─── Limit Check ─────────────────────────────────
export interface LimitCheck {
  allowed: boolean;
  limit: number;     // 0 = unlimited
  current: number;
  resource: string;
  planLabel: string;
}

export function checkLimit(
  plan: string,
  resource: "cotizacionesMes" | "clientes" | "productos",
  currentCount: number,
): LimitCheck {
  const limits = getPlanLimits(plan);
  const limit = limits[resource];
  const planLabel = plan.charAt(0).toUpperCase() + plan.slice(1);

  const resourceLabels: Record<string, string> = {
    cotizacionesMes: "cotizaciones este mes",
    clientes: "clientes",
    productos: "productos",
  };

  if (limit === 0) {
    return { allowed: true, limit: 0, current: currentCount, resource: resourceLabels[resource], planLabel };
  }

  return {
    allowed: currentCount < limit,
    limit,
    current: currentCount,
    resource: resourceLabels[resource],
    planLabel,
  };
}

// ─── Combined check for page-level usage info ────
export interface PlanUsageInfo {
  plan: string;
  planLabel: string;
  limits: PlanLimits;
  usage: UsageCounts;
  cotizacionesAllowed: boolean;
  clientesAllowed: boolean;
  productosAllowed: boolean;
}

export async function getPlanUsageInfo(plan: string): Promise<PlanUsageInfo> {
  const limits = getPlanLimits(plan);
  const usage = await getUsageCounts();
  const planLabel = plan.charAt(0).toUpperCase() + plan.slice(1);

  return {
    plan,
    planLabel,
    limits,
    usage,
    cotizacionesAllowed: limits.cotizacionesMes === 0 || usage.cotizacionesMes < limits.cotizacionesMes,
    clientesAllowed: limits.clientes === 0 || usage.clientes < limits.clientes,
    productosAllowed: limits.productos === 0 || usage.productos < limits.productos,
  };
}
