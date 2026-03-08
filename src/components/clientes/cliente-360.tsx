"use client";

import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Building2,
  FileText,
  Trophy,
  XCircle,
  TrendingUp,
  DollarSign,
  User,
} from "lucide-react";
import { formatCurrency, formatDate, formatPercent } from "@/lib/utils";
import { CotizacionStatusBadge } from "@/components/cotizaciones/cotizacion-status-badge";

interface Props {
  cliente: {
    id: string;
    nombre: string;
    ruc: string | null;
    email: string | null;
    telefono: string | null;
    direccion: string | null;
    ciudad: string | null;
    pais: string | null;
    sector: string | null;
    notas: string | null;
    contactos: Array<{
      id: string;
      nombre: string;
      cargo: string | null;
      email: string | null;
      telefono: string | null;
      principal: boolean;
    }>;
    cotizaciones: Array<{
      id: string;
      numero: string;
      estado: string;
      total: number;
      fechaEmision: string;
      _count: { lineItems: number };
    }>;
  };
  stats: {
    totalCotizaciones: number;
    cotizacionesGanadas: number;
    cotizacionesPerdidas: number;
    tasaConversion: number;
    ingresoTotal: number;
    pipelineActivo: number;
  };
}

export function Cliente360({ cliente, stats }: Props) {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          {
            label: "Cotizaciones",
            value: stats.totalCotizaciones,
            icon: FileText,
            color: "text-blue-600 bg-blue-50",
          },
          {
            label: "Ganadas",
            value: stats.cotizacionesGanadas,
            icon: Trophy,
            color: "text-green-600 bg-green-50",
          },
          {
            label: "Perdidas",
            value: stats.cotizacionesPerdidas,
            icon: XCircle,
            color: "text-red-600 bg-red-50",
          },
          {
            label: "Conversion",
            value: formatPercent(stats.tasaConversion),
            icon: TrendingUp,
            color: "text-purple-600 bg-purple-50",
          },
          {
            label: "Ingresos",
            value: formatCurrency(stats.ingresoTotal),
            icon: DollarSign,
            color: "text-amber-600 bg-amber-50",
          },
          {
            label: "Pipeline",
            value: formatCurrency(stats.pipelineActivo),
            icon: TrendingUp,
            color: "text-indigo-600 bg-indigo-50",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-border p-4"
          >
            <div className={`inline-flex p-2 rounded-lg ${stat.color} mb-2`}>
              <stat.icon className="w-4 h-4" />
            </div>
            <p className="text-xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Company Info */}
        <div className="bg-white rounded-xl border border-border p-6">
          <h3 className="text-base font-semibold text-foreground mb-4">
            Datos de la Empresa
          </h3>
          <div className="space-y-3">
            {cliente.ruc && (
              <div className="flex items-center gap-3 text-sm">
                <Building2 className="w-4 h-4 text-muted-foreground shrink-0" />
                <span>CIF: {cliente.ruc}</span>
              </div>
            )}
            {cliente.email && (
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                <span>{cliente.email}</span>
              </div>
            )}
            {cliente.telefono && (
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                <span>{cliente.telefono}</span>
              </div>
            )}
            {(cliente.direccion || cliente.ciudad) && (
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
                <span>
                  {[cliente.direccion, cliente.ciudad, cliente.pais]
                    .filter(Boolean)
                    .join(", ")}
                </span>
              </div>
            )}
            {cliente.notas && (
              <div className="mt-4 p-3 bg-muted rounded-lg text-sm text-muted-foreground">
                {cliente.notas}
              </div>
            )}
          </div>

          {/* Contacts */}
          <h4 className="text-sm font-semibold text-foreground mt-6 mb-3">
            Contactos
          </h4>
          <div className="space-y-3">
            {cliente.contactos.map((contacto) => (
              <div
                key={contacto.id}
                className="flex items-start gap-3 p-3 border border-border rounded-lg"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <div className="text-sm">
                  <p className="font-medium text-foreground">
                    {contacto.nombre}
                    {contacto.principal && (
                      <span className="ml-2 text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                        Principal
                      </span>
                    )}
                  </p>
                  {contacto.cargo && (
                    <p className="text-muted-foreground">{contacto.cargo}</p>
                  )}
                  {contacto.email && (
                    <p className="text-muted-foreground">{contacto.email}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quotes History */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-foreground">
              Historial de Cotizaciones
            </h3>
            <Link
              href={`/cotizaciones/nueva?clienteId=${cliente.id}`}
              className="text-sm text-primary hover:text-primary/80 font-medium"
            >
              + Nueva Cotizacion
            </Link>
          </div>
          <div className="space-y-3">
            {cliente.cotizaciones.map((cot) => (
              <Link
                key={cot.id}
                href={`/cotizaciones/${cot.id}`}
                className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {cot.numero}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(cot.fechaEmision)} &middot; {cot._count.lineItems}{" "}
                    items
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <CotizacionStatusBadge estado={cot.estado} />
                  <span className="text-sm font-semibold text-foreground">
                    {formatCurrency(cot.total)}
                  </span>
                </div>
              </Link>
            ))}
            {cliente.cotizaciones.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-8">
                Este cliente no tiene cotizaciones todavia
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
