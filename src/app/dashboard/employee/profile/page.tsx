"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Loader2, ChevronLeft, User, Mail, Building, Phone, Save, Lock, CheckCircle, Camera } from "lucide-react";
import FileUpload from "@/components/ui/FileUpload";

export default function ProfilePage() {
  const { data: session, update: updateSession } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingAvatar, setSavingAvatar] = useState(false);
  const [saved, setSaved] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    department: "",
    position: "",
  });
  const [passwordForm, setPasswordForm] = useState({ current: "", newPass: "", confirm: "" });
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (session?.user) {
      const u = session.user as any;
      setForm({
        firstName: u.name?.split(" ")[0] || "",
        lastName: u.name?.split(" ").slice(1).join(" ") || "",
        phone: u.phone || "",
        department: u.department || "",
        position: u.position || "",
      });
      setLoading(false);
    }
  }, [session]);

  async function handleAvatarUpload(url: string) {
    setSavingAvatar(true);
    try {
      // Save avatar URL to user profile
      const res = await fetch("/api/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ avatarUrl: url }),
      });
      if (res.ok) {
        setAvatarUrl(url);
        updateSession({ image: url });
      }
    } catch {
      console.error("Failed to save avatar");
    } finally {
      setSavingAvatar(false);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    try {
      const res = await fetch("/api/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSaved(true);
        // Update session with new name
        updateSession({ name: `${form.firstName} ${form.lastName}` });
        setTimeout(() => setSaved(false), 3000);
      }
    } catch {
      console.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  }

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    setPasswordError("");

    if (passwordForm.newPass !== passwordForm.confirm) {
      setPasswordError("كلمة المرور الجديدة وتأكيدها غير متطابقين");
      return;
    }

    if (passwordForm.newPass.length < 6) {
      setPasswordError("كلمة المرور يجب أن تكون ٦ أحرف على الأقل");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwordForm.current,
          newPassword: passwordForm.newPass,
        }),
      });

      if (res.ok) {
        setPasswordForm({ current: "", newPass: "", confirm: "" });
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        const data = await res.json();
        setPasswordError(data.error || "حدث خطأ");
      }
    } catch {
      setPasswordError("حدث خطأ في الاتصال");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-mid">
        <Loader2 className="h-8 w-8 text-emerald animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface-mid pt-24 pb-12">
        <div className="container-shade py-6 max-w-2xl mx-auto">
          <div className="fade-in-up mb-5">
            <Link href="/dashboard/employee" className="text-sm text-emerald hover:underline inline-flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" /> العودة للوحة التحكم
            </Link>
          </div>

          <div className="fade-in-up mb-6">
            <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
              <User className="h-7 w-7 text-emerald" />
              الملف الشخصي
            </h1>
            <p className="text-secondary mt-1">إدارة بياناتك الشخصية</p>
          </div>

          {saved && (
            <div className="fade-in-up mb-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-5 py-3 text-sm text-emerald-600 text-center font-medium flex items-center justify-center gap-2">
              <CheckCircle className="h-5 w-5" /> تم حفظ التغييرات بنجاح!
            </div>
          )}

          {/* Profile Info */}
          <div className="shade-card p-6 mb-6 fade-in-up">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative group">
                <div className="w-16 h-16 rounded-full bg-emerald-gradient flex items-center justify-center text-2xl font-bold text-white overflow-hidden">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="الصورة الشخصية" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <Camera className="h-6 w-6 opacity-0 group-hover:opacity-100 absolute transition-opacity z-10" />
                      <span className="group-hover:opacity-30 transition-opacity">{form.firstName[0] || "?"}</span>
                    </>
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1">
                  <FileUpload
                    folder="avatars"
                    onUpload={handleAvatarUpload}
                    label=""
                    currentImage={avatarUrl}
                  />
                </div>
              </div>
              <div>
                <h2 className="text-lg font-bold text-primary">{form.firstName} {form.lastName}</h2>
                <p className="text-sm text-secondary flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5" /> {(session?.user as any)?.email}
                </p>
              </div>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-primary">الاسم الأول</label>
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={(e) => setForm((p) => ({ ...p, firstName: e.target.value }))}
                    className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-emerald-ai/30"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-primary">الاسم الأخير</label>
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={(e) => setForm((p) => ({ ...p, lastName: e.target.value }))}
                    className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-emerald-ai/30"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-primary">البريد الإلكتروني</label>
                <input
                  type="email"
                  value={(session?.user as any)?.email || ""}
                  disabled
                  className="w-full rounded-xl border border-[var(--surface-border)] bg-gray-50 px-4 py-2.5 text-sm text-gray-500 cursor-not-allowed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-primary">رقم الجوال</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                  placeholder="+966 5X XXX XXXX"
                  className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-emerald-ai/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-primary">القسم</label>
                  <input
                    type="text"
                    value={form.department}
                    onChange={(e) => setForm((p) => ({ ...p, department: e.target.value }))}
                    placeholder="تقنية المعلومات"
                    className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-emerald-ai/30"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-primary">المسمى الوظيفي</label>
                  <input
                    type="text"
                    value={form.position}
                    onChange={(e) => setForm((p) => ({ ...p, position: e.target.value }))}
                    placeholder="مطور برمجيات"
                    className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-emerald-ai/30"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full py-2.5 rounded-xl bg-emerald text-white text-sm font-semibold hover:bg-emerald-dark transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {saving ? "جاري الحفظ..." : "حفظ التغييرات"}
              </button>
            </form>
          </div>

          {/* Change Password */}
          <details className="shade-card p-6 fade-in-up">
            <summary className="cursor-pointer text-sm font-medium text-secondary select-none flex items-center gap-2">
              <Lock className="h-4 w-4" />
              تغيير كلمة المرور
            </summary>
            <form onSubmit={handlePasswordChange} className="mt-5 space-y-4">
              {passwordError && (
                <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-2.5 text-sm text-red-400">
                  {passwordError}
                </div>
              )}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-primary">كلمة المرور الحالية</label>
                <input
                  type="password"
                  value={passwordForm.current}
                  onChange={(e) => setPasswordForm((p) => ({ ...p, current: e.target.value }))}
                  required
                  className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-emerald-ai/30"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-primary">كلمة المرور الجديدة</label>
                  <input
                    type="password"
                    value={passwordForm.newPass}
                    onChange={(e) => setPasswordForm((p) => ({ ...p, newPass: e.target.value }))}
                    required
                    minLength={6}
                    className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-emerald-ai/30"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-primary">تأكيد كلمة المرور</label>
                  <input
                    type="password"
                    value={passwordForm.confirm}
                    onChange={(e) => setPasswordForm((p) => ({ ...p, confirm: e.target.value }))}
                    required
                    minLength={6}
                    className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-emerald-ai/30"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={saving}
                className="w-full py-2.5 rounded-xl border border-[var(--surface-border)] text-secondary text-sm font-medium hover:text-primary transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
                تغيير كلمة المرور
              </button>
            </form>
          </details>
        </div>
      </main>
      <Footer />
    </>
  );
}
