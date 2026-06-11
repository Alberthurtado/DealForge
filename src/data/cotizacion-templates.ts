// Plantillas de cotización por sector
// Usadas en el wizard de nueva cotización para prellenar líneas, notas y T&C
// Todas las líneas son personalizables tras aplicar la plantilla

export interface CotizacionTemplateLine {
  descripcion: string;
  cantidad: number;
  precioUnitario: number;
  descuento?: number;
  frecuencia?: "MENSUAL" | "ANUAL" | null;
}

export interface CotizacionTemplate {
  id: string;
  nombre: string;
  sector: string;
  icon: string;
  color: string;
  descripcion: string;
  lineItems: CotizacionTemplateLine[];
  notas: string;
  condiciones: string;
}

export type CotizacionTemplateLang = "es" | "en";

const ES_TEMPLATES: CotizacionTemplate[] = [
  {
    id: "servicios-profesionales",
    nombre: "Servicios profesionales",
    sector: "Consultoría / Freelance",
    icon: "💼",
    color: "blue",
    descripcion:
      "Proyecto por fases con análisis, desarrollo y entrega. Ideal para consultoras y freelancers.",
    lineItems: [
      {
        descripcion: "Fase 1 — Análisis y diagnóstico inicial",
        cantidad: 1,
        precioUnitario: 1500,
      },
      {
        descripcion: "Fase 2 — Ejecución del proyecto",
        cantidad: 1,
        precioUnitario: 4500,
      },
      {
        descripcion: "Fase 3 — Entrega, formación y soporte (30 días)",
        cantidad: 1,
        precioUnitario: 1000,
      },
    ],
    notas:
      "El proyecto se ejecuta en 3 fases con hitos de validación. Los plazos comienzan desde la aceptación de la propuesta y el pago del anticipo.",
    condiciones: `VALIDEZ: Esta oferta tiene una validez de 30 días desde la fecha de emisión.

PAGO: 50% al aceptar la propuesta y 50% a la entrega. Pago por transferencia bancaria a 15 días.

ALCANCE: Los entregables son los detallados expresamente en esta cotización. Cualquier modificación del alcance requerirá presupuesto adicional.

PROPIEDAD INTELECTUAL: Los derechos de los entregables se transfieren al cliente tras el pago íntegro.

CONFIDENCIALIDAD: Ambas partes se comprometen a mantener la confidencialidad de la información intercambiada.

JURISDICCIÓN: Para cualquier controversia, las partes se someten a los juzgados de [Tu ciudad] y a la legislación española.`,
  },
  {
    id: "venta-producto",
    nombre: "Venta de producto",
    sector: "Comercio / Distribución",
    icon: "📦",
    color: "amber",
    descripcion:
      "Pedido de producto físico con transporte y garantía. Ideal para empresas que distribuyen bienes.",
    lineItems: [
      {
        descripcion: "Producto [nombre] — Referencia [SKU]",
        cantidad: 10,
        precioUnitario: 150,
      },
      {
        descripcion: "Transporte y logística",
        cantidad: 1,
        precioUnitario: 80,
      },
      {
        descripcion: "Instalación / puesta en marcha (opcional)",
        cantidad: 1,
        precioUnitario: 200,
        descuento: 100,
      },
    ],
    notas:
      "Entrega estimada en 7-10 días laborables desde la confirmación del pedido. Los precios incluyen embalaje estándar.",
    condiciones: `VALIDEZ: Esta oferta es válida durante 30 días desde la fecha de emisión. Los precios pueden variar según disponibilidad.

PAGO: Pago por transferencia bancaria a 30 días desde la entrega. Impagos conllevan intereses de demora del 8% anual.

ENTREGA: El plazo estimado de entrega se especifica en la cotización. No se incluyen gastos de transporte salvo indicación expresa.

GARANTÍA: 24 meses por defectos de fabricación. No cubre daños por uso indebido o desgaste normal.

DEVOLUCIONES: Aceptamos devoluciones en 14 días naturales desde la entrega, en su embalaje original.

JURISDICCIÓN: Legislación española. Juzgados de [Tu ciudad].`,
  },
  {
    id: "saas-suscripcion",
    nombre: "SaaS / Suscripción",
    sector: "Software / Tecnología",
    icon: "☁️",
    color: "purple",
    descripcion:
      "Suscripción mensual con setup inicial y soporte. Ideal para empresas SaaS y productos recurrentes.",
    lineItems: [
      {
        descripcion: "Setup inicial y onboarding",
        cantidad: 1,
        precioUnitario: 500,
      },
      {
        descripcion: "Licencia plataforma — Plan [nombre]",
        cantidad: 1,
        precioUnitario: 99,
        frecuencia: "MENSUAL",
      },
      {
        descripcion: "Soporte prioritario 24/7",
        cantidad: 1,
        precioUnitario: 49,
        frecuencia: "MENSUAL",
      },
    ],
    notas:
      "El setup es un pago único. La licencia y soporte se facturan mensualmente por domiciliación. El contrato tiene una duración mínima de 12 meses.",
    condiciones: `DURACIÓN: El contrato tiene una duración mínima de 12 meses desde la fecha de activación.

FACTURACIÓN: Se facturará de forma recurrente según la periodicidad acordada (mensual/anual). El cliente autoriza el cargo automático por domiciliación bancaria o tarjeta.

RENOVACIÓN: Renovación automática por periodos iguales salvo preaviso de cancelación con 30 días de antelación antes del vencimiento.

NIVELES DE SERVICIO (SLA): Uptime garantizado del 99,5% mensual. Soporte en horario laboral (L-V 9:00-18:00).

ACTUALIZACIONES: Incluidas todas las actualizaciones del producto sin coste adicional durante la vigencia del contrato.

DATOS: El cliente mantiene la propiedad de sus datos. El proveedor actúa como encargado del tratamiento conforme al RGPD.

CANCELACIÓN: El cliente puede cancelar en cualquier momento con efectos al final del periodo facturado. No se realizan reembolsos por periodos parciales.

JURISDICCIÓN: Legislación española. Juzgados de [Tu ciudad].`,
  },
  {
    id: "agencia-creativa",
    nombre: "Agencia creativa / Marketing",
    sector: "Agencias / Marketing",
    icon: "🎨",
    color: "pink",
    descripcion:
      "Campaña con investigación, diseño y ejecución. Ideal para agencias de marketing y estudios creativos.",
    lineItems: [
      {
        descripcion: "Investigación de mercado y definición estratégica",
        cantidad: 1,
        precioUnitario: 1200,
      },
      {
        descripcion: "Dirección de arte y concepto creativo",
        cantidad: 1,
        precioUnitario: 2000,
      },
      {
        descripcion: "Producción de piezas — [número] entregables",
        cantidad: 1,
        precioUnitario: 3500,
      },
      {
        descripcion: "Gestión y reporting de campaña",
        cantidad: 1,
        precioUnitario: 800,
        frecuencia: "MENSUAL",
      },
    ],
    notas:
      "Se incluyen 2 rondas de revisión por entregable. Revisiones adicionales se facturan a 60€/hora. Los derechos de uso se transfieren tras el pago total.",
    condiciones: `FASES Y PAGOS
El proyecto se estructura en 3 fases con hitos de pago:
- 30% al aceptar la propuesta
- 30% al entregar los primeros conceptos creativos
- 40% a la entrega final tras aprobación

REVISIONES
Se incluyen hasta 2 rondas de revisión por entregable. Revisiones adicionales se facturarán a 60€/hora.

CESIÓN DE DERECHOS
Los derechos de uso comercial se transfieren al cliente únicamente tras el pago total. La agencia se reserva el derecho a usar el trabajo en su portfolio salvo acuerdo expreso en contrario.

MATERIALES DEL CLIENTE
El cliente garantiza disponer de los derechos de los materiales proporcionados (imágenes, textos, marcas). La agencia queda exenta de responsabilidad por su uso.

PLAZOS
Los plazos son estimativos y están sujetos a la entrega puntual de feedback y materiales por parte del cliente.

RESCISIÓN
En caso de rescisión, se facturará el trabajo realizado hasta la fecha más un 20% en concepto de lucro cesante.

JURISDICCIÓN: Legislación española. Juzgados de [Tu ciudad].`,
  },
  {
    id: "consultoria-retainer",
    nombre: "Consultoría — Retainer mensual",
    sector: "Consultoría estratégica",
    icon: "🧠",
    color: "green",
    descripcion:
      "Iguala mensual con horas incluidas. Ideal para consultoras con clientes recurrentes.",
    lineItems: [
      {
        descripcion: "Iguala mensual — 20 horas de consultoría incluidas",
        cantidad: 1,
        precioUnitario: 2500,
        frecuencia: "MENSUAL",
      },
      {
        descripcion: "Hora adicional fuera de iguala",
        cantidad: 0,
        precioUnitario: 150,
      },
      {
        descripcion: "Setup inicial y kick-off del servicio",
        cantidad: 1,
        precioUnitario: 500,
      },
    ],
    notas:
      "Compromiso mínimo de 6 meses. Las horas no consumidas no se acumulan entre meses. Horas extra se avisan al cliente antes de facturarse.",
    condiciones: `MODALIDAD: Servicio de consultoría bajo modelo de iguala mensual con X horas de dedicación incluidas.

DURACIÓN MÍNIMA: 6 meses con renovación automática mensual salvo preaviso de 30 días.

FACTURACIÓN: Iguala mensual facturada por adelantado los primeros 5 días del mes.

HORAS EXTRA: Las horas que excedan las contratadas se facturan a la tarifa acordada, con aviso previo al cliente.

HORARIO DE ATENCIÓN: L-V de 9:00 a 18:00. Respuesta garantizada en 24 h laborables.

CONFIDENCIALIDAD REFORZADA: Obligación de confidencialidad durante la vigencia y 5 años tras la finalización del servicio.

ENTREGABLES: Los informes, análisis y documentos generados son propiedad del cliente tras pago.

NO EXCLUSIVIDAD: El consultor puede prestar servicios similares a terceros no competidores directos.

JURISDICCIÓN: Legislación española. Juzgados de [Tu ciudad].`,
  },
];

const EN_TEMPLATES: CotizacionTemplate[] = [
  {
    id: "servicios-profesionales",
    nombre: "Professional services",
    sector: "Consulting / Freelance",
    icon: "💼",
    color: "blue",
    descripcion:
      "Phased project with analysis, delivery and handover. Ideal for consultancies and freelancers.",
    lineItems: [
      {
        descripcion: "Phase 1 — Analysis and initial assessment",
        cantidad: 1,
        precioUnitario: 1500,
      },
      {
        descripcion: "Phase 2 — Project execution",
        cantidad: 1,
        precioUnitario: 4500,
      },
      {
        descripcion: "Phase 3 — Handover, training and support (30 days)",
        cantidad: 1,
        precioUnitario: 1000,
      },
    ],
    notas:
      "The project runs in 3 phases with validation milestones. Timelines start once the proposal is accepted and the deposit is paid.",
    condiciones: `VALIDITY: This offer is valid for 30 days from the issue date.

PAYMENT: 50% on accepting the proposal and 50% on delivery. Payment by bank transfer within 15 days.

SCOPE: The deliverables are those expressly detailed in this quote. Any change to the scope will require an additional quote.

INTELLECTUAL PROPERTY: Rights to the deliverables transfer to the client upon full payment.

CONFIDENTIALITY: Both parties undertake to keep the information exchanged confidential.

JURISDICTION: Any dispute shall be governed by the laws of [your jurisdiction] and submitted to the courts of [your city].`,
  },
  {
    id: "venta-producto",
    nombre: "Product sale",
    sector: "Retail / Distribution",
    icon: "📦",
    color: "amber",
    descripcion:
      "Physical product order with shipping and warranty. Ideal for companies that distribute goods.",
    lineItems: [
      {
        descripcion: "Product [name] — Reference [SKU]",
        cantidad: 10,
        precioUnitario: 150,
      },
      {
        descripcion: "Shipping and logistics",
        cantidad: 1,
        precioUnitario: 80,
      },
      {
        descripcion: "Installation / setup (optional)",
        cantidad: 1,
        precioUnitario: 200,
        descuento: 100,
      },
    ],
    notas:
      "Estimated delivery in 7-10 business days from order confirmation. Prices include standard packaging.",
    condiciones: `VALIDITY: This offer is valid for 30 days from the issue date. Prices may vary depending on availability.

PAYMENT: Payment by bank transfer within 30 days of delivery. Late payments accrue interest of 8% per year.

DELIVERY: The estimated delivery time is specified in the quote. Shipping costs are not included unless expressly stated.

WARRANTY: 24 months against manufacturing defects. Does not cover damage from misuse or normal wear.

RETURNS: We accept returns within 14 calendar days of delivery, in their original packaging.

JURISDICTION: Governed by the laws of [your jurisdiction]. Courts of [your city].`,
  },
  {
    id: "saas-suscripcion",
    nombre: "SaaS / Subscription",
    sector: "Software / Technology",
    icon: "☁️",
    color: "purple",
    descripcion:
      "Monthly subscription with initial setup and support. Ideal for SaaS companies and recurring products.",
    lineItems: [
      {
        descripcion: "Initial setup and onboarding",
        cantidad: 1,
        precioUnitario: 500,
      },
      {
        descripcion: "Platform license — [name] plan",
        cantidad: 1,
        precioUnitario: 99,
        frecuencia: "MENSUAL",
      },
      {
        descripcion: "24/7 priority support",
        cantidad: 1,
        precioUnitario: 49,
        frecuencia: "MENSUAL",
      },
    ],
    notas:
      "Setup is a one-off payment. The license and support are billed monthly by direct debit. The contract has a minimum term of 12 months.",
    condiciones: `TERM: The contract has a minimum term of 12 months from the activation date.

BILLING: Billed on a recurring basis according to the agreed frequency (monthly/annual). The client authorizes automatic charging by direct debit or card.

RENEWAL: Automatic renewal for equal periods unless cancellation notice is given 30 days before expiry.

SERVICE LEVELS (SLA): Guaranteed uptime of 99.5% monthly. Support during business hours (Mon-Fri 9:00-18:00).

UPDATES: All product updates included at no extra cost for the duration of the contract.

DATA: The client retains ownership of their data. The provider acts as data processor in accordance with the GDPR.

CANCELLATION: The client may cancel at any time, effective at the end of the billed period. No refunds are given for partial periods.

JURISDICTION: Governed by the laws of [your jurisdiction]. Courts of [your city].`,
  },
  {
    id: "agencia-creativa",
    nombre: "Creative / Marketing agency",
    sector: "Agencies / Marketing",
    icon: "🎨",
    color: "pink",
    descripcion:
      "Campaign with research, design and execution. Ideal for marketing agencies and creative studios.",
    lineItems: [
      {
        descripcion: "Market research and strategic definition",
        cantidad: 1,
        precioUnitario: 1200,
      },
      {
        descripcion: "Art direction and creative concept",
        cantidad: 1,
        precioUnitario: 2000,
      },
      {
        descripcion: "Asset production — [number] deliverables",
        cantidad: 1,
        precioUnitario: 3500,
      },
      {
        descripcion: "Campaign management and reporting",
        cantidad: 1,
        precioUnitario: 800,
        frecuencia: "MENSUAL",
      },
    ],
    notas:
      "Includes 2 rounds of revisions per deliverable. Additional revisions are billed at €60/hour. Usage rights transfer upon full payment.",
    condiciones: `PHASES AND PAYMENTS
The project is structured in 3 phases with payment milestones:
- 30% on accepting the proposal
- 30% on delivery of the first creative concepts
- 40% on final delivery after approval

REVISIONS
Up to 2 rounds of revisions per deliverable are included. Additional revisions will be billed at €60/hour.

ASSIGNMENT OF RIGHTS
Commercial usage rights transfer to the client only upon full payment. The agency reserves the right to use the work in its portfolio unless expressly agreed otherwise.

CLIENT MATERIALS
The client warrants that they hold the rights to the materials provided (images, text, trademarks). The agency is released from any liability for their use.

TIMELINES
Timelines are estimates and depend on the client providing feedback and materials on time.

TERMINATION
In the event of termination, work completed to date will be billed plus 20% as lost profit.

JURISDICTION: Governed by the laws of [your jurisdiction]. Courts of [your city].`,
  },
  {
    id: "consultoria-retainer",
    nombre: "Consulting — Monthly retainer",
    sector: "Strategic consulting",
    icon: "🧠",
    color: "green",
    descripcion:
      "Monthly retainer with included hours. Ideal for consultancies with recurring clients.",
    lineItems: [
      {
        descripcion: "Monthly retainer — 20 consulting hours included",
        cantidad: 1,
        precioUnitario: 2500,
        frecuencia: "MENSUAL",
      },
      {
        descripcion: "Additional hour beyond retainer",
        cantidad: 0,
        precioUnitario: 150,
      },
      {
        descripcion: "Initial setup and service kick-off",
        cantidad: 1,
        precioUnitario: 500,
      },
    ],
    notas:
      "Minimum commitment of 6 months. Unused hours do not roll over between months. Extra hours are flagged to the client before being billed.",
    condiciones: `MODEL: Consulting service under a monthly retainer model with X hours of dedication included.

MINIMUM TERM: 6 months with automatic monthly renewal unless 30 days' notice is given.

BILLING: Monthly retainer billed in advance within the first 5 days of the month.

EXTRA HOURS: Hours exceeding those contracted are billed at the agreed rate, with prior notice to the client.

SUPPORT HOURS: Mon-Fri 9:00 to 18:00. Guaranteed response within 24 business hours.

ENHANCED CONFIDENTIALITY: Confidentiality obligation during the term and for 5 years after the service ends.

DELIVERABLES: Reports, analyses and documents produced are the client's property upon payment.

NON-EXCLUSIVITY: The consultant may provide similar services to third parties that are not direct competitors.

JURISDICTION: Governed by the laws of [your jurisdiction]. Courts of [your city].`,
  },
];

export const COTIZACION_TEMPLATES_BY_LANG: Record<CotizacionTemplateLang, CotizacionTemplate[]> = {
  es: ES_TEMPLATES,
  en: EN_TEMPLATES,
};

export function getCotizacionTemplates(
  lang: CotizacionTemplateLang = "es"
): CotizacionTemplate[] {
  return COTIZACION_TEMPLATES_BY_LANG[lang] ?? ES_TEMPLATES;
}

// Back-compat: default Spanish list
export const COTIZACION_TEMPLATES = ES_TEMPLATES;
