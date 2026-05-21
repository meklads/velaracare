"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Heart, Users, TrendingDown, Shield, ArrowLeft, Target,
  BarChart3, Building2, DollarSign, UserCheck, PieChart, Clock
} from "lucide-react";
import { initScrollAnimations, initCountUpAnimations } from "@/lib/scroll-animations";

const values = [
  { icon: BarChart3, title: "القرارات المبنية على البيانات", desc: "كل توصية داخل Velara Care تعتمد على تحليل فعلي — لا تخمين، لا افتراضات." },
  { icon: Shield, title: "الخصوصية المؤسسية", desc: "بيانات الموظفين الصحية تبقى آمنة ومحمية بالكامل. الإدارة ترى إحصائيات مجمعة فقط." },
  { icon: Building2, title: "النتائج القابلة للقياس", desc: "نحن منصة نتائج — كل استثمار في الصحة يجب أن يظهر أثره على التكاليف والإنتاجية." },
  { icon: Heart, title: "صحة مستدامة للقوى العاملة", desc: "نساعد الشركات على بناء بيئات عمل صحية طويلة المدى — ليس برامج مؤقتة." },
  { icon: TrendingDown, title: "الوقاية كاستثمار", desc: "الاستثمار في الوقاية الصحيحة يخفض التكاليف ويرفع العائد — نثبت ذلك بالأرقام." },
];

export default function AboutPage() {
  useEffect(() => { const c1 = initScrollAnimations(); const c2 = initCountUpAnimations(); return () => { c1(); c2(); }; }, []);

  return (
    <>
      <Header />
      <main>
        {/* HERO */}
        <section className="relative py-28 overflow-hidden bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)]" dir="rtl">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'var(--vp-gradient-hero)' }} />
          <div className="container-shade relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[var(--vp-glow-soft)] border border-[var(--vp-accent)]/10 text-[var(--vp-accent)] text-sm font-medium mb-6" data-vp-animate="fade-up">
              <span className="vp-breathing-ring inline-block" style={{ width: '6px', height: '6px' }} />
              عن Velara Care
            </div>
            <h1 className="vp-hero max-w-4xl mx-auto" data-vp-animate="fade-up" data-vp-delay="1">
              منصة مؤسسية لتحسين{' '}
              <br />
              <span className="vp-hero-em">صحة القوى العاملة</span>
            </h1>
            <p className="vp-subtitle text-[var(--text-secondary)] max-w-3xl mx-auto mt-6" data-vp-animate="fade-up" data-vp-delay="2">
              Velara Care هي منصة سعودية لتحسين صحة القوى العاملة في الشركات متوسطة وكبيرة.
              نجمع بين التقييم الصحي الشامل، التحليلات التنبؤية، وإدارة برامج العافية —
              في نظام واحد يخفض التكاليف ويرفع الإنتاجية.
            </p>
          </div>
        </section>

        {/* THE PROBLEM & OUR SOLUTION */}
        <section className="section-padding relative overflow-hidden" dir="rtl">
          <div className="container-shade relative z-10">
            <div className="max-w-3xl mx-auto" data-vp-animate="fade-up">
              <span className="vp-label">القصة</span>
              <h2 className="vp-section-title mt-4 mb-6">لماذا بُنيت Velara Care</h2>
              <div className="w-16 h-1 rounded-full bg-gradient-to-l from-[var(--vp-accent)] to-[var(--vp-cyan)]" />
              <p className="vp-subtitle text-[var(--text-secondary)] mt-8 leading-relaxed">
                الشركات تنفق مبالغ ضخمة على التأمين الصحي وبرامج العافية — لكن بدون أدوات حقيقية
                لقياس الأثر أو تحسين النتائج. برامج العافية المنفصلة (تطبيق وجبات، منصة لياقة،
                استشارات) لا تتكامل ولا تقيس العائد على الاستثمار.
              </p>
              <p className="vp-subtitle text-[var(--text-secondary)] mt-4 leading-relaxed">
                Velara Care تحل هذه المشكلة بمنصة مؤسسية واحدة تجمع كل شيء:
                تقييماً شاملاً لصحة القوى العاملة، تحليلات تنبؤية تربط الصحة بالتكاليف،
                أدوات إدارة برامج العافية، وتقارير جاهزة للإدارة التنفيذية ومجلس الإدارة.
              </p>
            </div>
          </div>
        </section>

        {/* VISION & MISSION */}
        <section className="section-padding relative overflow-hidden" dir="rtl" style={{ background: 'var(--vp-gradient-dark)' }}>
          <div className="container-shade relative z-10">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="text-center" data-vp-animate="fade-up">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-[var(--vp-accent)] mx-auto mb-4">
                  <Target className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">رؤيتنا</h3>
                <p className="text-white/70 leading-relaxed">
                  أن نصبح المنصة الأولى في المنطقة لتحسين صحة القوى العاملة —
                  حيث كل شركة لديها رؤية كاملة عن صحة موظفيها وتأثيرها على الأداء المالي.
                </p>
              </div>
              <div className="text-center" data-vp-animate="fade-up" data-vp-delay="2">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-[var(--vp-accent)] mx-auto mb-4">
                  <BarChart3 className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">رسالتنا</h3>
                <p className="text-white/70 leading-relaxed">
                  تمكين الشركات من تحويل صحة القوى العاملة إلى ذكاء مؤسسي وقيمة مالية —
                  عبر منصة واحدة تقيس، تحلل، وتحسّن.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="section-padding relative overflow-hidden" dir="rtl">
          <div className="container-shade relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { num: "95", suffix: "%", label: "رضا العملاء" },
                { num: "100", suffix: "+", label: "شركة تثق بنا" },
                { num: "40", suffix: "%", label: "خفض تكاليف التأمين" },
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

        {/* VALUES */}
        <section className="section-padding relative overflow-hidden" dir="rtl" style={{ background: 'var(--vp-gradient-card)' }}>
          <div className="container-shade relative z-10">
            <div className="text-center mb-14" data-vp-animate="fade-up">
              <span className="vp-label">قيمنا المؤسسية</span>
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

        {/* CTA */}
        <section className="relative py-28 overflow-hidden" dir="rtl" style={{ background: 'var(--vp-gradient-dark)' }}>
          <div className="container-shade relative z-10">
            <div className="mx-auto max-w-2xl text-center" data-vp-animate="slide-up">
              <h2 className="vp-hero text-white mb-6">هل تريد معرفة المزيد عن المنصة؟</h2>
              <p className="vp-subtitle text-white/70 max-w-xl mx-auto mb-10">
                احجز عرضاً تجريبياً لمؤسستك واكتشف كيف يمكن لـ Velara Care تحسين صحة القوى العاملة وتقليل التكاليف.
              </p>
              <Link href="/demo" className="btn-premium !bg-white !text-[var(--vp-ink)] group">
                اطلب عرضاً تجريبياً للمؤسسات
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
