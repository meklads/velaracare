"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Brain,
  BarChart3,
  Users,
  TrendingDown,
  Heart,
  Activity,
  FileText,
  Shield,
  ArrowLeft,
  Target,
  PieChart,
  UserCheck,
  DollarSign,
  CheckCircle2,
  GitBranch,
  Clock,
  Building2
} from "lucide-react";
import { initScrollAnimations } from "@/lib/scroll-animations";

const platformCapabilities = [
  {
    icon: Brain,
    title: "مسح صحة القوى العاملة (Workforce Health Survey)",
    desc: "أداة مسح جماعية تجمع بيانات صحية شاملة من جميع الموظفين خلال أيام. تحوِّل البيانات الخام إلى لوحة قيادة تنفيذية عن صحة المؤسسة — بدون أجهزة أو زيارات ميدانية.",
    bizValue: "رؤية كاملة وموضوعية عن صحة 100% من القوى العاملة",
  },
  {
    icon: TrendingDown,
    title: "ذكاء تحليل التكاليف الصحية",
    desc: "نموذج تحليلي يربط البيانات الصحية بالتكاليف التأمينية. يتوقع الإنفاق المستقبلي بدقة ويحدد فرص خفض التكاليف من خلال تدخلات وقائية مستهدفة.",
    bizValue: "خفض تكاليف الرعاية الصحية بنسبة تصل إلى 40%",
  },
  {
    icon: BarChart3,
    title: "Wellness Score المؤسسي",
    desc: "مؤشر رقمي موحد (0-100) يعكس مستوى الصحة المؤسسية للقوى العاملة بالكامل. يتيح للإدارة قياس التحسن شهرياً وربطه بالإنتاجية والتكاليف.",
    bizValue: "مقياس موضوعي واحد لصحة المؤسسة — قابل للمقارنة والتحسن",
  },
  {
    icon: Target,
    title: "التدخل الوقائي الذكي للقوى العاملة",
    desc: "يحدد تلقائياً الفئات الأكثر عرضة للمخاطر الصحية ويطلق برامج وقائية مخصصة — استشارات تغذية، برامج لياقة، متابعة دورية — قبل تطور الحالات.",
    bizValue: "تقليل الحالات الحرجة بنسبة تصل إلى 50%",
  },
  {
    icon: PieChart,
    title: "تقارير العائد على استثمار الصحة",
    desc: "تقارير جاهزة لمجلس الإدارة توثق العائد على الاستثمار في صحة القوى العاملة — خفض التكاليف، تحسن الإنتاجية، انخفاض الإجازات المرضية.",
    bizValue: "إثبات العائد بالأرقام — لا وعود بدون دليل",
  },
  {
    icon: Users,
    title: "إدارة برامج العافية المؤسسية",
    desc: "منصة تشغيلية تدير دورة حياة برامج الصحة بالكامل — من الإعلان والتسجيل إلى المتابعة وإصدار التقارير. تقلل العبء الإداري على HR بنسبة 70%.",
    bizValue: "أتمتة كاملة لإدارة البرامج — وفر وقت فريقك",
  },
  {
    icon: UserCheck,
    title: "بوابة الموظف للتقييم والمتابعة",
    desc: "تطبيق يتيح لكل موظف إجراء التقييم الصحي، متابعة Wellness Score الشخصي، استلام توصيات مخصصة، ومتابعة تقدمه الصحي — كل شيء في مكان واحد.",
    bizValue: "مشاركة عالية من الموظفين — تجربة سلسة ومخصصة",
  },
  {
    icon: Heart,
    title: "نظام التوصيات الصحية المخصصة",
    desc: "توصيات آلية مبنية على التحليل الفردي لكل موظف — تغذية، نشاط، استشارات — مع ربط مباشر بمزودي الخدمات المعتمدين من الشركة.",
    bizValue: "تجربة مخصصة لكل موظف — لا حل واحد يناسب الجميع",
  },
  {
    icon: FileText,
    title: "محرك تقارير تنفيذية جاهزة",
    desc: "تقارير آلية جاهزة للإدارة التنفيذية ومجلس الإدارة — تغطي مشاركة الموظفين، Wellness Score، التكاليف، والعائد على الاستثمار.",
    bizValue: "تقارير احترافية بدون جهد يدوي — جاهزة في دقائق",
  },
];

const whyVelara = [
  {
    icon: Building2,
    title: "للشركات متوسطة وكبيرة",
    desc: "صممت المنصة للشركات من 50 إلى 5000+ موظف. تتوسع مع نمو مؤسستك بدون تكاليف إضافية.",
  },
  {
    icon: Shield,
    title: "أمان وخصوصية مؤسسية",
    desc: "متوافقة مع PDPL و SDAIA. بيانات الموظفين مشفرة ومحمية. الإدارة ترى فقط إحصائيات مجمعة.",
  },
  {
    icon: GitBranch,
    title: "تكامل مع الأنظمة الحالية",
    desc: "API مفتوح يتكامل مع ERP، HRMS، وأنظمة التأمين الصحي. لا نستبدل أنظمتك — نضيف طبقة ذكاء صحي.",
  },
];

export default function FeaturesPage() {
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
              إمكانيات المنصة
            </div>
            <h1 className="vp-hero max-w-4xl mx-auto" data-vp-animate="fade-up" data-vp-delay="1">
              بنية تحتية مؤسسية{' '}
              <br />
              <span className="vp-hero-em">لذكاء صحة القوى العاملة</span>
            </h1>
            <p className="vp-subtitle text-[var(--text-secondary)] max-w-2xl mx-auto mt-6" data-vp-animate="fade-up" data-vp-delay="2">
              ليس مجرد برنامج عافية. Velara Care هي منصة مؤسسية تجمع بين التقييم الصحي الشامل،
              التحليلات التنبؤية، إدارة البرامج، وتقارير العائد على الاستثمار — لتخفض التكاليف
              وترفع الإنتاجية.
            </p>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section className="section-padding relative overflow-hidden" dir="rtl">
          <div className="container-shade relative z-10">
            <div className="mx-auto max-w-3xl text-center mb-12" data-vp-animate="fade-up">
              <span className="vp-label">قدرات المنصة</span>
              <h2 className="vp-section-title mt-4">
                كل قدرة تحقق{' '}
                <span className="vp-hero-em">نتيجة مؤسسية</span>
              </h2>
              <div className="w-16 h-1 rounded-full bg-gradient-to-l from-[var(--vp-accent)] to-[var(--vp-cyan)] mx-auto mt-4" />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {platformCapabilities.map((f, i) => (
                <div key={f.title} className="card-premium p-6" data-vp-animate="fade-up" data-vp-delay={String(Math.min(i + 1, 4))}>
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--vp-glow-soft)] text-[var(--vp-accent)]">
                    <f.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">{f.title}</h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed text-sm mb-4">{f.desc}</p>
                  <div className="pt-3 border-t border-[var(--border-primary)]">
                    <span className="text-xs font-semibold text-[var(--vp-accent)]">{f.bizValue}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY VELARA FOR ENTERPRISE */}
        <section className="section-padding relative overflow-hidden" dir="rtl" style={{ background: 'var(--vp-gradient-card)' }}>
          <div className="container-shade">
            <div className="mx-auto max-w-3xl text-center mb-12" data-vp-animate="fade-up">
              <span className="vp-label">لماذا Velara Care للمؤسسات</span>
              <h2 className="vp-section-title mt-4">
                مصممة خصيصاً{' '}
                <span className="vp-hero-em">للمؤسسات</span>
              </h2>
              <div className="w-16 h-1 rounded-full bg-gradient-to-l from-[var(--vp-accent)] to-[var(--vp-cyan)] mx-auto mt-4" />
            </div>

            <div className="grid gap-6 md:grid-cols-3" data-vp-animate="fade-up" data-vp-delay="2">
              {whyVelara.map((item) => (
                <div key={item.title} className="card-premium p-6 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--vp-glow-soft)] mx-auto mb-4">
                    <item.icon className="h-7 w-7 text-[var(--vp-accent)]" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{item.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-28 overflow-hidden" dir="rtl" style={{ background: 'var(--vp-gradient-dark)' }}>
          <div className="container-shade relative z-10">
            <div className="mx-auto max-w-2xl text-center" data-vp-animate="slide-up">
              <h2 className="vp-hero text-white mb-6">هل تريد تحويل صحة القوى العاملة إلى قيمة مؤسسية؟</h2>
              <p className="vp-subtitle text-white/70 max-w-xl mx-auto mb-10">
                احصل على عرض تجريبي مخصص لمؤسستك — مع تحليل أولي مجاني للتكاليف الصحية.
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
