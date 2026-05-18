"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Loader2, ChevronLeft, Users, TrendingUp, AlertTriangle } from "lucide-react";

type User = { id: string; firstName: string; lastName: string; department: string | null; wellnessScore?: { score: number; riskLevel: string } | null };

export default function DepartmentsPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/users");
        if (res.ok) setUsers(await res.json());
      } catch (e) {
        console.error("Failed to load departments data", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Group by department
  const deptMap = new Map<string, { employees: User[]; scores: number[] }>();
  users.forEach((u) => {
    const dept = u.department || "بدون قسم";
    if (!deptMap.has(dept)) deptMap.set(dept, { employees: [], scores: [] });
    const d = deptMap.get(dept)!;
    d.employees.push(u);
    if (u.wellnessScore?.score) d.scores.push(u.wellnessScore.score);
  });

  const departments = Array.from(deptMap.entries()).map(([dept, data]) => {
    const avgScore = data.scores.length > 0 ? Math.round(data.scores.reduce((a, b) => a + b, 0) / data.scores.length) : null;
    const risk = avgScore ? (avgScore >= 75 ? "منخفض" : avgScore >= 60 ? "متوسط" : "مرتفع") : "—";
    const trend = avgScore ? (avgScore > 70 ? "تصاعدي" : avgScore > 55 ? "مستقر" : "تنازلي") : "—";
    return { dept, employees: data.employees.length, score: avgScore, risk, trend };
  }).sort((a, b) => (b.score || 0) - (a.score || 0));

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
      <main className="min-h-screen bg-surface-mid pt-24">
        <div className="container-shade py-8">
          <div className="fade-in-up mb-8">
            <Link href="/dashboard/hr" className="text-sm text-emerald hover:underline inline-flex items-center gap-1 mb-2">
              <ChevronLeft className="h-4 w-4" /> العودة للوحة التحكم
            </Link>
            <h1 className="text-2xl font-bold text-primary">🏢 الأقسام</h1>
            <p className="text-secondary">درجات العافية حسب القسم</p>
          </div>

          {departments.length === 0 ? (
            <div className="text-center py-20">
              <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-lg font-medium text-primary">لا توجد أقسام</p>
              <p className="text-sm text-secondary">لم يتم تعيين أقسام للموظفين بعد</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Summary Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <div className="shade-card p-4 text-center">
                  <p className="text-2xl font-bold text-primary">{departments.length}</p>
                  <p className="text-xs text-secondary">إجمالي الأقسام</p>
                </div>
                <div className="shade-card p-4 text-center">
                  <p className="text-2xl font-bold text-emerald">{departments.reduce((a, b) => a + b.employees, 0)}</p>
                  <p className="text-xs text-secondary">إجمالي الموظفين</p>
                </div>
                <div className="shade-card p-4 text-center">
                  <p className="text-2xl font-bold text-primary">
                    {departments.filter(d => d.score !== null).length > 0
                      ? Math.round(departments.filter(d => d.score !== null).reduce((a, b) => a + (b.score || 0), 0) / departments.filter(d => d.score !== null).length)
                      : "—"}
                  </p>
                  <p className="text-xs text-secondary">متوسط العافية</p>
                </div>
                <div className="shade-card p-4 text-center">
                  <p className="text-2xl font-bold text-amber-500">{departments.filter(d => d.risk === "مرتفع").length}</p>
                  <p className="text-xs text-secondary">أقسام بمخاطر مرتفعة</p>
                </div>
              </div>

              {/* Department Cards */}
              {departments.map((d) => (
                <div key={d.dept} className="shade-card p-6 hover:shadow-lg transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                        d.risk === "منخفض" ? "bg-emerald-soft" : d.risk === "متوسط" ? "bg-amber-50" : "bg-rose-50"
                      }`}>
                        <Users className={`h-7 w-7 ${
                          d.risk === "منخفض" ? "text-emerald" : d.risk === "متوسط" ? "text-amber-500" : "text-rose-500"
                        }`} />
                      </div>
                      <div>
                        <h3 className="font-bold text-primary text-lg">{d.dept}</h3>
                        <p className="text-sm text-secondary">{d.employees} موظف</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 flex-wrap">
                      {/* Score with circular progress */}
                      <div className="flex items-center gap-3">
                        <div className="relative w-14 h-14">
                          <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
                            <circle cx="28" cy="28" r="24" fill="none" stroke="#e5e7eb" strokeWidth="4" />
                            <circle cx="28" cy="28" r="24" fill="none"
                              stroke={d.score && d.score >= 75 ? "#24A170" : d.score && d.score >= 60 ? "#F59E0B" : "#EF4444"}
                              strokeWidth="4"
                              strokeDasharray={`${2 * Math.PI * 24}`}
                              strokeDashoffset={`${2 * Math.PI * 24 * (1 - ((d.score || 0) / 100))}`}
                              strokeLinecap="round"
                            />
                          </svg>
                          <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-primary">
                            {d.score ?? "—"}
                          </span>
                        </div>
                        <div>
                          <p className="text-xs text-secondary">العافية</p>
                          <span className={`tag text-xs py-0.5 px-2.5 font-medium ${
                            d.risk === "منخفض" ? "bg-emerald-soft text-emerald-dark" :
                            d.risk === "متوسط" ? "bg-amber-50 text-amber-600" :
                            "bg-rose-50 text-rose-600"
                          }`}>{d.risk}</span>
                        </div>
                      </div>

                      {/* Trend */}
                      <div className="text-center px-4 border-r border-[var(--surface-border)]">
                        <p className="text-xs text-secondary mb-1">الاتجاه</p>
                        <span className={`text-sm font-semibold flex items-center gap-1 ${
                          d.trend === "تصاعدي" ? "text-emerald" : d.trend === "تنازلي" ? "text-red-500" : "text-secondary"
                        }`}>
                          {d.trend === "تصاعدي" && <TrendingUp className="h-4 w-4" />}
                          {d.trend === "تنازلي" && <AlertTriangle className="h-4 w-4" />}
                          {d.trend}
                        </span>
                      </div>

                      {/* Score bar */}
                      <div className="flex-1 min-w-[150px]">
                        <p className="text-xs text-secondary mb-1">درجة العافية</p>
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden">
                          <div className={`h-full rounded-full ${
                            d.score && d.score >= 75 ? "bg-emerald" : d.score && d.score >= 60 ? "bg-amber-500" : "bg-rose-500"
                          }`} style={{ width: `${d.score || 0}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
