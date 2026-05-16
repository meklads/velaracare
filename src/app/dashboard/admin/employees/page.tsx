"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Loader2, ChevronLeft, Users, Search, Plus, Filter,
  Mail, Phone, Building, Shield, MoreHorizontal, CheckCircle, XCircle, UserPlus
} from "lucide-react";

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

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/users");
        if (res.ok) setEmployees(await res.json());
      } catch (e) {
        console.error("Failed to load employees", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

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
    total: employees.length,
    active: employees.filter((e) => e.isActive).length,
    highRisk: employees.filter((e) => e.wellnessScore?.riskLevel === "high" || e.wellnessScore?.riskLevel === "critical").length,
    avgScore: employees.length
      ? Math.round(employees.reduce((s, e) => s + (e.wellnessScore?.score || 0), 0) / employees.length)
      : 0,
  };

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
            <button
              onClick={() => setShowAddModal(true)}
              className="btn-primary text-sm py-2.5 px-5"
            >
              <UserPlus className="ml-2 h-4 w-4" />
              إضافة موظف
            </button>
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
                          {emp.isActive ? (
                            <CheckCircle className="h-4 w-4 text-emerald mx-auto" />
                          ) : (
                            <XCircle className="h-4 w-4 text-gray-300 mx-auto" />
                          )}
                        </td>
                        <td className="py-3 px-4 text-center text-xs text-secondary">
                          {new Date(emp.createdAt).toLocaleDateString("ar-SA")}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Link href={`/dashboard/admin/employees/${emp.id}`} className="text-xs text-emerald hover:underline font-medium">عرض</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="mt-6 text-center text-xs text-secondary">
            عرض {filtered.length} من {employees.length} موظف
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
