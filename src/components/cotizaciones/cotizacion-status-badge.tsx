import { cn } from "@/lib/utils";

const statusConfig: Record<string, { label: string; classes: string }> = {
  BORRADOR: {
    label: "Borrador",
    classes: "bg-gray-100 text-gray-700",
  },
  ENVIADA: {
    label: "Enviada",
    classes: "bg-blue-100 text-blue-700",
  },
  NEGOCIACION: {
    label: "Negociacion",
    classes: "bg-amber-100 text-amber-700",
  },
  GANADA: {
    label: "Ganada",
    classes: "bg-green-100 text-green-700",
  },
  PERDIDA: {
    label: "Perdida",
    classes: "bg-red-100 text-red-700",
  },
  EXPIRADA: {
    label: "Expirada",
    classes: "bg-orange-100 text-orange-700",
  },
  ARCHIVADA: {
    label: "Archivada",
    classes: "bg-slate-100 text-slate-500",
  },
};

export function CotizacionStatusBadge({ estado }: { estado: string }) {
  const config = statusConfig[estado] || {
    label: estado,
    classes: "bg-gray-100 text-gray-700",
  };

  return (
    <span
      className={cn(
        "inline-flex px-2 py-0.5 text-xs font-medium rounded-full",
        config.classes
      )}
    >
      {config.label}
    </span>
  );
}
