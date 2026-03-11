import { randomBytes, createHash } from "crypto";

export const API_KEY_PREFIX = "dfk_";
/** Total length: "dfk_" (4) + 40 hex chars = 44 */
export const API_KEY_LENGTH = 44;

export function generateApiKey(): { raw: string; hash: string; prefix: string } {
  const hex = randomBytes(20).toString("hex"); // 40 hex chars
  const raw = `${API_KEY_PREFIX}${hex}`;
  const hash = hashApiKey(raw);
  const prefix = hex.slice(-4);
  return { raw, hash, prefix };
}

export function hashApiKey(raw: string): string {
  return createHash("sha256").update(raw).digest("hex");
}

export function isValidApiKeyFormat(key: string): boolean {
  return key.startsWith(API_KEY_PREFIX) && key.length === API_KEY_LENGTH;
}
