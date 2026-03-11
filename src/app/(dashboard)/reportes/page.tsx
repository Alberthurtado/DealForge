import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/page-header";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Reportes",
  description: "Reportes y analítica del negocio.",
};
import { ReportesContent } from "@/components/reportes/reportes-content";

async function getReportData(userId: string) {
  const cotizaciones = await prisma.cotizacion.findMany({
    where: { usuarioId: userId },
    include: {
      cliente: { select: { nombre: true } },
      lineItems: true,
    },
    orderBy: { fechaEmision: "desc" },
  });

  // Win/Loss by month
  const monthlyData: Record<
    string,
    { mes: string; ganadas: number; perdidas: number; valorGanado: number }
  > = {};

  cotizaciones.forEach((c) => {
    const mesKey = new Intl.DateTimeFormat("es-ES", {
      month: "short",
      year: "2-digit",
    }).format(new Date(c.fechaEmision));

    if (!monthlyData[mesKey]) {
      monthlyData[mesKey] = { mes: mesKey, ganadas: 0, perdidas: 0, valorGanado: 0 };
    }
    if (c.estado === "GANADA") {
      monthlyData[mesKey].ganadas += 1;
      monthlyData[mesKey].valorGanado += c.total;
    }
    if (c.estado === "PERDIDA") {
      monthlyData[mesKey].perdidas += 1;
    }
  });

  // Top customers by revenue
  const clienteRevenue: Record<string, { nombre: string; ingresos: number; cotizaciones: number }> = {};
  cotizaciones
    .filter((c) => c.estado === "GANADA")
    .forEach((c) => {
      if (!clienteRevenue[c.cliente.nombre]) {
        clienteRevenue[c.cliente.nombre] = {
          nombre: c.cliente.nombre,
          ingresos: 0,
          cotizaciones: 0,
        };
      }
      clienteRevenue[c.cliente.nombre].ingresos += c.total;
      clienteRevenue[c.cliente.nombre].cotizaciones += 1;
    });

  // Products most quoted
  const productCount: Record<string, { nombre: string; veces: number; valor: number }> = {};
  cotizaciones.forEach((c) => {
    c.lineItems.forEach((li) => {
      const key = li.descripcion;
      if (!productCount[key]) {
        productCount[key] = { nombre: key, veces: 0, valor: 0 };
      }
      productCount[key].veces += 1;
      productCount[key].valor += li.total;
    });
  });

  return {
    monthlyWinLoss: Object.values(monthlyData).reverse(),
    topClientes: Object.values(clienteRevenue)
      .sort((a, b) => b.ingresos - a.ingresos)
      .slice(0, 10),
    topProductos: Object.values(productCount)
      .sort((a, b) => b.veces - a.veces)
      .slice(0, 10),
    totalCotizaciones: cotizaciones.length,
    totalGanadas: cotizaciones.filter((c) => c.estado === "GANADA").length,
    totalPerdidas: cotizaciones.filter((c) => c.estado === "PERDIDA").length,
  };
}

export default async function ReportesPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  const data = await getReportData(session.userId);

  return (
    <div>
      <PageHeader
        title="Reportes"
        description="Análisis y métricas de tu negocio"
      />
      <div className="p-6">
        <ReportesContent data={data} />
      </div>
    </div>
  );
}
