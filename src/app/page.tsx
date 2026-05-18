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
  ChevronLeft,
  Activity,
  Shield,
  ArrowLeft,
  Star,
} from "lucide-react";
import { initScrollAnimations, initCountUpAnimations } from "@/lib/scroll-animations";

const features = [
  {
    icon: Brain,
    title: "تقييم المخاطر الصحية الذكي",
    desc: "استبيان صحي ذكي يقيس مؤشرات الخطر مثل السمنة، السكري، الضغط، النوم والإجهاد خلال دقائق.",
  },
  {
    icon: Sparkles,
    title: "محرك تنبؤي بالذكاء الاصطناعي",
    desc: "يقوم النظام بتحليل البيانات وتصنيف الموظفين حسب مستوى المخاطر الصحية قبل تطور الحالات.",
  },
  {
    icon: Apple,
    title: "نظام وجبات صحية متكامل",
    desc: "اقتراح وجبات صحية مخصصة حسب حالة كل موظف وربط مباشر مع مزودي الطعام الصحي.",
  },
  {
    icon: BarChart3,
    title: "لوحة تحكم تنفيذية للشركات",
    desc: "تقارير فورية عن Wellness Score، المخاطر المتوقعة، والعائد الصحي والاستثماري.",
  },
  {
    icon: Users,
    title: "استشارات تغذية ولياقة",
    desc: "إحالة الموظفين إلى مختصين مع خطط غذائية ورياضية مخصصة بناءً على نتائج التقييم.",
  },
  {
    icon: TrendingDown,
    title: "تقارير وتقليل التكاليف",
    desc: "متابعة تأثير البرنامج على الإجازات المرضية والإنتاجية والتكاليف التأمينية.",
  },
];

const stats = [
  { value: "٤٠٪", label: "خفض متوقع في الإجازات المرضية" },
  { value: "٢٥٪", label: "تحسن في إنتاجية الموظفين" },
  { value: "١٨", label: "قدرة تنبؤية مبكرة للمخاطر", suffix: "شهر" },
  { value: "١٠٠٪", label: "خصوصية وأمان للبيانات الصحية" },
];

const plans = [
  {
    name: "Basic",
    price: "٣٥",
    desc: "حل أساسي لتوفير الوجبات الصحية للشركات.",
    features: [
      "١٠ وجبات صحية شهرياً",
      "لوحة طلب للموظفين",
      "تقارير استخدام بسيطة",
      "دعم فني أساسي",
    ],
    popular: false,
  },
  {
    name: "Standard",
    price: "٧٥",
    desc: "حل متكامل للصحة الوقائية والتقييم الصحي.",
    features: [
      "جميع مميزات Basic",
      "تقييم HRA صحي",
      "Wellness Score",
      "تقارير شهرية للشركة",
      "توصيات غذائية ذكية",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "١٦٠",
    desc: "منصة صحة مؤسسية متقدمة للشركات الكبرى.",
    features: [
      "جميع مميزات Standard",
      "AI Predictive Engine",
      "استشارات تغذية ولياقة",
      "لوحة تنفيذية متقدمة",
      "تقارير ROI وتقليل التكاليف",
      "مدير حساب مخصص",
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
        {/* ════════════════════════════════════
           ✦ HERO — "The Moment of Trust"
           ════════════════════════════════════ */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)]" dir="rtl">
          {/* Ambient background gradient */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'var(--vp-gradient-hero)' }} />
          <div className="absolute inset-0 vp-grid-bg opacity-40" />

          {/* Floating decorative particles */}
          <div className="absolute top-1/4 left-[15%] w-3 h-3 rounded-full bg-[var(--vp-accent)]/10 vp-float" style={{ animationDelay: '0s' }} />
          <div className="absolute top-1/3 right-[20%] w-4 h-4 rounded-full bg-[var(--vp-cyan)]/10 vp-float" style={{ animationDelay: '1.5s' }} />
          <div className="absolute bottom-1/4 right-[30%] w-5 h-5 rounded-full bg-[var(--vp-accent)]/8 vp-float" style={{ animationDelay: '3s' }} />
          <div className="absolute top-2/3 left-[25%] w-3 h-3 rounded-full bg-[var(--vp-lavender)]/8 vp-float" style={{ animationDelay: '2s' }} />

          <div className="container-shade relative z-10 w-full py-20">
            <div className="mx-auto max-w-4xl text-center">
              {/* Premium badge */}
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[var(--vp-glow-soft)] border border-[var(--vp-accent)]/10 text-[var(--vp-accent)] text-sm font-medium mb-6" data-vp-animate="fade-up">
                <span className="vp-breathing-ring inline-block" style={{ width: '6px', height: '6px' }} />
                ذكاء تنفسي — صحي — مؤسسي
              </div>

              {/* Hero headline */}
              <h1 className="vp-hero mb-6" data-vp-animate="fade-up" data-vp-delay="1">
                <span className="text-[var(--text-primary)]">صحة موظفيك تبدأ</span>
                <br />
                <span className="vp-hero-em">قبل ظهور المرض</span>
              </h1>

              <p className="vp-subtitle max-w-2xl mx-auto mb-10" data-vp-animate="fade-up" data-vp-delay="2">
                Velara Care تجمع بين الذكاء الاصطناعي والرعاية الصحية الوقائية —
                تتنبأ بالمخاطر، تقدم حلولاً مخصصة، وتحوِّل صحة فريقك إلى ميزة تنافسية.
              </p>

              {/* CTA Group */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4" data-vp-animate="fade-up" data-vp-delay="3">
                <Link href="/demo" className="btn-premium group">
                  احجز عرضاً تجريبياً
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                </Link>
                <Link href="/features" className="btn-ghost">
                  <Sparkles className="h-4 w-4" />
                  استكشف المنصة
                </Link>
              </div>
            </div>

            {/* Trust metrics bar */}
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto" data-vp-animate="slide-up" data-vp-delay="4">
              {[
                { value: "98", suffix: "%", label: "دقة التنبؤ المبكر", desc: "باستخدام AI" },
                { value: "40", suffix: "%", label: "خفض التكاليف", desc: "متوسط التوفير" },
                { value: "92", suffix: "%", label: "رضا الموظفين", desc: "مشاركة واستمرار" },
              ].map((item) => (
                <div key={item.label} className="glass-premium rounded-2xl p-5 text-center hover:bg-[var(--vp-glow-soft)] transition-all duration-500">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="vp-stat" data-vp-count-to={item.value} data-vp-count-suffix={item.suffix}>0{item.suffix}</span>
                  </div>
                  <p className="text-sm font-semibold text-[var(--text-primary)] mt-1">{item.label}</p>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
           ✦ PROBLEM → SOLUTION
           ════════════════════════════════════ */}
        <section className="section-padding relative overflow-hidden" dir="rtl">
          <div className="absolute inset-0 vp-grid-bg opacity-30" />
          <div className="container-shade relative">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div data-vp-animate="fade-up">
                <span className="vp-label">المشكلة والحل</span>
                <h2 className="vp-section-title mt-4">
                  معظم الشركات تدفع تكاليف صحية مرتفعة…
                  <br />
                  <span className="vp-hero-em">دون معرفة السبب الحقيقي</span>
                </h2>
                <div className="w-16 h-1 rounded-full bg-gradient-to-l from-[var(--vp-accent)] to-[var(--vp-cyan)] mt-4" />
                <p className="vp-subtitle mt-6">
                  ترتفع تكاليف التأمين الصحي والإجازات المرضية سنوياً بسبب غياب الرؤية الوقائية.
                  Velara Care تمنح الشركات القدرة على اكتشاف المخاطر الصحية مبكراً،
                  وتحويل البيانات الصحية إلى قرارات عملية قابلة للقياس.
                </p>
                <ul className="mt-6 space-y-4">
                  {[
                    "توقع المخاطر الصحية قبل حدوثها",
                    "تحسين صحة الموظفين بشكل مستمر",
                    "خفض تكاليف الرعاية الصحية بنسبة تصل إلى ٤٠٪",
                    "زيادة الإنتاجية وتقليل الغياب",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--vp-glow-medium)]">
                        <CheckCircle2 className="h-4 w-4 text-[var(--vp-accent)]" />
                      </div>
                      <span className="text-[var(--text-secondary)]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div data-vp-animate="fade-up" data-vp-delay="2">
                <div className="card-premium p-8" style={{ background: 'var(--vp-gradient-card)' }}>
                  <h3 className="vp-section-title text-2xl sm:text-3xl mb-6">
                    ٤ أنظمة في منصة واحدة
                  </h3>
                  <div className="space-y-4">
                    {[
                      { icon: Brain, title: "تقييم المخاطر الصحية", desc: "استبيان صحي ذكي" },
                      { icon: Sparkles, title: "محرك AI تنبؤي", desc: "تصنيف المخاطر والتوقع المستقبلي" },
                      { icon: Apple, title: "نظام الوجبات المخصصة", desc: "توصيات حسب الملف الصحي" },
                      { icon: Users, title: "خدمات العافية المتصلة", desc: "أخصائيو تغذية ومدربو لياقة" },
                    ].map((item) => (
                      <div key={item.title} className="flex items-center gap-4 rounded-xl bg-[var(--bg-card)] p-4 depth-1 hover:depth-2 transition-all duration-300">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--vp-glow-soft)]">
                          <item.icon className="h-6 w-6 text-[var(--vp-accent)]" />
                        </div>
                        <div>
                          <p className="font-semibold text-[var(--text-primary)]">{item.title}</p>
                          <p className="text-sm text-[var(--text-secondary)]">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
           ✦ STATS — with count-up
           ════════════════════════════════════ */}
        <section className="section-padding relative overflow-hidden" dir="rtl" style={{ background: 'var(--vp-gradient-dark)' }}>
          <div className="absolute inset-0 vp-grid-bg opacity-[0.04]" />
          <div className="container-shade relative">
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
              {stats.map((stat, i) => (
                <div key={stat.label} className="text-center" data-vp-animate="fade-up" data-vp-delay={String(i + 1)}>
                  <p className="vp-stat text-white">
                    {stat.value.replace(/[٪]/g, '')}
                    <span className="text-2xl font-bold text-white/80 mr-1">
                      {stat.suffix || (stat.value.includes('٪') ? '%' : '')}
                    </span>
                  </p>
                  <p className="mt-2 text-white/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
           ✦ FEATURES
           ════════════════════════════════════ */}
        <section className="section-padding relative overflow-hidden" id="features" dir="rtl">
          <div className="container-shade">
            <div className="mx-auto max-w-2xl text-center" data-vp-animate="fade-up">
              <span className="vp-label">الميزات</span>
              <h2 className="vp-section-title mt-4">
                كل ما تحتاجه لصحة موظفيك في{' '}
                <span className="vp-hero-em">منصة واحدة</span>
              </h2>
              <div className="w-16 h-1 rounded-full bg-gradient-to-l from-[var(--vp-accent)] to-[var(--vp-cyan)] mx-auto mt-4" />
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f, i) => (
                <div key={f.title} className="card-premium p-6 sm:p-8" data-vp-animate="fade-up" data-vp-delay={String((i % 4) + 1)}>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--vp-glow-soft)] mb-5">
                    <f.icon className="h-7 w-7 text-[var(--vp-accent)]" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)]">{f.title}</h3>
                  <p className="mt-3 text-[var(--text-secondary)] leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
           ✦ HOW IT WORKS
           ════════════════════════════════════ */}
        <section className="section-padding relative overflow-hidden" dir="rtl" style={{ background: 'var(--vp-gradient-card)' }}>
          <div className="container-shade">
            <div className="mx-auto max-w-2xl text-center" data-vp-animate="fade-up">
              <span className="vp-label">كيف تعمل</span>
              <h2 className="vp-section-title mt-4">
                ثلاث خطوات لصحة أفضل
              </h2>
              <div className="w-16 h-1 rounded-full bg-gradient-to-l from-[var(--vp-accent)] to-[var(--vp-cyan)] mx-auto mt-4" />
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {[
                { step: "01", title: "تقييم الصحة", desc: "الموظف يجيب على استبيان صحي ذكي. النظام يحلل البيانات ويحسب درجة العافية." },
                { step: "02", title: "التوصيات الذكية", desc: "الذكاء الاصطناعي يوصي بوجبات مخصصة، جلسات استشارية، وبرامج لياقة." },
                { step: "03", title: "التحليل والتقارير", desc: "الشركة تشاهد لوحة تحكم شاملة وتقارير دورية عن العائد على الاستثمار." },
              ].map((item, i) => (
                <div key={item.step} className="card-premium p-8 text-center" data-vp-animate="fade-up" data-vp-delay={String(i + 1)}>
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--vp-glow-soft)]">
                    <span className="text-2xl font-bold text-[var(--vp-accent)]">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)]">{item.title}</h3>
                  <p className="mt-3 text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
           ✦ PRICING
           ════════════════════════════════════ */}
        <section className="section-padding relative overflow-hidden" id="pricing" dir="rtl">
          <div className="absolute inset-0 vp-grid-bg opacity-20" />
          <div className="container-shade relative">
            <div className="mx-auto max-w-2xl text-center" data-vp-animate="fade-up">
              <span className="vp-label">الأسعار</span>
              <h2 className="vp-section-title mt-4">
                خطط مرنة تناسب{' '}
                <span className="vp-hero-em">جميع الشركات</span>
              </h2>
              <div className="w-16 h-1 rounded-full bg-gradient-to-l from-[var(--vp-accent)] to-[var(--vp-cyan)] mx-auto mt-4" />
              <p className="vp-subtitle mt-4 text-[var(--text-secondary)]">
                اشتراك شهري حسب عدد الموظفين
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

        {/* ════════════════════════════════════
           ✦ TESTIMONIALS
           ════════════════════════════════════ */}
        <section className="section-padding relative overflow-hidden" dir="rtl" style={{ background: 'var(--vp-gradient-card)' }}>
          <div className="container-shade">
            <div className="mx-auto max-w-2xl text-center" data-vp-animate="fade-up">
              <span className="vp-label">آراء العملاء</span>
              <h2 className="vp-section-title mt-4">
                ماذا يقولون عن{' '}
                <span className="vp-hero-em">Velara Care</span>
              </h2>
              <div className="w-16 h-1 rounded-full bg-gradient-to-l from-[var(--vp-accent)] to-[var(--vp-cyan)] mx-auto mt-4" />
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                { quote: "منذ استخدام Velara Care، انخفضت الإجازات المرضية في شركتنا بنسبة ٣٥٪. النظام غير طريقة تعاملنا مع صحة الموظفين.", name: "أ. محمد العبدالله", role: "مدير الموارد البشرية", company: "شركة التقنية المتقدمة" },
                { quote: "تقرير العائد على الاستثمار وحده كان كافياً ليقنع الإدارة العليا. Velara Care أثبتت أن الاستثمار في صحة الموظفين مربح.", name: "أ. سارة القحطاني", role: "الرئيس التنفيذي", company: "مجموعة الخليج المالية" },
                { quote: "نظام الوجبات الذكي غير حياة موظفينا. التوصيات المخصصة حسب الحالة الصحية فرق كبير عن أي خدمة تانية.", name: "م. فيصل الدوسري", role: "مدير العمليات", company: "شركة الاتصالات السعودية" },
              ].map((item, i) => (
                <div key={item.name} className="card-premium p-6 sm:p-8 flex flex-col" data-vp-animate="fade-up" data-vp-delay={String(i + 1)}>
                  <Star className="h-5 w-5 text-[var(--vp-accent)]/30 mb-3" />
                  <p className="text-[var(--text-secondary)] leading-relaxed flex-1">&ldquo;{item.quote}&rdquo;</p>
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

        {/* ════════════════════════════════════
           ✦ FINAL CTA
           ════════════════════════════════════ */}
        <section className="relative py-32 overflow-hidden" dir="rtl" style={{ background: 'var(--vp-gradient-dark)' }}>
          <div className="absolute inset-0 vp-grid-bg opacity-[0.03]" />
          <div className="absolute top-1/2 left-1/4 w-72 h-72 rounded-full bg-[var(--vp-accent)]/5 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-[var(--vp-cyan)]/5 blur-3xl" />

          <div className="container-shade relative">
            <div className="mx-auto max-w-3xl text-center" data-vp-animate="slide-up">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm font-medium mb-6">
                <span className="vp-breathing-ring inline-block" style={{ width: '6px', height: '6px', background: 'var(--vp-accent)' }} />
                ابدأ الآن
              </div>

              <h2 className="vp-hero text-white mb-6">
                جاهز لتحويل صحة موظفيك؟
              </h2>

              <p className="vp-subtitle text-white/70 max-w-xl mx-auto mb-10">
                احجز عرضاً تجريبياً مجاناً واكتشف كيف يمكن لـ Velara Care أن تخفض تكاليف الرعاية الصحية وتزيد إنتاجية فريقك.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/demo" className="btn-premium !bg-white !text-[var(--vp-ink)] group">
                  احجز عرضاً تجريبياً
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                </Link>
                <Link href="/pricing" className="btn-ghost !border-white/20 !text-white hover:!bg-white/5">
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
