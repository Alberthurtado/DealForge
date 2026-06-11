// Scorecard de calidad de cotización — puntúa 0-100 antes de enviar
// Cada criterio aporta puntos y produce una recomendación accionable

export interface ScorecardCotizacion {
  estado: string;
  total: number;
  descuentoGlobal: number;
  impuesto: number;
  incluirIva?: boolean;
  fechaVencimiento: string | null;
  fechaEmision?: string | null;
  notas: string | null;
  condiciones: string | null;
  contactoNombre?: string | null;
  cliente: {
    nombre: string;
    email?: string | null;
    contactos?: Array<{ email?: string | null; principal: boolean }>;
  };
  lineItems: Array<{
    descripcion: string;
    cantidad: number;
    precioUnitario: number;
    descuento?: number;
  }>;
}

export type ScorecardLang = "es" | "en";

export type ScorecardSeverity = "ok" | "warn" | "error";

export interface ScorecardCheck {
  id: string;
  label: string;
  description: string;
  passed: boolean;
  severity: ScorecardSeverity; // severity si NO pasa
  points: number;
  hint?: string;
}

export interface ScorecardResult {
  score: number; // 0-100
  grade: string;
  color: "green" | "blue" | "amber" | "red";
  checks: ScorecardCheck[];
  passed: number;
  total: number;
  blockers: number; // errores críticos (severity=error sin pasar)
}

interface ScorecardStrings {
  grades: { excellent: string; good: string; improvable: string; weak: string };
  hasLines: { label: string; description: string; hint: string };
  totalPositive: { label: string; description: string; hint: string };
  lineDescriptions: { label: string; description: string; hint: (n: number) => string };
  noZeroPrices: { label: string; description: string; hint: (n: number) => string };
  hasContact: { label: string; description: string; hint: string };
  hasEmail: { label: string; description: string; hint: string };
  hasExpiry: { label: string; description: string; hintExpired: string; hintMissing: string };
  hasNotes: { label: string; description: string; hint: string };
  hasTerms: { label: string; description: string; hint: string };
  discountReasonable: { label: string; description: string; hint: (pct: number) => string };
  taxConfigured: { label: string; description: string; hint: string };
}

const STRINGS: Record<ScorecardLang, ScorecardStrings> = {
  es: {
    grades: { excellent: "Excelente", good: "Buena", improvable: "Mejorable", weak: "Débil" },
    hasLines: {
      label: "Al menos 1 línea de producto/servicio",
      description: "Una cotización sin líneas no tiene importe que cobrar.",
      hint: "Añade al menos 1 línea en el paso de productos.",
    },
    totalPositive: {
      label: "Importe total superior a 0",
      description: "El total debe ser positivo para poder ser aceptado.",
      hint: "Revisa que los precios de las líneas no estén a 0.",
    },
    lineDescriptions: {
      label: "Descripciones detalladas en cada línea",
      description: "Descripciones vagas ('Servicio 1') bajan la tasa de aceptación.",
      hint: (n) => `${n} línea(s) con descripción demasiado corta (<15 caracteres).`,
    },
    noZeroPrices: {
      label: "Ninguna línea con precio 0",
      description: "Salvo que sea deliberado, un precio a 0 suele ser un olvido.",
      hint: (n) => `${n} línea(s) con precio 0.`,
    },
    hasContact: {
      label: "Contacto principal asignado",
      description: "Enviar a una persona concreta mejora la tasa de respuesta.",
      hint: "Asigna un contacto o indica el nombre del destinatario.",
    },
    hasEmail: {
      label: "Email del cliente disponible",
      description: "Sin email no podrás enviar la cotización automáticamente.",
      hint: "Añade el email al contacto principal del cliente.",
    },
    hasExpiry: {
      label: "Fecha de vencimiento establecida",
      description: "Una fecha de validez genera urgencia y protege tus precios.",
      hintExpired: "La cotización ya está vencida. Actualiza la fecha antes de enviarla.",
      hintMissing: "Establece una fecha de validez (recomendado 30 días).",
    },
    hasNotes: {
      label: "Notas o mensaje personalizado",
      description: "Un párrafo personalizado humaniza la propuesta.",
      hint: "Añade una nota breve contextualizando la propuesta.",
    },
    hasTerms: {
      label: "Términos y condiciones definidos",
      description: "Los T&C te protegen ante impagos, cambios de alcance y disputas.",
      hint: "Aplica una plantilla de T&C desde Configuración o edita manualmente.",
    },
    discountReasonable: {
      label: "Descuento global razonable (<25%)",
      description: "Descuentos muy altos indican problemas de pricing o negociación.",
      hint: (pct) => `Descuento actual: ${pct}%. Revisa si es necesario.`,
    },
    taxConfigured: {
      label: "IVA configurado correctamente",
      description: "IVA al 0% suele ser un error salvo que factures sin IVA.",
      hint: "Configura el IVA (21% habitual en España).",
    },
  },
  en: {
    grades: { excellent: "Excellent", good: "Good", improvable: "Could improve", weak: "Weak" },
    hasLines: {
      label: "At least 1 product/service line",
      description: "A quote with no lines has no amount to charge.",
      hint: "Add at least 1 line in the products step.",
    },
    totalPositive: {
      label: "Total amount above 0",
      description: "The total must be positive for the quote to be accepted.",
      hint: "Check that the line prices aren't set to 0.",
    },
    lineDescriptions: {
      label: "Detailed descriptions on every line",
      description: "Vague descriptions ('Service 1') lower the acceptance rate.",
      hint: (n) => `${n} line(s) with a description that's too short (<15 characters).`,
    },
    noZeroPrices: {
      label: "No line with a price of 0",
      description: "Unless deliberate, a price of 0 is usually an oversight.",
      hint: (n) => `${n} line(s) with a price of 0.`,
    },
    hasContact: {
      label: "Primary contact assigned",
      description: "Sending to a specific person improves the reply rate.",
      hint: "Assign a contact or specify the recipient's name.",
    },
    hasEmail: {
      label: "Client email available",
      description: "Without an email you can't send the quote automatically.",
      hint: "Add the email to the client's primary contact.",
    },
    hasExpiry: {
      label: "Expiry date set",
      description: "A validity date creates urgency and protects your pricing.",
      hintExpired: "The quote has already expired. Update the date before sending it.",
      hintMissing: "Set a validity date (30 days recommended).",
    },
    hasNotes: {
      label: "Notes or personalized message",
      description: "A personalized paragraph humanizes the proposal.",
      hint: "Add a short note giving context to the proposal.",
    },
    hasTerms: {
      label: "Terms and conditions defined",
      description: "T&C protect you against non-payment, scope changes and disputes.",
      hint: "Apply a T&C template from Settings or edit it manually.",
    },
    discountReasonable: {
      label: "Reasonable global discount (<25%)",
      description: "Very high discounts signal pricing or negotiation problems.",
      hint: (pct) => `Current discount: ${pct}%. Check whether it's necessary.`,
    },
    taxConfigured: {
      label: "VAT configured correctly",
      description: "0% VAT is usually a mistake unless you invoice without VAT.",
      hint: "Configure VAT for your country.",
    },
  },
};

export function computeScorecard(
  cot: ScorecardCotizacion,
  lang: ScorecardLang = "es"
): ScorecardResult {
  const s = STRINGS[lang] ?? STRINGS.es;
  const checks: ScorecardCheck[] = [];

  // 1. Tiene líneas (bloqueante)
  checks.push({
    id: "has-lines",
    label: s.hasLines.label,
    description: s.hasLines.description,
    passed: cot.lineItems.length > 0,
    severity: "error",
    points: 10,
    hint: s.hasLines.hint,
  });

  // 2. Total > 0
  checks.push({
    id: "total-positive",
    label: s.totalPositive.label,
    description: s.totalPositive.description,
    passed: cot.total > 0,
    severity: "error",
    points: 10,
    hint: s.totalPositive.hint,
  });

  // 3. Descripciones con detalle suficiente
  const shortDescriptions = cot.lineItems.filter(
    (li) => (li.descripcion?.trim().length || 0) < 15
  ).length;
  checks.push({
    id: "line-descriptions",
    label: s.lineDescriptions.label,
    description: s.lineDescriptions.description,
    passed: cot.lineItems.length > 0 && shortDescriptions === 0,
    severity: "warn",
    points: 10,
    hint: shortDescriptions > 0 ? s.lineDescriptions.hint(shortDescriptions) : undefined,
  });

  // 4. Líneas sin precio
  const zeroPriceLines = cot.lineItems.filter((li) => li.precioUnitario <= 0).length;
  checks.push({
    id: "no-zero-prices",
    label: s.noZeroPrices.label,
    description: s.noZeroPrices.description,
    passed: zeroPriceLines === 0,
    severity: "warn",
    points: 5,
    hint: zeroPriceLines > 0 ? s.noZeroPrices.hint(zeroPriceLines) : undefined,
  });

  // 5. Contacto asignado
  const hasContact =
    !!cot.contactoNombre?.trim() ||
    !!cot.cliente.contactos?.find((c) => c.principal);
  checks.push({
    id: "has-contact",
    label: s.hasContact.label,
    description: s.hasContact.description,
    passed: hasContact,
    severity: "warn",
    points: 10,
    hint: s.hasContact.hint,
  });

  // 6. Email del destinatario
  const principalEmail = cot.cliente.contactos?.find((c) => c.principal)?.email;
  const hasEmail = !!(principalEmail || cot.cliente.email);
  checks.push({
    id: "has-email",
    label: s.hasEmail.label,
    description: s.hasEmail.description,
    passed: hasEmail,
    severity: "warn",
    points: 10,
    hint: s.hasEmail.hint,
  });

  // 7. Fecha de vencimiento
  const hasExpiry = !!cot.fechaVencimiento;
  let isExpired = false;
  if (cot.fechaVencimiento) {
    isExpired = new Date(cot.fechaVencimiento) < new Date();
  }
  checks.push({
    id: "has-expiry",
    label: s.hasExpiry.label,
    description: s.hasExpiry.description,
    passed: hasExpiry && !isExpired,
    severity: "warn",
    points: 10,
    hint: isExpired
      ? s.hasExpiry.hintExpired
      : !hasExpiry
      ? s.hasExpiry.hintMissing
      : undefined,
  });

  // 8. Notas / mensaje personal
  checks.push({
    id: "has-notes",
    label: s.hasNotes.label,
    description: s.hasNotes.description,
    passed: (cot.notas?.trim().length || 0) >= 30,
    severity: "warn",
    points: 10,
    hint: s.hasNotes.hint,
  });

  // 9. Términos y condiciones
  checks.push({
    id: "has-terms",
    label: s.hasTerms.label,
    description: s.hasTerms.description,
    passed: (cot.condiciones?.trim().length || 0) >= 50,
    severity: "error",
    points: 15,
    hint: s.hasTerms.hint,
  });

  // 10. Descuento global razonable
  checks.push({
    id: "discount-reasonable",
    label: s.discountReasonable.label,
    description: s.discountReasonable.description,
    passed: cot.descuentoGlobal < 25,
    severity: "warn",
    points: 5,
    hint:
      cot.descuentoGlobal >= 25 ? s.discountReasonable.hint(cot.descuentoGlobal) : undefined,
  });

  // 11. IVA configurado (si corresponde)
  const ivaOk = cot.impuesto > 0 || cot.incluirIva === false;
  checks.push({
    id: "tax-configured",
    label: s.taxConfigured.label,
    description: s.taxConfigured.description,
    passed: ivaOk,
    severity: "warn",
    points: 5,
    hint: ivaOk ? undefined : s.taxConfigured.hint,
  });

  const passed = checks.filter((c) => c.passed).length;
  const score = checks.reduce((sum, c) => sum + (c.passed ? c.points : 0), 0);
  const blockers = checks.filter((c) => !c.passed && c.severity === "error").length;

  let grade = s.grades.weak;
  let color: ScorecardResult["color"] = "red";
  if (score >= 90) {
    grade = s.grades.excellent;
    color = "green";
  } else if (score >= 75) {
    grade = s.grades.good;
    color = "blue";
  } else if (score >= 60) {
    grade = s.grades.improvable;
    color = "amber";
  }

  return {
    score,
    grade,
    color,
    checks,
    passed,
    total: checks.length,
    blockers,
  };
}
