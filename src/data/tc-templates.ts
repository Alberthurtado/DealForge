// Galería de plantillas de Términos y Condiciones
// Usado en Configuración para aplicar con 1 clic a condicionesTransaccional/Contractual

export interface TCTemplate {
  id: string;
  nombre: string;
  tipo: "transaccional" | "contractual" | "ambas";
  descripcion: string;
  icon: string;
  contenido: string;
}

export type TCTemplateLang = "es" | "en";

const ES_TEMPLATES: TCTemplate[] = [
  {
    id: "basica-servicios",
    nombre: "Básica — Servicios profesionales",
    tipo: "transaccional",
    descripcion: "Ideal para freelancers y consultores que venden servicios por proyecto.",
    icon: "💼",
    contenido: `VALIDEZ: Esta oferta tiene una validez de 30 días desde la fecha de emisión.

PAGO: 50% al aceptar la propuesta y 50% a la entrega. Pago por transferencia bancaria a 15 días.

ALCANCE: Los entregables son los detallados expresamente en esta cotización. Cualquier modificación del alcance requerirá presupuesto adicional.

PROPIEDAD INTELECTUAL: Los derechos de los entregables se transfieren al cliente tras el pago íntegro.

CONFIDENCIALIDAD: Ambas partes se comprometen a mantener la confidencialidad de la información intercambiada.

JURISDICCIÓN: Para cualquier controversia, las partes se someten a los juzgados de [Tu ciudad] y a la legislación española.`,
  },
  {
    id: "basica-producto",
    nombre: "Básica — Venta de producto",
    tipo: "transaccional",
    descripcion: "Para empresas que venden bienes físicos, con cláusulas de envío y garantía.",
    icon: "📦",
    contenido: `VALIDEZ: Esta oferta es válida durante 30 días desde la fecha de emisión. Los precios pueden variar según disponibilidad.

PAGO: Pago por transferencia bancaria a 30 días desde la entrega. Impagos conllevan intereses de demora del 8% anual.

ENTREGA: El plazo estimado de entrega se especifica en la cotización. No se incluyen gastos de transporte salvo indicación expresa.

GARANTÍA: 24 meses por defectos de fabricación. No cubre daños por uso indebido o desgaste normal.

DEVOLUCIONES: Aceptamos devoluciones en 14 días naturales desde la entrega, en su embalaje original.

JURISDICCIÓN: Legislación española. Juzgados de [Tu ciudad].`,
  },
  {
    id: "completa-b2b",
    nombre: "Completa B2B — Protección máxima",
    tipo: "transaccional",
    descripcion: "T&C extensa para ventas B2B con cláusulas legales robustas.",
    icon: "🛡️",
    contenido: `1. VALIDEZ DE LA OFERTA
Esta oferta tiene una validez de 30 días desde su emisión. Transcurrido este plazo, será necesaria una nueva cotización.

2. FORMA Y PLAZOS DE PAGO
Se requerirá un 30% de anticipo al aceptar la propuesta. El saldo restante se abonará en un plazo máximo de 30 días desde la factura. Impagos conllevarán recargo por mora del 8% anual (Ley 3/2004).

3. ENTREGABLES Y PLAZOS
Los entregables y plazos serán los indicados expresamente en esta cotización. Cualquier modificación del alcance requerirá un anexo firmado por ambas partes.

4. CANCELACIÓN
En caso de cancelación tras iniciar el trabajo, se facturará el porcentaje del proyecto ya ejecutado, con un mínimo del 30%.

5. PROPIEDAD INTELECTUAL
Los derechos sobre los entregables se transfieren al cliente una vez efectuado el pago íntegro del importe facturado.

6. CONFIDENCIALIDAD
Ambas partes se comprometen a mantener la confidencialidad de cualquier información intercambiada durante 3 años desde la finalización del proyecto.

7. RESPONSABILIDAD
La responsabilidad total del proveedor quedará limitada al importe total de esta cotización.

8. PROTECCIÓN DE DATOS
Los datos personales se tratarán conforme al RGPD y la LOPDGDD. Consulta nuestra política en [web].

9. JURISDICCIÓN Y LEY APLICABLE
Para cualquier controversia derivada, las partes se someten a los juzgados de [Tu ciudad], siendo de aplicación la legislación española.`,
  },
  {
    id: "saas-suscripcion",
    nombre: "SaaS / Suscripción",
    tipo: "contractual",
    descripcion: "Para empresas SaaS con modelos de suscripción mensual o anual.",
    icon: "☁️",
    contenido: `DURACIÓN: El contrato tiene una duración mínima de 12 meses desde la fecha de activación.

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
    tipo: "transaccional",
    descripcion: "Para agencias con proyectos por fases y cesión de derechos.",
    icon: "🎨",
    contenido: `FASES Y PAGOS
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
    tipo: "contractual",
    descripcion: "Para consultoras con modelo de iguala mensual con horas incluidas.",
    icon: "🧠",
    contenido: `MODALIDAD: Servicio de consultoría bajo modelo de iguala mensual con X horas de dedicación incluidas.

DURACIÓN MÍNIMA: 6 meses con renovación automática mensual salvo preaviso de 30 días.

FACTURACIÓN: Iguala mensual facturada por adelantado los primeros 5 días del mes.

HORAS EXTRA: Las horas que excedan las contratadas se facturan a la tarifa acordada, con aviso previo al cliente.

HORARIO DE ATENCIÓN: L-V de 9:00 a 18:00. Respuesta garantizada en 24 h laborables.

CONFIDENCIALIDAD REFORZADA: Obligación de confidencialidad durante la vigencia y 5 años tras la finalización del servicio.

ENTREGABLES: Los informes, análisis y documentos generados son propiedad del cliente tras pago.

NO EXCLUSIVIDAD: El consultor puede prestar servicios similares a terceros no competidores directos.

JURISDICCIÓN: Legislación española. Juzgados de [Tu ciudad].`,
  },
  {
    id: "minimalista",
    nombre: "Minimalista — Autónomo",
    tipo: "transaccional",
    descripcion: "Versión corta para autónomos que empiezan. 5 cláusulas esenciales.",
    icon: "✏️",
    contenido: `• Oferta válida durante 30 días.
• Pago: 50% al aceptar, 50% a la entrega. Transferencia bancaria.
• Los plazos son orientativos y dependen de la entrega puntual de materiales por el cliente.
• Cualquier cambio del alcance implica nueva cotización.
• Legislación española. Juzgados de [Tu ciudad].`,
  },
  {
    id: "internacional",
    nombre: "Internacional / Multimoneda",
    tipo: "ambas",
    descripcion: "Para clientes fuera de la UE o con fluctuación de divisa.",
    icon: "🌍",
    contenido: `VALIDITY / VALIDEZ: This offer is valid for 30 days from issue date / Esta oferta es válida 30 días desde su emisión.

CURRENCY / DIVISA: Prices are in EUR. For non-EUR payments, exchange rate applies at the day of invoice. Price adjustment clause applies if EUR/USD fluctuates over 5%.

PAYMENT / PAGO: Payment by international bank transfer (SWIFT) within 30 days. All bank fees are borne by the client.

TAX / IMPUESTOS: For intra-EU clients with valid VIES VAT number, reverse charge applies (invoice without VAT). For non-EU clients, invoice issued without VAT as export.

INCOTERMS: EXW (Ex Works) unless otherwise stated in the quotation.

LANGUAGE / IDIOMA: In case of discrepancy, the Spanish version shall prevail.

JURISDICTION / JURISDICCIÓN: Spanish law applies. Courts of [Your city], Spain.`,
  },
];

const EN_TEMPLATES: TCTemplate[] = [
  {
    id: "basica-servicios",
    nombre: "Basic — Professional services",
    tipo: "transaccional",
    descripcion: "Ideal for freelancers and consultants selling services per project.",
    icon: "💼",
    contenido: `VALIDITY: This offer is valid for 30 days from the issue date.

PAYMENT: 50% on accepting the proposal and 50% on delivery. Payment by bank transfer within 15 days.

SCOPE: The deliverables are those expressly detailed in this quote. Any change to the scope will require an additional quote.

INTELLECTUAL PROPERTY: Rights to the deliverables transfer to the client upon full payment.

CONFIDENTIALITY: Both parties undertake to keep the information exchanged confidential.

JURISDICTION: Any dispute shall be governed by the laws of [your jurisdiction] and submitted to the courts of [your city].`,
  },
  {
    id: "basica-producto",
    nombre: "Basic — Product sale",
    tipo: "transaccional",
    descripcion: "For companies selling physical goods, with shipping and warranty clauses.",
    icon: "📦",
    contenido: `VALIDITY: This offer is valid for 30 days from the issue date. Prices may vary depending on availability.

PAYMENT: Payment by bank transfer within 30 days of delivery. Late payments accrue interest of 8% per year.

DELIVERY: The estimated delivery time is specified in the quote. Shipping costs are not included unless expressly stated.

WARRANTY: 24 months against manufacturing defects. Does not cover damage from misuse or normal wear.

RETURNS: We accept returns within 14 calendar days of delivery, in their original packaging.

JURISDICTION: Governed by the laws of [your jurisdiction]. Courts of [your city].`,
  },
  {
    id: "completa-b2b",
    nombre: "Full B2B — Maximum protection",
    tipo: "transaccional",
    descripcion: "Extensive T&C for B2B sales with robust legal clauses.",
    icon: "🛡️",
    contenido: `1. VALIDITY OF THE OFFER
This offer is valid for 30 days from issue. After this period, a new quote will be required.

2. PAYMENT TERMS
A 30% deposit is required on accepting the proposal. The remaining balance is due within 30 days of the invoice. Late payments incur a late-payment surcharge of 8% per year under applicable legislation.

3. DELIVERABLES AND TIMELINES
The deliverables and timelines are those expressly stated in this quote. Any change to the scope requires an addendum signed by both parties.

4. CANCELLATION
If cancelled after work has started, the percentage of the project already completed will be billed, with a minimum of 30%.

5. INTELLECTUAL PROPERTY
Rights to the deliverables transfer to the client once the full invoiced amount has been paid.

6. CONFIDENTIALITY
Both parties undertake to keep any information exchanged confidential for 3 years after the project ends.

7. LIABILITY
The supplier's total liability is limited to the total amount of this quote.

8. DATA PROTECTION
Personal data is processed in accordance with applicable data-protection law (GDPR). See our policy at [web].

9. JURISDICTION AND GOVERNING LAW
Any resulting dispute shall be submitted to the courts of [your city], governed by the laws of [your jurisdiction].`,
  },
  {
    id: "saas-suscripcion",
    nombre: "SaaS / Subscription",
    tipo: "contractual",
    descripcion: "For SaaS companies with monthly or annual subscription models.",
    icon: "☁️",
    contenido: `TERM: The contract has a minimum term of 12 months from the activation date.

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
    tipo: "transaccional",
    descripcion: "For agencies with phased projects and assignment of rights.",
    icon: "🎨",
    contenido: `PHASES AND PAYMENTS
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
    tipo: "contractual",
    descripcion: "For consultancies with a monthly retainer model with included hours.",
    icon: "🧠",
    contenido: `MODEL: Consulting service under a monthly retainer model with X hours of dedication included.

MINIMUM TERM: 6 months with automatic monthly renewal unless 30 days' notice is given.

BILLING: Monthly retainer billed in advance within the first 5 days of the month.

EXTRA HOURS: Hours exceeding those contracted are billed at the agreed rate, with prior notice to the client.

SUPPORT HOURS: Mon-Fri 9:00 to 18:00. Guaranteed response within 24 business hours.

ENHANCED CONFIDENTIALITY: Confidentiality obligation during the term and for 5 years after the service ends.

DELIVERABLES: Reports, analyses and documents produced are the client's property upon payment.

NON-EXCLUSIVITY: The consultant may provide similar services to third parties that are not direct competitors.

JURISDICTION: Governed by the laws of [your jurisdiction]. Courts of [your city].`,
  },
  {
    id: "minimalista",
    nombre: "Minimalist — Sole trader",
    tipo: "transaccional",
    descripcion: "Short version for sole traders starting out. 5 essential clauses.",
    icon: "✏️",
    contenido: `• Offer valid for 30 days.
• Payment: 50% on acceptance, 50% on delivery. Bank transfer.
• Timelines are indicative and depend on the client providing materials on time.
• Any change to the scope means a new quote.
• Governed by the laws of [your jurisdiction]. Courts of [your city].`,
  },
  {
    id: "internacional",
    nombre: "International / Multi-currency",
    tipo: "ambas",
    descripcion: "For clients outside your home country or with currency fluctuation.",
    icon: "🌍",
    contenido: `VALIDITY: This offer is valid for 30 days from the issue date.

CURRENCY: Prices are in the currency stated on the quote. For payments in another currency, the exchange rate at the invoice date applies. A price-adjustment clause applies if the exchange rate fluctuates by more than 5%.

PAYMENT: Payment by international bank transfer (SWIFT) within 30 days. All bank fees are borne by the client.

TAX: For intra-EU clients with a valid VIES VAT number, reverse charge applies (invoice without VAT). For clients outside the EU, the invoice is issued without VAT as an export.

INCOTERMS: EXW (Ex Works) unless otherwise stated in the quotation.

LANGUAGE: In case of discrepancy between language versions, the English version shall prevail.

JURISDICTION: Governed by the laws of [your jurisdiction]. Courts of [your city].`,
  },
];

export const TC_TEMPLATES_BY_LANG: Record<TCTemplateLang, TCTemplate[]> = {
  es: ES_TEMPLATES,
  en: EN_TEMPLATES,
};

export function getTCTemplates(lang: TCTemplateLang = "es"): TCTemplate[] {
  return TC_TEMPLATES_BY_LANG[lang] ?? ES_TEMPLATES;
}

// Back-compat: default Spanish list
export const TC_TEMPLATES = ES_TEMPLATES;
