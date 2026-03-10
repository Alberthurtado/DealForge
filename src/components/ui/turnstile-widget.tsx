"use client";

import { useEffect, useRef } from "react";
import { useTurnstile } from "@/hooks/useTurnstile";

interface Props {
  action?: string;
  onToken: (token: string | null) => void;
}

/**
 * Cloudflare Turnstile widget component.
 * Renders the challenge inline and calls onToken when verified.
 * If Turnstile is not configured, renders nothing (graceful).
 */
export function TurnstileWidget({ action, onToken }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { renderWidget, getToken, enabled } = useTurnstile();
  const renderedRef = useRef(false);

  useEffect(() => {
    if (!enabled || !containerRef.current || renderedRef.current) return;

    // Wait for Turnstile script to load
    const interval = setInterval(() => {
      if (window.turnstile && containerRef.current) {
        clearInterval(interval);
        renderedRef.current = true;
        renderWidget(containerRef.current, action);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [enabled, renderWidget, action]);

  // Poll for token changes
  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(() => {
      const token = getToken();
      if (token) {
        onToken(token);
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [enabled, getToken, onToken]);

  if (!enabled) return null;

  return (
    <div
      ref={containerRef}
      className="flex justify-center"
    />
  );
}
