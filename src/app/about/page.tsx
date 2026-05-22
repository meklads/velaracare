"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Heart, Users, TrendingDown, Shield, ArrowLeft, Target,
  BarChart3, Building2, Sparkles, Gift, Medal, Smile,
  Award, Eye
} from "lucide-react";
import { initScrollAnimations, initCountUpAnimations } from "@/lib/scroll-animations";

const values = [
  { icon: BarChart3, title: "القرارات بالبيانات", desc: "كل توصية داخل Velara Care تعتمد على تحليل فعلي — لا تخمين، لا افتراضات." },
  { icon: Shield, title: "الخصوصية أولاً", desc: "بيانات الموظفين مشفرة وآمنة. الإدارة ترى إحصائيات مجمعة فقط، بدون تفاصيل فردية." },
  { icon: Building2, title: "نتائج قابلة للقياس", desc: "برامج العافية يجب أن تظهر أثرها — على الإنتاجية، الغياب، والاحتفاظ." },
  { icon: Heart, title: "عافية مستدامة", desc: "نساعد الشركات على بناء ثقافة عافية طويلة المدى — ليست برامج مؤقتة." },
  { icon: Gift, title: "تحفيز ومتعة", desc: "برامج العافية تكون فعالة عندما تكون ممتعة. نصنع تجربة يحبها الموظفون." },
];

export default function AboutPage() {
  useEffect(() => { const c1 = initScrollAnimations(); const c2 = initCountUpAnimations(); return () => { c1(); c2(); }; }, []);

  return (
    <>
      <Header />
      <main>
        {/* HERO */}
        <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)]" dir="rtl">
          <div className="absolute inset-0 vp-grid-bg opacity-[0.03]" />
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[var(--accent)]/8 to-transparent blur-3xl pointer-events-none" />
          <div className="container-shade relative z-10 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent-soft)] border border-[var(--accent)]/10 text-[var(--accent)] text-xs font-semibold mb-6" data-vp-animate="fade-up">
              <Sparkles className="h-3.5 w-3.5" />
              عن Velara Care
            </span>
            <h1 className="vp-hero max-w-4xl mx-auto" data-vp-animate="fade-up" data-vp-delay="1">
              منصة مؤسسية
              <br />
              <span className="vp-hero-em">لبرامج عافية الموظفين</span>
            </h1>
            <p className="vp-subtitle max-w-3xl mx-auto mt-6" data-vp-animate="fade-up" data-vp-delay="2">
              Velara Care هي منصة سعودية للعافية المؤسسية — تساعد الشركات متوسطة وكبيرة على بناء برامج عافية متكاملة تزيد الإنتاجية وتحسن جودة حياة الموظفين.
            </p>
          </div>
        </section>

        {/* STORY + IMAGE */}
        <section className="py-24 bg-[var(--bg-secondary)] relative overflow-hidden" dir="rtl">
          <div className="absolute inset-0 vp-data-dots pointer-events-none" />
          <div className="container-shade relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div data-vp-animate="fade-up">
                <span className="vp-label">القصة</span>
                <h2 className="vp-section-title mt-4 mb-6">لماذا بُنيت Velara Care</h2>
                <div className="w-16 h-1 rounded-full bg-gradient-to-l from-[var(--accent)] to-[var(--accent-light)] mb-6" />
                <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                  معظم الشركات لديها مبادرات عافية مبعثرة — تحديات لياقة هنا، تطبيق وجبات هناك، استشارات متفرقة. لكن لا يوجد نظام واحد يدير كل شيء ويقيس الأثر الحقيقي على الإنتاجية والاحتفاظ.
                </p>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                  Velara Care تجيب على سؤال بسيط: ماذا لو كان لديك منصة واحدة تدير كل برامج العافية، تحلل المشاركة، تقيس التحسن، وتظهر العائد على الاستثمار؟
                </p>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  ليس لدينا أجهزة طبية. ولا نبيع معدات تنفس. نحن منصة برمجية للعافية المؤسسية — فقط.
                </p>
              </div>
              <div className="relative" data-vp-animate="scale-in" data-vp-delay="2">
                <div className="absolute -inset-6 bg-gradient-to-l from-[var(--accent)]/10 via-[var(--accent)]/5 to-transparent rounded-3xl blur-3xl" />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[var(--border-primary)]">
                  <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&h=500&fit=crop&auto=format" alt="Team collaboration" width={700} height={500} className="w-full h-auto object-cover" />
                </div>
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        {/* VISION & MISSION */}
        <section className="py-24 relative overflow-hidden" dir="rtl" style={{ background: 'linear-gradient(135deg, var(--vp-ink) 0%, #0D4F4F 100%)' }}>
          <div className="absolute inset-0 vp-grid-bg opacity-[0.03]" />
          <div className="absolute top-1/2 left-1/4 w-80 h-80 rounded-full bg-[var(--accent)]/10 blur-3xl" />
          <div className="container-shade relative z-10">
            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <div className="glass-premium rounded-2xl p-8 text-center" data-vp-animate="fade-up">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <Target className="h-7 w-7 text-[var(--accent)]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">رؤيتنا</h3>
                <p className="text-white/70 leading-relaxed">أن تصبح كل شركة في المنطقة قادرة على بناء ثقافة عافية حقيقية — تقاس بالبيانات، وتظهر أثرها على الإنتاجية والاحتفاظ.</p>
              </div>
              <div className="glass-premium rounded-2xl p-8 text-center" data-vp-animate="fade-up" data-vp-delay="2">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-7 w-7 text-[var(--accent)]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">رسالتنا</h3>
                <p className="text-white/70 leading-relaxed">تمكين الشركات من بناء وإدارة برامج عافية الموظفين — عبر منصة واحدة تقيس، تحلل، وتحسّن.</p>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="py-20 bg-[var(--bg-primary)] relative overflow-hidden" dir="rtl">
          <div className="absolute inset-0 vp-data-dots pointer-events-none opacity-50" />
          <div className="container-shade relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {[
                { num: "95", suffix: "%", label: "رضا العملاء" },
                { num: "100", suffix: "+", label: "شركة تثق بنا" },
                { num: "85", suffix: "%", label: "مشاركة الموظفين" },
                { num: "5000", suffix: "+", label: "موظف مسجل" },
              ].map((s) => (
                <div key={s.label} className="text-center" data-vp-animate="fade-up">
                  <p className="vp-stat" data-vp-count-to={s.num} data-vp-count-suffix={s.suffix}>{s.num}{s.suffix}</p>
                  <p className="text-sm text-[var(--text-secondary)] mt-2">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section className="py-24 bg-[var(--bg-secondary)] relative overflow-hidden" dir="rtl">
          <div className="absolute inset-0 vp-grid-bg opacity-[0.03]" />
          <div className="container-shade relative z-10">
            <div className="text-center mb-14" data-vp-animate="fade-up">
              <span className="vp-label">قيمنا</span>
              <h2 className="vp-section-title mt-4">ما نؤمن به</h2>
              <div className="w-16 h-1 rounded-full bg-gradient-to-l from-[var(--accent)] to-[var(--accent-light)] mx-auto mt-4" />
            </div>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
              {values.map((v, i) => (
                <div key={v.title} className="card-premium p-6 text-center group hover:shadow-xl" data-vp-animate="fade-up" data-vp-delay={String(Math.min(i + 1, 4))}>
                  <div className="w-14 h-14 rounded-2xl bg-[var(--accent-soft)] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <v.icon className="h-7 w-7 text-[var(--accent)]" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{v.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-28 overflow-hidden" dir="rtl" style={{ background: 'linear-gradient(135deg, var(--vp-ink) 0%, #0D4F4F 100%)' }}>
          <div className="absolute inset-0 vp-grid-bg opacity-[0.03]" />
          <div className="absolute top-1/2 left-1/3 w-72 h-72 rounded-full bg-[var(--accent)]/10 blur-3xl" />
          <div className="container-shade relative z-10">
            <div className="mx-auto max-w-2xl text-center" data-vp-animate="slide-up">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-semibold mb-6">
                <Sparkles className="h-3.5 w-3.5" />
                ابدأ اليوم
              </span>
              <h2 className="vp-hero text-white mb-6">هل تريد بناء برنامج عافية لمؤسستك؟</h2>
              <p className="vp-subtitle text-white/70 max-w-xl mx-auto mb-10">اطلب عرضاً تجريبياً واكتشف كيف يمكن لـ Velara Care مساعدتك.</p>
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
