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

          <div className="grid gap-4">
            {departments.map((d) => (
              <div key={d.dept} className="shade-card p-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-soft">
                    <Users className="h-6 w-6 text-emerald" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary">{d.dept}</h3>
                    <p className="text-sm text-secondary">{d.employees} موظف</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-sm text-secondary">درجة العافية</p>
                    <p className="text-xl font-bold text-primary">{d.score ?? "—"}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-secondary">المخاطر</p>
                    <span className={`tag text-xs py-0.5 px-3 ${
                      d.risk === "منخفض" ? "bg-emerald-soft text-emerald-dark" :
                      d.risk === "متوسط" ? "bg-amber-50 text-amber-600" :
                      "bg-rose-50 text-rose-600"
                    }`}>{d.risk}</span>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-secondary">الاتجاه</p>
                    <span className={`text-sm font-semibold flex items-center gap-1 ${
                      d.trend === "تصاعدي" ? "text-emerald" : d.trend === "تنازلي" ? "text-red-500" : "text-secondary"
                    }`}>
                      {d.trend === "تصاعدي" && <TrendingUp className="h-4 w-4" />}
                      {d.trend === "تنازلي" && <AlertTriangle className="h-4 w-4" />}
                      {d.trend}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
