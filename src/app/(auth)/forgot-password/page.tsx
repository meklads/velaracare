"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSent(true);
      } else {
        const data = await res.json();
        setError(data.error || "حدث خطأ");
      }
    } catch {
      setError("حدث خطأ في الاتصال. حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-mid p-4">
      <div className="shade-card w-full max-w-md p-8 relative overflow-hidden">
        <div className="shade-circle w-48 h-48 -top-20 -right-20 opacity-20" />

        <div className="text-center mb-8 relative z-10">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-gradient">
              <span className="text-lg font-bold text-white">V</span>
            </div>
            <span className="text-xl font-bold text-primary">Velara</span>
            <span className="text-sm font-medium text-secondary">Care</span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-primary">
            {sent ? "تم إرسال البريد" : "نسيت كلمة المرور؟"}
          </h1>
          <p className="mt-1 text-sm text-secondary">
            {sent
              ? "تحقق من بريدك الإلكتروني لاستعادة كلمة المرور"
              : "أدخل بريدك الإلكتروني وسنرسل لك رابط استعادة كلمة المرور"}
          </p>
        </div>

        {sent ? (
          <div className="text-center relative z-10">
            <div className="w-16 h-16 rounded-full bg-emerald-soft flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-8 w-8 text-emerald" />
            </div>
            <p className="text-sm text-secondary mb-6">
              إذا كان الحساب موجوداً، ستصلك رسالة على <strong className="text-primary">{email}</strong>
            </p>
            <Link href="/login" className="btn-primary w-full justify-center text-sm">
              <ArrowRight className="ml-2 h-4 w-4" />
              العودة إلى تسجيل الدخول
            </Link>
          </div>
        ) : (
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
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@company.com"
                  dir="ltr"
                  required
                  className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid pr-10 px-4 py-3 text-sm text-left text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-[var(--emerald-ai)]/30 focus:border-[var(--emerald-ai)] transition-all"
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center text-sm disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? (
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              ) : (
                <Mail className="ml-2 h-4 w-4" />
              )}
              {loading ? "جاري الإرسال..." : "إرسال رابط الاستعادة"}
            </button>

            <Link
              href="/login"
              className="flex items-center justify-center gap-2 text-sm text-secondary hover:text-primary transition-colors"
            >
              <ArrowRight className="h-4 w-4" />
              العودة إلى تسجيل الدخول
            </Link>
          </form>
        )}
      </div>
    </div>
  );
}
