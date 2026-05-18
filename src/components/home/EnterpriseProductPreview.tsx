"use client";

import { BarChart3, TrendingDown, Users, Brain, ArrowLeft, Activity, DollarSign, LineChart, PieChart, AlertTriangle } from "lucide-react";
import Link from "next/link";

/**
 * Enterprise Product Preview
 * Realistic-looking dashboard previews that make the platform feel real and deep.
 */

const dashboardMetrics = [
  { label: "Wellness Score", value: "٧٨", change: "+١٢٪", color: "text-[var(--vp-accent)]" },
  { label: "مخاطر عالية", value: "١٤", change: "-٢٣٪", color: "text-amber-500" },
  { label: "موظفون نشطون", value: "٨٤٢", change: "+٥٪", color: "text-blue-500" },
  { label: "توفير متوقع", value: "٢.٤م", change: "ر.س", color: "text-[var(--vp-accent)]" },
];

const riskData = [
  { level: "منخفض", pct: 45, color: "bg-[var(--vp-accent)]" },
  { level: "متوسط", pct: 30, color: "bg-amber-500" },
  { level: "مرتفع", pct: 18, color: "bg-orange-500" },
  { level: "حرج", pct: 7, color: "bg-red-500" },
];

export default function EnterpriseProductPreview() {
  return (
    <section className="section-padding relative overflow-hidden" dir="rtl" style={{ background: 'var(--vp-gradient-dark)' }}>
      <div className="absolute inset-0 vp-grid-bg opacity-[0.04]" />
      <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full bg-[var(--vp-accent)]/5 blur-3xl" />

      <div className="container-shade relative z-10">
        <div className="mx-auto max-w-3xl text-center mb-12" data-vp-animate="fade-up">
          <span className="vp-label text-white/60">المنصة</span>
          <h2 className="vp-section-title text-white mt-4">
            لوحة تحكم تنفيذية لصحة{' '}
            <span className="text-[var(--vp-accent)]">القوى العاملة</span>
          </h2>
          <div className="w-16 h-1 rounded-full bg-gradient-to-l from-[var(--vp-accent)] to-[var(--vp-cyan)] mx-auto mt-4" />
          <p className="vp-subtitle text-white/70 mt-4 max-w-2xl mx-auto">
            بيانات حية، تحليلات تنبؤية، ومؤشرات أداء مصممة لصناع القرار —
            ليس فقط لتقارير الموارد البشرية.
          </p>
        </div>

        {/* Enterprise Dashboard Preview */}
        <div className="relative" data-vp-animate="fade-up" data-vp-delay="2">
          {/* Main Dashboard Card */}
          <div className="card-premium !p-0 overflow-hidden border-[var(--vp-accent)]/10">
            {/* Dashboard Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-primary)] bg-[var(--vp-glow-soft)]">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--vp-accent)]">
                  <BarChart3 className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[var(--text-primary)]">لوحة الصحة المؤسسية</p>
                  <p className="text-[10px] text-[var(--text-secondary)]">آخر تحديث: منذ ٣ دقائق</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--vp-accent)] vp-pulse-glow" />
                <span className="text-xs text-[var(--vp-accent)] font-medium">نشط</span>
              </div>
            </div>

            {/* KPI Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--border-primary)]">
              {dashboardMetrics.map((metric) => (
                <div key={metric.label} className="bg-[var(--bg-card)] p-5">
                  <p className="text-xs text-[var(--text-secondary)] mb-1">{metric.label}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-[var(--text-primary)]">{metric.value}</span>
                    <span className={`text-xs font-semibold ${metric.color}`}>{metric.change}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Area */}
            <div className="grid md:grid-cols-2 gap-px bg-[var(--border-primary)]">
              {/* Risk Distribution */}
              <div className="bg-[var(--bg-card)] p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold text-[var(--text-primary)]">توزيع المخاطر</h4>
                  <PieChart className="h-4 w-4 text-[var(--text-secondary)]" />
                </div>
                <div className="space-y-3">
                  {riskData.map((item) => (
                    <div key={item.level}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-[var(--text-secondary)]">{item.level}</span>
                        <span className="font-semibold text-[var(--text-primary)]">{item.pct}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[var(--border-primary)] overflow-hidden">
                        <div className={`h-full rounded-full ${item.color} transition-all duration-700`} style={{ width: `${item.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trend Preview */}
              <div className="bg-[var(--bg-card)] p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold text-[var(--text-primary)]">اتجاه العافية الشهري</h4>
                  <LineChart className="h-4 w-4 text-[var(--text-secondary)]" />
                </div>
                <div className="h-32 flex items-end gap-2">
                  {[60, 65, 58, 67, 72, 68, 75, 78, 80, 76, 82, 85].map((val, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full rounded-t-md bg-gradient-to-t from-[var(--vp-accent)]/40 to-[var(--vp-accent)]/80 transition-all duration-500"
                        style={{ height: `${(val / 100) * 100}%` }}
                      />
                      <span className="text-[8px] text-[var(--text-secondary)]">
                        {['ي', 'ف', 'م', 'أ', 'م', 'ي', 'ي', 'أ', 'س', 'أ', 'ن', 'د'][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Row: Smart Recommendations */}
            <div className="bg-[var(--bg-card)] p-5 border-t border-[var(--border-primary)]">
              <div className="flex items-center gap-2 mb-3">
                <Brain className="h-4 w-4 text-[var(--vp-accent)]" />
                <span className="text-xs font-bold text-[var(--text-primary)]">توصيات ذكية من AI</span>
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { icon: AlertTriangle, text: "١٤ موظفاً بمخاطر عالية — يوصى بتفعيل برنامج تدخل مبكر", color: "text-amber-500" },
                  { icon: TrendingDown, text: "قسم المبيعات بحاجة لتحسين عافية — الدرجة ٥٤٪", color: "text-rose-500" },
                  { icon: DollarSign, text: "التوفير المتوقع ٢.٤م ر.س في التكاليف التأمينية هذا الربع", color: "text-[var(--vp-accent)]" },
                ].map((rec) => (
                  <div key={rec.text} className="flex items-start gap-2 p-2.5 rounded-xl bg-[var(--vp-glow-soft)]">
                    <rec.icon className={`h-4 w-4 ${rec.color} shrink-0 mt-0.5`} />
                    <span className="text-xs text-[var(--text-secondary)]">{rec.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating badge */}
          <div className="absolute -top-3 -left-3 px-4 py-1.5 rounded-full bg-[var(--vp-accent)] text-white text-xs font-bold shadow-lg shadow-[var(--vp-accent)]/30">
            Enterprise Dashboard
          </div>
        </div>

        <div className="mt-10 text-center" data-vp-animate="fade-up" data-vp-delay="3">
          <Link href="/features" className="btn-premium group">
            استكشف جميع الميزات
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
