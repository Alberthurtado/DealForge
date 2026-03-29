# Auditoría SEO Completa -- dealforge.es

**Fecha:** 28 de marzo de 2026
**Dominio:** https://dealforge.es
**Tipo:** SaaS CPQ (Configure, Price, Quote) para PYMEs
**Stack:** Next.js 16.1, React 19, Tailwind CSS 4.2, Vercel
**GA4 Property:** 527640266 (Measurement ID: G-97QZPF80KT)

---

## Resumen Ejecutivo

### Puntuación Global SEO: 68/100

| Categoría | Peso | Puntuación | Estado |
|-----------|------|-----------|--------|
| SEO Técnico | 25% | 82/100 | BIEN |
| Calidad de Contenido | 25% | 62/100 | NECESITA MEJORAS |
| SEO On-Page | 20% | 75/100 | ACEPTABLE |
| Schema / Datos Estructurados | 10% | 78/100 | BIEN |
| Performance (CWV) | 10% | 70/100 | NECESITA MEJORAS |
| Sitemap | 5% | 87/100 | MUY BIEN |
| AI Search Readiness | 5% | 71/100 | ACEPTABLE |

### Top 5 Problemas Críticos

1. **E-E-A-T muy débil:** Sin testimonios, sin equipo visible, sin prueba social
2. **Requisitos legales LSSI-CE incumplidos:** Falta CIF, aviso legal, banner de cookies
3. **Blog vacío:** 0 artículos publicados = 0 tráfico orgánico informacional
4. **Contenido thin en páginas programáticas:** Feature pages con ~400-600 palabras (mínimo recomendado: 800)
5. **Sin optimización de fuentes:** Inter declarado en CSS pero nunca cargado correctamente

### Top 5 Quick Wins

1. Implementar `next/font` para Inter (mejora LCP y CLS)
2. Crear página 404 personalizada
3. Añadir canonical tags a 5 páginas legales
4. Corregir Math.random() que causa hydration mismatch
5. Añadir BreadcrumbList al blog index

---

## Datos de Google Analytics (últimos 28 días)

| Métrica | Valor |
|---------|-------|
| Usuarios activos | 54 |
| Nuevos usuarios | 54 |
| Usuarios recurrentes | 10 |
| Tiempo medio de engagement | 2m 45s |
| Sesiones por usuario | 1.0 |

### Fuentes de Adquisición

| Canal | Usuarios | % Total |
|-------|----------|---------|
| Directo | 53 | 98.15% |
| Organic Social | 1 | 1.85% |

### Geografía

| País | Usuarios |
|------|----------|
| España | 23 |
| Estados Unidos | 14 |
| Francia | 3 |
| Venezuela | 3 |
| Canadá | 2 |
| Bélgica | 1 |

### Ciudades principales

| Ciudad | Usuarios |
|--------|----------|
| Madrid | 18 |
| Sant Cugat del Vallès | 6 |
| Barcelona | 3 |
| París | 3 |
| San José | 3 |

### Páginas más visitadas

| Página | Vistas |
|--------|--------|
| Cotizaciones | 41 |
| Iniciar Sesión | 41 |
| Configuración | 19 |
| Productos | 19 |

### Diagnóstico de Tráfico

- **98% del tráfico es directo** = casi ningún tráfico orgánico (SEO) ni social
- **0 tráfico de búsqueda orgánica** = el sitio no rankea para ninguna keyword
- **WAU/MAU ratio: 13%** = retención baja
- **Blog vacío** = sin contenido que atraiga tráfico informacional
- **Sin presencia en redes sociales** = sin tráfico social

---

## 1. SEO Técnico (82/100)

### Lo que funciona bien
- Robots.txt excelente con reglas para crawlers de IA (GPTBot, ClaudeBot, PerplexityBot)
- SSR/SSG bien implementado: todas las páginas públicas son Server Components
- Headers de seguridad de nivel enterprise (HSTS, CSP, X-Frame-Options)
- URLs limpias y SEO-friendly en español
- IndexNow integrado para notificación proactiva a Bing/Yandex
- Middleware no bloquea crawlers en rutas públicas

### Problemas detectados

| Prioridad | Problema | Impacto |
|-----------|----------|---------|
| ALTA | No existe `not-found.tsx` (página 404) | Los errores 404 muestran una página genérica sin navegación |
| ALTA | No se usa `next/font` para Inter | La fuente se declara pero no se carga (los usuarios ven system font) |
| MEDIA | 5 páginas sin canonical tag (/privacidad, /terminos, /rgpd, /documentacion, /changelog) | Riesgo de contenido duplicado |
| MEDIA | No hay `loading.tsx` en ninguna ruta | Sin streaming UI durante navegación |
| BAJA | `unsafe-eval` en CSP | Posible riesgo de seguridad en producción |
| BAJA | Header X-XSS-Protection deprecado | Sin impacto real |

### Google Analytics
- GA4 instalado correctamente con `next/script` strategy `afterInteractive`
- Measurement ID: G-97QZPF80KT
- Property ID 527640266 parece corresponder a esta propiedad (verificar en Admin > Property Settings)

---

## 2. Calidad de Contenido (62/100)

### E-E-A-T: 48/100

| Factor | Puntuación | Problema |
|--------|-----------|----------|
| Experience (Experiencia) | 25/100 | CERO testimonios, sin capturas reales, sin casos de uso reales |
| Expertise (Experiencia técnica) | 50/100 | Buenas páginas de features pero sin autoría ni credenciales |
| Authoritativeness (Autoridad) | 35/100 | Sin presencia en G2/Capterra, sin prensa, sin backlinks |
| Trustworthiness (Confianza) | 58/100 | Falta CIF, aviso legal, banner cookies (requisitos legales) |

### Contenido Thin

| Página | Palabras estimadas | Mínimo recomendado | Veredicto |
|--------|-------------------|--------------------|-----------|
| Homepage | ~350 | 500 | POR DEBAJO |
| Feature index | ~120 | 500 | MUY THIN |
| Feature detail (x14) | ~400-600 | 800 | POR DEBAJO |
| Template index | ~100 | 500 | MUY THIN |
| Template detail (x30) | ~500-700 | 800 | POR DEBAJO |
| Blog | ~50 (vacío) | N/A | VACÍO |
| Documentación | ~3000+ | N/A | EXCELENTE |

### Problemas de Legibilidad
- Faltan tildes en varios textos: "Articulos" > "Artículos", "Proximamente" > "Próximamente"
- Jerga inglesa sin traducir: "deals", "follow-up", "pipeline"
- Keyword "Mexico" en la feature de gestión de clientes (debería ser España)

---

## 3. Schema / Datos Estructurados (78/100)

### Schemas implementados
- Organization + WebSite (root layout)
- SoftwareApplication con Offers (homepage)
- Blog + BlogPosting + Article (blog)
- BreadcrumbList (features, templates, blog posts)
- CollectionPage (feature index, template index)
- FAQPage (feature y template detail pages)

### Problemas

| Prioridad | Problema | Acción |
|-----------|----------|--------|
| ALTA | FAQPage schema no elegible para rich results (restricción Google agosto 2023) | Eliminar de features y templates |
| ALTA | SoftwareApplication sin aggregateRating | Añadir cuando haya reviews reales |
| MEDIA | Organization logo como string SVG | Cambiar a ImageObject con PNG |
| MEDIA | SearchAction apunta a /blog?q= que posiblemente no funciona | Verificar o eliminar |
| MEDIA | sameAs vacío en Organization | Añadir perfiles sociales |
| BAJA | downloadUrl en SoftwareApplication | Cambiar a url para SaaS web |

---

## 4. Sitemap (87/100)

### Estructura actual
- 10 páginas estáticas
- 31 páginas de industria (/plantilla-cotizacion)
- 15 páginas de features (/funcionalidades)
- Blog posts dinámicos desde base de datos
- **Total: ~56+ URLs** (bien dentro del límite de 50,000)

### Puntos positivos
- XML válido generado por Next.js
- Declarado correctamente en robots.txt
- Fechas lastmod reales (no fabricadas)
- Sin páginas autenticadas incluidas

### Problemas
- Falta página dedicada /precios (keyword comercial importante)
- /recuperar no bloqueada en robots.txt
- Todas las páginas de industria comparten la misma fecha lastmod

---

## 5. Performance / Core Web Vitals (70/100)

| Métrica | Estimación actual | Objetivo | Estado |
|---------|-------------------|----------|--------|
| LCP | 2.5-3.5s | <2.5s | NECESITA MEJORAS |
| INP | <200ms | <200ms | BIEN |
| CLS | 0.05-0.15 | <0.1 | NECESITA MEJORAS |

### Problemas principales
1. `Math.random()` en el mockup del dashboard causa hydration mismatch en cada carga
2. Sin `next/font`: Inter no se carga realmente, usuarios ven fuentes del sistema
3. ForgeShowcase y FAQAccordion se cargan eagerly (deberían ser lazy)
4. Sin `loading.tsx` en ninguna ruta
5. CSS del dashboard (fire button, ~140 líneas) se envía a todas las páginas
6. Sitemap con `force-dynamic` (se regenera en cada request)

### Lo positivo
- Hero sin imágenes pesadas (CSS puro) = excelente para LCP
- Server Components para todas las páginas públicas
- Sin dependencias pesadas en el landing (recharts solo en dashboard)
- Pocos third-party scripts (solo GA)

---

## 6. Internal Linking

### Problemas detectados
- Sin cross-linking entre feature pages
- Sin cross-linking entre template pages
- /guia sin links entrantes desde homepage
- /plantilla-cotizacion sin links desde homepage
- /funcionalidades no está en el navbar (solo anchor link)
- FAQ answers sin links contextuales
- Blog CTAs genéricos (solo /registro)

---

## 7. AI Search Readiness (71/100)

### Lo positivo
- robots.txt permite crawlers de IA
- Datos estructurados bien implementados
- Precios citables (0, 29, 79 EUR/mes)
- Headings con jerarquía clara

### Lo que falta
- Sin contenido educativo citable ("Qué es CPQ")
- Sin datos originales ni estadísticas propias
- Blog vacío (vector principal para citaciones IA)
- Sin glosario de términos
