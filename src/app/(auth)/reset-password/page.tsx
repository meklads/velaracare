"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, Loader2, CheckCircle2, ArrowRight, Eye, EyeOff } from "lucide-react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<"code" | "reset" | "done">("code");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSendCode(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email) { setError("البريد الإلكتروني مطلوب"); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStep("reset");
      } else {
        const data = await res.json();
        setError(data.error || "حدث خطأ");
      }
    } catch {
      setError("حدث خطأ في الاتصال");
    } finally {
      setLoading(false);
    }
  }

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!code || !password || !confirmPassword) {
      setError("جميع الحقول مطلوبة");
      return;
    }
    if (password !== confirmPassword) {
      setError("كلمة المرور الجديدة وتأكيدها غير متطابقين");
      return;
    }
    if (password.length < 6) {
      setError("كلمة المرور يجب أن تكون ٦ أحرف على الأقل");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code, password }),
      });
      if (res.ok) {
        setStep("done");
      } else {
        const data = await res.json();
        setError(data.error || "رمز التحقق غير صحيح أو منتهي الصلاحية");
      }
    } catch {
      setError("حدث خطأ في الاتصال");
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
            {step === "code" ? "استعادة كلمة المرور" : step === "reset" ? "إدخال رمز التحقق" : "تم بنجاح"}
          </h1>
          <p className="mt-1 text-sm text-secondary">
            {step === "code" ? "أدخل بريدك الإلكتروني لاستلام رمز التحقق" :
             step === "reset" ? `أدخل الرمز المرسل إلى ${email}` :
             "تم تحديث كلمة المرور بنجاح"}
          </p>
        </div>

        {step === "done" ? (
          <div className="text-center relative z-10">
            <div className="w-16 h-16 rounded-full bg-emerald-soft flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-8 w-8 text-emerald" />
            </div>
            <p className="text-sm text-secondary mb-6">يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة</p>
            <Link href="/login" className="btn-primary w-full justify-center text-sm">
              <ArrowRight className="ml-2 h-4 w-4" />
              تسجيل الدخول
            </Link>
          </div>
        ) : step === "reset" ? (
          <form onSubmit={handleReset} className="space-y-5 relative z-10">
            {error && (
              <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400 text-center">{error}</div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">رمز التحقق</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="000000"
                maxLength={6}
                dir="ltr"
                required
                className="w-full text-center text-2xl tracking-widest rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-3 text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-emerald-ai/30"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">كلمة المرور الجديدة</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  dir="ltr"
                  required
                  minLength={6}
                  className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-3 text-sm text-left text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-emerald-ai/30 pl-10"
                />
                <button type="button" className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">تأكيد كلمة المرور</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                dir="ltr"
                required
                minLength={6}
                className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-3 text-sm text-left text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-emerald-ai/30"
              />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center text-sm disabled:opacity-60">
              {loading ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : <KeyRound className="ml-2 h-4 w-4" />}
              {loading ? "جاري التحقق..." : "تحديث كلمة المرور"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSendCode} className="space-y-5 relative z-10">
            {error && (
              <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400 text-center">{error}</div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">البريد الإلكتروني</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@company.com"
                dir="ltr"
                required
                className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-3 text-sm text-left text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-emerald-ai/30"
              />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center text-sm disabled:opacity-60">
              {loading ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : <KeyRound className="ml-2 h-4 w-4" />}
              {loading ? "جاري الإرسال..." : "إرسال رمز التحقق"}
            </button>
            <Link href="/login" className="flex items-center justify-center gap-2 text-sm text-secondary hover:text-primary transition-colors">
              <ArrowRight className="h-4 w-4" />
              العودة إلى تسجيل الدخول
            </Link>
          </form>
        )}
      </div>
    </div>
  );
}
