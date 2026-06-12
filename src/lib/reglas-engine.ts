// ========== TYPES ==========

export interface ReglaComercialData {
  id: string;
  nombre: string;
  tipo: string;
  configuracion: string;
  activa: boolean;
  prioridad: number;
}

export interface QuoteLineItem {
  productoId: string | null;
  descripcion: string;
  cantidad: number;
  precioUnitario: number;
  descuento: number;
}

export interface QuoteData {
  lineItems: QuoteLineItem[];
  descuentoGlobal: number;
  subtotal: number;
  total: number;
}

export interface ProductoCategoriaMap {
  [productoId: string]: string | null; // productoId -> categoriaId
}

export interface Violacion {
  reglaId: string;
  reglaNombre: string;
  tipo: string;
  severidad: "advertencia" | "bloqueo";
  mensaje: string;
  productosFaltantes?: string[]; // IDs of missing required products
}

export interface PromocionAplicable {
  reglaId: string;
  reglaNombre: string;
  productoIds: string[];
  tipoPromocion: "descuento_porcentaje" | "precio_fijo";
  valor: number;
  mensaje: string;
}

export interface AprobacionRequerida {
  reglaId: string;
  reglaNombre: string;
  aprobador: { nombre: string; email: string };
  razon: string;
}

export interface ValidationResult {
  valido: boolean;
  violaciones: Violacion[];
  promocionesAplicables: PromocionAplicable[];
  aprobacionesRequeridas: AprobacionRequerida[];
}

// ========== CONFIG TYPES ==========

interface ConfigLimiteDescuento {
  tipoLimite: "linea" | "global" | "ambos";
  maxDescuentoLinea?: number;
  maxDescuentoGlobal?: number;
  aplicaA?: { productoIds?: string[]; categoriaIds?: string[] } | null;
}

interface ConfigProductoObligatorio {
  condicion: { tipo: "producto" | "categoria"; ids: string[] };
  productosRequeridos: string[];
  mensaje?: string;
}

interface ConfigAprobacion {
  condiciones: Array<{
    tipo: "descuento_linea" | "descuento_global" | "monto_total";
    umbral: number;
    operador: "mayor_que" | "mayor_igual";
  }>;
  aprobador: { nombre: string; email: string };
}

interface ConfigPromocion {
  fechaInicio: string;
  fechaFin: string;
  productoIds: string[];
  tipoPromocion: "descuento_porcentaje" | "precio_fijo";
  valor: number;
  mensaje?: string;
}

// ========== ENGINE ==========

export type ReglasLang = "es" | "en";

// Message builders for engine-generated messages. User-entered custom messages
// (config.mensaje) are left as the user typed them.
const MSG = {
  es: {
    lineDiscountExceeds: (d: number, desc: string, max: number) =>
      `Descuento de línea (${d}%) en "${desc}" excede el límite de ${max}%`,
    globalDiscountExceeds: (d: number, max: number) =>
      `Descuento global (${d}%) excede el límite de ${max}%`,
    missingRequired: (nombre: string) =>
      `Faltan productos obligatorios según la regla "${nombre}"`,
    aprobLine: (v: number, u: number) => `Descuento de línea (${v}%) supera el umbral de ${u}%`,
    aprobGlobal: (v: number, u: number) => `Descuento global (${v}%) supera el umbral de ${u}%`,
    aprobMonto: (v: string, u: string) => `Monto total (${v}) supera el umbral de ${u}`,
    promoAvailable: (nombre: string) => `Promoción "${nombre}" disponible`,
  },
  en: {
    lineDiscountExceeds: (d: number, desc: string, max: number) =>
      `Line discount (${d}%) on "${desc}" exceeds the ${max}% limit`,
    globalDiscountExceeds: (d: number, max: number) =>
      `Global discount (${d}%) exceeds the ${max}% limit`,
    missingRequired: (nombre: string) =>
      `Required products are missing per the rule "${nombre}"`,
    aprobLine: (v: number, u: number) => `Line discount (${v}%) exceeds the ${u}% threshold`,
    aprobGlobal: (v: number, u: number) => `Global discount (${v}%) exceeds the ${u}% threshold`,
    aprobMonto: (v: string, u: string) => `Total amount (${v}) exceeds the ${u} threshold`,
    promoAvailable: (nombre: string) => `Promotion "${nombre}" available`,
  },
};

export function validarCotizacion(
  reglas: ReglaComercialData[],
  quote: QuoteData,
  productoCategoriaMap: ProductoCategoriaMap = {},
  lang: ReglasLang = "es"
): ValidationResult {
  const m = MSG[lang];
  const violaciones: Violacion[] = [];
  const promocionesAplicables: PromocionAplicable[] = [];
  const aprobacionesRequeridas: AprobacionRequerida[] = [];

  const activeRules = reglas
    .filter((r) => r.activa)
    .sort((a, b) => b.prioridad - a.prioridad);

  for (const regla of activeRules) {
    let config: unknown;
    try {
      config = JSON.parse(regla.configuracion);
    } catch {
      continue;
    }

    switch (regla.tipo) {
      case "LIMITE_DESCUENTO":
        evaluarLimiteDescuento(regla, config as ConfigLimiteDescuento, quote, productoCategoriaMap, violaciones, m);
        break;
      case "PRODUCTO_OBLIGATORIO":
        evaluarProductoObligatorio(regla, config as ConfigProductoObligatorio, quote, productoCategoriaMap, violaciones, m);
        break;
      case "APROBACION":
        evaluarAprobacion(regla, config as ConfigAprobacion, quote, aprobacionesRequeridas, m);
        break;
      case "PROMOCION":
        evaluarPromocion(regla, config as ConfigPromocion, quote, promocionesAplicables, m);
        break;
    }
  }

  return {
    valido: violaciones.length === 0 && aprobacionesRequeridas.length === 0,
    violaciones,
    promocionesAplicables,
    aprobacionesRequeridas,
  };
}

function evaluarLimiteDescuento(
  regla: ReglaComercialData,
  config: ConfigLimiteDescuento,
  quote: QuoteData,
  catMap: ProductoCategoriaMap,
  violaciones: Violacion[],
  m: (typeof MSG)["es"]
) {
  const { tipoLimite, maxDescuentoLinea, maxDescuentoGlobal, aplicaA } = config;

  // Check line-item discounts
  if ((tipoLimite === "linea" || tipoLimite === "ambos") && maxDescuentoLinea !== undefined) {
    for (const item of quote.lineItems) {
      if (item.descuento <= maxDescuentoLinea) continue;

      // Check if this item is in scope
      if (aplicaA) {
        const inScope = itemInScope(item, aplicaA, catMap);
        if (!inScope) continue;
      }

      violaciones.push({
        reglaId: regla.id,
        reglaNombre: regla.nombre,
        tipo: regla.tipo,
        severidad: "advertencia",
        mensaje: m.lineDiscountExceeds(item.descuento, item.descripcion, maxDescuentoLinea),
      });
    }
  }

  // Check global discount
  if ((tipoLimite === "global" || tipoLimite === "ambos") && maxDescuentoGlobal !== undefined) {
    if (quote.descuentoGlobal > maxDescuentoGlobal) {
      violaciones.push({
        reglaId: regla.id,
        reglaNombre: regla.nombre,
        tipo: regla.tipo,
        severidad: "advertencia",
        mensaje: m.globalDiscountExceeds(quote.descuentoGlobal, maxDescuentoGlobal),
      });
    }
  }
}

function evaluarProductoObligatorio(
  regla: ReglaComercialData,
  config: ConfigProductoObligatorio,
  quote: QuoteData,
  catMap: ProductoCategoriaMap,
  violaciones: Violacion[],
  m: (typeof MSG)["es"]
) {
  const { condicion, productosRequeridos, mensaje } = config;
  const productIdsInQuote = quote.lineItems
    .map((li) => li.productoId)
    .filter(Boolean) as string[];

  // Check if trigger condition is met
  let triggered = false;
  if (condicion.tipo === "producto") {
    triggered = condicion.ids.some((id) => productIdsInQuote.includes(id));
  } else if (condicion.tipo === "categoria") {
    const categoriesInQuote = productIdsInQuote.map((pid) => catMap[pid]).filter(Boolean);
    triggered = condicion.ids.some((catId) => categoriesInQuote.includes(catId));
  }

  if (!triggered) return;

  // Check if required products are present
  const missing = productosRequeridos.filter((id) => !productIdsInQuote.includes(id));
  if (missing.length > 0) {
    violaciones.push({
      reglaId: regla.id,
      reglaNombre: regla.nombre,
      tipo: regla.tipo,
      severidad: "advertencia",
      mensaje: mensaje || m.missingRequired(regla.nombre),
      productosFaltantes: missing,
    });
  }
}

function evaluarAprobacion(
  regla: ReglaComercialData,
  config: ConfigAprobacion,
  quote: QuoteData,
  aprobaciones: AprobacionRequerida[],
  m: (typeof MSG)["es"]
) {
  const { condiciones, aprobador } = config;

  for (const cond of condiciones) {
    let triggered = false;
    let razon = "";

    if (cond.tipo === "descuento_linea") {
      const maxLineDiscount = Math.max(...quote.lineItems.map((li) => li.descuento), 0);
      triggered = cond.operador === "mayor_que"
        ? maxLineDiscount > cond.umbral
        : maxLineDiscount >= cond.umbral;
      if (triggered) razon = m.aprobLine(maxLineDiscount, cond.umbral);
    } else if (cond.tipo === "descuento_global") {
      triggered = cond.operador === "mayor_que"
        ? quote.descuentoGlobal > cond.umbral
        : quote.descuentoGlobal >= cond.umbral;
      if (triggered) razon = m.aprobGlobal(quote.descuentoGlobal, cond.umbral);
    } else if (cond.tipo === "monto_total") {
      triggered = cond.operador === "mayor_que"
        ? quote.total > cond.umbral
        : quote.total >= cond.umbral;
      if (triggered) razon = m.aprobMonto(quote.total.toFixed(2), cond.umbral.toFixed(2));
    }

    if (triggered) {
      // Avoid duplicate approvals for same approver on same rule
      const exists = aprobaciones.some(
        (a) => a.reglaId === regla.id && a.aprobador.email === aprobador.email
      );
      if (!exists) {
        aprobaciones.push({
          reglaId: regla.id,
          reglaNombre: regla.nombre,
          aprobador,
          razon,
        });
      }
    }
  }
}

function evaluarPromocion(
  regla: ReglaComercialData,
  config: ConfigPromocion,
  quote: QuoteData,
  promociones: PromocionAplicable[],
  m: (typeof MSG)["es"]
) {
  const { fechaInicio, fechaFin, productoIds, tipoPromocion, valor, mensaje } = config;

  const now = new Date();
  const start = new Date(fechaInicio);
  const end = new Date(fechaFin);
  end.setHours(23, 59, 59, 999);

  if (now < start || now > end) return;

  const productIdsInQuote = quote.lineItems
    .map((li) => li.productoId)
    .filter(Boolean) as string[];

  const matchingProducts = productoIds.filter((id) => productIdsInQuote.includes(id));
  if (matchingProducts.length === 0) return;

  promociones.push({
    reglaId: regla.id,
    reglaNombre: regla.nombre,
    productoIds: matchingProducts,
    tipoPromocion,
    valor,
    mensaje: mensaje || m.promoAvailable(regla.nombre),
  });
}

function itemInScope(
  item: QuoteLineItem,
  aplicaA: { productoIds?: string[]; categoriaIds?: string[] },
  catMap: ProductoCategoriaMap
): boolean {
  if (!item.productoId) return false;

  if (aplicaA.productoIds?.length) {
    if (aplicaA.productoIds.includes(item.productoId)) return true;
  }
  if (aplicaA.categoriaIds?.length) {
    const cat = catMap[item.productoId];
    if (cat && aplicaA.categoriaIds.includes(cat)) return true;
  }

  // If both arrays are empty/undefined, applies to all
  if (!aplicaA.productoIds?.length && !aplicaA.categoriaIds?.length) return true;

  return false;
}
