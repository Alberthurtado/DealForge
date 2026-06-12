// Builders for activity-log descriptions, localized at write time from the
// company's locale. Stored descriptions are historical; new activity is written
// in the company's current language. Status codes are localized via STATUS map.

export type ActividadLang = "es" | "en";

const STATUS: Record<ActividadLang, Record<string, string>> = {
  es: {
    BORRADOR: "Borrador", ENVIADA: "Enviada", NEGOCIACION: "Negociación",
    GANADA: "Ganada", PERDIDA: "Perdida", EXPIRADA: "Expirada", ARCHIVADA: "Archivada",
    EN_REVISION: "En Revisión", APROBADA: "Aprobada",
  },
  en: {
    BORRADOR: "Draft", ENVIADA: "Sent", NEGOCIACION: "Negotiation",
    GANADA: "Won", PERDIDA: "Lost", EXPIRADA: "Expired", ARCHIVADA: "Archived",
    EN_REVISION: "In Review", APROBADA: "Approved",
  },
};

export function statusLabel(estado: string, lang: ActividadLang): string {
  return STATUS[lang][estado] ?? estado;
}

interface CotizacionActividad {
  creada: () => string;
  approvalRequired: (names: string) => string;
  sentByEmail: (to: string) => string;
  signatureRequested: (name: string, email: string) => string;
  statusChanged: (from: string, to: string) => string;
  versionFrom: (n: number, source: string) => string;
  archivedOnVersion: (n: number) => string;
  versionCreated: (n: number) => string;
  resolvedBy: (action: string, approver: string, comment?: string) => string;
  approvedAction: string;
  rejectedAction: string;
  signedBy: (name: string, email: string) => string;
  wonOnSignature: () => string;
  reminderSeller: (days: number) => string;
  reminderClient: (days: number) => string;
}

interface ContratoActividad {
  createdFromQuote: (numero: string) => string;
  cancelled: (numero: string, motivo: string) => string;
  amendmentCreated: (tipo: string, numero: string, desc: string) => string;
  amendmentAccepted: (tipo: string, desc: string, valor: string) => string;
  amendmentRejected: (tipo: string, desc: string) => string;
  signatureRequested: (name: string, email: string) => string;
  renewed: (months: number, endDate: string) => string;
  signedBy: (name: string, email: string) => string;
  renewedAuto: (months: number, endDate: string) => string;
  pendingRenewal: (days: number) => string;
  expired: (endDate: string) => string;
}

const COT: Record<ActividadLang, CotizacionActividad> = {
  es: {
    creada: () => "Cotización creada",
    approvalRequired: (names) => `Aprobación requerida de: ${names}`,
    sentByEmail: (to) => `Cotización enviada por email a ${to}`,
    signatureRequested: (name, email) => `Firma solicitada a ${name} (${email})`,
    statusChanged: (from, to) => `Estado cambiado de ${from} a ${to}`,
    versionFrom: (n, source) => `Nueva versión v${n} creada desde ${source}`,
    archivedOnVersion: (n) => `Archivada automáticamente al crear versión v${n}`,
    versionCreated: (n) => `Nueva versión v${n} creada`,
    resolvedBy: (action, approver, comment) =>
      `Cotización ${action} por ${approver}${comment ? `: ${comment}` : ""}`,
    approvedAction: "aprobada",
    rejectedAction: "rechazada",
    signedBy: (name, email) => `Cotización firmada por ${name} (${email})`,
    wonOnSignature: () => "Cotización marcada como Ganada automáticamente al recibir firma electrónica",
    reminderSeller: (days) => `Recordatorio de seguimiento enviado al vendedor (${days} días sin actividad)`,
    reminderClient: (days) => `Recordatorio de vencimiento enviado al cliente (${days} días restantes)`,
  },
  en: {
    creada: () => "Quote created",
    approvalRequired: (names) => `Approval required from: ${names}`,
    sentByEmail: (to) => `Quote sent by email to ${to}`,
    signatureRequested: (name, email) => `Signature requested from ${name} (${email})`,
    statusChanged: (from, to) => `Status changed from ${from} to ${to}`,
    versionFrom: (n, source) => `New version v${n} created from ${source}`,
    archivedOnVersion: (n) => `Automatically archived when creating version v${n}`,
    versionCreated: (n) => `New version v${n} created`,
    resolvedBy: (action, approver, comment) =>
      `Quote ${action} by ${approver}${comment ? `: ${comment}` : ""}`,
    approvedAction: "approved",
    rejectedAction: "rejected",
    signedBy: (name, email) => `Quote signed by ${name} (${email})`,
    wonOnSignature: () => "Quote marked as Won automatically on receiving the electronic signature",
    reminderSeller: (days) => `Follow-up reminder sent to the salesperson (${days} days without activity)`,
    reminderClient: (days) => `Expiry reminder sent to the client (${days} days remaining)`,
  },
};

const CON: Record<ActividadLang, ContratoActividad> = {
  es: {
    createdFromQuote: (numero) => `Contrato ${numero} creado a partir de cotización`,
    cancelled: (numero, motivo) => `Contrato ${numero} cancelado. Motivo: ${motivo}`,
    amendmentCreated: (tipo, numero, desc) => `Enmienda (${tipo}) creada para contrato ${numero}: ${desc}`,
    amendmentAccepted: (tipo, desc, valor) => `Enmienda (${tipo}) aceptada: ${desc}. Nuevo valor: ${valor}`,
    amendmentRejected: (tipo, desc) => `Enmienda (${tipo}) rechazada: ${desc}`,
    signatureRequested: (name, email) => `Firma electrónica solicitada a ${name} (${email})`,
    renewed: (months, endDate) => `Contrato renovado por ${months} meses. Nueva fecha de fin: ${endDate}`,
    signedBy: (name, email) => `Contrato firmado por ${name} (${email})`,
    renewedAuto: (months, endDate) => `Contrato renovado automáticamente por ${months} meses. Nueva fecha de fin: ${endDate}`,
    pendingRenewal: (days) => `Contrato cambiado a PENDIENTE_RENOVACION. Vence en ${days} días.`,
    expired: (endDate) => `Contrato expirado. Fecha de fin: ${endDate}`,
  },
  en: {
    createdFromQuote: (numero) => `Contract ${numero} created from a quote`,
    cancelled: (numero, motivo) => `Contract ${numero} cancelled. Reason: ${motivo}`,
    amendmentCreated: (tipo, numero, desc) => `Amendment (${tipo}) created for contract ${numero}: ${desc}`,
    amendmentAccepted: (tipo, desc, valor) => `Amendment (${tipo}) accepted: ${desc}. New value: ${valor}`,
    amendmentRejected: (tipo, desc) => `Amendment (${tipo}) rejected: ${desc}`,
    signatureRequested: (name, email) => `Electronic signature requested from ${name} (${email})`,
    renewed: (months, endDate) => `Contract renewed for ${months} months. New end date: ${endDate}`,
    signedBy: (name, email) => `Contract signed by ${name} (${email})`,
    renewedAuto: (months, endDate) => `Contract automatically renewed for ${months} months. New end date: ${endDate}`,
    pendingRenewal: (days) => `Contract moved to PENDIENTE_RENOVACION. Expires in ${days} days.`,
    expired: (endDate) => `Contract expired. End date: ${endDate}`,
  },
};

export function cotizacionActividad(lang: ActividadLang = "es"): CotizacionActividad {
  return COT[lang] ?? COT.es;
}

export function contratoActividad(lang: ActividadLang = "es"): ContratoActividad {
  return CON[lang] ?? CON.es;
}
