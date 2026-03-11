import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { Cliente360 } from "@/components/clientes/cliente-360";
import { getSession } from "@/lib/auth";
import Link from "next/link";
import { Pencil } from "lucide-react";

async function getCliente(id: string, userId: string) {
  const cliente = await prisma.cliente.findFirst({
    where: { id, usuarioId: userId },
    include: {
      contactos: true,
      cotizaciones: {
        include: {
          _count: { select: { lineItems: true } },
          actividades: { orderBy: { createdAt: "desc" }, take: 1 },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });
  return cliente;
}

export default async function ClienteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/login");
  const { id } = await params;
  const cliente = await getCliente(id, session.userId);

  if (!cliente) {
    notFound();
  }

  const ganadas = cliente.cotizaciones.filter((c) => c.estado === "GANADA");
  const perdidas = cliente.cotizaciones.filter((c) => c.estado === "PERDIDA");
  const cerradas = ganadas.length + perdidas.length;

  const stats = {
    totalCotizaciones: cliente.cotizaciones.length,
    cotizacionesGanadas: ganadas.length,
    cotizacionesPerdidas: perdidas.length,
    tasaConversion: cerradas > 0 ? (ganadas.length / cerradas) * 100 : 0,
    ingresoTotal: ganadas.reduce((sum, c) => sum + c.total, 0),
    pipelineActivo: cliente.cotizaciones
      .filter((c) => ["ENVIADA", "NEGOCIACION", "BORRADOR"].includes(c.estado))
      .reduce((sum, c) => sum + c.total, 0),
  };

  return (
    <div>
      <PageHeader
        title={cliente.nombre}
        description={[cliente.sector, cliente.ciudad].filter(Boolean).join(" - ")}
        breadcrumbs={[
          { label: "Clientes", href: "/clientes" },
          { label: cliente.nombre },
        ]}
        actions={
          <Link
            href={`/clientes/${cliente.id}/editar`}
            className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
          >
            <Pencil className="w-4 h-4" />
            Editar
          </Link>
        }
      />
      <div className="p-6">
        <Cliente360
          cliente={JSON.parse(JSON.stringify(cliente))}
          stats={stats}
        />
      </div>
    </div>
  );
}
