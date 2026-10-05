"use client";

import { useState } from "react";
import { Eye, EyeOff, Loader2, Lock } from "lucide-react";

function safeNextPath(value: string | null): string {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) {
    return "/";
  }
  if (value.startsWith("/access")) return "/";
  return value;
}

export default function AccessPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/site-gate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        setError("كلمة المرور غير صحيحة");
        setLoading(false);
        return;
      }

      const next = safeNextPath(new URLSearchParams(window.location.search).get("next"));
      window.location.href = next;
    } catch {
      setError("حدث خطأ في الاتصال. حاول مرة أخرى.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-mid p-4">
      <div className="shade-card w-full max-w-md p-8 relative overflow-hidden">
        <div className="shade-circle w-48 h-48 -top-20 -right-20 opacity-20" />

        <div className="text-center mb-8 relative z-10">
          <div className="inline-flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-gradient">
              <span className="text-lg font-bold text-white">V</span>
            </div>
            <span className="text-xl font-bold text-primary">Velara</span>
            <span className="text-sm font-medium text-secondary">Care</span>
          </div>
          <h1 className="mt-6 text-2xl font-bold text-primary">المنصة محمية</h1>
          <p className="mt-1 text-sm text-secondary">أدخل كلمة المرور للوصول إلى Velara Care</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          {error && (
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400 text-center">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="site-password" className="text-sm font-medium text-primary">
              كلمة المرور
            </label>
            <div className="relative">
              <input
                id="site-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                dir="ltr"
                autoComplete="current-password"
                required
                className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-3 text-sm text-left text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-[var(--emerald-ai)]/30 focus:border-[var(--emerald-ai)] transition-all pl-10"
              />
              <button
                type="button"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center text-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : <Lock className="ml-2 h-4 w-4" />}
            {loading ? "جاري التحقق..." : "دخول"}
          </button>
        </form>
      </div>
    </div>
  );
}
