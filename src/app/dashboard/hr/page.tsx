import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Users, Heart, Brain, TrendingDown, Apple, Calendar, Download, AlertTriangle, BarChart3, UserCheck, Activity } from "lucide-react";

export const metadata: Metadata = {
  title: "لوحة الموارد البشرية",
  description: "إدارة صحة وعافية الموظفين",
};

const departmentScores = [
  { dept: "تقنية المعلومات", score: 81, employees: 45, risk: "منخفض" },
  { dept: "الموارد البشرية", score: 75, employees: 12, risk: "منخفض" },
  { dept: "المبيعات", score: 62, employees: 68, risk: "متوسط" },
  { dept: "التسويق", score: 74, employees: 24, risk: "منخفض" },
  { dept: "الإدارة", score: 79, employees: 15, risk: "منخفض" },
  { dept: "الإنتاج", score: 55, employees: 76, risk: "مرتفع" },
];

const recentAlerts = [
  { name: "أحمد العمر", dept: "الإنتاج", type: "تقييم مكتمل", risk: "مرتفع", time: "منذ ساعة" },
  { name: "نورة الحسين", dept: "المبيعات", type: "حجز استشارة", risk: "متوسط", time: "منذ ساعتين" },
  { name: "فهد المطيري", dept: "تقنية المعلومات", type: "تحديث الملف الصحي", risk: "منخفض", time: "منذ ٣ ساعات" },
  { name: "سارة العنزي", dept: "التسويق", type: "طلب وجبة", risk: "منخفض", time: "منذ ٤ ساعات" },
  { name: "خالد الدوسري", dept: "الإنتاج", type: "تقييم مكتمل", risk: "حرج", time: "منذ ٥ ساعات" },
];

const upcomingConsultations = [
  { name: "محمد الأحمد", dept: "الإنتاج", type: "تغذية علاجية", time: "١٠:٣٠ ص", consultant: "د. أحمد" },
  { name: "سارة العلي", dept: "المبيعات", type: "لياقة بدنية", time: "١١:٠٠ ص", consultant: "مدرب خالد" },
  { name: "نورة العنزي", dept: "التسويق", type: "تغذية علاجية", time: "٣:٣٠ م", consultant: "د. سارة" },
];

export default function HRDashboard() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface-mid pt-24">
        <div className="container-shade py-8">

          {/* ── Header ── */}
          <div className="fade-in-up mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-primary">👥 لوحة الموارد البشرية</h1>
              <p className="text-secondary">شركة التطوير التقني | 240 موظف</p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/dashboard/hr/reports" className="btn-primary text-sm py-2 px-5">
                <Download className="ml-2 h-4 w-4" />
                تصدير التقرير
              </Link>
            </div>
          </div>

          {/* ── KPI Cards ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "درجة العافية الإجمالية", value: "72%", change: "+5%", icon: Heart, color: "from-rose-500 to-pink-600" },
              { label: "الموظفون المسجلون", value: "218", change: "+12", icon: Users, color: "from-blue-500 to-indigo-600" },
              { label: "المخاطر العالية", value: "18", change: "-3", icon: AlertTriangle, color: "from-orange-500 to-red-600" },
              { label: "توفير التأمين", value: "420ألف", change: "+18%", icon: TrendingDown, color: "from-emerald-ai to-emerald-ai-dark" },
            ].map((kpi, i) => (
              <div key={kpi.label} className={`shade-card p-5 fade-in-up-delay-${Math.min(i + 1, 4)}`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${kpi.color} flex items-center justify-center`}>
                    <kpi.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className={`text-sm font-semibold ${kpi.change.startsWith("+") ? "text-emerald" : "text-rose-500"}`}>
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
                    {departmentScores.map((d) => (
                      <tr key={d.dept} className="border-b border-[var(--surface-border)] last:border-0 hover:bg-[var(--white-warm)]">
                        <td className="py-3 font-semibold text-primary">{d.dept}</td>
                        <td className="py-3 text-secondary">{d.employees}</td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-primary">{d.score}</span>
                            <div className="w-16 bg-[var(--surface-border)] rounded-full h-1.5">
                              <div
                                className={`h-1.5 rounded-full ${
                                  d.score >= 75 ? "bg-emerald" : d.score >= 60 ? "bg-amber-500" : "bg-rose-500"
                                }`}
                                style={{ width: `${d.score}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="py-3">
                          <span className={`tag text-xs py-0.5 px-3 ${
                            d.risk === "منخفض" ? "bg-emerald-soft text-emerald-dark" :
                            d.risk === "متوسط" ? "bg-amber-50 text-amber-600" :
                            "bg-rose-50 text-rose-600"
                          }`}>
                            {d.risk}
                          </span>
                        </td>
                        <td className="py-3">
                          <Link href={`/dashboard/hr/department/${encodeURIComponent(d.dept)}`} className="text-xs text-emerald hover:underline">
                            تفاصيل
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Link href="/dashboard/hr/departments" className="btn-outline text-xs py-2 px-4 mt-4">
                عرض جميع الأقسام
              </Link>
            </div>

            {/* ── Right Column ── */}
            <div className="space-y-6">

              {/* ── Quick Actions ── */}
              <div className="shade-card p-6 fade-in-up-delay-3">
                <h3 className="font-bold text-primary mb-4">إجراءات سريعة</h3>
                <div className="space-y-3">
                  {[
                    { icon: UserCheck, label: "دعوة موظف جديد", href: "/dashboard/hr/invite", color: "text-emerald" },
                    { icon: Calendar, label: "جدولة استشارة", href: "/dashboard/hr/schedule", color: "text-cyan-400" },
                    { icon: Apple, label: "إدارة الوجبات", href: "/dashboard/hr/meals", color: "text-orange-400" },
                    { icon: Activity, label: "تقرير العافية الشهري", href: "/dashboard/hr/wellness-report", color: "text-indigo-400" },
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

              {/* ── Upcoming Consultations ── */}
              <div className="shade-card p-6 fade-in-up-delay-3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-primary">الاستشارات القادمة</h3>
                  <Calendar className="h-5 w-5 text-emerald" />
                </div>
                <div className="space-y-3">
                  {upcomingConsultations.map((c) => (
                    <div key={c.name} className="flex items-start gap-3 p-3 rounded-xl hover:bg-[var(--white-warm)]">
                      <div className="w-9 h-9 rounded-full bg-emerald-gradient text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {c.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-primary truncate">{c.name}</p>
                        <p className="text-xs text-[var(--text-muted)]">{c.dept} · {c.type}</p>
                        <p className="text-xs text-emerald">{c.time} مع {c.consultant}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/dashboard/hr/consultations" className="btn-outline text-xs py-2 px-4 mt-4 w-full justify-center">
                  عرض جميع الاستشارات
                </Link>
              </div>
            </div>
          </div>

          {/* ── Recent Alerts ── */}
          <div className="shade-card p-6 fade-in-up-delay-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-primary">آخر النشاطات</h3>
              <AlertTriangle className="h-5 w-5 text-amber-500" />
            </div>
            <div className="space-y-2">
              {recentAlerts.map((alert) => (
                <div key={alert.name} className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-[var(--white-warm)] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      alert.risk === "حرج" ? "bg-red-500" :
                      alert.risk === "مرتفع" ? "bg-orange-500" :
                      alert.risk === "متوسط" ? "bg-amber-500" :
                      "bg-emerald"
                    }`} />
                    <div>
                      <p className="text-sm font-semibold text-primary">{alert.name}</p>
                      <p className="text-xs text-[var(--text-muted)]">{alert.dept} · {alert.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`tag text-xs py-0.5 px-2 ${
                      alert.risk === "حرج" || alert.risk === "مرتفع" ? "bg-rose-50 text-rose-600" :
                      alert.risk === "متوسط" ? "bg-amber-50 text-amber-600" :
                      "bg-emerald-soft text-emerald-dark"
                    }`}>
                      {alert.risk}
                    </span>
                    <span className="text-xs text-[var(--text-muted)]">{alert.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/dashboard/hr/activity" className="btn-outline text-xs py-2 px-4 mt-4">
              عرض جميع النشاطات
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
