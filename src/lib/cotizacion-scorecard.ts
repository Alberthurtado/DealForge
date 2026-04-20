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
  grade: "Excelente" | "Buena" | "Mejorable" | "Débil";
  color: "green" | "blue" | "amber" | "red";
  checks: ScorecardCheck[];
  passed: number;
  total: number;
  blockers: number; // errores críticos (severity=error sin pasar)
}

export function computeScorecard(cot: ScorecardCotizacion): ScorecardResult {
  const checks: ScorecardCheck[] = [];

  // 1. Tiene líneas (bloqueante)
  checks.push({
    id: "has-lines",
    label: "Al menos 1 línea de producto/servicio",
    description: "Una cotización sin líneas no tiene importe que cobrar.",
    passed: cot.lineItems.length > 0,
    severity: "error",
    points: 10,
    hint: "Añade al menos 1 línea en el paso de productos.",
  });

  // 2. Total > 0
  checks.push({
    id: "total-positive",
    label: "Importe total superior a 0",
    description: "El total debe ser positivo para poder ser aceptado.",
    passed: cot.total > 0,
    severity: "error",
    points: 10,
    hint: "Revisa que los precios de las líneas no estén a 0.",
  });

  // 3. Descripciones con detalle suficiente
  const shortDescriptions = cot.lineItems.filter(
    (li) => (li.descripcion?.trim().length || 0) < 15
  ).length;
  checks.push({
    id: "line-descriptions",
    label: "Descripciones detalladas en cada línea",
    description: "Descripciones vagas ('Servicio 1') bajan la tasa de aceptación.",
    passed: cot.lineItems.length > 0 && shortDescriptions === 0,
    severity: "warn",
    points: 10,
    hint:
      shortDescriptions > 0
        ? `${shortDescriptions} línea(s) con descripción demasiado corta (<15 caracteres).`
        : undefined,
  });

  // 4. Líneas sin precio
  const zeroPriceLines = cot.lineItems.filter((li) => li.precioUnitario <= 0).length;
  checks.push({
    id: "no-zero-prices",
    label: "Ninguna línea con precio 0",
    description: "Salvo que sea deliberado, un precio a 0 suele ser un olvido.",
    passed: zeroPriceLines === 0,
    severity: "warn",
    points: 5,
    hint: zeroPriceLines > 0 ? `${zeroPriceLines} línea(s) con precio 0.` : undefined,
  });

  // 5. Contacto asignado
  const hasContact =
    !!cot.contactoNombre?.trim() ||
    !!cot.cliente.contactos?.find((c) => c.principal);
  checks.push({
    id: "has-contact",
    label: "Contacto principal asignado",
    description: "Enviar a una persona concreta mejora la tasa de respuesta.",
    passed: hasContact,
    severity: "warn",
    points: 10,
    hint: "Asigna un contacto o indica el nombre del destinatario.",
  });

  // 6. Email del destinatario
  const principalEmail = cot.cliente.contactos?.find((c) => c.principal)?.email;
  const hasEmail = !!(principalEmail || cot.cliente.email);
  checks.push({
    id: "has-email",
    label: "Email del cliente disponible",
    description: "Sin email no podrás enviar la cotización automáticamente.",
    passed: hasEmail,
    severity: "warn",
    points: 10,
    hint: "Añade el email al contacto principal del cliente.",
  });

  // 7. Fecha de vencimiento
  const hasExpiry = !!cot.fechaVencimiento;
  let isExpired = false;
  if (cot.fechaVencimiento) {
    isExpired = new Date(cot.fechaVencimiento) < new Date();
  }
  checks.push({
    id: "has-expiry",
    label: "Fecha de vencimiento establecida",
    description: "Una fecha de validez genera urgencia y protege tus precios.",
    passed: hasExpiry && !isExpired,
    severity: "warn",
    points: 10,
    hint: isExpired
      ? "La cotización ya está vencida. Actualiza la fecha antes de enviarla."
      : !hasExpiry
      ? "Establece una fecha de validez (recomendado 30 días)."
      : undefined,
  });

  // 8. Notas / mensaje personal
  checks.push({
    id: "has-notes",
    label: "Notas o mensaje personalizado",
    description: "Un párrafo personalizado humaniza la propuesta.",
    passed: (cot.notas?.trim().length || 0) >= 30,
    severity: "warn",
    points: 10,
    hint: "Añade una nota breve contextualizando la propuesta.",
  });

  // 9. Términos y condiciones
  checks.push({
    id: "has-terms",
    label: "Términos y condiciones definidos",
    description: "Los T&C te protegen ante impagos, cambios de alcance y disputas.",
    passed: (cot.condiciones?.trim().length || 0) >= 50,
    severity: "error",
    points: 15,
    hint: "Aplica una plantilla de T&C desde Configuración o edita manualmente.",
  });

  // 10. Descuento global razonable
  checks.push({
    id: "discount-reasonable",
    label: "Descuento global razonable (<25%)",
    description: "Descuentos muy altos indican problemas de pricing o negociación.",
    passed: cot.descuentoGlobal < 25,
    severity: "warn",
    points: 5,
    hint:
      cot.descuentoGlobal >= 25
        ? `Descuento actual: ${cot.descuentoGlobal}%. Revisa si es necesario.`
        : undefined,
  });

  // 11. IVA configurado (si corresponde)
  const ivaOk = cot.impuesto > 0 || cot.incluirIva === false;
  checks.push({
    id: "tax-configured",
    label: "IVA configurado correctamente",
    description: "IVA al 0% suele ser un error salvo que factures sin IVA.",
    passed: ivaOk,
    severity: "warn",
    points: 5,
    hint: ivaOk ? undefined : "Configura el IVA (21% habitual en España).",
  });

  const passed = checks.filter((c) => c.passed).length;
  const score = checks.reduce((s, c) => s + (c.passed ? c.points : 0), 0);
  const blockers = checks.filter((c) => !c.passed && c.severity === "error").length;

  let grade: ScorecardResult["grade"] = "Débil";
  let color: ScorecardResult["color"] = "red";
  if (score >= 90) {
    grade = "Excelente";
    color = "green";
  } else if (score >= 75) {
    grade = "Buena";
    color = "blue";
  } else if (score >= 60) {
    grade = "Mejorable";
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
