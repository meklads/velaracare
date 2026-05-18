"use client";

import { TrendingDown, DollarSign, BarChart3, Users, ArrowLeft, CheckCircle2, Target, Shield, Building2 } from "lucide-react";
import Link from "next/link";

const financialStats = [
  {
    icon: DollarSign,
    value: "2.4",
    suffix: "مليون ر.س",
    label: "توفير سنوي متوقع",
    desc: "لشركة متوسطة 500 موظف",
    color: "from-[var(--vp-accent)] to-[var(--vp-accent-dark)]",
  },
  {
    icon: TrendingDown,
    value: "40",
    suffix: "%",
    label: "خفض التكاليف التأمينية",
    desc: "خلال 12 شهراً من التطبيق",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: BarChart3,
    value: "3.2",
    suffix: "x",
    label: "العائد على الاستثمار",
    desc: "ROI لكل ريال مدفوع",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Users,
    value: "32",
    suffix: "%",
    label: "تحسن الإنتاجية",
    desc: "انخفاض الإجازات المرضية",
    color: "from-purple-500 to-violet-600",
  },
];

const caseStudy = {
  company: "شركة التقنية المتقدمة",
  industry: "تقنية معلومات",
  employees: "450",
  period: "12 شهراً",
  results: [
    { label: "خفض التكاليف التأمينية", value: "38٪" },
    { label: "انخفاض الإجازات المرضية", value: "42٪" },
    { label: "تحسن Wellness Score", value: "+24 نقطة" },
    { label: "رضا الموظفين", value: "94٪" },
  ],
};

export default function FinancialImpactSection() {
  return (
    <>
      {/* Financial Stats */}
      <section className="section-padding relative overflow-hidden" dir="rtl" style={{ background: 'var(--vp-gradient-dark)' }}>
        <div className="absolute inset-0 vp-grid-bg opacity-[0.03]" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-[var(--vp-accent)]/8 blur-3xl" />

        <div className="container-shade relative z-10">
          <div className="mx-auto max-w-3xl text-center mb-12" data-vp-animate="fade-up">
            <span className="vp-label text-white/60">الأثر المالي</span>
            <h2 className="vp-section-title text-white mt-4">
              الصحة ليست مصروفاً — إنها{' '}
              <span className="text-[var(--vp-accent)]">استثمار استراتيجي</span>
            </h2>
            <div className="w-16 h-1 rounded-full bg-gradient-to-l from-[var(--vp-accent)] to-[var(--vp-cyan)] mx-auto mt-4" />
            <p className="vp-subtitle text-white/70 mt-4 max-w-2xl mx-auto">
              كل ريال تستثمره في صحة موظفيك يعود عليك بأكثر من 3 أضعاف — 
              عبر خفض التكاليف التأمينية، زيادة الإنتاجية، وتقليل الغياب.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" data-vp-animate="fade-up" data-vp-delay="2">
            {financialStats.map((stat) => (
              <div key={stat.label} className="card-premium !p-6 text-center bg-white/5 border-white/10 hover:!border-[var(--vp-accent)]/30">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl font-extrabold text-white">{stat.value}</span>
                  <span className="text-sm font-semibold text-[var(--vp-accent)]">{stat.suffix}</span>
                </div>
                <p className="text-sm font-bold text-white mt-2">{stat.label}</p>
                <p className="text-xs text-white/60 mt-1">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="section-padding relative overflow-hidden" dir="rtl">
        <div className="absolute inset-0 vp-grid-bg opacity-20" />
        <div className="container-shade relative z-10">
          <div className="mx-auto max-w-3xl text-center mb-12" data-vp-animate="fade-up">
            <span className="vp-label">دراسة حالة</span>
            <h2 className="vp-section-title mt-4">
              نتائج حقيقية من{' '}
              <span className="vp-hero-em">عميل حقيقي</span>
            </h2>
            <div className="w-16 h-1 rounded-full bg-gradient-to-l from-[var(--vp-accent)] to-[var(--vp-cyan)] mx-auto mt-4" />
          </div>

          <div className="max-w-4xl mx-auto" data-vp-animate="fade-up" data-vp-delay="2">
            <div className="card-premium p-8">
              {/* Company Header */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[var(--border-primary)]">
                <div className="w-14 h-14 rounded-2xl bg-[var(--vp-accent)] flex items-center justify-center">
                  <Building2 className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)]">{caseStudy.company}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {caseStudy.industry} — {caseStudy.employees} موظف — {caseStudy.period}
                  </p>
                </div>
              </div>

              {/* Results Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {caseStudy.results.map((result) => (
                  <div key={result.label} className="text-center p-4 rounded-2xl bg-[var(--vp-glow-soft)]">
                    <p className="text-2xl font-extrabold text-[var(--vp-accent)]">{result.value}</p>
                    <p className="text-xs text-[var(--text-secondary)] mt-1">{result.label}</p>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="mt-6 p-4 rounded-2xl bg-[var(--vp-glow-soft)] border border-[var(--vp-accent)]/10">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-[var(--vp-accent)] shrink-0 mt-0.5" />
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    بعد تطبيق منصة Velara Care لمدة 12 شهراً، تمكنت الشركة من خفض التكاليف التأمينية بنسبة 38٪ 
                    وتحسين إنتاجية الموظفين بشكل ملحوظ. النظام مكن فريق الموارد البشرية من اكتشاف 
                    27 حالة صحية حرجة مبكراً وتقديم التدخل المناسب قبل تطور الحالات.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center" data-vp-animate="fade-up" data-vp-delay="3">
            <Link href="/demo" className="btn-premium group">
              احصل على دراسة حالة مخصصة لشركتك
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
