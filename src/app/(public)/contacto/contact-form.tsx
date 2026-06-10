"use client";

import { useState } from "react";
import { Loader2, CheckCircle, Send } from "lucide-react";

type Lang = "es" | "en";

const DICT = {
  es: {
    successTitle: "¡Mensaje enviado!",
    successBody: "Gracias por contactarnos. Te responderemos lo antes posible.",
    name: "Nombre *",
    namePlaceholder: "Tu nombre",
    email: "Email *",
    subject: "Asunto *",
    selectSubject: "Selecciona un asunto",
    optDemo: "Solicitar una demo",
    optGeneral: "Consulta general",
    optSupport: "Soporte técnico",
    optEnterprise: "Plan Enterprise",
    optOther: "Otro",
    message: "Mensaje *",
    messagePlaceholder: "¿En qué podemos ayudarte?",
    privacyPrefix: "Al enviar este formulario, aceptas nuestra",
    privacy: "Política de privacidad",
    privacySuffix: "Tus datos se usarán exclusivamente para responder a tu consulta.",
    sending: "Enviando...",
    send: "Enviar mensaje",
    genericError: "Error al enviar el mensaje",
    connError: "Error de conexión",
  },
  en: {
    successTitle: "Message sent!",
    successBody: "Thanks for reaching out. We'll get back to you as soon as possible.",
    name: "Name *",
    namePlaceholder: "Your name",
    email: "Email *",
    subject: "Subject *",
    selectSubject: "Select a subject",
    optDemo: "Request a demo",
    optGeneral: "General enquiry",
    optSupport: "Technical support",
    optEnterprise: "Enterprise plan",
    optOther: "Other",
    message: "Message *",
    messagePlaceholder: "How can we help?",
    privacyPrefix: "By submitting this form, you agree to our",
    privacy: "Privacy Policy",
    privacySuffix: "Your data will only be used to respond to your enquiry.",
    sending: "Sending...",
    send: "Send message",
    genericError: "Couldn't send your message",
    connError: "Connection error",
  },
} as const;

export function ContactForm({ lang = "es" }: { lang?: Lang }) {
  const t = DICT[lang];
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [asunto, setAsunto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, asunto, mensaje }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || t.genericError);
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.connError);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">{t.successTitle}</h3>
        <p className="text-gray-500">{t.successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1.5">
            {t.name}
          </label>
          <input
            id="nombre"
            type="text"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#3a9bb5] focus:border-transparent outline-none transition-all"
            placeholder={t.namePlaceholder}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
            {t.email}
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#3a9bb5] focus:border-transparent outline-none transition-all"
            placeholder="you@email.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="asunto" className="block text-sm font-medium text-gray-700 mb-1.5">
          {t.subject}
        </label>
        <select
          id="asunto"
          required
          value={asunto}
          onChange={(e) => setAsunto(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#3a9bb5] focus:border-transparent outline-none transition-all"
        >
          <option value="">{t.selectSubject}</option>
          <option value="demo">{t.optDemo}</option>
          <option value="consulta">{t.optGeneral}</option>
          <option value="soporte">{t.optSupport}</option>
          <option value="enterprise">{t.optEnterprise}</option>
          <option value="otro">{t.optOther}</option>
        </select>
      </div>

      <div>
        <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1.5">
          {t.message}
        </label>
        <textarea
          id="mensaje"
          required
          rows={5}
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#3a9bb5] focus:border-transparent outline-none transition-all resize-none"
          placeholder={t.messagePlaceholder}
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2">{error}</p>
      )}

      <p className="text-xs text-gray-400">
        {t.privacyPrefix}{" "}
        <a href="/privacidad" className="underline hover:text-gray-600">{t.privacy}</a>.{" "}
        {t.privacySuffix}
      </p>

      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#3a9bb5] text-white rounded-lg font-semibold text-sm hover:bg-[#2d7d94] transition-colors disabled:opacity-50"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        {loading ? t.sending : t.send}
      </button>
    </form>
  );
}
