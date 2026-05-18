"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Loader2, Users, Heart, TrendingDown, Apple, Calendar, AlertTriangle, BarChart3, UserCheck, Activity, Brain } from "lucide-react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { SkeletonDashboard } from "@/components/ui/skeleton";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  department: string | null;
  isActive: boolean;
  wellnessScore?: { score: number; riskLevel: string } | null;
};

export default function HRDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/users");
        if (res.ok) setUsers(await res.json());
      } catch (e) {
        console.error("Failed to load users", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Compute stats from real data
  const activeUsers = users.filter((u) => u.isActive);
  const totalEmployees = activeUsers.length;
  const avgWellness = activeUsers.length > 0
    ? Math.round(activeUsers.reduce((sum, u) => sum + (u.wellnessScore?.score || 0), 0) / activeUsers.length)
    : 0;
  const highRisk = activeUsers.filter((u) => u.wellnessScore?.riskLevel === "high" || u.wellnessScore?.riskLevel === "critical").length;
  const departmentMap = new Map<string, { count: number; scores: number[]; risks: string[] }>();
  activeUsers.forEach((u) => {
    const dept = u.department || "بدون قسم";
    if (!departmentMap.has(dept)) departmentMap.set(dept, { count: 0, scores: [], risks: [] });
    const d = departmentMap.get(dept)!;
    d.count++;
    if (u.wellnessScore?.score) d.scores.push(u.wellnessScore.score);
    if (u.wellnessScore?.riskLevel) d.risks.push(u.wellnessScore.riskLevel);
  });
  const departments = Array.from(departmentMap.entries()).map(([dept, data]) => ({
    dept,
    employees: data.count,
    score: data.scores.length > 0 ? Math.round(data.scores.reduce((a, b) => a + b, 0) / data.scores.length) : null,
    risk: data.risks.includes("critical") ? "حرج" : data.risks.includes("high") ? "مرتفع" : data.risks.includes("medium") ? "متوسط" : "منخفض",
  })).sort((a, b) => (b.score || 0) - (a.score || 0));

  if (loading) {
    return <SkeletonDashboard type="hr" />;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface-mid pt-24">
        <div className="container-shade py-8">

          {/* ── Header ── */}
          <div className="fade-in-up mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-primary">👥 لوحة الموارد البشرية</h1>
              <p className="text-secondary">{totalEmployees} موظف نشط</p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/dashboard/admin/employees" className="btn-primary text-sm py-2 px-5">
                <UserCheck className="ml-2 h-4 w-4" />
                إدارة الموظفين
              </Link>
            </div>
          </div>

          {/* ── KPI Cards ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "درجة العافية الإجمالية", value: `${avgWellness}%`, change: `${avgWellness > 70 ? "+" : ""}${avgWellness - 60 > 0 ? "+" : ""}${Math.abs(avgWellness - 60)}%`, icon: Heart, color: "from-rose-500 to-pink-600" },
              { label: "الموظفون المسجلون", value: `${totalEmployees}`, change: `${users.length} إجمالي`, icon: Users, color: "from-blue-500 to-indigo-600" },
              { label: "المخاطر العالية", value: `${highRisk}`, change: highRisk > 0 ? "يحتاج متابعة" : "آمن", icon: Brain, color: "from-orange-500 to-red-600" },
              { label: "الأقسام", value: `${departments.length}`, change: `${users.filter(u => !u.department).length} بدون قسم`, icon: BarChart3, color: "from-emerald-ai to-emerald-ai-dark" },
            ].map((kpi, i) => (
              <div key={kpi.label} className={`shade-card p-5 fade-in-up-delay-${Math.min(i + 1, 4)}`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${kpi.color} flex items-center justify-center`}>
                    <kpi.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className={`text-sm font-semibold ${typeof kpi.change === "string" && kpi.change.startsWith("+") ? "text-emerald" : "text-rose-500"}`}>
                    {kpi.change}
                  </span>
                </div>
                <p className="stat-number text-primary">{kpi.value}</p>
                <p className="text-xs text-[var(--text-muted)] mt-1">{kpi.label}</p>
              </div>
            ))}
          </div>

          {/* ── Main Grid ── */}
          <div className="grid lg:grid-cols-3 gap-6 mb-6">

            {/* ── Department Scores ── */}
            <div className="lg:col-span-2 shade-card p-6 fade-in-up-delay-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-primary">درجات العافية حسب القسم</h3>
                <BarChart3 className="h-5 w-5 text-emerald" />
              </div>
              {departments.length === 0 ? (
                <div className="text-center py-8 text-secondary">
                  <p>لا توجد بيانات أقسام متاحة</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[var(--surface-border)]">
                        <th className="text-right py-3 text-secondary font-medium">القسم</th>
                        <th className="text-right py-3 text-secondary font-medium">الموظفون</th>
                        <th className="text-right py-3 text-secondary font-medium">درجة العافية</th>
                        <th className="text-right py-3 text-secondary font-medium">مستوى المخاطر</th>
                        <th className="text-right py-3 text-secondary font-medium"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {departments.map((d) => (
                        <tr key={d.dept} className="border-b border-[var(--surface-border)] last:border-0 hover:bg-[var(--white-warm)]">
                          <td className="py-3 font-semibold text-primary">{d.dept}</td>
                          <td className="py-3 text-secondary">{d.employees}</td>
                          <td className="py-3">
                            {d.score !== null ? (
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-primary">{d.score}</span>
                                <div className="w-16 bg-[var(--surface-border)] rounded-full h-1.5">
                                  <div
                                    className={`h-1.5 rounded-full ${(d.score || 0) >= 75 ? "bg-emerald" : (d.score || 0) >= 60 ? "bg-amber-500" : "bg-rose-500"}`}
                                    style={{ width: `${d.score}%` }}
                                  />
                                </div>
                              </div>
                            ) : (
                              <span className="text-muted">—</span>
                            )}
                          </td>
                          <td className="py-3">
                            <span className={`tag text-xs py-0.5 px-3 ${
                              d.risk === "منخفض" ? "bg-emerald-500/10 text-emerald-400" :
                              d.risk === "متوسط" ? "bg-amber-500/10 text-amber-400" :
                              d.risk === "مرتفع" ? "bg-orange-500/10 text-orange-400" :
                              "bg-red-500/10 text-red-400"
                            }`}>
                              {d.risk}
                            </span>
                          </td>
                          <td className="py-3">
                            <Link href={`/dashboard/admin/employees?department=${encodeURIComponent(d.dept)}`} className="text-xs text-emerald hover:underline">
                              عرض الموظفين
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* ── Right Column ── */}
            <div className="space-y-6">

              {/* ── Quick Actions ── */}
              <div className="shade-card p-6 fade-in-up-delay-3">
                <h3 className="font-bold text-primary mb-4">إجراءات سريعة</h3>
                <div className="space-y-3">
                  {[
                    { icon: UserCheck, label: "إدارة الموظفين", href: "/dashboard/admin/employees", color: "text-emerald" },
                    { icon: Calendar, label: "الاستشارات", href: "/dashboard/admin/consultations", color: "text-cyan-400" },
                    { icon: Apple, label: "الوجبات الذكية", href: "/dashboard/admin/meals", color: "text-emerald-400" },
                    { icon: Activity, label: "المطعم", href: "/dashboard/restaurant", color: "text-indigo-400" },
                  ].map((action) => (
                    <Link
                      key={action.label}
                      href={action.href}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--white-warm)] transition-colors"
                    >
                      <action.icon className={`h-5 w-5 ${action.color}`} />
                      <span className="text-sm font-medium text-primary">{action.label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* ── High Risk Alerts ── */}
              <div className="shade-card p-6 fade-in-up-delay-3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-primary">تنبيهات المخاطر</h3>
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                </div>
                {highRisk === 0 ? (
                  <div className="text-center py-6 text-secondary">
                    <Heart className="h-8 w-8 mx-auto mb-2 text-emerald" />
                    <p className="text-sm">لا توجد مخاطر عالية حالياً</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {activeUsers.filter((u) => u.wellnessScore?.riskLevel === "high" || u.wellnessScore?.riskLevel === "critical").slice(0, 5).map((u) => (
                      <div key={u.id} className="flex items-center justify-between py-2 px-3 rounded-xl bg-red-500/5">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${u.wellnessScore?.riskLevel === "critical" ? "bg-red-500" : "bg-orange-500"}`} />
                          <div>
                            <p className="text-sm font-semibold text-primary">{u.firstName} {u.lastName}</p>
                            <p className="text-xs text-muted">{u.department || "بدون قسم"}</p>
                          </div>
                        </div>
                        <span className={`tag text-xs py-0.5 px-2 ${u.wellnessScore?.riskLevel === "critical" ? "bg-red-500/10 text-red-400" : "bg-orange-500/10 text-orange-400"}`}>
                          {u.wellnessScore?.riskLevel === "critical" ? "حرج" : "مرتفع"}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                <Link href="/dashboard/admin/employees" className="btn-outline text-xs py-2 px-4 mt-4 w-full justify-center block text-center rounded-xl hover:bg-[var(--white-warm)] transition-colors text-secondary border border-[var(--surface-border)]">
                  عرض جميع الموظفين
                </Link>
              </div>
            </div>
          </div>

          {/* ── Charts Section ── */}
          <div className="grid md:grid-cols-2 gap-6 mb-6 fade-in-up-delay-3">
            {/* Department Bar Chart */}
            <div className="shade-card p-6">
              <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-emerald" /> مقارنة الأقسام
              </h3>
              {departments.length === 0 ? (
                <p className="text-sm text-secondary text-center py-8">لا توجد بيانات</p>
              ) : (
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={departments} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                    <XAxis dataKey="dept" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: 'rgba(15,23,42,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                      formatter={(value: any) => [`${value}%`, 'درجة العافية']}
                    />
                    <Bar dataKey="score" radius={[6, 6, 0, 0]} maxBarSize={40}>
                      {departments.map((entry, idx) => {
                        const colors = ['#24A170', '#3DBB84', '#8ED2B7', '#1C7E57', '#155F41', '#EAF7F2'];
                        return <Cell key={idx} fill={colors[idx % colors.length]} />;
                      })}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* Risk Distribution Pie Chart */}
            <div className="shade-card p-6">
              <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                <Heart className="h-5 w-5 text-emerald" /> توزيع المخاطر
              </h3>
              {(() => {
                const low = activeUsers.filter(u => u.wellnessScore?.riskLevel === 'low').length;
                const medium = activeUsers.filter(u => u.wellnessScore?.riskLevel === 'medium').length;
                const high = activeUsers.filter(u => u.wellnessScore?.riskLevel === 'high').length;
                const critical = activeUsers.filter(u => u.wellnessScore?.riskLevel === 'critical').length;
                const hasData = low + medium + high + critical > 0;
                const pieData = [
                  { name: 'منخفض', value: low, color: '#24A170' },
                  { name: 'متوسط', value: medium, color: '#F59E0B' },
                  { name: 'مرتفع', value: high, color: '#F97316' },
                  { name: 'حرج', value: critical, color: '#EF4444' },
                ].filter(d => d.value > 0);
                return hasData ? (
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value">
                        {pieData.map((entry, idx) => (
                          <Cell key={idx} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ backgroundColor: 'rgba(15,23,42,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                        formatter={(value: any, name: any) => [`${value} موظف`, name]}
                      />
                      <Legend
                        verticalAlign="bottom"
                        formatter={(value: string) => <span style={{ color: '#94A3B8', fontSize: '12px' }}>{value}</span>}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-sm text-secondary text-center py-8">لا توجد بيانات مخاطر</p>
                );
              })()}
            </div>
          </div>

          {/* ── Health Recommendations ── */}
          <div className="shade-card p-6 fade-in-up-delay-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-primary">🧠 توصيات الصحة والعافية</h3>
              <Heart className="h-5 w-5 text-emerald" />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  title: "برامج الوقاية",
                  desc: `${highRisk} موظفاً بحاجة لبرامج تدخل مبكر — يوصى بعمل فحوصات دورية وتوفير استشارات تغذية`,
                  icon: "🛡️",
                },
                {
                  title: "تحسين العافية",
                  desc: departments.filter(d => d.score && d.score < 65).length > 0
                    ? `قسم ${departments.filter(d => d.score && d.score < 65)[0]?.dept} بحاجة لبرنامج تحسين عافية — العافية أقل من 65%`
                    : "جميع الأقسام بمستوى عافية جيد — استمر في البرامج الحالية",
                  icon: "📈",
                },
                {
                  title: "التغذية الذكية",
                  desc: `${users.length > 0 ? Math.round(users.filter(u => u.wellnessScore?.score && u.wellnessScore.score < 70).length / users.length * 100) : 0}% من الموظفين بحاجة لتحسين التغذية — قم بتفعيل خطط الوجبات الصحية`,
                  icon: "🍎",
                },
              ].map((rec) => (
                <div key={rec.title} className="p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.05] transition-colors">
                  <span className="text-2xl block mb-2">{rec.icon}</span>
                  <h4 className="text-sm font-semibold text-primary mb-1">{rec.title}</h4>
                  <p className="text-xs text-secondary leading-relaxed">{rec.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
