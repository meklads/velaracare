"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, UserPlus, Loader2, CheckCircle2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    employeeCount: "١-٥٠ موظف",
    password: "",
    agree: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function update(field: string, value: any) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.agree) {
      setError("يجب الموافقة على شروط الخدمة وسياسة الخصوصية");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          firstName: form.firstName,
          lastName: form.lastName,
          companyName: form.companyName,
          employeeCount: form.employeeCount,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "حدث خطأ أثناء إنشاء الحساب");
        setLoading(false);
        return;
      }

      setSuccess(true);
      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch {
      setError("حدث خطأ في الاتصال. حاول مرة أخرى.");
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-mid p-4">
        <div className="shade-card w-full max-w-md p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-soft flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-8 w-8 text-emerald" />
          </div>
          <h2 className="text-2xl font-bold text-primary mb-2">تم إنشاء الحساب بنجاح 🎉</h2>
          <p className="text-secondary mb-6">سيتم تحويلك إلى صفحة تسجيل الدخول...</p>
          <Link href="/login" className="btn-primary">
            تسجيل الدخول الآن
          </Link>
        </div>
      </div>
    );
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
          <h1 className="mt-6 text-2xl font-bold text-primary">إنشاء حساب جديد</h1>
          <p className="mt-1 text-sm text-secondary">
            ابدأ رحلة الصحة الوقائية مع Velara Care
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          {error && (
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400 text-center">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">الاسم الأول</label>
              <input
                type="text"
                value={form.firstName}
                onChange={(e) => update("firstName", e.target.value)}
                placeholder="محمد"
                required
                className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-3 text-sm text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-[var(--emerald-ai)]/30 focus:border-[var(--emerald-ai)] transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">الاسم الأخير</label>
              <input
                type="text"
                value={form.lastName}
                onChange={(e) => update("lastName", e.target.value)}
                placeholder="العلي"
                required
                className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-3 text-sm text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-[var(--emerald-ai)]/30 focus:border-[var(--emerald-ai)] transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">البريد الإلكتروني للشركة</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="hr@company.com"
              dir="ltr"
              required
              className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-3 text-sm text-left text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-[var(--emerald-ai)]/30 focus:border-[var(--emerald-ai)] transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">اسم الشركة</label>
            <input
              type="text"
              value={form.companyName}
              onChange={(e) => update("companyName", e.target.value)}
              placeholder="شركة التطوير التقني"
              required
              className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-3 text-sm text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-[var(--emerald-ai)]/30 focus:border-[var(--emerald-ai)] transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">عدد الموظفين</label>
            <select
              value={form.employeeCount}
              onChange={(e) => update("employeeCount", e.target.value)}
              className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-3 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-[var(--emerald-ai)]/30 focus:border-[var(--emerald-ai)] transition-all"
            >
              <option>١-٥٠ موظف</option>
              <option>٥١-٢٠٠ موظف</option>
              <option>٢٠١-٥٠٠ موظف</option>
              <option>٥٠١-١٠٠٠ موظف</option>
              <option>أكثر من ١٠٠٠ موظف</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">كلمة المرور</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
                placeholder="••••••••"
                dir="ltr"
                required
                minLength={6}
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

          <div className="flex items-center gap-2 text-sm text-secondary">
            <input
              type="checkbox"
              checked={form.agree}
              onChange={(e) => update("agree", e.target.checked)}
              className="rounded border-[var(--surface-border)] accent-[var(--emerald-ai)]"
            />
            أوافق على{" "}
            <Link href="/terms" className="text-emerald hover:underline">شروط الخدمة</Link>
            {" "}و{" "}
            <Link href="/privacy" className="text-emerald hover:underline">سياسة الخصوصية</Link>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full justify-center text-sm disabled:opacity-60 disabled:cursor-not-allowed">
            {loading ? (
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            ) : (
              <UserPlus className="ml-2 h-4 w-4" />
            )}
            {loading ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-secondary relative z-10">
          لديك حساب بالفعل؟{" "}
          <Link href="/login" className="text-emerald hover:text-primary font-medium transition-colors">
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  );
}
