import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Documentación — DealForge",
  description: "Guía completa de DealForge CPQ. Aprende a gestionar productos, clientes, cotizaciones, reglas comerciales, aprobaciones, plantillas PDF, contratos, firma electrónica, recordatorios y el asistente Forge IA.",
  alternates: { canonical: "https://dealforge.es/documentacion" },
};

/* ───────── helpers de estilo ───────── */
const H2 = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2 id={id} className="text-2xl font-bold text-gray-900 mt-16 mb-6 scroll-mt-24 border-b border-gray-200 pb-3">{children}</h2>
);
const H3 = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h3 id={id} className="text-lg font-semibold text-gray-800 mt-8 mb-3 scroll-mt-24">{children}</h3>
);
const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-gray-600 leading-relaxed mb-3">{children}</p>
);
const Tip = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-[#3a9bb5]/5 border border-[#3a9bb5]/20 rounded-xl p-4 my-4 text-sm text-gray-700">
    <strong className="text-[#3a9bb5]">Consejo:</strong> {children}
  </div>
);
const Warning = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 my-4 text-sm text-amber-900">
    <strong>Importante:</strong> {children}
  </div>
);
const Step = ({ n, children }: { n: number; children: React.ReactNode }) => (
  <div className="flex gap-3 mb-3">
    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#3a9bb5] text-white text-xs font-bold flex items-center justify-center mt-0.5">{n}</span>
    <span className="text-gray-600 leading-relaxed">{children}</span>
  </div>
);
const Field = ({ name, desc, required }: { name: string; desc: string; required?: boolean }) => (
  <li className="text-sm text-gray-600">
    <strong className="text-gray-800">{name}</strong>{required && <span className="text-red-500 ml-0.5">*</span>} — {desc}
  </li>
);

const FECHA_ACTUALIZACION = "27 de marzo de 2026";

/* ───────── Índice lateral ───────── */
const TOC = [
  { id: "primeros-pasos", label: "1. Primeros pasos" },
  { id: "panel", label: "2. Panel de control" },
  { id: "clientes", label: "3. Gestión de clientes" },
  { id: "productos", label: "4. Catálogo de productos" },
  { id: "cotizaciones-crear", label: "5. Crear cotizaciones" },
  { id: "cotizaciones-gestionar", label: "6. Gestionar cotizaciones" },
  { id: "pdf", label: "7. Plantillas PDF" },
  { id: "reglas", label: "8. Reglas comerciales" },
  { id: "aprobaciones", label: "9. Flujo de aprobaciones" },
  { id: "reportes", label: "10. Reportes y analítica" },
  { id: "integraciones", label: "11. Integraciones" },
  { id: "forge", label: "12. Forge IA" },
  { id: "firma-electronica", label: "13. Firma electrónica" },
  { id: "recordatorios", label: "14. Recordatorios automáticos" },
  { id: "contratos", label: "15. Gestión de contratos" },
  { id: "renovaciones", label: "16. Renovaciones y alertas" },
];

export default function DocumentacionPage() {
  return (
    <article className="prose-legal">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Documentación</h1>
        <p className="text-gray-500 text-sm mb-1">Guía completa de la plataforma DealForge CPQ</p>
        <p className="text-sm text-gray-400 bg-gray-50 inline-block px-3 py-1 rounded-lg">
          Última actualización: {FECHA_ACTUALIZACION}
        </p>
      </div>

      {/* Indice */}
      <nav className="mb-14 p-6 bg-gray-50 rounded-xl border border-gray-100">
        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">Índice de contenidos</h2>
        <ol className="grid sm:grid-cols-2 gap-x-8 gap-y-1.5 text-sm text-[#3a9bb5]">
          {TOC.map((t) => (
            <li key={t.id}><a href={`#${t.id}`} className="hover:underline">{t.label}</a></li>
          ))}
        </ol>
      </nav>

      {/* ═══════════════════════════════════════════════════════════════
          1. PRIMEROS PASOS
      ═══════════════════════════════════════════════════════════════ */}
      <H2 id="primeros-pasos">1. Primeros pasos</H2>

      <H3 id="crear-cuenta">1.1. Crear una cuenta</H3>
      <P>Para empezar a usar DealForge, necesitas crear una cuenta gratuita:</P>
      <Step n={1}>Ve a la página de registro haciendo clic en <strong>&quot;Prueba Gratis&quot;</strong> o <strong>&quot;Regístrate gratis&quot;</strong> desde la landing page.</Step>
      <Step n={2}>Rellena los campos del formulario:</Step>
      <ul className="list-disc pl-12 space-y-1 mb-4 text-sm text-gray-600">
        <Field name="Nombre" desc="Tu nombre completo." required />
        <Field name="Email" desc="Correo electrónico válido. Será tu identificador de acceso." required />
        <Field name="Contraseña" desc="Mínimo 8 caracteres. Aparece un check verde cuando cumple el requisito." required />
        <Field name="Confirmar contraseña" desc="Debe coincidir exactamente con la contraseña." required />
      </ul>
      <Step n={3}>Haz clic en <strong>&quot;Crear cuenta&quot;</strong>. Serás redirigido automáticamente al panel de control.</Step>
      <P>Tu cuenta empieza con el <strong>plan Starter (gratuito)</strong>, que incluye hasta 10 cotizaciones/mes, 5 clientes, 20 productos y 5 consultas de Forge IA (Haiku). Si necesitas más capacidad, puedes mejorar tu plan en cualquier momento desde <strong>Configuración → Plan</strong>.</P>

      <H3 id="configurar-empresa">1.2. Configurar los datos de tu empresa</H3>
      <P>Lo primero que debes hacer tras registrarte es configurar tu empresa. Ve a <strong>Configuración</strong> desde el menú lateral izquierdo.</P>
      <P>Estos datos se usarán en las cotizaciones PDF, emails y en toda la plataforma:</P>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <Field name="Nombre de empresa" desc="Aparecerá en todas las cotizaciones y PDFs." required />
        <Field name="CIF/NIF" desc="Tu número de identificación fiscal. Aparece en los documentos." />
        <Field name="Email" desc="Email de contacto de la empresa (puede diferir del email de tu cuenta personal)." />
        <Field name="Teléfono" desc="Número de contacto que aparecerá en cotizaciones." />
        <Field name="Dirección, Ciudad, País" desc="Dirección fiscal completa." />
        <Field name="Sitio web" desc="URL de tu página web (se muestra en el pie de las cotizaciones)." />
      </ul>

      <H3 id="subir-logo">1.3. Subir el logotipo</H3>
      <P>En la sección de <strong>Logotipo</strong> dentro de Configuración:</P>
      <Step n={1}>Arrastra tu logotipo al área indicada o haz clic para seleccionar un archivo.</Step>
      <Step n={2}>Formatos admitidos: <strong>PNG, JPG, SVG, WebP</strong> (máximo 2 MB).</Step>
      <Step n={3}>Verás una vista previa inmediata. El logo aparecerá en la cabecera de todas tus cotizaciones PDF.</Step>

      <H3 id="color-primario">1.4. Elegir color primario</H3>
      <P>Selecciona un color que represente tu marca. Este color se usará en:</P>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <li>La cabecera de las cotizaciones PDF (plantilla Moderna)</li>
        <li>Los emails de aprobación</li>
        <li>Elementos de acento en la página de aprobación pública</li>
      </ul>
      <P>Haz clic en el selector de color y elige tu tono. El código hexadecimal se muestra junto al selector (ej: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">#3a9bb5</code>).</P>

      <H3 id="numeracion">1.5. Configurar numeración de cotizaciones</H3>
      <P>Define el prefijo para tus cotizaciones en el campo <strong>&quot;Prefijo de cotización&quot;</strong>:</P>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <li>Solo caracteres alfanuméricos, máximo 10 caracteres.</li>
        <li>Formato resultante: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">PREFIJO-AÑO-0001</code></li>
        <li>Ejemplo: Si pones <strong>COT</strong>, la primera cotización será <strong>COT-2026-0001</strong>.</li>
      </ul>

      <H3 id="vencimiento">1.6. Días de vencimiento por defecto</H3>
      <P>Configura cuántos días de validez tendrán tus cotizaciones (entre 1 y 365 días). Este valor se aplicará automáticamente al crear nuevas cotizaciones, pero puede modificarse individualmente en cada una.</P>

      <H3 id="condiciones-defecto">1.7. Condiciones por defecto</H3>
      <P>Escribe tus términos y condiciones comerciales habituales en el campo de texto grande. Este texto se precargará en cada nueva cotización. Puedes editarlo individualmente en cada cotización.</P>
      <Warning>Una cotización no puede enviarse sin condiciones. Asegúrate de configurar unas condiciones por defecto para ahorrar tiempo.</Warning>

      <H3 id="smtp">1.8. Configurar email (SMTP)</H3>
      <P>Para enviar cotizaciones y aprobaciones por email directamente desde DealForge, necesitas configurar un servidor SMTP.</P>

      <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 my-4 space-y-4 text-sm">
        <div>
          <p className="font-semibold text-gray-800 mb-2">Gmail</p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600">
            <li>Servidor: <code className="bg-gray-100 px-1 rounded">smtp.gmail.com</code></li>
            <li>Puerto: <code className="bg-gray-100 px-1 rounded">587</code></li>
            <li>SSL/TLS: Activado</li>
            <li>Usuario: tu email de Gmail completo</li>
            <li>Contraseña: debes generar una <strong>Contraseña de aplicación</strong> en tu cuenta de Google (Seguridad → Verificación en dos pasos → Contraseñas de aplicación). No uses tu contraseña normal de Gmail.</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-gray-800 mb-2">Outlook / Microsoft 365</p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600">
            <li>Servidor: <code className="bg-gray-100 px-1 rounded">smtp.office365.com</code></li>
            <li>Puerto: <code className="bg-gray-100 px-1 rounded">587</code></li>
            <li>SSL/TLS: Activado</li>
            <li>Usuario: tu email de Outlook/365</li>
            <li>Contraseña: genera una contraseña de aplicación desde portal.azure.com o desde la configuración de seguridad de tu cuenta Microsoft.</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-gray-800 mb-2">Yahoo Mail</p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600">
            <li>Servidor: <code className="bg-gray-100 px-1 rounded">smtp.mail.yahoo.com</code></li>
            <li>Puerto: <code className="bg-gray-100 px-1 rounded">587</code></li>
            <li>SSL/TLS: Activado</li>
          </ul>
        </div>
      </div>
      <P>Tras configurarlo, pulsa <strong>&quot;Enviar email de prueba&quot;</strong> para verificar que la conexión funciona. Recibirás un email de confirmación en la dirección configurada.</P>
      <Tip>Las credenciales SMTP se almacenan cifradas en la base de datos y nunca se exponen al navegador.</Tip>

      {/* ═══════════════════════════════════════════════════════════════
          2. PANEL DE CONTROL
      ═══════════════════════════════════════════════════════════════ */}
      <H2 id="panel">2. Panel de control</H2>
      <P>El panel es la primera pantalla que ves al iniciar sesión. Muestra un resumen en tiempo real de tu actividad comercial.</P>

      <H3 id="panel-kpis">2.1. Indicadores clave (KPIs)</H3>
      <P>En la parte superior, seis tarjetas muestran las métricas principales:</P>
      <ul className="list-disc pl-6 space-y-2 mb-4 text-sm text-gray-600">
        <li><strong className="text-gray-800">Pipeline total:</strong> Suma del valor de todas las cotizaciones en estado Enviada + Negociación. Representa el negocio potencial activo.</li>
        <li><strong className="text-gray-800">Tasa de conversión:</strong> Porcentaje de cotizaciones Ganadas respecto al total de cerradas (Ganadas + Perdidas). Ejemplo: 8 ganadas de 12 cerradas = 67%.</li>
        <li><strong className="text-gray-800">Ticket medio:</strong> Valor promedio de las cotizaciones ganadas.</li>
        <li><strong className="text-gray-800">Ingresos totales:</strong> Suma del valor de todas las cotizaciones Ganadas.</li>
        <li><strong className="text-gray-800">Total clientes:</strong> Número de clientes registrados en el sistema.</li>
        <li><strong className="text-gray-800">Cotizaciones activas:</strong> Número de cotizaciones en estado Enviada o Negociación.</li>
      </ul>

      <H3 id="panel-graficos">2.2. Gráficos</H3>
      <P><strong>Pipeline por estado:</strong> Gráfico de barras que muestra cuántas cotizaciones hay en cada fase (Borrador, Enviada, Negociación, Ganada, Perdida) y su valor total.</P>
      <P><strong>Ingresos mensuales:</strong> Gráfico de barras con los ingresos de los últimos 6 meses, basado en cotizaciones Ganadas.</P>
      <P><strong>Funnel de conversión:</strong> Visualización del embudo comercial desde cotizaciones creadas hasta ganadas.</P>

      <H3 id="panel-acciones">2.3. Acciones rápidas y actividad</H3>
      <P>En la parte inferior encontrarás:</P>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <li><strong className="text-gray-800">Acciones rápidas:</strong> Botones para crear nueva cotización, nuevo cliente o nuevo producto sin navegar por el menú.</li>
        <li><strong className="text-gray-800">Actividad reciente:</strong> Timeline con las últimas 8 acciones del sistema (cambios de estado, emails enviados, aprobaciones, etc.) con fecha, tipo, descripción y cotización asociada.</li>
      </ul>

      {/* ═══════════════════════════════════════════════════════════════
          3. GESTION DE CLIENTES
      ═══════════════════════════════════════════════════════════════ */}
      <H2 id="clientes">3. Gestión de clientes</H2>

      <H3 id="clientes-listado">3.1. Listado de clientes</H3>
      <P>Accede desde el menú lateral <strong>Clientes</strong>. Verás una tabla con todos tus clientes mostrando: nombre, email, teléfono, ciudad, sector, contacto principal, número de cotizaciones y total de ingresos. Haz clic en cualquier fila para ver el detalle del cliente.</P>

      <H3 id="clientes-crear">3.2. Crear un nuevo cliente</H3>
      <P>Haz clic en <strong>&quot;Nuevo cliente&quot;</strong> en la esquina superior derecha. El formulario tiene dos secciones:</P>

      <p className="font-semibold text-gray-800 text-sm mt-4 mb-2">Información de la empresa:</p>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <Field name="Nombre" desc="Razón social o nombre comercial del cliente." required />
        <Field name="CIF/NIF" desc="Identificación fiscal del cliente." />
        <Field name="Sector" desc="Sector de actividad (ej: Tecnología, Retail, Salud)." />
        <Field name="Email" desc="Correo electrónico general de la empresa." />
        <Field name="Teléfono" desc="Número de contacto." />
        <Field name="Dirección" desc="Dirección fiscal." />
        <Field name="Ciudad" desc="Ciudad." />
        <Field name="País" desc="País (por defecto: España)." />
        <Field name="Notas internas" desc="Anotaciones privadas que solo tu equipo verá. No aparecen en cotizaciones." />
      </ul>

      <p className="font-semibold text-gray-800 text-sm mt-4 mb-2">Contactos (uno o más):</p>
      <P>Cada cliente puede tener múltiples personas de contacto. Para cada contacto:</P>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <Field name="Nombre" desc="Nombre completo del contacto." />
        <Field name="Cargo" desc="Posición en la empresa (ej: Director Comercial)." />
        <Field name="Email" desc="Email del contacto." />
        <Field name="Teléfono" desc="Teléfono directo del contacto." />
        <Field name="Contacto principal" desc="Marca uno como contacto principal. Es el que aparecerá por defecto en las cotizaciones." />
      </ul>
      <P>Usa los botones <strong>&quot;Añadir contacto&quot;</strong> y el icono de papelera para gestionar los contactos.</P>

      <H3 id="clientes-360">3.3. Vista 360 del cliente</H3>
      <P>Al hacer clic en un cliente ves su ficha completa con:</P>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <li><strong className="text-gray-800">Métricas:</strong> Total cotizaciones, ganadas/perdidas, tasa de conversión, ingresos totales y pipeline activo.</li>
        <li><strong className="text-gray-800">Contactos:</strong> Lista de todos los contactos asociados con sus datos.</li>
        <li><strong className="text-gray-800">Cotizaciones:</strong> Historial completo de todas las cotizaciones para ese cliente, con estado, fecha e importe. Clic para acceder al detalle.</li>
      </ul>

      {/* ═══════════════════════════════════════════════════════════════
          4. CATALOGO DE PRODUCTOS
      ═══════════════════════════════════════════════════════════════ */}
      <H2 id="productos">4. Catálogo de productos</H2>

      <H3 id="productos-crear">4.1. Crear un producto</H3>
      <P>Ve a <strong>Productos → Nuevo producto</strong>. Rellena la información básica:</P>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <Field name="Nombre del producto" desc="Nombre descriptivo que aparecerá en las cotizaciones." required />
        <Field name="Descripción" desc="Descripción detallada del producto o servicio." />
        <Field name="SKU" desc="Código único de referencia (ej: PROD-001, LIC-PRO-ANUAL)." required />
        <Field name="Categoría" desc="Selecciona una categoría existente del desplegable." />
        <Field name="Precio base" desc="Precio unitario por defecto. Se puede modificar individualmente en cada cotización." required />
        <Field name="Unidad" desc="Tipo de unidad de venta. Opciones: unidad, hora, mes, licencia/año, kg, m2." />
        <Field name="Activo" desc="Desmarca si quieres ocultar el producto del catálogo temporalmente sin eliminarlo." />
        <Field name="Tipo de facturación" desc="Único (pago una vez) o Recurrente (suscripción/servicio periódico). Por defecto: Único." />
        <Field name="Frecuencia" desc="Solo para productos recurrentes. Opciones: Mensual, Trimestral, Anual. Define la periodicidad del cobro." />
      </ul>

      <H3 id="productos-variantes">4.2. Variantes de producto</H3>
      <P>Las variantes permiten tener diferentes versiones de un mismo producto (ej: tallas, colores, niveles de servicio). Para añadir variantes:</P>
      <Step n={1}>En el formulario de producto, haz clic en <strong>&quot;Añadir variante&quot;</strong>.</Step>
      <Step n={2}>Rellena los datos de la variante:</Step>
      <ul className="list-disc pl-12 space-y-1 mb-4 text-sm text-gray-600">
        <Field name="Nombre de variante" desc="Ej: 'Básica', 'Premium', 'Talla XL'." required />
        <Field name="SKU" desc="Código único para esta variante." required />
        <Field name="Precio override" desc="Si se deja vacío, usa el precio base del producto. Si se rellena, esta variante tendrá su propio precio." />
        <Field name="Activo" desc="Permite desactivar variantes individualmente." />
      </ul>
      <Step n={3}>Opcionalmente, añade <strong>atributos</strong> a la variante (pares clave-valor):</Step>
      <ul className="list-disc pl-12 space-y-1 mb-4 text-sm text-gray-600">
        <li>Haz clic en <strong>&quot;Añadir atributo&quot;</strong> dentro de la variante.</li>
        <li>Ejemplo: Clave = &quot;Color&quot;, Valor = &quot;Rojo&quot;.</li>
        <li>Los atributos se muestran como etiquetas en el wizard de cotizaciones para facilitar la selección.</li>
      </ul>
      <Tip>Las variantes son ideales para productos con opciones (ej: licencia básica vs premium, camiseta S/M/L/XL, servicio por horas vs mensual).</Tip>

      <H3 id="productos-listado">4.3. Listado y búsqueda</H3>
      <P>En la página principal de Productos verás una tabla con nombre, SKU, categoría, precio base, estado (activo/inactivo) y número de variantes. Puedes:</P>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <li><strong className="text-gray-800">Filtrar por categoría</strong> usando el desplegable superior.</li>
        <li><strong className="text-gray-800">Buscar</strong> por nombre o SKU en la barra de búsqueda.</li>
        <li><strong className="text-gray-800">Editar</strong> haciendo clic en el icono de lápiz.</li>
        <li><strong className="text-gray-800">Eliminar</strong> haciendo clic en el icono de papelera (solo si no está en uso en cotizaciones).</li>
      </ul>

      {/* ═══════════════════════════════════════════════════════════════
          5. CREAR COTIZACIONES
      ═══════════════════════════════════════════════════════════════ */}
      <H2 id="cotizaciones-crear">5. Crear cotizaciones</H2>
      <P>El wizard de cotizaciones te guía en 4 pasos para crear una propuesta comercial profesional.</P>

      <H3 id="cot-paso0">5.1. Paso 0 — Seleccionar cliente</H3>
      <Step n={1}>Busca el cliente por nombre en el buscador.</Step>
      <Step n={2}>Haz clic en el cliente deseado de la lista.</Step>
      <Step n={3}>Opcionalmente, selecciona o escribe el nombre del contacto.</Step>
      <Step n={4}>Avanza al siguiente paso.</Step>
      <Warning>Si aún no has creado el cliente, ábrelo en otra pestaña desde Clientes → Nuevo cliente antes de empezar la cotización.</Warning>

      <H3 id="cot-paso1">5.2. Paso 1 — Añadir productos</H3>
      <P>La pantalla se divide en dos paneles:</P>
      <p className="font-semibold text-gray-800 text-sm mt-4 mb-2">Panel izquierdo — Catálogo:</p>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <li>Busca productos por nombre o SKU.</li>
        <li>Cada producto muestra: nombre, SKU, precio, unidad y número de variantes.</li>
        <li>Si un producto tiene variantes, haz clic en el icono de desplegar para ver las opciones. Cada variante muestra su nombre, SKU, precio y atributos como etiquetas de colores.</li>
        <li>Haz clic en el botón <strong>&quot;+&quot;</strong> para añadir el producto (o la variante seleccionada) a la cotización.</li>
        <li>También puedes usar <strong>&quot;Añadir línea personalizada&quot;</strong> para productos que no están en el catálogo.</li>
      </ul>
      <p className="font-semibold text-gray-800 text-sm mt-4 mb-2">Panel derecho — Líneas seleccionadas:</p>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <li><strong className="text-gray-800">Descripción:</strong> Editable. Se precarga con el nombre del producto/variante.</li>
        <li><strong className="text-gray-800">Cantidad:</strong> Acepta decimales (ej: 2.5 horas).</li>
        <li><strong className="text-gray-800">Precio unitario:</strong> Se precarga con el precio del producto pero es editable para cada cotización.</li>
        <li><strong className="text-gray-800">Descuento %:</strong> Descuento individual por línea (0-100%).</li>
        <li><strong className="text-gray-800">Total línea:</strong> Se calcula automáticamente: Cantidad × Precio × (1 - Descuento/100).</li>
        <li>Icono de papelera para eliminar la línea.</li>
      </ul>

      <H3 id="cot-paso2">5.3. Paso 2 — Precios y condiciones</H3>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <Field name="Descuento global %" desc="Se aplica sobre el subtotal completo, además de los descuentos por línea." />
        <Field name="IVA/Impuesto %" desc="Por defecto 21% (IVA español). Editable para otros tipos impositivos." />
        <Field name="Moneda" desc="EUR (por defecto), USD o GBP." />
        <Field name="Fecha de vencimiento" desc="Se precarga con los días configurados. Editable." />
        <Field name="Notas" desc="Notas internas o comentarios para el cliente." />
        <Field name="Condiciones" desc="Términos y condiciones. Se precargan con los configurados por defecto." />
      </ul>
      <P>A la derecha verás el desglose de precios: Subtotal, Descuento, IVA y <strong>Total final</strong>.</P>

      <H3 id="cot-paso3">5.4. Paso 3 — Resumen y creación</H3>
      <P>Revisa toda la información de la cotización:</P>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <li>Datos del cliente y contacto.</li>
        <li>Tabla completa de productos con cantidades, precios y descuentos.</li>
        <li>Totales con desglose.</li>
        <li><strong className="text-gray-800">Avisos de reglas:</strong> Si alguna regla comercial se viola (descuento excesivo, producto obligatorio faltante), aparecerá un aviso amarillo o rojo.</li>
        <li><strong className="text-gray-800">Promociones:</strong> Si hay promociones activas aplicables, se mostrarán como sugerencia.</li>
        <li><strong className="text-gray-800">Aprobaciones:</strong> Si la cotización requiere aprobación, el botón mostrará &quot;Crear y solicitar aprobación&quot;.</li>
      </ul>
      <P>Haz clic en <strong>&quot;Crear cotización&quot;</strong>. Se generará automáticamente con un número único y estado <strong>Borrador</strong>.</P>

      {/* ═══════════════════════════════════════════════════════════════
          6. GESTIONAR COTIZACIONES
      ═══════════════════════════════════════════════════════════════ */}
      <H2 id="cotizaciones-gestionar">6. Gestionar cotizaciones</H2>

      <H3 id="cot-estados">6.1. Flujo de estados</H3>
      <P>Cada cotización pasa por un flujo de estados claro:</P>
      <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 my-4 text-sm text-gray-600">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-gray-200 text-gray-700 font-medium">Borrador</span>
          <span className="text-gray-400">→</span>
          <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">Enviada</span>
          <span className="text-gray-400">→</span>
          <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 font-medium">Negociación</span>
          <span className="text-gray-400">→</span>
          <span className="px-2.5 py-1 rounded-full bg-green-100 text-green-700 font-medium">Ganada</span>
          <span className="text-gray-400">/</span>
          <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-700 font-medium">Perdida</span>
        </div>
        <p className="mt-3 text-xs text-gray-500">Además, cualquier cotización puede <strong>Archivarse</strong> en cualquier momento.</p>
      </div>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <li><strong className="text-gray-800">Borrador:</strong> Recién creada. Puedes editarla libremente. Acciones: Enviar, Previsualizar.</li>
        <li><strong className="text-gray-800">Enviada:</strong> Se ha enviado al cliente. Acciones: Marcar como Negociación, Ganada o Perdida.</li>
        <li><strong className="text-gray-800">Negociación:</strong> El cliente está considerando la oferta. Puedes editar condiciones, reenviar o duplicar. Acciones: Ganada, Perdida.</li>
        <li><strong className="text-gray-800">Ganada:</strong> Estado final positivo. Cuenta para ingresos y KPIs.</li>
        <li><strong className="text-gray-800">Perdida:</strong> Estado final negativo.</li>
        <li><strong className="text-gray-800">Archivada:</strong> Oculta de la vista principal pero no eliminada.</li>
      </ul>

      <H3 id="cot-email">6.2. Enviar cotización por email</H3>
      <Step n={1}>En la vista detalle de la cotización, haz clic en el icono de <strong>correo</strong>.</Step>
      <Step n={2}>Se abre un diálogo con los campos:</Step>
      <ul className="list-disc pl-12 space-y-1 mb-4 text-sm text-gray-600">
        <li><strong className="text-gray-800">Para:</strong> Email del destinatario.</li>
        <li><strong className="text-gray-800">Asunto:</strong> Se precarga con el número de cotización.</li>
        <li><strong className="text-gray-800">Mensaje:</strong> Cuerpo del email personalizable.</li>
      </ul>
      <Step n={3}>Haz clic en <strong>&quot;Enviar&quot;</strong>. El PDF de la cotización se adjunta automáticamente al email.</Step>
      <Warning>Necesitas tener SMTP configurado para enviar emails. Ve a Configuración si aún no lo has hecho.</Warning>

      <H3 id="cot-duplicar">6.3. Duplicar una cotización</H3>
      <P>Haz clic en el icono de <strong>duplicar</strong> (dos hojas) para crear una copia exacta. Útil para cotizaciones similares o versiones revisadas. La copia se crea como Borrador con un nuevo número.</P>

      <H3 id="cot-detalle">6.4. Vista detalle</H3>
      <P>La página de detalle muestra toda la información de la cotización:</P>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <li><strong className="text-gray-800">Cabecera:</strong> Número, estado, total, fecha emisión, fecha vencimiento, botones de acción.</li>
        <li><strong className="text-gray-800">Alertas:</strong> Si la cotización ha vencido, si tiene aprobaciones pendientes, si faltan condiciones, o si viola alguna regla comercial.</li>
        <li><strong className="text-gray-800">Info cliente:</strong> Nombre y contacto.</li>
        <li><strong className="text-gray-800">Tabla de items:</strong> Descripción, cantidad, precio unitario, descuento %, total por línea. Si es un producto del catálogo muestra el SKU; si tiene variante muestra los atributos.</li>
        <li><strong className="text-gray-800">Totales:</strong> Subtotal, descuento global (si aplica), IVA con porcentaje, total final.</li>
        <li><strong className="text-gray-800">Notas y condiciones:</strong> Con opción de editar las condiciones en estados Borrador o Negociación.</li>
        <li><strong className="text-gray-800">Timeline:</strong> Historial de actividad (creación, envío, cambios de estado, emails).</li>
        <li><strong className="text-gray-800">Panel de aprobaciones:</strong> Si la cotización requiere aprobación, se muestran las pendientes/resueltas.</li>
      </ul>

      {/* ═══════════════════════════════════════════════════════════════
          7. PLANTILLAS PDF
      ═══════════════════════════════════════════════════════════════ */}
      <H2 id="pdf">7. Plantillas PDF</H2>
      <P>DealForge incluye 3 plantillas profesionales para tus cotizaciones en PDF:</P>

      <div className="grid gap-4 my-4">
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
          <p className="font-semibold text-gray-800 mb-1">Moderna</p>
          <p className="text-sm text-gray-600">Cabecera con gradiente de tu color primario. Tabla con filas alternadas de color. Pie de página con fondo tintado. Ideal para empresas tecnológicas y startups.</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
          <p className="font-semibold text-gray-800 mb-1">Clásica</p>
          <p className="text-sm text-gray-600">Cabecera con línea negra gruesa. Estilo profesional y formal. Tabla con cabecera gris. Ideal para consultoras, despachos y empresas tradicionales.</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
          <p className="font-semibold text-gray-800 mb-1">Minimalista</p>
          <p className="text-sm text-gray-600">Diseño limpio con mucho espacio en blanco. Acentos grises suaves. Ideal para agencias creativas y empresas de diseño.</p>
        </div>
      </div>

      <P><strong>Para cambiar la plantilla:</strong> Ve a <strong>Configuración → Plantilla PDF</strong> y selecciona la que prefieras. Todas las nuevas cotizaciones usarán esa plantilla.</P>
      <P><strong>Para previsualizar una cotización:</strong> Desde la vista detalle, haz clic en el icono del <strong>ojo</strong>. Se abrirá la previsualización en una nueva página.</P>
      <P><strong>Para guardar como PDF o imprimir:</strong> En la previsualización, haz clic en el botón <strong>&quot;Imprimir / PDF&quot;</strong>. Se abrirá el diálogo de impresión del navegador donde puedes seleccionar &quot;Guardar como PDF&quot;.</P>

      <P>Todas las plantillas muestran:</P>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <li>Logo y datos de tu empresa (nombre, CIF, web, email, teléfono, dirección)</li>
        <li>Datos del cliente (nombre, CIF, dirección, contacto)</li>
        <li>Número de cotización y fecha de emisión</li>
        <li>Tabla de items con descripción, cantidad, precio, descuento y total</li>
        <li>Desglose: subtotal, descuento global, IVA, total</li>
        <li>Condiciones y notas</li>
        <li>Periodo de validez</li>
        <li>Número de versión</li>
      </ul>

      {/* ═══════════════════════════════════════════════════════════════
          8. REGLAS COMERCIALES
      ═══════════════════════════════════════════════════════════════ */}
      <H2 id="reglas">8. Reglas comerciales</H2>
      <P>Las reglas comerciales automatizan tu política de precios y aprobaciones. Accede desde <strong>Reglas</strong> en el menú lateral.</P>

      <H3 id="reglas-descuento">8.1. Límites de descuento</H3>
      <P>Establece descuentos máximos permitidos:</P>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <li><strong className="text-gray-800">Descuento máximo por línea:</strong> Porcentaje máximo que se puede aplicar a una línea individual.</li>
        <li><strong className="text-gray-800">Descuento máximo global:</strong> Porcentaje máximo del descuento que se aplica al subtotal.</li>
        <li><strong className="text-gray-800">Ámbito:</strong> Aplica a todos los productos, a productos específicos o a categorías concretas.</li>
      </ul>
      <P>Cuando un usuario intenta superar el límite, la cotización muestra un aviso y puede bloquearse.</P>

      <H3 id="reglas-obligatorios">8.2. Productos obligatorios</H3>
      <P>Obliga a incluir ciertos productos cuando se cotiza otro:</P>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <li><strong className="text-gray-800">Producto disparador:</strong> Cuando se añade este producto (o categoría) a la cotización...</li>
        <li><strong className="text-gray-800">Producto requerido:</strong> ...se exige que también se incluya este otro producto.</li>
        <li><strong className="text-gray-800">Mensaje personalizado:</strong> Texto que se muestra al usuario (ej: &quot;El servicio de instalación es obligatorio con este equipo&quot;).</li>
      </ul>

      <H3 id="reglas-aprobacion">8.3. Reglas de aprobación</H3>
      <P>Define cuándo una cotización requiere aprobación antes de poder enviarse:</P>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <li><strong className="text-gray-800">Condición:</strong> Descuento por línea mayor a X%, descuento global mayor a X%, o total mayor a X EUR.</li>
        <li><strong className="text-gray-800">Operador:</strong> Mayor que (&gt;) o Mayor o igual que (≥).</li>
        <li><strong className="text-gray-800">Aprobador:</strong> Nombre y email de la persona que debe aprobar. Recibirá un email con enlace seguro.</li>
      </ul>
      <P>Puedes crear múltiples condiciones en la misma regla. Todas deben cumplirse para que se dispare.</P>

      <H3 id="reglas-promocion">8.4. Promociones</H3>
      <P>Crea promociones temporales para tus productos:</P>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <li><strong className="text-gray-800">Rango de fechas:</strong> Fecha de inicio y fin de la promoción.</li>
        <li><strong className="text-gray-800">Productos:</strong> Selecciona a qué productos aplica.</li>
        <li><strong className="text-gray-800">Tipo:</strong> Descuento porcentual o precio fijo.</li>
        <li><strong className="text-gray-800">Valor:</strong> Porcentaje de descuento o precio promocional.</li>
        <li><strong className="text-gray-800">Mensaje:</strong> Texto que se muestra al crear cotizaciones (ej: &quot;Promo de verano: 15% en licencias&quot;).</li>
      </ul>
      <P>Las promociones aparecen como sugerencia en el paso 3 del wizard de cotizaciones cuando hay productos elegibles.</P>

      <H3 id="reglas-gestion">8.5. Gestionar reglas</H3>
      <P>En la página de Reglas, cada tipo tiene su sección colapsable. Puedes:</P>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <li><strong className="text-gray-800">Activar/desactivar:</strong> Usa el interruptor (toggle) junto a cada regla para activarla o desactivarla sin eliminarla.</li>
        <li><strong className="text-gray-800">Editar:</strong> Haz clic en el icono de lápiz para abrir el formulario de edición.</li>
        <li><strong className="text-gray-800">Eliminar:</strong> Haz clic en el icono de papelera para borrar la regla permanentemente.</li>
        <li><strong className="text-gray-800">Crear:</strong> Haz clic en el botón &quot;+&quot; dentro de cada sección para añadir una nueva regla de ese tipo.</li>
      </ul>

      {/* ═══════════════════════════════════════════════════════════════
          9. FLUJO DE APROBACIONES
      ═══════════════════════════════════════════════════════════════ */}
      <H2 id="aprobaciones">9. Flujo de aprobaciones</H2>

      <H3 id="aprob-como">9.1. Cómo funciona</H3>
      <Step n={1}>Creas una cotización que cumple las condiciones de una regla de aprobación (ej: descuento &gt; 20%).</Step>
      <Step n={2}>Al crear la cotización, el sistema detecta automáticamente que necesita aprobación y envía un email al aprobador designado.</Step>
      <Step n={3}>El aprobador recibe un email con un enlace seguro (no necesita cuenta en DealForge).</Step>
      <Step n={4}>El aprobador hace clic en el enlace y ve la página de aprobación con todos los detalles de la cotización: cliente, items, totales y el motivo de la aprobación.</Step>
      <Step n={5}>El aprobador puede <strong>Aprobar</strong> o <strong>Rechazar</strong>, opcionalmente con un comentario.</Step>
      <Step n={6}>Mientras la aprobación esté pendiente, <strong>no se puede enviar la cotización al cliente</strong>. Aparece una alerta en la vista detalle.</Step>

      <H3 id="aprob-reenviar">9.2. Reenviar email de aprobación</H3>
      <P>Si el aprobador no ha recibido o no encuentra el email, puedes reenviar la solicitud desde la vista detalle de la cotización, en el panel lateral de Aprobaciones, haciendo clic en <strong>&quot;Reenviar&quot;</strong>.</P>

      <H3 id="aprob-estados">9.3. Estados de aprobación</H3>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <li><span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-medium">Pendiente</span> — Esperando respuesta del aprobador. La cotización no puede enviarse.</li>
        <li><span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">Aprobada</span> — El aprobador ha dado el visto bueno. La cotización puede enviarse.</li>
        <li><span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-medium">Rechazada</span> — El aprobador ha rechazado. Se muestra el comentario. Puedes modificar la cotización y volver a solicitar aprobación.</li>
      </ul>

      {/* ═══════════════════════════════════════════════════════════════
          10. REPORTES Y ANALITICA
      ═══════════════════════════════════════════════════════════════ */}
      <H2 id="reportes">10. Reportes y analítica</H2>
      <P>Accede desde <strong>Reportes</strong> en el menú lateral. Los datos se calculan en tiempo real a partir de tus cotizaciones.</P>
      <ul className="list-disc pl-6 space-y-2 mb-4 text-sm text-gray-600">
        <li><strong className="text-gray-800">Resumen general:</strong> Total de cotizaciones, ganadas y perdidas.</li>
        <li><strong className="text-gray-800">Gráfico mensual:</strong> Cotizaciones ganadas y perdidas por mes con su valor asociado. Te permite ver tendencias y estacionalidad.</li>
        <li><strong className="text-gray-800">Top 10 clientes:</strong> Ranking de tus mejores clientes por ingresos totales, con número de cotizaciones por cliente.</li>
        <li><strong className="text-gray-800">Top 10 productos:</strong> Productos más incluidos en cotizaciones, con frecuencia de aparición y valor total cotizado.</li>
      </ul>
      <Tip>Usa los reportes para identificar tus mejores clientes, detectar productos estrella y evaluar el rendimiento de tu equipo comercial.</Tip>

      {/* ═══════════════════════════════════════════════════════════════
          11. INTEGRACIONES
      ═══════════════════════════════════════════════════════════════ */}
      <H2 id="integraciones">11. Integraciones</H2>
      <P>Accede desde <strong>Integraciones</strong> en el menú lateral. La página tiene tres pestañas:</P>

      <H3 id="int-exportar">11.1. Exportar datos</H3>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <li><strong className="text-gray-800">Cotizaciones a CSV:</strong> Exporta un archivo CSV con todas tus cotizaciones. Puedes filtrar por estado y rango de fechas.</li>
        <li><strong className="text-gray-800">Productos a Excel:</strong> Exporta tu catálogo de productos completo incluyendo variantes.</li>
      </ul>

      <H3 id="int-importar">11.2. Importar datos</H3>
      <P>Sube archivos CSV para importar datos en masa:</P>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <li><strong className="text-gray-800">Importar productos:</strong> Sube un CSV con columnas para nombre, SKU, precio, categoría, etc. El sistema valida los datos antes de importar y muestra errores si los hay.</li>
        <li><strong className="text-gray-800">Importar clientes:</strong> Sube un CSV con datos de clientes. Se mapean automáticamente las columnas.</li>
      </ul>
      <Warning>Antes de importar, verifica que el formato del CSV sea correcto. La primera fila debe contener los nombres de las columnas.</Warning>

      <H3 id="int-conectores">11.3. Conectores</H3>
      <P>Conecta DealForge con otras herramientas a través de webhooks (ej: Zapier). Esta funcionalidad está disponible en los planes Pro y Business.</P>

      {/* ═══════════════════════════════════════════════════════════════
          12. FORGE IA — ASISTENTE INTELIGENTE
      ═══════════════════════════════════════════════════════════════ */}
      <H2 id="forge">12. Forge IA — Asistente inteligente</H2>

      <H3 id="forge-que">12.1. Qué es Forge</H3>
      <P>Forge es el asistente de inteligencia artificial integrado en DealForge. Aparece como un panel lateral en todas las páginas del dashboard. Forge entiende el contexto de la página en la que te encuentras y puede ayudarte con tareas relacionadas.</P>

      <H3 id="forge-usar">12.2. Cómo usarlo</H3>
      <Step n={1}>Haz clic en el icono de chat en la esquina inferior derecha (o en el panel lateral si ya está abierto).</Step>
      <Step n={2}>Escribe tu pregunta o instrucción en lenguaje natural.</Step>
      <Step n={3}>Forge responderá con información contextual, sugerencias o acciones.</Step>
      <P>Forge entiende el contexto de la página actual. Si estás en la página de un cliente, sabe de qué cliente hablas. Si estás en una cotización, conoce los detalles.</P>

      <H3 id="forge-ejemplos">12.3. Ejemplos de lo que puedes pedirle</H3>
      <ul className="list-disc pl-6 space-y-2 mb-4 text-sm text-gray-600">
        <li><strong className="text-gray-800">Navegación:</strong> &quot;Llévame a crear una nueva cotización&quot;, &quot;¿Dónde configuro el SMTP?&quot;</li>
        <li><strong className="text-gray-800">Cotizaciones:</strong> &quot;Hazme una cotización para Empresa ABC con 10 licencias Premium&quot;</li>
        <li><strong className="text-gray-800">Análisis:</strong> &quot;¿Cómo va mi pipeline este mes?&quot;, &quot;¿Cuál es mi tasa de conversión?&quot;</li>
        <li><strong className="text-gray-800">Catálogo:</strong> &quot;¿Cuántos productos tengo activos?&quot;, &quot;Muéstrame los productos de la categoría Servicios&quot;</li>
        <li><strong className="text-gray-800">Clientes:</strong> &quot;¿Cuántas cotizaciones tiene el cliente X?&quot;, &quot;Resúmeme la actividad de este cliente&quot;</li>
        <li><strong className="text-gray-800">Ayuda general:</strong> &quot;¿Cómo configuro una regla de aprobación?&quot;, &quot;¿Cómo envío una cotización por email?&quot;</li>
      </ul>
      <P>Forge también ofrece <strong>sugerencias contextuales</strong> debajo de cada respuesta — botones rápidos con acciones relevantes según la página actual.</P>

      <H3 id="forge-planes">12.4. Modelos por plan</H3>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <li><strong className="text-gray-800">Plan Starter (gratis):</strong> Forge usa Claude Haiku — rápido y eficiente para consultas básicas.</li>
        <li><strong className="text-gray-800">Plan Pro / Business:</strong> Forge usa Claude Sonnet — más potente, con respuestas más detalladas y mejor comprensión del contexto.</li>
      </ul>

      <H3 id="forge-limitaciones">12.5. Limitaciones importantes</H3>
      <Warning>Las respuestas de Forge son orientativas y no constituyen asesoramiento profesional de ningún tipo (legal, fiscal, financiero o comercial). Verifica siempre la información antes de tomar decisiones basadas en ella.</Warning>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <li>Forge puede cometer errores o dar información imprecisa.</li>
        <li>Las conversaciones no se almacenan entre sesiones.</li>
        <li>El número de consultas puede estar limitado según tu plan.</li>
        <li>Forge no tiene acceso a internet ni a información externa — solo conoce tus datos dentro de DealForge.</li>
      </ul>

      {/* ═══════════════════════════════════════════════════════════════
          13. FIRMA ELECTRÓNICA
      ═══════════════════════════════════════════════════════════════ */}
      <H2 id="firma-electronica">13. Firma electrónica</H2>
      <P>DealForge incluye firma electrónica integrada para que tus clientes puedan firmar cotizaciones desde cualquier dispositivo.</P>

      <H3 id="firma-solicitar">13.1. Solicitar una firma</H3>
      <P>Desde la ficha de una cotización en estado <strong>Enviada</strong> o <strong>Negociación</strong>, ve a la sección <strong>Firma Electrónica</strong>:</P>
      <Step n={1}>El sistema pre-rellena el nombre y email del contacto principal de la cotización.</Step>
      <Step n={2}>Puedes cambiar el firmante si necesitas que firme otra persona.</Step>
      <Step n={3}>Haz clic en <strong>&quot;Solicitar Firma&quot;</strong>. Se generará un enlace único y se enviará por email al firmante.</Step>
      <Tip>Cuando el cliente firma, la cotización se marca automáticamente como <strong>Ganada</strong>.</Tip>

      <H3 id="firma-proceso">13.2. Proceso de firma del cliente</H3>
      <P>El cliente recibe un email con un enlace único que le lleva a una página donde puede:</P>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <li>Ver el resumen completo de la cotización (líneas, totales, condiciones).</li>
        <li>Leer los Términos y Condiciones antes de firmar.</li>
        <li>Dibujar su firma con el dedo (móvil) o ratón (desktop).</li>
        <li>Confirmar la firma con un solo clic.</li>
      </ul>
      <Warning>La firma electrónica de DealForge es una <strong>firma electrónica simple</strong> según el Reglamento eIDAS (UE 910/2014). Registra identidad, fecha, hora e IP del firmante. Para contratos que requieran firma avanzada o cualificada, consulta con un asesor legal.</Warning>

      {/* ═══════════════════════════════════════════════════════════════
          14. RECORDATORIOS AUTOMÁTICOS
      ═══════════════════════════════════════════════════════════════ */}
      <H2 id="recordatorios">14. Recordatorios automáticos</H2>
      <P>DealForge envía recordatorios por email automáticamente para que no pierdas seguimiento de ninguna oportunidad.</P>

      <H3 id="recordatorios-tipos">14.1. Tipos de recordatorio</H3>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <li><strong className="text-gray-800">Seguimiento al vendedor:</strong> Se envía al vendedor X días después de enviar la cotización si no hay respuesta.</li>
        <li><strong className="text-gray-800">Aviso de vencimiento al cliente:</strong> Se envía al cliente X días antes de que la cotización expire.</li>
      </ul>

      <H3 id="recordatorios-config">14.2. Configuración</H3>
      <P>Ve a <strong>Configuración → Recordatorios</strong> para ajustar:</P>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <Field name="Días seguimiento vendedor" desc="Número de días después del envío para recordar al vendedor. Por defecto: 3 días." />
        <Field name="Días aviso vencimiento" desc="Número de días antes del vencimiento para avisar al cliente. Por defecto: 3 días." />
        <Field name="Recordatorios activos" desc="Activa o desactiva todos los recordatorios con un solo toggle." />
      </ul>
      <Tip>Los recordatorios se procesan automáticamente una vez al día. Solo se envían para cotizaciones en estado Enviada o Negociación.</Tip>

      {/* ═══════════════════════════════════════════════════════════════
          15. GESTIÓN DE CONTRATOS
      ═══════════════════════════════════════════════════════════════ */}
      <H2 id="contratos">15. Gestión de contratos</H2>
      <P>La gestión de contratos permite convertir cotizaciones ganadas en contratos recurrentes con seguimiento de vigencia, renovaciones y enmiendas. <strong>Disponible en el plan Business y Enterprise.</strong></P>

      <H3 id="contratos-crear">15.1. Crear un contrato</H3>
      <P>Cuando una cotización pasa a estado <strong>Ganada</strong>, aparece el botón <strong>&quot;Crear Contrato&quot;</strong>:</P>
      <Step n={1}>Haz clic en <strong>&quot;Crear Contrato&quot;</strong> desde la ficha de la cotización ganada.</Step>
      <Step n={2}>El sistema crea automáticamente el contrato con las líneas de la cotización, incluyendo la frecuencia de facturación de cada línea.</Step>
      <Step n={3}>El contrato se genera con número <strong>CTR-{"{AÑO}"}-{"{SECUENCIA}"}</strong>, fecha inicio hoy y duración de 12 meses por defecto.</Step>
      <Tip>Las condiciones y cláusulas de la cotización se copian automáticamente al contrato.</Tip>

      <H3 id="contratos-lineas">15.2. Líneas con frecuencia</H3>
      <P>Cada línea del contrato tiene una frecuencia de facturación heredada del producto:</P>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <li><strong className="text-gray-800">Mensual</strong> — el importe se cobra cada mes.</li>
        <li><strong className="text-gray-800">Trimestral</strong> — cada 3 meses.</li>
        <li><strong className="text-gray-800">Anual</strong> — una vez al año.</li>
        <li><strong className="text-gray-800">Único</strong> — pago único (no recurrente).</li>
      </ul>
      <P>El sistema calcula automáticamente el <strong>valor mensual (MRR)</strong> normalizando todas las frecuencias a base mensual.</P>

      <H3 id="contratos-estados">15.3. Estados del contrato</H3>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <li><strong className="text-gray-800">Activo</strong> — contrato vigente dentro de sus fechas.</li>
        <li><strong className="text-gray-800">Pendiente Renovación</strong> — próximo a vencer, pendiente de decisión.</li>
        <li><strong className="text-gray-800">Renovado</strong> — contrato renovado para un nuevo período.</li>
        <li><strong className="text-gray-800">Cancelado</strong> — contrato cancelado con motivo registrado.</li>
        <li><strong className="text-gray-800">Expirado</strong> — contrato vencido sin renovación.</li>
      </ul>

      <H3 id="contratos-acciones">15.4. Acciones sobre contratos</H3>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <li><strong className="text-gray-800">Renovar:</strong> Extiende el contrato por otro período (mismo número de meses).</li>
        <li><strong className="text-gray-800">Cancelar:</strong> Cancela el contrato con motivo y fecha efectiva.</li>
        <li><strong className="text-gray-800">Crear enmienda:</strong> Registra modificaciones (upsell, downsell, extensiones) con valor anterior y nuevo.</li>
      </ul>

      {/* ═══════════════════════════════════════════════════════════════
          16. RENOVACIONES Y ALERTAS
      ═══════════════════════════════════════════════════════════════ */}
      <H2 id="renovaciones">16. Renovaciones y alertas</H2>
      <P>El sistema gestiona automáticamente las renovaciones de contratos y te alerta con antelación cuando se acercan las fechas de vencimiento.</P>

      <H3 id="renovaciones-auto">16.1. Renovación automática</H3>
      <P>Si un contrato tiene la opción <strong>renovación automática</strong> activada, al llegar la fecha de fin el sistema:</P>
      <Step n={1}>Extiende automáticamente la fecha de fin por el mismo período de duración.</Step>
      <Step n={2}>Recalcula el valor total del contrato.</Step>
      <Step n={3}>Envía un email de confirmación al vendedor.</Step>
      <Step n={4}>Registra la actividad en la línea de tiempo del contrato.</Step>

      <H3 id="renovaciones-manual">16.2. Renovación manual</H3>
      <P>Si la renovación automática está desactivada, el sistema cambia el estado a <strong>Pendiente Renovación</strong> cuando faltan los días configurados (por defecto 30 días) y envía un email al vendedor para que actúe.</P>

      <H3 id="renovaciones-semaforo">16.3. Semáforo visual</H3>
      <P>La tabla de contratos muestra una columna <strong>&quot;Días&quot;</strong> con código de colores:</P>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <li><strong className="text-green-600">Verde (365-65 días)</strong> — contrato en buen estado, sin urgencia.</li>
        <li><strong className="text-amber-600">Naranja (64-15 días)</strong> — atención, próximo a vencer. Aparece banner de aviso.</li>
        <li><strong className="text-red-600">Rojo (14-0 días)</strong> — urgente, requiere acción inmediata. Banner de alerta crítica.</li>
      </ul>
      <Warning>Los contratos que no se renuevan ni se cancelan antes de la fecha de fin pasan automáticamente a estado <strong>Expirado</strong>.</Warning>

      {/* ═══════════════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════════════ */}
      <div className="mt-16 pt-8 border-t border-gray-200 text-center">
        <p className="text-gray-500 text-sm mb-2">¿No encuentras lo que buscas?</p>
        <a href="mailto:info@dealforge.es" className="text-[#3a9bb5] font-semibold hover:underline">Escríbenos a info@dealforge.es</a>
        <div className="mt-6 flex justify-center gap-4 text-sm text-gray-400">
          <Link href="/changelog" className="hover:text-gray-600 transition-colors">Changelog</Link>
          <span>|</span>
          <Link href="/privacidad" className="hover:text-gray-600 transition-colors">Privacidad</Link>
          <span>|</span>
          <Link href="/terminos" className="hover:text-gray-600 transition-colors">Términos</Link>
        </div>
      </div>
    </article>
  );
}
