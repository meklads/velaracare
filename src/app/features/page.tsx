"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Brain, BarChart3, Users, TrendingDown, Activity, Shield,
  ArrowLeft, Target, PieChart, UserCheck, CheckCircle2,
  Gift, Medal, Utensils, Clock, Sparkles, Building2, Cpu
} from "lucide-react";
import { initScrollAnimations } from "@/lib/scroll-animations";

const capabilities = [
  { icon: Activity, title: "مسح نمط الحياة (Lifestyle Survey)", desc: "أداة مسح سريعة تجمع معلومات عن عادات التغذية، النوم، النشاط البدني، مستويات الإجهاد، والعافية النفسية — في 5 دقائق فقط.", bizValue: "فهم شامل لمستوى عافية القوى العاملة من اليوم الأول" },
  { icon: BarChart3, title: "Wellness Score المؤسسي", desc: "مؤشر رقمي موحد (0-100) يعكس مستوى العافية العام للقوى العاملة. يتيح للإدارة قياس التحسن شهرياً وربطه بالإنتاجية والاحتفاظ.", bizValue: "مقياس موضوعي واحد لعافية المؤسسة — قابل للمقارنة والتحسن" },
  { icon: Gift, title: "برامج وتحديات العافية", desc: "منصة تفاعلية تدير تحديات اللياقة، برامج التغذية الصحية، جلسات الاسترخاء، ومحتوى توعوي — مع إشعارات وتحفيز مستمر.", bizValue: "مشاركة نشطة تصل إلى 85% من القوى العاملة" },
  { icon: Target, title: "توصيات مخصصة (ذكاء تحليلي)", desc: "كل موظف يتلقى توصيات مخصصة حسب نمط حياته — وجبات مناسبة، تمارين مقترحة، نصائح للنوم وإدارة الإجهاد.", bizValue: "تجربة فردية تزيد الرضا والتحسن الشخصي" },
  { icon: Users, title: "لوحة قيادة HR", desc: "لوحة تفاعلية حية تعرض Wellness Score، معدلات المشاركة، اتجاهات التحسن، مقارنات الأقسام، والأثر على الإنتاجية والغياب.", bizValue: "قرارات مبنية على بيانات — لا تخمين" },
  { icon: TrendingDown, title: "تحليل أثر العافية على الأعمال", desc: "يربط بيانات العافية بالإنتاجية، الغياب، والاحتفاظ — يظهر العائد على الاستثمار في برامج العافية بشكل رقمي ملموس.", bizValue: "إثبات أثر برامج العافية على مؤشرات الأعمال" },
  { icon: PieChart, title: "تقارير تنفيذية جاهزة", desc: "تقارير آلية لمجلس الإدارة والإدارة التنفيذية — تغطي العافية، المشاركة، الإنتاجية، والأثر المالي.", bizValue: "تقارير احترافية بدون جهد يدوي — جاهزة في دقائق" },
  { icon: Utensils, title: "منظومة التغذية والوجبات", desc: "يربط الموظفين بمطاعم ومزودي وجبات صحية معتمدين — خطط تغذية مخصصة، طلب مباشر، وتوصيل للمكتب أو المنزل.", bizValue: "تغذية صحية متاحة للجميع — بدون عناء البحث" },
  { icon: UserCheck, title: "متابعة وتحفيز مستمر", desc: "نظام مكافآت وتحفيز يشجع الموظفين على الاستمرار في برامج العافية — نقاط، شارات، ولوحات متصدرين.", bizValue: "استمرارية عالية — الموظفون يبقون نشطين لأشهر" },
];

const whyVelara = [
  { icon: Building2, title: "للشركات متوسطة وكبيرة", desc: "صممت المنصة للشركات من 50 إلى 5000+ موظف. تتوسع مع نمو مؤسستك." },
  { icon: Shield, title: "خصوصية وأمان تام", desc: "بيانات الموظفين مشفرة. الإدارة ترى إحصائيات مجمعة فقط — بدون تفاصيل فردية." },
  { icon: Cpu, title: "تكامل مع أنظمتك الحالية", desc: "API مفتوح يتكامل مع HRMS، ERP، وأنظمة إدارة المطاعم. لا نستبدل — نضيف." },
];

export default function FeaturesPage() {
  useEffect(() => { const c = initScrollAnimations(); return () => c(); }, []);

  return (
    <>
      <Header />
      <main>
        {/* HERO */}
        <section className="relative pt-32 pb-20 overflow-hidden" dir="rtl">
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent-soft)] via-transparent to-transparent opacity-60" />
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[var(--accent)]/8 via-[var(--accent)]/3 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute bottom-[-15%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[var(--accent)]/5 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute inset-0 vp-grid-bg opacity-[0.03]" />

          <svg width="0" height="0" className="absolute">
            <defs>
              <clipPath id="circleFrame" clipPathUnits="objectBoundingBox">
                <circle cx="0.5" cy="0.5" r="0.5" />
              </clipPath>
            </defs>
          </svg>

          <div className="container-shade relative z-10">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div data-vp-animate="fade-up" className="lg:pl-8">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent-soft)] border border-[var(--accent)]/10 text-[var(--accent)] text-xs font-semibold mb-5">
                  <Sparkles className="h-3.5 w-3.5" />
                  قدرات المنصة
                </span>
                <h1 className="vp-hero mt-5">
                  كل ما تحتاجه لبرنامج
                  <br />
                  <span className="vp-hero-em">عافية مؤسسي متكامل</span>
                </h1>
                <p className="text-sm lg:text-base text-[var(--text-secondary)] mt-6 leading-relaxed max-w-lg">
                  Velara Care هي منصة عافية مؤسسية تجمع بين مسح نمط الحياة، التحليلات، البرامج التفاعلية، وتقارير العائد — في نظام واحد سهل.
                </p>
              </div>
              <div className="relative flex items-center justify-center" data-vp-animate="scale-in" data-vp-delay="2">
                <div className="absolute w-[320px] h-[320px] lg:w-[420px] lg:h-[420px] rounded-full bg-gradient-to-br from-[var(--accent)]/12 via-[var(--accent)]/3 to-transparent blur-[80px] pointer-events-none" />
                <div className="absolute w-[240px] h-[240px] lg:w-[320px] lg:h-[320px] rounded-full bg-gradient-to-tr from-[var(--accent)]/8 to-transparent blur-[60px] pointer-events-none translate-y-6" />
                <div className="relative w-[240px] h-[240px] lg:w-[340px] lg:h-[340px]">
                  <div className="absolute -inset-[5px] lg:-inset-[7px] rounded-full bg-gradient-to-br from-[var(--accent)] via-[var(--accent-light)]/50 to-[var(--accent-dark)] shadow-2xl shadow-[var(--accent)]/20" />
                  <div className="absolute -inset-[1.5px] lg:-inset-[2.5px] rounded-full bg-[var(--bg-primary)]" />
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <div className="w-full h-full" style={{ clipPath: 'url(#circleFrame)' }}>
                      <Image src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&h=500&fit=crop&auto=format" alt="قدرات Velara" width={500} height={500} className="w-full h-full object-cover scale-105" priority />
                    </div>
                    <div className="absolute inset-0 rounded-full pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, transparent 35%, transparent 65%, rgba(0,0,0,0.12) 100%)' }} />
                  </div>
                  <div className="absolute -top-2 -right-1 lg:-top-3 lg:-right-2 w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-[var(--bg-card)] border border-[var(--accent)]/20 flex items-center justify-center shadow-lg backdrop-blur-sm rotate-12 hover:rotate-0 hover:scale-110 transition-all duration-500 z-10">
                    <Brain className="h-4 w-4 lg:h-5 lg:w-5 text-[var(--accent)]" />
                  </div>
                  <div className="absolute -bottom-2 -left-1 lg:-bottom-3 lg:-left-2 w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] flex items-center justify-center shadow-lg backdrop-blur-sm -rotate-12 hover:rotate-0 hover:scale-110 transition-all duration-500 z-10">
                    <Activity className="h-4 w-4 lg:h-5 lg:w-5 text-emerald-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section className="py-24 bg-[var(--bg-secondary)] relative overflow-hidden" dir="rtl">
          <div className="absolute inset-0 vp-data-dots pointer-events-none" />
          <div className="container-shade relative z-10">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((f, i) => (
                <div key={f.title} className="card-premium p-6 group hover:shadow-xl" data-vp-animate="fade-up" data-vp-delay={String(Math.min(i + 1, 4))}>
                  <div className="w-14 h-14 rounded-2xl bg-[var(--accent-soft)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <f.icon className="h-7 w-7 text-[var(--accent)]" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">{f.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">{f.desc}</p>
                  <div className="pt-3 border-t border-[var(--border-primary)]">
                    <span className="text-xs font-semibold text-[var(--accent)]">{f.bizValue}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* IMAGE BREAK */}
        <section className="relative py-16 bg-[var(--bg-primary)]" dir="rtl">
          <div className="container-shade">
            <div className="max-w-4xl mx-auto relative" data-vp-animate="scale-in">
              <div className="absolute -inset-6 bg-gradient-to-r from-[var(--accent)]/10 via-[var(--accent)]/5 to-transparent rounded-3xl blur-3xl" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[var(--border-primary)]">
                <Image src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1000&h=500&fit=crop&auto=format" alt="Velara Features" width={1000} height={500} className="w-full h-auto object-cover" />
              </div>
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" />
            </div>
          </div>
        </section>

        {/* WHY VELARA */}
        <section className="py-24 bg-[var(--bg-secondary)] relative overflow-hidden" dir="rtl">
          <div className="absolute inset-0 vp-grid-bg opacity-[0.03]" />
          <div className="container-shade">
            <div className="mx-auto max-w-3xl text-center mb-14" data-vp-animate="fade-up">
              <span className="vp-label">لماذا Velara Care</span>
              <h2 className="vp-section-title mt-4">مصممة خصيصاً <span className="vp-hero-em">للمؤسسات</span></h2>
              <div className="w-16 h-1 rounded-full bg-gradient-to-l from-[var(--accent)] to-[var(--accent-light)] mx-auto mt-4" />
            </div>
            <div className="grid gap-6 md:grid-cols-3" data-vp-animate="fade-up" data-vp-delay="2">
              {whyVelara.map((item) => (
                <div key={item.title} className="card-premium p-6 text-center group hover:shadow-xl">
                  <div className="w-14 h-14 rounded-2xl bg-[var(--accent-soft)] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <item.icon className="h-7 w-7 text-[var(--accent)]" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{item.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-28 overflow-hidden" dir="rtl" style={{ background: 'linear-gradient(160deg, #071F1F 0%, #0A3A3A 40%, #0D4F4F 70%, #071F1F 100%)' }}>
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 25% 40%, rgba(45,212,191,0.10) 0%, transparent 50%), radial-gradient(circle at 75% 60%, rgba(45,212,191,0.06) 0%, transparent 50%)' }} />
          <div className="absolute inset-0 vp-grid-bg opacity-[0.04]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-l from-transparent via-white/10 to-transparent" />
          <div className="container-shade relative z-10">
            <div className="max-w-4xl mx-auto" data-vp-animate="slide-up">
              <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] p-10 lg:p-16" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.015) 100%)', backdropFilter: 'blur(24px)' }}>
                <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[var(--accent)]/10 blur-[120px] pointer-events-none" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-white/[0.02] blur-[120px] pointer-events-none" />
                <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-l from-transparent via-white/20 to-transparent" />
                <div className="relative text-center">
                  <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/[0.06] border border-white/[0.10] text-white/80 text-xs font-semibold mb-8 backdrop-blur-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
                    </span>
                    ابدأ رحلة العافية المؤسسية
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-[1.15] mb-6">هل تريد بناء برنامج عافية لمؤسستك؟</h2>
                  <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">اطلب عرضاً تجريبياً واكتشف كيف تدير برامج العافية في منصة واحدة.</p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                    <Link href="/demo" className="group relative inline-flex items-center gap-2.5 px-10 py-4 rounded-2xl bg-white text-[var(--vp-ink)] font-bold text-base shadow-xl shadow-white/10 hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5">
                      اطلب عرضاً تجريبياً للمؤسسات
                      <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    </Link>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 pt-8 border-t border-white/[0.06]">
                    <div className="text-center"><p className="text-white font-extrabold text-xl">100+</p><p className="text-white/40 text-xs">شركة تثق بنا</p></div>
                    <div className="w-px h-10 bg-white/[0.06]" />
                    <div className="text-center"><p className="text-white font-extrabold text-xl">5,000+</p><p className="text-white/40 text-xs">موظف على المنصة</p></div>
                    <div className="w-px h-10 bg-white/[0.06]" />
                    <div className="text-center"><p className="text-white font-extrabold text-xl">3.2x</p><p className="text-white/40 text-xs">متوسط العائد على الاستثمار</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
