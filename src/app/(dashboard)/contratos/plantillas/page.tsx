import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FileText, Plus, Star, Pencil } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { DeletePlantillaButton } from "./delete-button";

export default async function PlantillasContratoPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const empresaId = session.empresaId || session.userId;

  const plantillas = await prisma.plantillaContrato.findMany({
    where: { empresaId },
    orderBy: [{ esDefault: "desc" }, { createdAt: "desc" }],
    select: {
      id: true,
      nombre: true,
      descripcion: true,
      esDefault: true,
      createdAt: true,
    },
  });

  return (
    <div>
      <PageHeader
        title="Plantillas de contrato"
        description="Gestiona las plantillas para generar documentos de contrato"
        breadcrumbs={[
          { label: "Contratos", href: "/contratos" },
          { label: "Plantillas" },
        ]}
        actions={
          <Link
            href="/contratos/plantillas/nueva"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Nueva plantilla
          </Link>
        }
      />

      <div className="p-6">
        {plantillas.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <FileText className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-gray-700 mb-1">Sin plantillas</h3>
            <p className="text-sm text-gray-400 mb-4">
              Crea tu primera plantilla de contrato con variables dinámicas
            </p>
            <Link
              href="/contratos/plantillas/nueva"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Crear plantilla
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {plantillas.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-3 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-semibold text-gray-900 text-sm">{p.nombre}</h3>
                        {p.esDefault && (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                            <Star className="w-2.5 h-2.5" /> Default
                          </span>
                        )}
                      </div>
                      {p.descripcion && (
                        <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{p.descripcion}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-auto pt-2 border-t border-gray-50">
                  <Link
                    href={`/contratos/plantillas/${p.id}/editar`}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Pencil className="w-3 h-3" /> Editar
                  </Link>
                  <DeletePlantillaButton id={p.id} nombre={p.nombre} esDefault={p.esDefault} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
