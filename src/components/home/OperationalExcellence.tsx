"use client";

import { Wrench, Clock, HeadphonesIcon, Shield, CheckCircle2, Truck, Search, Settings, ArrowLeft, Award, Users, BarChart3 } from "lucide-react";
import Link from "next/link";

/**
 * Operational Excellence Visualization
 * Shows the infrastructure, QA processes, and operational systems
 * that make Velara Care operationally different.
 */

const operationalPillars = [
  {
    icon: Search,
    title: "التشخيص الهندسي الدقيق",
    desc: "كل جهاز يخضع لفحص هندسي شامل باستخدام أحدث أجهزة التشخيص. فريق فني معتمد من كبرى الشركات المصنعة.",
    metrics: ["فحص ٣٢ نقطة لكل جهاز", "أجهزة تشخيص معتمدة", "كفاءات فنية معتمدة"],
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: Wrench,
    title: "الصيانة والإصلاح المتقدم",
    desc: "ورشة صيانة مجهزة بأحدث التقنيات. قطع غيار أصلية، ضمان معتمد، وجدولة صيانة دورية ذكية.",
    metrics: ["قطع غيار أصلية ١٠٠٪", "ضمان معتمد على جميع الإصلاحات", "جدولة صيانة ذكية"],
    color: "from-[var(--vp-accent)] to-[var(--vp-accent-dark)]",
  },
  {
    icon: Truck,
    title: "سلسلة توريد ولوجستيات",
    desc: "نظام لوجستي متكامل يضمن توفر الأجهزة وقطع الغيار في الوقت المناسب. مخزون استراتيجي يغطي جميع المناطق.",
    metrics: ["توصيل خلال ٢٤ ساعة", "مخزون استراتيجي", "تغطية جميع المناطق"],
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: HeadphonesIcon,
    title: "دعم فني 24/7/365",
    desc: "فريق دعم فني متخصص متاح على مدار الساعة. نظام تذاكر ذكي مع تصنيف آلي للأولويات ومتابعة لحظية.",
    metrics: ["استجابة < ١٥ دقيقة", "فريق متخصص ٢٤ ساعة", "نظام تذاكر ذكي"],
    color: "from-purple-500 to-violet-600",
  },
];

const qualityMetrics = [
  { icon: Clock, value: "٩٩.٧٪", label: "معدل الالتزام بمواعيد الصيانة" },
  { icon: CheckCircle2, value: "٩٨.٥٪", label: "رضا العملاء عن جودة الإصلاح" },
  { icon: Award, value: "٤٥+", label: "سنوات الخبرة التراكمية للفريق" },
  { icon: Settings, value: "١٢,٠٠٠+", label: "جهاز تمت صيانته" },
];

const workflowSteps = [
  { step: "١", title: "استقبال البلاغ", desc: "نظام تذاكر ذكي يصنف الأولوية ويسجل تفاصيل المشكلة", icon: HeadphonesIcon },
  { step: "٢", title: "التشخيص عن بُعد", desc: "فريق الدعم يجري تشخيصاً أولياً لتحديد المشكلة والحل المناسب", icon: Search },
  { step: "٣", title: "الجدولة والتنسيق", desc: "جدولة زيارة الصيانة في الوقت المناسب مع إرسال تأكيد للعميل", icon: Clock },
  { step: "٤", title: "التنفيذ والاختبار", desc: "الصيانة تجرى بمعايير دقيقة مع اختبار شامل بعد الإصلاح", icon: Wrench },
  { step: "٥", title: "المتابعة والضمان", desc: "متابعة مع العميل بعد الخدمة لضمان الرضا وجودة العمل", icon: Shield },
];

export default function OperationalExcellence() {
  return (
    <>
      {/* Operational Excellence Hero */}
      <section className="section-padding relative overflow-hidden" dir="rtl" style={{ background: 'var(--vp-gradient-dark)' }}>
        <div className="absolute inset-0 vp-grid-bg opacity-[0.03]" />
        <div className="absolute inset-0 vp-data-dots opacity-30" />
        <div className="absolute top-0 left-1/3 w-80 h-80 rounded-full bg-[var(--vp-accent)]/5 blur-3xl" />

        <div className="container-shade relative z-10">
          <div className="mx-auto max-w-3xl text-center mb-14" data-vp-animate="fade-up">
            <span className="vp-tag-premium vp-tag-white">التميز التشغيلي</span>
            <h2 className="vp-section-title text-white mt-4">
              ليس مجرد خدمة —{' '}
              <span className="text-[var(--vp-accent)]">نظام تشغيلي متكامل</span>
            </h2>
            <div className="vp-medical-divider my-4">
              <div className="vp-medical-divider-icon" />
            </div>
            <p className="vp-subtitle text-white/70 mt-4 max-w-2xl mx-auto">
              المنافسون يقدمون خدمات صيانة. نحن نقدم بنية تحتية تشغيلية — 
              فرق في التشخيص، الجودة، سرعة الاستجابة، والضمان.
            </p>
          </div>

          {/* Quality Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14" data-vp-animate="fade-up" data-vp-delay="2">
            {qualityMetrics.map((metric) => (
              <div key={metric.label} className="vp-stat-card text-center">
                <metric.icon className="h-5 w-5 text-[var(--vp-accent)] mx-auto mb-2" />
                <span className="text-2xl font-extrabold text-white">{metric.value}</span>
                <p className="text-xs text-white/60 mt-1">{metric.label}</p>
              </div>
            ))}
          </div>

          {/* Operational Pillars */}
          <div className="grid gap-6 lg:grid-cols-4" data-vp-animate="fade-up" data-vp-delay="3">
            {operationalPillars.map((pillar) => (
              <div key={pillar.title} className="card-premium !p-6 bg-white/5 border-white/10 hover:!border-[var(--vp-accent)]/30">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-4`}>
                  <pillar.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{pillar.title}</h3>
                <p className="text-sm text-white/70 mb-4 leading-relaxed">{pillar.desc}</p>
                <div className="space-y-2">
                  {pillar.metrics.map((m) => (
                    <div key={m} className="flex items-center gap-2 text-xs text-white/60">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[var(--vp-accent)] shrink-0" />
                      {m}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Workflow */}
      <section className="section-padding relative overflow-hidden" dir="rtl">
        <div className="absolute inset-0 vp-grid-bg opacity-20" />
        <div className="container-shade relative z-10">
          <div className="mx-auto max-w-3xl text-center mb-12" data-vp-animate="fade-up">
            <span className="vp-tag-premium">سير العمل</span>
            <h2 className="vp-section-title mt-4">
              من البلاغ إلى المتابعة —{' '}
              <span className="vp-hero-em">٥ خطوات دقيقة</span>
            </h2>
            <div className="w-16 h-1 rounded-full bg-gradient-to-l from-[var(--vp-accent)] to-[var(--vp-cyan)] mx-auto mt-4" />
            <p className="vp-subtitle mt-4 text-[var(--text-secondary)] max-w-2xl mx-auto">
              كل عملية صيانة تمر عبر نظام جودة صارم — من استقبال البلاغ إلى ضمان رضا العميل النهائي.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-5" data-vp-animate="fade-up" data-vp-delay="2">
            {workflowSteps.map((step, i) => (
              <div key={step.step} className="card-premium !p-5 text-center relative group">
                <div className="w-10 h-10 rounded-xl bg-[var(--vp-glow-soft)] flex items-center justify-center mx-auto mb-3 group-hover:bg-[var(--vp-glow-medium)] transition-colors">
                  <step.icon className="h-5 w-5 text-[var(--vp-accent)]" />
                </div>
                <div className="w-7 h-7 rounded-full bg-[var(--vp-accent)] text-white text-xs font-bold flex items-center justify-center mx-auto mb-2">
                  {step.step}
                </div>
                <h3 className="text-sm font-bold text-[var(--text-primary)] mb-1">{step.title}</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{step.desc}</p>
                {i < workflowSteps.length - 1 && (
                  <div className="hidden lg:block absolute -left-2 top-1/2 -translate-y-1/2 text-[var(--vp-accent)]/20">
                    <ArrowLeft className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 text-center" data-vp-animate="fade-up" data-vp-delay="3">
            <Link href="/about" className="btn-premium group">
              اكتشف معاييرنا التشغيلية
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
