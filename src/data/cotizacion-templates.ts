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

export const COTIZACION_TEMPLATES: CotizacionTemplate[] = [
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
