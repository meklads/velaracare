"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Brain, BarChart3, Users, Shield, ArrowLeft, Activity, Heart,
  TrendingDown, Target, LineChart, DollarSign,
  Layers, Server, Building2, Cpu, FileText, PieChart,
  UserCheck, Clock, CheckCircle2, GitBranch
} from "lucide-react";
import { initScrollAnimations } from "@/lib/scroll-animations";

const platformArchitecture = [
  {
    icon: Users,
    title: "طبقة المستخدمين",
    subtitle: "User Layer — الواجهات والتجارب",
    items: [
      "بوابة HR — إدارة البرامج والتقارير",
      "تطبيق الموظف — تقييم ومتابعة وتوصيات",
      "لوحة الإدارة التنفيذية — مؤشرات وعائد استثمار",
      "بوابة الشركاء — مطاعم واستشاريو تغذية",
    ],
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: Cpu,
    title: "طبقة الذكاء التحليلي",
    subtitle: "Intelligence Layer — التحليل والتنبؤ",
    items: [
      "محرك تقييم صحة القوى العاملة (Wellness Score)",
      "نموذج التنبؤ بالمخاطر والتكاليف",
      "تحليل اتجاهات الصحة المؤسسية",
      "توصيات وقائية مخصصة لكل موظف",
    ],
    color: "from-[var(--vp-accent)] to-[var(--vp-accent-dark)]",
  },
  {
    icon: BarChart3,
    title: "طبقة التحليلات المؤسسية",
    subtitle: "Enterprise Analytics — القياس والتقارير",
    items: [
      "Wellness Score المؤسسي (0-100)",
      "تقارير خفض التكاليف والعائد على الاستثمار",
      "تحليل الأقسام والفروع والمقارنات",
      "تقارير جاهزة لمجلس الإدارة",
    ],
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Shield,
    title: "طبقة الأمان والامتثال",
    subtitle: "Security & Compliance — الحماية والحوكمة",
    items: [
      "تشفير AES-256 و TLS 1.3",
      "إخفاء الهوية (Anonymization)",
      "سجل تدقيق كامل (Audit Log)",
      "توافق مع PDPL و SDAIA",
    ],
    color: "from-purple-500 to-violet-600",
  },
];

const businessModules = [
  {
    icon: Activity,
    title: "مسح صحة القوى العاملة",
    desc: "أداة تقييم جماعية تجمع بيانات صحية شاملة من جميع الموظفين خلال أيام. تنتج لوحة قيادة تنفيذية عن صحة المؤسسة بالكامل.",
    bizValue: "رؤية موضوعية عن صحة القوى العاملة — أول مرة",
  },
  {
    icon: TrendingDown,
    title: "ذكاء التكاليف الصحية",
    desc: "نموذج تحليلي يربط البيانات الصحية بالتكاليف التأمينية. يتوقع الإنفاق المستقبلي ويوصي بخطط وقائية لتخفيض الأعباء.",
    bizValue: "خفض تكاليف التأمين الصحي حتى 40%",
  },
  {
    icon: PieChart,
    title: "تقارير العائد على الاستثمار",
    desc: "تقارير جاهزة لمجلس الإدارة تربط بين الاستثمار في الصحة والنتائج المالية — خفض التكاليف، تحسن الإنتاجية، انخفاض الغياب.",
    bizValue: "إثبات العائد على استثمار الصحة بالأرقام",
  },
  {
    icon: Target,
    title: "التدخل الوقائي للقوى العاملة",
    desc: "يحدد الفئات الأكثر عرضة للمخاطر ويطلق تلقائياً برامج وقائية مخصصة — استشارات، تغذية، لياقة — قبل تطور الحالات.",
    bizValue: "تقليل حالات الطوارئ الصحية بنسبة تصل إلى 50%",
  },
  {
    icon: BarChart3,
    title: "لوحة قيادة HR التنفيذية",
    desc: "مؤشرات حية لمشاركة الموظفين، تحسن Wellness Score، توزيع المخاطر، والتكاليف المتوقعة. كل ما تحتاجه في شاشة واحدة.",
    bizValue: "قرارات مبنية على بيانات آنية — لا تخمين",
  },
  {
    icon: Users,
    title: "إدارة برامج العافية المؤسسية",
    desc: "منصة تشغيلية تدير دورة حياة برامج الصحة بالكامل — من الإعلان والدعوات إلى التسجيل والمتابعة والتقارير.",
    bizValue: "إدارة آلية توفر 70% من وقت فريق HR",
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
              <span className="vp-breathing-ring inline-block" style={{ width: '6px', height: '6px' }} />
              منصة مؤسسية
            </div>
            <h1 className="vp-hero max-w-4xl mx-auto" data-vp-animate="fade-up" data-vp-delay="1">
              نظام تشغيل متكامل{' '}
              <br />
              <span className="vp-hero-em">لتحسين صحة القوى العاملة</span>
            </h1>
            <p className="vp-subtitle text-[var(--text-secondary)] max-w-2xl mx-auto mt-6" data-vp-animate="fade-up" data-vp-delay="2">
              ليست منصة عافية. ولا خدمة صحية. Velara Care هي بنية تحتية مؤسسية للصحة —
              تجمع بين التقييم، التحليلات التنبؤية، إدارة البرامج، وتقارير العائد على الاستثمار
              في نظام واحد قابل للتوسع.
            </p>
          </div>
        </section>

        {/* PLATFORM ARCHITECTURE */}
        <section className="section-padding relative overflow-hidden" dir="rtl">
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
              {platformArchitecture.map((layer, i) => (
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
                    <div className="flex-1 grid sm:grid-cols-2 gap-3">
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

        {/* BUSINESS MODULES */}
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
              {businessModules.map((mod) => (
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

        {/* INTEGRATION */}
        <section className="section-padding relative overflow-hidden" dir="rtl">
          <div className="container-shade">
            <div className="mx-auto max-w-3xl text-center mb-12" data-vp-animate="fade-up">
              <span className="vp-label">التكامل المؤسسي</span>
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
          <div className="container-shade relative">
            <div className="mx-auto max-w-2xl text-center" data-vp-animate="slide-up">
              <h2 className="vp-hero text-white mb-6">هل تريد رؤية المنصة في مؤسستك؟</h2>
              <p className="vp-subtitle text-white/70 max-w-xl mx-auto mb-10">
                احصل على عرض تجريبي مخصص لاحتياجات مؤسستك — مع تحليل أولي مجاني للتكاليف الصحية.
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
