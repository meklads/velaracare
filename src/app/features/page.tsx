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
        <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)]" dir="rtl">
          <div className="absolute inset-0 vp-grid-bg opacity-[0.03]" />
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[var(--accent)]/8 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-[var(--accent)]/5 to-transparent blur-3xl pointer-events-none" />
          <div className="container-shade relative z-10 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent-soft)] border border-[var(--accent)]/10 text-[var(--accent)] text-xs font-semibold mb-6" data-vp-animate="fade-up">
              <Sparkles className="h-3.5 w-3.5" />
              قدرات المنصة
            </span>
            <h1 className="vp-hero max-w-4xl mx-auto" data-vp-animate="fade-up" data-vp-delay="1">
              كل ما تحتاجه لبرنامج
              <br />
              <span className="vp-hero-em">عافية مؤسسي متكامل</span>
            </h1>
            <p className="vp-subtitle max-w-2xl mx-auto mt-6" data-vp-animate="fade-up" data-vp-delay="2">
              Velara Care هي منصة عافية مؤسسية تجمع بين مسح نمط الحياة، التحليلات، البرامج التفاعلية، وتقارير العائد — في نظام واحد سهل.
            </p>
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
              <p className="vp-subtitle text-white/70 max-w-xl mx-auto mb-10">اطلب عرضاً تجريبياً واكتشف كيف تدير برامج العافية في منصة واحدة.</p>
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
