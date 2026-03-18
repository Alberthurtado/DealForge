"use client";

import { useState } from "react";
import { Loader2, CheckCircle, Send } from "lucide-react";

export function ContactForm() {
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
        throw new Error(data.error || "Error al enviar el mensaje");
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error de conexión");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">¡Mensaje enviado!</h3>
        <p className="text-gray-500">
          Gracias por contactarnos. Te responderemos lo antes posible.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1.5">
            Nombre *
          </label>
          <input
            id="nombre"
            type="text"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#3a9bb5] focus:border-transparent outline-none transition-all"
            placeholder="Tu nombre"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
            Email *
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#3a9bb5] focus:border-transparent outline-none transition-all"
            placeholder="tu@email.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="asunto" className="block text-sm font-medium text-gray-700 mb-1.5">
          Asunto *
        </label>
        <select
          id="asunto"
          required
          value={asunto}
          onChange={(e) => setAsunto(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#3a9bb5] focus:border-transparent outline-none transition-all"
        >
          <option value="">Selecciona un asunto</option>
          <option value="demo">Solicitar una demo</option>
          <option value="consulta">Consulta general</option>
          <option value="soporte">Soporte técnico</option>
          <option value="enterprise">Plan Enterprise</option>
          <option value="otro">Otro</option>
        </select>
      </div>

      <div>
        <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1.5">
          Mensaje *
        </label>
        <textarea
          id="mensaje"
          required
          rows={5}
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#3a9bb5] focus:border-transparent outline-none transition-all resize-none"
          placeholder="¿En qué podemos ayudarte?"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2">{error}</p>
      )}

      <p className="text-xs text-gray-400">
        Al enviar este formulario, aceptas nuestra{" "}
        <a href="/privacidad" className="underline hover:text-gray-600">Política de privacidad</a>.
        Tus datos se usarán exclusivamente para responder a tu consulta.
      </p>

      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#3a9bb5] text-white rounded-lg font-semibold text-sm hover:bg-[#2d7d94] transition-colors disabled:opacity-50"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        {loading ? "Enviando..." : "Enviar mensaje"}
      </button>
    </form>
  );
}
