"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Loader2, ChevronLeft, Users, Search, Plus, Filter,
  Mail, Phone, Building, Shield, MoreHorizontal, CheckCircle, XCircle, UserPlus, Download,
  Edit3, Save, X
} from "lucide-react";
import { SkeletonKPIGrid, SkeletonTable, SkeletonBlock } from "@/components/ui/skeleton";

type Employee = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  department: string | null;
  position: string | null;
  isActive: boolean;
  createdAt: string;
  wellnessScore: { score: number; riskLevel: string } | null;
};

const roleLabels: Record<string, string> = {
  SUPER_ADMIN: "مدير النظام",
  COMPANY_ADMIN: "مدير الشركة",
  HR: "موارد بشرية",
  EMPLOYEE: "موظف",
  NUTRITIONIST: "أخصائي تغذية",
  RESTAURANT: "مطعم",
};

const roleColors: Record<string, string> = {
  SUPER_ADMIN: "bg-purple-100 text-purple-700",
  COMPANY_ADMIN: "bg-rose-100 text-rose-700",
  HR: "bg-blue-100 text-blue-700",
  EMPLOYEE: "bg-emerald-100 text-emerald-700",
  NUTRITIONIST: "bg-amber-100 text-amber-700",
  RESTAURANT: "bg-gray-100 text-gray-700",
};

export default function AdminEmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("all");
  const [filterRole, setFilterRole] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null);
  const [editForm, setEditForm] = useState({ department: "", position: "", role: "", isActive: true });
  const [savingEdit, setSavingEdit] = useState(false);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 25;

  useEffect(() => {
    async function load() {
      try {
        const params = new URLSearchParams({ skip: String(page * pageSize), take: String(pageSize) });
        const res = await fetch(`/api/users?${params}`);
        if (res.ok) {
          const data = await res.json();
          if (data.users) {
            setEmployees(data.users);
            setTotalCount(data.total);
          } else {
            setEmployees(data);
            setTotalCount(data.length);
          }
        }
      } catch (e) {
        console.error("Failed to load employees", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [page]);

  async function toggleActive(emp: Employee) {
    setTogglingId(emp.id);
    try {
      const res = await fetch("/api/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: emp.id, isActive: !emp.isActive }),
      });
      if (res.ok) {
        const updated = await res.json();
        setEmployees((prev) => prev.map((e) => (e.id === emp.id ? { ...e, isActive: updated.isActive } : e)));
      }
    } catch (e) {
      console.error("Toggle failed", e);
    } finally {
      setTogglingId(null);
    }
  }

  function handleEditClick(emp: Employee) {
    setEditEmployee(emp);
    setEditForm({
      department: emp.department || "",
      position: emp.position || "",
      role: emp.role,
      isActive: emp.isActive,
    });
    setShowEditModal(true);
  }

  async function handleEditSave() {
    if (!editEmployee) return;
    setSavingEdit(true);
    try {
      const res = await fetch(`/api/users/${editEmployee.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      if (res.ok) {
        const updated = await res.json();
        setEmployees((prev) => prev.map((e) => (e.id === editEmployee.id ? { ...e, ...updated } : e)));
        setShowEditModal(false);
      }
    } catch (e) {
      console.error("Edit failed", e);
    } finally {
      setSavingEdit(false);
    }
  }

  const departments = ["all", ...new Set(employees.map((e) => e.department).filter(Boolean))] as string[];
  const roles = ["all", ...new Set(employees.map((e) => e.role))];

  const filtered = employees.filter((e) => {
    const name = `${e.firstName} ${e.lastName} ${e.email}`.toLowerCase();
    const matchesSearch = name.includes(search.toLowerCase());
    const matchesDept = filterDept === "all" || e.department === filterDept;
    const matchesRole = filterRole === "all" || e.role === filterRole;
    return matchesSearch && matchesDept && matchesRole;
  });

  const stats = {
    total: totalCount,
    active: employees.filter((e) => e.isActive).length,
    highRisk: employees.filter((e) => e.wellnessScore?.riskLevel === "high" || e.wellnessScore?.riskLevel === "critical").length,
    avgScore: employees.length
      ? Math.round(employees.reduce((s, e) => s + (e.wellnessScore?.score || 0), 0) / employees.length)
      : 0,
  };

  function exportToCSV() {
    const headers = ["الاسم الأول", "الاسم الأخير", "البريد", "القسم", "المسمى", "الدور", "الحالة", "درجة العافية", "مستوى المخاطر"];
    const rows = filtered.map((e) => [
      e.firstName, e.lastName, e.email, e.department || "", e.position || "",
      e.role, e.isActive ? "نشط" : "غير نشط",
      e.wellnessScore?.score ?? "", e.wellnessScore?.riskLevel ?? "",
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.map((c) => `"${c}"`).join(","))].join("\n");
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `employees-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-mid pt-24">
        <div className="container-shade py-6">
          <div className="fade-in-up mb-6">
            <SkeletonBlock width="200px" height="28px" />
            <div className="mt-2"><SkeletonBlock width="140px" height="14px" /></div>
          </div>
          <SkeletonKPIGrid count={4} />
          <div className="mt-6"><SkeletonTable rows={8} cols={7} /></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface-mid pt-24 pb-12">
        <div className="container-shade py-6">
          {/* Breadcrumb */}
          <div className="fade-in-up mb-5">
            <Link href="/dashboard/admin" className="text-sm text-emerald hover:underline inline-flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" /> العودة للوحة التحكم
            </Link>
          </div>

          {/* Header */}
          <div className="fade-in-up mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
                <Users className="h-7 w-7 text-emerald" />
                إدارة الموظفين
              </h1>
              <p className="text-secondary mt-1">جميع موظفي الشركة — {employees.length} موظف</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={exportToCSV}
                className="text-sm py-2.5 px-4 rounded-xl border border-[var(--surface-border)] text-secondary hover:text-primary hover:border-emerald/30 transition-all flex items-center gap-1.5"
              >
                <Download className="h-4 w-4" />
                تصدير CSV
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="btn-primary text-sm py-2.5 px-5"
              >
                <UserPlus className="ml-2 h-4 w-4" />
                إضافة موظف
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: "إجمالي الموظفين", value: stats.total, color: "from-blue-500 to-indigo-600" },
              { label: "نشط حالياً", value: stats.active, color: "from-emerald-500 to-emerald-600" },
              { label: "مخاطر عالية", value: stats.highRisk, color: "from-rose-500 to-pink-600" },
              { label: "متوسط العافية", value: `${stats.avgScore}%`, color: "from-amber-500 to-orange-600" },
            ].map((stat) => (
              <div key={stat.label} className="shade-card p-4">
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
                <p className="text-xs text-secondary">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Search & Filters */}
          <div className="fade-in-up mb-6 flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary pointer-events-none" />
              <input
                type="text"
                placeholder="بحث بالاسم أو البريد..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid pr-10 px-4 py-2 text-sm text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-emerald-ai/30"
              />
            </div>
            <select
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
              className="text-sm rounded-xl border border-[var(--surface-border)] bg-surface-mid px-3 py-2 text-secondary focus:outline-none focus:ring-2 focus:ring-emerald-ai/30"
            >
              <option value="all">📋 كل الأقسام</option>
              {departments.filter((d) => d !== "all").map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="text-sm rounded-xl border border-[var(--surface-border)] bg-surface-mid px-3 py-2 text-secondary focus:outline-none focus:ring-2 focus:ring-emerald-ai/30"
            >
              <option value="all">👤 كل الأدوار</option>
              {roles.filter((r) => r !== "all").map((r) => (
                <option key={r} value={r}>{roleLabels[r] || r}</option>
              ))}
            </select>
          </div>

          {/* Employees Table */}
          <div className="shade-card overflow-hidden">
            {filtered.length === 0 ? (
              <div className="text-center py-16 text-secondary">
                <Users className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p>لا يوجد موظفون مطابقون للبحث</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--surface-border)] bg-surface-mid/50">
                      <th className="text-right py-3 px-4 text-secondary font-medium">الموظف</th>
                      <th className="text-right py-3 px-4 text-secondary font-medium">القسم</th>
                      <th className="text-right py-3 px-4 text-secondary font-medium">الدور</th>
                      <th className="text-center py-3 px-4 text-secondary font-medium">العافية</th>
                      <th className="text-center py-3 px-4 text-secondary font-medium">الحالة</th>
                      <th className="text-center py-3 px-4 text-secondary font-medium">تاريخ الإضافة</th>
                      <th className="py-3 px-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((emp) => (
                      <tr key={emp.id} className="border-b border-[var(--surface-border)] last:border-0 hover:bg-[var(--white-warm)] transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                              emp.role === "SUPER_ADMIN" ? "bg-purple-500" :
                              emp.role === "COMPANY_ADMIN" ? "bg-rose-500" :
                              emp.role === "HR" ? "bg-blue-500" :
                              emp.role === "NUTRITIONIST" ? "bg-amber-500" :
                              emp.role === "RESTAURANT" ? "bg-gray-500" :
                              "bg-emerald-500"
                            }`}>
                              {emp.firstName[0]}
                            </div>
                            <div>
                              <p className="font-semibold text-primary">{emp.firstName} {emp.lastName}</p>
                              <p className="text-xs text-secondary flex items-center gap-1">
                                <Mail className="h-3 w-3" /> {emp.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-secondary">{emp.department || "—"}</td>
                        <td className="py-3 px-4">
                          <span className={`tag text-xs py-0.5 px-2.5 ${roleColors[emp.role] || "bg-gray-100 text-gray-700"}`}>
                            {roleLabels[emp.role] || emp.role}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          {emp.wellnessScore ? (
                            <span className={`font-bold ${
                              emp.wellnessScore.score >= 80 ? "text-emerald" :
                              emp.wellnessScore.score >= 60 ? "text-amber-500" :
                              "text-rose-500"
                            }`}>
                              {emp.wellnessScore.score}
                            </span>
                          ) : (
                            <span className="text-gray-300">—</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => toggleActive(emp)}
                            disabled={togglingId === emp.id}
                            className="transition-all"
                            title={emp.isActive ? "اضغط لتعطيل الحساب" : "اضغط لتفعيل الحساب"}
                          >
                            {togglingId === emp.id ? (
                              <Loader2 className="h-4 w-4 text-emerald mx-auto animate-spin" />
                            ) : emp.isActive ? (
                              <CheckCircle className="h-4 w-4 text-emerald mx-auto hover:scale-110 transition-transform" />
                            ) : (
                              <XCircle className="h-4 w-4 text-gray-300 mx-auto hover:text-red-400 hover:scale-110 transition-all" />
                            )}
                          </button>
                        </td>
                        <td className="py-3 px-4 text-center text-xs text-secondary">
                          {new Date(emp.createdAt).toLocaleDateString("ar-SA")}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Link href={`/dashboard/admin/employees/${emp.id}`} className="text-xs text-emerald hover:underline font-medium">عرض</Link>
                            <button
                              onClick={() => handleEditClick(emp)}
                              className="text-xs p-1 rounded-lg text-secondary hover:text-primary hover:bg-surface-mid transition-all"
                              title="تعديل سريع"
                            >
                              <Edit3 className="h-3 w-3" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-secondary">
              عرض {Math.min((page + 1) * pageSize, totalCount)} من {totalCount} موظف
              {filtered.length !== totalCount && ` (${filtered.length} بعد التصفية)`}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="text-xs py-1.5 px-3 rounded-lg border border-[var(--surface-border)] text-secondary hover:text-primary transition-all disabled:opacity-30"
              >
                السابق
              </button>
              {Array.from({ length: Math.min(Math.ceil(totalCount / pageSize), 5) }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`text-xs py-1.5 px-3 rounded-lg transition-all ${
                    page === i
                      ? "bg-emerald text-white"
                      : "border border-[var(--surface-border)] text-secondary hover:text-primary"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(Math.ceil(totalCount / pageSize) - 1, p + 1))}
                disabled={page >= Math.ceil(totalCount / pageSize) - 1}
                className="text-xs py-1.5 px-3 rounded-lg border border-[var(--surface-border)] text-secondary hover:text-primary transition-all disabled:opacity-30"
              >
                التالي
              </button>
            </div>
          </div>

          {/* ── Quick Edit Modal ── */}
          {showEditModal && editEmployee && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setShowEditModal(false)}>
              <div className="shade-card w-full max-w-md p-6 m-4" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-bold text-primary text-lg flex items-center gap-2">
                    <Edit3 className="h-5 w-5 text-emerald" /> تعديل {editEmployee.firstName} {editEmployee.lastName}
                  </h2>
                  <button onClick={() => setShowEditModal(false)} className="text-secondary hover:text-primary transition-colors">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="space-y-4">
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
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-primary">المسمى الوظيفي</label>
                    <input
                      type="text" value={editForm.position}
                      onChange={(e) => setEditForm((p) => ({ ...p, position: e.target.value }))}
                      placeholder="مطور برمجيات"
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
                      {Object.entries(roleLabels).filter(([k]) => k !== "SUPER_ADMIN").map(([k, v]) => (
                        <option key={k} value={k}>{v}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-3 pt-2">
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
                  </div>
                </div>
                <div className="flex gap-2 mt-6 pt-4 border-t border-[var(--surface-border)]">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 py-2.5 rounded-xl border border-[var(--surface-border)] text-secondary text-sm hover:text-primary transition-all"
                  >
                    إلغاء
                  </button>
                  <button
                    onClick={handleEditSave}
                    disabled={savingEdit}
                    className="flex-1 py-2.5 rounded-xl bg-emerald text-white text-sm font-semibold hover:bg-emerald-dark transition-all disabled:opacity-50 flex items-center justify-center gap-1"
                  >
                    {savingEdit ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    {savingEdit ? "جاري الحفظ..." : "حفظ"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
