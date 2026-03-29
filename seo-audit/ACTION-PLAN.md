# Plan de Acción SEO -- dealforge.es

**Fecha:** 28 de marzo de 2026
**Puntuación actual:** 68/100
**Objetivo:** 85/100 en 8 semanas

---

## P0 -- CRÍTICO (Hacer esta semana)

### 1. Requisitos legales LSSI-CE
- [ ] Añadir CIF/NIF de la empresa en el footer
- [ ] Añadir dirección fiscal completa (no solo "Barcelona, España")
- [ ] Crear página de Aviso Legal (/aviso-legal)
- [ ] Implementar banner de consentimiento de cookies
- [ ] Añadir checkbox de consentimiento RGPD al formulario de contacto
**Impacto:** Legal compliance + Trustworthiness E-E-A-T

### 2. Fix Math.random() hydration mismatch
- [ ] Reemplazar `Math.random()` en page.tsx línea 156 con valores fijos
**Archivo:** `src/app/page.tsx`
**Impacto:** Elimina re-renders innecesarios en cada carga

### 3. Implementar next/font para Inter
- [ ] `import { Inter } from 'next/font/google'` en layout.tsx
- [ ] Eliminar referencia manual a Inter en globals.css
**Archivo:** `src/app/layout.tsx`, `src/app/globals.css`
**Impacto:** LCP + CLS mejoran significativamente

---

## P1 -- ALTA PRIORIDAD (Próximas 2 semanas)

### 4. Crear página 404 personalizada
- [ ] Crear `src/app/not-found.tsx` con diseño branded y links de navegación
**Impacto:** UX + SEO (los crawlers manejan URLs muertas correctamente)

### 5. Añadir testimonios y prueba social
- [ ] Mínimo 3 testimonios con nombre, cargo y empresa
- [ ] Capturas reales del producto (no mockups CSS)
- [ ] Sección "Sobre nosotros" con bio del fundador
**Impacto:** E-E-A-T Experience +75 puntos potenciales

### 6. Publicar contenido en el blog
- [ ] "Qué es un CPQ y por qué tu PYME lo necesita" (2000+ palabras, pilar page)
- [ ] "Cómo hacer una cotización profesional en 5 minutos"
- [ ] "5 errores comunes en presupuestos que te hacen perder ventas"
- [ ] "CPQ vs CRM: Diferencias y cuándo necesitas cada uno"
- [ ] "Guía de automatización comercial para PYMEs"
**Impacto:** Tráfico orgánico informacional + AI citation readiness

### 7. Crear página /precios dedicada
- [ ] Extraer pricing de homepage a página propia
- [ ] Optimizar para "CPQ precio", "software cotizaciones precio"
- [ ] Añadir al sitemap
**Impacto:** Keyword comercial de alto valor

### 8. Añadir canonical tags faltantes
- [ ] /privacidad
- [ ] /terminos
- [ ] /rgpd
- [ ] /documentacion
- [ ] /changelog
**Impacto:** Previene problemas de contenido duplicado

### 9. Corregir Organization schema
- [ ] Cambiar logo de string SVG a ImageObject con PNG
- [ ] Rellenar sameAs con perfiles sociales
- [ ] Cambiar foundingDate a formato completo "2026-01-01"
**Archivo:** `src/app/layout.tsx`

### 10. Eliminar FAQPage schema no elegible
- [ ] Eliminar JSON-LD FAQPage de `/funcionalidades/[slug]`
- [ ] Eliminar JSON-LD FAQPage de `/plantilla-cotizacion/[slug]`
**Impacto:** Reduce peso de página, evita confusión

---

## P2 -- MEDIA PRIORIDAD (Próximas 4 semanas)

### 11. Expandir contenido de páginas programáticas
- [ ] Feature pages: expandir a 800+ palabras cada una
- [ ] Template pages: expandir a 800+ palabras cada una
- [ ] Añadir elemento único por página (screenshot, tip experto, tabla comparativa)
**Impacto:** Evita flag de "scaled content" / contenido thin

### 12. Mejorar internal linking
- [ ] Cross-links entre feature pages relacionadas ("También te puede interesar")
- [ ] Cross-links entre template pages de industrias similares
- [ ] Links desde homepage body a /funcionalidades, /plantilla-cotizacion, /blog, /guia
- [ ] Links contextuales en FAQ answers
- [ ] Añadir blog y features al navbar principal
**Impacto:** Distribución de link equity + mejor crawlability

### 13. Optimizar performance
- [ ] Lazy-load ForgeShowcase y FAQAccordion con `next/dynamic`
- [ ] Añadir `loading.tsx` a rutas dinámicas
- [ ] Añadir `error.tsx` boundaries
- [ ] Mover CSS del fire button a stylesheet del dashboard
- [ ] Cambiar sitemap de `force-dynamic` a ISR con `revalidate: 3600`
**Impacto:** LCP 2.5-3.5s → 1.5-2.5s estimado

### 14. Corregir meta titles y descriptions
- [ ] Estandarizar separador a `|` en todos los títulos
- [ ] Mantener títulos bajo 60 caracteres
- [ ] Mantener descriptions entre 120-155 caracteres
- [ ] Corregir tildes en todas las meta tags
- [ ] Homepage H1: incluir "CPQ" directamente
**Impacto:** CTR en SERPs + coherencia de marca

### 15. Bloquear /recuperar en robots.txt
- [ ] Añadir `/recuperar` a disallow rules
**Archivo:** `src/app/robots.ts`

### 16. Verificar SearchAction endpoint
- [ ] Comprobar si /blog?q= funciona
- [ ] Si no funciona, eliminar potentialAction del WebSite schema
**Archivo:** `src/app/layout.tsx`

---

## P3 -- BAJA PRIORIDAD (Próximas 8 semanas)

### 17. Construir autoridad externa
- [ ] Registrar DealForge en G2, Capterra, GetApp
- [ ] Crear assets enlazables (calculadora ROI CPQ, templates descargables)
- [ ] Publicar en medios SaaS/business españoles
- [ ] Establecer presencia social activa (LinkedIn, X)

### 18. Crear contenido para AI citation
- [ ] Guía definitiva "Qué es CPQ" (2000+ palabras)
- [ ] Glosario de términos CPQ/ventas en español
- [ ] Restaurar FAQPage schema en homepage para consumo de IA

### 19. Mejoras menores
- [ ] Corregir keyword "Mexico" en features.ts (debería ser España)
- [ ] Añadir explicación inline de jerga inglesa (CPQ, CRM, pipeline)
- [ ] Añadir viewport export explícito en layout.tsx
- [ ] Considerar añadir `dns-prefetch` para googletagmanager.com
- [ ] Añadir Service schema complementario en homepage

---

## Impacto Estimado

| Acción | Mejora estimada en tráfico |
|--------|---------------------------|
| Blog con 5+ artículos | +500% tráfico orgánico (desde 0) |
| Página /precios | +20-30 visitas/mes (keyword comercial) |
| Fix E-E-A-T (testimonios, equipo) | +15% CTR en SERPs |
| Internal linking mejorado | +10% pageviews por sesión |
| Performance fixes (CWV) | +5-10% ranking boost |
| Schema fixes | +10% visibilidad en rich results |

### Timeline

| Semana | Acciones | Puntuación estimada |
|--------|----------|-------------------|
| 1 | P0 (legal, font, hydration fix) | 72/100 |
| 2-3 | P1 (testimonios, blog, 404, pricing) | 78/100 |
| 4-6 | P2 (contenido, linking, performance) | 83/100 |
| 7-8 | P3 (autoridad, AI readiness) | 85/100 |

---

*Informe generado automáticamente por auditoría SEO de DealForge.*
*Para dudas: info@dealforge.es*
