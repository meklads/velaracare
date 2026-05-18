"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Loader2, ChevronLeft, User, Mail, Building, Calendar, Heart,
  TrendingUp, Apple, Activity, Dumbbell, Moon, Brain, Save, X, Edit3,
  CheckCircle2, AlertTriangle
} from "lucide-react";

type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  department: string | null;
  position: string | null;
  phone: string | null;
  isActive: boolean;
  createdAt: string;
  companyId: string | null;
  wellnessScore?: {
    score: number; riskLevel: string; sleepScore: number;
    stressScore: number; activityScore: number; nutritionScore: number;
    bmiScore: number; trend: string; updatedAt: string;
  } | null;
};

const roleLabels: Record<string, string> = {
  SUPER_ADMIN: "مدير النظام",
  COMPANY_ADMIN: "مدير الشركة",
  HR: "موارد بشرية",
  EMPLOYEE: "موظف",
  NUTRITIONIST: "أخصائي تغذية",
  RESTAURANT: "مطعم",
};

const roleOptions = [
  { value: "EMPLOYEE", label: "موظف" },
  { value: "HR", label: "موارد بشرية" },
  { value: "NUTRITIONIST", label: "أخصائي تغذية" },
  { value: "RESTAURANT", label: "مطعم" },
  { value: "COMPANY_ADMIN", label: "مدير الشركة" },
];

export default function EmployeeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: "", lastName: "", phone: "", department: "", position: "", role: "", isActive: true,
  });
  const [editMsg, setEditMsg] = useState("");
  const [error, setError] = useState("");

  const loadEmployee = useCallback(async () => {
    try {
      const res = await fetch(`/api/users/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setEmployee(data);
        setEditForm({
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone || "",
          department: data.department || "",
          position: data.position || "",
          role: data.role,
          isActive: data.isActive,
        });
      } else {
        setError("لم يتم العثور على الموظف");
      }
    } catch {
      setError("حدث خطأ في التحميل");
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => { loadEmployee(); }, [loadEmployee]);

  async function handleSave() {
    if (!editForm.firstName || !editForm.lastName) return;
    setSaving(true);
    setEditMsg("");
    try {
      const res = await fetch(`/api/users/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      if (res.ok) {
        const updated = await res.json();
        setEmployee((prev) => prev ? { ...prev, ...updated } : prev);
        setEditMsg("✅ تم حفظ التغييرات بنجاح");
        setEditMode(false);
        setTimeout(() => setEditMsg(""), 3000);
      } else {
        const err = await res.json();
        setEditMsg(`❌ ${err.error || "حدث خطأ"}`);
      }
    } catch {
      setEditMsg("❌ حدث خطأ في الاتصال");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm("هل أنت متأكد من حذف هذا الموظف؟ لا يمكن التراجع عن هذا الإجراء.")) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/users/${params.id}`, { method: "DELETE" });
      if (res.ok) {
        router.push("/dashboard/admin/employees");
      } else {
        const err = await res.json();
        setEditMsg(`❌ ${err.error || "حدث خطأ في الحذف"}`);
      }
    } catch {
      setEditMsg("❌ حدث خطأ في الاتصال");
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

  if (error || !employee) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-surface-mid pt-24 pb-12">
          <div className="container-shade py-6 text-center">
            <User className="h-16 w-16 mx-auto mb-4 text-secondary opacity-30" />
            <h1 className="text-2xl font-bold text-primary mb-2">الموظف غير موجود</h1>
            <p className="text-secondary mb-6">{error || "لم يتم العثور على الموظف المطلوب"}</p>
            <Link href="/dashboard/admin/employees" className="btn-primary text-sm">
              العودة لقائمة الموظفين
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const ws = employee.wellnessScore;
  const scoreColor = ws ? (ws.score >= 80 ? "text-emerald-400" : ws.score >= 60 ? "text-amber-400" : "text-red-400") : "text-gray-400";
  const riskColor = ws?.riskLevel === "low" ? "text-emerald-400 bg-emerald-500/10" : ws?.riskLevel === "moderate" ? "text-amber-400 bg-amber-500/10" : ws?.riskLevel === "high" ? "text-orange-400 bg-orange-500/10" : "text-red-400 bg-red-500/10";
  const riskText = ws?.riskLevel === "low" ? "منخفض" : ws?.riskLevel === "moderate" ? "متوسط" : ws?.riskLevel === "high" ? "مرتفع" : "حرج";
  const isAdmin = typeof window !== "undefined" && (employee.role === "HR" || employee.role === "COMPANY_ADMIN");

  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface-mid pt-24 pb-12">
        <div className="container-shade py-6 max-w-4xl mx-auto">
          <div className="fade-in-up mb-5 flex items-center justify-between">
            <Link href="/dashboard/admin/employees" className="text-sm text-emerald hover:underline inline-flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" /> العودة لقائمة الموظفين
            </Link>
            <div className="flex items-center gap-2">
              {!editMode && (
                <button
                  onClick={() => setEditMode(true)}
                  className="text-sm py-1.5 px-4 rounded-xl border border-[var(--surface-border)] text-secondary hover:text-primary hover:border-emerald/30 transition-all flex items-center gap-1.5"
                >
                  <Edit3 className="h-3.5 w-3.5" /> تعديل
                </button>
              )}
              <span className={`tag text-xs py-0.5 px-2.5 ${employee.isActive ? "bg-emerald-soft text-emerald-dark" : "bg-gray-100 text-gray-500"}`}>
                {employee.isActive ? "نشط" : "غير نشط"}
              </span>
            </div>
          </div>

          {/* Edit message */}
          {editMsg && (
            <div className={`fade-in-up mb-5 rounded-xl px-5 py-3 text-sm text-center font-medium ${
              editMsg.includes("✅") ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"
            }`}>
              {editMsg}
            </div>
          )}

          {/* ── Profile Header ── */}
          <div className="shade-card p-6 mb-6 fade-in-up">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-full bg-emerald-gradient flex items-center justify-center text-2xl font-bold text-white shrink-0">
                {employee.firstName[0]}
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold text-primary truncate">{employee.firstName} {employee.lastName}</h1>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5">
                  <span className="text-sm text-secondary flex items-center gap-1">
                    <Mail className="h-3.5 w-3.5" /> {employee.email}
                  </span>
                  <span className="text-sm text-secondary hidden sm:inline">·</span>
                  <span className="text-sm text-secondary flex items-center gap-1">
                    <Building className="h-3.5 w-3.5" /> {employee.department || "بدون قسم"}
                  </span>
                  <span className={`tag text-xs py-0.5 px-2.5 ${riskColor}`}>{riskText}</span>
                </div>
              </div>
              <div className="text-center shrink-0">
                <p className={`text-4xl font-extrabold ${scoreColor}`}>{ws?.score ?? "—"}</p>
                <p className="text-xs text-secondary mt-1">العافية</p>
              </div>
            </div>
          </div>

          {/* ── Edit Mode Form ── */}
          {editMode && (
            <div className="shade-card p-6 mb-6 fade-in-up">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-primary flex items-center gap-2">
                  <Edit3 className="h-5 w-5 text-emerald" /> تعديل بيانات الموظف
                </h2>
                <button
                  onClick={() => { setEditMode(false); setEditMsg(""); }}
                  className="text-sm p-2 rounded-xl text-secondary hover:text-primary hover:bg-surface-mid transition-all"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-primary">الاسم الأول</label>
                  <input
                    type="text" value={editForm.firstName}
                    onChange={(e) => setEditForm((p) => ({ ...p, firstName: e.target.value }))}
                    className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-emerald-ai/30"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-primary">الاسم الأخير</label>
                  <input
                    type="text" value={editForm.lastName}
                    onChange={(e) => setEditForm((p) => ({ ...p, lastName: e.target.value }))}
                    className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-emerald-ai/30"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-primary">رقم الجوال</label>
                  <input
                    type="text" value={editForm.phone}
                    onChange={(e) => setEditForm((p) => ({ ...p, phone: e.target.value }))}
                    className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-emerald-ai/30"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-primary">القسم</label>
                  <select
                    value={editForm.department}
                    onChange={(e) => setEditForm((p) => ({ ...p, department: e.target.value }))}
                    className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-emerald-ai/30"
                  >
                    <option value="">بدون قسم</option>
                    <option value="تقنية المعلومات">تقنية المعلومات</option>
                    <option value="الموارد البشرية">الموارد البشرية</option>
                    <option value="المالية">المالية</option>
                    <option value="التسويق">التسويق</option>
                    <option value="المبيعات">المبيعات</option>
                    <option value="العمليات">العمليات</option>
                    <option value="الإدارة">الإدارة</option>
                    <option value="القانونية">القانونية</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-primary">المسمى الوظيفي</label>
                  <input
                    type="text" value={editForm.position}
                    onChange={(e) => setEditForm((p) => ({ ...p, position: e.target.value }))}
                    className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-emerald-ai/30"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-primary">الدور</label>
                  <select
                    value={editForm.role}
                    onChange={(e) => setEditForm((p) => ({ ...p, role: e.target.value }))}
                    className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-emerald-ai/30"
                  >
                    {roleOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5 flex items-end">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <button
                      onClick={() => setEditForm((p) => ({ ...p, isActive: !p.isActive }))}
                      className={`w-12 h-6 rounded-full transition-all relative ${
                        editForm.isActive ? "bg-emerald" : "bg-gray-300"
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${
                        editForm.isActive ? "right-1" : "right-7"
                      }`} />
                    </button>
                    <span className="text-sm text-primary font-medium">
                      {editForm.isActive ? "الحساب نشط" : "الحساب غير نشط"}
                    </span>
                  </label>
                </div>
              </div>
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-[var(--surface-border)]">
                <button
                  onClick={handleDelete}
                  disabled={saving}
                  className="text-sm py-2 px-4 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-all disabled:opacity-50 flex items-center gap-1.5"
                >
                  {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <AlertTriangle className="h-3.5 w-3.5" />}
                  حذف الموظف
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => { setEditMode(false); setEditMsg(""); }}
                    className="text-sm py-2 px-5 rounded-xl border border-[var(--surface-border)] text-secondary hover:text-primary transition-all"
                  >
                    إلغاء
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving || !editForm.firstName || !editForm.lastName}
                    className="text-sm py-2 px-6 rounded-xl bg-emerald text-white hover:bg-emerald-dark transition-all disabled:opacity-50 flex items-center gap-1.5"
                  >
                    {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    {saving ? "جاري الحفظ..." : "حفظ التغييرات"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── Info Grid ── */}
          {!editMode && (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Personal Info */}
              <div className="shade-card p-6 fade-in-up-delay-2">
                <h2 className="font-bold text-primary mb-4 flex items-center gap-2">
                  <User className="h-5 w-5 text-emerald" /> المعلومات الشخصية
                </h2>
                <div className="space-y-3 text-sm">
                  {[
                    { label: "الاسم الكامل", value: `${employee.firstName} ${employee.lastName}` },
                    { label: "البريد الإلكتروني", value: employee.email },
                    { label: "الجوال", value: employee.phone || "—" },
                    { label: "القسم", value: employee.department || "—" },
                    { label: "المسمى الوظيفي", value: employee.position || "—" },
                    { label: "الدور", value: roleLabels[employee.role] || employee.role },
                    { label: "تاريخ التسجيل", value: new Date(employee.createdAt).toLocaleDateString("ar-SA") },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between py-2 border-b border-[var(--surface-border)] last:border-0">
                      <span className="text-secondary">{item.label}</span>
                      <span className="font-medium text-primary text-left">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Wellness Score Details */}
              <div className="shade-card p-6 fade-in-up-delay-3">
                <h2 className="font-bold text-primary mb-4 flex items-center gap-2">
                  <Heart className="h-5 w-5 text-emerald" /> تفاصيل العافية
                </h2>
                {ws ? (
                  <div className="space-y-4">
                    {[
                      { label: "مؤشر كتلة الجسم", value: ws.bmiScore, icon: Brain, color: "text-indigo-400" },
                      { label: "النوم", value: ws.sleepScore, icon: Moon, color: "text-indigo-400" },
                      { label: "النشاط البدني", value: ws.activityScore, icon: Dumbbell, color: "text-emerald-400" },
                      { label: "التوتر", value: ws.stressScore, icon: Activity, color: "text-amber-400" },
                      { label: "التغذية", value: ws.nutritionScore, icon: Apple, color: "text-green-400" },
                    ].map((metric) => (
                      <div key={metric.label}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-secondary flex items-center gap-1.5">
                            <metric.icon className={`h-3.5 w-3.5 ${metric.color}`} />
                            {metric.label}
                          </span>
                          <span className="font-semibold text-primary">{metric.value}</span>
                        </div>
                        <div className="w-full bg-[var(--surface-border)] rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${metric.value >= 75 ? "bg-emerald" : metric.value >= 50 ? "bg-amber-500" : "bg-rose-500"}`}
                            style={{ width: `${metric.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center justify-between pt-2 text-sm">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-emerald" />
                        <span className="text-secondary">الاتجاه: </span>
                        <span className={`font-medium ${ws.trend === "improving" ? "text-emerald" : ws.trend === "declining" ? "text-red-500" : "text-secondary"}`}>
                          {ws.trend === "improving" ? "تصاعدي" : ws.trend === "declining" ? "تنازلي" : "مستقر"}
                        </span>
                      </div>
                      <span className="text-[11px] text-secondary">
                        آخر تحديث: {ws.updatedAt ? new Date(ws.updatedAt).toLocaleDateString("ar-SA") : "—"}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-secondary">
                    <Heart className="h-10 w-10 mx-auto mb-2 opacity-30" />
                    <p className="text-sm">لم يتم إجراء تقييم صحي بعد</p>
                    <p className="text-xs mt-1">يمكن للموظف إجراء التقييم من لوحة التحكم</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
