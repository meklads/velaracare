"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, LogOut, LayoutDashboard, ChevronDown, User } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import NotificationBell from "@/components/notifications/NotificationBell";
import { getDashboardPath } from "@/lib/auth-utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const features = [
  { title: "تقييم المخاطر الصحية (HRA)", href: "/features#hra" },
  { title: "المحرك التنبؤي AI", href: "/features#ai" },
  { title: "نظام الوجبات الذكي", href: "/features#meals" },
  { title: "لوحة التحكم التنفيذية", href: "/features#dashboard" },
  { title: "الاستشارات", href: "/features#consultations" },
  { title: "التقارير والتكاليف", href: "/features#reports" },
];

export default function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const isLoggedIn = status === "authenticated";
  const userRole = (session?.user as any)?.role;
  const userName = session?.user?.name || "مستخدم";
  const dashboardPath = getDashboardPath(userRole);

  async function handleLogout() {
    setUserMenuOpen(false);
    await signOut({ redirect: false });
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--glass-border)] bg-[var(--bg-primary)]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-gradient">
            <span className="text-lg font-bold text-white">V</span>
          </div>
          <span className="text-xl font-bold text-primary" style={{ fontFamily: "'Cairo', sans-serif" }}>
            Velara
          </span>
          <span className="hidden text-sm font-medium text-secondary sm:inline-block">
            Care
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-10 px-4 text-sm font-medium text-primary">
                  المنصة
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2 bg-surface-card border border-surface-border rounded-xl">
                    {features.map((f) => (
                      <li key={f.title}>
                        <Link
                          href={f.href}
                          className="block select-none rounded-lg p-3 text-sm leading-none no-underline outline-none transition-colors hover:bg-white/[0.05]"
                        >
                          {f.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Link
            href="/pricing"
            className="h-10 px-4 text-sm font-medium inline-flex items-center text-primary hover:text-emerald transition-colors"
          >
            الأسعار
          </Link>
          <Link
            href="/about"
            className="h-10 px-4 text-sm font-medium inline-flex items-center text-primary hover:text-emerald transition-colors"
          >
            عن Velara Care
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn && <NotificationBell />}
          <ThemeToggle />
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] px-3 py-2 text-sm text-primary hover:border-[var(--accent)] transition-all"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-soft text-[10px] font-bold text-accent">
                  {userName.charAt(0)}
                </div>
                <span className="max-w-[100px] truncate">{userName}</span>
                <ChevronDown size={14} className={`transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
              </button>
              {userMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                  <div className="absolute left-0 top-full mt-2 z-50 w-56 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-2 shadow-xl">
                    <div className="px-3 py-2 border-b border-[var(--border-primary)] mb-1">
                      <p className="text-sm font-medium text-primary">{userName}</p>
                      <p className="text-xs text-secondary">{userRole}</p>
                    </div>
                    <Link
                      href={dashboardPath}
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-secondary hover:bg-accent-soft hover:text-accent transition-colors"
                    >
                      <LayoutDashboard size={16} />
                      لوحة التحكم
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-secondary hover:bg-red-500/10 hover:text-red-400 transition-colors"
                    >
                      <LogOut size={16} />
                      تسجيل الخروج
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-primary hover:text-emerald transition-colors"
              >
                تسجيل دخول
              </Link>
              <Link
                href="/demo"
                className="btn-primary h-9 px-5 text-sm"
              >
                احجز عرضاً
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-primary hover:text-emerald"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--glass-border)] bg-surface-card px-4 py-6 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-primary">القائمة</p>
            <ThemeToggle />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-primary mb-2">
              المنصة
            </p>
            {features.map((f) => (
              <Link
                key={f.title}
                href={f.href}
                className="block py-2 text-sm text-secondary"
                onClick={() => setMobileOpen(false)}
              >
                {f.title}
              </Link>
            ))}
          </div>
          <Link
            href="/pricing"
            className="block py-2 text-sm text-secondary"
            onClick={() => setMobileOpen(false)}
          >
            الأسعار
          </Link>
          <Link
            href="/about"
            className="block py-2 text-sm text-secondary"
            onClick={() => setMobileOpen(false)}
          >
            عن Velara Care
          </Link>
          <hr className="border-[var(--surface-border)]" />
          {isLoggedIn ? (
            <>
              <div className="px-2 py-2 border-b border-[var(--surface-border)]">
                <p className="text-sm font-medium text-primary">{userName}</p>
                <p className="text-xs text-secondary">{userRole}</p>
              </div>
              <Link
                href={dashboardPath}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 py-2 text-sm text-secondary"
              >
                <LayoutDashboard size={16} />
                لوحة التحكم
              </Link>
              <button
                onClick={() => { setMobileOpen(false); handleLogout(); }}
                className="flex items-center gap-2 py-2 text-sm text-red-400"
              >
                <LogOut size={16} />
                تسجيل الخروج
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="block py-2 text-sm text-secondary"
                onClick={() => setMobileOpen(false)}
              >
                تسجيل دخول
              </Link>
              <Link
                href="/demo"
                onClick={() => setMobileOpen(false)}
                className="btn-primary w-full justify-center text-sm"
              >
                احجز عرضاً
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
