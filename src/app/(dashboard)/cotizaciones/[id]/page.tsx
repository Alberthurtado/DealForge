"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { CotizacionStatusBadge } from "@/components/cotizaciones/cotizacion-status-badge";
import { CotizacionTimeline } from "@/components/cotizaciones/cotizacion-timeline";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Copy,
  Send,
  Trophy,
  XCircle,
  FileText,
  Building2,
  User,
  Eye,
  AlertTriangle,
  Mail,
  X,
  Loader2,
  Archive,
  ArchiveRestore,
  Save,
  Pencil,
} from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/toast";
import { ReglasWarnings } from "@/components/reglas/reglas-warnings";
import { AprobacionPanel } from "@/components/reglas/aprobacion-panel";
import type { ValidationResult } from "@/lib/reglas-engine";
import { ShieldAlert } from "lucide-react";

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
    contactos: Array<{ nombre: string; cargo: string | null; email: string | null; principal: boolean }>;
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
  actividades: Array<{
    id: string;
    tipo: string;
    descripcion: string;
    estadoAnterior: string | null;
    estadoNuevo: string | null;
    createdAt: string;
  }>;
}

const statusTransitions: Record<string, Array<{ estado: string; label: string; icon: typeof Send; color: string }>> = {
  BORRADOR: [
    { estado: "ENVIADA", label: "Enviar", icon: Send, color: "bg-blue-600 hover:bg-blue-700" },
  ],
  ENVIADA: [
    { estado: "NEGOCIACION", label: "Negociando", icon: FileText, color: "bg-amber-600 hover:bg-amber-700" },
    { estado: "GANADA", label: "Ganada", icon: Trophy, color: "bg-green-600 hover:bg-green-700" },
    { estado: "PERDIDA", label: "Perdida", icon: XCircle, color: "bg-red-600 hover:bg-red-700" },
  ],
  NEGOCIACION: [
    { estado: "GANADA", label: "Ganada", icon: Trophy, color: "bg-green-600 hover:bg-green-700" },
    { estado: "PERDIDA", label: "Perdida", icon: XCircle, color: "bg-red-600 hover:bg-red-700" },
    { estado: "ENVIADA", label: "Re-enviar", icon: Send, color: "bg-blue-600 hover:bg-blue-700" },
  ],
};

export default function CotizacionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { success, error: showError } = useToast();
  const [cotizacion, setCotizacion] = useState<Cotizacion | null>(null);
  const [loading, setLoading] = useState(true);
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [aprobaciones, setAprobaciones] = useState<Array<{
    id: string; reglaId: string; aprobadorNombre: string; aprobadorEmail: string;
    estado: string; comentario: string | null; respondidoAt: string | null; createdAt: string;
    token?: string | null; emailEnviadoAt?: string | null;
  }>>([]);

  function loadAprobaciones() {
    fetch(`/api/cotizaciones/${params.id}/aprobaciones`)
      .then((r) => r.json())
      .then(setAprobaciones)
      .catch(() => {});
  }

  useEffect(() => {
    fetch(`/api/cotizaciones/${params.id}`)
      .then((r) => r.json())
      .then((data) => {
        setCotizacion(data);
        setLoading(false);

        // Validate against rules
        fetch("/api/reglas/validar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lineItems: data.lineItems.map((li: Cotizacion["lineItems"][0]) => ({
              productoId: li.producto ? undefined : null,
              descripcion: li.descripcion,
              cantidad: li.cantidad,
              precioUnitario: li.precioUnitario,
              descuento: li.descuento,
            })),
            descuentoGlobal: data.descuentoGlobal,
            subtotal: data.subtotal,
            total: data.total,
          }),
        })
          .then((r) => r.json())
          .then(setValidation)
          .catch(() => {});
      });
    loadAprobaciones();
  }, [params.id]);

  async function changeStatus(newEstado: string) {
    const res = await fetch(`/api/cotizaciones/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado: newEstado }),
    });
    if (res.ok) {
      const updated = await res.json();
      setCotizacion(updated);
      success(`Estado cambiado a ${newEstado}`);
    } else {
      const data = await res.json().catch(() => null);
      showError(data?.error || "Error al cambiar el estado");
    }
  }

  async function duplicateQuote() {
    if (!cotizacion) return;
    const res = await fetch("/api/cotizaciones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clienteId: cotizacion.cliente.id,
        contactoNombre: cotizacion.contactoNombre,
        descuentoGlobal: cotizacion.descuentoGlobal,
        impuesto: cotizacion.impuesto,
        moneda: cotizacion.moneda,
        notas: `Duplicada de ${cotizacion.numero}`,
        condiciones: cotizacion.condiciones,
        lineItems: cotizacion.lineItems.map((li) => ({
          productoId: li.producto ? undefined : null,
          descripcion: li.descripcion,
          cantidad: li.cantidad,
          precioUnitario: li.precioUnitario,
          descuento: li.descuento,
        })),
      }),
    });
    if (res.ok) {
      const newCot = await res.json();
      success("Cotizacion duplicada correctamente");
      router.push(`/cotizaciones/${newCot.id}`);
    } else {
      showError("Error al duplicar la cotizacion");
    }
  }

  async function archiveQuote() {
    if (!cotizacion) return;
    const res = await fetch(`/api/cotizaciones/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado: "ARCHIVADA" }),
    });
    if (res.ok) {
      const updated = await res.json();
      setCotizacion(updated);
      success("Cotizacion archivada");
    } else {
      const data = await res.json().catch(() => null);
      showError(data?.error || "Error al archivar");
    }
  }

  async function unarchiveQuote() {
    if (!cotizacion) return;
    // Find the previous state from activity log
    const archiveActivity = cotizacion.actividades.find(
      (a) => a.tipo === "ESTADO_CAMBIADO" && a.estadoNuevo === "ARCHIVADA"
    );
    const previousState = archiveActivity?.estadoAnterior || "BORRADOR";
    const res = await fetch(`/api/cotizaciones/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado: previousState }),
    });
    if (res.ok) {
      const updated = await res.json();
      setCotizacion(updated);
      success(`Cotizacion restaurada a ${previousState}`);
    } else {
      const data = await res.json().catch(() => null);
      showError(data?.error || "Error al desarchivar");
    }
  }

  // Inline condiciones editing
  const [editingCondiciones, setEditingCondiciones] = useState(false);
  const [condicionesEdit, setCondicionesEdit] = useState("");

  async function saveCondiciones() {
    const res = await fetch(`/api/cotizaciones/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ condiciones: condicionesEdit }),
    });
    if (res.ok) {
      const updated = await res.json();
      setCotizacion(updated);
      setEditingCondiciones(false);
      success("Terminos y condiciones guardados");
    } else {
      showError("Error al guardar");
    }
  }

  // Email dialog state
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [emailTo, setEmailTo] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);

  function openEmailDialog() {
    if (!cotizacion) return;
    // Find principal contact email
    const principal = cotizacion.cliente.contactos?.find((c) => c.principal);
    const contactEmail = principal?.email || cotizacion.cliente.email || "";
    const contactName = principal?.nombre || cotizacion.contactoNombre || cotizacion.cliente.nombre;

    setEmailTo(contactEmail);
    setEmailSubject(`Cotizacion ${cotizacion.numero} - ${cotizacion.cliente.nombre}`);
    setEmailBody(
      `<p>Estimado/a ${contactName},</p>` +
      `<p>Le adjuntamos la cotizacion <strong>${cotizacion.numero}</strong> por un total de <strong>${formatCurrency(cotizacion.total)}</strong>.</p>` +
      (cotizacion.fechaVencimiento
        ? `<p>La cotizacion tiene validez hasta el ${formatDate(cotizacion.fechaVencimiento)}.</p>`
        : "") +
      `<p>Quedamos a su disposicion para cualquier consulta.</p>` +
      `<p>Saludos cordiales</p>`
    );
    setEmailDialogOpen(true);
  }

  async function handleSendEmail() {
    if (!emailTo || !emailSubject) return;
    setSendingEmail(true);
    try {
      const res = await fetch(`/api/cotizaciones/${params.id}/email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: emailTo,
          subject: emailSubject,
          htmlBody: emailBody,
        }),
      });
      if (res.ok) {
        success("Email enviado correctamente");
        setEmailDialogOpen(false);
        // Refresh to show new activity
        const updated = await fetch(`/api/cotizaciones/${params.id}`).then((r) => r.json());
        setCotizacion(updated);
      } else {
        const data = await res.json();
        showError(data.error || "Error al enviar el email");
      }
    } catch {
      showError("Error de conexion al enviar email");
    } finally {
      setSendingEmail(false);
    }
  }

  if (loading || !cotizacion) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-muted rounded" />
          <div className="h-64 bg-muted rounded-xl" />
        </div>
      </div>
    );
  }

  const transitions = statusTransitions[cotizacion.estado] || [];

  // Check if approvals block sending
  const pendingApprovals = aprobaciones.filter((a) => a.estado === "PENDIENTE");
  const rejectedApprovals = aprobaciones.filter((a) => a.estado === "RECHAZADA");
  const hasBlockingApprovals = pendingApprovals.length > 0 || rejectedApprovals.length > 0;
  const termsBlocked = cotizacion.estado === "BORRADOR" && !cotizacion.condiciones?.trim();
  const sendBlocked = cotizacion.estado === "BORRADOR" && (hasBlockingApprovals || termsBlocked);

  const isExpired =
    cotizacion.fechaVencimiento &&
    new Date(cotizacion.fechaVencimiento) < new Date() &&
    !["GANADA", "PERDIDA", "ARCHIVADA"].includes(cotizacion.estado);

  return (
    <div>
      <PageHeader
        title={cotizacion.numero}
        breadcrumbs={[
          { label: "Cotizaciones", href: "/cotizaciones" },
          { label: cotizacion.numero },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Link
              href={`/cotizaciones/${params.id}/preview`}
              className="inline-flex items-center gap-2 px-3 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <Eye className="w-4 h-4" />
              Vista Previa
            </Link>
            <button
              onClick={openEmailDialog}
              className="inline-flex items-center gap-2 px-3 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
            >
              <Mail className="w-4 h-4" />
              Enviar Email
            </button>
            <button
              onClick={duplicateQuote}
              className="inline-flex items-center gap-2 px-3 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
            >
              <Copy className="w-4 h-4" />
              Duplicar
            </button>
            {cotizacion.estado === "ARCHIVADA" ? (
              <button
                onClick={unarchiveQuote}
                className="inline-flex items-center gap-2 px-3 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                <ArchiveRestore className="w-4 h-4" />
                Desarchivar
              </button>
            ) : (
              <button
                onClick={archiveQuote}
                className="inline-flex items-center gap-2 px-3 py-2 border border-slate-300 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
              >
                <Archive className="w-4 h-4" />
                Archivar
              </button>
            )}
            {transitions.map((t) => {
              const blocked = t.estado === "ENVIADA" && sendBlocked;
              return (
                <div key={t.estado} className="relative group">
                  <button
                    onClick={() => changeStatus(t.estado)}
                    disabled={blocked}
                    className={`inline-flex items-center gap-2 px-3 py-2 text-white rounded-lg text-sm font-medium transition-colors ${t.color} ${blocked ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {blocked ? <ShieldAlert className="w-4 h-4" /> : <t.icon className="w-4 h-4" />}
                    {t.label}
                  </button>
                  {blocked && (
                    <div className="absolute right-0 top-full mt-1 w-64 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                      {termsBlocked && "Faltan terminos y condiciones. "}
                      {rejectedApprovals.length > 0
                        ? `Rechazada por: ${rejectedApprovals.map((a) => a.aprobadorNombre).join(", ")}`
                        : pendingApprovals.length > 0
                        ? `Pendiente de aprobacion de: ${pendingApprovals.map((a) => a.aprobadorNombre).join(", ")}`
                        : ""}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        }
      />

      <div className="p-6 space-y-6">
        {/* Expiration alert */}
        {isExpired && (
          <div className="flex items-center gap-3 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800">
            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium">Cotizacion vencida</p>
              <p className="text-xs text-amber-600">
                Esta cotizacion vencio el{" "}
                {formatDate(cotizacion.fechaVencimiento!)}. Considera duplicarla
                con nuevas fechas.
              </p>
            </div>
          </div>
        )}

        {/* Approval blocking alert */}
        {cotizacion.estado === "BORRADOR" && hasBlockingApprovals && (
          <div className={`flex items-center gap-3 px-4 py-3 rounded-xl ${rejectedApprovals.length > 0 ? "bg-red-50 border border-red-200 text-red-800" : "bg-amber-50 border border-amber-200 text-amber-800"}`}>
            <ShieldAlert className={`w-5 h-5 flex-shrink-0 ${rejectedApprovals.length > 0 ? "text-red-500" : "text-amber-500"}`} />
            <div>
              <p className="text-sm font-medium">
                {rejectedApprovals.length > 0 ? "Aprobacion rechazada" : "Pendiente de aprobacion"}
              </p>
              <p className="text-xs mt-0.5">
                {rejectedApprovals.length > 0
                  ? `Rechazada por ${rejectedApprovals.map((a) => a.aprobadorNombre).join(", ")}. No se puede enviar esta cotizacion.`
                  : `Esperando aprobacion de ${pendingApprovals.map((a) => a.aprobadorNombre).join(", ")} antes de enviar.`}
              </p>
            </div>
          </div>
        )}

        {/* Terms missing alert */}
        {termsBlocked && (
          <div className="flex items-center gap-3 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800">
            <FileText className="w-5 h-5 text-amber-500 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium">Faltan terminos y condiciones</p>
              <p className="text-xs text-amber-600">
                Debes agregar terminos y condiciones antes de poder enviar esta cotizacion.
              </p>
            </div>
            <button
              onClick={() => {
                setCondicionesEdit(cotizacion.condiciones || "");
                setEditingCondiciones(true);
                document.getElementById("condiciones-section")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-amber-300 rounded-lg hover:bg-amber-50 transition-colors text-amber-700"
            >
              <Pencil className="w-3.5 h-3.5" />
              Agregar
            </button>
          </div>
        )}

        {/* Archived banner */}
        {cotizacion.estado === "ARCHIVADA" && (
          <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700">
            <Archive className="w-5 h-5 text-slate-400 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium">Cotizacion archivada</p>
              <p className="text-xs text-slate-500">
                Esta cotizacion ha sido archivada y no aparece en las metricas del negocio.
              </p>
            </div>
            <button
              onClick={unarchiveQuote}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <ArchiveRestore className="w-3.5 h-3.5" />
              Desarchivar
            </button>
          </div>
        )}

        {/* Rule warnings */}
        {validation && !validation.valido && (
          <ReglasWarnings
            violaciones={validation.violaciones}
            aprobacionesRequeridas={validation.aprobacionesRequeridas}
            promocionesAplicables={validation.promocionesAplicables}
          />
        )}
        {validation?.promocionesAplicables && validation.promocionesAplicables.length > 0 && validation.valido && (
          <ReglasWarnings
            violaciones={[]}
            aprobacionesRequeridas={[]}
            promocionesAplicables={validation.promocionesAplicables}
          />
        )}

        {/* Header info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-border p-4">
            <p className="text-xs text-muted-foreground mb-1">Estado</p>
            <CotizacionStatusBadge estado={cotizacion.estado} />
          </div>
          <div className="bg-white rounded-xl border border-border p-4">
            <p className="text-xs text-muted-foreground mb-1">Total</p>
            <p className="text-xl font-bold">{formatCurrency(cotizacion.total)}</p>
          </div>
          <div className="bg-white rounded-xl border border-border p-4">
            <p className="text-xs text-muted-foreground mb-1">Fecha Emision</p>
            <p className="text-sm font-medium">{formatDate(cotizacion.fechaEmision)}</p>
          </div>
          <div className="bg-white rounded-xl border border-border p-4">
            <p className="text-xs text-muted-foreground mb-1">Vencimiento</p>
            <p className="text-sm font-medium">
              {cotizacion.fechaVencimiento
                ? formatDate(cotizacion.fechaVencimiento)
                : "Sin fecha"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Client info */}
            <div className="bg-white rounded-xl border border-border p-6">
              <h3 className="text-base font-semibold mb-3">Cliente</h3>
              <Link
                href={`/clientes/${cotizacion.cliente.id}`}
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium group-hover:text-primary transition-colors">
                    {cotizacion.cliente.nombre}
                  </p>
                  {cotizacion.contactoNombre && (
                    <p className="text-sm text-muted-foreground">
                      Contacto: {cotizacion.contactoNombre}
                    </p>
                  )}
                </div>
              </Link>
            </div>

            {/* Line items */}
            <div className="bg-white rounded-xl border border-border p-6">
              <h3 className="text-base font-semibold mb-3">Detalle</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="text-left py-2 font-medium">Descripcion</th>
                    <th className="text-right py-2 font-medium">Cant.</th>
                    <th className="text-right py-2 font-medium">Precio</th>
                    <th className="text-right py-2 font-medium">Dto.</th>
                    <th className="text-right py-2 font-medium">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cotizacion.lineItems.map((item) => {
                    const varAttrs = item.variante?.atributos
                      ? (() => { try { return JSON.parse(item.variante.atributos); } catch { return {}; } })()
                      : {};
                    return (
                    <tr key={item.id} className="border-b border-border">
                      <td className="py-3">
                        <p className="font-medium">{item.descripcion}</p>
                        {item.producto && (
                          <p className="text-xs text-muted-foreground">
                            SKU: {item.variante?.sku || item.producto.sku}
                          </p>
                        )}
                        {Object.keys(varAttrs).length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {Object.entries(varAttrs).map(([k, v]) => (
                              <span key={k} className="inline-flex px-1.5 py-0.5 text-[10px] bg-primary/10 text-primary rounded">
                                {k}: {v as string}
                              </span>
                            ))}
                          </div>
                        )}
                      </td>
                      <td className="text-right py-3">{item.cantidad}</td>
                      <td className="text-right py-3">
                        {formatCurrency(item.precioUnitario)}
                      </td>
                      <td className="text-right py-3">
                        {item.descuento > 0 ? `${item.descuento}%` : "-"}
                      </td>
                      <td className="text-right py-3 font-medium">
                        {formatCurrency(item.total)}
                      </td>
                    </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Totals */}
              <div className="mt-4 pt-4 border-t border-border space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency(cotizacion.subtotal)}</span>
                </div>
                {cotizacion.descuentoGlobal > 0 && (
                  <div className="flex justify-between text-sm text-red-600">
                    <span>Descuento ({cotizacion.descuentoGlobal}%)</span>
                    <span>
                      -
                      {formatCurrency(
                        cotizacion.subtotal * (cotizacion.descuentoGlobal / 100)
                      )}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    IVA ({cotizacion.impuesto}%)
                  </span>
                  <span>
                    {formatCurrency(
                      cotizacion.subtotal *
                        (1 - cotizacion.descuentoGlobal / 100) *
                        (cotizacion.impuesto / 100)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                  <span>Total</span>
                  <span>{formatCurrency(cotizacion.total)}</span>
                </div>
              </div>
            </div>

            {/* Notes */}
            {cotizacion.notas && (
              <div className="bg-white rounded-xl border border-border p-6">
                <h4 className="text-sm font-semibold mb-1">Notas</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {cotizacion.notas}
                </p>
              </div>
            )}

            {/* Terms & Conditions - always shown */}
            <div id="condiciones-section" className={`bg-white rounded-xl border p-6 ${!cotizacion.condiciones?.trim() ? "border-amber-200" : "border-border"}`}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-primary" />
                  Terminos y Condiciones
                </h4>
                {["BORRADOR", "NEGOCIACION"].includes(cotizacion.estado) && !editingCondiciones && (
                  <button
                    onClick={() => {
                      setCondicionesEdit(cotizacion.condiciones || "");
                      setEditingCondiciones(true);
                    }}
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Pencil className="w-3 h-3" />
                    Editar
                  </button>
                )}
              </div>
              {editingCondiciones ? (
                <div className="space-y-2">
                  <textarea
                    value={condicionesEdit}
                    onChange={(e) => setCondicionesEdit(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-white resize-none"
                    rows={5}
                    placeholder="Condiciones de pago, entrega, validez..."
                    autoFocus
                  />
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => setEditingCondiciones(false)}
                      className="px-3 py-1.5 text-xs font-medium border border-border rounded-lg hover:bg-muted transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={saveCondiciones}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      <Save className="w-3 h-3" />
                      Guardar
                    </button>
                  </div>
                </div>
              ) : cotizacion.condiciones ? (
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {cotizacion.condiciones}
                </p>
              ) : (
                <p className="text-sm text-amber-500 italic">
                  Sin terminos y condiciones
                </p>
              )}
            </div>
          </div>

          {/* Sidebar - Timeline + Approvals */}
          <div className="space-y-6">
            <CotizacionTimeline actividades={cotizacion.actividades} />
            <AprobacionPanel
              cotizacionId={cotizacion.id}
              aprobaciones={aprobaciones}
              onUpdate={loadAprobaciones}
            />
          </div>
        </div>
      </div>

      {/* Email Dialog */}
      {emailDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h3 className="text-base font-semibold flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                Enviar Cotizacion por Email
              </h3>
              <button
                onClick={() => setEmailDialogOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  Para
                </label>
                <input
                  type="email"
                  value={emailTo}
                  onChange={(e) => setEmailTo(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-white"
                  placeholder="email@cliente.com"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  Asunto
                </label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  Mensaje
                </label>
                <textarea
                  value={emailBody.replace(/<\/?[^>]+(>|$)/g, (tag) => {
                    if (tag === "<p>") return "";
                    if (tag === "</p>") return "\n";
                    if (tag.startsWith("<strong>")) return "";
                    if (tag === "</strong>") return "";
                    return "";
                  }).trim()}
                  onChange={(e) => {
                    const lines = e.target.value.split("\n").filter(Boolean);
                    setEmailBody(lines.map((l) => `<p>${l}</p>`).join(""));
                  }}
                  rows={6}
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-white resize-none"
                />
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground bg-gray-50 rounded-lg px-3 py-2">
                <FileText className="w-4 h-4 text-primary flex-shrink-0" />
                Se adjuntara el PDF de la cotizacion {cotizacion.numero} automaticamente
              </div>
            </div>
            <div className="flex justify-end gap-2 px-6 py-4 border-t border-border">
              <button
                onClick={() => setEmailDialogOpen(false)}
                className="px-4 py-2 text-sm font-medium border border-border rounded-lg hover:bg-muted transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSendEmail}
                disabled={sendingEmail || !emailTo}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {sendingEmail ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Enviar
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
