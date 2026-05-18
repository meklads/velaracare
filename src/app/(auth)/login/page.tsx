"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LogIn, Loader2, User, Shield, Users, Apple, Utensils } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { getDashboardPath } from "@/lib/auth-utils";

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Auto-redirect if already logged in
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const role = (session.user as any).role;
      router.replace(getDashboardPath(role));
    }
  }, [status, session, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-mid">
        <Loader2 className="h-8 w-8 text-emerald animate-spin" />
      </div>
    );
  }

  if (status === "authenticated") {
    return null; // Will redirect via useEffect
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
        setLoading(false);
        return;
      }

      if (result?.ok) {
        // Fetch session to get role
        const res = await fetch("/api/auth/session");
        const session = await res.json();
        const role = session?.user?.role;
        const path = getDashboardPath(role);
        // Force a full page navigation so the server renders the dashboard
        // directly — avoids RSC streaming issues that cause blank screens.
        window.location.href = path;
      }
    } catch {
      setError("حدث خطأ في الاتصال. حاول مرة أخرى.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-mid p-4">
      <div className="shade-card w-full max-w-md p-8 relative overflow-hidden">
        <div className="shade-circle w-48 h-48 -top-20 -right-20 opacity-20" />

        {/* Logo */}
        <div className="text-center mb-8 relative z-10">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-gradient">
              <span className="text-lg font-bold text-white">V</span>
            </div>
            <span className="text-xl font-bold text-primary">Velara</span>
            <span className="text-sm font-medium text-secondary">Care</span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-primary">مرحباً بعودتك إلى Velara Care</h1>
          <p className="mt-1 text-sm text-secondary">
            سجّل دخولك للوصول إلى لوحة التحكم الصحية الخاصة بك
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          {error && (
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400 text-center">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-primary">
              البريد الإلكتروني
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@velaracare.co"
              dir="ltr"
              required
              className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-3 text-sm text-left text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-[var(--emerald-ai)]/30 focus:border-[var(--emerald-ai)] transition-all"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-primary">
              كلمة المرور
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                dir="ltr"
                required
                className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-3 text-sm text-left text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-[var(--emerald-ai)]/30 focus:border-[var(--emerald-ai)] transition-all pl-10"
              />
              <button
                type="button"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-secondary cursor-pointer">
              <input type="checkbox" className="rounded border-[var(--surface-border)] accent-[var(--emerald-ai)]" />
              تذكرني
            </label>
            <Link
              href="/forgot-password"
              className="text-sm text-[var(--emerald-ai)] hover:text-[var(--accent-light)] font-medium transition-colors"
            >
              نسيت كلمة المرور؟
            </Link>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full justify-center text-sm disabled:opacity-60 disabled:cursor-not-allowed">
            {loading ? (
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            ) : (
              <LogIn className="ml-2 h-4 w-4" />
            )}
            {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-secondary relative z-10 space-y-2">
          <p>
            ليس لديك حساب؟{" "}
            <Link href="/register" className="text-[var(--emerald-ai)] hover:text-[var(--accent-light)] font-medium transition-colors">
              إنشاء حساب جديد
            </Link>
          </p>

          {/* ── Demo Quick Access ── */}
          <div className="pt-4 border-t border-[var(--surface-border)]">
            <p className="text-xs font-medium text-primary mb-3">🚀 دخول تجريبي سريع</p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { label: "مدير الشركة", email: "admin@velaracare.co", icon: Shield, color: "from-emerald-500 to-emerald-600" },
                { label: "موظف", email: "mohamed.alahmed@velaracare.co", icon: User, color: "from-blue-500 to-indigo-600" },
                { label: "موارد بشرية", email: "hr@velaracare.co", icon: Users, color: "from-amber-500 to-orange-600" },
                { label: "أخصائي تغذية", email: "nutrition@velaracare.co", icon: Apple, color: "from-green-500 to-emerald-600" },
                { label: "مطعم", email: "restaurant@velaracare.co", icon: Utensils, color: "from-rose-500 to-pink-600" },
              ].map((account) => (
                <button
                  key={account.email}
                  type="button"
                  onClick={() => {
                    setEmail(account.email);
                    setPassword("demo123");
                  }}
                  className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl bg-surface-mid border border-[var(--surface-border)] hover:border-emerald-500/30 hover:bg-emerald-50 transition-all text-center group"
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${account.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <account.icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-[10px] font-medium text-primary leading-tight">{account.label}</span>
                  <span className="text-[8px] text-muted truncate w-full">{account.email}</span>
                </button>
              ))}
            </div>
            <p className="text-[9px] text-muted mt-2">كلمة المرور للجميع: <span className="font-mono font-bold text-primary">demo123</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
