"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Brain,
  Sparkles,
  Apple,
  BarChart3,
  Users,
  TrendingDown,
  Heart,
  Activity,
  FileText,
  Shield,
  ArrowLeft,
} from "lucide-react";
import { initScrollAnimations } from "@/lib/scroll-animations";

const featuresDetailed = [
  {
    icon: Heart,
    title: "Health Risk Assessment (HRA)",
    desc: "يقوم الموظف بالإجابة على تقييم صحي ذكي خلال أقل من ٧ دقائق، يشمل مؤشرات النوم، النشاط، التغذية، الإجهاد، التاريخ العائلي، والوزن.",
  },
  {
    icon: Sparkles,
    title: "Predictive AI Engine",
    desc: "محرك تنبؤي يحلل البيانات الصحية ويصنف الموظفين إلى مستويات مخاطر مختلفة مع اقتراحات عملية للتدخل المبكر.",
  },
  {
    icon: Heart,
    title: "Wellness Score",
    desc: "رقم ذكي من ١٠٠ يعكس مستوى الصحة المؤسسية للفريق بالكامل ويساعد الإدارة على قياس التحسن شهرياً.",
  },
  {
    icon: Apple,
    title: "Smart Meal System",
    desc: "نظام توصية وجبات صحية حسب احتياجات كل موظف وربط مباشر مع مزودي الأغذية الصحية.",
  },
  {
    icon: Users,
    title: "Professional Consultations",
    desc: "إمكانية حجز استشارات تغذية ولياقة وصحة نفسية مباشرة من داخل المنصة.",
  },
  {
    icon: BarChart3,
    title: "Executive Dashboard",
    desc: "لوحة تنفيذية للإدارة تعرض مؤشرات الصحة المؤسسية والتكاليف المتوقعة والعائد على الاستثمار.",
  },
];

export default function FeaturesPage() {
  useEffect(() => { const c = initScrollAnimations(); return () => c(); }, []);

  return (
    <>
      <Header />
      <main>
        {/* ✦ HERO ✦ */}
        <section className="relative py-28 overflow-hidden bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)]" dir="rtl">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'var(--vp-gradient-hero)' }} />
          <div className="absolute inset-0 vp-grid-bg opacity-30" />
          <div className="container-shade relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[var(--vp-glow-soft)] border border-[var(--vp-accent)]/10 text-[var(--vp-accent)] text-sm font-medium mb-6" data-vp-animate="fade-up">
              <span className="vp-breathing-ring inline-block" style={{ width: '6px', height: '6px' }} />
              الميزات
            </div>
            <h1 className="vp-hero max-w-4xl mx-auto" data-vp-animate="fade-up" data-vp-delay="1">
              منصة متكاملة لإدارة صحة الموظفين
              <br />
              <span className="vp-hero-em">بالذكاء الاصطناعي</span>
            </h1>
            <p className="vp-subtitle text-[var(--text-secondary)] max-w-2xl mx-auto mt-6" data-vp-animate="fade-up" data-vp-delay="2">
              Velara Care تجمع بين التحليل الصحي، الذكاء الاصطناعي، الوجبات الصحية، والاستشارات المتخصصة داخل منصة واحدة قابلة للقياس والتوسع.
            </p>
          </div>
        </section>

        {/* ✦ FEATURES GRID ✦ */}
        <section className="section-padding relative overflow-hidden" dir="rtl">
          <div className="absolute inset-0 vp-grid-bg opacity-20" />
          <div className="container-shade relative z-10">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuresDetailed.map((f, i) => (
                <div key={f.title} className="card-premium p-6" data-vp-animate="fade-up" data-vp-delay={String(Math.min(i + 1, 4))}>
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--vp-glow-soft)] text-[var(--vp-accent)]">
                    <f.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">{f.title}</h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed text-sm">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ✦ CTA ✦ */}
        <section className="relative py-28 overflow-hidden" dir="rtl" style={{ background: 'var(--vp-gradient-dark)' }}>
          <div className="absolute inset-0 vp-grid-bg opacity-[0.03]" />
          <div className="absolute top-1/2 left-1/4 w-72 h-72 rounded-full bg-[var(--vp-accent)]/5 blur-3xl" />
          <div className="container-shade relative z-10">
            <div className="mx-auto max-w-2xl text-center" data-vp-animate="slide-up">
              <h2 className="vp-hero text-white mb-6">جاهز تجرب المنصة؟</h2>
              <p className="vp-subtitle text-white/70 max-w-xl mx-auto mb-10">احجز عرضاً تجريبياً مجاناً لمدة ١٤ يوماً</p>
              <Link href="/demo" className="btn-premium !bg-white !text-[var(--vp-ink)] group">
                اطلب عرضاً تجريبياً
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
