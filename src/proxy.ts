import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getEdgeSession } from "@/lib/edge-auth";
import { getDashboardPath, isAuthorizedForRoute } from "@/lib/auth-utils";

/**
 * Proxy (formerly Middleware) — Next.js 16
 * Runs before each matching request to protect dashboard routes.
 * Wrapped in try/catch so that any auth failure returns redirect→login
 * instead of a 500 error page.
 */
export async function proxy(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;

    // Public paths — always allow (proxy matcher already limits to /dashboard,
    // but keep this as a safety net for future route expansion)
    const publicPaths = ["/login", "/register", "/features", "/pricing", "/about", "/demo"];
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
  } catch (error) {
    // Log the error via header for debugging, then redirect to login
    console.error("[Proxy Error]", error);
    // On any proxy error, redirect to login instead of showing 500
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
