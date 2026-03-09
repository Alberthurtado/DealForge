/**
 * Strip ALL HTML tags from a string. Use for text-only fields
 * like notas, descripciones, comentarios.
 */
export function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, "").trim();
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
