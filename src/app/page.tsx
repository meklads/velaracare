"use client";

import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useEffect } from "react";
import { initScrollAnimations, initCountUpAnimations } from "@/lib/scroll-animations";
import {
  TrendingDown, BarChart3, Users, Building2,
  ArrowLeft, ArrowRight, Activity, TrendingUp,
  DollarSign, PieChart, UserCheck, Target,
  Award, Medal, ClipboardCheck, Brain, Salad,
  Apple, ChefHat, Sparkles, Zap, Heart
} from "lucide-react";

// ===== بطاقات القيمة =====
const valueCards = [
  { icon: TrendingDown, title: "خفض أيام الغياب", desc: "برامج عافية تقلل التغيب وتحافظ على قوة عاملة صحية ومنتجة." },
  { icon: Users, title: "تحسين عافية الموظفين", desc: "رحلات عافية مخصصة تحسن جودة الحياة والرضا الوظيفي." },
  { icon: BarChart3, title: "تحليلات العافية", desc: "لوحات حية تتابع المشاركة والتحسن وأثر العافية على الأعمال." },
  { icon: Target, title: "نتائج قابلة للقياس", desc: "أرقام ملموسة تربط استثمار العافية بالإنتاجية وخفض التكاليف." }
];

// ===== القسم 1: المنظومة =====
const ecosystemEntities = [
  { icon: Building2, title: "الشركة", desc: "تستثمر في عافية القوى العاملة وتحصل على تحسن measurable في الإنتاجية والاحتفاظ والتكاليف.", role: "تضع الاستراتيجية" },
  { icon: Users, title: "الموارد البشرية", desc: "تدير برامج العافية، تراقب المشاركة، تقيس النتائج، وتصدر تقارير تنفيذية من لوحة واحدة.", role: "تدير البرامج" },
  { icon: UserCheck, title: "الموظف", desc: "يكمل مسح نمط الحياة، يستلم توصيات مخصصة، يطلب وجبات صحية، وي追踪 تحسنه.", role: "يشارك ويتحسن" },
  { icon: Apple, title: "أخصائي التغذية", desc: "يطلع على بيانات العافية للموظفين، يضع خطط تغذية مخصصة، ويتابع التقدم عبر الاستشارات.", role: "يضع الخطط الغذائية" },
  { icon: ChefHat, title: "المطعم الشريك", desc: "يستلم طلبات منظمة حسب أهداف العافية، يحضر وجبات صحية، ويوصل عبر لوجستيات متكاملة.", role: "ينفذ الوجبات الصحية" }
];

// ===== القسم 2: لوحة HR =====
const hrDashboardMetrics = [
  { icon: Activity, value: "87%", label: "مؤشر العافية العام", desc: "مؤشر الصحة العام للقوى العاملة" },
  { icon: TrendingUp, value: "72%", label: "مشاركة الموظفين", desc: "نسبة المشاركة النشطة في البرامج" },
  { icon: Apple, value: "64%", label: "مشاركة التغذية", desc: "موظفون يستخدمون خطط الوجبات" },
  { icon: PieChart, value: "3 مستويات", label: "توزيع المخاطر", desc: "منخفض / متوسط / مرتفع" },
  { icon: TrendingDown, value: "-35%", label: "خفض الغياب", desc: "انخفاض التغيب سنة بعد سنة" },
  { icon: ClipboardCheck, value: "81%", label: "اعتماد البرامج", desc: "نسبة الموظفين المسجلين" }
];

// ===== القسم 3: رحلة الموظف =====
const employeeJourney = [
  { step: "1", icon: Building2, title: "انضمام الموظف", desc: "يتم تسجيله تلقائياً في المنصة عبر نظام HR." },
  { step: "2", icon: ClipboardCheck, title: "يكمل مسح نمط الحياة", desc: "مسح سريع 5 دقائق عن التغذية، النوم، النشاط، والإجهاد." },
  { step: "3", icon: Brain, title: "الذكاء الاصطناعي يحلل", desc: "ينتج Wellness Score شخصي مع تحليل المخاطر." },
  { step: "4", icon: Target, title: "توصيات تغذية مخصصة", desc: "اقتراحات وجبات مبنية على أهدافه الصحية." },
  { step: "5", icon: Salad, title: "يطلب وجبات صحية", desc: "يختار من قوائم المطاعم الشريكة عبر المنصة." },
  { step: "6", icon: Apple, title: "يستشير أخصائي تغذية", desc: "جلسات فردية مع أخصائيي التغذية." },
  { step: "7", icon: TrendingUp, title: "يتتبع تحسنه", desc: "Wellness Score يتحسن مع الوقت والنتائج تقاس." }
];

// ===== القسم 4: أخصائي التغذية =====
const nutritionistCapabilities = [
  { icon: Brain, title: "بيانات العافية", desc: "اطلاع على ملفات العافية للموظفين المعينين." },
  { icon: Target, title: "خطط تغذية متصلة", desc: "إعداد خطط وجبات مرتبطة بأنظمة طلب المطاعم." },
  { icon: UserCheck, title: "إدارة الاستشارات", desc: "جدولة ومتابعة جميع الاستشارات داخل المنصة." },
  { icon: TrendingUp, title: "متابعة التقدم", desc: "تتبع مؤشرات الموظفين وتعديل التوصيات." },
  { icon: BarChart3, title: "تحليل النتائج", desc: "قياس أثر التدخلات الغذائية على Wellness Score." }
];

// ===== القسم 5: المطعم =====
const restaurantCapabilities = [
  { icon: ClipboardCheck, title: "طلبات منظمة", desc: "استلام طلبات مصنفة حسب أهداف العافية والاحتياجات الغذائية." },
  { icon: Salad, title: "قوائم متوافقة مع العافية", desc: "تنظيم الوجبات حسب الفئات الصحية — متوازن، بروتين، منخفض السعرات." },
  { icon: Activity, title: "لوجستيات متكاملة", desc: "توصيل عبر المنصة مع تتبع آني للطلبات." },
  { icon: PieChart, title: "تحليلات الأداء", desc: "متابعة حجم الطلبات، الوجبات الأكثر طلباً، واتجاهات المشاركة." }
];

// ===== القسم 6: نتائج الأعمال =====
const businessMetrics = [
  { icon: TrendingDown, value: "-35%", label: "خفض أيام الغياب" },
  { icon: TrendingUp, value: "+25%", label: "تحسين الإنتاجية" },
  { icon: Users, value: "85%", label: "مشاركة في العافية" },
  { icon: DollarSign, value: "-28%", label: "خفض التكاليف الصحية" },
  { icon: Award, value: "3.2x", label: "العائد على الاستثمار" },
  { icon: Medal, value: "+40%", label: "قوة العلامة التجارية" }
];

export default function Home() {
  useEffect(() => {
    const c1 = initScrollAnimations();
    const c2 = initCountUpAnimations();
    return () => { c1(); c2(); };
  }, []);

  return (
    <>
      <Header />
      <main>
        {/* ═══ HERO — بتصميم قطرة الماء ═══ */}
        <section className="relative pt-32 pb-24 overflow-hidden" dir="rtl">
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent-soft)] via-transparent to-transparent opacity-60" />
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[var(--accent)]/8 via-[var(--accent)]/3 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute bottom-[-15%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[var(--accent)]/5 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute inset-0 vp-grid-bg opacity-[0.03]" />

          {/* SVG clipPath لشكل عضوي غير منتظم */}
          <svg width="0" height="0" className="absolute">
            <defs>
              <clipPath id="organicBlob" clipPathUnits="objectBoundingBox">
                <path d="M0.45,0.03 C0.68,0 0.88,0.12 0.93,0.3 C0.98,0.48 0.92,0.68 0.82,0.83 C0.72,0.98 0.55,1 0.38,0.95 C0.21,0.9 0.05,0.8 0.02,0.6 C-0.01,0.4 0.08,0.2 0.2,0.1 C0.32,0 0.35,0.04 0.45,0.03 Z" />
              </clipPath>
            </defs>
          </svg>

          <div className="container-shade relative z-10">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* ===== النص — الجانب الأيمن ===== */}
              <div data-vp-animate="fade-up">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent-soft)] border border-[var(--accent)]/10 text-[var(--accent)] text-xs font-semibold mb-6">
                  <Heart className="h-3.5 w-3.5" />
                  منصة عافية مؤسسية متكاملة
                </span>
                <h1 className="vp-hero mt-4">
                  حوّل عافية قواك العاملة
                  <br />
                  <span className="vp-hero-em">إلى أداء مؤسسي قابل للقياس</span>
                </h1>
                <p className="vp-subtitle mt-6 max-w-xl">
                  Velara Care هي نظام تشغيل متكامل لبرامج عافية الموظفين — يربط بين الشركات،
                  الموظفين، فرق الموارد البشرية، أخصائيي التغذية، ومزودي الخدمات في منظومة واحدة قابلة للقياس.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-start gap-4">
                  <Link href="/demo" className="btn-premium text-base px-10 py-4 !h-auto">
                    اطلب عرضاً تجريبياً للمؤسسات
                    <ArrowLeft className="h-4 w-4" />
                  </Link>
                  <Link href="/product" className="btn-ghost text-base px-8 py-4 !h-auto">
                    استكشف المنصة
                  </Link>
                </div>
                <div className="mt-10 grid grid-cols-2 gap-3 max-w-lg">
                  {valueCards.map((card) => (
                    <div key={card.title} className="glass-premium rounded-xl p-3.5 text-center group hover:border-[var(--accent)]/20">
                      <div className="w-9 h-9 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center mx-auto mb-1.5 group-hover:scale-110 transition-transform">
                        <card.icon className="h-4 w-4 text-[var(--accent)]" />
                      </div>
                      <h3 className="text-xs font-bold text-[var(--text-primary)] mb-0.5">{card.title}</h3>
                      <p className="text-[10px] text-[var(--text-secondary)] leading-tight">{card.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ===== الصورة بشكل عضوي — الجانب الأيسر ===== */}
              <div className="relative flex items-center justify-center min-h-[400px] lg:min-h-[520px]" data-vp-animate="scale-in" data-vp-delay="2">
                {/* Glow خلف الشكل العضوي */}
                <div className="absolute w-[420px] h-[420px] lg:w-[520px] lg:h-[520px] rounded-full bg-gradient-to-br from-[var(--accent)]/15 via-[var(--accent)]/5 to-transparent blur-[100px] pointer-events-none" />

                {/* حاوية الشكل العضوي */}
                <div className="relative w-[340px] lg:w-[460px]" style={{ aspectRatio: '4/5' }}>
                  {/* الصورة داخل الشكل العضوي */}
                  <div className="w-full h-full" style={{ clipPath: 'url(#organicBlob)' }}>
                    <Image
                      src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&h=900&fit=crop&auto=format"
                      alt="فريق عمل مؤسسي"
                      width={700}
                      height={900}
                      className="w-full h-full object-cover"
                      priority
                    />
                    {/* تدرج شفاف علوي */}
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.25) 100%)' }} />
                  </div>

                  {/* إطار متوهج حول الشكل العضوي */}
                  <div className="absolute inset-0 pointer-events-none" style={{ clipPath: 'url(#organicBlob)' }}>
                    <div className="w-full h-full ring-2 ring-inset ring-white/15" />
                    <div className="absolute inset-[2px] rounded-full ring-1 ring-inset ring-[var(--accent)]/10" />
                  </div>

                  {/* عناصر عائمة حول الشكل العضوي */}
                  <div className="absolute -top-4 -right-3 w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--accent-soft)] to-[var(--accent)]/10 border border-[var(--accent)]/15 flex items-center justify-center shadow-lg backdrop-blur-sm -rotate-6">
                    <Heart className="h-7 w-7 text-[var(--accent)]" />
                  </div>
                  <div className="absolute -bottom-3 -left-4 w-14 h-14 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-primary)] flex items-center justify-center shadow-lg backdrop-blur-sm rotate-3">
                    <Activity className="h-6 w-6 text-[var(--accent)]" />
                  </div>
                  <div className="absolute top-[15%] -left-5 w-10 h-10 rounded-xl bg-white/80 dark:bg-gray-800/80 border border-[var(--border-primary)] flex items-center justify-center shadow-md backdrop-blur-sm -rotate-12">
                    <TrendingUp className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div className="absolute bottom-[20%] -right-5 w-10 h-10 rounded-xl bg-white/80 dark:bg-gray-800/80 border border-[var(--border-primary)] flex items-center justify-center shadow-md backdrop-blur-sm rotate-12">
                    <Users className="h-5 w-5 text-[var(--accent)]" />
                  </div>
                </div>

                {/* نقاط زخرفية عائمة */}
                <div className="absolute top-[5%] right-[8%] w-3 h-3 rounded-full bg-[var(--accent)]/30 animate-pulse" />
                <div className="absolute bottom-[10%] left-[5%] w-2 h-2 rounded-full bg-rose-400/30" />
                <div className="absolute top-[40%] left-[2%] w-1.5 h-1.5 rounded-full bg-[var(--accent)]/40" />
                <div className="absolute bottom-[35%] right-[3%] w-2 h-2 rounded-full bg-[var(--accent)]/20" />

                {/* خطوط منحنية زخرفية */}
                <svg className="absolute -top-6 -left-6 w-24 h-24 opacity-10 pointer-events-none" viewBox="0 0 100 100" fill="none">
                  <path d="M10,50 Q40,20 70,50 T90,50" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <svg className="absolute -bottom-4 -right-4 w-20 h-20 opacity-10 pointer-events-none rotate-45" viewBox="0 0 100 100" fill="none">
                  <path d="M10,50 Q40,20 70,50 T90,50" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ الإحصائيات ═══ */}
        <section className="py-16 bg-[var(--bg-primary)] relative overflow-hidden" dir="rtl">
          <div className="absolute inset-0 vp-data-dots pointer-events-none opacity-50" />
          <div className="container-shade relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {[
                { num: "5000", suffix: "+", label: "موظف على المنصة" },
                { num: "100", suffix: "+", label: "شركة تثق بنا" },
                { num: "35", suffix: "%", label: "خفض أيام الغياب" },
                { num: "3.2", suffix: "x", label: "متوسط العائد" },
              ].map((s) => (
                <div key={s.label} className="text-center" data-vp-animate="fade-up">
                  <p className="vp-stat" data-vp-count-to={s.num} data-vp-count-suffix={s.suffix}>{s.num}{s.suffix}</p>
                  <p className="text-sm text-[var(--text-secondary)] mt-2">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ القسم 1: المنظومة ═══ */}
        <section className="py-24 bg-[var(--bg-secondary)] relative overflow-hidden" dir="rtl">
          <div className="absolute inset-0 vp-data-dots pointer-events-none" />
          <div className="container-shade relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-16" data-vp-animate="fade-up">
              <span className="vp-label">هيكل المنصة</span>
              <h2 className="vp-section-title mt-4">كيف تعمل منظومة Velara Care</h2>
              <p className="vp-subtitle mt-4">خمسة أطراف مترابطة في نظام تشغيل واحد measurable لبرامج العافية المؤسسية.</p>
              <div className="w-16 h-1 rounded-full bg-gradient-to-l from-[var(--accent)] to-[var(--accent-light)] mx-auto mt-4" />
            </div>

            <div className="hidden lg:flex items-start justify-center max-w-6xl mx-auto" data-vp-animate="fade-up" data-vp-delay="2">
              {ecosystemEntities.map((item, i) => (
                <div key={item.title} className="flex items-start">
                  <div className="glass-premium rounded-2xl p-5 flex flex-col items-center text-center w-[190px] hover:border-[var(--accent)]/20 transition-all duration-500">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--accent-soft)] to-[var(--accent)]/5 flex items-center justify-center mb-3 ring-2 ring-[var(--accent)]/10">
                      <item.icon className="h-8 w-8 text-[var(--accent)]" />
                    </div>
                    <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">{item.title}</h3>
                    <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed mb-3">{item.desc}</p>
                    <span className="text-[10px] font-semibold text-[var(--accent)] bg-[var(--accent-soft)] px-2.5 py-1 rounded-full whitespace-nowrap">{item.role}</span>
                  </div>
                  {i < ecosystemEntities.length - 1 && (
                    <div className="flex items-center pt-8 px-2">
                      <div className="w-8 h-8 rounded-full bg-[var(--bg-card)] border border-[var(--border-primary)] flex items-center justify-center shadow-sm">
                        <ArrowLeft className="h-4 w-4 text-[var(--accent)]" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 lg:hidden gap-5 max-w-3xl mx-auto" data-vp-animate="fade-up" data-vp-delay="2">
              {ecosystemEntities.map((item) => (
                <div key={item.title} className="card-premium p-6 text-center group">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--accent-soft)] to-[var(--accent)]/5 flex items-center justify-center mx-auto mb-4 ring-2 ring-[var(--accent)]/10 group-hover:scale-110 transition-transform">
                    <item.icon className="h-7 w-7 text-[var(--accent)]" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{item.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">{item.desc}</p>
                  <span className="text-xs font-semibold text-[var(--accent)] bg-[var(--accent-soft)] px-3 py-1 rounded-full">{item.role}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ القسم 2: لوحة HR ═══ */}
        <section className="py-24 bg-[var(--bg-primary)] relative overflow-hidden" dir="rtl">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-bl from-[var(--accent)]/5 to-transparent blur-3xl pointer-events-none" />
          <div className="container-shade relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div data-vp-animate="fade-up">
                <span className="vp-label">تحليلات المؤسسة</span>
                <h2 className="vp-section-title mt-4">لوحة قيادة العافية لـ HR</h2>
                <p className="vp-subtitle mt-4 mb-8">ذكاء تشغيلي فوري لإدارة برامج العافية على نطاق واسع. تابع المشاركة، قس النتائج، واصدر تقارير تنفيذية جاهزة.</p>
                <div className="grid grid-cols-2 gap-3">
                  {hrDashboardMetrics.map((metric) => (
                    <div key={metric.label} className="card-premium !p-4 group">
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-8 h-8 rounded-lg bg-[var(--accent-soft)] flex items-center justify-center group-hover:scale-110 transition-transform">
                          <metric.icon className="h-4 w-4 text-[var(--accent)]" />
                        </div>
                        <span className="text-lg font-extrabold text-[var(--accent)]">{metric.value}</span>
                      </div>
                      <h3 className="text-xs font-bold text-[var(--text-primary)] mb-0.5">{metric.label}</h3>
                      <p className="text-[10px] text-[var(--text-secondary)]">{metric.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative" data-vp-animate="scale-in" data-vp-delay="2">
                <div className="absolute -inset-6 bg-gradient-to-r from-[var(--accent)]/10 via-[var(--accent)]/5 to-transparent rounded-3xl blur-3xl" />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[var(--border-primary)]">
                  <Image src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&h=500&fit=crop&auto=format" alt="لوحة قيادة HR" width={700} height={500} className="w-full h-auto object-cover" priority />
                </div>
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        {/* ═══ القسم 3: رحلة الموظف ═══ */}
        <section className="py-24 bg-[var(--bg-secondary)] relative overflow-hidden" dir="rtl">
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-[var(--accent)]/5 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute inset-0 vp-grid-bg opacity-[0.02]" />
          <div className="container-shade relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="relative order-last lg:order-first" data-vp-animate="scale-in">
                <div className="absolute -inset-6 bg-gradient-to-l from-[var(--accent)]/10 via-[var(--accent)]/5 to-transparent rounded-3xl blur-3xl" />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[var(--border-primary)]">
                  <Image src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&h=500&fit=crop&auto=format" alt="رحلة الموظف" width={700} height={500} className="w-full h-auto object-cover" />
                </div>
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" />
              </div>
              <div data-vp-animate="fade-up" data-vp-delay="2">
                <span className="vp-label">رحلة الموظف</span>
                <h2 className="vp-section-title mt-4">رحلة الموظف في العافية</h2>
                <p className="vp-subtitle mt-4 mb-8">من الانضمام إلى تحسن ملموس — تجربة عافية متكاملة مدعومة بالذكاء الاصطناعي.</p>
                <div className="space-y-4">
                  {employeeJourney.map((item, i) => (
                    <div key={item.step} className="flex items-start gap-4 group">
                      <div className="flex flex-col items-center">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-md group-hover:scale-110 transition-transform">
                          {item.step}
                        </div>
                        {i < employeeJourney.length - 1 && (<div className="w-0.5 flex-1 bg-gradient-to-b from-[var(--accent)]/20 to-transparent mt-1" />)}
                      </div>
                      <div className="bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-xl p-4 flex-1 group-hover:border-[var(--accent)]/20 transition-all">
                        <div className="flex items-center gap-2 mb-1">
                          <item.icon className="h-4 w-4 text-[var(--accent)] shrink-0" />
                          <h3 className="text-sm font-bold text-[var(--text-primary)]">{item.title}</h3>
                        </div>
                        <p className="text-xs text-[var(--text-secondary)]">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ القسم 4: أخصائي التغذية ═══ */}
        <section className="py-24 bg-[var(--bg-primary)] relative overflow-hidden" dir="rtl">
          <div className="absolute inset-0 vp-data-dots pointer-events-none" />
          <div className="container-shade relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div data-vp-animate="fade-up">
                <span className="vp-label">فضاء أخصائي التغذية</span>
                <h2 className="vp-section-title mt-4">فضاء أخصائي التغذية المتصل</h2>
                <p className="vp-subtitle mt-4 mb-8">مساحة عمل ذكية حيث يدير أخصائيو التغذية عملائهم، يضعون الخطط، ويقيسون النتائج — كل ذلك متصل بمنظومة العافية.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {nutritionistCapabilities.map((cap) => (
                    <div key={cap.title} className="card-premium !p-4 group">
                      <div className="w-9 h-9 rounded-lg bg-[var(--accent-soft)] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <cap.icon className="h-4 w-4 text-[var(--accent)]" />
                      </div>
                      <h3 className="text-sm font-bold text-[var(--text-primary)] mb-1">{cap.title}</h3>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{cap.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative" data-vp-animate="scale-in" data-vp-delay="2">
                <div className="absolute -inset-6 bg-gradient-to-l from-[var(--accent)]/10 via-[var(--accent)]/5 to-transparent rounded-3xl blur-3xl" />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[var(--border-primary)]">
                  <Image src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=700&h=500&fit=crop&auto=format" alt="تغذية صحية" width={700} height={500} className="w-full h-auto object-cover" />
                </div>
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        {/* ═══ القسم 5: المطعم الشريك ═══ */}
        <section className="py-24 bg-[var(--bg-secondary)] relative overflow-hidden" dir="rtl">
          <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-[var(--accent)]/5 to-transparent blur-3xl pointer-events-none" />
          <div className="container-shade relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="relative order-last lg:order-first" data-vp-animate="scale-in">
                <div className="absolute -inset-6 bg-gradient-to-r from-[var(--accent)]/10 via-[var(--accent)]/5 to-transparent rounded-3xl blur-3xl" />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[var(--border-primary)]">
                  <Image src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=700&h=500&fit=crop&auto=format" alt="مطعم شريك" width={700} height={500} className="w-full h-auto object-cover" />
                </div>
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" />
              </div>
              <div data-vp-animate="fade-up" data-vp-delay="2">
                <span className="vp-label">شبكة المطاعم</span>
                <h2 className="vp-section-title mt-4">شبكة المطاعم للعافية</h2>
                <p className="vp-subtitle mt-4 mb-8">منظومة لوجستية تشغيلية تربط المطاعم الشريكة بأهداف العافية للقوى العاملة — من الطلبات المنظمة إلى التوصيل المتكامل.</p>
                <div className="space-y-4">
                  {restaurantCapabilities.map((cap) => (
                    <div key={cap.title} className="card-premium !p-5 group">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-[var(--accent-soft)] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <cap.icon className="h-5 w-5 text-[var(--accent)]" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-[var(--text-primary)] mb-1">{cap.title}</h3>
                          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{cap.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ القسم 6: نتائج الأعمال ═══ */}
        <section className="py-24 bg-[var(--bg-primary)] relative overflow-hidden" dir="rtl">
          <div className="absolute inset-0 vp-grid-bg opacity-[0.03]" />
          <div className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[var(--accent)]/5 to-transparent blur-3xl pointer-events-none" />
          <div className="container-shade relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-16" data-vp-animate="fade-up">
              <span className="vp-label">مؤشرات العائد</span>
              <h2 className="vp-section-title mt-4">نتائج مؤسسية تستحق القياس</h2>
              <p className="vp-subtitle mt-4">مؤشرات أداء رئيسية تثبت العائد على استثمار برامج العافية.</p>
              <div className="w-16 h-1 rounded-full bg-gradient-to-l from-[var(--accent)] to-[var(--accent-light)] mx-auto mt-4" />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto" data-vp-animate="fade-up" data-vp-delay="2">
              {businessMetrics.map((metric) => (
                <div key={metric.label} className="card-premium !p-6 text-center group hover:shadow-xl">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--accent-soft)] to-[var(--accent)]/5 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform ring-2 ring-[var(--accent)]/10">
                    <metric.icon className="h-6 w-6 text-[var(--accent)]" />
                  </div>
                  <p className="text-3xl font-extrabold text-[var(--accent)] leading-none mb-2">{metric.value}</p>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CTA الختامي — مُعاد تصميمه ═══ */}
        <section className="relative py-28 overflow-hidden" dir="rtl" style={{ background: 'linear-gradient(160deg, #071F1F 0%, #0A3A3A 40%, #0D4F4F 70%, #071F1F 100%)' }}>
          {/* Decorative layers */}
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 25% 40%, rgba(45,212,191,0.10) 0%, transparent 50%), radial-gradient(circle at 75% 60%, rgba(45,212,191,0.06) 0%, transparent 50%)' }} />
          <div className="absolute inset-0 vp-grid-bg opacity-[0.04]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-l from-transparent via-white/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-l from-transparent via-[var(--accent)]/20 to-transparent" />

          {/* Floating orbs */}
          <div className="absolute top-[15%] right-[10%] w-64 h-64 rounded-full bg-[var(--accent)]/8 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-[10%] left-[5%] w-80 h-80 rounded-full bg-[var(--accent)]/5 blur-[120px] pointer-events-none" />

          <div className="container-shade relative z-10">
            <div className="max-w-4xl mx-auto" data-vp-animate="slide-up">
              {/* Glass premium card */}
              <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] p-10 lg:p-16" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.015) 100%)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}>
                {/* Inner glow */}
                <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[var(--accent)]/10 blur-[120px] pointer-events-none" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-white/[0.02] blur-[120px] pointer-events-none" />

                {/* Inner border shine */}
                <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-l from-transparent via-white/20 to-transparent" />

                <div className="relative text-center">
                  {/* Premium badge */}
                  <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/[0.06] border border-white/[0.10] text-white/80 text-xs font-semibold mb-8 backdrop-blur-sm hover:bg-white/[0.08] transition-all">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
                    </span>
                    منصة العافية المؤسسية رقم 1 في السعودية
                  </div>

                  {/* Heading with gradient accent */}
                  <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-[1.15] mb-6">
                    هل أنت مستعد لبناء نظام العافية<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-l from-[var(--accent)] via-[var(--accent-light)] to-[var(--accent)]">
                      المؤسسي الخاص بك؟
                    </span>
                  </h2>

                  <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
                    احصل على عرض تجريبي مخصص لمؤسستك — يتضمن تحليلاً أولياً لمستوى العافية
                    وتوصيات مبدئية للبرامج والأنشطة المناسبة لطبيعة قواك العاملة.
                  </p>

                  {/* CTA buttons */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                    <Link href="/demo" className="group relative inline-flex items-center gap-2.5 px-10 py-4 rounded-2xl bg-white text-[var(--vp-ink)] font-bold text-base shadow-xl shadow-white/10 hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:-translate-y-0.5">
                      اطلب عرضاً تجريبياً للمؤسسات
                      <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    </Link>
                    <Link href="/pricing" className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl border border-white/20 text-white/80 font-semibold text-sm hover:bg-white/[0.06] hover:border-white/30 transition-all duration-300">
                      <div className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                      شاهد الأسعار
                    </Link>
                  </div>

                  {/* Trust indicators */}
                  <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 pt-8 border-t border-white/[0.06]">
                    <div className="text-center">
                      <p className="text-white font-extrabold text-xl">100+</p>
                      <p className="text-white/40 text-xs">شركة تثق بنا</p>
                    </div>
                    <div className="w-px h-10 bg-white/[0.06]" />
                    <div className="text-center">
                      <p className="text-white font-extrabold text-xl">5,000+</p>
                      <p className="text-white/40 text-xs">موظف على المنصة</p>
                    </div>
                    <div className="w-px h-10 bg-white/[0.06]" />
                    <div className="text-center">
                      <p className="text-white font-extrabold text-xl">3.2x</p>
                      <p className="text-white/40 text-xs">متوسط العائد على الاستثمار</p>
                    </div>
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
