"use client";

import { FileText, Users, Package, Search } from "lucide-react";
import Link from "next/link";

type EmptyStateVariant = "clientes" | "productos" | "cotizaciones" | "search" | "generic";

const variants: Record<
  EmptyStateVariant,
  { icon: typeof FileText; title: string; description: string; color: string }
> = {
  clientes: {
    icon: Users,
    title: "Sin clientes todavía",
    description: "Agrega tu primer cliente para empezar a crear cotizaciones.",
    color: "text-blue-400",
  },
  productos: {
    icon: Package,
    title: "Sin productos todavía",
    description: "Agrega productos a tu catálogo para incluirlos en cotizaciones.",
    color: "text-purple-400",
  },
  cotizaciones: {
    icon: FileText,
    title: "Sin cotizaciones todavía",
    description: "Crea tu primera cotización para empezar a vender.",
    color: "text-primary",
  },
  search: {
    icon: Search,
    title: "Sin resultados",
    description: "No se encontraron resultados para tu búsqueda. Intenta con otros términos.",
    color: "text-gray-400",
  },
  generic: {
    icon: FileText,
    title: "No hay datos",
    description: "No hay información disponible en este momento.",
    color: "text-gray-400",
  },
};

interface EmptyStateProps {
  variant?: EmptyStateVariant;
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}

export function EmptyState({
  variant = "generic",
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  const config = variants[variant];
  const Icon = config.icon;

  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center animate-fade-in">
      <div className="relative mb-4">
        {/* Decorative circles */}
        <div className="absolute -inset-4 rounded-full bg-gray-50" />
        <div className="absolute -inset-2 rounded-full bg-gray-100/50" />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm">
          <Icon className={`h-7 w-7 ${config.color}`} />
        </div>
      </div>
      <h3 className="text-sm font-semibold text-gray-800 mt-2">
        {title || config.title}
      </h3>
      <p className="text-xs text-gray-500 mt-1 max-w-xs">
        {description || config.description}
      </p>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
