"use client";

import { useCallback, useEffect, useRef } from "react";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

declare global {
  interface Window {
    turnstile: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
          size?: "normal" | "compact" | "invisible";
          action?: string;
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

/**
 * Hook for Cloudflare Turnstile integration.
 * Loads the Turnstile script and provides a function to get tokens.
 * If NEXT_PUBLIC_TURNSTILE_SITE_KEY is not set, returns null tokens (graceful).
 */
export function useTurnstile() {
  const tokenRef = useRef<string | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!SITE_KEY) return;

    // Don't load if already present
    if (document.querySelector(`script[src*="turnstile"]`)) return;

    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    document.head.appendChild(script);
  }, []);

  const renderWidget = useCallback(
    (container: HTMLDivElement, action?: string) => {
      if (!SITE_KEY || !window.turnstile) return;

      containerRef.current = container;

      // Remove existing widget if any
      if (widgetIdRef.current) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // ignore
        }
      }

      widgetIdRef.current = window.turnstile.render(container, {
        sitekey: SITE_KEY,
        callback: (token: string) => {
          tokenRef.current = token;
        },
        "error-callback": () => {
          tokenRef.current = null;
        },
        "expired-callback": () => {
          tokenRef.current = null;
        },
        theme: "light",
        size: "normal",
        action,
      });
    },
    []
  );

  const getToken = useCallback((): string | null => {
    return tokenRef.current;
  }, []);

  const reset = useCallback(() => {
    tokenRef.current = null;
    if (widgetIdRef.current && window.turnstile) {
      try {
        window.turnstile.reset(widgetIdRef.current);
      } catch {
        // ignore
      }
    }
  }, []);

  return { renderWidget, getToken, reset, enabled: !!SITE_KEY };
}
