"use client";

import { useCallback, useEffect } from "react";

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string }
      ) => Promise<string>;
    };
  }
}

/**
 * Hook for reCAPTCHA v3 integration.
 * Loads the Google reCAPTCHA script and provides a function to get tokens.
 * If NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not set, returns null tokens (graceful).
 */
export function useRecaptcha() {
  useEffect(() => {
    if (!SITE_KEY) return;

    // Don't load if already present
    if (document.querySelector(`script[src*="recaptcha"]`)) return;

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
    script.async = true;
    document.head.appendChild(script);
  }, []);

  const getToken = useCallback(
    async (action: string): Promise<string | null> => {
      if (!SITE_KEY || !window.grecaptcha) return null;

      return new Promise((resolve) => {
        window.grecaptcha.ready(async () => {
          try {
            const token = await window.grecaptcha.execute(SITE_KEY, {
              action,
            });
            resolve(token);
          } catch {
            resolve(null);
          }
        });
      });
    },
    []
  );

  return { getToken, enabled: !!SITE_KEY };
}
