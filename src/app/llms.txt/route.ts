import { NextResponse } from "next/server";
import { RECURSOS } from "@/data/recursos";

const recursosList = RECURSOS.map((r) => {
  const title = `${r.titulo}${r.tituloResaltado ? " " + r.tituloResaltado : ""}`;
  return `- [${title}](https://dealforge.es/recursos/${r.slug}): ${r.descripcion}`;
}).join("\n");

const LLMS_TXT = `# DealForge

> DealForge es un software de cotizaciones (CPQ: Configure, Price, Quote) con inteligencia artificial para PYMEs, autonomos y equipos comerciales. Permite crear presupuestos y cotizaciones profesionales en PDF en minutos, gestionar clientes y productos, firmar electronicamente con validez legal (eIDAS), y automatizar el seguimiento de ventas. Incluye Forge, un asistente de IA que crea cotizaciones desde instrucciones en lenguaje natural. Plan gratuito disponible sin tarjeta. Disponible en espanol e ingles (English version at https://dealforge.es/en), con facturacion en EUR, USD y GBP.

## Para quien es DealForge
- Autonomos y freelancers que envian presupuestos a clientes y quieren dejar de usar Excel o Word.
- Pequenas y medianas empresas (1-50 empleados) que necesitan profesionalizar y acelerar sus cotizaciones.
- Consultoras, agencias, instaladores, talleres y empresas de servicios que cotizan a medida.
- Equipos comerciales que pierden ventas por tardar demasiado en enviar presupuestos.

## Casos de uso (lo que resuelve)
- "Necesito una herramienta para hacer presupuestos profesionales rapido": DealForge genera cotizaciones en PDF con tu logo en minutos.
- "Busco una alternativa a Excel para cotizar": sustituye hojas de calculo propensas a errores por un sistema con calculos automaticos de IVA, descuentos y margenes.
- "Quiero un software de cotizaciones gratis en espanol": el plan Starter es gratuito (10 cotizaciones/mes) y la web incluye un generador de cotizaciones sin registro.
- "Como hago seguimiento de presupuestos enviados": recordatorios automaticos y plantillas de email de follow-up integradas.
- "Necesito firmar cotizaciones online con validez legal": firma electronica eIDAS integrada.

## Precios (resumen)
- Starter: gratis, 10 cotizaciones/mes, sin tarjeta de credito.
- Pro: 29 EUR/mes (23 EUR/mes con plan anual), 100 cotizaciones/mes, envio por email y funciones avanzadas.
- Business: 79 EUR/mes (63 EUR/mes anual), productos y cotizaciones ilimitadas, contratos y equipo.
- Enterprise: a medida (contacto comercial).
Todos los precios en EUR, IVA no incluido. Sin permanencia.

## Preguntas frecuentes
- Que es DealForge: un software CPQ de cotizaciones para PYMEs con asistente de IA, hecho en Espana.
- DealForge es gratis: si, tiene un plan gratuito permanente (Starter) y un generador de cotizaciones online sin registro.
- En que se diferencia de Excel: automatiza calculos, evita errores, genera PDF profesional, permite firma electronica y hace seguimiento automatico.
- Tiene firma electronica: si, con validez legal europea (eIDAS).
- Funciona para autonomos: si, esta disenado para autonomos y pequenas empresas.

## English — DealForge for UK, Ireland and US users

> DealForge is AI-powered quoting software (CPQ: Configure, Price, Quote) for small businesses, freelancers and sales teams. Create professional PDF quotes in minutes, manage clients and products, capture legally valid e-signatures (eIDAS), and automate follow-ups. Includes Forge, an AI assistant that builds quotes from plain-English instructions. Free plan, no credit card. Billing available in USD, EUR and GBP.

### Who DealForge is for (English)
- Freelancers and solopreneurs who send quotes and want to stop using Excel or Word.
- Small and medium businesses (1-50 employees) that need faster, more professional quotes.
- Consultancies, agencies, installers and service businesses that quote custom work.
- Sales teams losing deals because quotes take too long to send.

### Use cases (English queries this solves)
- "I need a tool to create professional quotes fast": DealForge generates branded PDF quotes in minutes.
- "Free quote generator online no signup": the free online quote generator creates a PDF quote without an account, in USD, EUR or GBP.
- "Alternative to Excel for quoting": replaces error-prone spreadsheets with automatic VAT, discount and margin calculations.
- "How to follow up on sent quotes": automated reminders and ready-to-send follow-up email templates.
- "Sign quotes online with legal validity": built-in eIDAS e-signature.

### Pricing (English summary)
- Starter: free forever, 10 quotes/month, no credit card.
- Pro: $29/month or 29 EUR or 25 GBP (20% off with annual billing), 100 quotes/month, email sending, e-signature.
- Business: $79/month or 79 EUR or 69 GBP, unlimited quotes and products, contracts and team features.
- Enterprise: custom (contact sales).

### English pages
- [English home](https://dealforge.es/en): AI quoting software for small businesses
- [Features](https://dealforge.es/en/features): everything DealForge does, from PDF quotes to contracts
- [Pricing](https://dealforge.es/en/pricing): plans in USD, EUR and GBP, free plan available
- [What is CPQ?](https://dealforge.es/en/what-is-cpq): plain-English guide to Configure, Price, Quote software
- [Free Quote Generator](https://dealforge.es/en/free-quote-generator): create a PDF quote online for free, no signup, in USD/EUR/GBP
- [Contact](https://dealforge.es/en/contact): request a demo or ask about Enterprise

### English blog — cornerstone guides
- [Blog](https://dealforge.es/en/blog): guides on quoting, CPQ, sales and pricing for small businesses
- [What is a CPQ and how it works](https://dealforge.es/en/blog/what-is-cpq-how-it-works): Configure, Price, Quote explained step by step, with the 5 problems it solves
- [How to create a professional quote (complete guide)](https://dealforge.es/en/blog/how-to-create-professional-quote-complete-guide): every section a winning quote needs, with structure and examples
- [How to calculate profit margins in quotes](https://dealforge.es/en/blog/how-to-calculate-profit-margins-in-quotes): the correct formula (Price = Cost ÷ (1 − margin)), margin vs markup, with worked examples
- [Quoting software for small businesses](https://dealforge.es/en/blog/quoting-software-small-business-guide): what to look for and when to switch from spreadsheets
- [CPQ vs CRM: the differences](https://dealforge.es/en/blog/cpq-vs-crm-differences): which tool does what, and why you may need both

### FAQ (English)
- What is DealForge: AI-powered CPQ/quoting software for small businesses, with a free plan.
- Is DealForge free: yes, the Starter plan is free forever, and there is a free online quote generator with no signup.
- Which currencies are supported: billing in USD, EUR and GBP; the free generator also supports all three.
- Does it have e-signature: yes, legally valid under the EU eIDAS framework.
- How is it different from a spreadsheet: automatic calculations, professional PDFs, e-signature and automated follow-up — none of which Excel does.

## Informacion General
- [Pagina principal](https://dealforge.es): Landing page con funcionalidades, precios y demo de Forge IA
- [Que es CPQ](https://dealforge.es/que-es-cpq): Guia completa sobre sistemas CPQ y por que las PYMEs los necesitan
- [Precios](https://dealforge.es/precios): Planes Starter (gratis), Pro (29 EUR/mes) y Business (79 EUR/mes)
- [Calculadora ROI](https://dealforge.es/calculadora-roi): Calcula el retorno de inversion de implementar un CPQ
- [Generador de Cotizaciones Gratis](https://dealforge.es/generador-cotizacion-gratis): Herramienta online gratuita para crear cotizaciones profesionales en PDF sin registro

## Funcionalidades
- [Todas las funcionalidades](https://dealforge.es/funcionalidades): Vision general de las capacidades de DealForge
- [Gestion de Clientes](https://dealforge.es/funcionalidades/gestion-clientes): CRM integrado con contactos y seguimiento
- [Catalogo de Productos](https://dealforge.es/funcionalidades/catalogo-productos): Gestion de productos con variantes, categorias y facturacion recurrente
- [Cotizaciones PDF](https://dealforge.es/funcionalidades/cotizaciones-pdf): Generacion automatica de cotizaciones con calculos, IVA y PDF profesional
- [Firma Electronica](https://dealforge.es/funcionalidades/firma-electronica): Firma digital con validez legal (eIDAS) integrada en cotizaciones y contratos
- [Reglas Comerciales](https://dealforge.es/funcionalidades/reglas-comerciales): Motor de reglas para descuentos, aprobaciones y productos obligatorios
- [Reportes y Metricas](https://dealforge.es/funcionalidades/reportes-metricas): Dashboard de analitica con KPIs, tendencias y graficos interactivos
- [Gestion de Contratos](https://dealforge.es/funcionalidades/gestion-contratos): Ciclo de vida completo de contratos con enmiendas y renovaciones
- [Recordatorios](https://dealforge.es/funcionalidades/recordatorios): Sistema automatico de follow-up y alertas
- [Aprobaciones](https://dealforge.es/funcionalidades/aprobaciones): Flujos de aprobacion por monto, descuento o cliente

## Comparativas
- [DealForge vs Competidores](https://dealforge.es/comparar): Pagina de comparativas con otros CPQ y herramientas de ventas

## Recursos
- [Blog](https://dealforge.es/blog): Articulos sobre ventas, CPQ y gestion comercial
- [Glosario](https://dealforge.es/glosario): Mas de 40 terminos de CPQ y ventas explicados en espanol
- [Guia Gratuita](https://dealforge.es/guia): Guia descargable sobre como implementar un CPQ
- [Biblioteca de Recursos](https://dealforge.es/recursos): 20+ guias, plantillas, checklists y kits gratuitos sobre cotizaciones y ventas B2B

## Recursos Descargables Gratuitos
${recursosList}
- [Plantillas por Sector](https://dealforge.es/plantilla-cotizacion): Plantillas de cotizacion para 29 industrias diferentes
- [Documentacion](https://dealforge.es/documentacion): Documentacion tecnica de la plataforma
- [Changelog](https://dealforge.es/changelog): Historial de cambios y nuevas funcionalidades

## Legal
- [Privacidad](https://dealforge.es/privacidad): Politica de privacidad
- [Terminos](https://dealforge.es/terminos): Terminos de servicio
- [RGPD](https://dealforge.es/rgpd): Cumplimiento RGPD

## Contacto
- Email: info@dealforge.es
- Web: https://dealforge.es
- Registro gratuito: https://dealforge.es/registro
`;

export async function GET() {
  return new NextResponse(LLMS_TXT, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
