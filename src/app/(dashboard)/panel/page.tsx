import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Vision general del negocio - metricas, pipeline y actividad reciente.",
};
import { KpiCards } from "@/components/dashboard/kpi-cards";
import { PipelineChart } from "@/components/dashboard/pipeline-chart";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { ConversionFunnel } from "@/components/dashboard/conversion-funnel";
import { OnboardingChecklist } from "@/components/dashboard/onboarding-checklist";

async function getDashboardData() {
  const [cotizaciones, totalClientes, recentActivities, empresa, totalProductos] = await Promise.all([
    prisma.cotizacion.findMany({
      select: { id: true, estado: true, total: true, fechaEmision: true },
    }),
    prisma.cliente.count(),
    prisma.actividad.findMany({
      take: 8,
      orderBy: { createdAt: "desc" },
      include: {
        cotizacion: {
          select: { numero: true, cliente: { select: { nombre: true } } },
        },
      },
    }),
    prisma.empresa.findUnique({ where: { id: "default" }, select: { nombre: true, email: true } }),
    prisma.producto.count(),
  ]);

  const activas = cotizaciones.filter((c) => c.estado !== "ARCHIVADA");
  const ganadas = activas.filter((c) => c.estado === "GANADA");
  const perdidas = activas.filter((c) => c.estado === "PERDIDA");
  const cerradas = ganadas.length + perdidas.length;

  const totalPipeline = activas
    .filter((c) => ["ENVIADA", "NEGOCIACION", "BORRADOR"].includes(c.estado))
    .reduce((sum, c) => sum + c.total, 0);

  const tasaConversion = cerradas > 0 ? (ganadas.length / cerradas) * 100 : 0;
  const ticketPromedio =
    ganadas.length > 0
      ? ganadas.reduce((sum, c) => sum + c.total, 0) / ganadas.length
      : 0;
  const ingresoTotal = ganadas.reduce((sum, c) => sum + c.total, 0);

  const pipelineByStatus = [
    { estado: "Borrador", valor: 0, cantidad: 0, color: "#94a3b8" },
    { estado: "Enviada", valor: 0, cantidad: 0, color: "#3b82f6" },
    { estado: "Negociacion", valor: 0, cantidad: 0, color: "#f59e0b" },
    { estado: "Ganada", valor: 0, cantidad: 0, color: "#22c55e" },
    { estado: "Perdida", valor: 0, cantidad: 0, color: "#ef4444" },
  ];
  const statusMap: Record<string, number> = {
    BORRADOR: 0, ENVIADA: 1, NEGOCIACION: 2, GANADA: 3, PERDIDA: 4,
  };
  activas.forEach((c) => {
    const idx = statusMap[c.estado];
    if (idx !== undefined) {
      pipelineByStatus[idx].valor += c.total;
      pipelineByStatus[idx].cantidad += 1;
    }
  });

  // Revenue by month (last 6 months) from won quotes
  const now = new Date();
  const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  const revenueByMonth: Array<{ mes: string; ingresos: number }> = [];

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const monthLabel = `${monthNames[d.getMonth()]} ${d.getFullYear().toString().slice(-2)}`;

    const monthRevenue = ganadas
      .filter((c) => {
        const fe = new Date(c.fechaEmision);
        return `${fe.getFullYear()}-${String(fe.getMonth() + 1).padStart(2, "0")}` === monthKey;
      })
      .reduce((sum, c) => sum + c.total, 0);

    revenueByMonth.push({ mes: monthLabel, ingresos: monthRevenue });
  }

  return {
    kpis: {
      totalPipeline,
      tasaConversion,
      ticketPromedio,
      ingresoTotal,
      totalClientes,
      cotizacionesActivas: activas.filter((c) =>
        ["ENVIADA", "NEGOCIACION"].includes(c.estado)
      ).length,
    },
    pipelineByStatus,
    revenueByMonth,
    recentActivity: recentActivities.map((a) => ({
      id: a.id,
      tipo: a.tipo,
      descripcion: a.descripcion,
      cotizacionNumero: a.cotizacion.numero,
      clienteNombre: a.cotizacion.cliente.nombre,
      fecha: a.createdAt.toISOString(),
    })),
    onboardingSteps: {
      empresaConfigured: !!(empresa && (empresa.nombre !== "Mi Empresa" || empresa.email)),
      hasClientes: totalClientes > 0,
      hasProductos: totalProductos > 0,
      hasCotizaciones: cotizaciones.length > 0,
    },
  };
}

export default async function DashboardPage() {
  const data = await getDashboardData();

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Vision general de tu negocio"
      />
      <div className="p-6 space-y-6">
        <OnboardingChecklist steps={data.onboardingSteps} />
        <KpiCards kpis={data.kpis} />

        {/* Row 2: Pipeline + Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PipelineChart data={data.pipelineByStatus} />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>

        {/* Row 3: Revenue Chart + Conversion Funnel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RevenueChart data={data.revenueByMonth} />
          </div>
          <div>
            <ConversionFunnel data={data.pipelineByStatus} />
          </div>
        </div>

        {/* Row 4: Recent Activity */}
        <RecentActivity activities={data.recentActivity} />
      </div>
    </div>
  );
}
