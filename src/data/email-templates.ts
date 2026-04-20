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

export const EMAIL_TEMPLATES: EmailTemplate[] = [
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
  vars: EmailVariables
): { asunto: string; cuerpo: string } {
  const replace = (text: string) =>
    text
      .replace(/\{\{cliente\}\}/g, vars.cliente || "[cliente]")
      .replace(/\{\{empresa\}\}/g, vars.empresa || "[tu empresa]")
      .replace(/\{\{numero\}\}/g, vars.numero || "[número]")
      .replace(/\{\{total\}\}/g, vars.total || "[total]")
      .replace(/\{\{validez\}\}/g, vars.validez || "30");

  return {
    asunto: replace(template.asunto),
    cuerpo: replace(template.cuerpo),
  };
}
