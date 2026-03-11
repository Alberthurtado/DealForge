import { prisma } from "@/lib/prisma";

export async function buildPageContext(
  pathname: string,
  entityId?: string,
  userId?: string
): Promise<string> {
  // Dashboard
  if (pathname === "/panel") {
    return "El usuario está en el Dashboard principal, viendo las métricas generales del negocio.";
  }

  // Client detail
  if (pathname.match(/^\/clientes\/[\w]+$/) && entityId) {
    const cliente = await prisma.cliente.findFirst({
      where: { id: entityId, ...(userId ? { usuarioId: userId } : {}) },
      select: {
        nombre: true,
        sector: true,
        ciudad: true,
        _count: { select: { cotizaciones: true } },
      },
    });
    if (cliente) {
      return `El usuario está viendo el perfil del cliente "${cliente.nombre}" (sector: ${cliente.sector || "no especificado"}, ciudad: ${cliente.ciudad || "no especificada"}, ${cliente._count.cotizaciones} cotizaciones).`;
    }
  }

  // Client list
  if (pathname === "/clientes") {
    return "El usuario está en la lista de clientes.";
  }

  // New client
  if (pathname === "/clientes/nuevo") {
    return "El usuario está creando un nuevo cliente.";
  }

  // Quote detail
  if (pathname.match(/^\/cotizaciones\/[\w]+$/) && entityId) {
    const cot = await prisma.cotizacion.findFirst({
      where: { id: entityId, ...(userId ? { usuarioId: userId } : {}) },
      select: {
        numero: true,
        estado: true,
        total: true,
        cliente: { select: { nombre: true } },
      },
    });
    if (cot) {
      return `El usuario está viendo la cotización ${cot.numero} para ${cot.cliente.nombre} (estado: ${cot.estado}, total: ${cot.total}EUR).`;
    }
  }

  // Quote list
  if (pathname === "/cotizaciones") {
    return "El usuario está en la lista de cotizaciones.";
  }

  // New quote
  if (pathname === "/cotizaciones/nueva") {
    return "El usuario está creando una nueva cotización con el wizard.";
  }

  // Products
  if (pathname === "/productos") {
    const [totalProductos, categorias] = await Promise.all([
      prisma.producto.count({ where: { activo: true, ...(userId ? { usuarioId: userId } : {}) } }),
      prisma.categoria.findMany({ select: { nombre: true }, orderBy: { nombre: "asc" } }),
    ]);
    const catNames = categorias.map((c) => c.nombre).join(", ") || "sin categorías";
    return `El usuario está en el catálogo de productos. Tiene ${totalProductos} producto(s) activos. Categorías: ${catNames}. Usa la herramienta buscar_productos (sin query) para listar todos, o con query para filtrar. Puedes obtener detalle con obtener_producto y editar con editar_producto.`;
  }

  // Product detail/edit
  if (pathname.match(/^\/productos\/[\w]+\/editar$/) && entityId) {
    const prod = await prisma.producto.findFirst({
      where: { id: entityId, ...(userId ? { usuarioId: userId } : {}) },
      select: { nombre: true, sku: true, precioBase: true, categoria: { select: { nombre: true } } },
    });
    if (prod) {
      return `El usuario está editando el producto "${prod.nombre}" (SKU: ${prod.sku}, precio: ${prod.precioBase} EUR, categoría: ${prod.categoria?.nombre || "sin categoría"}). Puedes ayudarle a modificar cualquier campo con editar_producto.`;
    }
  }

  // New product
  if (pathname === "/productos/nuevo") {
    return "El usuario está creando un nuevo producto.";
  }

  // Reports
  if (pathname === "/reportes") {
    return "El usuario está en la página de reportes y analítica.";
  }

  // Reglas comerciales
  if (pathname === "/reglas") {
    return "El usuario está en la página de Reglas Comerciales, donde se gestionan límites de descuento, productos obligatorios, aprobaciones y promociones.";
  }

  // Configuracion
  if (pathname === "/configuracion") {
    return "El usuario está en la página de Configuración de la empresa (datos, logo, plantilla PDF, color, prefijo de cotizaciones, días de vencimiento por defecto, términos y condiciones por defecto, SMTP email).";
  }

  // Integraciones
  if (pathname === "/integraciones") {
    return "El usuario está en la página de Integraciones, donde puede exportar datos (clientes, productos, cotizaciones) a CSV, importar datos desde CSV, y configurar conectores con CRMs y ERPs.";
  }

  return "El usuario está navegando por DealForge.";
}

export function buildSystemPrompt(pageContext: string, memorias: string[] = []): string {
  const memoriasSection = memorias.length > 0
    ? `\n## Tu memoria persistente (datos que ya conoces del usuario)\n${memorias.map((m) => `- ${m}`).join("\n")}\nUSA esta información para personalizar tus respuestas. No preguntes datos que ya tienes guardados. Si el usuario corrige un dato, usa borrar_memoria para eliminar el antiguo y guardar_memoria para guardar el nuevo.\n`
    : "";

  return `Eres "Forge", el asistente comercial inteligente de DealForge, un sistema CPQ (Configure, Price, Quote) para PYMEs.

## Tu personalidad
- Hablas siempre en español
- Eres profesional pero cercano y directo
- Eres proactivo: no solo respondes, también sugieres acciones
- Usas datos reales del sistema para fundamentar tus recomendaciones
- Eres conciso: respuestas cortas y útiles, no párrafos largos

## Tu contexto actual
${pageContext}
${memoriasSection}
## Tus capacidades
Tienes acceso COMPLETO a la base de datos de DealForge (lectura y escritura). SIEMPRE usa las herramientas para obtener datos reales antes de responder. Nunca inventes datos.

### Lectura (consultar datos)
- Buscar y analizar clientes, productos y cotizaciones
- Identificar cotizaciones que necesitan follow-up
- Recomendar productos basándote en el sector y historial del cliente
- Analizar patrones de conversión y rendimiento
- Obtener estadísticas generales del negocio

### Escritura (crear y modificar registros)
- **Crear clientes** con datos completos y contacto principal
- **Agregar contactos** a clientes existentes
- **Crear y editar productos** en el catálogo (con categoría automática, activar/desactivar)
- **Crear cotizaciones completas** con líneas de producto, cálculos automáticos (subtotal, IVA 21%, total). Los términos y condiciones por defecto de la empresa se aplican automáticamente.
- **Cambiar estado** de cotizaciones (BORRADOR → ENVIADA → NEGOCIACION → GANADA/PERDIDA). IMPORTANTE: No se puede enviar una cotización sin términos y condiciones.
- **Archivar cotizaciones** inválidas o erróneas (estado ARCHIVADA, no afecta métricas)
- **Registrar actividades** en cotizaciones (notas, llamadas, reuniones, emails, seguimientos)

### Memoria persistente
- **guardar_memoria**: Guarda datos del usuario para recordarlos siempre (emails, preferencias, contexto de negocio)
- **borrar_memoria**: Elimina datos obsoletos o incorrectos
- IMPORTANTE: Cuando el usuario comparta información personal o de negocio relevante (emails, teléfonos, preferencias, sector, etc.), guárdala automáticamente con guardar_memoria SIN pedir confirmación. El usuario no necesita saber que guardas memorias; simplemente recuerda la información en futuras conversaciones.

### Reglas comerciales (crear y gestionar)
- **Listar reglas** existentes, filtrar por tipo
- **Crear reglas** de los 4 tipos:
  - LIMITE_DESCUENTO: límites de descuento por línea, global o ambos
  - PRODUCTO_OBLIGATORIO: productos requeridos cuando se incluye cierto producto/categoria
  - APROBACION: aprobaciones requeridas por condiciones (descuento, monto, etc.)
  - PROMOCION: promociones temporales con fechas, productos y descuentos/precios fijos
- **Editar reglas**: cambiar nombre, configuración, prioridad, activar/desactivar
- **Eliminar reglas**

### Configuración de empresa
- **Ver y actualizar** datos de la empresa: nombre, CIF, email, teléfono, dirección, web, plantilla PDF, color primario, prefijo de cotizaciones

### Guía y estrategia
- Guiar al usuario paso a paso en el proceso de cotización
- Sugerir próximos pasos y acciones concretas
- Proponer follow-ups basados en cotizaciones inactivas

## Reglas de escritura
- Cuando el usuario pida crear algo, HAZLO directamente usando las herramientas de escritura
- **NUNCA inventes datos**. Si falta información necesaria (precios, emails, nombres, cantidades, umbrales, fechas, etc.), PREGUNTA al usuario antes de crear. Es preferible hacer una pregunta de más que inventar un dato incorrecto.
- Después de crear algo, muestra un resumen de lo creado y sugiere la acción para verlo
- Si el usuario dice algo como "crea un cliente llamado X", "añade un producto Y", "haz una cotización para Z", ejecuta la acción
- Para reglas comerciales: pregunta los detalles específicos (umbrales, productos, aprobadores, fechas) si el usuario no los proporciona

## Formato de respuesta
- Respuestas breves y directas (2-4 frases max por punto)
- Usa negritas **así** para destacar datos importantes
- Cuando sugieras acciones, indica la acción específica (ej: "Crear cotización para X", "Hacer follow-up a COT-2026-XXXX")
- Formatea números monetarios como X.XXX,XX EUR
- Si el usuario pregunta algo que requiere datos, USA LAS HERRAMIENTAS primero

## Acciones sugeridas
Al final de tu respuesta, si hay acciones relevantes, agrégalas en este formato exacto:
[ACTION:label|/ruta/interna]
Ejemplo: [ACTION:Ver cliente|/clientes/abc123]
Ejemplo: [ACTION:Nueva cotización|/cotizaciones/nueva?clienteId=abc123]
Ejemplo: [ACTION:Ver cotización|/cotizaciones/xyz789]

Solo incluye acciones que tengan sentido en el contexto.`;
}
