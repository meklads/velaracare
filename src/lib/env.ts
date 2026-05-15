/**
 * Read environment variables at RUNTIME (not build-time).
 *
 * Next.js inlines `process.env.X` during the build step, meaning the
 * compiled code has the value baked in.  If the env var isn't available
 * during build (e.g. it's set later by Coolify at runtime), the inlined
 * value will be `undefined`.
 *
 * This helper accesses `process.env` via a dynamic key, which prevents
 * bundlers (webpack / Turbopack) from inlining the value.
 *
 * @param name     - Env var name, e.g. "DATABASE_URL"
 * @param fallback - Optional default returned when the var isn't set
 */
export function env(name: string, fallback?: string): string {
  // Store a reference to process.env so the bundler can't trace the access
  const procEnv =
    typeof globalThis !== "undefined"
      ? (globalThis as any)["process"]?.["env"]
      : (typeof process !== "undefined" ? process["env"] : undefined);

  const value = procEnv?.[name];
  return value ?? fallback ?? "";
}
