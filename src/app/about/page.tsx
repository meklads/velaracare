"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Heart, Users, TrendingDown, Sparkles, Shield, ArrowLeft, Target, Eye, BarChart3 } from "lucide-react";
import { initScrollAnimations, initCountUpAnimations } from "@/lib/scroll-animations";

const values = [
  { icon: Shield, title: "الوقاية أولاً", desc: "نؤمن أن اكتشاف المشكلة قبل حدوثها هو مستقبل الرعاية الصحية." },
  { icon: BarChart3, title: "القرارات المبنية على البيانات", desc: "كل توصية داخل Velara Care تعتمد على تحليل فعلي للبيانات الصحية." },
  { icon: Eye, title: "الخصوصية والثقة", desc: "بيانات الموظفين الصحية تبقى آمنة ومحمية بالكامل." },
  { icon: Heart, title: "الصحة المستدامة", desc: "نساعد الشركات على بناء بيئات عمل صحية طويلة المدى." },
  { icon: Sparkles, title: "الابتكار المستمر", desc: "نطوّر حلولنا باستمرار باستخدام أحدث تقنيات الذكاء الاصطناعي." },
];

export default function AboutPage() {
  useEffect(() => { const c1 = initScrollAnimations(); const c2 = initCountUpAnimations(); return () => { c1(); c2(); }; }, []);

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
              عن Velara Care
            </div>
            <h1 className="vp-hero max-w-4xl mx-auto" data-vp-animate="fade-up" data-vp-delay="1">
              نبني مستقبل{' '}
              <span className="vp-hero-em">الصحة الوقائية</span>
              <br />
              للشركات
            </h1>
            <p className="vp-subtitle text-[var(--text-secondary)] max-w-3xl mx-auto mt-6" data-vp-animate="fade-up" data-vp-delay="2">
              Velara Care هي منصة سعودية لإدارة الصحة المؤسسية باستخدام الذكاء الاصطناعي والتحليلات الوقائية.
              نستخدم أحدث تقنيات AI لتحليل المخاطر الصحية، وتقديم حلول مخصصة للوجبات والاستشارات —
              لتقليل التكاليف ورفع الإنتاجية.
            </p>
          </div>
        </section>

        {/* ✦ STORY ✦ */}
        <section className="section-padding relative overflow-hidden" dir="rtl">
          <div className="absolute inset-0 vp-grid-bg opacity-20" />
          <div className="container-shade relative z-10">
            <div className="max-w-3xl mx-auto text-center" data-vp-animate="fade-up">
              <span className="vp-label">قصة Velara Care</span>
              <h2 className="vp-section-title mt-4 mb-6">من سؤال بسيط إلى منصة ذكية</h2>
              <div className="w-16 h-1 rounded-full bg-gradient-to-l from-[var(--vp-accent)] to-[var(--vp-cyan)] mx-auto" />
              <p className="vp-subtitle text-[var(--text-secondary)] mt-8 leading-relaxed">
                بدأت Velara Care من سؤال بسيط: لماذا تستمر الشركات بدفع تكاليف صحية متزايدة دون امتلاك أدوات وقائية حقيقية؟
              </p>
              <p className="vp-subtitle text-[var(--text-secondary)] mt-4 leading-relaxed">
                معظم الحلول الحالية تقدم خدمات منفصلة: تطبيق وجبات، منصة لياقة، أو استشارات محدودة.
                لكن لا يوجد نظام موحد قادر على تحويل صحة الموظفين إلى بيانات وقرارات قابلة للتنفيذ.
              </p>
              <p className="vp-subtitle text-[var(--text-secondary)] mt-4 leading-relaxed">
                لهذا بُنيت Velara Care. منصة ذكية تجمع بين التقييم الصحي، الذكاء الاصطناعي، التغذية، والاستشارات
                داخل نظام واحد يساعد الشركات على حماية موظفيها وتحسين أدائها وتقليل تكاليفها المستقبلية.
              </p>
            </div>
          </div>
        </section>

        {/* ✦ VISION & MISSION ✦ */}
        <section className="section-padding relative overflow-hidden" dir="rtl" style={{ background: 'var(--vp-gradient-dark)' }}>
          <div className="absolute inset-0 vp-grid-bg opacity-[0.04]" />
          <div className="container-shade relative z-10">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="text-center" data-vp-animate="fade-up">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-[var(--vp-accent)] mx-auto mb-4">
                  <Target className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">رؤيتنا</h3>
                <p className="text-white/70 leading-relaxed">أن نصبح المنصة الأولى في الشرق الأوسط لإدارة صحة الموظفين باستخدام الذكاء الاصطناعي والبيانات الوقائية.</p>
              </div>
              <div className="text-center" data-vp-animate="fade-up" data-vp-delay="2">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-[var(--vp-accent)] mx-auto mb-4">
                  <Sparkles className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">رسالتنا</h3>
                <p className="text-white/70 leading-relaxed">تمكين الشركات من تحسين صحة فرق العمل وتقليل التكاليف الطبية عبر حلول صحية ذكية وقابلة للقياس.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ✦ STATS ✦ */}
        <section className="section-padding relative overflow-hidden" dir="rtl">
          <div className="container-shade relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { num: "95", suffix: "%", label: "رضا العملاء" },
                { num: "100", suffix: "+", label: "شركة تثق بنا" },
                { num: "30", suffix: "%", label: "خفض تكاليف التأمين" },
                { num: "5000", suffix: "+", label: "موظف مسجل" },
              ].map((s) => (
                <div key={s.label} data-vp-animate="fade-up">
                  <p className="vp-stat" data-vp-count-to={s.num} data-vp-count-suffix={s.suffix}>{s.num}{s.suffix}</p>
                  <p className="text-sm text-[var(--text-secondary)] mt-2">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ✦ VALUES ✦ */}
        <section className="section-padding relative overflow-hidden" dir="rtl" style={{ background: 'var(--vp-gradient-card)' }}>
          <div className="container-shade relative z-10">
            <div className="text-center mb-14" data-vp-animate="fade-up">
              <span className="vp-label">قيمنا</span>
              <h2 className="vp-section-title mt-4">ما نؤمن به</h2>
              <div className="w-16 h-1 rounded-full bg-gradient-to-l from-[var(--vp-accent)] to-[var(--vp-cyan)] mx-auto mt-4" />
            </div>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
              {values.map((v, i) => (
                <div key={v.title} className="card-premium p-6 text-center" data-vp-animate="fade-up" data-vp-delay={String(Math.min(i + 1, 4))}>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--vp-glow-soft)] text-[var(--vp-accent)] mx-auto mb-4">
                    <v.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{v.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{v.desc}</p>
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
              <h2 className="vp-hero text-white mb-6">انضم إلى ثورة الصحة الوقائية</h2>
              <p className="vp-subtitle text-white/70 max-w-xl mx-auto mb-10">احجز عرضاً تجريبياً مجاناً واكتشف كيف يمكن لـ Velara Care أن تغير شركتك</p>
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
