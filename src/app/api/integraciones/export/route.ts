import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import Papa from "papaparse";

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return new Response(JSON.stringify({ error: "No autenticado" }), { status: 401, headers: { "Content-Type": "application/json" } });
  }

  const tipo = request.nextUrl.searchParams.get("tipo");
  if (!tipo || !["clientes", "productos", "cotizaciones"].includes(tipo)) {
    return new Response(JSON.stringify({ error: "Tipo inválido" }), { status: 400, headers: { "Content-Type": "application/json" } });
  }

  const ownerFilter = session.empresaId
    ? { OR: [{ equipoId: session.empresaId }, { usuarioId: session.userId, equipoId: null }] }
    : { usuarioId: session.userId };

  let data: Record<string, unknown>[] = [];

  if (tipo === "clientes") {
    const clientes = await prisma.cliente.findMany({
      where: ownerFilter,
      include: { contactos: { where: { principal: true }, take: 1 } },
      orderBy: { nombre: "asc" },
    });
    data = clientes.map((c) => ({
      nombre: c.nombre, email: c.email || "", telefono: c.telefono || "", direccion: c.direccion || "",
      ciudad: c.ciudad || "", pais: c.pais || "", sector: c.sector || "", cif: c.ruc || "", notas: c.notas || "",
      contacto_principal_nombre: c.contactos[0]?.nombre || "", contacto_principal_email: c.contactos[0]?.email || "",
      contacto_principal_cargo: c.contactos[0]?.cargo || "", contacto_principal_telefono: c.contactos[0]?.telefono || "",
    }));
  } else if (tipo === "productos") {
    const productos = await prisma.producto.findMany({
      where: ownerFilter,
      include: { categoria: true },
      orderBy: { nombre: "asc" },
    });
    data = productos.map((p) => ({
      nombre: p.nombre, sku: p.sku, descripcion: p.descripcion || "", precio_base: p.precioBase,
      unidad: p.unidad, categoria: p.categoria?.nombre || "", activo: p.activo ? "Sí" : "No",
    }));
  } else if (tipo === "cotizaciones") {
    const cotizaciones = await prisma.cotizacion.findMany({
      where: ownerFilter,
      include: { cliente: { select: { nombre: true, email: true } }, _count: { select: { lineItems: true } } },
      orderBy: { createdAt: "desc" },
    });
    data = cotizaciones.map((c) => ({
      numero: c.numero, estado: c.estado, cliente_nombre: c.cliente.nombre, cliente_email: c.cliente.email || "",
      contacto: c.contactoNombre || "", subtotal: c.subtotal, descuento_global: c.descuentoGlobal,
      impuesto: c.impuesto, total: c.total, moneda: c.moneda,
      fecha_emision: c.fechaEmision.toISOString().slice(0, 10),
      fecha_vencimiento: c.fechaVencimiento ? c.fechaVencimiento.toISOString().slice(0, 10) : "",
      condiciones: c.condiciones || "", items: c._count.lineItems,
    }));
  }

  const csv = Papa.unparse(data);
  const filename = `dealforge-${tipo}-${new Date().toISOString().slice(0, 10)}.csv`;
  return new Response(csv, { headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="${filename}"` } });
}
