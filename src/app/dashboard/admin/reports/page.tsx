"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Loader2, ChevronLeft, TrendingUp, Download, BarChart3, Heart, Users, AlertTriangle, Apple, Brain } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from "recharts";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  department: string | null;
  isActive: boolean;
  wellnessScore?: { score: number; riskLevel: string } | null;
};

type HRAResult = {
  id: string;
  riskLevel: string;
  completedAt: string;
};

export default function AdminReportsPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [hraHistory, setHraHistory] = useState<HRAResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [usersRes, hraRes] = await Promise.all([
          fetch("/api/users"),
          fetch("/api/hra"),
        ]);
        if (usersRes.ok) setUsers(await usersRes.json());
        if (hraRes.ok) {
          const data = await hraRes.json();
          setHraHistory(Array.isArray(data) ? data : []);
        }
      } catch (e) {
        console.error("Failed to load report data", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // ── Compute stats ──
  const activeUsers = users.filter((u) => u.isActive);
  const withScore = activeUsers.filter((u) => u.wellnessScore?.score);
  const avgWellness = withScore.length > 0
    ? Math.round(withScore.reduce((s, u) => s + (u.wellnessScore?.score || 0), 0) / withScore.length)
    : 0;

  const riskDist = { low: 0, moderate: 0, high: 0, critical: 0 };
  withScore.forEach((u) => {
    const rl = u.wellnessScore?.riskLevel || "low";
    if (rl in riskDist) riskDist[rl as keyof typeof riskDist]++;
  });

  const highRisk = withScore.filter((u) => u.wellnessScore?.riskLevel === "high" || u.wellnessScore?.riskLevel === "critical").length;

  // ── Department data ──
  const deptMap = new Map<string, number[]>();
  withScore.forEach((u) => {
    const dept = u.department || "بدون قسم";
    if (!deptMap.has(dept)) deptMap.set(dept, []);
    deptMap.get(dept)!.push(u.wellnessScore!.score);
  });
  const deptData = Array.from(deptMap.entries())
    .map(([dept, scores]) => ({
      dept,
      score: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
    }))
    .sort((a, b) => b.score - a.score);

  // ── Risk distribution for pie ──
  const riskData = [
    { name: "منخفض", value: riskDist.low, color: "#10B981" },
    { name: "متوسط", value: riskDist.moderate, color: "#F59E0B" },
    { name: "مرتفع", value: riskDist.high, color: "#F97316" },
    { name: "حرج", value: riskDist.critical, color: "#EF4444" },
  ].filter((d) => d.value > 0);

  // ── Trend data from HRA history ──
  const riskScoreMap: Record<string, number> = { low: 85, moderate: 65, high: 40, critical: 20 };
  const trendData = hraHistory
    .slice(-10)
    .map((h) => ({
      date: new Date(h.completedAt).toLocaleDateString("ar-SA", { day: "numeric", month: "short" }),
      score: riskScoreMap[h.riskLevel] || 50,
    }));

  const COLORS = ["#10B981", "#F59E0B", "#F97316", "#EF4444"];

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
          {/* Header */}
          <div className="fade-in-up mb-6">
            <Link href="/dashboard/admin" className="text-sm text-emerald hover:underline inline-flex items-center gap-1 mb-1">
              <ChevronLeft className="h-4 w-4" /> العودة للوحة التحكم
            </Link>
            <h1 className="text-2xl font-bold text-primary mt-1">📊 التحليلات والتقارير</h1>
            <p className="text-secondary mt-1">إحصائيات وتحليلات العافية المؤسسية</p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 fade-in-up-delay-1">
            {[
              { label: "متوسط العافية", value: `${avgWellness}%`, icon: Heart, change: `من ${withScore.length} موظف` },
              { label: "تم تقييمهم", value: `${withScore.length}`, icon: Users, change: `من أصل ${activeUsers.length} نشط` },
              { label: "مخاطر عالية", value: `${highRisk}`, icon: AlertTriangle, change: highRisk > 0 ? "يحتاج متابعة" : "آمن" },
              { label: "الأقسام", value: `${deptData.length}`, icon: BarChart3, change: `${users.filter(u => !u.department).length} بدون قسم` },
            ].map((kpi) => (
              <div key={kpi.label} className="shade-card p-5">
                <div className="flex items-center gap-2 mb-2">
                  <kpi.icon className="h-5 w-5 text-emerald" />
                  <span className="text-xs text-secondary">{kpi.change}</span>
                </div>
                <p className="stat-number text-primary text-3xl">{kpi.value}</p>
                <p className="text-xs text-secondary mt-1">{kpi.label}</p>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Department Bar Chart */}
            <div className="shade-card p-6 fade-in-up-delay-2">
              <h3 className="font-bold text-primary mb-4">🏢 مقارنة الأقسام</h3>
              {deptData.length === 0 ? (
                <div className="h-64 flex items-center justify-center text-secondary text-sm">لا توجد بيانات</div>
              ) : (
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={deptData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="dept" tick={{ fontSize: 11, fill: "var(--text-secondary)" }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "var(--text-secondary)" }} />
                    <Tooltip
                      contentStyle={{ borderRadius: "12px", border: "1px solid var(--border-primary)", background: "var(--bg-card)" }}
                      formatter={(value: any) => [`${Math.round(value as number)}%`, "درجة العافية"]}
                    />
                    <Bar dataKey="score" radius={[6, 6, 0, 0]} fill="var(--accent)">
                      {deptData.map((_, i) => (
                        <Cell key={i} fill={i === 0 ? "var(--accent)" : i === 1 ? "#06B6D4" : i === 2 ? "#F59E0B" : "var(--accent-sage)"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* Risk Distribution Pie */}
            <div className="shade-card p-6 fade-in-up-delay-3">
              <h3 className="font-bold text-primary mb-4">🔄 توزيع المخاطر</h3>
              {riskData.length === 0 ? (
                <div className="h-64 flex items-center justify-center text-secondary text-sm">لا توجد بيانات</div>
              ) : (
                <div className="flex items-center justify-center gap-6">
                  <ResponsiveContainer width={200} height={200}>
                    <PieChart>
                      <Pie data={riskData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                        {riskData.map((_, i) => (
                          <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ borderRadius: "12px", border: "1px solid var(--border-primary)", background: "var(--bg-card)" }}
                        formatter={(value: any, name: any) => [value, name]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2">
                    {riskData.map((d, i) => (
                      <div key={d.name} className="flex items-center gap-2 text-sm">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                        <span className="text-secondary">{d.name}</span>
                        <span className="font-semibold text-primary">{d.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Trend Chart */}
          <div className="shade-card p-6 mb-8 fade-in-up-delay-4">
            <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald" /> اتجاه العافية
            </h3>
            {trendData.length < 2 ? (
              <div className="h-64 flex items-center justify-center text-secondary text-sm">
                بيانات غير كافية — قم بإجراء تقييمين صحيين على الأقل لرؤية الاتجاه
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: "var(--text-secondary)" }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "var(--text-secondary)" }} />
                  <Tooltip
                    contentStyle={{ borderRadius: "12px", border: "1px solid var(--border-primary)", background: "var(--bg-card)" }}
                  />
                  <Line type="monotone" dataKey="score" stroke="var(--accent)" strokeWidth={3} dot={{ fill: "var(--accent)", strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Insights */}
          <div className="grid md:grid-cols-2 gap-6 fade-in-up-delay-4">
            <div className="shade-card p-6">
              <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                <Brain className="h-5 w-5 text-emerald" /> رؤى وتحليلات
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2 p-2 rounded-lg bg-emerald-500/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald mt-1.5 shrink-0" />
                  <span className="text-secondary">
                    <strong className="text-primary">{avgWellness}%</strong> متوسط درجة العافية بين <strong className="text-primary">{withScore.length}</strong> موظف
                  </span>
                </li>
                {highRisk > 0 && (
                  <li className="flex items-start gap-2 p-2 rounded-lg bg-amber-500/5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <span className="text-secondary">
                      <strong className="text-amber-500">{highRisk}</strong> موظف بمخاطر عالية/حرجة — يوصى بتدخل مبكر
                    </span>
                  </li>
                )}
                {deptData.length > 0 && deptData[deptData.length - 1] && (
                  <li className="flex items-start gap-2 p-2 rounded-lg bg-blue-500/5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                    <span className="text-secondary">
                      قسم <strong className="text-primary">{deptData[deptData.length - 1].dept}</strong> لديه أقل درجة عافية ({deptData[deptData.length - 1].score}%)
                    </span>
                  </li>
                )}
                <li className="flex items-start gap-2 p-2 rounded-lg bg-emerald-500/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald mt-1.5 shrink-0" />
                  <span className="text-secondary">
                    نسبة إكمال التقييم: <strong className="text-primary">{activeUsers.length > 0 ? Math.round((withScore.length / activeUsers.length) * 100) : 0}%</strong>
                  </span>
                </li>
              </ul>
            </div>

            <div className="shade-card p-6">
              <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                <Apple className="h-5 w-5 text-emerald" /> توصيات للشركة
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2 p-2 rounded-lg bg-emerald-500/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald mt-1.5 shrink-0" />
                  <span className="text-secondary">
                    {highRisk > 0
                      ? `برنامج تدخل مبكر لـ ${highRisk} موظف — استشارات تغذية ولياقة`
                      : "جميع الموظفين بمستوى مخاطر منخفض — استمر في البرامج الوقائية"}
                  </span>
                </li>
                <li className="flex items-start gap-2 p-2 rounded-lg bg-emerald-500/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald mt-1.5 shrink-0" />
                  <span className="text-secondary">
                    {deptData.filter((d) => d.score < 65).length > 0
                      ? `${deptData.filter((d) => d.score < 65).length} أقسام بحاجة لبرنامج تحسين عافية`
                      : "جميع الأقسام بمستوى عافية جيد"}
                  </span>
                </li>
                <li className="flex items-start gap-2 p-2 rounded-lg bg-emerald-500/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald mt-1.5 shrink-0" />
                  <span className="text-secondary">
                    {users.filter((u) => !u.wellnessScore?.score).length > 0
                      ? `${users.filter((u) => !u.wellnessScore?.score).length} موظف لم يقم بالتقييم — قم بدعوتهم`
                      : "جميع الموظفين قاموا بالتقييم الصحي"}
                  </span>
                </li>
                <li className="flex items-start gap-2 p-2 rounded-lg bg-emerald-500/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald mt-1.5 shrink-0" />
                  <span className="text-secondary">
                    قم بتفعيل خطط الوجبات الصحية لدعم العافية العامة للموظفين
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
