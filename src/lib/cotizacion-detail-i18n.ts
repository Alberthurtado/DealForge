// Translations for the cotización detail page (the largest dashboard screen).
// Kept in its own file so dashboard-i18n.ts stays manageable. Default Spanish.

import type { DashboardLang } from "@/lib/dashboard-i18n";

export const DETAIL_STRINGS: Record<DashboardLang, {
  // toasts / messages
  errChangeStatus: string;
  errNewVersion: string;
  errConnection: string;
  quoteDuplicated: string;
  errDuplicate: string;
  errArchive: string;
  errUnarchive: string;
  remindersSilenced: string;
  remindersReactivated: string;
  errUpdateReminders: string;
  itemsUpdated: string;
  errSaveItems: string;
  errSend: string;
  termsSaved: string;
  errSave: string;
  contractCreated: string;
  errCreateContract: string;
  defaultTermsApplied: string;
  emailSent: string;
  errSendEmail: string;
  errSendEmailConn: string;
  // email composition
  emailSubject: (numero: string, cliente: string) => string;
  emailGreeting: (name: string) => string;
  emailBody1: (numero: string, total: string) => string;
  emailValidUntil: (date: string) => string;
  emailClosing1: string;
  emailClosing2: string;
  // header actions
  quotesBreadcrumb: string;
  actions: string;
  preview: string;
  email: string;
  proPlanTitle: string;
  duplicate: string;
  remindersSilencedTitle: string;
  remindersSilenceTitle: string;
  silenced: string;
  reminders: string;
  createContract: string;
  contract: string;
  creating: string;
  newVersion: string;
  unarchive: string;
  archive: string;
  statusLabel: string;
  send: string;
  sending: string;
  sendToApprove: string;
  rejectedBy: (names: string) => string;
  pendingApprovalFrom: (names: string) => string;
  transitions: Record<string, string>;
  // alerts
  quoteExpired: string;
  expiredOn: (date: string) => string;
  approvalRejected: string;
  pendingApproval: string;
  rejectedByCannotSend: (names: string) => string;
  waitingApprovalBeforeSend: (names: string) => string;
  termsMissing: string;
  termsMissingDesc: string;
  add: string;
  quoteArchived: string;
  quoteArchivedDesc: string;
  // info cards + line items
  status: string;
  total: string;
  issueDate: string;
  dueDate: string;
  noDate: string;
  client: string;
  contactColon: string;
  detail: string;
  edit: string;
  colDescription: string;
  colQty: string;
  colPrice: string;
  colDiscount: string;
  colTotal: string;
  subtotal: string;
  discount: string;
  vat: string;
  vatNotIncluded: string;
  notes: string;
  // terms
  terms: string;
  termsPlaceholder: string;
  cancel: string;
  save: string;
  noTerms: string;
  applyDefaultTerms: string;
  // sidebar gates + versions
  approvals: string;
  approvalsBusinessDesc: string;
  viewBusinessPlan: string;
  eSignature: string;
  eSignatureProDesc: string;
  viewProPlan: string;
  versionHistory: string;
  // SMTP hint + email dialog
  emailNotConfigured: string;
  emailNotConfiguredDesc: string;
  emailNotConfiguredHint1: string;
  emailNotConfiguredHint2: string;
  later: string;
  configureNow: string;
  sendQuoteByEmail: string;
  to: string;
  subject: string;
  message: string;
  pdfAttached: (numero: string) => string;
}> = {
  es: {
    errChangeStatus: "Error al cambiar el estado",
    errNewVersion: "Error al crear nueva versión",
    errConnection: "Error de conexión",
    quoteDuplicated: "Cotización duplicada correctamente",
    errDuplicate: "Error al duplicar la cotización",
    errArchive: "Error al archivar",
    errUnarchive: "Error al desarchivar",
    remindersSilenced: "Recordatorios silenciados para esta cotización",
    remindersReactivated: "Recordatorios reactivados",
    errUpdateReminders: "Error al actualizar recordatorios",
    itemsUpdated: "Items actualizados correctamente",
    errSaveItems: "Error al guardar los items",
    errSend: "Error al enviar",
    termsSaved: "Términos y condiciones guardados",
    errSave: "Error al guardar",
    contractCreated: "Contrato creado correctamente",
    errCreateContract: "Error al crear contrato",
    defaultTermsApplied: "Condiciones por defecto aplicadas",
    emailSent: "Email enviado correctamente",
    errSendEmail: "Error al enviar el email",
    errSendEmailConn: "Error de conexión al enviar email",
    emailSubject: (n, c) => `Cotización ${n} - ${c}`,
    emailGreeting: (name) => `Estimado/a ${name},`,
    emailBody1: (n, total) => `Le adjuntamos la cotización <strong>${n}</strong> por un total de <strong>${total}</strong>.`,
    emailValidUntil: (date) => `La cotización tiene validez hasta el ${date}.`,
    emailClosing1: "Quedamos a su disposición para cualquier consulta.",
    emailClosing2: "Saludos cordiales",
    quotesBreadcrumb: "Cotizaciones",
    actions: "Acciones",
    preview: "Vista Previa",
    email: "Email",
    proPlanTitle: "Disponible desde el plan Pro",
    duplicate: "Duplicar",
    remindersSilencedTitle: "Recordatorios silenciados — haz clic para reactivar",
    remindersSilenceTitle: "Silenciar los recordatorios automáticos para esta cotización",
    silenced: "Silenciada",
    reminders: "Recordatorios",
    createContract: "Crear Contrato",
    contract: "Contrato",
    creating: "Creando...",
    newVersion: "Nueva Versión",
    unarchive: "Desarchivar",
    archive: "Archivar",
    statusLabel: "Estado",
    send: "Enviar",
    sending: "Enviando...",
    sendToApprove: "Enviar a Aprobar",
    rejectedBy: (names) => `Rechazada por: ${names}`,
    pendingApprovalFrom: (names) => `Pendiente de aprobación de: ${names}`,
    transitions: { NEGOCIACION: "Negociando", GANADA: "Ganada", PERDIDA: "Perdida", ENVIADA: "Re-enviar" },
    quoteExpired: "Cotización vencida",
    expiredOn: (date) => `Esta cotización venció el ${date}. Considera duplicarla con nuevas fechas.`,
    approvalRejected: "Aprobación rechazada",
    pendingApproval: "Pendiente de aprobación",
    rejectedByCannotSend: (names) => `Rechazada por ${names}. No se puede enviar esta cotización.`,
    waitingApprovalBeforeSend: (names) => `Esperando aprobación de ${names} antes de enviar.`,
    termsMissing: "Faltan términos y condiciones",
    termsMissingDesc: "Debes agregar términos y condiciones antes de poder enviar esta cotización.",
    add: "Agregar",
    quoteArchived: "Cotización archivada",
    quoteArchivedDesc: "Esta cotización ha sido archivada y no aparece en las métricas del negocio.",
    status: "Estado",
    total: "Total",
    issueDate: "Fecha Emisión",
    dueDate: "Vencimiento",
    noDate: "Sin fecha",
    client: "Cliente",
    contactColon: "Contacto",
    detail: "Detalle",
    edit: "Editar",
    colDescription: "Descripción",
    colQty: "Cant.",
    colPrice: "Precio",
    colDiscount: "Dto.",
    colTotal: "Total",
    subtotal: "Subtotal",
    discount: "Descuento",
    vat: "IVA",
    vatNotIncluded: "IVA no incluido",
    notes: "Notas",
    terms: "Términos y Condiciones",
    termsPlaceholder: "Condiciones de pago, entrega, validez...",
    cancel: "Cancelar",
    save: "Guardar",
    noTerms: "Sin términos y condiciones",
    applyDefaultTerms: "Aplicar condiciones por defecto",
    approvals: "Aprobaciones",
    approvalsBusinessDesc: "Los flujos de aprobación están disponibles desde el plan Business.",
    viewBusinessPlan: "Ver plan Business",
    eSignature: "Firma Electrónica",
    eSignatureProDesc: "La firma electrónica está disponible desde el plan Pro.",
    viewProPlan: "Ver plan Pro",
    versionHistory: "Historial de Versiones",
    emailNotConfigured: "Email no configurado",
    emailNotConfiguredDesc: "Para enviar cotizaciones por email a tus clientes desde tu propia cuenta, primero tienes que conectar tu servidor SMTP (Gmail, Outlook, dominio propio…).",
    emailNotConfiguredHint1: "Es un proceso de 2 minutos. Mientras tanto, puedes usar el botón",
    emailNotConfiguredHint2: "para descargar el PDF y mandarlo manualmente.",
    later: "Más tarde",
    configureNow: "Configurar ahora",
    sendQuoteByEmail: "Enviar Cotización por Email",
    to: "Para",
    subject: "Asunto",
    message: "Mensaje",
    pdfAttached: (n) => `Se adjuntará el PDF de la cotización ${n} automáticamente`,
  },
  en: {
    errChangeStatus: "Couldn't change the status",
    errNewVersion: "Couldn't create new version",
    errConnection: "Connection error",
    quoteDuplicated: "Quote duplicated",
    errDuplicate: "Couldn't duplicate the quote",
    errArchive: "Couldn't archive",
    errUnarchive: "Couldn't unarchive",
    remindersSilenced: "Reminders silenced for this quote",
    remindersReactivated: "Reminders reactivated",
    errUpdateReminders: "Couldn't update reminders",
    itemsUpdated: "Items updated",
    errSaveItems: "Couldn't save the items",
    errSend: "Couldn't send",
    termsSaved: "Terms and conditions saved",
    errSave: "Couldn't save",
    contractCreated: "Contract created",
    errCreateContract: "Couldn't create the contract",
    defaultTermsApplied: "Default terms applied",
    emailSent: "Email sent",
    errSendEmail: "Couldn't send the email",
    errSendEmailConn: "Connection error while sending email",
    emailSubject: (n, c) => `Quote ${n} - ${c}`,
    emailGreeting: (name) => `Dear ${name},`,
    emailBody1: (n, total) => `Please find attached quote <strong>${n}</strong> for a total of <strong>${total}</strong>.`,
    emailValidUntil: (date) => `This quote is valid until ${date}.`,
    emailClosing1: "We remain at your disposal for any questions.",
    emailClosing2: "Best regards",
    quotesBreadcrumb: "Quotes",
    actions: "Actions",
    preview: "Preview",
    email: "Email",
    proPlanTitle: "Available from the Pro plan",
    duplicate: "Duplicate",
    remindersSilencedTitle: "Reminders silenced — click to reactivate",
    remindersSilenceTitle: "Silence automatic reminders for this quote",
    silenced: "Silenced",
    reminders: "Reminders",
    createContract: "Create Contract",
    contract: "Contract",
    creating: "Creating...",
    newVersion: "New Version",
    unarchive: "Unarchive",
    archive: "Archive",
    statusLabel: "Status",
    send: "Send",
    sending: "Sending...",
    sendToApprove: "Send for Approval",
    rejectedBy: (names) => `Rejected by: ${names}`,
    pendingApprovalFrom: (names) => `Pending approval from: ${names}`,
    transitions: { NEGOCIACION: "Negotiating", GANADA: "Won", PERDIDA: "Lost", ENVIADA: "Resend" },
    quoteExpired: "Quote expired",
    expiredOn: (date) => `This quote expired on ${date}. Consider duplicating it with new dates.`,
    approvalRejected: "Approval rejected",
    pendingApproval: "Pending approval",
    rejectedByCannotSend: (names) => `Rejected by ${names}. This quote cannot be sent.`,
    waitingApprovalBeforeSend: (names) => `Waiting for approval from ${names} before sending.`,
    termsMissing: "Terms and conditions missing",
    termsMissingDesc: "You must add terms and conditions before sending this quote.",
    add: "Add",
    quoteArchived: "Quote archived",
    quoteArchivedDesc: "This quote has been archived and doesn't appear in business metrics.",
    status: "Status",
    total: "Total",
    issueDate: "Issue date",
    dueDate: "Due date",
    noDate: "No date",
    client: "Client",
    contactColon: "Contact",
    detail: "Details",
    edit: "Edit",
    colDescription: "Description",
    colQty: "Qty",
    colPrice: "Price",
    colDiscount: "Disc.",
    colTotal: "Total",
    subtotal: "Subtotal",
    discount: "Discount",
    vat: "VAT",
    vatNotIncluded: "VAT not included",
    notes: "Notes",
    terms: "Terms & Conditions",
    termsPlaceholder: "Payment, delivery, validity terms...",
    cancel: "Cancel",
    save: "Save",
    noTerms: "No terms and conditions",
    applyDefaultTerms: "Apply default terms",
    approvals: "Approvals",
    approvalsBusinessDesc: "Approval flows are available from the Business plan.",
    viewBusinessPlan: "See Business plan",
    eSignature: "Electronic Signature",
    eSignatureProDesc: "Electronic signature is available from the Pro plan.",
    viewProPlan: "See Pro plan",
    versionHistory: "Version History",
    emailNotConfigured: "Email not configured",
    emailNotConfiguredDesc: "To email quotes to your clients from your own account, you first need to connect your SMTP server (Gmail, Outlook, your own domain…).",
    emailNotConfiguredHint1: "It takes 2 minutes. In the meantime, you can use the",
    emailNotConfiguredHint2: "button to download the PDF and send it manually.",
    later: "Later",
    configureNow: "Configure now",
    sendQuoteByEmail: "Send Quote by Email",
    to: "To",
    subject: "Subject",
    message: "Message",
    pdfAttached: (n) => `The PDF of quote ${n} will be attached automatically`,
  },
};
