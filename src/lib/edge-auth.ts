import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { env } from "./env";

/**
 * Lightweight auth check for Edge Runtime (proxy.ts).
 * Uses JWT-only — no Prisma import, no Edge Runtime errors.
 * Returns the session-like object or null.
 */
export async function getEdgeSession(request: NextRequest) {
  try {
    const secret = env("NEXTAUTH_SECRET");
    if (!secret) return null;
    const token = await getToken({
      req: request,
      secret: secret,
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
