// Plantillas de email de seguimiento post-cotización
// Accesible desde la vista de detalle de una cotización
// Variables soportadas: {{cliente}}, {{empresa}}, {{numero}}, {{total}}, {{validez}}

export interface EmailTemplate {
  id: string;
  nombre: string;
  dia: string; // "Día +2", "Día +5"...
  tipo: "seguimiento" | "valor" | "objecion" | "urgencia" | "proof" | "cierre" | "breakup";
  asunto: string;
  cuerpo: string;
  descripcion: string;
  icon: string;
  color: string; // tailwind class suffix
}

const ES_TEMPLATES: EmailTemplate[] = [
  {
    id: "dia-2-seguimiento",
    nombre: "Seguimiento suave",
    dia: "Día +2",
    tipo: "seguimiento",
    icon: "👋",
    color: "blue",
    descripcion: "Email corto y directo. Sin presión. Tasa de respuesta típica: 22%.",
    asunto: "¿Has podido revisar la propuesta {{numero}}?",
    cuerpo: `Hola {{cliente}},

¿Has tenido ocasión de revisar la propuesta que te envié hace un par de días?

Me encantaría escuchar tu opinión inicial o cualquier duda que te haya surgido — estoy aquí para aclarar lo que haga falta.

Un saludo,
{{empresa}}`,
  },
  {
    id: "dia-5-valor",
    nombre: "Aportar valor",
    dia: "Día +5",
    tipo: "valor",
    icon: "💡",
    color: "green",
    descripcion: "Demuestra experiencia sin vender. Comparte un recurso útil.",
    asunto: "Algo que puede interesarte sobre tu proyecto",
    cuerpo: `Hola {{cliente}},

Mientras reflexionas sobre nuestra propuesta, quería compartirte un caso real de un cliente similar a tu empresa que nos comentó retos parecidos a los tuyos.

Te adjunto el recurso (o enlace). Creo que puedes sacar algunas ideas aplicables aunque no trabajemos juntos.

Si tienes un rato esta semana, encantado de comentarlo por teléfono.

Un saludo,
{{empresa}}`,
  },
  {
    id: "dia-8-objecion",
    nombre: "Rebatir objeción preventiva",
    dia: "Día +8",
    tipo: "objecion",
    icon: "🤔",
    color: "amber",
    descripcion: "Adelántate a dudas típicas. Rompe el silencio con naturalidad.",
    asunto: "Un tema que suele surgir — {{numero}}",
    cuerpo: `Hola {{cliente}},

Algunos clientes en tu situación nos preguntan cómo gestionamos [objeción típica: soporte, plazos, personalización, etc.]. Te lo aclaro por si acaso estuviera generando dudas:

[Respuesta breve a la objeción]

Si hay algún otro punto de la propuesta que te genere fricción, dímelo y lo resolvemos antes de avanzar.

Un saludo,
{{empresa}}`,
  },
  {
    id: "dia-12-urgencia",
    nombre: "Urgencia genuina",
    dia: "Día +12",
    tipo: "urgencia",
    icon: "⏰",
    color: "orange",
    descripcion: "Recuerda la validez de la oferta. Urgencia real, no manipuladora.",
    asunto: "La oferta {{numero}} caduca en {{validez}} días",
    cuerpo: `Hola {{cliente}},

Un recordatorio amable: la propuesta que te envié tiene validez hasta [fecha]. Pasada esa fecha tendría que revisar los precios.

Si quieres que avancemos, basta con que confirmes por aquí y te envío el siguiente paso para firmar.

Si prefieres más tiempo, dímelo y veo si puedo mantenerte los precios actuales.

Un saludo,
{{empresa}}`,
  },
  {
    id: "dia-15-proof",
    nombre: "Social proof",
    dia: "Día +15",
    tipo: "proof",
    icon: "🏆",
    color: "purple",
    descripcion: "Testimonio o caso de éxito reciente para reforzar confianza.",
    asunto: "Acabamos de cerrar con [Empresa similar]",
    cuerpo: `Hola {{cliente}},

Te escribo porque justo esta semana hemos empezado a trabajar con [Empresa similar], que tenía retos parecidos a los tuyos.

Su caso:
- Situación inicial: [problema]
- Qué estamos haciendo: [solución]
- Resultados esperados: [métrica]

Te lo cuento por si te ayuda a visualizar cómo se aplicaría en tu caso concreto. ¿Seguimos adelante con la propuesta {{numero}}?

Un saludo,
{{empresa}}`,
  },
  {
    id: "dia-18-cierre",
    nombre: "Cierre directo",
    dia: "Día +18",
    tipo: "cierre",
    icon: "🎯",
    color: "red",
    descripcion: "Directo al grano. Fuerza la decisión sin presionar. Genera ~18% de respuestas.",
    asunto: "¿Seguimos adelante o cierro la propuesta {{numero}}?",
    cuerpo: `Hola {{cliente}},

No quiero ser pesado, pero necesito organizar mi agenda.

¿Quieres que sigamos adelante con la propuesta {{numero}} o la cierro por ahora?

Cualquiera de las dos respuestas me vale — solo necesito saber para planificar.

Un saludo,
{{empresa}}`,
  },
  {
    id: "dia-21-breakup",
    nombre: "Break-up email",
    dia: "Día +21",
    tipo: "breakup",
    icon: "👋",
    color: "gray",
    descripcion: "El email paradójico. Desactiva la presión. Tasa de respuesta del 33% — la más alta.",
    asunto: "Asumo que no es el momento",
    cuerpo: `Hola {{cliente}},

Entiendo que ahora mismo no es el momento adecuado para avanzar con la propuesta {{numero}}.

Sin problema — aquí seguiré cuando cambie la situación. Guardaré tu contacto y si en el futuro quieres retomarlo, basta con escribirme.

Te deseo mucho éxito en lo que tengas entre manos ahora mismo.

Un saludo,
{{empresa}}`,
  },
];

const EN_TEMPLATES: EmailTemplate[] = [
  {
    id: "dia-2-seguimiento",
    nombre: "Soft follow-up",
    dia: "Day +2",
    tipo: "seguimiento",
    icon: "👋",
    color: "blue",
    descripcion: "Short and direct. No pressure. Typical reply rate: 22%.",
    asunto: "Did you get a chance to review proposal {{numero}}?",
    cuerpo: `Hi {{cliente}},

Did you get a chance to look over the proposal I sent a couple of days ago?

I'd love to hear your first impressions or any questions that came up — happy to clarify whatever you need.

Best,
{{empresa}}`,
  },
  {
    id: "dia-5-valor",
    nombre: "Add value",
    dia: "Day +5",
    tipo: "valor",
    icon: "💡",
    color: "green",
    descripcion: "Show expertise without selling. Share a useful resource.",
    asunto: "Something that might be useful for your project",
    cuerpo: `Hi {{cliente}},

While you're thinking over our proposal, I wanted to share a real case from a client similar to your company who mentioned challenges much like yours.

I've attached the resource (or link). I think you'll find a few ideas worth applying even if we don't end up working together.

If you have a moment this week, I'd be glad to talk it through on a call.

Best,
{{empresa}}`,
  },
  {
    id: "dia-8-objecion",
    nombre: "Pre-empt an objection",
    dia: "Day +8",
    tipo: "objecion",
    icon: "🤔",
    color: "amber",
    descripcion: "Get ahead of common doubts. Break the silence naturally.",
    asunto: "A question that often comes up — {{numero}}",
    cuerpo: `Hi {{cliente}},

Some clients in your situation ask how we handle [typical objection: support, timelines, customization, etc.]. Let me clear it up in case it's giving you pause:

[Brief answer to the objection]

If there's any other part of the proposal causing friction, just tell me and we'll sort it out before moving forward.

Best,
{{empresa}}`,
  },
  {
    id: "dia-12-urgencia",
    nombre: "Genuine urgency",
    dia: "Day +12",
    tipo: "urgencia",
    icon: "⏰",
    color: "orange",
    descripcion: "Remind them the offer expires. Real urgency, not manipulative.",
    asunto: "Offer {{numero}} expires in {{validez}} days",
    cuerpo: `Hi {{cliente}},

A friendly reminder: the proposal I sent is valid until [date]. After that I'd have to revisit the pricing.

If you'd like to go ahead, just confirm here and I'll send you the next step to sign.

If you need more time, let me know and I'll see whether I can hold the current pricing for you.

Best,
{{empresa}}`,
  },
  {
    id: "dia-15-proof",
    nombre: "Social proof",
    dia: "Day +15",
    tipo: "proof",
    icon: "🏆",
    color: "purple",
    descripcion: "A recent testimonial or success story to build trust.",
    asunto: "We just started working with [Similar company]",
    cuerpo: `Hi {{cliente}},

I'm reaching out because this very week we started working with [Similar company], who had challenges much like yours.

Their case:
- Starting point: [problem]
- What we're doing: [solution]
- Expected results: [metric]

I'm sharing it in case it helps you picture how this would apply to your situation. Shall we move ahead with proposal {{numero}}?

Best,
{{empresa}}`,
  },
  {
    id: "dia-18-cierre",
    nombre: "Direct close",
    dia: "Day +18",
    tipo: "cierre",
    icon: "🎯",
    color: "red",
    descripcion: "Straight to the point. Forces a decision without pressure. Around 18% reply rate.",
    asunto: "Shall we move ahead, or should I close proposal {{numero}}?",
    cuerpo: `Hi {{cliente}},

I don't want to be a pest, but I need to plan my schedule.

Would you like to move ahead with proposal {{numero}}, or should I close it for now?

Either answer works for me — I just need to know so I can plan.

Best,
{{empresa}}`,
  },
  {
    id: "dia-21-breakup",
    nombre: "Break-up email",
    dia: "Day +21",
    tipo: "breakup",
    icon: "👋",
    color: "gray",
    descripcion: "The paradoxical email. Defuses pressure. 33% reply rate — the highest.",
    asunto: "I'll assume now isn't the right time",
    cuerpo: `Hi {{cliente}},

I understand now isn't the right moment to move ahead with proposal {{numero}}.

No problem at all — I'll be here when things change. I'll keep your contact, and if you'd like to pick it back up down the road, just drop me a line.

Wishing you every success with whatever you have on your plate right now.

Best,
{{empresa}}`,
  },
];

export type EmailTemplateLang = "es" | "en";

export const EMAIL_TEMPLATES_BY_LANG: Record<EmailTemplateLang, EmailTemplate[]> = {
  es: ES_TEMPLATES,
  en: EN_TEMPLATES,
};

export function getEmailTemplates(lang: EmailTemplateLang = "es"): EmailTemplate[] {
  return EMAIL_TEMPLATES_BY_LANG[lang] ?? ES_TEMPLATES;
}

// Back-compat: default Spanish list
export const EMAIL_TEMPLATES = ES_TEMPLATES;

// ─── Helper para reemplazar variables ───
export interface EmailVariables {
  cliente?: string;
  empresa?: string;
  numero?: string;
  total?: string;
  validez?: string;
}

export function renderEmailTemplate(
  template: EmailTemplate,
  vars: EmailVariables,
  lang: EmailTemplateLang = "es"
): { asunto: string; cuerpo: string } {
  const fallback =
    lang === "en"
      ? { cliente: "[client]", empresa: "[your company]", numero: "[number]", total: "[total]" }
      : { cliente: "[cliente]", empresa: "[tu empresa]", numero: "[número]", total: "[total]" };
  const replace = (text: string) =>
    text
      .replace(/\{\{cliente\}\}/g, vars.cliente || fallback.cliente)
      .replace(/\{\{empresa\}\}/g, vars.empresa || fallback.empresa)
      .replace(/\{\{numero\}\}/g, vars.numero || fallback.numero)
      .replace(/\{\{total\}\}/g, vars.total || fallback.total)
      .replace(/\{\{validez\}\}/g, vars.validez || "30");

  return {
    asunto: replace(template.asunto),
    cuerpo: replace(template.cuerpo),
  };
}
