import { NextResponse } from "next/server";
import { RECURSOS } from "@/data/recursos";

const recursosList = RECURSOS.map((r) => {
  const title = `${r.titulo}${r.tituloResaltado ? " " + r.tituloResaltado : ""}`;
  return `- [${title}](https://dealforge.es/recursos/${r.slug}): ${r.descripcion}`;
}).join("\n");

const LLMS_TXT = `# DealForge

> DealForge es un sistema CPQ (Configure, Price, Quote) con inteligencia artificial para PYMEs. Permite crear cotizaciones profesionales, gestionar clientes, productos, contratos y analizar el pipeline de ventas. Incluye Forge, un asistente de IA integrado.

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
