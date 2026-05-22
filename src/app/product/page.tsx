"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Brain, BarChart3, Users, Shield, ArrowLeft, Activity,
  TrendingDown, Target, PieChart, Building2, Cpu,
  UserCheck, Clock, CheckCircle2, Gift, Medal, Utensils
} from "lucide-react";
import { initScrollAnimations } from "@/lib/scroll-animations";

const platformSections = [
  {
    icon: Users,
    title: "الموظفون — تجربة العافية",
    subtitle: "Employee Wellness Experience",
    items: [
      "مسح نمط الحياة في 5 دقائق",
      "Wellness Score شخصي",
      "توصيات مخصصة للتغذية واللياقة",
      "تحديات وبرامج تفاعلية",
      "محتوى توعوي وتحفيزي",
    ],
  },
  {
    icon: BarChart3,
    title: "قسم HR — لوحة القيادة",
    subtitle: "HR Analytics Dashboard",
    items: [
      "مؤشر العافية العام للقوى العاملة",
      "معدلات المشاركة والتحسن",
      "تحليل أثر البرامج على الإنتاجية",
      "تقارير جاهزة لمجلس الإدارة",
      "مقارنات بين الأقسام والفروع",
    ],
  },
  {
    icon: Cpu,
    title: "محرك التحليلات والتوصيات",
    subtitle: "Analytics & Recommendations Engine",
    items: [
      "تحليل أنماط الحياة والتغذية",
      "Wellness Score (0-100)",
      "توصيات ذكية مخصصة لكل موظف",
      "تحليل اتجاهات العافية في المؤسسة",
      "تقييم أثر البرامج على الغياب والإنتاجية",
    ],
  },
  {
    icon: Shield,
    title: "الأمان والخصوصية",
    subtitle: "Security & Privacy",
    items: [
      "تشفير AES-256 و TLS 1.3",
      "إخفاء الهوية في التقارير",
      "صلاحيات وصول حسب الدور (RBAC)",
      "سجل تدقيق كامل",
      "توافق مع PDPL و SDAIA",
    ],
  },
];

const capabilityModules = [
  {
    icon: Activity,
    title: "مسح العافية للقوى العاملة",
    desc: "أداة مسح سريعة تجمع معلومات عن نمط الحياة اليومي — التغذية، النوم، النشاط البدني، مستويات الإجهاد — وتحولها إلى بيانات قابلة للتحليل.",
    bizValue: "فهم موضوعي لمستوى عافية مؤسستك من أول أسبوع",
  },
  {
    icon: TrendingDown,
    title: "تحليل أثر العافية على الأعمال",
    desc: "يربط بين المشاركة في برامج العافية والإنتاجية، الغياب، والاحتفاظ بالموظفين. يظهر العائد الحقيقي على الاستثمار.",
    bizValue: "تقرير ملموس يربط العافية بأداء الأعمال",
  },
  {
    icon: PieChart,
    title: "تقارير تنفيذية جاهزة",
    desc: "تقارير تلقائية للإدارة التنفيذية ومجلس الإدارة — تغطي المشاركة، تحسن العافية، والأثر على مؤشرات الأداء الرئيسية.",
    bizValue: "تقارير احترافية بدون جهد يدوي",
  },
  {
    icon: Gift,
    title: "برامج وتحديات العافية",
    desc: "منصة تدير تحديات اللياقة، برامج التغذية، جلسات الاسترخاء، والمحتوى التوعوي — مع متابعة المشاركة والتفاعل.",
    bizValue: "زيادة مشاركة الموظفين بنسبة تصل إلى 85%",
  },
  {
    icon: Target,
    title: "توصيات مخصصة لكل موظف",
    desc: "بناءً على نمط حياته، يتلقى كل موظف توصيات مخصصة — وجبات، تمارين، نوم، إدارة إجهاد — تزيد التفاعل وتحسن النتائج.",
    bizValue: "تجربة مخصصة تزيد الرضا والتحسن الفردي",
  },
  {
    icon: Users,
    title: "إدارة برامج العافية",
    desc: "تدير دورة حياة برامج العافية بالكامل — الإعلان، التسجيل، المتابعة، التقارير — مع أتمتة توفر 70% من وقت فريق HR.",
    bizValue: "أتمتة كاملة لإدارة البرامج — وفر وقت فريقك",
  },
];

export default function ProductPage() {
  useEffect(() => { const c = initScrollAnimations(); return () => c(); }, []);

  return (
    <>
      <Header />
      <main>
        {/* HERO */}
        <section className="relative py-28 overflow-hidden bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)]" dir="rtl">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'var(--vp-gradient-hero)' }} />
          <div className="container-shade relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[var(--vp-glow-soft)] border border-[var(--vp-accent)]/10 text-[var(--vp-accent)] text-sm font-medium mb-6" data-vp-animate="fade-up">
              منصة عافية مؤسسية
            </div>
            <h1 className="vp-hero max-w-4xl mx-auto" data-vp-animate="fade-up" data-vp-delay="1">
              نظام تشغيل متكامل
              <br />
              <span className="vp-hero-em">لبرامج العافية المؤسسية</span>
            </h1>
            <p className="vp-subtitle text-[var(--text-secondary)] max-w-2xl mx-auto mt-6" data-vp-animate="fade-up" data-vp-delay="2">
              ليست منصة طبية. ولا جهاز تنفس. Velara Care هي بنية تحتية لبرامج عافية الموظفين —
              تجمع بين مسح نمط الحياة، تحليلات المشاركة، إدارة البرامج، وتقارير العائد
              في نظام واحد سهل الاستخدام.
            </p>
          </div>
        </section>

        {/* PLATFORM SECTIONS */}
        <section className="section-padding relative overflow-hidden" dir="rtl">
          <div className="container-shade relative z-10">
            <div className="mx-auto max-w-3xl text-center mb-12" data-vp-animate="fade-up">
              <span className="vp-label">بنية المنصة</span>
              <h2 className="vp-section-title mt-4">
                أربعة أقسام تعمل{' '}
                <span className="vp-hero-em">بتكامل كامل</span>
              </h2>
              <div className="w-16 h-1 rounded-full bg-gradient-to-l from-[var(--vp-accent)] to-[var(--vp-cyan)] mx-auto mt-4" />
            </div>

            <div className="space-y-6">
              {platformSections.map((section, i) => (
                <div key={section.title} className="card-premium p-6 lg:p-8" data-vp-animate="fade-up" data-vp-delay={String(i + 1)}>
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex items-start gap-4 lg:w-72 shrink-0">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--vp-accent)] to-emerald-700 flex items-center justify-center shrink-0">
                        <section.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[var(--text-primary)]">{section.title}</h3>
                        <p className="text-xs text-[var(--text-secondary)]">{section.subtitle}</p>
                      </div>
                    </div>
                    <div className="flex-1 grid sm:grid-cols-2 gap-3">
                      {section.items.map((item) => (
                        <div key={item} className="flex items-center gap-2 p-2.5 rounded-xl bg-[var(--vp-glow-soft)]">
                          <CheckCircle2 className="h-4 w-4 text-[var(--vp-accent)] shrink-0" />
                          <span className="text-sm text-[var(--text-secondary)]">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MODULES */}
        <section className="section-padding relative overflow-hidden" dir="rtl" style={{ background: 'var(--vp-gradient-card)' }}>
          <div className="container-shade">
            <div className="mx-auto max-w-3xl text-center mb-12" data-vp-animate="fade-up">
              <span className="vp-label">الوحدات التشغيلية</span>
              <h2 className="vp-section-title mt-4">
                كل وحدة تحقق{' '}
                <span className="vp-hero-em">قيمة مؤسسية واضحة</span>
              </h2>
              <div className="w-16 h-1 rounded-full bg-gradient-to-l from-[var(--vp-accent)] to-[var(--vp-cyan)] mx-auto mt-4" />
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-vp-animate="fade-up" data-vp-delay="2">
              {capabilityModules.map((mod) => (
                <div key={mod.title} className="card-premium p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--vp-glow-soft)] mb-4">
                    <mod.icon className="h-6 w-6 text-[var(--vp-accent)]" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{mod.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] mb-4">{mod.desc}</p>
                  <div className="pt-3 border-t border-[var(--border-primary)]">
                    <span className="text-xs font-semibold text-[var(--vp-accent)]">{mod.bizValue}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-28 overflow-hidden" dir="rtl" style={{ background: 'var(--vp-gradient-dark)' }}>
          <div className="container-shade relative">
            <div className="mx-auto max-w-2xl text-center" data-vp-animate="slide-up">
              <h2 className="vp-hero text-white mb-6">هل تريد رؤية المنصة في مؤسستك؟</h2>
              <p className="vp-subtitle text-white/70 max-w-xl mx-auto mb-10">
                احصل على عرض تجريبي مخصص لاحتياجات مؤسستك — يتضمن مسحاً أولياً لمستوى العافية.
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
