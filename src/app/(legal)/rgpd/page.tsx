import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cumplimiento RGPD — DealForge",
  description: "Compromiso de DealForge con el Reglamento General de Protección de Datos (RGPD/GDPR). Medidas de seguridad, derechos del interesado y subencargados del tratamiento.",
  alternates: { canonical: "https://dealforge.es/rgpd" },
};

const FECHA_ACTUALIZACION = "9 de marzo de 2026";

export default function RGPDPage() {
  return (
    <article className="prose-legal">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Cumplimiento RGPD</h1>
        <p className="text-sm text-gray-500 bg-gray-50 inline-block px-3 py-1 rounded-lg">
          Última actualización: {FECHA_ACTUALIZACION}
        </p>
      </div>

      {/* Intro */}
      <div className="bg-[#3a9bb5]/5 border border-[#3a9bb5]/20 rounded-xl p-6 mb-12">
        <p className="text-gray-700 leading-relaxed">
          DealForge se compromete firmemente con el cumplimiento del <strong>Reglamento (UE) 2016/679</strong> (Reglamento General de Protección de Datos — RGPD) y la <strong>Ley Orgánica 3/2018</strong>, de 5 de diciembre, de Protección de Datos Personales y Garantía de los Derechos Digitales (LOPD-GDD). Esta página detalla las medidas técnicas, organizativas y legales que implementamos para proteger los datos personales de nuestros usuarios y sus clientes.
        </p>
      </div>

      {/* Indice */}
      <nav className="mb-12 p-6 bg-gray-50 rounded-xl border border-gray-100">
        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">Índice</h2>
        <ol className="space-y-1.5 text-sm text-[#3a9bb5]">
          <li><a href="#principios" className="hover:underline">1. Principios del tratamiento</a></li>
          <li><a href="#bases-legales" className="hover:underline">2. Bases legales por tipo de tratamiento</a></li>
          <li><a href="#seguridad-tecnica" className="hover:underline">3. Medidas de seguridad técnicas</a></li>
          <li><a href="#seguridad-organizativa" className="hover:underline">4. Medidas de seguridad organizativas</a></li>
          <li><a href="#subencargados" className="hover:underline">5. Subencargados del tratamiento</a></li>
          <li><a href="#derechos" className="hover:underline">6. Derechos del interesado</a></li>
          <li><a href="#rat" className="hover:underline">7. Registro de actividades de tratamiento</a></li>
          <li><a href="#brechas" className="hover:underline">8. Notificación de brechas de seguridad</a></li>
          <li><a href="#eipd" className="hover:underline">9. Evaluación de impacto (EIPD)</a></li>
          <li><a href="#transferencias" className="hover:underline">10. Transferencias internacionales</a></li>
          <li><a href="#cookies" className="hover:underline">11. Política de cookies</a></li>
          <li><a href="#encargado" className="hover:underline">12. DealForge como encargado del tratamiento</a></li>
          <li><a href="#dpd" className="hover:underline">13. Delegado de Protección de Datos</a></li>
        </ol>
      </nav>

      {/* Contenido */}
      <div className="space-y-10 text-gray-600 leading-relaxed">

        <section id="principios">
          <h2 className="text-xl font-bold text-gray-900 mb-4">1. Principios del tratamiento de datos</h2>
          <p className="mb-4">Todos los tratamientos de datos personales realizados por DealForge se rigen por los principios establecidos en el artículo 5 del RGPD:</p>
          <div className="grid gap-3">
            {[
              { titulo: "Licitud, lealtad y transparencia", desc: "Tratamos los datos de forma lícita, leal y transparente. Los usuarios conocen en todo momento qué datos recopilamos y para qué." },
              { titulo: "Limitación de la finalidad", desc: "Los datos se recogen para fines determinados, explícitos y legítimos, y no se tratan posteriormente de manera incompatible con dichos fines." },
              { titulo: "Minimización de datos", desc: "Solo recopilamos los datos estrictamente necesarios para cada finalidad. No solicitamos información innecesaria." },
              { titulo: "Exactitud", desc: "Mantenemos los datos actualizados y facilitamos al usuario herramientas para corregirlos en cualquier momento." },
              { titulo: "Limitación del plazo de conservación", desc: "Los datos se conservan durante el tiempo estrictamente necesario y conforme a los plazos legales establecidos." },
              { titulo: "Integridad y confidencialidad", desc: "Aplicamos medidas técnicas y organizativas para garantizar la seguridad de los datos contra el tratamiento no autorizado, la pérdida o la destrucción." },
              { titulo: "Responsabilidad proactiva", desc: "Documentamos y demostramos el cumplimiento de todos estos principios de forma continua." },
            ].map((p) => (
              <div key={p.titulo} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <p className="font-semibold text-gray-800 text-sm mb-1">{p.titulo}</p>
                <p className="text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="bases-legales">
          <h2 className="text-xl font-bold text-gray-900 mb-4">2. Bases legales por tipo de tratamiento</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Actividad de tratamiento</th>
                  <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Datos tratados</th>
                  <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Base jurídica</th>
                  <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Conservación</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="p-3 border border-gray-200">Registro de usuario</td><td className="p-3 border border-gray-200">Nombre, email, contraseña (hash)</td><td className="p-3 border border-gray-200">Ejecución contractual (6.1.b)</td><td className="p-3 border border-gray-200">Duración del contrato + plazos legales</td></tr>
                <tr className="bg-gray-50"><td className="p-3 border border-gray-200">Prestación del servicio CPQ</td><td className="p-3 border border-gray-200">Datos empresa, productos, clientes, cotizaciones</td><td className="p-3 border border-gray-200">Ejecución contractual (6.1.b)</td><td className="p-3 border border-gray-200">Duración del contrato + 30 días</td></tr>
                <tr><td className="p-3 border border-gray-200">Procesamiento de pagos</td><td className="p-3 border border-gray-200">Email, plan, ID Stripe</td><td className="p-3 border border-gray-200">Ejecución contractual (6.1.b)</td><td className="p-3 border border-gray-200">5 años (obligación fiscal)</td></tr>
                <tr className="bg-gray-50"><td className="p-3 border border-gray-200">Asistente IA (Forge)</td><td className="p-3 border border-gray-200">Consultas en contexto de la página</td><td className="p-3 border border-gray-200">Ejecución contractual (6.1.b)</td><td className="p-3 border border-gray-200">No se almacenan conversaciones</td></tr>
                <tr><td className="p-3 border border-gray-200">Notificaciones transaccionales</td><td className="p-3 border border-gray-200">Email, nombre</td><td className="p-3 border border-gray-200">Ejecución contractual (6.1.b)</td><td className="p-3 border border-gray-200">Duración del contrato</td></tr>
                <tr className="bg-gray-50"><td className="p-3 border border-gray-200">Datos fiscales</td><td className="p-3 border border-gray-200">CIF, dirección fiscal, facturas</td><td className="p-3 border border-gray-200">Obligación legal (6.1.c)</td><td className="p-3 border border-gray-200">5 años (Ley Tributaria)</td></tr>
                <tr><td className="p-3 border border-gray-200">Mejora del servicio</td><td className="p-3 border border-gray-200">Datos agregados y anonimizados</td><td className="p-3 border border-gray-200">Interés legítimo (6.1.f)</td><td className="p-3 border border-gray-200">Indefinido (datos anónimos)</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="seguridad-tecnica">
          <h2 className="text-xl font-bold text-gray-900 mb-4">3. Medidas de seguridad técnicas</h2>
          <p className="mb-4">Conforme al artículo 32 del RGPD, implementamos las siguientes medidas técnicas de seguridad:</p>

          <h3 className="text-base font-semibold text-gray-800 mb-2">3.1. Cifrado</h3>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            <li><strong className="text-gray-800">En tránsito:</strong> Todas las comunicaciones se realizan sobre HTTPS con TLS 1.2 o superior. Se aplica HSTS (HTTP Strict Transport Security) con directiva preload.</li>
            <li><strong className="text-gray-800">En reposo:</strong> La base de datos PostgreSQL (Supabase/AWS) utiliza cifrado AES-256 en reposo para todos los volúmenes de datos.</li>
          </ul>

          <h3 className="text-base font-semibold text-gray-800 mb-2">3.2. Autenticación y control de acceso</h3>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            <li><strong className="text-gray-800">Hashing de contraseñas:</strong> bcrypt con salt aleatorio por usuario. Las contraseñas nunca se almacenan en texto plano ni son recuperables.</li>
            <li><strong className="text-gray-800">Tokens de sesión:</strong> JWT (JSON Web Tokens) firmados con clave secreta de 256 bits, con expiración temporal configurable.</li>
            <li><strong className="text-gray-800">Cookies seguras:</strong> HttpOnly, Secure, SameSite=Lax — inaccesibles desde JavaScript del cliente.</li>
          </ul>

          <h3 className="text-base font-semibold text-gray-800 mb-2">3.3. Cabeceras de seguridad HTTP</h3>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            <li><code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">X-Frame-Options: DENY</code> — Protección contra clickjacking.</li>
            <li><code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">X-Content-Type-Options: nosniff</code> — Prevención de MIME sniffing.</li>
            <li><code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">Referrer-Policy: strict-origin-when-cross-origin</code> — Control de información del referrer.</li>
            <li><code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">Permissions-Policy</code> — Restricción de acceso a cámara, micrófono y geolocalización.</li>
            <li><code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">Strict-Transport-Security</code> — HSTS con max-age de 2 años, includeSubDomains y preload.</li>
          </ul>

          <h3 className="text-base font-semibold text-gray-800 mb-2">3.4. Infraestructura</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Base de datos alojada en la región UE (eu-west-1, Irlanda) de AWS a través de Supabase.</li>
            <li>Copias de seguridad automáticas diarias de la base de datos.</li>
            <li>Despliegue en Vercel con edge network global y aislamiento de funciones.</li>
            <li>Variables de entorno cifradas en el servidor — nunca expuestas al cliente.</li>
          </ul>
        </section>

        <section id="seguridad-organizativa">
          <h2 className="text-xl font-bold text-gray-900 mb-4">4. Medidas de seguridad organizativas</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-gray-800">Principio de mínimo privilegio:</strong> Cada componente del sistema y cada miembro del equipo accede únicamente a los datos estrictamente necesarios para su función.</li>
            <li><strong className="text-gray-800">Separación de entornos:</strong> Los entornos de desarrollo, pruebas y producción están aislados. Los datos de producción nunca se utilizan en desarrollo.</li>
            <li><strong className="text-gray-800">Revisión de código:</strong> Todo el código que accede a datos personales se revisa antes de su despliegue en producción.</li>
            <li><strong className="text-gray-800">Gestión de vulnerabilidades:</strong> Monitorización continua de dependencias y actualizaciones de seguridad.</li>
            <li><strong className="text-gray-800">Control de acceso a infraestructura:</strong> Acceso a bases de datos y servidores restringido con autenticación multifactor.</li>
          </ul>
        </section>

        <section id="subencargados">
          <h2 className="text-xl font-bold text-gray-900 mb-4">5. Subencargados del tratamiento</h2>
          <p className="mb-4">Conforme al artículo 28.2 del RGPD, informamos de los subencargados del tratamiento autorizados con los que compartimos datos personales:</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Subencargado</th>
                  <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Servicio</th>
                  <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Datos tratados</th>
                  <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Ubicación</th>
                  <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Garantías</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-gray-200 font-medium text-gray-800">Supabase, Inc.<br /><span className="text-xs text-gray-500">(sobre AWS)</span></td>
                  <td className="p-3 border border-gray-200">Base de datos PostgreSQL</td>
                  <td className="p-3 border border-gray-200">Todos los datos de la aplicación</td>
                  <td className="p-3 border border-gray-200">UE (Irlanda, eu-west-1)</td>
                  <td className="p-3 border border-gray-200">Datos en UE, cifrado AES-256 en reposo, DPA firmado</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-3 border border-gray-200 font-medium text-gray-800">Vercel, Inc.</td>
                  <td className="p-3 border border-gray-200">Alojamiento web y ejecución serverless</td>
                  <td className="p-3 border border-gray-200">Peticiones HTTP, logs de acceso</td>
                  <td className="p-3 border border-gray-200">EE.UU. y UE (Edge)</td>
                  <td className="p-3 border border-gray-200">EU-US DPF, SCCs (Decisión 2021/914), DPA</td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 font-medium text-gray-800">Stripe, Inc.</td>
                  <td className="p-3 border border-gray-200">Procesamiento de pagos</td>
                  <td className="p-3 border border-gray-200">Email, nombre, datos de tarjeta (gestionados por Stripe)</td>
                  <td className="p-3 border border-gray-200">EE.UU. y UE</td>
                  <td className="p-3 border border-gray-200">PCI DSS Nivel 1, EU-US DPF, SCCs, DPA</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-3 border border-gray-200 font-medium text-gray-800">Anthropic, PBC</td>
                  <td className="p-3 border border-gray-200">Modelo de IA para asistente Forge</td>
                  <td className="p-3 border border-gray-200">Consultas del usuario en contexto de la página</td>
                  <td className="p-3 border border-gray-200">EE.UU.</td>
                  <td className="p-3 border border-gray-200">SCCs, datos no usados para entrenamiento, zero-retention API</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm">Todos los subencargados han firmado Acuerdos de Encargo del Tratamiento (DPA) conformes al artículo 28 del RGPD. Los usuarios serán notificados con antelación de cualquier cambio en la lista de subencargados.</p>
        </section>

        <section id="derechos">
          <h2 className="text-xl font-bold text-gray-900 mb-4">6. Derechos del interesado</h2>
          <p className="mb-4">De conformidad con los artículos 15 a 22 del RGPD y los artículos 13 a 18 de la LOPD-GDD, los interesados pueden ejercer los siguientes derechos:</p>

          <div className="space-y-3 mb-6">
            {[
              { derecho: "Derecho de acceso (Art. 15)", desc: "Obtener confirmación de si se tratan datos personales y, en su caso, acceder a una copia de los mismos junto con la información del artículo 15.1." },
              { derecho: "Derecho de rectificación (Art. 16)", desc: "Solicitar la corrección de datos personales inexactos o completar los que sean incompletos." },
              { derecho: "Derecho de supresión — «derecho al olvido» (Art. 17)", desc: "Solicitar la eliminación de los datos personales cuando ya no sean necesarios, se retire el consentimiento, se oponga al tratamiento, se hayan tratado ilícitamente, o deba cumplirse una obligación legal." },
              { derecho: "Derecho a la limitación del tratamiento (Art. 18)", desc: "Solicitar la limitación del tratamiento cuando se impugne la exactitud de los datos, el tratamiento sea ilícito, los datos ya no sean necesarios pero el interesado los necesite para reclamaciones, o se haya ejercido el derecho de oposición." },
              { derecho: "Derecho a la portabilidad (Art. 20)", desc: "Recibir los datos personales en un formato estructurado, de uso común y lectura mecánica (JSON o CSV), y transmitirlos a otro responsable." },
              { derecho: "Derecho de oposición (Art. 21)", desc: "Oponerse al tratamiento de datos basado en interés legítimo o destinado a marketing directo." },
              { derecho: "Derecho a no ser objeto de decisiones automatizadas (Art. 22)", desc: "No ser sometido a decisiones basadas únicamente en el tratamiento automatizado que produzcan efectos jurídicos o le afecten significativamente. Las sugerencias del asistente IA son meramente orientativas y no constituyen decisiones automatizadas." },
            ].map((d) => (
              <div key={d.derecho} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <p className="font-semibold text-gray-800 text-sm mb-1">{d.derecho}</p>
                <p className="text-sm">{d.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#3a9bb5]/5 border border-[#3a9bb5]/20 rounded-xl p-5">
            <p className="text-sm font-semibold text-gray-900 mb-2">Cómo ejercer tus derechos</p>
            <p className="text-sm mb-2">Envía un correo electrónico a <a href="mailto:info@dealforge.es" className="text-[#3a9bb5] hover:underline font-medium">info@dealforge.es</a> indicando:</p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Tu nombre completo y dirección de correo asociada a la cuenta.</li>
              <li>El derecho que deseas ejercer.</li>
              <li>Copia del documento de identidad (DNI/NIE/Pasaporte) para verificar tu identidad.</li>
            </ul>
            <p className="text-sm mt-2"><strong>Plazo de respuesta:</strong> Máximo 30 días desde la recepción de la solicitud. Prorrogable 2 meses en caso de solicitudes complejas o numerosas, informando al interesado en el plazo del primer mes.</p>
            <p className="text-sm mt-1"><strong>Coste:</strong> Gratuito, salvo solicitudes manifiestamente infundadas o excesivas (Art. 12.5 RGPD).</p>
          </div>
        </section>

        <section id="rat">
          <h2 className="text-xl font-bold text-gray-900 mb-4">7. Registro de actividades de tratamiento (RAT)</h2>
          <p className="mb-4">Conforme al artículo 30 del RGPD, DealForge mantiene un Registro de Actividades de Tratamiento actualizado. A continuación se presenta un resumen:</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Actividad</th>
                  <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Categorías de interesados</th>
                  <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Categorías de datos</th>
                  <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Plazo supresión</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="p-3 border border-gray-200">Gestión de usuarios</td><td className="p-3 border border-gray-200">Usuarios registrados</td><td className="p-3 border border-gray-200">Identificativos, contacto</td><td className="p-3 border border-gray-200">Baja + plazos legales</td></tr>
                <tr className="bg-gray-50"><td className="p-3 border border-gray-200">Gestión comercial (CPQ)</td><td className="p-3 border border-gray-200">Clientes del usuario</td><td className="p-3 border border-gray-200">Identificativos, comerciales</td><td className="p-3 border border-gray-200">Baja + 6 años (C. Comercio)</td></tr>
                <tr><td className="p-3 border border-gray-200">Facturación</td><td className="p-3 border border-gray-200">Usuarios con plan de pago</td><td className="p-3 border border-gray-200">Identificativos, económicos</td><td className="p-3 border border-gray-200">5 años (L. Tributaria)</td></tr>
                <tr className="bg-gray-50"><td className="p-3 border border-gray-200">Asistente IA</td><td className="p-3 border border-gray-200">Usuarios activos</td><td className="p-3 border border-gray-200">Consultas (no almacenadas)</td><td className="p-3 border border-gray-200">No se conservan</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="brechas">
          <h2 className="text-xl font-bold text-gray-900 mb-4">8. Notificación de brechas de seguridad</h2>
          <p className="mb-3">DealForge dispone de un protocolo de gestión de brechas de seguridad conforme a los artículos 33 y 34 del RGPD:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-gray-800">Detección:</strong> Monitorización continua de la infraestructura para la detección temprana de incidentes de seguridad.</li>
            <li><strong className="text-gray-800">Notificación a la AEPD:</strong> En caso de brecha que pueda suponer un riesgo para los derechos y libertades de los interesados, se notificará a la Agencia Española de Protección de Datos en un plazo máximo de <strong>72 horas</strong> desde su detección (Art. 33 RGPD).</li>
            <li><strong className="text-gray-800">Notificación a los afectados:</strong> Si la brecha puede entrañar un alto riesgo para los derechos y libertades, se comunicará a los interesados afectados sin dilación indebida (Art. 34 RGPD).</li>
            <li><strong className="text-gray-800">Documentación:</strong> Toda brecha de seguridad se documenta con detalle incluyendo: naturaleza de la violación, categorías y número de interesados afectados, consecuencias probables y medidas adoptadas.</li>
            <li><strong className="text-gray-800">Remediación:</strong> Implementación inmediata de medidas correctivas para contener la brecha y prevenir su recurrencia.</li>
          </ul>
        </section>

        <section id="eipd">
          <h2 className="text-xl font-bold text-gray-900 mb-4">9. Evaluación de Impacto en la Protección de Datos (EIPD)</h2>
          <p className="mb-3">Conforme al artículo 35 del RGPD, DealForge ha realizado una Evaluación de Impacto en relación con:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-gray-800">Uso de Inteligencia Artificial (Forge):</strong> El asistente IA procesa consultas del usuario en el contexto de la plataforma. Se ha evaluado el impacto y se han implementado las siguientes mitigaciones:
              <ul className="list-disc pl-6 mt-1 space-y-1">
                <li>Las consultas no se almacenan ni se utilizan para entrenar modelos de IA.</li>
                <li>No se envían datos personales de clientes del usuario al modelo de IA — solo el contexto de la página actual.</li>
                <li>Las respuestas son meramente orientativas y no generan decisiones automatizadas con efectos jurídicos.</li>
              </ul>
            </li>
            <li><strong className="text-gray-800">Tratamiento de datos comerciales:</strong> El procesamiento de datos de clientes y cotizaciones se realiza en la UE con las medidas de seguridad descritas en las secciones 3 y 4.</li>
          </ul>
        </section>

        <section id="transferencias">
          <h2 className="text-xl font-bold text-gray-900 mb-4">10. Transferencias internacionales de datos</h2>
          <p className="mb-3">Cuando los datos personales se transfieren fuera del Espacio Económico Europeo (EEE), se aplican las siguientes garantías conforme al Capítulo V del RGPD:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-gray-800">Decisión de adecuación:</strong> Las transferencias a EE.UU. se amparan en el EU-US Data Privacy Framework (Decisión de Adecuación de la Comisión Europea de 10 de julio de 2023) para los proveedores certificados (Stripe, Vercel).</li>
            <li><strong className="text-gray-800">Cláusulas Contractuales Tipo (SCCs):</strong> Como garantía adicional, todos los proveedores estadounidenses han suscrito las SCCs aprobadas por la Comisión Europea (Decisión de Ejecución 2021/914).</li>
            <li><strong className="text-gray-800">Medidas suplementarias:</strong> Cifrado de datos en tránsito y en reposo, pseudonimización cuando es posible, y análisis caso por caso del marco legal del país de destino.</li>
          </ul>
          <p className="mt-3 text-sm">La base de datos principal se aloja en la UE (Irlanda). Solo los servicios de hosting (Vercel), pagos (Stripe) e IA (Anthropic) pueden implicar transferencias a EE.UU., siempre con las garantías descritas.</p>
        </section>

        <section id="cookies">
          <h2 className="text-xl font-bold text-gray-900 mb-4">11. Política de cookies</h2>
          <p className="mb-3">DealForge utiliza exclusivamente cookies técnicas y estrictamente necesarias:</p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Cookie</th>
                  <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Tipo</th>
                  <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Finalidad</th>
                  <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Duración</th>
                  <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Titularidad</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="p-3 border border-gray-200 font-mono text-xs">session</td><td className="p-3 border border-gray-200">Técnica esencial</td><td className="p-3 border border-gray-200">Autenticación del usuario (JWT)</td><td className="p-3 border border-gray-200">7 días o cierre de sesión</td><td className="p-3 border border-gray-200">Propia</td></tr>
              </tbody>
            </table>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="text-sm text-green-900"><strong>No utilizamos cookies de terceros, cookies analíticas, cookies publicitarias ni cookies de seguimiento.</strong> Al utilizar únicamente cookies técnicas esenciales exentas conforme al artículo 22.2 de la LSSI-CE y la guía de la AEPD sobre el uso de cookies, no es necesario solicitar el consentimiento del usuario ni mostrar un banner de cookies.</p>
          </div>
        </section>

        <section id="encargado">
          <h2 className="text-xl font-bold text-gray-900 mb-4">12. DealForge como encargado del tratamiento</h2>
          <p className="mb-3">Cuando nuestros usuarios introducen datos de sus propios clientes en la plataforma, DealForge actúa como <strong>encargado del tratamiento</strong> (Art. 28 RGPD) y el usuario como responsable del tratamiento. En este caso:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>DealForge trata los datos únicamente para prestar el servicio contratado, conforme a las instrucciones del usuario.</li>
            <li>No utilizamos los datos de los clientes del usuario para fines propios ni los compartimos con terceros no autorizados.</li>
            <li>Garantizamos las mismas medidas de seguridad técnicas y organizativas descritas en este documento.</li>
            <li>Asistimos al usuario en el cumplimiento de sus obligaciones como responsable del tratamiento, incluyendo la atención a solicitudes de derechos de sus interesados.</li>
            <li>A la finalización del servicio, suprimimos o devolvemos los datos según la elección del usuario.</li>
          </ul>
          <p className="mt-3 text-sm">Los usuarios que traten datos personales de sus clientes a través de DealForge deben asegurarse de contar con la base jurídica adecuada y de informar a sus interesados conforme al RGPD.</p>
        </section>

        <section id="dpd">
          <h2 className="text-xl font-bold text-gray-900 mb-4">13. Delegado de Protección de Datos (DPD)</h2>
          <p>Para cualquier cuestión relacionada con el tratamiento de datos personales o el ejercicio de tus derechos, puedes contactar con nuestro Delegado de Protección de Datos:</p>
          <div className="bg-gray-50 rounded-xl p-5 text-sm space-y-1 border border-gray-100 mt-3">
            <p><strong className="text-gray-900">Delegado de Protección de Datos — DealForge</strong></p>
            <p><strong className="text-gray-900">Email:</strong> <a href="mailto:info@dealforge.es" className="text-[#3a9bb5] hover:underline">info@dealforge.es</a></p>
          </div>
          <p className="mt-4 text-sm">Si consideras que no hemos atendido adecuadamente tu solicitud, puedes presentar una reclamación ante la <strong>Agencia Española de Protección de Datos (AEPD)</strong> — <span className="text-[#3a9bb5]">www.aepd.es</span> — C/ Jorge Juan, 6 — 28001 Madrid.</p>
        </section>

        {/* CTA final */}
        <div className="mt-16 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-sm mb-2">¿Tienes dudas sobre nuestro cumplimiento del RGPD?</p>
          <a href="mailto:info@dealforge.es" className="text-[#3a9bb5] font-semibold hover:underline">info@dealforge.es</a>
          <div className="mt-6 flex justify-center gap-4 text-sm text-gray-400">
            <Link href="/privacidad" className="hover:text-gray-600 transition-colors">Política de privacidad</Link>
            <span>|</span>
            <Link href="/terminos" className="hover:text-gray-600 transition-colors">Términos de servicio</Link>
          </div>
        </div>
      </div>
    </article>
  );
}
