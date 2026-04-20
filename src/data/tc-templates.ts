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

export const TC_TEMPLATES: TCTemplate[] = [
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
