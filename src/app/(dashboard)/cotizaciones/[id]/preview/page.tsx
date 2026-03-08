"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Printer } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import Image from "next/image";

interface Cotizacion {
  id: string;
  numero: string;
  estado: string;
  fechaEmision: string;
  fechaVencimiento: string | null;
  contactoNombre: string | null;
  subtotal: number;
  descuentoGlobal: number;
  impuesto: number;
  total: number;
  moneda: string;
  notas: string | null;
  condiciones: string | null;
  version: number;
  cliente: {
    id: string;
    nombre: string;
    email: string | null;
    telefono: string | null;
    direccion: string | null;
    ciudad: string | null;
    pais: string | null;
    ruc: string | null;
    contactos: Array<{
      nombre: string;
      cargo: string | null;
      email: string | null;
      telefono: string | null;
      principal: boolean;
    }>;
  };
  lineItems: Array<{
    id: string;
    descripcion: string;
    cantidad: number;
    precioUnitario: number;
    descuento: number;
    total: number;
    producto: { nombre: string; sku: string } | null;
    variante: { id: string; nombre: string; sku: string; atributos: string } | null;
  }>;
}

interface EmpresaData {
  nombre: string;
  cif: string | null;
  email: string | null;
  telefono: string | null;
  direccion: string | null;
  ciudad: string | null;
  pais: string | null;
  web: string | null;
  logoUrl: string | null;
  plantillaPdf: string;
  colorPrimario: string;
}

export default function CotizacionPreviewPage() {
  const params = useParams();
  const router = useRouter();
  const [cotizacion, setCotizacion] = useState<Cotizacion | null>(null);
  const [empresa, setEmpresa] = useState<EmpresaData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`/api/cotizaciones/${params.id}`).then((r) => r.json()),
      fetch("/api/empresa").then((r) => r.json()),
    ]).then(([cotData, empData]) => {
      setCotizacion(cotData);
      setEmpresa(empData);
      setLoading(false);
    });
  }, [params.id]);

  if (loading || !cotizacion || !empresa) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-pulse space-y-4 w-[800px]">
          <div className="h-8 w-48 bg-gray-300 rounded" />
          <div className="h-[600px] bg-white rounded-lg shadow" />
        </div>
      </div>
    );
  }

  const subtotalAfterDiscount =
    cotizacion.subtotal * (1 - cotizacion.descuentoGlobal / 100);
  const ivaAmount = subtotalAfterDiscount * (cotizacion.impuesto / 100);
  const discountAmount =
    cotizacion.subtotal * (cotizacion.descuentoGlobal / 100);

  const isExpired =
    cotizacion.fechaVencimiento &&
    new Date(cotizacion.fechaVencimiento) < new Date();

  const primaryContact = cotizacion.cliente.contactos?.find((c) => c.principal);

  const color = empresa.colorPrimario;
  const plantilla = empresa.plantillaPdf;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-100 print:static print:z-auto print:bg-white print:min-h-0">
      {/* Top action bar - hidden in print */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between print:hidden">
        <button
          onClick={() => router.push(`/cotizaciones/${cotizacion.id}`)}
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a cotizacion
        </button>
        <div className="flex items-center gap-3">
          {isExpired && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-medium">
              Cotizacion vencida
            </span>
          )}
          <span className="text-xs text-gray-400">v{cotizacion.version}</span>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-colors"
            style={{ backgroundColor: color }}
          >
            <Printer className="w-4 h-4" />
            Imprimir / PDF
          </button>
        </div>
      </div>

      {/* Document */}
      <div className="mx-auto max-w-[800px] py-8 px-4 print:py-0 print:px-0 print:max-w-none">
        <div className="bg-white shadow-lg rounded-lg print:shadow-none print:rounded-none">
          {/* ===== HEADER ===== */}
          {plantilla === "moderna" && (
            <div
              className="px-10 pt-8 pb-6 text-white"
              style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  {empresa.logoUrl ? (
                    <Image
                      src={empresa.logoUrl}
                      alt={empresa.nombre}
                      width={52}
                      height={52}
                      className="rounded-lg bg-white/20 p-1 print:w-10 print:h-10"
                    />
                  ) : (
                    <div className="w-13 h-13 rounded-lg bg-white/20 flex items-center justify-center text-xl font-bold">
                      {empresa.nombre.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h1 className="text-xl font-bold">{empresa.nombre}</h1>
                    {empresa.cif && (
                      <p className="text-xs text-white/70 mt-0.5">CIF: {empresa.cif}</p>
                    )}
                    {empresa.web && (
                      <p className="text-xs text-white/70">{empresa.web}</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <h2 className="text-2xl font-bold tracking-tight">COTIZACION</h2>
                  <p className="text-lg font-semibold mt-1">{cotizacion.numero}</p>
                  <div className="mt-2 space-y-0.5">
                    <p className="text-xs text-white/70">
                      Emision: {formatDate(cotizacion.fechaEmision)}
                    </p>
                    {cotizacion.fechaVencimiento && (
                      <p className={`text-xs ${isExpired ? "text-red-200 font-medium" : "text-white/70"}`}>
                        Validez: {formatDate(cotizacion.fechaVencimiento)}
                        {isExpired && " (VENCIDA)"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {plantilla === "clasica" && (
            <div className="px-10 pt-10 pb-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  {empresa.logoUrl ? (
                    <Image
                      src={empresa.logoUrl}
                      alt={empresa.nombre}
                      width={48}
                      height={48}
                      className="print:w-10 print:h-10"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded-sm flex items-center justify-center text-lg font-bold text-gray-700">
                      {empresa.nombre.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">{empresa.nombre}</h1>
                    {empresa.cif && (
                      <p className="text-xs text-gray-500 mt-0.5">CIF: {empresa.cif}</p>
                    )}
                    {empresa.web && (
                      <p className="text-xs text-gray-400">{empresa.web}</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <h2 className="text-2xl font-bold text-gray-800 tracking-wider">
                    COTIZACION
                  </h2>
                  <p className="text-lg font-semibold text-gray-800 mt-1">
                    {cotizacion.numero}
                  </p>
                  <div className="mt-2 space-y-0.5">
                    <p className="text-xs text-gray-500">
                      <span className="text-gray-400">Emision:</span>{" "}
                      {formatDate(cotizacion.fechaEmision)}
                    </p>
                    {cotizacion.fechaVencimiento && (
                      <p className={`text-xs ${isExpired ? "text-red-600 font-medium" : "text-gray-500"}`}>
                        <span className={isExpired ? "text-red-400" : "text-gray-400"}>
                          Validez:
                        </span>{" "}
                        {formatDate(cotizacion.fechaVencimiento)}
                        {isExpired && " (VENCIDA)"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-6 h-0.5 bg-gray-800" />
            </div>
          )}

          {plantilla === "minimalista" && (
            <div className="px-10 pt-10 pb-6">
              <div className="flex items-start justify-between">
                <div>
                  {empresa.logoUrl ? (
                    <Image
                      src={empresa.logoUrl}
                      alt={empresa.nombre}
                      width={40}
                      height={40}
                      className="mb-2 print:w-8 print:h-8"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-500 mb-2">
                      {empresa.nombre.charAt(0)}
                    </div>
                  )}
                  <h1 className="text-lg font-medium text-gray-700">{empresa.nombre}</h1>
                  {empresa.web && (
                    <p className="text-xs text-gray-400 font-light">{empresa.web}</p>
                  )}
                </div>
                <div className="text-right">
                  <h2 className="text-xl text-gray-400 font-light tracking-widest">
                    COTIZACION
                  </h2>
                  <p className="text-base text-gray-600 mt-1">{cotizacion.numero}</p>
                  <div className="mt-2 space-y-0.5">
                    <p className="text-xs text-gray-400">
                      {formatDate(cotizacion.fechaEmision)}
                    </p>
                    {cotizacion.fechaVencimiento && (
                      <p className={`text-xs ${isExpired ? "text-red-500" : "text-gray-400"}`}>
                        Valida hasta: {formatDate(cotizacion.fechaVencimiento)}
                        {isExpired && " (VENCIDA)"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-6 h-px bg-gray-200" />
            </div>
          )}

          {/* ===== CLIENT INFO ===== */}
          <div className="px-10 pb-6">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2">
                  Cliente
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  {cotizacion.cliente.nombre}
                </p>
                {cotizacion.cliente.ruc && (
                  <p className="text-xs text-gray-500 mt-0.5">
                    CIF/NIF: {cotizacion.cliente.ruc}
                  </p>
                )}
                {cotizacion.cliente.direccion && (
                  <p className="text-xs text-gray-500 mt-0.5">
                    {cotizacion.cliente.direccion}
                  </p>
                )}
                {(cotizacion.cliente.ciudad || cotizacion.cliente.pais) && (
                  <p className="text-xs text-gray-500">
                    {[cotizacion.cliente.ciudad, cotizacion.cliente.pais]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                )}
                {cotizacion.cliente.email && (
                  <p className="text-xs text-gray-500 mt-1">
                    {cotizacion.cliente.email}
                  </p>
                )}
                {cotizacion.cliente.telefono && (
                  <p className="text-xs text-gray-500">
                    {cotizacion.cliente.telefono}
                  </p>
                )}
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2">
                  Contacto
                </p>
                {cotizacion.contactoNombre ? (
                  <>
                    <p className="text-sm font-semibold text-gray-900">
                      {cotizacion.contactoNombre}
                    </p>
                    {primaryContact && (
                      <>
                        {primaryContact.cargo && (
                          <p className="text-xs text-gray-500 mt-0.5">
                            {primaryContact.cargo}
                          </p>
                        )}
                        {primaryContact.email && (
                          <p className="text-xs text-gray-500 mt-0.5">
                            {primaryContact.email}
                          </p>
                        )}
                        {primaryContact.telefono && (
                          <p className="text-xs text-gray-500">
                            {primaryContact.telefono}
                          </p>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <p className="text-xs text-gray-400 italic">
                    No especificado
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ===== EMPRESA DETAILS (under client info) ===== */}
          {(empresa.email || empresa.telefono || empresa.direccion) && (
            <div className="px-10 pb-6">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2">
                Datos del Emisor
              </p>
              <div className="text-xs text-gray-500 space-y-0.5">
                {empresa.direccion && <p>{empresa.direccion}</p>}
                {(empresa.ciudad || empresa.pais) && (
                  <p>{[empresa.ciudad, empresa.pais].filter(Boolean).join(", ")}</p>
                )}
                {empresa.email && <p>{empresa.email}</p>}
                {empresa.telefono && <p>{empresa.telefono}</p>}
              </div>
            </div>
          )}

          {/* ===== LINE ITEMS TABLE ===== */}
          <div className="px-10 pb-6">
            {plantilla === "clasica" ? (
              <table className="w-full text-sm border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left py-2.5 px-3 text-[10px] font-semibold uppercase tracking-wider text-gray-600 border border-gray-300">
                      #
                    </th>
                    <th className="text-left py-2.5 px-3 text-[10px] font-semibold uppercase tracking-wider text-gray-600 border border-gray-300">
                      Descripcion
                    </th>
                    <th className="text-right py-2.5 px-3 text-[10px] font-semibold uppercase tracking-wider text-gray-600 border border-gray-300">
                      Cant.
                    </th>
                    <th className="text-right py-2.5 px-3 text-[10px] font-semibold uppercase tracking-wider text-gray-600 border border-gray-300">
                      Precio Unit.
                    </th>
                    <th className="text-right py-2.5 px-3 text-[10px] font-semibold uppercase tracking-wider text-gray-600 border border-gray-300">
                      Dto.
                    </th>
                    <th className="text-right py-2.5 px-3 text-[10px] font-semibold uppercase tracking-wider text-gray-600 border border-gray-300">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cotizacion.lineItems.map((item, index) => (
                    <tr key={item.id} className={index % 2 === 1 ? "bg-gray-50" : ""}>
                      <td className="py-2.5 px-3 text-gray-400 text-xs border border-gray-200">
                        {index + 1}
                      </td>
                      <td className="py-2.5 px-3 border border-gray-200">
                        <p className="font-medium text-gray-800">{item.descripcion}</p>
                        {(item.variante || item.producto) && (
                          <p className="text-[10px] text-gray-400 mt-0.5">
                            SKU: {item.variante?.sku || item.producto?.sku}
                          </p>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-right text-gray-700 border border-gray-200">
                        {item.cantidad}
                      </td>
                      <td className="py-2.5 px-3 text-right text-gray-700 border border-gray-200">
                        {formatCurrency(item.precioUnitario)}
                      </td>
                      <td className="py-2.5 px-3 text-right text-gray-700 border border-gray-200">
                        {item.descuento > 0 ? `${item.descuento}%` : "-"}
                      </td>
                      <td className="py-2.5 px-3 text-right font-medium text-gray-900 border border-gray-200">
                        {formatCurrency(item.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className={plantilla === "minimalista" ? "" : "bg-gray-50 print:bg-gray-100"}>
                    <th className="text-left py-2.5 px-3 text-[10px] font-semibold uppercase tracking-wider text-gray-500 rounded-l-md">
                      #
                    </th>
                    <th className="text-left py-2.5 px-3 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                      Descripcion
                    </th>
                    <th className="text-right py-2.5 px-3 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                      Cant.
                    </th>
                    <th className="text-right py-2.5 px-3 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                      Precio Unit.
                    </th>
                    <th className="text-right py-2.5 px-3 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                      Dto.
                    </th>
                    <th className="text-right py-2.5 px-3 text-[10px] font-semibold uppercase tracking-wider text-gray-500 rounded-r-md">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cotizacion.lineItems.map((item, index) => (
                    <tr
                      key={item.id}
                      className={`${plantilla === "minimalista" ? "border-b border-gray-100" : `border-b border-gray-100 ${index % 2 === 1 ? "bg-gray-50/50" : ""}`}`}
                    >
                      <td className="py-3 px-3 text-gray-400 text-xs">
                        {index + 1}
                      </td>
                      <td className="py-3 px-3">
                        <p className="font-medium text-gray-800">
                          {item.descripcion}
                        </p>
                        {(item.variante || item.producto) && (
                          <p className="text-[10px] text-gray-400 mt-0.5">
                            SKU: {item.variante?.sku || item.producto?.sku}
                          </p>
                        )}
                      </td>
                      <td className="py-3 px-3 text-right text-gray-700">
                        {item.cantidad}
                      </td>
                      <td className="py-3 px-3 text-right text-gray-700">
                        {formatCurrency(item.precioUnitario)}
                      </td>
                      <td className="py-3 px-3 text-right text-gray-700">
                        {item.descuento > 0 ? `${item.descuento}%` : "-"}
                      </td>
                      <td className="py-3 px-3 text-right font-medium text-gray-900">
                        {formatCurrency(item.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* ===== TOTALS ===== */}
          <div className="px-10 pb-8">
            <div className="flex justify-end">
              <div className="w-72 space-y-1.5">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatCurrency(cotizacion.subtotal)}</span>
                </div>
                {cotizacion.descuentoGlobal > 0 && (
                  <div className="flex justify-between text-sm text-red-600">
                    <span>Descuento ({cotizacion.descuentoGlobal}%)</span>
                    <span>-{formatCurrency(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm text-gray-600">
                  <span>IVA ({cotizacion.impuesto}%)</span>
                  <span>{formatCurrency(ivaAmount)}</span>
                </div>
                {plantilla === "moderna" ? (
                  <div
                    className="flex justify-between pt-3 mt-2 rounded-lg px-3 py-2 text-white"
                    style={{ backgroundColor: color }}
                  >
                    <span className="text-base font-bold">Total</span>
                    <span className="text-xl font-bold">
                      {formatCurrency(cotizacion.total)}
                    </span>
                  </div>
                ) : plantilla === "clasica" ? (
                  <div className="flex justify-between pt-2 mt-2 border-t-2 border-gray-800">
                    <span className="text-base font-bold text-gray-900">Total</span>
                    <span className="text-xl font-bold text-gray-900">
                      {formatCurrency(cotizacion.total)}
                    </span>
                  </div>
                ) : (
                  <div className="flex justify-between pt-2 mt-2 border-t border-gray-200">
                    <span className="text-base font-medium text-gray-600">Total</span>
                    <span className="text-xl font-medium text-gray-700">
                      {formatCurrency(cotizacion.total)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ===== NOTES & CONDITIONS ===== */}
          {(cotizacion.notas || cotizacion.condiciones) && (
            <div className="px-10 pb-8 space-y-4">
              <div className="h-px bg-gray-100" />
              {cotizacion.notas && (
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                    Notas
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">
                    {cotizacion.notas}
                  </p>
                </div>
              )}
              {cotizacion.condiciones && (
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                    Terminos y Condiciones
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">
                    {cotizacion.condiciones}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ===== FOOTER ===== */}
          <div
            className="px-10 py-6 rounded-b-lg"
            style={
              plantilla === "moderna"
                ? { backgroundColor: `${color}10` }
                : { backgroundColor: "#f9fafb" }
            }
          >
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-gray-400">
                Cotizacion generada por {empresa.nombre}
                {empresa.web ? ` \u2022 ${empresa.web}` : ""}
              </p>
              <p className="text-[10px] text-gray-400">
                {cotizacion.fechaVencimiento
                  ? `Valida hasta: ${formatDate(cotizacion.fechaVencimiento)}`
                  : `Emitida: ${formatDate(cotizacion.fechaEmision)}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
