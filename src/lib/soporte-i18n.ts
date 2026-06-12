// i18n for the Soporte (help center) page. Only translatable text lives here;
// icons, colors and hrefs stay structural in the page component. Section and
// item order must match SECTION_STRUCTURE in soporte/page.tsx.

interface GuideItemText {
  title: string;
  body: string;
  hrefLabel?: string;
}

interface GuideSectionText {
  title: string;
  summary: string;
  items: GuideItemText[];
}

interface SoporteStrings {
  pageTitle: string;
  pageDescription: string;
  contactTitle: string;
  contactSubtitle: string;
  writeEmail: string;
  guideHeading: string;
  searchPlaceholder: string;
  noResults: string;
  resultsCount: (items: number, sections: number) => string;
  noResultsTitlePre: string;
  noResultsHelpPre: string;
  noResultsHelpPost: string;
  goLabel: string;
  bottomQuestion: string;
  contactSupport: string;
  sections: Record<string, GuideSectionText>;
}

const es: SoporteStrings = {
  pageTitle: "Soporte",
  pageDescription: "Centro de ayuda y documentación de DealForge",
  contactTitle: "¿Necesitas ayuda personalizada?",
  contactSubtitle: "Nuestro equipo responde en menos de 48 horas en días laborables.",
  writeEmail: "Escribir email",
  guideHeading: "Guía de uso — busca cualquier concepto",
  searchPlaceholder: "Busca: firma electrónica, importar CSV, reglas de descuento...",
  noResults: "Sin resultados. Prueba con otro término o escríbenos.",
  resultsCount: (items, sections) =>
    `${items} resultado${items !== 1 ? "s" : ""} en ${sections} sección${sections !== 1 ? "es" : ""}`,
  noResultsTitlePre: "No encontramos resultados para",
  noResultsHelpPre: "Escríbenos a ",
  noResultsHelpPost: " y te ayudamos.",
  goLabel: "Ir",
  bottomQuestion: "¿No encuentras lo que buscas?",
  contactSupport: "Contactar con soporte",
  sections: {
    dashboard: {
      title: "Dashboard",
      summary:
        "Vista general de tu actividad: cotizaciones activas, clientes, contratos próximos a vencer y métricas clave.",
      items: [
        {
          title: "¿Qué veo en el Dashboard?",
          body: "Tarjetas con el resumen de cotizaciones (total, enviadas, ganadas, perdidas), clientes activos, valor total de contratos y alertas de vencimiento próximo. Se actualiza en tiempo real.",
          hrefLabel: "Ir al Dashboard",
        },
        {
          title: "Métricas de conversión",
          body: "La tasa de conversión (cotizaciones ganadas / enviadas) aparece en la parte superior. Úsala para medir el rendimiento del equipo de ventas.",
        },
      ],
    },
    clientes: {
      title: "Clientes",
      summary:
        "Gestiona tu base de clientes: datos de empresa, contactos, historial de cotizaciones y contratos.",
      items: [
        {
          title: "Crear un cliente nuevo",
          body: "Ve a Clientes → botón 'Nuevo cliente'. Rellena nombre, CIF/NIF, email, teléfono y dirección. Los campos marcados son los que aparecerán en las cotizaciones y contratos PDF.",
          hrefLabel: "Crear cliente",
        },
        {
          title: "Contactos del cliente",
          body: "Dentro de cada cliente puedes añadir múltiples contactos (nombre, email, cargo). Al solicitar una firma electrónica, puedes elegir entre los contactos guardados.",
        },
        {
          title: "Historial de cotizaciones",
          body: "El detalle de cada cliente muestra todas las cotizaciones asociadas, su estado y el importe total contratado. Sirve como CRM básico.",
          hrefLabel: "Ver clientes",
        },
      ],
    },
    productos: {
      title: "Productos y Catálogo",
      summary: "Tu catálogo de productos y servicios. Se usan como líneas al crear cotizaciones.",
      items: [
        {
          title: "Añadir un producto",
          body: "Ve a Productos → 'Nuevo producto'. Define nombre, SKU (opcional), descripción, precio unitario, unidad y categoría. También puedes marcar un descuento máximo permitido.",
          hrefLabel: "Añadir producto",
        },
        {
          title: "Categorías",
          body: "Agrupa productos por categoría para encontrarlos más rápido al añadirlos a una cotización. Las categorías se crean automáticamente al escribirlas.",
        },
        {
          title: "Frecuencia de facturación",
          body: "Cada producto puede tener una frecuencia: Único, Mensual, Trimestral o Anual. Esto determina cómo se calculan los totales en los contratos.",
          hrefLabel: "Ver catálogo",
        },
      ],
    },
    cotizaciones: {
      title: "Cotizaciones",
      summary:
        "Crea, envía y gestiona propuestas comerciales profesionales. Incluye IA, firma electrónica y PDF.",
      items: [
        {
          title: "Crear una cotización",
          body: "Cotizaciones → 'Nueva cotización'. Selecciona cliente, añade líneas de productos del catálogo (o crea líneas libres), aplica descuentos y añade notas. Forge IA puede sugerirte el precio óptimo.",
          hrefLabel: "Nueva cotización",
        },
        {
          title: "Estados de una cotización",
          body: "BORRADOR → ENVIADA → NEGOCIACIÓN → GANADA o PERDIDA. Solo las cotizaciones en estado GANADA pueden convertirse en contrato. Puedes mover el estado manualmente desde el detalle.",
        },
        {
          title: "Enviar por email",
          body: "Desde el detalle de la cotización, botón 'Enviar'. Se envía al email del cliente con un PDF adjunto y un enlace para que pueda abrirla en el navegador. Requiere plan Pro o superior.",
        },
        {
          title: "Firma electrónica",
          body: "Botón 'Solicitar firma' → introduce nombre y email del firmante. El cliente recibe un enlace, ve la cotización completa y dibuja su firma. Al firmar, la cotización pasa a estado GANADA automáticamente. Válido conforme a eIDAS (UE 910/2014).",
        },
        {
          title: "Descargar PDF",
          body: "Botón 'PDF' en el detalle. Genera un PDF profesional con el diseño de tu empresa (logo, colores, plantilla). Puedes cambiar la plantilla en Configuración.",
        },
        {
          title: "Versiones",
          body: "Cada vez que editas una cotización enviada, se crea una nueva versión. Puedes ver el historial de versiones desde el detalle.",
          hrefLabel: "Ver cotizaciones",
        },
        {
          title: "Forge IA",
          body: "Asistente de IA integrado. Puedes pedirle que sugiera precios, redacte condiciones, optimice descuentos o explique cláusulas. Disponible en el panel lateral del detalle de cotización.",
        },
      ],
    },
    contratos: {
      title: "Contratos",
      summary:
        "Genera contratos a partir de cotizaciones ganadas, personaliza las condiciones, envía a firmar y gestiona renovaciones.",
      items: [
        {
          title: "Crear un contrato",
          body: "Un contrato se crea desde una cotización en estado GANADA. Abre la cotización → botón 'Crear contrato'. Se copian automáticamente las líneas y condiciones. Requiere plan Business.",
        },
        {
          title: "Plantillas de contrato",
          body: "Ve a Contratos → Plantillas. Puedes crear plantillas HTML con variables como {{cliente.nombre}}, {{contrato.valorTotal}}, {{empresa.cif}}, etc. La plantilla por defecto ya está lista para usar.",
          hrefLabel: "Ver plantillas",
        },
        {
          title: "Generar el documento",
          body: "En el detalle del contrato, sección 'Documento del contrato' → 'Generar documento'. Se rellena la plantilla con los datos reales del contrato, cliente y empresa. Puedes editarlo antes de firmar.",
        },
        {
          title: "Editar condiciones antes de firmar",
          body: "En el detalle del contrato, sección 'Condiciones del Contrato' → botón 'Editar' (lápiz). Puedes cambiar las condiciones generales, cláusula de cancelación y días de preaviso. Después regenera el documento.",
        },
        {
          title: "Editar el documento generado",
          body: "Botón 'Editar documento' → se abre un editor HTML con preview en tiempo real. Puedes retocar cualquier texto o formato antes de enviarlo a firmar.",
        },
        {
          title: "Firma electrónica del contrato",
          body: "Una vez generado el documento, botón 'Solicitar firma electrónica'. El cliente recibe un email con enlace a /firmar-contrato/[token], ve el contrato completo y dibuja su firma. Válido conforme a eIDAS.",
        },
        {
          title: "Condiciones por defecto para todos los contratos",
          body: "Ve a Configuración → sección 'Términos y Condiciones' → campo 'Condiciones por defecto para Contratos'. Lo que escribas ahí se aplicará automáticamente a cada nuevo contrato.",
          hrefLabel: "Configurar condiciones",
        },
        {
          title: "Renovaciones y alertas",
          body: "Configura renovación automática y días de aviso previo al vencimiento en cada contrato. El sistema envía emails de alerta al acercarse la fecha de fin.",
        },
      ],
    },
    reglas: {
      title: "Reglas Comerciales",
      summary:
        "Define límites de descuento, márgenes mínimos y condiciones que se validan automáticamente al crear cotizaciones.",
      items: [
        {
          title: "¿Para qué sirven las reglas?",
          body: "Evitan que los vendedores ofrezcan descuentos por encima del límite autorizado, o que el margen caiga por debajo del mínimo. Se validan en tiempo real al editar una cotización.",
          hrefLabel: "Ver reglas",
        },
        {
          title: "Tipos de regla",
          body: "Descuento máximo por línea, descuento máximo total, precio mínimo por producto, margen mínimo porcentual, y condiciones especiales por categoría de cliente.",
        },
        {
          title: "Aprobaciones",
          body: "Si una cotización supera una regla, puede requerir aprobación de un administrador antes de enviarse al cliente. El aprobador recibe un email con el enlace de revisión. Requiere plan Business.",
        },
      ],
    },
    reportes: {
      title: "Reportes",
      summary:
        "Métricas de ventas: ingresos, tasa de conversión, productos más vendidos y rendimiento por cliente.",
      items: [
        {
          title: "¿Qué incluyen los reportes?",
          body: "Volumen de cotizaciones por período, importe total ganado, tasa de conversión, top clientes por valor, top productos, y tiempo medio de cierre.",
          hrefLabel: "Ver reportes",
        },
        {
          title: "Filtros por período",
          body: "Puedes filtrar por semana, mes, trimestre o año. Los gráficos se actualizan automáticamente.",
        },
      ],
    },
    integraciones: {
      title: "Integraciones",
      summary: "Importa y exporta datos, y conecta DealForge con otras herramientas mediante API.",
      items: [
        {
          title: "Importar clientes y productos desde CSV",
          body: "Integraciones → 'Importar'. Sube un fichero CSV con el formato descargable como ejemplo. Puedes importar clientes, productos o ambos en el mismo proceso.",
          hrefLabel: "Ir a Integraciones",
        },
        {
          title: "Exportar datos",
          body: "Exporta clientes, productos o cotizaciones a CSV para usar en Excel, Google Sheets u otros sistemas.",
        },
        {
          title: "API Key",
          body: "En Configuración puedes generar una API Key para conectar DealForge con herramientas externas (CRM, ERP, Zapier, Make...). Disponible en plan Pro y superior.",
          hrefLabel: "Ver API Key",
        },
      ],
    },
    equipo: {
      title: "Equipo y Usuarios",
      summary: "Gestiona los miembros de tu equipo, invita nuevos usuarios y asigna roles.",
      items: [
        {
          title: "Invitar a un compañero",
          body: "Configuración → sección 'Equipo' → 'Invitar miembro'. Introduce su email y elige el rol. Recibirá un email con el enlace para unirse. El número máximo de usuarios depende del plan.",
          hrefLabel: "Gestionar equipo",
        },
        {
          title: "Roles disponibles",
          body: "Admin: acceso completo, puede invitar y gestionar el equipo. Sales (Vendedor): puede crear y gestionar cotizaciones y contratos. Viewer (Observador): solo lectura.",
        },
        {
          title: "Límites por plan",
          body: "Starter: 1 usuario. Pro: hasta 5. Business: hasta 20. Enterprise: ilimitados. El administrador puede ver el uso actual en la sección Equipo de Configuración.",
        },
      ],
    },
    configuracion: {
      title: "Configuración",
      summary:
        "Datos de empresa, logo, plantilla PDF, colores, SMTP para emails, condiciones y gestión del plan.",
      items: [
        {
          title: "Datos de empresa",
          body: "Nombre, CIF, dirección, email y teléfono. Estos datos aparecen en todos los PDFs (cotizaciones y contratos). Imprescindible rellenarlos antes de enviar documentos a clientes.",
          hrefLabel: "Ir a Configuración",
        },
        {
          title: "Logo y colores",
          body: "Sube tu logotipo (PNG/SVG recomendado) y define tu color corporativo. Ambos se aplican automáticamente en todos los PDFs generados.",
        },
        {
          title: "Plantilla PDF",
          body: "Elige entre tres diseños: Moderna (gradiente, colores vivos), Clásica (bordes, tradicional) y Minimalista (líneas finas, elegante).",
        },
        {
          title: "Configurar email SMTP",
          body: "Para enviar cotizaciones y solicitudes de firma directamente desde DealForge, configura tu servidor SMTP (Gmail, Outlook, etc.) en Configuración → Email. Sin SMTP, los emails se envían desde el servidor de DealForge.",
        },
        {
          title: "Condiciones por defecto",
          body: "Tres tipos: Transaccionales (para productos de pago único), Contractuales (para servicios recurrentes y contratos), y Generales (fallback). Se rellenan automáticamente en cada documento.",
          hrefLabel: "Ver condiciones",
        },
        {
          title: "Cambiar o cancelar plan",
          body: "En la sección 'Tu Cuenta y Plan' puedes ver tu plan actual, subir a Pro o Business, o bajar de plan. Para cancelar la renovación automática, usa el enlace 'Cancelar suscripción'.",
        },
      ],
    },
    forgeai: {
      title: "Forge IA",
      summary: "Asistente de inteligencia artificial integrado en cotizaciones y contratos.",
      items: [
        {
          title: "¿Qué puede hacer Forge IA?",
          body: "Sugerir precios competitivos, redactar condiciones generales, optimizar descuentos según el historial del cliente, explicar cláusulas legales, y responder preguntas sobre el proceso de ventas.",
        },
        {
          title: "¿Dónde está disponible?",
          body: "Panel lateral en el detalle de cotizaciones. Puedes escribir libremente o usar los atajos predefinidos (sugiere precio, redacta condiciones, etc.).",
        },
        {
          title: "Límites por plan",
          body: "Starter: 5 consultas/mes. Pro y Business: ilimitado. Enterprise: ilimitado con prioridad. El modelo de IA usado es Claude de Anthropic.",
        },
      ],
    },
    facturacion: {
      title: "Plan y Facturación",
      summary: "Todo lo relacionado con tu suscripción, pagos y cambios de plan.",
      items: [
        {
          title: "¿Cómo cambio de plan?",
          body: "Configuración → sección 'Tu Cuenta y Plan' → botón 'Actualizar'. Serás redirigido a Stripe (pasarela de pago segura). El cambio es inmediato.",
          hrefLabel: "Ver planes",
        },
        {
          title: "¿Puedo pagar anualmente?",
          body: "Sí. El plan anual tiene un 20% de descuento respecto al mensual. Puedes elegir mensual o anual al suscribirte.",
        },
        {
          title: "¿Cómo cancelo?",
          body: "Configuración → 'Cancelar suscripción'. Puedes bajar a Pro o a Starter (gratuito). Tu acceso continúa hasta el fin del período de facturación actual.",
        },
        {
          title: "Gestionar facturas y tarjeta",
          body: "Botón 'Gestionar Suscripción' en Configuración. Te lleva al portal de Stripe donde puedes ver facturas anteriores y actualizar el método de pago.",
        },
      ],
    },
  },
};

const en: SoporteStrings = {
  pageTitle: "Support",
  pageDescription: "DealForge help center and documentation",
  contactTitle: "Need personalized help?",
  contactSubtitle: "Our team replies within 48 hours on business days.",
  writeEmail: "Write an email",
  guideHeading: "User guide — search any topic",
  searchPlaceholder: "Search: electronic signature, import CSV, discount rules...",
  noResults: "No results. Try another term or write to us.",
  resultsCount: (items, sections) =>
    `${items} result${items !== 1 ? "s" : ""} in ${sections} section${sections !== 1 ? "s" : ""}`,
  noResultsTitlePre: "We couldn't find results for",
  noResultsHelpPre: "Write to us at ",
  noResultsHelpPost: " and we'll help.",
  goLabel: "Go",
  bottomQuestion: "Can't find what you're looking for?",
  contactSupport: "Contact support",
  sections: {
    dashboard: {
      title: "Dashboard",
      summary:
        "An overview of your activity: active quotes, clients, contracts due to expire, and key metrics.",
      items: [
        {
          title: "What do I see on the Dashboard?",
          body: "Cards summarizing quotes (total, sent, won, lost), active clients, total contract value, and upcoming expiry alerts. It updates in real time.",
          hrefLabel: "Go to Dashboard",
        },
        {
          title: "Conversion metrics",
          body: "The conversion rate (quotes won / sent) appears at the top. Use it to measure your sales team's performance.",
        },
      ],
    },
    clientes: {
      title: "Clients",
      summary:
        "Manage your client base: company details, contacts, quote history and contracts.",
      items: [
        {
          title: "Create a new client",
          body: "Go to Clients → 'New client' button. Fill in name, tax ID, email, phone and address. The completed fields are the ones that appear on PDF quotes and contracts.",
          hrefLabel: "Create client",
        },
        {
          title: "Client contacts",
          body: "Within each client you can add multiple contacts (name, email, role). When requesting an electronic signature, you can pick from the saved contacts.",
        },
        {
          title: "Quote history",
          body: "Each client's detail view shows all associated quotes, their status and the total amount contracted. It works as a basic CRM.",
          hrefLabel: "View clients",
        },
      ],
    },
    productos: {
      title: "Products & Catalog",
      summary: "Your catalog of products and services. They're used as lines when creating quotes.",
      items: [
        {
          title: "Add a product",
          body: "Go to Products → 'New product'. Set name, SKU (optional), description, unit price, unit and category. You can also set a maximum allowed discount.",
          hrefLabel: "Add product",
        },
        {
          title: "Categories",
          body: "Group products by category to find them faster when adding them to a quote. Categories are created automatically as you type them.",
        },
        {
          title: "Billing frequency",
          body: "Each product can have a frequency: One-off, Monthly, Quarterly or Annual. This determines how totals are calculated in contracts.",
          hrefLabel: "View catalog",
        },
      ],
    },
    cotizaciones: {
      title: "Quotes",
      summary:
        "Create, send and manage professional sales proposals. Includes AI, e-signature and PDF.",
      items: [
        {
          title: "Create a quote",
          body: "Quotes → 'New quote'. Select a client, add product lines from the catalog (or create custom lines), apply discounts and add notes. Forge AI can suggest the optimal price.",
          hrefLabel: "New quote",
        },
        {
          title: "Quote statuses",
          body: "DRAFT → SENT → NEGOTIATION → WON or LOST. Only quotes in WON status can be turned into a contract. You can move the status manually from the detail view.",
        },
        {
          title: "Send by email",
          body: "From the quote detail, the 'Send' button. It's sent to the client's email with a PDF attached and a link to open it in the browser. Requires the Pro plan or higher.",
        },
        {
          title: "Electronic signature",
          body: "'Request signature' button → enter the signer's name and email. The client receives a link, sees the full quote and draws their signature. Once signed, the quote moves to WON automatically. Valid under eIDAS (EU 910/2014).",
        },
        {
          title: "Download PDF",
          body: "The 'PDF' button on the detail view. It generates a professional PDF with your company's design (logo, colors, template). You can change the template in Settings.",
        },
        {
          title: "Versions",
          body: "Each time you edit a sent quote, a new version is created. You can see the version history from the detail view.",
          hrefLabel: "View quotes",
        },
        {
          title: "Forge AI",
          body: "A built-in AI assistant. You can ask it to suggest prices, draft conditions, optimize discounts or explain clauses. Available in the side panel of the quote detail.",
        },
      ],
    },
    contratos: {
      title: "Contracts",
      summary:
        "Generate contracts from won quotes, customize the conditions, send for signature and manage renewals.",
      items: [
        {
          title: "Create a contract",
          body: "A contract is created from a quote in WON status. Open the quote → 'Create contract' button. The lines and conditions are copied automatically. Requires the Business plan.",
        },
        {
          title: "Contract templates",
          body: "Go to Contracts → Templates. You can create HTML templates with variables like {{cliente.nombre}}, {{contrato.valorTotal}}, {{empresa.cif}}, etc. The default template is ready to use.",
          hrefLabel: "View templates",
        },
        {
          title: "Generate the document",
          body: "In the contract detail, the 'Contract document' section → 'Generate document'. The template is filled with the real contract, client and company data. You can edit it before signing.",
        },
        {
          title: "Edit conditions before signing",
          body: "In the contract detail, the 'Contract Conditions' section → 'Edit' button (pencil). You can change the general conditions, cancellation clause and notice days. Then regenerate the document.",
        },
        {
          title: "Edit the generated document",
          body: "'Edit document' button → opens an HTML editor with a live preview. You can tweak any text or formatting before sending it for signature.",
        },
        {
          title: "Contract electronic signature",
          body: "Once the document is generated, the 'Request electronic signature' button. The client receives an email with a link to /firmar-contrato/[token], sees the full contract and draws their signature. Valid under eIDAS.",
        },
        {
          title: "Default conditions for all contracts",
          body: "Go to Settings → 'Terms & Conditions' section → 'Default conditions for Contracts' field. Whatever you write there is applied automatically to every new contract.",
          hrefLabel: "Configure conditions",
        },
        {
          title: "Renewals and alerts",
          body: "Set up automatic renewal and advance-notice days before expiry on each contract. The system sends alert emails as the end date approaches.",
        },
      ],
    },
    reglas: {
      title: "Business Rules",
      summary:
        "Define discount limits, minimum margins and conditions that are validated automatically when creating quotes.",
      items: [
        {
          title: "What are rules for?",
          body: "They prevent salespeople from offering discounts above the authorized limit, or the margin dropping below the minimum. They're validated in real time as you edit a quote.",
          hrefLabel: "View rules",
        },
        {
          title: "Rule types",
          body: "Maximum discount per line, maximum total discount, minimum price per product, minimum percentage margin, and special conditions by client category.",
        },
        {
          title: "Approvals",
          body: "If a quote breaks a rule, it may require an admin's approval before being sent to the client. The approver receives an email with the review link. Requires the Business plan.",
        },
      ],
    },
    reportes: {
      title: "Reports",
      summary:
        "Sales metrics: revenue, conversion rate, best-selling products and performance by client.",
      items: [
        {
          title: "What do the reports include?",
          body: "Quote volume by period, total amount won, conversion rate, top clients by value, top products, and average time to close.",
          hrefLabel: "View reports",
        },
        {
          title: "Filters by period",
          body: "You can filter by week, month, quarter or year. The charts update automatically.",
        },
      ],
    },
    integraciones: {
      title: "Integrations",
      summary: "Import and export data, and connect DealForge with other tools via API.",
      items: [
        {
          title: "Import clients and products from CSV",
          body: "Integrations → 'Import'. Upload a CSV file in the example format you can download. You can import clients, products or both in the same process.",
          hrefLabel: "Go to Integrations",
        },
        {
          title: "Export data",
          body: "Export clients, products or quotes to CSV for use in Excel, Google Sheets or other systems.",
        },
        {
          title: "API Key",
          body: "In Settings you can generate an API Key to connect DealForge with external tools (CRM, ERP, Zapier, Make...). Available on the Pro plan and higher.",
          hrefLabel: "View API Key",
        },
      ],
    },
    equipo: {
      title: "Team & Users",
      summary: "Manage your team members, invite new users and assign roles.",
      items: [
        {
          title: "Invite a teammate",
          body: "Settings → 'Team' section → 'Invite member'. Enter their email and choose the role. They'll receive an email with the link to join. The maximum number of users depends on the plan.",
          hrefLabel: "Manage team",
        },
        {
          title: "Available roles",
          body: "Admin: full access, can invite and manage the team. Sales: can create and manage quotes and contracts. Viewer: read-only.",
        },
        {
          title: "Limits by plan",
          body: "Starter: 1 user. Pro: up to 5. Business: up to 20. Enterprise: unlimited. The admin can see current usage in the Team section of Settings.",
        },
      ],
    },
    configuracion: {
      title: "Settings",
      summary:
        "Company details, logo, PDF template, colors, SMTP for emails, conditions and plan management.",
      items: [
        {
          title: "Company details",
          body: "Name, tax ID, address, email and phone. This data appears on all PDFs (quotes and contracts). Essential to fill in before sending documents to clients.",
          hrefLabel: "Go to Settings",
        },
        {
          title: "Logo and colors",
          body: "Upload your logo (PNG/SVG recommended) and set your brand color. Both are applied automatically to all generated PDFs.",
        },
        {
          title: "PDF template",
          body: "Choose from three designs: Modern (gradient, vivid colors), Classic (borders, traditional) and Minimalist (thin lines, elegant).",
        },
        {
          title: "Set up SMTP email",
          body: "To send quotes and signature requests directly from DealForge, configure your SMTP server (Gmail, Outlook, etc.) in Settings → Email. Without SMTP, emails are sent from DealForge's server.",
        },
        {
          title: "Default conditions",
          body: "Three types: Transactional (for one-off products), Contractual (for recurring services and contracts), and General (fallback). They're filled in automatically on each document.",
          hrefLabel: "View conditions",
        },
        {
          title: "Change or cancel plan",
          body: "In the 'Your Account & Plan' section you can see your current plan, upgrade to Pro or Business, or downgrade. To cancel auto-renewal, use the 'Cancel subscription' link.",
        },
      ],
    },
    forgeai: {
      title: "Forge AI",
      summary: "An artificial-intelligence assistant built into quotes and contracts.",
      items: [
        {
          title: "What can Forge AI do?",
          body: "Suggest competitive prices, draft general conditions, optimize discounts based on client history, explain legal clauses, and answer questions about the sales process.",
        },
        {
          title: "Where is it available?",
          body: "The side panel in the quote detail. You can type freely or use the predefined shortcuts (suggest price, draft conditions, etc.).",
        },
        {
          title: "Limits by plan",
          body: "Starter: 5 queries/month. Pro and Business: unlimited. Enterprise: unlimited with priority. The AI model used is Claude by Anthropic.",
        },
      ],
    },
    facturacion: {
      title: "Plan & Billing",
      summary: "Everything related to your subscription, payments and plan changes.",
      items: [
        {
          title: "How do I change my plan?",
          body: "Settings → 'Your Account & Plan' section → 'Upgrade' button. You'll be redirected to Stripe (a secure payment gateway). The change is immediate.",
          hrefLabel: "View plans",
        },
        {
          title: "Can I pay annually?",
          body: "Yes. The annual plan is 20% cheaper than monthly. You can choose monthly or annual when you subscribe.",
        },
        {
          title: "How do I cancel?",
          body: "Settings → 'Cancel subscription'. You can downgrade to Pro or to Starter (free). Your access continues until the end of the current billing period.",
        },
        {
          title: "Manage invoices and card",
          body: "The 'Manage Subscription' button in Settings. It takes you to the Stripe portal where you can view past invoices and update your payment method.",
        },
      ],
    },
  },
};

export const SOPORTE_STRINGS = { es, en };
