import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

/**
 * Hash a password using scrypt (built-in, no dependencies)
 */
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

/**
 * Verify a password against a stored hash.
 * Supports both scrypt-hashed (salt:hash) and legacy plain text formats
 * for migration compatibility with existing users.
 */
export function verifyPassword(password: string, stored: string): boolean {
  // Check if this is a scrypt hash (contains ":")
  if (stored.includes(":")) {
    const [salt, hash] = stored.split(":");
    if (!salt || !hash) return false;
    const computedHash = scryptSync(password, salt, 64).toString("hex");
    try {
      return timingSafeEqual(Buffer.from(hash), Buffer.from(computedHash));
    } catch {
      return false;
    }
  }

  // Legacy plain text fallback for existing users during migration
  return password === stored;
}
