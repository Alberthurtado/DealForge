import { z } from "zod";
import { NextResponse } from "next/server";

/**
 * Parse request body with a Zod schema.
 * Returns { data } on success or { error: NextResponse } on failure.
 */
export function validateBody<T extends z.ZodType>(
  schema: T,
  body: unknown
): { data: z.infer<T>; error?: never } | { data?: never; error: NextResponse } {
  const result = schema.safeParse(body);

  if (!result.success) {
    const firstIssue = result.error.issues[0];
    const path = firstIssue?.path?.join(".") || "";
    const message = path
      ? `${path}: ${firstIssue.message}`
      : firstIssue?.message || "Datos inválidos";

    return {
      error: NextResponse.json(
        { error: message, details: result.error.issues },
        { status: 400 }
      ),
    };
  }

  return { data: result.data };
}
