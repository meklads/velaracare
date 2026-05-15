const roleDashboard: Record<string, string> = {
  SUPER_ADMIN: "/dashboard/superadmin",
  COMPANY_ADMIN: "/dashboard/admin",
  HR: "/dashboard/hr",
  EMPLOYEE: "/dashboard/employee",
  NUTRITIONIST: "/dashboard/nutritionist",
  RESTAURANT: "/dashboard/restaurant",
};

export function getDashboardPath(role?: string | null): string {
  if (!role) return "/login";
  return roleDashboard[role] || "/login";
}

export function isAuthorizedForRoute(role: string | undefined, pathname: string): boolean {
  if (!role) return false;
  const allowed = roleDashboard[role];
  if (!allowed) return false;
  if (pathname === allowed || pathname.startsWith(allowed + "/")) return true;
  if (role === "HR" &&
      (pathname === "/dashboard/hr" || pathname.startsWith("/dashboard/hr/"))) return true;
  if (role === "COMPANY_ADMIN" &&
      (pathname === "/dashboard/admin" || pathname.startsWith("/dashboard/admin/"))) return true;
  // Allow admins to preview employee meals page
  if (role === "COMPANY_ADMIN" && pathname === "/dashboard/employee/meals") return true;
  return false;
}

export function canAccessRoute(role: string | undefined, pathname: string): boolean {
  if (!role) return false;

  const publicPrefixes = ["/", "/login", "/register", "/features", "/pricing", "/about", "/demo", "/api"];
  for (const prefix of publicPrefixes) {
    if (pathname === prefix || pathname.startsWith(prefix)) return true;
  }

  if (pathname.startsWith("/dashboard")) {
    return isAuthorizedForRoute(role, pathname);
  }

  return true;
}
