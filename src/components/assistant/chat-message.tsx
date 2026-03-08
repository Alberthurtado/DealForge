"use client";

import { Flame, User } from "lucide-react";
import Link from "next/link";

interface SuggestedAction {
  label: string;
  href: string;
}

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  suggestedActions?: SuggestedAction[];
}

export function ChatMessage({ role, content, suggestedActions }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {/* Avatar */}
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
          isUser ? "bg-gray-200 text-gray-600" : "bg-primary text-white"
        }`}
      >
        {isUser ? <User className="h-4 w-4" /> : <Flame className="h-4 w-4" />}
      </div>

      {/* Message bubble */}
      <div className={`max-w-[80%] space-y-2`}>
        <div
          className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
            isUser
              ? "bg-primary text-white rounded-br-md"
              : "bg-white text-gray-800 border border-gray-100 shadow-sm rounded-bl-md"
          }`}
        >
          {content.split("\n").map((line, i) => (
            <p key={i} className={i > 0 ? "mt-1.5" : ""}>
              {line}
            </p>
          ))}
        </div>

        {/* Suggested actions */}
        {suggestedActions && suggestedActions.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {suggestedActions.map((action, i) => (
              <Link
                key={i}
                href={action.href}
                className="inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary hover:bg-primary/10 transition-colors"
              >
                {action.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white">
        <Flame className="h-4 w-4" />
      </div>
      <div className="rounded-2xl rounded-bl-md bg-white border border-gray-100 shadow-sm px-4 py-3">
        <div className="flex gap-1">
          <span className="h-2 w-2 rounded-full bg-gray-300 animate-bounce [animation-delay:0ms]" />
          <span className="h-2 w-2 rounded-full bg-gray-300 animate-bounce [animation-delay:150ms]" />
          <span className="h-2 w-2 rounded-full bg-gray-300 animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}
