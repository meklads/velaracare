import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getEdgeSession } from "@/lib/edge-auth";
import { getDashboardPath, isAuthorizedForRoute } from "@/lib/auth-utils";

/**
 * Proxy (formerly Middleware) — Next.js 16
 * Runs before each matching request to protect dashboard routes.
 * Uses JWT-only auth to avoid Prisma Edge Runtime errors.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public paths — always allow
  const publicPaths = ["/", "/login", "/register", "/features", "/pricing", "/about", "/demo"];
  const isPublic = publicPaths.some((p) => pathname === p || pathname.startsWith("/api"));
  if (isPublic) return NextResponse.next();

  // Protected dashboard routes
  if (pathname.startsWith("/dashboard")) {
    const session = await getEdgeSession(request);
    const role = (session?.user as any)?.role;

    // Not logged in → redirect to login
    if (!session?.user) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Logged in but wrong role → redirect to their dashboard
    if (!isAuthorizedForRoute(role, pathname)) {
      const correctPath = getDashboardPath(role);
      return NextResponse.redirect(new URL(correctPath, request.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
