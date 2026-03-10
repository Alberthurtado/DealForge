"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "¿Qué es un CPQ y por qué lo necesito?",
    answer:
      "CPQ significa Configure, Price, Quote (Configurar, Precio, Cotizar). Es un sistema que automatiza la creación de cotizaciones comerciales, asegurando precios correctos, descuentos autorizados y documentos profesionales. Si cotizas con hojas de cálculo, un CPQ te ahorra horas cada semana y elimina errores.",
  },
  {
    question: "¿Qué puede hacer Forge, el asistente IA?",
    answer:
      "Forge puede crear cotizaciones completas desde una instrucción en lenguaje natural, analizar tu pipeline de ventas, recomendar acciones de follow-up, buscar información de clientes y productos, crear reglas comerciales y mucho más. Funciona como un asistente comercial que conoce todos tus datos en tiempo real.",
  },
  {
    question: "¿Mis datos están seguros?",
    answer:
      "Sí. Tus datos se almacenan de forma segura y encriptada. No compartimos datos con terceros. La IA procesa consultas en tiempo real sin almacenar conversaciones. Cumplimos con el RGPD y la normativa europea de protección de datos.",
  },
  {
    question: "¿Puedo importar mis datos existentes?",
    answer:
      "Sí. Puedes importar clientes y productos desde archivos CSV directamente desde la sección de Integraciones. El sistema detecta duplicados y actualiza registros existentes automáticamente. También puedes exportar todos tus datos en cualquier momento.",
  },
  {
    question: "¿Qué pasa si supero el límite de cotizaciones?",
    answer:
      "Te notificaremos cuando estés cerca del límite de tu plan. Puedes actualizar tu plan en cualquier momento desde la configuración sin perder ningún dato. El cambio es inmediato y se prorratea automáticamente.",
  },
  {
    question: "¿Hay compromiso de permanencia?",
    answer:
      "No. Todos los planes son mensuales y puedes cancelar cuando quieras. No hay penalizaciones ni períodos mínimos. Tus datos te pertenecen y puedes exportarlos antes de cancelar.",
  },
  {
    question: "¿Puedo personalizar las cotizaciones con mi marca?",
    answer:
      "Sí. Configura tu logo, colores corporativos y datos de empresa. Las cotizaciones PDF se generan automáticamente con tu identidad visual. En los planes superiores tienes acceso a plantillas adicionales y personalización avanzada.",
  },
];

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-gray-50/50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Preguntas frecuentes
          </h2>
          <p className="text-gray-600">
            Todo lo que necesitas saber sobre DealForge
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-shadow hover:shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className="text-sm font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="px-6 pb-5 text-sm text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* JSON-LD FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </section>
  );
}
