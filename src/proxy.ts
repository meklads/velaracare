import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getEdgeSession } from "@/lib/edge-auth";
import { getDashboardPath, isAuthorizedForRoute } from "@/lib/auth-utils";
import { SITE_GATE_COOKIE, safeEqual, safeNextPath, siteAccessToken } from "@/lib/site-gate";

function isSiteGateExempt(pathname: string): boolean {
  return (
    pathname === "/access" ||
    pathname.startsWith("/access/") ||
    pathname === "/api/site-gate" ||
    // SessionProvider on the gate page reads this before the cookie exists.
    pathname === "/api/auth/session"
  );
}

/**
 * Proxy (formerly Middleware) — Next.js 16
 * Requires the site password before any page, then protects dashboard routes.
 * Wrapped in try/catch so that any auth failure returns redirect→login
 * instead of a 500 error page.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  try {
    const token = await siteAccessToken();
    const unlocked = safeEqual(request.cookies.get(SITE_GATE_COOKIE)?.value ?? "", token);

    if (isSiteGateExempt(pathname)) {
      if (unlocked && (pathname === "/access" || pathname.startsWith("/access/"))) {
        const next = safeNextPath(request.nextUrl.searchParams.get("next"));
        return NextResponse.redirect(new URL(next, request.url));
      }
      return NextResponse.next();
    }

    if (!unlocked) {
      const accessUrl = new URL("/access", request.url);
      const dest = pathname + request.nextUrl.search;
      if (dest !== "/") accessUrl.searchParams.set("next", dest);
      return NextResponse.redirect(accessUrl);
    }
  } catch (error) {
    console.error("[Site gate]", error);
    if (!isSiteGateExempt(pathname)) {
      return NextResponse.redirect(new URL("/access", request.url));
    }
    return NextResponse.next();
  }

  try {

    // Public paths — no dashboard session required. The site password still applies.
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
        const redirect = NextResponse.redirect(new URL(correctPath, request.url));
        return redirect;
      }

      // Auth passed — add debugging header
      const response = NextResponse.next();
      response.headers.set("x-velara-role", role || "none");
      return response;
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
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icons/|manifest.json|sw.js|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2)$).*)",
  ],
};
