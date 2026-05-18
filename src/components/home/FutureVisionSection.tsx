"use client";

import { Rocket, Target, Globe, Shield, Brain, Network, ArrowLeft, Sparkles, Building2, TrendingUp } from "lucide-react";
import Link from "next/link";

const visionItems = [
  {
    icon: Network,
    title: "التكامل مع منظومة التأمين الصحي",
    desc: "ربط مباشر مع شركات التأمين لتحويل بيانات الصحة المؤسسية إلى تسعير ديناميكي للأقساط التأمينية.",
  },
  {
    icon: Brain,
    title: "الذكاء التنبؤي على المستوى الوطني",
    desc: "منصة لتحليل أنماط الصحة على مستوى القوى العاملة السعودية — بالشراكة مع الجهات الصحية.",
  },
  {
    icon: Globe,
    title: "النظام البيئي للمزودين",
    desc: "شبكة متكاملة من مقدمي الخدمات الصحية: عيادات، مختبرات، صيدليات، وأخصائيي تغذية ولياقة.",
  },
  {
    icon: Shield,
    title: "الوقاية الذكية كخدمة",
    desc: "برامج وقاية مخصصة لكل شركة بناءً على ملف المخاطر الفريد — تمنع الأمراض قبل حدوثها.",
  },
  {
    icon: Building2,
    title: "المنصة المفتوحة (Open Platform)",
    desc: "API مفتوح لتكامل المنصة مع أنظمة الشركات الحالية — ERP، HRMS، وأنظمة التأمين.",
  },
  {
    icon: TrendingUp,
    title: "ذكاء السوق التنبؤي",
    desc: "تحليل اتجاهات السوق والتكاليف الصحية المستقبلية لمساعدة الشركات في التخطيط الاستراتيجي.",
  },
];

export default function FutureVisionSection() {
  return (
    <section className="section-padding relative overflow-hidden" dir="rtl" style={{ background: 'var(--vp-gradient-card)' }}>
      <div className="absolute inset-0 vp-grid-bg opacity-20" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-[var(--vp-lavender)]/5 blur-3xl" />

      <div className="container-shade relative z-10">
        <div className="mx-auto max-w-3xl text-center mb-12" data-vp-animate="fade-up">
          <span className="vp-label">الرؤية المستقبلية</span>
          <h2 className="vp-section-title mt-4">
            البنية التحتية لصحة القوى العاملة{' '}
            <span className="vp-hero-em">في المملكة وخارجها</span>
          </h2>
          <div className="w-16 h-1 rounded-full bg-gradient-to-l from-[var(--vp-accent)] to-[var(--vp-cyan)] mx-auto mt-4" />
          <p className="vp-subtitle mt-4 text-[var(--text-secondary)] max-w-2xl mx-auto">
            Sehhati ليست مجرد منصة — إنها رؤية لإعادة تعريف العلاقة بين صحة الموظفين والقرارات المؤسسية.
            نبني المستقبل اليوم.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-vp-animate="fade-up" data-vp-delay="2">
          {visionItems.map((item, i) => (
            <div key={item.title} className="card-premium p-6 relative overflow-hidden group">
              <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-[var(--vp-accent)]/5 blur-xl transition-all duration-500 group-hover:scale-150" />
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--vp-glow-soft)] mb-4">
                  <item.icon className="h-6 w-6 text-[var(--vp-accent)]" />
                </div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center" data-vp-animate="fade-up" data-vp-delay="3">
          <div className="card-premium max-w-2xl mx-auto p-8 bg-[var(--vp-accent)] text-white" style={{ background: 'var(--vp-gradient-cta)' }}>
            <Rocket className="h-10 w-10 mx-auto mb-4 opacity-80" />
            <h3 className="text-2xl font-bold mb-3">كن جزءاً من المستقبل</h3>
            <p className="text-white/80 mb-6 text-sm">
              نحن نبني البنية التحتية الصحية للقوى العاملة في الشرق الأوسط. 
              انضم إلى الشركات الرائدة التي تثق في Sehhati.
            </p>
            <Link href="/demo" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-white text-[var(--vp-accent)] font-bold text-sm hover:shadow-xl hover:shadow-black/20 transition-all">
              اطلب عرضاً تجريبياً
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
