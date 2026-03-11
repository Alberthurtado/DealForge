import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const [cotizaciones, clientes] = await Promise.all([
    prisma.cotizacion.findMany({
      where: { usuarioId: session.userId },
      select: { id: true, estado: true, total: true, fechaEmision: true, cliente: { select: { nombre: true } } },
    }),
    prisma.cliente.count({ where: { usuarioId: session.userId } }),
  ]);

  const activas = cotizaciones.filter((c) => c.estado !== "ARCHIVADA");
  const totalPipeline = activas.filter((c) => ["ENVIADA", "NEGOCIACION", "BORRADOR"].includes(c.estado)).reduce((sum, c) => sum + c.total, 0);
  const ganadas = activas.filter((c) => c.estado === "GANADA");
  const perdidas = activas.filter((c) => c.estado === "PERDIDA");
  const cerradas = ganadas.length + perdidas.length;
  const tasaConversion = cerradas > 0 ? (ganadas.length / cerradas) * 100 : 0;
  const ticketPromedio = ganadas.length > 0 ? ganadas.reduce((sum, c) => sum + c.total, 0) / ganadas.length : 0;
  const ingresoTotal = ganadas.reduce((sum, c) => sum + c.total, 0);

  const pipelineByStatus = [
    { estado: "Borrador", valor: 0, cantidad: 0, color: "#94a3b8" },
    { estado: "Enviada", valor: 0, cantidad: 0, color: "#3b82f6" },
    { estado: "Negociación", valor: 0, cantidad: 0, color: "#f59e0b" },
    { estado: "Ganada", valor: 0, cantidad: 0, color: "#22c55e" },
    { estado: "Perdida", valor: 0, cantidad: 0, color: "#ef4444" },
  ];
  const statusMap: Record<string, number> = { BORRADOR: 0, ENVIADA: 1, NEGOCIACION: 2, GANADA: 3, PERDIDA: 4 };
  activas.forEach((c) => { const idx = statusMap[c.estado]; if (idx !== undefined) { pipelineByStatus[idx].valor += c.total; pipelineByStatus[idx].cantidad += 1; } });

  const recentActivity = await prisma.actividad.findMany({
    where: { cotizacion: { usuarioId: session.userId } },
    take: 8,
    orderBy: { createdAt: "desc" },
    include: { cotizacion: { select: { numero: true, cliente: { select: { nombre: true } } } } },
  });

  return NextResponse.json({
    kpis: { totalPipeline, tasaConversion, ticketPromedio, ingresoTotal, totalClientes: clientes, cotizacionesActivas: activas.filter((c) => ["ENVIADA", "NEGOCIACION"].includes(c.estado)).length },
    pipelineByStatus,
    recentActivity: recentActivity.map((a) => ({ id: a.id, tipo: a.tipo, descripcion: a.descripcion, cotizacionNumero: a.cotizacion.numero, clienteNombre: a.cotizacion.cliente.nombre, fecha: a.createdAt })),
  });
}
