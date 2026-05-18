"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import { Loader2, ArrowLeft, User, Bell, Shield, Moon, Sun, Monitor, Save, CheckCircle2, LogOut, Lock, Heart, Calendar } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export default function SettingsPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<"profile" | "notifications" | "appearance" | "privacy">("profile");
  const [saved, setSaved] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [notifSettings, setNotifSettings] = useState({
    consultations: true,
    orders: true,
    hra: true,
    promotions: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    if (stored === "dark") setTheme("dark");
    else if (stored === "light") setTheme("light");
    else setTheme("system");
  }, []);

  function applyTheme(t: "light" | "dark" | "system") {
    setTheme(t);
    if (t === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else if (t === "light") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      localStorage.removeItem("theme");
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function saveNotifSettings() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const tabs = [
    { id: "profile" as const, label: "الملف الشخصي", icon: User },
    { id: "notifications" as const, label: "الإشعارات", icon: Bell },
    { id: "appearance" as const, label: "المظهر", icon: Moon },
    { id: "privacy" as const, label: "الخصوصية", icon: Shield },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface-mid pt-24 pb-12">
        <div className="container-shade py-8">
          <div className="fade-in-up mb-8">
            <Link href="/dashboard/employee" className="text-sm text-emerald hover:underline inline-flex items-center gap-1 transition-colors mb-3">
              <ArrowLeft className="h-4 w-4" /> العودة للوحة التحكم
            </Link>
            <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
              <Shield className="h-6 w-6 text-emerald" />
              الإعدادات
            </h1>
          </div>

          {saved && (
            <div className="fade-in-up mb-6 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 px-5 py-3 text-sm text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              تم حفظ التغييرات بنجاح
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Tabs */}
            <div className="md:w-56 shrink-0">
              <div className="shade-card p-2 flex md:flex-col gap-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? "bg-emerald text-white shadow-md"
                        : "text-secondary hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="shade-card p-6">
                {/* ── Profile Tab ── */}
                {activeTab === "profile" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-bold text-primary mb-1">الملف الشخصي</h2>
                      <p className="text-sm text-secondary">معلومات حسابك الأساسية</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-secondary">الاسم الأول</label>
                        <div className="w-full rounded-xl bg-surface-mid border border-[var(--surface-border)] px-4 py-3 text-sm text-primary">
                          {(session?.user as any)?.name?.split(" ")[0] || "—"}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-secondary">الاسم الأخير</label>
                        <div className="w-full rounded-xl bg-surface-mid border border-[var(--surface-border)] px-4 py-3 text-sm text-primary">
                          {(session?.user as any)?.name?.split(" ").slice(1).join(" ") || "—"}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-secondary">البريد الإلكتروني</label>
                        <div className="w-full rounded-xl bg-surface-mid border border-[var(--surface-border)] px-4 py-3 text-sm text-primary">
                          {session?.user?.email || "—"}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-secondary">الدور</label>
                        <div className="w-full rounded-xl bg-surface-mid border border-[var(--surface-border)] px-4 py-3 text-sm text-primary">
                          {(session?.user as any)?.role === "EMPLOYEE" ? "موظف"
                            : (session?.user as any)?.role === "COMPANY_ADMIN" ? "مدير الشركة"
                            : (session?.user as any)?.role === "HR" ? "موارد بشرية"
                            : (session?.user as any)?.role || "—"}
                        </div>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-[var(--surface-border)]">
                      <Link
                        href="/dashboard/employee/profile"
                        className="text-sm text-emerald hover:underline font-medium"
                      >
                        تعديل الملف الشخصي ←
                      </Link>
                    </div>
                  </div>
                )}

                {/* ── Notifications Tab ── */}
                {activeTab === "notifications" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-bold text-primary mb-1">إعدادات الإشعارات</h2>
                      <p className="text-sm text-secondary">تحكم في الإشعارات التي ترغب في استلامها</p>
                    </div>
                    <div className="space-y-3">
                      {[
                        { key: "consultations" as const, label: "الاستشارات", desc: "إشعارات الاستشارات القادمة والتذكيرات", icon: Calendar },
                        { key: "orders" as const, label: "الوجبات", desc: "تحديثات حالة طلبات الوجبات", icon: Bell },
                        { key: "hra" as const, label: "التقييم الصحي", desc: "تذكيرات بإجراء التقييم الصحي الدوري", icon: Heart },
                        { key: "promotions" as const, label: "العروض", desc: "عروض وخصومات الوجبات الجديدة", icon: Bell },
                      ].map((item) => (
                        <label key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-surface-mid border border-[var(--surface-border)] cursor-pointer hover:border-emerald-200 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-emerald-soft flex items-center justify-center">
                              <item.icon className="h-4 w-4 text-emerald-dark" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-primary">{item.label}</p>
                              <p className="text-xs text-secondary">{item.desc}</p>
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={notifSettings[item.key]}
                            onChange={() => setNotifSettings((prev) => ({ ...prev, [item.key]: !prev[item.key] }))}
                            className="rounded-full w-5 h-5 accent-emerald border-[var(--surface-border)]"
                          />
                        </label>
                      ))}
                    </div>
                    <button onClick={saveNotifSettings} className="btn-primary text-sm py-2.5 px-6">
                      حفظ إعدادات الإشعارات
                    </button>
                  </div>
                )}

                {/* ── Appearance Tab ── */}
                {activeTab === "appearance" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-bold text-primary mb-1">المظهر</h2>
                      <p className="text-sm text-secondary">اختر الوضع المناسب لك</p>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: "light" as const, label: "فاتح", icon: Sun, desc: "وضع النهار" },
                        { id: "dark" as const, label: "داكن", icon: Moon, desc: "وضع الليل" },
                        { id: "system" as const, label: "تلقائي", icon: Monitor, desc: "حسب الجهاز" },
                      ].map((option) => (
                        <button
                          key={option.id}
                          onClick={() => applyTheme(option.id)}
                          className={`p-5 rounded-2xl border-2 text-center transition-all ${
                            theme === option.id
                              ? "border-emerald bg-emerald-50 dark:bg-emerald-900/20 shadow-md"
                              : "border-[var(--surface-border)] bg-surface-mid hover:border-gray-300"
                          }`}
                        >
                          <option.icon className={`h-8 w-8 mx-auto mb-2 ${theme === option.id ? "text-emerald" : "text-secondary"}`} />
                          <p className={`text-sm font-bold ${theme === option.id ? "text-emerald" : "text-primary"}`}>{option.label}</p>
                          <p className="text-[10px] text-secondary mt-0.5">{option.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Privacy Tab ── */}
                {activeTab === "privacy" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-bold text-primary mb-1">الخصوصية والأمان</h2>
                      <p className="text-sm text-secondary">إدارة بيانات حسابك وصلاحياته</p>
                    </div>
                    <div className="space-y-3">
                      <Link href="/dashboard/employee/profile" className="flex items-center justify-between p-4 rounded-xl bg-surface-mid border border-[var(--surface-border)] hover:border-emerald-200 transition-colors group">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                            <Lock className="h-4 w-4 text-blue-500" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-primary">تغيير كلمة المرور</p>
                            <p className="text-xs text-secondary">تحديث كلمة المرور الخاصة بحسابك</p>
                          </div>
                        </div>
                        <span className="text-xs text-emerald group-hover:translate-x-1 transition-transform">←</span>
                      </Link>
                      <button className="w-full flex items-center justify-between p-4 rounded-xl bg-surface-mid border border-[var(--surface-border)] hover:border-red-200 transition-colors group text-right">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                            <LogOut className="h-4 w-4 text-red-500" />
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-primary">تسجيل الخروج</p>
                            <p className="text-xs text-secondary">تسجيل الخروج من جميع الأجهزة</p>
                          </div>
                        </div>
                        <span className="text-xs text-red-500">←</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}