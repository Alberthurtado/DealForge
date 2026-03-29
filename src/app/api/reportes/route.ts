import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const period = searchParams.get("period") || "90d";

  let fechaDesde: Date | undefined;
  const now = new Date();
  if (period !== "all") {
    const daysMap: Record<string, number> = { "7d": 7, "30d": 30, "90d": 90, "180d": 180, "365d": 365 };
    const days = daysMap[period] ?? 90;
    fechaDesde = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
  }

  const equipoFilter = session.empresaId
    ? { equipoId: session.empresaId }
    : { usuarioId: session.userId, equipoId: null };

  const whereBase = {
    ...equipoFilter,
    ...(fechaDesde ? { fechaEmision: { gte: fechaDesde } } : {}),
  };

  const cotizaciones = await prisma.cotizacion.findMany({
    where: whereBase,
    include: {
      cliente: { select: { nombre: true } },
      lineItems: {
        include: {
          producto: {
            select: {
              nombre: true,
              categoria: { select: { nombre: true } },
            },
          },
        },
      },
    },
    orderBy: { fechaEmision: "asc" },
  });

  // ── KPIs ──────────────────────────────────────────────────────────────────
  const ganadas = cotizaciones.filter(c => c.estado === "GANADA");
  const perdidas = cotizaciones.filter(c => c.estado === "PERDIDA");
  const enPipeline = cotizaciones.filter(c => !["GANADA", "PERDIDA"].includes(c.estado));

  const totalIngresos = ganadas.reduce((s, c) => s + c.total, 0);
  const totalPipeline = enPipeline.reduce((s, c) => s + c.total, 0);
  const avgDealSize = ganadas.length > 0 ? totalIngresos / ganadas.length : 0;
  const tasaConversion =
    ganadas.length + perdidas.length > 0
      ? (ganadas.length / (ganadas.length + perdidas.length)) * 100
      : 0;

  // ── Monthly breakdown ─────────────────────────────────────────────────────
  const monthlyMap: Record<
    string,
    { mes: string; ingresos: number; ganadas: number; perdidas: number; cotizaciones: number; _order: number }
  > = {};

  cotizaciones.forEach(c => {
    const d = new Date(c.fechaEmision);
    const order = d.getFullYear() * 100 + d.getMonth();
    const key = new Intl.DateTimeFormat("es-ES", { month: "short", year: "2-digit" }).format(d);
    if (!monthlyMap[key]) {
      monthlyMap[key] = { mes: key, ingresos: 0, ganadas: 0, perdidas: 0, cotizaciones: 0, _order: order };
    }
    monthlyMap[key].cotizaciones++;
    if (c.estado === "GANADA") { monthlyMap[key].ganadas++; monthlyMap[key].ingresos += c.total; }
    if (c.estado === "PERDIDA") monthlyMap[key].perdidas++;
  });

  const monthly = Object.values(monthlyMap)
    .sort((a, b) => a._order - b._order)
    .map(({ _order, ...m }) => ({
      ...m,
      avgDeal: m.ganadas > 0 ? Math.round(m.ingresos / m.ganadas) : 0,
      tasa: m.ganadas + m.perdidas > 0 ? Math.round((m.ganadas / (m.ganadas + m.perdidas)) * 100) : null,
    }));

  // ── Trend (last month vs previous) ────────────────────────────────────────
  let ingresosTrend: number | null = null;
  let conversionTrend: number | null = null;
  if (monthly.length >= 2) {
    const last = monthly[monthly.length - 1];
    const prev = monthly[monthly.length - 2];
    if (prev.ingresos > 0) ingresosTrend = ((last.ingresos - prev.ingresos) / prev.ingresos) * 100;
    if (prev.tasa !== null && last.tasa !== null) conversionTrend = last.tasa - prev.tasa;
  }

  // ── Pipeline funnel ───────────────────────────────────────────────────────
  const estadoLabels: Record<string, string> = {
    BORRADOR: "Borrador", ENVIADA: "Enviada", EN_REVISION: "En Revisión",
    APROBADA: "Aprobada", GANADA: "Ganada",
  };
  const estadoOrder = ["BORRADOR", "ENVIADA", "EN_REVISION", "APROBADA", "GANADA"];
  const funnelMap: Record<string, { count: number; valor: number }> = {};
  estadoOrder.forEach(e => { funnelMap[e] = { count: 0, valor: 0 }; });
  cotizaciones.forEach(c => {
    if (funnelMap[c.estado]) { funnelMap[c.estado].count++; funnelMap[c.estado].valor += c.total; }
  });
  const totalCots = cotizaciones.length || 1;
  const maxCount = Math.max(...Object.values(funnelMap).map(v => v.count), 1);
  const funnel = estadoOrder.map(e => ({
    estado: estadoLabels[e],
    count: funnelMap[e].count,
    valor: funnelMap[e].valor,
    pct: Math.round((funnelMap[e].count / totalCots) * 100),
    width: Math.round((funnelMap[e].count / maxCount) * 100),
  }));

  // ── Top clients ───────────────────────────────────────────────────────────
  const clienteMap: Record<string, { nombre: string; ingresos: number; ganadas: number }> = {};
  ganadas.forEach(c => {
    const n = c.cliente.nombre;
    if (!clienteMap[n]) clienteMap[n] = { nombre: n, ingresos: 0, ganadas: 0 };
    clienteMap[n].ingresos += c.total;
    clienteMap[n].ganadas++;
  });
  const topClientes = Object.values(clienteMap)
    .sort((a, b) => b.ingresos - a.ingresos)
    .slice(0, 7);

  // ── Top products ──────────────────────────────────────────────────────────
  const prodMap: Record<string, { nombre: string; veces: number; ingresos: number; categoria: string }> = {};
  ganadas.forEach(c => {
    c.lineItems.forEach(li => {
      const key = li.productoId || li.descripcion;
      const nombre = li.producto?.nombre || li.descripcion;
      const categoria = li.producto?.categoria?.nombre || "Sin categoría";
      if (!prodMap[key]) prodMap[key] = { nombre, veces: 0, ingresos: 0, categoria };
      prodMap[key].veces++;
      prodMap[key].ingresos += li.total;
    });
  });
  const topProductos = Object.values(prodMap)
    .sort((a, b) => b.ingresos - a.ingresos)
    .slice(0, 7);

  // ── Revenue by category ───────────────────────────────────────────────────
  const catMap: Record<string, { categoria: string; ingresos: number }> = {};
  ganadas.forEach(c => {
    c.lineItems.forEach(li => {
      const cat = li.producto?.categoria?.nombre || "Sin categoría";
      if (!catMap[cat]) catMap[cat] = { categoria: cat, ingresos: 0 };
      catMap[cat].ingresos += li.total;
    });
  });
  const porCategoria = Object.values(catMap).sort((a, b) => b.ingresos - a.ingresos);

  return NextResponse.json({
    kpis: {
      totalIngresos,
      totalCotizaciones: cotizaciones.length,
      totalGanadas: ganadas.length,
      totalPerdidas: perdidas.length,
      totalPipeline,
      avgDealSize,
      tasaConversion,
      ingresosTrend,
      conversionTrend,
    },
    monthly,
    funnel,
    topClientes,
    topProductos,
    porCategoria,
  });
}
