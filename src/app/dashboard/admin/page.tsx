import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Users, TrendingDown, Heart, Brain, Apple, Download } from "lucide-react";

export const metadata: Metadata = {
  title: "لوحة تحكم HR",
  description: "إدارة صحة موظفيك بذكاء",
};

export default function AdminDashboard() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface-mid pt-24">
        <div className="container-shade py-8">
          {/* Header */}
          <div className="fade-in-up mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-primary">لوحة تحكم الموارد البشرية</h1>
              <p className="text-secondary">شركة التطوير التقني | 240 موظف</p>
            </div>
            <Link href="/dashboard/admin/reports" className="btn-primary text-sm py-2 px-5">
              <Download className="ml-2 h-4 w-4" />
              تصدير التقرير
            </Link>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "درجة العافية الإجمالية", value: "72%", change: "+5%", icon: Heart, color: "from-rose-500 to-pink-600" },
              { label: "الموظفون المسجلون", value: "218", change: "+12", icon: Users, color: "from-blue-500 to-indigo-600" },
              { label: "المخاطر العالية", value: "18", change: "-3", icon: Brain, color: "from-emerald-ai to-emerald-ai-dark" },
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

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Risk Distribution */}
            <div className="shade-card p-6 fade-in-up-delay-2">
              <h3 className="font-bold text-primary mb-4">توزيع المخاطر الصحية</h3>
              <div className="space-y-4">
                {[
                  { label: "منخفض", value: 45, color: "bg-accent-soft" },
                  { label: "متوسط", value: 30, color: "bg-accent-soft" },
                  { label: "عالٍ", value: 15, color: "bg-orange-500" },
                  { label: "حرج", value: 3, color: "bg-red-500" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-secondary">{item.label}</span>
                      <span className="font-semibold text-primary">{item.value}%</span>
                    </div>
                    <div className="w-full bg-[var(--surface-border)] rounded-full h-2">
                      <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Department Comparison */}
            <div className="shade-card p-6 fade-in-up-delay-3">
              <h3 className="font-bold text-primary mb-4">مقارنة الأقسام</h3>
              <div className="space-y-4">
                {[
                  { dept: "تقنية المعلومات", score: 81 },
                  { dept: "الموارد البشرية", score: 75 },
                  { dept: "المبيعات", score: 68 },
                  { dept: "التسويق", score: 74 },
                  { dept: "الإدارة", score: 79 },
                ].map((d) => (
                  <div key={d.dept}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-secondary">{d.dept}</span>
                      <span className="font-semibold text-primary">{d.score}</span>
                    </div>
                    <div className="w-full bg-[var(--surface-border)] rounded-full h-1.5">
                      <div className="bg-emerald-gradient h-1.5 rounded-full" style={{ width: `${d.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Meals & Consultations */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="shade-card p-6 fade-in-up-delay-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-primary">طلبات الوجبات اليوم</h3>
                <Apple className="h-5 w-5 text-emerald" />
              </div>
              <p className="stat-number text-primary">142</p>
              <p className="text-xs text-[var(--text-muted)]">من أصل 240 موظف</p>
              <div className="w-full bg-[var(--surface-border)] rounded-full h-2 mt-2">
                <div className="bg-[var(--emerald-ai)] h-2 rounded-full" style={{ width: "59%" }} />
              </div>
              <Link href="/dashboard/admin/meals" className="btn-outline text-xs py-2 px-4 mt-4">
                إدارة الوجبات
              </Link>
            </div>

            <div className="shade-card p-6 fade-in-up-delay-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-primary">الاستشارات القادمة</h3>
                <Brain className="h-5 w-5 text-emerald" />
              </div>
              <div className="space-y-3">
                {[
                  { name: "محمد الأحمد", type: "تغذية", time: "10:30 ص" },
                  { name: "سارة العلي", type: "لياقة", time: "11:00 ص" },
                  { name: "خالد البدر", type: "تغذية", time: "2:00 م" },
                ].map((c) => (
                  <div key={c.name} className="flex items-center justify-between py-2 border-b border-[var(--surface-border)] last:border-0">
                    <div>
                      <p className="text-sm font-semibold text-primary">{c.name}</p>
                      <p className="text-xs text-[var(--text-muted)]">{c.type}</p>
                    </div>
                    <span className="text-xs font-medium text-emerald">{c.time}</span>
                  </div>
                ))}
              </div>
              <Link href="/dashboard/admin/consultations" className="btn-outline text-xs py-2 px-4 mt-4 w-full justify-center">
                عرض جميع الاستشارات
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
