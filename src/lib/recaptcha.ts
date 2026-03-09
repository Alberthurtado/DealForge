const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY;
const SCORE_THRESHOLD = 0.5;

export interface RecaptchaResult {
  success: boolean;
  score: number;
  action: string;
}

/**
 * Verify a reCAPTCHA v3 token against Google's API.
 * Gracefully degrades: if RECAPTCHA_SECRET_KEY is not configured,
 * verification is skipped (allows dev environments without reCAPTCHA).
 */
export async function verifyRecaptcha(
  token: string | null | undefined,
  expectedAction: string
): Promise<RecaptchaResult> {
  // If not configured, allow through (graceful degradation for dev)
  if (!RECAPTCHA_SECRET || !token) {
    return { success: true, score: 1.0, action: expectedAction };
  }

  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: RECAPTCHA_SECRET,
          response: token,
        }),
      }
    );

    const result = await response.json();

    if (
      !result.success ||
      result.score < SCORE_THRESHOLD ||
      result.action !== expectedAction
    ) {
      return {
        success: false,
        score: result.score || 0,
        action: result.action || "",
      };
    }

    return { success: true, score: result.score, action: result.action };
  } catch (err) {
    console.error("reCAPTCHA verification error:", err);
    // Fail open on network errors to not block legitimate users
    return { success: true, score: 0.5, action: expectedAction };
  }
}
