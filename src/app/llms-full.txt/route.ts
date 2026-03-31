import { NextResponse } from "next/server";
import { TERMINOS } from "@/data/glosario";
import { industrias } from "@/data/industrias";

function buildFullContent(): string {
  const sections: string[] = [];

  // ── Header ──
  sections.push(`# DealForge — CPQ Inteligente con IA para PYMEs

> DealForge es un sistema CPQ (Configure, Price, Quote) con inteligencia artificial disenado para PYMEs y equipos comerciales. Automatiza la creacion de cotizaciones, gestion de clientes, productos, contratos y analisis de ventas. Incluye Forge, un asistente de IA integrado que permite crear cotizaciones y consultar datos en lenguaje natural.

Website: https://dealforge.es
Email: info@dealforge.es
Registro gratuito: https://dealforge.es/registro`);

  // ── Que es CPQ ──
  sections.push(`## Que es un CPQ

CPQ significa Configure, Price, Quote (Configurar, Precio, Cotizar). Es un software que automatiza tres procesos clave del ciclo de ventas:

1. **Configure (Configurar)**: Seleccionar y combinar productos o servicios segun las necesidades del cliente, aplicando reglas de compatibilidad automaticamente.
2. **Price (Precio)**: Calcular precios con descuentos, impuestos, margenes y reglas comerciales de forma automatica y sin errores.
3. **Quote (Cotizar)**: Generar documentos de cotizacion profesionales (PDF) listos para enviar al cliente en minutos, no horas.

DealForge es un CPQ disenado especificamente para PYMEs, con una interfaz simple y un asistente de IA (Forge) que permite crear cotizaciones con instrucciones en lenguaje natural.`);

  // ── Funcionalidades ──
  sections.push(`## Funcionalidades Principales

### Gestion de Clientes
Base de datos centralizada de clientes con contactos multiples, historial de cotizaciones, sector, CIF, direccion y notas. Importacion y exportacion por CSV.

### Catalogo de Productos
Gestion de productos con SKU, precios base, categorias, variantes y facturacion recurrente (mensual, trimestral, anual). Soporte para productos de pago unico y suscripciones.

### Cotizaciones Profesionales
Creacion de cotizaciones con calculo automatico de subtotales, descuentos, IVA y totales. Generacion de PDF profesional con logo y datos de empresa. Envio por email directo. Versionado para mantener historial de cambios.

### Forge IA (Asistente Inteligente)
Asistente de inteligencia artificial integrado que puede:
- Crear cotizaciones completas desde instrucciones en lenguaje natural
- Buscar clientes, productos y cotizaciones
- Analizar metricas del pipeline de ventas
- Recomendar acciones de follow-up
- Crear clientes y productos conversando
Funciona con Claude Haiku (Starter/Pro) o Claude Sonnet (Business).

### Firma Electronica
Sistema de firma digital integrado que cumple con eIDAS. El cliente recibe un enlace por email, firma dibujando en pantalla, y se registra con sello de fecha, IP y datos del firmante. Funciona tanto para cotizaciones como para contratos.

### Reglas Comerciales
Motor de reglas configurables:
- Limite de descuento maximo por producto o categoria
- Producto obligatorio (si incluyes X, debes incluir Y)
- Promociones automaticas por volumen o combinacion
- Flujos de aprobacion cuando se supera un umbral (monto, descuento)

### Gestion de Contratos
Ciclo de vida completo: creacion desde cotizacion ganada, plantillas personalizables con variables auto-rellenadas, generacion de documento, enmiendas (upsell, downsell, modificacion, extension, cancelacion), renovacion automatica, firma electronica y generacion de PDF.

### Reportes y Analitica
Dashboard con KPIs en tiempo real: ingresos totales, tasa de conversion, deal medio, pipeline activo. Graficos interactivos: tendencia de ingresos, ganadas vs perdidas, conversion mensual, pipeline por estado, top clientes, top productos, ingresos por categoria. Filtros por periodo y widgets personalizables.

### Integraciones
Importacion y exportacion de datos por CSV (clientes y productos). API REST para integraciones con herramientas externas (Zapier, Make, n8n). Clave API configurable desde el panel.

### Equipo y Multiusuario
Invitacion de miembros del equipo por email. Gestion de roles. Datos compartidos entre miembros del mismo equipo. Limite de usuarios por plan (Pro: 5, Business: 20).`);

  // ── Planes y Precios ──
  sections.push(`## Planes y Precios

### Starter (Gratis para siempre)
- 10 cotizaciones/mes
- 5 clientes, 10 productos
- 5 consultas Forge IA (Haiku)
- 1 usuario
- Exportacion CSV
- Versionado de cotizaciones

### Pro (29 EUR/mes o 290 EUR/ano)
- 100 cotizaciones/mes
- 50 clientes, 200 productos
- Forge IA ilimitado (Haiku)
- Hasta 5 usuarios
- Firma electronica
- Envio de emails
- Import/Export CSV
- PDF con marca
- Recordatorios automaticos
- Reglas basicas

### Business (79 EUR/mes o 790 EUR/ano)
- Cotizaciones ilimitadas
- Clientes y productos ilimitados
- Forge IA avanzado (Sonnet)
- Hasta 20 usuarios
- Gestion de contratos completa
- Reglas comerciales avanzadas
- Flujos de aprobacion
- Integraciones CRM
- Soporte prioritario

No hay compromiso de permanencia. Sin tarjeta de credito para el plan Starter.`);

  // ── Industrias ──
  const industriasList = industrias
    .map((i) => `- **${i.nombre}**: ${i.descripcion.slice(0, 120)}`)
    .join("\n");

  sections.push(`## Plantillas por Sector

DealForge ofrece plantillas de cotizacion especializadas para ${industrias.length} industrias:

${industriasList}

Cada plantilla incluye lineas de ejemplo, problemas comunes del sector, beneficios de usar CPQ, FAQ especificas y una guia de cotizacion.`);

  // ── Glosario ──
  const glosarioList = TERMINOS
    .sort((a, b) => a.nombre.localeCompare(b.nombre, "es"))
    .map((t) => `- **${t.nombre}**: ${t.definicion.slice(0, 150)}${t.definicion.length > 150 ? "..." : ""}`)
    .join("\n");

  sections.push(`## Glosario de CPQ y Ventas

${glosarioList}`);

  // ── Diferenciadores ──
  sections.push(`## Por que DealForge

1. **IA Integrada**: Forge permite crear cotizaciones con lenguaje natural, algo que ningun otro CPQ para PYMEs ofrece.
2. **Disenado para PYMEs**: Interfaz simple, sin la complejidad de Salesforce CPQ o SAP. Operativo en minutos.
3. **Todo en uno**: Clientes, productos, cotizaciones, contratos, firma electronica, reportes y equipo en una sola plataforma.
4. **En espanol**: Interfaz completa en espanol, con soporte para el mercado europeo (IVA, eIDAS, RGPD).
5. **Plan gratuito real**: Plan Starter gratuito para siempre, no trial de 14 dias.
6. **Precio accesible**: Desde 29 EUR/mes frente a los 75-150 EUR/usuario/mes de competidores como PandaDoc o Proposify.`);

  // ── Contacto ──
  sections.push(`## Contacto y Soporte

- Email: info@dealforge.es
- Web: https://dealforge.es
- Soporte: https://dealforge.es/soporte (dentro del dashboard)
- Registro: https://dealforge.es/registro
- Documentacion: https://dealforge.es/documentacion
- Blog: https://dealforge.es/blog
- Glosario: https://dealforge.es/glosario`);

  return sections.join("\n\n---\n\n");
}

export async function GET() {
  const content = buildFullContent();

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
