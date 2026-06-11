import { cn } from "@/lib/utils";
import { DASHBOARD_STRINGS, type DashboardLang } from "@/lib/dashboard-i18n";

const statusClasses: Record<string, string> = {
  BORRADOR: "bg-gray-100 text-gray-700",
  ENVIADA: "bg-blue-100 text-blue-700",
  NEGOCIACION: "bg-amber-100 text-amber-700",
  GANADA: "bg-green-100 text-green-700",
  PERDIDA: "bg-red-100 text-red-700",
  EXPIRADA: "bg-orange-100 text-orange-700",
  ARCHIVADA: "bg-slate-100 text-slate-500",
};

export function CotizacionStatusBadge({
  estado,
  lang = "es",
}: {
  estado: string;
  lang?: DashboardLang;
}) {
  const label = DASHBOARD_STRINGS[lang].statusByCode[estado] ?? estado;
  const classes = statusClasses[estado] ?? "bg-gray-100 text-gray-700";

  return (
    <span
      className={cn(
        "inline-flex px-2 py-0.5 text-xs font-medium rounded-full",
        classes
      )}
    >
      {label}
    </span>
  );
}
