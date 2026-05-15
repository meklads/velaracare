import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

/**
 * Lightweight auth check for Edge Runtime (proxy.ts).
 * Uses JWT-only — no Prisma import, no Edge Runtime errors.
 * Returns the session-like object or null.
 */
export async function getEdgeSession(request: NextRequest) {
  try {
    const secret = (process.env as any)["NEXTAUTH_SECRET"];
    if (!secret) return null;
    // Determine if we're using secure cookies based on request URL
    const isSecure = request.url.startsWith("https://");
    const token = await getToken({
      req: request,
      secret: secret,
      secureCookie: isSecure,
    });
    if (!token) return null;
    return {
      user: {
        id: token.id as string,
        email: token.email as string,
        name: token.name as string,
        role: token.role as string,
      },
      expires: token.exp ? String(token.exp) : "",
    };
  } catch {
    return null;
  }
}
