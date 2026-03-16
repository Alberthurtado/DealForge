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
import { FirmaPanel } from "@/components/cotizaciones/firma-panel";
import { LineItemsEditor } from "@/components/cotizaciones/line-items-editor";
import type { LineItemInput } from "@/components/cotizaciones/line-items-editor";
import type { ValidationResult } from "@/lib/reglas-engine";
import { ShieldAlert, ShieldCheck, Lock, GitBranch } from "lucide-react";
import type { PlanFeatures } from "@/lib/plan-limits";

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
  cotizacionOriginalId: string | null;
  cliente: {
    id: string;
    nombre: string;
    email: string | null;
    contactos: Array<{ nombre: string; cargo: string | null; email: string | null; principal: boolean }>;
  };
  lineItems: Array<{
    id: string;
    descripcion: string;
    productoId: string | null;
    varianteId: string | null;
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
  const [planFeatures, setPlanFeatures] = useState<PlanFeatures | null>(null);
  const [firmas, setFirmas] = useState<Array<{
    id: string; signerName: string; signerEmail: string;
    signedAt: string | null; token: string; createdAt: string;
  }>>([]);
  const [versions, setVersions] = useState<Array<{
    id: string; numero: string; version: number; estado: string;
    total: number; moneda: string; createdAt: string;
  }>>([]);
  const [creatingVersion, setCreatingVersion] = useState(false);
  const [editingLineItems, setEditingLineItems] = useState(false);
  const [savingLineItems, setSavingLineItems] = useState(false);
  const [sendingToApprove, setSendingToApprove] = useState(false);

  function loadAprobaciones() {
    fetch(`/api/cotizaciones/${params.id}/aprobaciones`)
      .then((r) => r.json())
      .then(setAprobaciones)
      .catch(() => {});
  }

  function loadFirmas() {
    fetch(`/api/cotizaciones/${params.id}/firma`)
      .then((r) => r.json())
      .then(setFirmas)
      .catch(() => {});
  }

  function loadCotizacion() {
    fetch(`/api/cotizaciones/${params.id}`)
      .then((r) => r.json())
      .then((data) => setCotizacion(data))
      .catch(() => {});
  }

  function loadVersions() {
    fetch(`/api/cotizaciones/${params.id}/version`)
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setVersions(data); })
      .catch(() => {});
  }

  // Load user plan features
  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (data.user?.plan) {
          // Import features dynamically based on plan
          const features: Record<string, PlanFeatures> = {
            starter: { emailEnvio: false, reglasComerciales: false, aprobaciones: false, reglasAvanzadas: false, pdfBranded: false, apiKeys: false, recordatorios: false, firmaElectronica: false },
            pro: { emailEnvio: true, reglasComerciales: true, aprobaciones: false, reglasAvanzadas: false, pdfBranded: true, apiKeys: true, recordatorios: true, firmaElectronica: true },
            business: { emailEnvio: true, reglasComerciales: true, aprobaciones: true, reglasAvanzadas: true, pdfBranded: true, apiKeys: true, recordatorios: true, firmaElectronica: true },
            enterprise: { emailEnvio: true, reglasComerciales: true, aprobaciones: true, reglasAvanzadas: true, pdfBranded: true, apiKeys: true, recordatorios: true, firmaElectronica: true },
          };
          setPlanFeatures(features[data.user.plan] || features.starter);
        }
      })
      .catch(() => {});
  }, []);

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
              productoId: li.productoId || null,
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
    loadFirmas();
    loadVersions();
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
    // Always reload approvals — backend may have created new ones
    loadAprobaciones();
  }

  async function createNewVersion() {
    if (!cotizacion) return;
    setCreatingVersion(true);
    try {
      const res = await fetch(`/api/cotizaciones/${params.id}/version`, { method: "POST" });
      if (res.ok) {
        const newCot = await res.json();
        success(`Versión v${newCot.version} creada`);
        router.push(`/cotizaciones/${newCot.id}`);
      } else {
        const data = await res.json().catch(() => null);
        showError(data?.error || "Error al crear nueva versión");
      }
    } catch {
      showError("Error de conexión");
    } finally {
      setCreatingVersion(false);
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
          productoId: li.productoId || null,
          descripcion: li.descripcion,
          cantidad: li.cantidad,
          precioUnitario: li.precioUnitario,
          descuento: li.descuento,
        })),
      }),
    });
    if (res.ok) {
      const newCot = await res.json();
      success("Cotización duplicada correctamente");
      router.push(`/cotizaciones/${newCot.id}`);
    } else {
      showError("Error al duplicar la cotización");
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
      success("Cotización archivada");
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
      success(`Cotización restaurada a ${previousState}`);
    } else {
      const data = await res.json().catch(() => null);
      showError(data?.error || "Error al desarchivar");
    }
  }

  async function saveLineItems(items: LineItemInput[]) {
    if (!cotizacion) return;
    setSavingLineItems(true);
    try {
      const res = await fetch(`/api/cotizaciones/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lineItems: items.map((item) => ({
            productoId: item.productoId || null,
            varianteId: item.varianteId || null,
            descripcion: item.descripcion,
            cantidad: item.cantidad,
            precioUnitario: item.precioUnitario,
            descuento: item.descuento,
          })),
          descuentoGlobal: cotizacion.descuentoGlobal,
          impuesto: cotizacion.impuesto,
        }),
      });
      if (res.ok) {
        const updated = await res.json();
        setCotizacion(updated);
        setEditingLineItems(false);
        success("Items actualizados correctamente");
        loadAprobaciones();
        // Re-validate rules
        fetch("/api/reglas/validar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lineItems: items.map((item) => ({
              productoId: item.productoId || null,
              descripcion: item.descripcion,
              cantidad: item.cantidad,
              precioUnitario: item.precioUnitario,
              descuento: item.descuento,
            })),
            descuentoGlobal: updated.descuentoGlobal,
            subtotal: updated.subtotal,
            total: updated.total,
          }),
        })
          .then((r) => r.json())
          .then(setValidation)
          .catch(() => {});
      } else {
        const data = await res.json().catch(() => null);
        showError(data?.error || "Error al guardar los items");
      }
    } catch {
      showError("Error de conexión");
    } finally {
      setSavingLineItems(false);
    }
  }

  async function sendToApprove() {
    if (!cotizacion) return;
    setSendingToApprove(true);
    try {
      const res = await fetch(`/api/cotizaciones/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: "ENVIADA" }),
      });
      if (res.ok) {
        const updated = await res.json();
        setCotizacion(updated);
        success("Cotización enviada");
      } else {
        const data = await res.json().catch(() => null);
        if (data?.code === "APPROVAL_REQUIRED") {
          success("Solicitud de aprobación enviada");
        } else {
          showError(data?.error || "Error al enviar");
        }
      }
    } catch {
      showError("Error de conexión");
    } finally {
      setSendingToApprove(false);
      loadAprobaciones();
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
      success("Términos y condiciones guardados");
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
    setEmailSubject(`Cotización ${cotizacion.numero} - ${cotizacion.cliente.nombre}`);
    setEmailBody(
      `<p>Estimado/a ${contactName},</p>` +
      `<p>Le adjuntamos la cotización <strong>${cotizacion.numero}</strong> por un total de <strong>${formatCurrency(cotizacion.total)}</strong>.</p>` +
      (cotizacion.fechaVencimiento
        ? `<p>La cotización tiene validez hasta el ${formatDate(cotizacion.fechaVencimiento)}.</p>`
        : "") +
      `<p>Quedamos a su disposición para cualquier consulta.</p>` +
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
      showError("Error de conexión al enviar email");
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
        title={`${cotizacion.numero}${cotizacion.version > 1 || cotizacion.cotizacionOriginalId ? ` v${cotizacion.version}` : ""}`}
        breadcrumbs={[
          { label: "Cotizaciones", href: "/cotizaciones" },
          { label: cotizacion.numero },
        ]}
        actions={
          <div className="space-y-3">
            {/* Row 1: Document actions */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mr-1">Acciones</span>
              <Link
                href={`/cotizaciones/${params.id}/preview`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-medium hover:bg-primary/90 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                Vista Previa
              </Link>
              {planFeatures?.emailEnvio === false ? (
                <Link
                  href="/configuracion"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-purple-200 bg-purple-50 rounded-lg text-xs font-medium text-purple-600 hover:bg-purple-100 transition-colors"
                  title="Disponible desde el plan Pro"
                >
                  <Lock className="w-3 h-3" />
                  Email
                  <span className="text-[8px] font-bold bg-purple-200 text-purple-700 px-1 py-0.5 rounded uppercase">Pro</span>
                </Link>
              ) : (
                <button
                  onClick={openEmailDialog}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-lg text-xs font-medium hover:bg-muted transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Email
                </button>
              )}
              <button
                onClick={duplicateQuote}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-lg text-xs font-medium hover:bg-muted transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                Duplicar
              </button>
              {["ENVIADA", "NEGOCIACION", "PERDIDA"].includes(cotizacion.estado) && (
                <button
                  onClick={createNewVersion}
                  disabled={creatingVersion}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-violet-200 bg-violet-50 rounded-lg text-xs font-medium text-violet-700 hover:bg-violet-100 transition-colors disabled:opacity-50"
                >
                  <GitBranch className="w-3.5 h-3.5" />
                  {creatingVersion ? "Creando..." : "Nueva Versión"}
                </button>
              )}
              {cotizacion.estado === "ARCHIVADA" ? (
                <button
                  onClick={unarchiveQuote}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-medium hover:bg-primary/90 transition-colors"
                >
                  <ArchiveRestore className="w-3.5 h-3.5" />
                  Desarchivar
                </button>
              ) : (
                <button
                  onClick={archiveQuote}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-300 text-slate-500 rounded-lg text-xs font-medium hover:bg-slate-50 transition-colors"
                >
                  <Archive className="w-3.5 h-3.5" />
                  Archivar
                </button>
              )}
            </div>
            {/* Row 2: Status transitions */}
            {(cotizacion.estado === "BORRADOR" || transitions.length > 0) && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mr-1">Estado</span>
                {/* BORRADOR: approval flow buttons */}
                {cotizacion.estado === "BORRADOR" && (() => {
                  const approvedAll = aprobaciones.length > 0 && aprobaciones.every((a) => a.estado === "APROBADA");
                  const noApprovals = aprobaciones.length === 0;
                  const needsApproval = validation?.aprobacionesRequeridas && validation.aprobacionesRequeridas.length > 0;
                  const canSendDirectly = approvedAll || (noApprovals && !needsApproval);

                  if (canSendDirectly) {
                    return (
                      <button
                        onClick={() => changeStatus("ENVIADA")}
                        disabled={termsBlocked}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-white rounded-lg text-xs font-medium transition-colors bg-blue-600 hover:bg-blue-700 ${termsBlocked ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        <Send className="w-3.5 h-3.5" />
                        Enviar
                      </button>
                    );
                  }

                  if (hasBlockingApprovals) {
                    return (
                      <div className="relative group">
                        <button
                          disabled
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-white rounded-lg text-xs font-medium bg-blue-600 opacity-50 cursor-not-allowed"
                        >
                          <ShieldAlert className="w-3.5 h-3.5" />
                          Enviar
                        </button>
                        <div className="absolute right-0 top-full mt-1 w-64 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                          {rejectedApprovals.length > 0
                            ? `Rechazada por: ${rejectedApprovals.map((a) => a.aprobadorNombre).join(", ")}`
                            : `Pendiente de aprobación de: ${pendingApprovals.map((a) => a.aprobadorNombre).join(", ")}`}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <button
                      onClick={sendToApprove}
                      disabled={sendingToApprove || termsBlocked}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-white rounded-lg text-xs font-medium transition-colors bg-blue-600 hover:bg-blue-700 ${termsBlocked ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {sendingToApprove ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ShieldCheck className="w-3.5 h-3.5" />}
                      {sendingToApprove ? "Enviando..." : "Enviar a Aprobar"}
                    </button>
                  );
                })()}
                {/* Non-BORRADOR transitions */}
                {transitions.map((t) => (
                  <button
                    key={t.estado}
                    onClick={() => changeStatus(t.estado)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-white rounded-lg text-xs font-medium transition-colors ${t.color}`}
                  >
                    <t.icon className="w-3.5 h-3.5" />
                    {t.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        }
      />

      <div className="p-6 space-y-6">
        {/* Expiration alert */}
        {isExpired && (
          <div className="flex items-center gap-3 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800">
            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium">Cotización vencida</p>
              <p className="text-xs text-amber-600">
                Esta cotización venció el{" "}
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
                {rejectedApprovals.length > 0 ? "Aprobación rechazada" : "Pendiente de aprobación"}
              </p>
              <p className="text-xs mt-0.5">
                {rejectedApprovals.length > 0
                  ? `Rechazada por ${rejectedApprovals.map((a) => a.aprobadorNombre).join(", ")}. No se puede enviar esta cotización.`
                  : `Esperando aprobación de ${pendingApprovals.map((a) => a.aprobadorNombre).join(", ")} antes de enviar.`}
              </p>
            </div>
          </div>
        )}

        {/* Terms missing alert */}
        {termsBlocked && (
          <div className="flex items-center gap-3 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800">
            <FileText className="w-5 h-5 text-amber-500 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium">Faltan términos y condiciones</p>
              <p className="text-xs text-amber-600">
                Debes agregar términos y condiciones antes de poder enviar esta cotización.
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
              <p className="text-sm font-medium">Cotización archivada</p>
              <p className="text-xs text-slate-500">
                Esta cotización ha sido archivada y no aparece en las métricas del negocio.
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

        {/* Rule warnings — only shown for plans with reglas */}
        {planFeatures?.reglasComerciales !== false && validation && !validation.valido && (
          <ReglasWarnings
            violaciones={validation.violaciones}
            aprobacionesRequeridas={validation.aprobacionesRequeridas}
            promocionesAplicables={validation.promocionesAplicables}
            aprobacionesExistentes={aprobaciones}
          />
        )}
        {planFeatures?.reglasComerciales !== false && validation?.promocionesAplicables && validation.promocionesAplicables.length > 0 && validation.valido && (
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
            <p className="text-xs text-muted-foreground mb-1">Fecha Emisión</p>
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
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold">Detalle</h3>
                {cotizacion.estado === "BORRADOR" && !editingLineItems && (
                  <button
                    onClick={() => setEditingLineItems(true)}
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Pencil className="w-3 h-3" />
                    Editar
                  </button>
                )}
              </div>
              {editingLineItems ? (
                <LineItemsEditor
                  initialItems={cotizacion.lineItems.map((li) => ({
                    productoId: li.productoId || "",
                    varianteId: li.varianteId || li.variante?.id || undefined,
                    descripcion: li.descripcion,
                    cantidad: li.cantidad,
                    precioUnitario: li.precioUnitario,
                    descuento: li.descuento,
                  }))}
                  descuentoGlobal={cotizacion.descuentoGlobal}
                  impuesto={cotizacion.impuesto}
                  moneda={cotizacion.moneda}
                  onSave={saveLineItems}
                  onCancel={() => setEditingLineItems(false)}
                  saving={savingLineItems}
                />
              ) : (
              <>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="text-left py-2 font-medium">Descripción</th>
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
                {cotizacion.impuesto > 0 ? (
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
                ) : (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground italic">IVA no incluido</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                  <span>Total</span>
                  <span>{formatCurrency(cotizacion.total)}</span>
                </div>
              </div>
              </>
              )}
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
                  Términos y Condiciones
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
                  Sin términos y condiciones
                </p>
              )}
            </div>
          </div>

          {/* Sidebar - Timeline + Approvals */}
          <div className="space-y-6">
            <CotizacionTimeline actividades={cotizacion.actividades} />
            {planFeatures?.aprobaciones === false ? (
              <div className="rounded-xl border border-purple-200 bg-purple-50 p-4 text-center">
                <Lock className="w-5 h-5 text-purple-500 mx-auto mb-2" />
                <p className="text-xs font-semibold text-purple-800">Aprobaciones</p>
                <p className="text-[11px] text-purple-600 mt-1 mb-3">
                  Los flujos de aprobación están disponibles desde el plan Business.
                </p>
                <Link
                  href="/configuracion"
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-600 text-white rounded-lg text-xs font-medium hover:bg-purple-700 transition-colors"
                >
                  Ver plan Business
                </Link>
              </div>
            ) : (
              <AprobacionPanel
                cotizacionId={cotizacion.id}
                aprobaciones={aprobaciones}
                onUpdate={loadAprobaciones}
              />
            )}
            {/* Firma Electrónica */}
            {planFeatures?.firmaElectronica === false ? (
              <div className="rounded-xl border border-purple-200 bg-purple-50 p-4 text-center">
                <Lock className="w-5 h-5 text-purple-500 mx-auto mb-2" />
                <p className="text-xs font-semibold text-purple-800">Firma Electrónica</p>
                <p className="text-[11px] text-purple-600 mt-1 mb-3">
                  La firma electrónica está disponible desde el plan Pro.
                </p>
                <Link
                  href="/configuracion"
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-600 text-white rounded-lg text-xs font-medium hover:bg-purple-700 transition-colors"
                >
                  Ver plan Pro
                </Link>
              </div>
            ) : (
              <FirmaPanel
                cotizacionId={cotizacion.id}
                firmas={firmas}
                canRequest={["ENVIADA", "NEGOCIACION"].includes(cotizacion.estado)}
                onUpdate={() => { loadFirmas(); loadCotizacion(); }}
                defaultContact={(() => {
                  const principal = cotizacion.cliente.contactos?.find((c) => c.principal);
                  return {
                    nombre: principal?.nombre || cotizacion.contactoNombre || cotizacion.cliente.nombre,
                    email: principal?.email || cotizacion.cliente.email || null,
                  };
                })()}
              />
            )}
            {/* Version history */}
            {versions.length > 1 && (
              <div className="bg-white rounded-xl border border-border p-5">
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-violet-500" />
                  Historial de Versiones
                </h3>
                <div className="space-y-2">
                  {versions.map((v) => {
                    const isCurrent = v.id === cotizacion.id;
                    return (
                      <Link
                        key={v.id}
                        href={isCurrent ? "#" : `/cotizaciones/${v.id}`}
                        className={`block p-2.5 rounded-lg border transition-colors ${
                          isCurrent
                            ? "border-violet-200 bg-violet-50"
                            : "border-border hover:border-violet-200 hover:bg-violet-50/50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                              isCurrent ? "bg-violet-200 text-violet-700" : "bg-gray-100 text-gray-600"
                            }`}>
                              v{v.version}
                            </span>
                            <span className="text-xs font-medium text-foreground truncate">{v.numero}</span>
                          </div>
                          <CotizacionStatusBadge estado={v.estado} />
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-[10px] text-muted-foreground">
                            {formatDate(v.createdAt)}
                          </span>
                          <span className="text-[10px] font-medium text-foreground">
                            {formatCurrency(v.total)}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
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
                Enviar Cotización por Email
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
                Se adjuntará el PDF de la cotización {cotizacion.numero} automáticamente
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
