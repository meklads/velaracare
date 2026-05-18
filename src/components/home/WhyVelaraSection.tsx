"use client";

import { Shield, Clock, Cpu, HeadphonesIcon, Award, RefreshCw, CheckCircle2, ArrowLeft, TrendingUp, Wrench, Heart, Users } from "lucide-react";
import Link from "next/link";

const differentiators = [
  {
    icon: Cpu,
    title: "هندسة دقيقة",
    desc: "نظامنا مبني على معايير هندسية دقيقة مع تكامل API مفتوح، قابلية توسع، وبنية تحتية سحابية موزعة.",
    stat: "99.95٪",
    statLabel: "uptime",
  },
  {
    icon: Clock,
    title: "استجابة فورية",
    desc: "متوسط وقت الاستجابة للدعم الفني أقل من 15 دقيقة. فرق الدعم متاحة 24/7/365.",
    stat: "< 15",
    statLabel: "دقيقة للاستجابة",
  },
  {
    icon: Shield,
    title: "موثوقية مؤسسية",
    desc: "جميع العمليات موثقة ومعتمدة. سجل تدقيق كامل، تقارير امتثال جاهزة، وشهادات أمان دولية.",
    stat: "4",
    statLabel: "شهادات أمان",
  },
  {
    icon: RefreshCw,
    title: "تحسين مستمر",
    desc: "تحديثات أسبوعية للنظام، تحسينات بناءً على تغذية راجعة، وتطوير مستمر للقدرات التنبؤية.",
    stat: "52",
    statLabel: "تحديث سنوياً",
  },
  {
    icon: Heart,
    title: "عناية مخصصة",
    desc: "كل مؤسسة تحصل على خطة صحية مخصصة حسب احتياجات قوتها العاملة — ليس حلّاً جاهزاً.",
    stat: "100٪",
    statLabel: "تخصيص",
  },
  {
    icon: Award,
    title: "كفاءة مثبتة",
    desc: "نتائج موثقة من شركات حقيقية: خفض التكاليف، تحسن الإنتاجية، ورضا الموظفين.",
    stat: "3.2x",
    statLabel: "متوسط ROI",
  },
];

const operationalMetrics = [
  { icon: Clock, label: "متوسط وقت الإعداد", value: "أقل من 24 ساعة" },
  { icon: Users, label: "حجم الفريق التشغيلي", value: "40+ مختص" },
  { icon: HeadphonesIcon, label: "الدعم الفني", value: "24/7/365" },
  { icon: TrendingUp, label: "تحسن سنوي", value: "+35٪ كفاءة" },
];

export default function WhyVelaraSection() {
  return (
    <>
      {/* Why Velara — Differentiation */}
      <section className="section-padding relative overflow-hidden" dir="rtl">
        <div className="absolute inset-0 vp-data-dots" />
        <div className="absolute inset-0 vp-grid-bg opacity-20" />

        <div className="container-shade relative z-10">
          <div className="mx-auto max-w-3xl text-center mb-12" data-vp-animate="fade-up">
            <span className="vp-tag-premium">لماذا Velara Care</span>
            <h2 className="vp-section-title mt-4">
              ليس مجرد نظام صحي —{' '}
              <span className="vp-hero-em">بنية تحتية مؤسسية</span>
            </h2>
            <div className="w-16 h-1 rounded-full bg-gradient-to-l from-[var(--vp-accent)] to-[var(--vp-cyan)] mx-auto mt-4" />
            <p className="vp-subtitle mt-4 text-[var(--text-secondary)] max-w-2xl mx-auto">
              المنافسون يقدمون حلولاً صحية. نحن نقدم نظاماً تشغيلياً متكاملاً — 
              فرق في الهندسة، التشغيل، الدعم، والنتائج.
            </p>
          </div>

          {/* Differentiators Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-vp-animate="fade-up" data-vp-delay="2">
            {differentiators.map((item) => (
              <div key={item.title} className="card-premium p-6 group relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-[var(--vp-accent)]/3 blur-2xl transition-all duration-500 group-hover:scale-150" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[var(--vp-glow-soft)] flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-[var(--vp-accent)]" />
                    </div>
                    <div className="text-left">
                      <span className="text-lg font-extrabold text-[var(--vp-accent)]">{item.stat}</span>
                      <p className="text-[10px] text-[var(--text-muted)]">{item.statLabel}</p>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{item.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Operational Metrics */}
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4" data-vp-animate="fade-up" data-vp-delay="3">
            {operationalMetrics.map((metric) => (
              <div key={metric.label} className="flex items-center gap-3 p-4 rounded-2xl bg-[var(--vp-glow-soft)] border border-[var(--vp-accent)]/5">
                <metric.icon className="h-5 w-5 text-[var(--vp-accent)] shrink-0" />
                <div>
                  <p className="text-sm font-bold text-[var(--text-primary)]">{metric.value}</p>
                  <p className="text-xs text-[var(--text-secondary)]">{metric.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center" data-vp-animate="fade-up" data-vp-delay="4">
            <Link href="/demo" className="btn-premium group">
              اكتشف الفرق التشغيلي
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
