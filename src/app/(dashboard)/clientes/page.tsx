import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "Clientes",
  description: "Listado y gestion de clientes.",
};
import { ClienteTable } from "@/components/clientes/cliente-table";
import Link from "next/link";
import { Plus } from "lucide-react";

async function getClientes() {
  return prisma.cliente.findMany({
    include: {
      contactos: { where: { principal: true }, take: 1 },
      _count: { select: { cotizaciones: true } },
      cotizaciones: {
        select: { estado: true, total: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export default async function ClientesPage() {
  const clientes = await getClientes();

  const clientesWithStats = clientes.map((c) => {
    const ganadas = c.cotizaciones.filter((q) => q.estado === "GANADA");
    const totalIngresos = ganadas.reduce((sum, q) => sum + q.total, 0);
    return {
      id: c.id,
      nombre: c.nombre,
      email: c.email,
      telefono: c.telefono,
      ciudad: c.ciudad,
      sector: c.sector,
      contactoPrincipal: c.contactos[0]?.nombre || "-",
      totalCotizaciones: c._count.cotizaciones,
      totalIngresos,
    };
  });

  return (
    <div>
      <PageHeader
        title="Clientes"
        description="Gestiona tu cartera de clientes"
        actions={
          <Link
            href="/clientes/nuevo"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Nuevo Cliente
          </Link>
        }
      />
      <div className="p-6">
        <ClienteTable clientes={clientesWithStats} />
      </div>
    </div>
  );
}
