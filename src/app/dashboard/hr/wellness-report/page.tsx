"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import { ChevronLeft, TrendingUp, Download, Loader2, Users, Heart, AlertTriangle, Activity, CheckCircle2 } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

type User = {
  id: string;
  isActive: boolean;
  department: string | null;
  wellnessScore?: { score: number; riskLevel: string } | null;
};

type Prediction = { type: string; probability: number; riskLevel: string };

const COLORS = { low: "#24A170", moderate: "#F59E0B", high: "#F97316", critical: "#EF4444" };
const RISK_LABELS: Record<string, string> = { low: "منخفض", moderate: "متوسط", high: "عالٍ", critical: "حرج" };

export default function WellnessReportPage() {
  const [data, setData] = useState<{
    avgWellness: number; totalUsers: number; highRisk: number; assessed: number;
    riskDist: { low: number; medium: number; high: number; critical: number };
    deptScores: { dept: string; score: number }[];
    predictions: Prediction[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [statsRes, usersRes, predRes] = await Promise.all([
          fetch("/api/dashboard/stats?scope=company"),
          fetch("/api/users"),
          fetch("/api/predictions"),
        ]);
        let avgWellness = 0, highRisk = 0, totalUsers = 0, assessed = 0;
        const riskDist = { low: 0, medium: 0, high: 0, critical: 0 };
        const deptMap = new Map<string, number[]>();
        const predictions: Prediction[] = [];

        if (statsRes.ok) {
          const stats = await statsRes.json();
          avgWellness = stats.avgWellness || 0;
          highRisk = stats.highRisk || 0;
        }

        if (usersRes.ok) {
          const users: User[] = await usersRes.json();
          totalUsers = users.filter((u) => u.isActive).length;
          users.forEach((u) => {
            if (u.wellnessScore?.score) {
              assessed++;
              const dept = u.department || "بدون قسم";
              if (!deptMap.has(dept)) deptMap.set(dept, []);
              deptMap.get(dept)!.push(u.wellnessScore.score);
              const rl = u.wellnessScore.riskLevel;
              if (rl === "low") riskDist.low++;
              else if (rl === "moderate" || rl === "medium") riskDist.medium++;
              else if (rl === "high") riskDist.high++;
              else if (rl === "critical") riskDist.critical++;
            }
          });
        }

        if (predRes.ok) {
          const pData = await predRes.json();
          if (Array.isArray(pData)) predictions.push(...pData);
        }

        const deptScores = Array.from(deptMap.entries())
          .map(([dept, scores]) => ({ dept, score: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) }))
          .sort((a, b) => b.score - a.score);

        setData({ avgWellness, totalUsers, highRisk, assessed, riskDist, deptScores, predictions });
      } catch (e) {
        console.error("Failed to load report data", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const months = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
  const currentMonth = months[new Date().getMonth()];
  const currentYear = new Date().getFullYear();

  const pieData = data ? [
    { name: "منخفض", value: data.riskDist.low, color: COLORS.low },
    { name: "متوسط", value: data.riskDist.medium, color: COLORS.moderate },
    { name: "عالٍ", value: data.riskDist.high, color: COLORS.high },
    { name: "حرج", value: data.riskDist.critical, color: COLORS.critical },
  ] : [];
  const totalRisk = pieData.reduce((a, b) => a + b.value, 0);

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
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-primary">📊 تقرير العافية الشهري</h1>
                <p className="text-secondary">{currentMonth} {currentYear}</p>
              </div>
              <button className="btn-primary text-sm py-2 px-5 opacity-60 cursor-not-allowed" disabled>
                <Download className="ml-2 h-4 w-4" /> تحميل PDF
              </button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid md:grid-cols-4 gap-4 mb-8 fade-in-up">
            {[
              { label: "متوسط العافية", value: data ? `${data.avgWellness}%` : "—", icon: Heart, change: data ? `${data.assessed} موظف` : "", color: "from-rose-500 to-pink-600" },
              { label: "معدل المشاركة", value: data && data.totalUsers > 0 ? `${Math.round((data.assessed / data.totalUsers) * 100)}%` : "0%", icon: Activity, change: data ? `${data.assessed} من ${data.totalUsers}` : "", color: "from-blue-500 to-indigo-600" },
              { label: "مخاطر مرتفعة", value: data ? `${data.highRisk}` : "—", icon: AlertTriangle, change: data && data.highRisk > 0 ? "يحتاج متابعة" : "لا توجد", color: "from-orange-500 to-red-600" },
              { label: "الموظفون", value: data ? `${data.totalUsers}` : "—", icon: Users, change: "إجمالي مسجل", color: "from-emerald to-emerald-600" },
            ].map((s, i) => (
              <div key={s.label} className={`shade-card p-5 ${i === 0 ? "fade-in-up-delay-1" : i === 1 ? "fade-in-up-delay-2" : i === 2 ? "fade-in-up-delay-3" : "fade-in-up-delay-4"}`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center`}>
                    <s.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className={`text-xs font-semibold ${(data?.highRisk ?? 0) > 0 && s.label === "مخاطر مرتفعة" ? "text-rose-500" : "text-emerald"}`}>
                    {s.change}
                  </span>
                </div>
                <p className="stat-number text-primary">{s.value}</p>
                <p className="text-xs text-[var(--text-muted)] mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Pie chart */}
            <div className="shade-card p-6 fade-in-up-delay-2">
              <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                <Heart className="h-5 w-5 text-emerald" /> توزيع المخاطر الصحية
              </h3>
              {data && data.assessed > 0 ? (
                <div className="flex items-center gap-6">
                  <ResponsiveContainer width={160} height={160}>
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value">
                        {pieData.map((entry, idx) => (
                          <Cell key={idx} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} موظف`, ""]} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2 flex-1">
                    {pieData.filter(d => d.value > 0).map(d => (
                      <div key={d.name} className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                          {d.name}
                        </span>
                        <span className="font-semibold">{Math.round((d.value / totalRisk) * 100)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-secondary text-center py-8">لا توجد بيانات تقييم بعد</p>
              )}
            </div>

            {/* Predictions */}
            <div className="shade-card p-6 fade-in-up-delay-3">
              <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald" /> توقعات المخاطر
              </h3>
              {data && data.predictions.length > 0 ? (
                <div className="space-y-3">
                  {data.predictions.filter(p => p.riskLevel === "high" || p.riskLevel === "critical").slice(0, 5).map((p, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-surface-mid">
                      <div>
                        <p className="text-sm font-medium text-primary">
                          {p.type === "obesity" ? "السمنة" : p.type === "diabetes" ? "السكري" : p.type === "burnout" ? "الاحتراق" : p.type === "productivity" ? "الإنتاجية" : p.type}
                        </p>
                        <p className="text-xs text-secondary">احتمالية {Math.round(p.probability * 100)}%</p>
                      </div>
                      <span className={`tag text-xs ${
                        p.riskLevel === "critical" ? "bg-red-100 text-red-600" : "bg-orange-100 text-orange-600"
                      }`}>{RISK_LABELS[p.riskLevel] || p.riskLevel}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-secondary text-center py-8">لا توجد توقعات متاحة</p>
              )}
            </div>
          </div>

          {/* Department Scores */}
          <div className="shade-card p-6 fade-in-up-delay-4 mb-6">
            <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5 text-emerald" /> درجات العافية حسب القسم
            </h3>
            {data && data.deptScores.length > 0 ? (
              <div className="space-y-3">
                {data.deptScores.map((d) => (
                  <div key={d.dept}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="font-medium text-primary">{d.dept}</span>
                      <span className="font-semibold text-primary">{d.score}%</span>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden">
                      <div className={`h-full rounded-full ${d.score >= 75 ? "bg-emerald" : d.score >= 60 ? "bg-amber-500" : "bg-rose-500"}`}
                        style={{ width: `${d.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-secondary text-center py-4">لا توجد بيانات أقسام</p>
            )}
          </div>

          {/* Recommendations */}
          <div className="shade-card p-6 fade-in-up-delay-4 text-center">
            <CheckCircle2 className="h-12 w-12 text-emerald mx-auto mb-4" />
            <h3 className="font-bold text-primary text-lg mb-2">تحسن مستمر في صحة الموظفين</h3>
            <p className="text-secondary max-w-lg mx-auto mb-4">
              {data && data.assessed > 0
                ? `متوسط العافية ${data.avgWellness}% بين ${data.assessed} موظف قاموا بالتقييم.`
                : "لم يقم الموظفون بالتقييم الصحي بعد. قم بدعوتهم لإجراء التقييم."}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {data && data.highRisk > 0 && (
                <Link href="/dashboard/hr/consultations" className="text-sm py-2 px-5 bg-rose-50 text-rose-600 rounded-xl font-medium hover:bg-rose-100 transition-colors">
                  جدولة استشارات للمخاطر العالية
                </Link>
              )}
              {data && data.assessed < data.totalUsers && (
                <Link href="/dashboard/hr/invite" className="text-sm py-2 px-5 bg-blue-50 text-blue-600 rounded-xl font-medium hover:bg-blue-100 transition-colors">
                  دعوة موظفين للتقييم
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
