const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET_KEY;

export interface TurnstileResult {
  success: boolean;
}

/**
 * Verify a Cloudflare Turnstile token against the API.
 * Gracefully degrades: if TURNSTILE_SECRET_KEY is not configured,
 * verification is skipped (allows dev environments without Turnstile).
 */
export async function verifyTurnstile(
  token: string | null | undefined
): Promise<TurnstileResult> {
  // If not configured, allow through (graceful degradation for dev)
  if (!TURNSTILE_SECRET || !token) {
    return { success: true };
  }

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: TURNSTILE_SECRET,
          response: token,
        }),
      }
    );

    const result = await response.json();

    return { success: !!result.success };
  } catch (err) {
    console.error("Turnstile verification error:", err);
    // Fail open on network errors to not block legitimate users
    return { success: true };
  }
}
