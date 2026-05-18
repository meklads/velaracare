"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useEffect } from "react";
import {
  Brain,
  Heart,
  BarChart3,
  Users,
  TrendingDown,
  Sparkles,
  CheckCircle2,
  Apple,
  Activity,
  Shield,
  ArrowLeft,
  Star,
  Target,
  DollarSign,
  LineChart,
  AlertTriangle,
} from "lucide-react";
import { initScrollAnimations, initCountUpAnimations } from "@/lib/scroll-animations";
import SystemArchitecture from "@/components/home/SystemArchitecture";
import EnterpriseProductPreview from "@/components/home/EnterpriseProductPreview";
import FinancialImpactSection from "@/components/home/FinancialImpactSection";
import AITrustSection from "@/components/home/AITrustSection";
import FutureVisionSection from "@/components/home/FutureVisionSection";

const features = [
  {
    icon: Brain,
    title: "محرك التقييم الصحي التنبؤي (HRA)",
    desc: "تقييم ذكي خلال ٧ دقائق يحلل ١٢ مؤشراً صحياً ويصنف المخاطر بدقة ٩٨٪ باستخدام AI.",
  },
  {
    icon: TrendingDown,
    title: "التنبؤ بالتكاليف التأمينية",
    desc: "نماذج رياضية تتنبأ بالتكاليف الصحية المستقبلية للقوى العاملة — تخطط للميزانية بدقة.",
  },
  {
    icon: BarChart3,
    title: "ذكاء العافية المؤسسية",
    desc: "لوحة تنفيذية تعرض Wellness Score، اتجاهات المخاطر، والعائد على الاستثمار الصحي.",
  },
  {
    icon: Target,
    title: "التدخل الوقائي الذكي",
    desc: "النظام يحدد الموظفين الأكثر عرضة للخطر ويوصي بخطط تدخل مخصصة قبل تطور الحالات.",
  },
  {
    icon: Apple,
    title: "نظام التوصيات الصحية المتكامل",
    desc: "وجبات مخصصة، استشارات تغذية ولياقة، وخطط عافية مبنية على التحليل التنبؤي لكل موظف.",
  },
  {
    icon: Shield,
    title: "تقارير الحوكمة والامتثال",
    desc: "تقارير جاهزة لمتطلبات هيئة الصحة العامة و SDAIA — مع توثيق كامل للامتثال الصحي.",
  },
];

const plans = [
  {
    name: "Starter",
    price: "٣٥",
    desc: "للشركات الناشئة والصغيرة.",
    features: [
      "لوحة تحكم أساسية",
      "تقييم صحي للموظفين",
      "نظام الوجبات الذكية",
      "تقرير شهري",
    ],
    popular: false,
  },
  {
    name: "Growth",
    price: "٧٥",
    desc: "للشركات المتوسطة — الأكثر طلباً.",
    features: [
      "جميع مميزات Starter",
      "AI Predictive Engine",
      "Wellness Score + اتجاهات",
      "استشارات تغذية ولياقة",
      "تقارير ROI شهرية",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "١٦٠",
    desc: "للشركات الكبرى والمؤسسات.",
    features: [
      "جميع مميزات Growth",
      "Loحة تنفيذية متقدمة",
      "تكامل مع أنظمة ERP/HRMS",
      "التنبؤ بالتكاليف التأمينية",
      "مدير حساب مخصص + دعم ٢٤/٧",
      "API مفتوح للتكامل",
    ],
    popular: false,
  },
];

export default function Home() {
  useEffect(() => {
    const cleanup1 = initScrollAnimations();
    const cleanup2 = initCountUpAnimations();
    return () => { cleanup1(); cleanup2(); };
  }, []);

  return (
    <>
      <Header />
      <main>
        {/* ═══════════════════════════════════════════════
           ✦ HERO — Enterprise Workforce Health Intelligence
           ═══════════════════════════════════════════════ */}
        <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)]" dir="rtl">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'var(--vp-gradient-hero)' }} />
          <div className="absolute inset-0 vp-grid-bg opacity-30" />

          {/* Cinematic ambient particles */}
          <div className="absolute top-1/5 left-[10%] w-2 h-2 rounded-full bg-[var(--vp-accent)]/20 vp-float" style={{ animationDelay: '0s' }} />
          <div className="absolute top-1/4 right-[15%] w-3 h-3 rounded-full bg-[var(--vp-cyan)]/15 vp-float" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-1/3 right-[25%] w-4 h-4 rounded-full bg-[var(--vp-accent)]/10 vp-float" style={{ animationDelay: '4s' }} />
          <div className="absolute top-2/3 left-[20%] w-2 h-2 rounded-full bg-[var(--vp-lavender)]/15 vp-float" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-1/4 left-[40%] w-3 h-3 rounded-full bg-[var(--vp-accent)]/12 vp-float" style={{ animationDelay: '3s' }} />

          <div className="container-shade relative z-10 w-full py-24">
            <div className="mx-auto max-w-5xl text-center">
              {/* Category-defining badge */}
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[var(--vp-glow-soft)] border border-[var(--vp-accent)]/10 text-[var(--vp-accent)] text-sm font-medium mb-6" data-vp-animate="fade-up">
                <span className="vp-breathing-ring inline-block" style={{ width: '6px', height: '6px' }} />
                Workforce Health Intelligence Platform
              </div>

              {/* Hero headline — enterprise scale */}
              <h1 className="vp-hero mb-6" data-vp-animate="fade-up" data-vp-delay="1">
                <span className="text-[var(--text-primary)]">حوِّل صحة موظفيك</span>
                <br />
                <span className="vp-hero-em">إلى ذكاء مؤسسي وقيمة مالية</span>
              </h1>

              <p className="vp-subtitle max-w-3xl mx-auto mb-10" data-vp-animate="fade-up" data-vp-delay="2">
                منصة ذكاء صحي مؤسسي تستخدم الذكاء الاصطناعي التنبؤي لتحليل مخاطر القوى العاملة،
                خفض التكاليف التأمينية، وتحويل صحة الموظفين إلى ميزة تنافسية قابلة للقياس.
              </p>

              {/* Enterprise CTA Group */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4" data-vp-animate="fade-up" data-vp-delay="3">
                <Link href="/demo" className="btn-premium group text-base px-10 py-4 !h-auto">
                  اطلب عرضاً تجريبياً للمؤسسات
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                </Link>
                <Link href="/features" className="btn-ghost text-base px-8 py-4 !h-auto">
                  <LineChart className="h-4 w-4" />
                  اكتشف المنصة
                </Link>
              </div>
            </div>

            {/* Enterprise Trust Metrics */}
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto" data-vp-animate="slide-up" data-vp-delay="4">
              {[
                { value: "٢٥٠+", label: "شركة تستخدم المنصة", icon: Users },
                { value: "٩٨٪", label: "دقة التنبؤ بالمخاطر", icon: Brain },
                { value: "٤٠٪", label: "متوسط خفض التكاليف", icon: TrendingDown },
                { value: "٤.٩/٥", label: "تقييم العملاء", icon: Star },
              ].map((item) => (
                <div key={item.label} className="glass-premium rounded-2xl p-4 text-center hover:bg-[var(--vp-glow-soft)] transition-all duration-500">
                  <item.icon className="h-5 w-5 text-[var(--vp-accent)] mx-auto mb-2" />
                  <span className="vp-stat text-lg" data-vp-count-to={item.value}>{item.value}</span>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
           ✦ PRODUCT ARCHITECTURE VISUALIZATION
           ═══════════════════════════════════════════════ */}
        <SystemArchitecture />

        {/* ═══════════════════════════════════════════════
           ✦ ENTERPRISE PRODUCT EXPERIENCE
           ═══════════════════════════════════════════════ */}
        <EnterpriseProductPreview />

        {/* ═══════════════════════════════════════════════
           ✦ FINANCIAL IMPACT + CASE STUDY
           ═══════════════════════════════════════════════ */}
        <FinancialImpactSection />

        {/* ═══════════════════════════════════════════════
           ✦ FEATURES GRID
           ═══════════════════════════════════════════════ */}
        <section className="section-padding relative overflow-hidden" id="features" dir="rtl">
          <div className="absolute inset-0 vp-grid-bg opacity-20" />
          <div className="container-shade relative">
            <div className="mx-auto max-w-3xl text-center" data-vp-animate="fade-up">
              <span className="vp-label">قدرات المنصة</span>
              <h2 className="vp-section-title mt-4">
                بنية تحتية متكاملة لذكاء{' '}
                <span className="vp-hero-em">صحة القوى العاملة</span>
              </h2>
              <div className="w-16 h-1 rounded-full bg-gradient-to-l from-[var(--vp-accent)] to-[var(--vp-cyan)] mx-auto mt-4" />
              <p className="vp-subtitle mt-4 text-[var(--text-secondary)]">
                ليس مجرد نظام wellness — منصة حوكمة صحية مؤسسية مدعومة بالذكاء الاصطناعي.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f, i) => (
                <div key={f.title} className="card-premium p-6 sm:p-8" data-vp-animate="fade-up" data-vp-delay={String((i % 4) + 1)}>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--vp-glow-soft)] mb-5">
                    <f.icon className="h-7 w-7 text-[var(--vp-accent)]" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">{f.title}</h3>
                  <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
           ✦ HOW IT WORKS — Enterprise Flow
           ═══════════════════════════════════════════════ */}
        <section className="section-padding relative overflow-hidden" dir="rtl" style={{ background: 'var(--vp-gradient-card)' }}>
          <div className="container-shade">
            <div className="mx-auto max-w-3xl text-center" data-vp-animate="fade-up">
              <span className="vp-label">كيف تعمل المنصة</span>
              <h2 className="vp-section-title mt-4">
                من التقييم إلى التوفير —{' '}
                <span className="vp-hero-em">في ٥ مراحل</span>
              </h2>
              <div className="w-16 h-1 rounded-full bg-gradient-to-l from-[var(--vp-accent)] to-[var(--vp-cyan)] mx-auto mt-4" />
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-5">
              {[
                { step: "01", title: "تقييم صحي ذكي", desc: "الموظف يجيب على تقييم HRA خلال ٧ دقائق — يحلل ١٢ مؤشراً صحياً." },
                { step: "02", title: "AI يصنف المخاطر", desc: "محرك تنبؤي يحلل البيانات ويصنف كل موظف حسب مستوى الخطورة." },
                { step: "03", title: "توصيات مخصصة", desc: "خطط تغذية، لياقة، واستشارات مبنية على التحليل التنبؤي لكل موظف." },
                { step: "04", title: "متابعة وتحليل", desc: "لوحة تنفيذية حية تعرض التقدم، المخاطر، والعائد على الاستثمار." },
                { step: "05", title: "توفير مالي", desc: "تقارير ربع سنوية توضح خفض التكاليف التأمينية وتحسن الإنتاجية." },
              ].map((item, i) => (
                <div key={item.step} className="card-premium p-6 text-center relative" data-vp-animate="fade-up" data-vp-delay={String(i + 1)}>
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--vp-glow-soft)]">
                    <span className="text-xl font-bold text-[var(--vp-accent)]">{item.step}</span>
                  </div>
                  <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">{item.title}</h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
                  {i < 4 && (
                    <div className="hidden md:block absolute -left-3 top-1/2 -translate-y-1/2 text-[var(--vp-accent)]/30">
                      <ArrowLeft className="h-5 w-5" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
           ✦ PRICING — Enterprise Plans
           ═══════════════════════════════════════════════ */}
        <section className="section-padding relative overflow-hidden" id="pricing" dir="rtl">
          <div className="absolute inset-0 vp-grid-bg opacity-20" />
          <div className="container-shade relative">
            <div className="mx-auto max-w-3xl text-center" data-vp-animate="fade-up">
              <span className="vp-label">الأسعار</span>
              <h2 className="vp-section-title mt-4">
                استثمار في صحة{' '}
                <span className="vp-hero-em">قواك العاملة</span>
              </h2>
              <div className="w-16 h-1 rounded-full bg-gradient-to-l from-[var(--vp-accent)] to-[var(--vp-cyan)] mx-auto mt-4" />
              <p className="vp-subtitle mt-4 text-[var(--text-secondary)]">
                اشتراك شهري لكل موظف — مع عائد استثمار يصل إلى ٣ أضعاف التكلفة
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3 max-w-5xl mx-auto">
              {plans.map((plan, i) => (
                <div key={plan.name} className={`card-premium p-6 sm:p-8 text-center relative ${plan.popular ? 'border-2 border-[var(--vp-accent)] shadow-xl shadow-[var(--vp-accent)]/5' : ''}`} data-vp-animate="scale-in" data-vp-delay={String(i + 1)}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1.5 rounded-full text-xs font-bold text-white" style={{ background: 'var(--vp-gradient-cta)' }}>
                        الأكثر طلباً
                      </span>
                    </div>
                  )}
                  <p className="text-lg font-bold text-[var(--text-primary)]">{plan.name}</p>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">{plan.desc}</p>
                  <div className="mt-4 flex items-baseline justify-center gap-1">
                    <span className="vp-stat">{plan.price}</span>
                    <span className="text-sm text-[var(--text-secondary)]">ريال/موظف</span>
                  </div>
                  <ul className="mt-6 space-y-3 text-right">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--vp-accent)]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/demo"
                    className={`${plan.popular ? 'btn-premium' : 'btn-ghost'} mt-6 w-full justify-center text-center`}
                  >
                    اطلع على الخطة
                  </Link>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-sm text-[var(--text-muted)]">
                جميع الأسعار بالريال السعودي. اشتراك شهري لكل موظف.
                <br />
                اتصل بنا للحصول على خصم للشركات الكبرى (أكثر من ١٠٠٠ موظف).
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
           ✦ AI TRUST & EXPLAINABILITY
           ═══════════════════════════════════════════════ */}
        <AITrustSection />

        {/* ═══════════════════════════════════════════════
           ✦ TESTIMONIALS — Enterprise
           ═══════════════════════════════════════════════ */}
        <section className="section-padding relative overflow-hidden" dir="rtl" style={{ background: 'var(--vp-gradient-card)' }}>
          <div className="container-shade">
            <div className="mx-auto max-w-3xl text-center" data-vp-animate="fade-up">
              <span className="vp-label">شهادات المؤسسات</span>
              <h2 className="vp-section-title mt-4">
                ماذا يقول{' '}
                <span className="vp-hero-em">قادة المؤسسات</span>
              </h2>
              <div className="w-16 h-1 rounded-full bg-gradient-to-l from-[var(--vp-accent)] to-[var(--vp-cyan)] mx-auto mt-4" />
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                { quote: "منصة Sehhati غيرت نظرتنا لصحة الموظفين من مصروف إلى استثمار. التقرير الربعي للـ ROI أقنع مجلس الإدارة بتوسيع البرنامج ليشمل كل الفروع.", name: "أ. محمد العبدالله", role: "CHRO", company: "شركة التقنية المتقدمة" },
                { quote: "كنا ندفع ١٢ مليون في السنة تكاليف تأمينية. بعد سنة من Sehhati، انخفضت الفواتير ٣٨٪. النظام دفع نفسه بنفسه.", name: "أ. سارة القحطاني", role: "الرئيس التنفيذي", company: "مجموعة الخليج المالية" },
                { quote: "النظام التنبؤي اكتشف ٢٧ حالة حرجة مبكراً — موظفين كنا هنفقدهم بدون تدخل وقائي. هذا هو المستقبل الحقيقي للصحة المؤسسية.", name: "م. فيصل الدوسري", role: "مدير العمليات", company: "شركة الاتصالات السعودية" },
              ].map((item, i) => (
                <div key={item.name} className="card-premium p-6 sm:p-8 flex flex-col" data-vp-animate="fade-up" data-vp-delay={String(i + 1)}>
                  <Star className="h-5 w-5 text-[var(--vp-accent)]/30 mb-3" />
                  <p className="text-[var(--text-secondary)] leading-relaxed flex-1 text-sm">&ldquo;{item.quote}&rdquo;</p>
                  <div className="mt-6 flex items-center gap-3 border-t border-[var(--border-primary)] pt-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--vp-glow-soft)] text-sm font-bold text-[var(--vp-accent)]">{item.name.charAt(0)}</div>
                    <div>
                      <p className="font-semibold text-sm text-[var(--text-primary)]">{item.name}</p>
                      <p className="text-xs text-[var(--text-secondary)]">{item.role} — {item.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
           ✦ FUTURE VISION
           ═══════════════════════════════════════════════ */}
        <FutureVisionSection />

        {/* ═══════════════════════════════════════════════
           ✦ FINAL CTA — Enterprise
           ═══════════════════════════════════════════════ */}
        <section className="relative py-32 overflow-hidden" dir="rtl" style={{ background: 'var(--vp-gradient-dark)' }}>
          <div className="absolute inset-0 vp-grid-bg opacity-[0.03]" />
          <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-[var(--vp-accent)]/5 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-[var(--vp-cyan)]/5 blur-3xl" />

          <div className="container-shade relative">
            <div className="mx-auto max-w-4xl text-center" data-vp-animate="slide-up">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm font-medium mb-6">
                <span className="vp-breathing-ring inline-block" style={{ width: '6px', height: '6px', background: 'var(--vp-accent)' }} />
                Workforce Health Intelligence
              </div>

              <h2 className="vp-hero text-white mb-6">
                استعد لمستقبل الصحة المؤسسية
              </h2>

              <p className="vp-subtitle text-white/70 max-w-2xl mx-auto mb-10">
                البنية التحتية لصحة القوى العاملة في المملكة.
                انضم إلى الشركات الرائدة التي تستخدم Sehhati لتحويل صحة موظفيها إلى ذكاء مؤسسي وقيمة مالية.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/demo" className="btn-premium !bg-white !text-[var(--vp-ink)] group text-base px-10 py-4 !h-auto">
                  اطلب عرضاً تجريبياً
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                </Link>
                <Link href="/pricing" className="btn-ghost !border-white/20 !text-white hover:!bg-white/5 text-base px-8 py-4 !h-auto">
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
