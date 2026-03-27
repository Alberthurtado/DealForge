import { z } from "zod";
import { stripHtml } from "./sanitize";

// ─── Reusable primitives ─────────────────────────

const requiredString = (field: string) =>
  z.string().min(1, `${field} es obligatorio`).transform((v) => v.trim());

const optionalString = z
  .string()
  .optional()
  .nullable()
  .transform((v) => v?.trim() || null);

const sanitizedText = z
  .string()
  .optional()
  .nullable()
  .transform((v) => (v ? stripHtml(v.trim()) : null));

const emailField = z
  .string()
  .email("Email inválido")
  .transform((v) => v.trim().toLowerCase());

const optionalEmail = z
  .union([z.string().email("Email inválido"), z.literal(""), z.null(), z.undefined()])
  .transform((v) => (v ? v.trim().toLowerCase() : null))
  .nullable()
  .optional();

const positiveNumber = (field: string) =>
  z.number({ message: `${field} debe ser un número` }).min(0, `${field} debe ser >= 0`);

const percentage = (field: string) =>
  z.number().min(0, `${field} debe ser >= 0`).max(100, `${field} debe ser <= 100`);

// ─── Auth ────────────────────────────────────────

export const loginSchema = z.object({
  email: emailField,
  password: z.string().min(1, "La contraseña es obligatoria"),
  turnstileToken: z.string().optional().nullable(),
});

export const registroSchema = z.object({
  nombre: requiredString("Nombre"),
  email: emailField,
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
  turnstileToken: z.string().optional().nullable(),
});

export const recuperarSchema = z.object({
  email: emailField,
  turnstileToken: z.string().optional().nullable(),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, "Token es obligatorio"),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
});

// ─── Contacto (nested) ──────────────────────────

const contactoSchema = z.object({
  nombre: requiredString("Nombre del contacto"),
  cargo: optionalString,
  email: optionalEmail,
  telefono: optionalString,
  principal: z.boolean().default(false),
});

// ─── Cliente ─────────────────────────────────────

export const clienteCreateSchema = z.object({
  nombre: requiredString("Nombre del cliente"),
  ruc: optionalString,
  email: optionalEmail,
  telefono: optionalString,
  direccion: optionalString,
  ciudad: optionalString,
  pais: optionalString,
  sector: optionalString,
  notas: sanitizedText,
  contactos: z.array(contactoSchema).optional(),
});

export const clienteUpdateSchema = clienteCreateSchema.partial();

// ─── Producto ────────────────────────────────────

const varianteSchema = z.object({
  id: z.string().optional(),
  nombre: z.string().min(1, "Nombre de variante es obligatorio").transform((v) => v.trim()),
  sku: z.string().min(1, "SKU de variante es obligatorio").transform((v) => v.trim()),
  precioOverride: z.number().nullable().optional(),
  atributos: z.string().default("{}"),
  activo: z.boolean().default(true),
});

export const productoCreateSchema = z.object({
  nombre: requiredString("Nombre del producto"),
  descripcion: sanitizedText,
  sku: requiredString("SKU"),
  precioBase: positiveNumber("Precio base"),
  unidad: z.string().default("unidad"),
  activo: z.boolean().default(true),
  tipoFacturacion: z.enum(["UNICO", "RECURRENTE"]).default("UNICO"),
  frecuencia: z.enum(["MENSUAL", "TRIMESTRAL", "ANUAL"]).nullable().optional().transform((v) => v || null),
  categoriaId: z.string().nullable().optional().transform((v) => v || null),
  variantes: z.array(varianteSchema).optional(),
});

export const productoUpdateSchema = productoCreateSchema.partial().extend({
  variantes: z.array(varianteSchema).optional(),
});

// ─── Categoria ───────────────────────────────────

export const categoriaCreateSchema = z.object({
  nombre: requiredString("Nombre de la categoría"),
});

// ─── Line Item (nested) ──────────────────────────

const lineItemSchema = z.object({
  descripcion: z.string().min(1, "Descripción del item es obligatoria"),
  productoId: z.string().nullable().optional().transform((v) => v ?? null),
  varianteId: z.string().nullable().optional().transform((v) => v ?? null),
  cantidad: z.number().min(0.01, "Cantidad debe ser mayor a 0").default(1),
  precioUnitario: z.number().min(0, "Precio unitario inválido"),
  descuento: percentage("Descuento").default(0),
  frecuencia: z.enum(["MENSUAL", "TRIMESTRAL", "ANUAL"]).nullable().optional().transform((v) => v || null),
});

// ─── Cotizacion ──────────────────────────────────

export const cotizacionCreateSchema = z.object({
  clienteId: requiredString("Cliente"),
  contactoNombre: optionalString,
  descuentoGlobal: percentage("Descuento global").default(0),
  impuesto: z.number().min(0).max(100).default(21),
  incluirIva: z.boolean().optional(),
  moneda: z.string().default("EUR"),
  notas: sanitizedText,
  condiciones: optionalString,
  fechaVencimiento: z.string().optional().nullable(),
  lineItems: z.array(lineItemSchema).default([]),
});

export const cotizacionUpdateSchema = z.object({
  estado: z
    .enum([
      "BORRADOR",
      "ENVIADA",
      "NEGOCIACION",
      "GANADA",
      "PERDIDA",
      "ARCHIVADA",
    ])
    .optional(),
  contactoNombre: optionalString,
  descuentoGlobal: percentage("Descuento global").optional(),
  impuesto: z.number().min(0).max(100).optional(),
  moneda: z.string().optional(),
  notas: sanitizedText,
  condiciones: optionalString,
  fechaVencimiento: z.string().optional().nullable(),
  lineItems: z.array(lineItemSchema).optional(),
});

// ─── Regla Comercial ─────────────────────────────

export const reglaCreateSchema = z.object({
  nombre: requiredString("Nombre de la regla"),
  tipo: z.enum(
    ["LIMITE_DESCUENTO", "PRODUCTO_OBLIGATORIO", "APROBACION", "PROMOCION"],
    { message: "Tipo de regla inválido" }
  ),
  configuracion: z.union([z.string(), z.record(z.string(), z.unknown())]),
  activa: z.boolean().default(true),
  prioridad: z.number().int().default(0),
});

export const reglaUpdateSchema = reglaCreateSchema.partial();

// ─── Reglas Validar ──────────────────────────────

export const reglasValidarSchema = z.object({
  lineItems: z.array(lineItemSchema),
  descuentoGlobal: z.number().default(0),
  subtotal: z.number().default(0),
  total: z.number().default(0),
});

// ─── Empresa ─────────────────────────────────────

export const empresaUpdateSchema = z.object({
  nombre: z.string().optional(),
  cif: optionalString,
  email: optionalEmail,
  telefono: optionalString,
  direccion: optionalString,
  ciudad: optionalString,
  pais: optionalString,
  web: optionalString,
  logoUrl: optionalString,
  plantillaPdf: z.string().optional(),
  colorPrimario: z
    .string()
    .regex(/^#[0-9a-fA-F]{6}$/, "Color inválido")
    .optional(),
  prefijoCotizacion: z.string().max(10).optional(),
  diasVencimiento: z.number().int().min(1).max(365).optional(),
  condicionesDefecto: optionalString,
  condicionesTransaccional: optionalString,
  condicionesContractual: optionalString,
  smtpHost: optionalString,
  smtpPort: z.number().int().min(1).max(65535).optional().nullable(),
  smtpUser: optionalString,
  smtpPass: optionalString,
  smtpSecure: z.boolean().optional(),
  // Reminder settings
  recordatorioSeguimientoDias: z.number().int().min(1).max(30).optional(),
  recordatorioVencimientoDias: z.number().int().min(1).max(30).optional(),
  recordatoriosActivos: z.boolean().optional(),
});

// ─── Firma Electrónica ──────────────────────────

export const firmaRequestSchema = z.object({
  signerName: requiredString("Nombre del firmante"),
  signerEmail: emailField,
});

export const firmaSignSchema = z.object({
  signatureData: z.string().min(1, "Firma es obligatoria"),
});

// ─── Email ───────────────────────────────────────

export const sendEmailSchema = z.object({
  to: emailField,
  subject: requiredString("Asunto"),
  htmlBody: z.string().optional(),
});

// ─── Aprobacion ──────────────────────────────────

export const aprobacionCreateSchema = z.object({
  reglaId: requiredString("ID de regla"),
  aprobadorNombre: requiredString("Nombre del aprobador"),
  aprobadorEmail: emailField,
});

export const aprobacionResolveSchema = z.object({
  estado: z.enum(["APROBADA", "RECHAZADA"], { message: "Estado inválido" }),
  comentario: sanitizedText,
});

// ─── Stripe Checkout ─────────────────────────────

export const stripeCheckoutSchema = z.object({
  plan: z.enum(["pro", "business"], { message: "Plan inválido" }),
});

// ─── Blog ───────────────────────────────────────

export const blogPostCreateSchema = z.object({
  titulo: requiredString("Título"),
  slug: z.string().optional(),
  extracto: requiredString("Extracto"),
  contenido: z.string().min(1, "Contenido es obligatorio"),
  imagen: optionalString,
  autor: z.string().default("DealForge"),
  categoria: z.enum(["ventas", "cpq", "ia", "producto", "guias", "general"]).default("general"),
  tags: z.array(z.string()).optional(),
  publicado: z.boolean().default(false),
  metaTitulo: optionalString,
  metaDescripcion: optionalString,
  metaKeywords: optionalString,
});

// ─── AI Assistant ────────────────────────────────

export const assistantChatSchema = z.object({
  message: z.string().min(1, "El mensaje es obligatorio"),
  context: z.object({
    pathname: z.string(),
    entityId: z.string().optional(),
  }),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string(),
      })
    )
    .default([]),
});
