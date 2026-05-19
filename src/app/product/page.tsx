"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Brain, BarChart3, Users, Apple, Shield, ArrowLeft, Activity, Heart,
  TrendingDown, Sparkles, CheckCircle2, Target, LineChart, DollarSign,
  Layers, Server, Network, Zap, Lock, FileText, Building2, Cpu
} from "lucide-react";
import { initScrollAnimations } from "@/lib/scroll-animations";

const platformLayers = [
  {
    icon: Users,
    title: "طبقة المستخدمين",
    subtitle: "Employee Experience",
    items: ["تقييم HRA الذكي", "لوحة العافية الشخصية", "نظام الوجبات المخصصة", "حجز الاستشارات", "متابعة التقدم الصحي"],
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: Brain,
    title: "طبقة الذكاء الاصطناعي",
    subtitle: "AI Intelligence Layer",
    items: ["محرك التنبؤ بالمخاطر", "تصنيف المخاطر (Low/Medium/High/Critical)", "توصيات ذكية مخصصة", "تحليل الاتجاهات المستقبلية", "تفسير القرارات (Explainable AI)"],
    color: "from-[var(--vp-accent)] to-[var(--vp-accent-dark)]",
  },
  {
    icon: BarChart3,
    title: "طبقة التحليلات المؤسسية",
    subtitle: "Enterprise Analytics",
    items: ["لوحة القيادة التنفيذية", "Wellness Score المؤسسي", "تقارير ROI والتكاليف", "تحليل الأقسام والفروع", "التنبؤ بالتكاليف التأمينية"],
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Shield,
    title: "طبقة الأمان والحوكمة",
    subtitle: "Security & Compliance",
    items: ["تشفير AES-256 و TLS 1.3", "إخفاء الهوية (Anonymization)", "سجل تدقيق كامل (Audit Log)", "توافق مع PDPL و SDAIA", "الموافقة المستنيرة (Consent)"],
    color: "from-purple-500 to-violet-600",
  },
];

const productHighlights = [
  {
    icon: Target,
    title: "التنبؤ المبكر",
    desc: "نموذج AI يحلل 12 مؤشراً صحياً ويتنبأ بالمخاطر قبل 18 شهراً من تطور الحالات.",
    stat: "98%",
    statLabel: "دقة التنبؤ",
  },
  {
    icon: TrendingDown,
    title: "خفض التكاليف",
    desc: "تحليل مستمر للتكاليف التأمينية مع توصيات لتقليل الأعباء المالية.",
    stat: "40%",
    statLabel: "متوسط التوفير",
  },
  {
    icon: LineChart,
    title: "ذكاء مؤسسي",
    desc: "لوحة تنفيذية تعرض مؤشرات الصحة المؤسسية والتكاليف والعائد على الاستثمار.",
    stat: "3.2x",
    statLabel: "ROI",
  },
  {
    icon: Shield,
    title: "امتثال كامل",
    desc: "منصة مصممة للتوافق مع أنظمة حماية البيانات السعودية والعالمية.",
    stat: "100%",
    statLabel: "امتثال",
  },
];

export default function ProductPage() {
  useEffect(() => { const c = initScrollAnimations(); return () => c(); }, []);

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative py-28 overflow-hidden bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)]" dir="rtl">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'var(--vp-gradient-hero)' }} />
          <div className="absolute inset-0 vp-grid-bg opacity-30" />
          <div className="container-shade relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[var(--vp-glow-soft)] border border-[var(--vp-accent)]/10 text-[var(--vp-accent)] text-sm font-medium mb-6" data-vp-animate="fade-up">
              <span className="vp-breathing-ring inline-block" style={{ width: '6px', height: '6px' }} />
              المنتج
            </div>
            <h1 className="vp-hero max-w-4xl mx-auto" data-vp-animate="fade-up" data-vp-delay="1">
              منصة متكاملة لذكاء{' '}
              <br />
              <span className="vp-hero-em">صحة القوى العاملة</span>
            </h1>
            <p className="vp-subtitle text-[var(--text-secondary)] max-w-2xl mx-auto mt-6" data-vp-animate="fade-up" data-vp-delay="2">
              ليس نظام wellness — إنها بنية تحتية للصحة المؤسسية مدعومة بالذكاء الاصطناعي.
              أربع طبقات تكاملية تعمل معاً لتحويل صحة الموظفين إلى ذكاء مؤسسي وقيمة مالية.
            </p>
          </div>
        </section>

        {/* Platform Architecture Layers */}
        <section className="section-padding relative overflow-hidden" dir="rtl">
          <div className="absolute inset-0 vp-grid-bg opacity-20" />
          <div className="container-shade relative z-10">
            <div className="mx-auto max-w-3xl text-center mb-12" data-vp-animate="fade-up">
              <span className="vp-label">البنية التحتية</span>
              <h2 className="vp-section-title mt-4">
                أربع طبقات تعمل{' '}
                <span className="vp-hero-em">بتكامل كامل</span>
              </h2>
              <div className="w-16 h-1 rounded-full bg-gradient-to-l from-[var(--vp-accent)] to-[var(--vp-cyan)] mx-auto mt-4" />
            </div>

            <div className="space-y-6">
              {platformLayers.map((layer, i) => (
                <div key={layer.title} className="card-premium p-6 lg:p-8" data-vp-animate="fade-up" data-vp-delay={String(i + 1)}>
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex items-start gap-4 lg:w-72 shrink-0">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${layer.color} flex items-center justify-center shrink-0`}>
                        <layer.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[var(--text-primary)]">{layer.title}</h3>
                        <p className="text-xs text-[var(--text-secondary)]">{layer.subtitle}</p>
                      </div>
                    </div>
                    <div className="flex-1 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {layer.items.map((item) => (
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

        {/* Product Highlights */}
        <section className="section-padding relative overflow-hidden" dir="rtl" style={{ background: 'var(--vp-gradient-dark)' }}>
          <div className="absolute inset-0 vp-grid-bg opacity-[0.04]" />
          <div className="container-shade relative z-10">
            <div className="mx-auto max-w-3xl text-center mb-12" data-vp-animate="fade-up">
              <span className="vp-label text-white/60">المؤشرات</span>
              <h2 className="vp-section-title text-white mt-4">
                نتائج قابلة{' '}
                <span className="text-[var(--vp-accent)]">للقياس والثقة</span>
              </h2>
              <div className="w-16 h-1 rounded-full bg-gradient-to-l from-[var(--vp-accent)] to-[var(--vp-cyan)] mx-auto mt-4" />
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" data-vp-animate="fade-up" data-vp-delay="2">
              {productHighlights.map((item) => (
                <div key={item.title} className="card-premium !p-6 text-center bg-white/5 border-white/10 hover:!border-[var(--vp-accent)]/30">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--vp-glow-soft)] mx-auto mb-4">
                    <item.icon className="h-6 w-6 text-[var(--vp-accent)]" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-white/70 mb-4">{item.desc}</p>
                  <div className="text-2xl font-extrabold text-[var(--vp-accent)]">{item.stat}</div>
                  <p className="text-xs text-white/50 mt-1">{item.statLabel}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Employee Journey */}
        <section className="section-padding relative overflow-hidden" dir="rtl">
          <div className="absolute inset-0 vp-grid-bg opacity-20" />
          <div className="container-shade relative z-10">
            <div className="mx-auto max-w-3xl text-center mb-12" data-vp-animate="fade-up">
              <span className="vp-label">رحلة الموظف</span>
              <h2 className="vp-section-title mt-4">
                من أول تقييم إلى{' '}
                <span className="vp-hero-em">تحسن مستدام</span>
              </h2>
              <div className="w-16 h-1 rounded-full bg-gradient-to-l from-[var(--vp-accent)] to-[var(--vp-cyan)] mx-auto mt-4" />
            </div>

            <div className="grid gap-6 md:grid-cols-4" data-vp-animate="fade-up" data-vp-delay="2">
              {[
                { icon: Activity, step: "1", title: "التقييم", desc: "يقيم صحته في 7 دقائق عبر HRA الذكي", color: "text-blue-500" },
                { icon: Brain, step: "2", title: "التحليل", desc: "AI يحلل البيانات ويصنف مستوى المخاطر", color: "text-[var(--accent)]" },
                { icon: Heart, step: "3", title: "التوصيات", desc: "يحصل على خطط تغذية ولياقة مخصصة", color: "text-amber-500" },
                { icon: TrendingDown, step: "4", title: "التحسن", desc: "يتابع تقدمه مع تحسن مستمر في العافية", color: "text-purple-500" },
              ].map((item) => (
                <div key={item.title} className="card-premium p-6 text-center">
                  <div className={`w-14 h-14 rounded-2xl bg-[var(--vp-glow-soft)] flex items-center justify-center mx-auto mb-4`}>
                    <item.icon className={`h-7 w-7 ${item.color}`} />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[var(--vp-accent)] text-white text-sm font-bold flex items-center justify-center mx-auto mb-3">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{item.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Integrations */}
        <section className="section-padding relative overflow-hidden" dir="rtl" style={{ background: 'var(--vp-gradient-card)' }}>
          <div className="container-shade">
            <div className="mx-auto max-w-3xl text-center mb-12" data-vp-animate="fade-up">
              <span className="vp-label">التكاملات</span>
              <h2 className="vp-section-title mt-4">
                يتكامل مع{' '}
                <span className="vp-hero-em">أنظمتك الحالية</span>
              </h2>
              <div className="w-16 h-1 rounded-full bg-gradient-to-l from-[var(--vp-accent)] to-[var(--vp-cyan)] mx-auto mt-4" />
              <p className="vp-subtitle mt-4 text-[var(--text-secondary)]">
                API مفتوح وتكاملات جاهزة مع الأنظمة المؤسسية الأكثر استخداماً
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-vp-animate="fade-up" data-vp-delay="2">
              {[
                { icon: Building2, title: "ERP Systems", desc: "SAP, Oracle, Microsoft Dynamics" },
                { icon: Users, title: "HRMS", desc: "منصة الموارد البشرية الحالية" },
                { icon: Shield, title: "Insurance APIs", desc: "ربط مع شركات التأمين الصحي" },
                { icon: Server, title: "Open API", desc: "RESTful API للتكامل المخصص" },
              ].map((item) => (
                <div key={item.title} className="card-premium p-5 text-center">
                  <item.icon className="h-8 w-8 text-[var(--vp-accent)] mx-auto mb-3" />
                  <h3 className="text-sm font-bold text-[var(--text-primary)]">{item.title}</h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-28 overflow-hidden" dir="rtl" style={{ background: 'var(--vp-gradient-dark)' }}>
          <div className="absolute inset-0 vp-grid-bg opacity-[0.03]" />
          <div className="container-shade relative">
            <div className="mx-auto max-w-2xl text-center" data-vp-animate="slide-up">
              <h2 className="vp-hero text-white mb-6">جاهز لاستكشاف المنصة؟</h2>
              <p className="vp-subtitle text-white/70 max-w-xl mx-auto mb-10">احصل على عرض تجريبي مخصص لاحتياجات مؤسستك</p>
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
