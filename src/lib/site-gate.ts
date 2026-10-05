/** Cookie set after the site password is accepted. */
export const SITE_GATE_COOKIE = "velara_site_access";

const TOKEN_PAYLOAD = "velara-site-access-v1";

/** Password required to view the site. Override with SITE_PASSWORD. */
export function sitePassword(): string {
  return process.env.SITE_PASSWORD || "54321";
}

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

/** HMAC of a fixed payload, keyed by the password. Same length for any input. */
export async function siteAccessToken(password: string = sitePassword()): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(TOKEN_PAYLOAD),
  );
  return toHex(signature);
}

export function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

/** Allow only same-site paths so the return URL cannot leave the app. */
export function safeNextPath(value: string | null): string {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) {
    return "/";
  }
  if (value.startsWith("/access")) return "/";
  return value;
}
