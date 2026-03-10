"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { X, Send, Flame, RotateCcw } from "lucide-react";
import { usePathname } from "next/navigation";
import { ChatMessage, TypingIndicator } from "./chat-message";
import { AssistantButton } from "./assistant-button";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  suggestedActions?: Array<{ label: string; href: string }>;
}

export function AssistantPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  // Extract entityId from URL
  const getEntityId = useCallback(() => {
    const parts = pathname.split("/");
    // /clientes/[id] or /cotizaciones/[id]
    if (parts.length >= 3 && parts[2] && !["nuevo", "nueva"].includes(parts[2])) {
      return parts[2];
    }
    return undefined;
  }, [pathname]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const sendMessage = async (overrideText?: string) => {
    const trimmed = (overrideText || input).trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!overrideText) setInput("");
    setIsLoading(true);

    try {
      const history = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/assistant/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          context: {
            pathname,
            entityId: getEntityId(),
          },
          history,
        }),
      });

      const data = await res.json();

      if (data.error) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            role: "assistant",
            content: `Error: ${data.error}`,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            role: "assistant",
            content: data.response,
            suggestedActions: data.suggestedActions,
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: "Lo siento, hubo un error de conexión. Intenta de nuevo.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <>
      <AssistantButton onClick={() => setIsOpen(true)} isOpen={isOpen} />

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Panel */}
      <div
        data-assistant-panel
        role="complementary"
        aria-label="Asistente IA Forge"
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-gray-50 shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white">
              <Flame className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Forge</h2>
              <p className="text-xs text-gray-500">Asistente IA de DealForge</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={clearChat}
              className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
              title="Limpiar chat"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
              title="Cerrar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                <Flame className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-gray-800 mb-1">
                Hola, soy Forge
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Tu asistente comercial inteligente. Pregúntame sobre clientes,
                cotizaciones, productos o estrategia de ventas.
              </p>
              <div className="grid gap-2 w-full max-w-xs">
                {[
                  "Qué cotizaciones necesitan follow-up?",
                  "Dame un resumen del negocio",
                  "Qué clientes tengo?",
                  "Qué puedes hacer?",
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => sendMessage(suggestion)}
                    disabled={isLoading}
                    className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-left text-sm text-gray-600 hover:border-primary/30 hover:bg-primary/5 transition-colors disabled:opacity-50"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              role={msg.role}
              content={msg.content}
              suggestedActions={msg.suggestedActions}
            />
          ))}

          {isLoading && <TypingIndicator />}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="border-t border-gray-200 bg-white p-3">
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu pregunta..."
              disabled={isLoading}
              className="flex-1 bg-transparent py-1.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none disabled:opacity-50"
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || isLoading}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white transition-all hover:bg-primary/90 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-1.5 text-center text-[10px] text-gray-400">
            Forge usa IA para asistirte. Verifica la información importante.
          </p>
        </div>
      </div>
    </>
  );
}
