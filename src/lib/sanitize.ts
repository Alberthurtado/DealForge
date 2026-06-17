/**
 * Strip ALL HTML tags from a string. Use for text-only fields
 * like notas, descripciones, comentarios.
 */
export function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, "").trim();
}

/**
 * HTML-escape a scalar value before interpolating it into a server-built
 * HTML string (PDF templates, emails). Use for any DB/user field that is
 * plain text and must NOT be interpreted as markup (names, addresses,
 * descriptions, conditions, etc.). Safe in both text and attribute contexts.
 */
export function escapeHtml(value: unknown): string {
  if (value === null || value === undefined) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Sanitize HTML for email bodies. Allows basic formatting tags
 * but removes dangerous elements (script, iframe, event handlers).
 */
export function sanitizeHtml(input: string): string {
  // Remove script tags and their content
  let clean = input.replace(
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    ""
  );
  // Remove iframe, object, embed, form, input, button tags
  clean = clean.replace(
    /<(iframe|object|embed|form|input|button)\b[^>]*>.*?<\/\1>/gi,
    ""
  );
  clean = clean.replace(
    /<(iframe|object|embed|form|input|button)\b[^>]*\/?>/gi,
    ""
  );
  // Remove event handler attributes (on*)
  clean = clean.replace(
    /\s+on\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]*)/gi,
    ""
  );
  // Remove javascript: in href/src
  clean = clean.replace(
    /(href|src)\s*=\s*["']?\s*javascript:/gi,
    "$1=removed:"
  );
  return clean.trim();
}
