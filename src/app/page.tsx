"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useEffect, useRef } from "react";
import {
  Brain, Heart, BarChart3, Users, TrendingDown, Sparkles,
  CheckCircle2, Activity, Shield, ArrowLeft, Star, Target,
  DollarSign, LineChart, AlertTriangle, Cpu, Network, Layers,
  Wrench, Clock, HeadphonesIcon, Search, Settings, Award, Zap,
  Globe, Lock, Database, Eye
} from "lucide-react";
import { initScrollAnimations } from "@/lib/scroll-animations";

const stats = [
  { value: "٢٥٠+", label: "شركة", sub: "تستخدم المنصة", icon: Users },
  { value: "٩٨٪", label: "دقة تنبؤ", sub: "بالمخاطر الصحية", icon: Brain },
  { value: "٤٠٪", label: "خفض", sub: "في التكاليف التأمينية", icon: TrendingDown },
  { value: "٤.٩/٥", label: "تقييم", sub: "رضا العملاء", icon: Star },
];

const systemLayers = [
  { title: "التقييم والتحليل", icon: Brain, items: "HRA — AI Engine — Risk Scoring" },
  { title: "التوصيات الذكية", icon: Sparkles, items: "Meals — Consultations — Fitness" },
  { title: "المتابعة والقياس", icon: Activity, items: "Tracking — Dashboard — Reports" },
  { title: "التوفير المالي", icon: TrendingDown, items: "Insurance — ROI — Cost Analytics" },
];

const features = [
  {
    icon: Brain,
    title: "محرك تقييم تنبؤي",
    desc: "تقييم ١٢ مؤشراً صحياً خلال ٧ دقائق بدقة ٩٨٪",
    gradient: "from-[var(--vp-accent)] to-emerald-600",
  },
  {
    icon: TrendingDown,
    title: "التنبؤ بالتكاليف",
    desc: "نماذج مالية تتنبأ بالتكاليف التأمينية المستقبلية",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    icon: Target,
    title: "تدخل وقائي ذكي",
    desc: "يكتشف الحالات الحرجة قبل ١٨ شهراً من تطورها",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    icon: Shield,
    title: "حوكمة وامتثال",
    desc: "PDPL — SDAIA — ISO 27001 — SOC 2",
    gradient: "from-purple-500 to-violet-600",
  },
];

const differentiators = [
  { icon: Cpu, value: "٩٩.٩٥٪", label: "uptime", desc: "بنية تحتية سحابية موزعة" },
  { icon: Clock, value: "< ١٥", label: "دقيقة", desc: "متوسط وقت الاستجابة" },
  { icon: Shield, value: "٤", label: "شهادات", desc: "أمان وامتثال دولية" },
  { icon: TrendingDown, value: "٣.٢x", label: "ROI", desc: "عائد على كل ريال" },
];

const journeySteps = [
  { step: "01", title: "التقييم", desc: "الموظف يجيب على HRA ذكي", icon: Brain, color: "from-[var(--vp-accent)] to-emerald-600" },
  { step: "02", title: "التصنيف", desc: "AI يصنف المخاطر بدقة", icon: Cpu, color: "from-blue-500 to-indigo-600" },
  { step: "03", title: "التوصيات", desc: "خطط تغذية ولياقة مخصصة", icon: Heart, color: "from-amber-500 to-orange-600" },
  { step: "04", title: "المتابعة", desc: "لوحة تحكم وتقارير حية", icon: BarChart3, color: "from-purple-500 to-violet-600" },
  { step: "05", title: "التوفير", desc: "خفض التكاليف وتحسين ROI", icon: TrendingDown, color: "from-rose-500 to-pink-600" },
];

export default function Home() {
  useEffect(() => {
    const c = initScrollAnimations();
    return () => c();
  }, []);

  return (
    <>
      <Header />
      <main>
        {/* ═══════════════════════════════════════════════
           ✦ HERO — Cinematic Split
           ═══════════════════════════════════════════════ */}
        <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)]" dir="rtl">
          {/* Ambient layers */}
          <div className="absolute inset-0" style={{ background: 'var(--vp-gradient-hero)' }} />
          <div className="absolute inset-0 vp-grid-bg opacity-20" />
          <div className="vp-scan-line" />
          <div className="absolute top-1/4 left-[10%] w-72 h-72 rounded-full bg-[var(--vp-accent)]/5 blur-3xl vp-medical-glow" />
          <div className="absolute bottom-1/4 right-[15%] w-96 h-96 rounded-full bg-[var(--vp-cyan)]/5 blur-3xl vp-medical-glow" style={{ animationDelay: '2s' }} />

          <div className="container-shade relative z-10 min-h-screen flex flex-col justify-center py-28">
            {/* Category badge */}
            <div data-vp-animate="fade-up">
              <span className="vp-tag-premium text-xs tracking-widest">
                <Zap className="h-3 w-3" />
                Workforce Health Intelligence Platform
              </span>
            </div>

            {/* Hero headline — dramatic split */}
            <div className="mt-8 max-w-4xl" data-vp-animate="fade-up" data-vp-delay="1">
              <h1 className="text-[clamp(48px,7vw,96px)] font-extrabold leading-[0.95] tracking-[-0.04em] text-[var(--text-primary)]">
                حوِّل صحة
                <br />
                <span className="bg-gradient-to-l from-[var(--vp-accent)] via-[var(--vp-accent-light)] to-[var(--vp-cyan)] bg-clip-text text-transparent">
                  موظفيك
                </span>
                <br />
                إلى ذكاء مؤسسي
              </h1>
            </div>

            {/* Subtitle — offset for asymmetry */}
            <div className="mt-8 max-w-xl mr-auto" data-vp-animate="fade-up" data-vp-delay="2">
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                منصة ذكاء صحي مؤسسي تستخدم AI تنبؤي لتحليل المخاطر،
                خفض التكاليف، وتحويل صحة القوى العاملة إلى ميزة تنافسية قابلة للقياس.
              </p>
            </div>

            {/* CTAs — offset */}
            <div className="mt-10 flex flex-col sm:flex-row items-start gap-4" data-vp-animate="fade-up" data-vp-delay="3">
              <Link href="/demo" className="btn-premium group text-base px-10 py-4 !h-auto shadow-2xl shadow-[var(--vp-accent)]/20">
                اطلب عرضاً تجريبياً
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              </Link>
              <Link href="/product" className="btn-ghost text-base px-8 py-4 !h-auto border-[var(--vp-accent)]/20">
                <LineChart className="h-4 w-4" />
                اكتشف المنصة
              </Link>
            </div>

            {/* Trust metrics — horizontal, not cards */}
            <div className="mt-auto pt-20 border-t border-[var(--border-primary)]/30" data-vp-animate="fade-up" data-vp-delay="4">
              <div className="flex flex-wrap gap-x-12 gap-y-6">
                {stats.map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <item.icon className="h-5 w-5 text-[var(--vp-accent)]" />
                    <div>
                      <span className="text-xl font-extrabold text-[var(--text-primary)]">{item.value}</span>
                      <span className="text-xs text-[var(--text-muted)] mr-1.5">{item.label}</span>
                      <span className="text-xs text-[var(--text-muted)]">— {item.sub}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
           ✦ SECTION 2 — THE SYSTEM
           Full-bleed dark cinematic section with system diagram
           ═══════════════════════════════════════════════ */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[var(--bg-primary)] to-[var(--bg-secondary)]" dir="rtl">
          <div className="absolute inset-0 vp-data-dots opacity-30" />
          <div className="absolute inset-0 vp-grid-bg opacity-10" />

          <div className="container-shade relative z-10 py-28 lg:py-40">
            {/* Section label — offset */}
            <div className="mb-16" data-vp-animate="fade-up">
              <span className="vp-tag-premium">
                <Cpu className="h-3 w-3" />
                النظام البيئي
              </span>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: headline — dramatic */}
              <div data-vp-animate="fade-up">
                <h2 className="text-[clamp(36px,5vw,64px)] font-extrabold leading-[1.0] tracking-[-0.03em] text-[var(--text-primary)]">
                  منظومة متكاملة
                  <br />
                  <span className="vp-hero-em">من ٤ طبقات</span>
                </h2>
                <div className="w-20 h-1.5 rounded-full bg-gradient-to-l from-[var(--vp-accent)] to-[var(--vp-cyan)] mt-6" />
                <p className="mt-8 text-base text-[var(--text-secondary)] leading-relaxed max-w-md">
                  من التقييم الصحي إلى التوفير المالي — كل طبقة تغذي التي تليها.
                  نظام مغلق يعمل بتكامل كامل بدون تدخل يدوي.
                </p>
              </div>

              {/* Right: System layers — vertical connected flow */}
              <div className="space-y-0" data-vp-animate="fade-up" data-vp-delay="2">
                {systemLayers.map((layer, i) => (
                  <div key={layer.title} className="relative group">
                    <div className="flex items-center gap-6 p-6 rounded-2xl transition-all duration-500 hover:bg-[var(--vp-glow-soft)]">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--vp-accent)]/20 to-[var(--vp-accent)]/5 flex items-center justify-center border border-[var(--vp-accent)]/10 group-hover:border-[var(--vp-accent)]/30 transition-all">
                        <layer.icon className="h-7 w-7 text-[var(--vp-accent)]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-[var(--text-primary)]">{layer.title}</h3>
                        <p className="text-sm text-[var(--text-muted)] mt-1 font-mono tracking-tight">{layer.items}</p>
                      </div>
                      <span className="text-2xl font-bold text-[var(--vp-accent)]/20">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    {i < systemLayers.length - 1 && (
                      <div className="mr-20 h-6 w-px bg-gradient-to-b from-[var(--vp-accent)]/20 to-transparent mr-[2.35rem]" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
           ✦ SECTION 3 — OPERATIONAL ENGINE
           Asymmetrical, full-bleed, cinematic
           ═══════════════════════════════════════════════ */}
        <section className="relative overflow-hidden" dir="rtl" style={{ background: 'var(--vp-gradient-dark)' }}>
          <div className="absolute inset-0 vp-grid-bg opacity-[0.03]" />
          <div className="absolute top-[20%] left-[10%] w-80 h-80 rounded-full bg-[var(--vp-accent)]/5 blur-3xl" />
          <div className="absolute bottom-[10%] right-[20%] w-60 h-60 rounded-full bg-[var(--vp-cyan)]/5 blur-3xl" />

          <div className="container-shade relative z-10 py-28 lg:py-40">
            <div className="grid lg:grid-cols-5 gap-12">
              {/* Left — large, dominant */}
              <div className="lg:col-span-3" data-vp-animate="fade-up">
                <span className="vp-tag-premium vp-tag-white">
                  <Wrench className="h-3 w-3" />
                  التميز التشغيلي
                </span>
                <h2 className="text-[clamp(32px,4.5vw,56px)] font-extrabold leading-[1.0] tracking-[-0.03em] text-white mt-6">
                  ليس مجرد
                  <br />
                  <span className="text-[var(--vp-accent)]">نظام صحي</span>
                  <br />
                  بنية تحتية تشغيلية
                </h2>
                <div className="w-20 h-1.5 rounded-full bg-gradient-to-l from-[var(--vp-accent)] to-[var(--vp-cyan)] mt-6" />
                <p className="mt-8 text-white/60 leading-relaxed max-w-lg">
                  المنافسون يقدمون حلولاً صحية. نحن نقدم نظاماً تشغيلياً متكاملاً —
                  فرق في الهندسة، التشغيل، الدعم، والنتائج.
                </p>
              </div>

              {/* Right — metrics grid, asymmetrical */}
              <div className="lg:col-span-2" data-vp-animate="fade-up" data-vp-delay="2">
                <div className="grid grid-cols-2 gap-3">
                  {differentiators.map((item) => (
                    <div key={item.label} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 hover:bg-white/[0.05] transition-all">
                      <item.icon className="h-5 w-5 text-[var(--vp-accent)] mb-2" />
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-extrabold text-white">{item.value}</span>
                        <span className="text-xs font-medium text-[var(--vp-accent)]">{item.label}</span>
                      </div>
                      <p className="text-xs text-white/50 mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom: workflow — horizontal, not cards */}
            <div className="mt-20 pt-16 border-t border-white/[0.06]" data-vp-animate="fade-up" data-vp-delay="3">
              <p className="text-sm text-white/40 mb-8 tracking-widest uppercase font-mono">Service Workflow</p>
              <div className="grid grid-cols-5 gap-2">
                {[
                  { icon: HeadphonesIcon, step: "01", title: "بلاغ" },
                  { icon: Search, step: "02", title: "تشخيص" },
                  { icon: Clock, step: "03", title: "جدولة" },
                  { icon: Wrench, step: "04", title: "إصلاح" },
                  { icon: Shield, step: "05", title: "ضمان" },
                ].map((item, i) => (
                  <div key={item.step} className="text-center group">
                    <div className="w-16 h-16 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mx-auto mb-3 group-hover:bg-white/[0.08] transition-all">
                      <item.icon className="h-6 w-6 text-[var(--vp-accent)]" />
                    </div>
                    <p className="text-xs text-white/40 font-mono">{item.step}</p>
                    <p className="text-sm font-semibold text-white/80">{item.title}</p>
                    {i < 4 && <div className="hidden lg:block absolute top-8 left-[60%] w-[calc(40%)] h-px bg-gradient-to-r from-[var(--vp-accent)]/20 to-transparent" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
           ✦ SECTION 4 — THE DIFFERENCE
           Large metrics, minimal, powerful
           ═══════════════════════════════════════════════ */}
        <section className="relative overflow-hidden" dir="rtl">
          <div className="absolute inset-0 vp-grid-bg opacity-20" />
          <div className="container-shade relative z-10 py-28 lg:py-36">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-20" data-vp-animate="fade-up">
                <span className="vp-tag-premium">
                  <Award className="h-3 w-3" />
                  الفرق التشغيلي
                </span>
                <h2 className="text-[clamp(32px,4.5vw,56px)] font-extrabold leading-[1.0] tracking-[-0.03em] text-[var(--text-primary)] mt-6">
                  نقيس أداءنا{' '}
                  <span className="vp-hero-em">بالأرقام</span>
                </h2>
              </div>

              {/* Large metric display */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12" data-vp-animate="fade-up" data-vp-delay="2">
                {[
                  { value: "٩٩.٧٪", label: "الالتزام بمواعيد الصيانة", sub: "خلال ١٢ شهراً" },
                  { value: "٩٨.٥٪", label: "رضا العملاء", sub: "عن جودة الخدمة" },
                  { value: "١٢,٠٠٠+", label: "جهاز تمت صيانته", sub: "منذ انطلاق المنصة" },
                  { value: "٤٥+", label: "سنوات خبرة", sub: "للحصول على التراكمية" },
                ].map((m) => (
                  <div key={m.label} className="text-center">
                    <p className="text-[clamp(40px,5vw,64px)] font-extrabold leading-[0.9] tracking-[-0.03em] bg-gradient-to-b from-[var(--vp-accent)] to-[var(--vp-accent-dark)] bg-clip-text text-transparent">
                      {m.value}
                    </p>
                    <p className="text-base font-bold text-[var(--text-primary)] mt-3">{m.label}</p>
                    <p className="text-sm text-[var(--text-muted)] mt-1">{m.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
           ✦ SECTION 5 — CAPABILITIES
           Asymmetrical feature showcase
           ═══════════════════════════════════════════════ */}
        <section className="relative overflow-hidden" dir="rtl" style={{ background: 'var(--vp-gradient-card)' }}>
          <div className="absolute inset-0 vp-data-dots opacity-20" />
          <div className="container-shade relative z-10 py-28 lg:py-36">
            <div className="max-w-3xl mb-16" data-vp-animate="fade-up">
              <span className="vp-tag-premium">
                <Zap className="h-3 w-3" />
                قدرات المنصة
              </span>
              <h2 className="text-[clamp(32px,4vw,48px)] font-extrabold leading-[1.0] tracking-[-0.03em] text-[var(--text-primary)] mt-6">
                أربع قدرات{' '}
                <span className="vp-hero-em">تجمعها منصة واحدة</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-px bg-[var(--border-primary)] rounded-3xl overflow-hidden" data-vp-animate="fade-up" data-vp-delay="2">
              {features.map((f, i) => (
                <div key={f.title} className="bg-[var(--bg-card)] p-8 lg:p-10 group relative overflow-hidden">
                  <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${f.gradient} opacity-[0.03] blur-3xl group-hover:opacity-[0.06] transition-opacity`} />
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-5`}>
                      <f.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">{f.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
           ✦ SECTION 6 — JOURNEY
           Horizontal timeline, not cards
           ═══════════════════════════════════════════════ */}
        <section className="relative overflow-hidden" dir="rtl" style={{ background: 'var(--vp-gradient-dark)' }}>
          <div className="absolute inset-0 vp-grid-bg opacity-[0.03]" />
          <div className="container-shade relative z-10 py-28 lg:py-36">
            <div className="max-w-3xl mb-16" data-vp-animate="fade-up">
              <span className="vp-tag-premium vp-tag-white">
                <Layers className="h-3 w-3" />
                رحلة العافية
              </span>
              <h2 className="text-[clamp(32px,4vw,48px)] font-extrabold leading-[1.0] tracking-[-0.03em] text-white mt-6">
                من أول تقييم إلى{' '}
                <span className="text-[var(--vp-accent)]">توفير مالي</span>
              </h2>
            </div>

            {/* Timeline — horizontal connected */}
            <div className="relative" data-vp-animate="fade-up" data-vp-delay="2">
              {/* Progress line */}
              <div className="absolute top-12 right-0 left-0 h-px bg-gradient-to-l from-[var(--vp-accent)]/40 via-[var(--vp-accent)]/10 to-transparent" />

              <div className="grid grid-cols-5 gap-4">
                {journeySteps.map((step, i) => (
                  <div key={step.step} className="relative">
                    {/* Step circle */}
                    <div className="w-24 h-24 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mx-auto mb-4 relative">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center`}>
                        <step.icon className="h-7 w-7 text-white" />
                      </div>
                      <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[var(--vp-accent)] text-white text-[10px] font-bold flex items-center justify-center">
                        {step.step}
                      </span>
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-white">{step.title}</h3>
                      <p className="text-sm text-white/60 mt-1">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
           ✦ SECTION 7 — TRUST & SECURITY
           Minimal, elegant, badge-style
           ═══════════════════════════════════════════════ */}
        <section className="relative overflow-hidden" dir="rtl">
          <div className="absolute inset-0 vp-grid-bg opacity-20" />
          <div className="container-shade relative z-10 py-24">
            <div className="flex flex-wrap items-center justify-center gap-8" data-vp-animate="fade-up">
              {[
                { icon: Lock, label: "AES-256 & TLS 1.3" },
                { icon: Eye, label: "إخفاء الهوية" },
                { icon: Database, label: "PDPL — SDAIA" },
                { icon: Shield, label: "ISO 27001 — SOC 2" },
                { icon: Cpu, label: "AI قابل للتفسير" },
                { icon: Users, label: "موافقة مستنيرة" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--vp-glow-soft)] border border-[var(--vp-accent)]/10 text-sm text-[var(--text-secondary)] hover:bg-[var(--vp-glow-medium)] transition-all">
                  <item.icon className="h-4 w-4 text-[var(--vp-accent)]" />
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
           ✦ SECTION 8 — FINAL CTA
           Cinematic full-bleed
           ═══════════════════════════════════════════════ */}
        <section className="relative overflow-hidden" dir="rtl" style={{ background: 'var(--vp-gradient-dark)' }}>
          <div className="absolute inset-0 vp-grid-bg opacity-[0.03]" />
          <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-[var(--vp-accent)]/5 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-[var(--vp-cyan)]/5 blur-3xl" />

          <div className="container-shade relative z-10 py-36">
            <div className="max-w-3xl" data-vp-animate="slide-up">
              <span className="vp-tag-premium vp-tag-white">
                <Globe className="h-3 w-3" />
                استعد لمستقبل الصحة المؤسسية
              </span>

              <h2 className="text-[clamp(40px,6vw,80px)] font-extrabold leading-[0.95] tracking-[-0.04em] text-white mt-8">
                البنية التحتية
                <br />
                <span className="text-[var(--vp-accent)]">لصحة القوى العاملة</span>
                <br />
                في المملكة
              </h2>

              <div className="w-20 h-1.5 rounded-full bg-gradient-to-l from-[var(--vp-accent)] to-[var(--vp-cyan)] mt-8" />

              <p className="mt-8 text-lg text-white/60 max-w-lg leading-relaxed">
                انضم إلى الشركات الرائدة التي تستخدم Sehhati لتحويل صحة موظفيها
                إلى ذكاء مؤسسي وقيمة مالية.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
                <Link href="/demo" className="btn-premium group text-base px-12 py-5 !h-auto !bg-white !text-[var(--vp-ink)] shadow-2xl shadow-black/20">
                  اطلب عرضاً تجريبياً
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                </Link>
                <Link href="/pricing" className="btn-ghost !border-white/20 !text-white hover:!bg-white/5 text-base px-8 py-5 !h-auto">
                  شاهد الأسعار
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
