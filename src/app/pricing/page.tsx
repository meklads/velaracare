"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  CheckCircle2, ArrowLeft, Building2, Users,
  TrendingDown, BarChart3, Shield, Cpu, PieChart, Target, UserCheck
} from "lucide-react";
import { initScrollAnimations } from "@/lib/scroll-animations";

const plans = [
  {
    name: "Starter",
    price: "مخصص",
    desc: "للشركات الصغيرة التي تبدأ رحلة تحسين عافية القوى العاملة.",
    popular: false,
    features: [
      "مسح عافية القوى العاملة (حتى 200 موظف)",
      "Wellness Score المؤسسي",
      "لوحة قيادة تنفيذية أساسية",
      "تقارير شهرية",
      "دعم فني",
    ],
  },
  {
    name: "Professional",
    price: "مخصص",
    desc: "للشركات المتوسطة التي تريد برنامج صحي متكامل بنتائج قابلة للقياس.",
    popular: true,
    features: [
      "جميع ميزات Starter",
      "مسح غير محدود للقوى العاملة",
      "ذكاء تحليل التكاليف الصحية",
      "نظام التدخل الوقائي الذكي",
      "تقارير العائد على الاستثمار",
      "بوابة الموظف الكاملة",
      "مدير حساب مخصص",
    ],
  },
  {
    name: "Enterprise",
    price: "مخصص",
    desc: "للشركات الكبرى التي تريد منصة عافية مؤسسية كاملة مع تكاملات مخصصة.",
    popular: false,
    features: [
      "جميع ميزات Professional",
      "تكامل مع ERP و HRMS",
      "ربط مع أنظمة التأمين الصحي",
      "وحدات مخصصة حسب احتياجات الشركة",
      "API مفتوح للتكامل المخصص",
      "تقارير متقدمة لمجلس الإدارة",
      "مدير نجاح عملاء مخصص",
      "SLA مضمون 99.9%",
    ],
  },
];

const planModules = [
  { name: "مسح عافية القوى العاملة", starter: true, pro: true, enterprise: true },
  { name: "Wellness Score المؤسسي", starter: true, pro: true, enterprise: true },
  { name: "لوحة قيادة تنفيذية", starter: true, pro: true, enterprise: true },
  { name: "تقارير شهرية", starter: true, pro: true, enterprise: true },
  { name: "مسح غير محدود للموظفين", starter: false, pro: true, enterprise: true },
  { name: "ذكاء تحليل التكاليف", starter: false, pro: true, enterprise: true },
  { name: "التدخل الوقائي الذكي", starter: false, pro: true, enterprise: true },
  { name: "تقارير العائد على الاستثمار", starter: false, pro: true, enterprise: true },
  { name: "بوابة الموظف الكاملة", starter: false, pro: true, enterprise: true },
  { name: "مدير حساب مخصص", starter: false, pro: true, enterprise: true },
  { name: "تكامل ERP و HRMS", starter: false, pro: false, enterprise: true },
  { name: "ربط مع أنظمة التأمين", starter: false, pro: false, enterprise: true },
  { name: "API مفتوح", starter: false, pro: false, enterprise: true },
  { name: "SLA 99.9%", starter: false, pro: false, enterprise: true },
];

export default function PricingPage() {
  useEffect(() => { const c = initScrollAnimations(); return () => c(); }, []);

  return (
    <>
      <Header />
      <main>
        <section className="relative py-28 overflow-hidden bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)]" dir="rtl">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'var(--vp-gradient-hero)' }} />
          <div className="container-shade relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[var(--vp-glow-soft)] border border-[var(--vp-accent)]/10 text-[var(--vp-accent)] text-sm font-medium mb-6" data-vp-animate="fade-up">
              <span className="vp-breathing-ring inline-block" style={{ width: '6px', height: '6px' }} />
              الأسعار
            </div>
            <h1 className="vp-hero max-w-3xl mx-auto" data-vp-animate="fade-up" data-vp-delay="1">
              خطط مؤسسية مرنة
              <br />
              <span className="vp-hero-em">تناسب كل شركة</span>
            </h1>
            <p className="vp-subtitle text-[var(--text-secondary)] max-w-xl mx-auto mt-6" data-vp-animate="fade-up" data-vp-delay="2">
              اشتراك سنوي حسب حجم القوى العاملة والوحدات المطلوبة. تسعير شفاف بدون رسوم خفيفة.
              جميع الخطط تشمل فترة تجريبية مجانية.
            </p>
          </div>
        </section>

        <section className="section-padding relative overflow-hidden" dir="rtl">
          <div className="container-shade relative z-10">
            <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
              {plans.map((plan, i) => (
                <div key={plan.name} className={`card-premium p-6 text-center relative ${plan.popular ? 'border-2 border-[var(--vp-accent)] shadow-xl shadow-[var(--vp-accent)]/5' : ''}`} data-vp-animate="scale-in" data-vp-delay={String(i + 1)}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1.5 rounded-full text-xs font-bold text-white" style={{ background: 'var(--vp-gradient-cta)' }}>الأكثر طلباً</span>
                    </div>
                  )}
                  <p className="text-xl font-bold text-[var(--text-primary)] mt-2">{plan.name}</p>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">{plan.desc}</p>
                  <div className="mt-5 pt-5 border-t border-[var(--border-primary)]">
                    <p className="text-sm text-[var(--text-secondary)]">تواصل معنا</p>
                    <p className="text-xs text-[var(--text-muted)] mt-1">للحصول على تسعير مخصص</p>
                  </div>

                  {/* Feature set */}
                  <div className="mt-6 space-y-3 text-right">
                    {plan.features.map((f) => (
                      <div key={f} className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)]">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--vp-accent)]" />
                        {f}
                      </div>
                    ))}
                  </div>

                  <Link href="/demo" className={`${plan.popular ? 'btn-premium' : 'btn-ghost'} w-full justify-center mt-6 text-sm`}>
                    اطلب عرضاً تجريبياً
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature comparison */}
        <section className="section-padding relative overflow-hidden" dir="rtl" style={{ background: 'var(--vp-gradient-card)' }}>
          <div className="container-shade max-w-4xl mx-auto">
            <div className="text-center mb-10" data-vp-animate="fade-up">
              <span className="vp-label">مقارنة الميزات</span>
              <h2 className="vp-section-title mt-4">مقارنة الخطط بالتفصيل</h2>
              <div className="w-16 h-1 rounded-full bg-gradient-to-l from-[var(--vp-accent)] to-[var(--vp-cyan)] mx-auto mt-4" />
            </div>

            <div className="overflow-x-auto" data-vp-animate="fade-up" data-vp-delay="2">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border-primary)]">
                    <th className="text-right py-4 px-4 font-bold text-[var(--text-primary)]">الميزة</th>
                    <th className="text-center py-4 px-4 font-bold text-[var(--text-primary)]">Starter</th>
                    <th className="text-center py-4 px-4 font-bold text-[var(--vp-accent)]">Professional</th>
                    <th className="text-center py-4 px-4 font-bold text-[var(--text-primary)]">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {planModules.map((mod) => (
                    <tr key={mod.name} className="border-b border-[var(--border-primary)] hover:bg-[var(--vp-glow-soft)]">
                      <td className="py-3 px-4 text-[var(--text-secondary)]">{mod.name}</td>
                      <td className="text-center py-3 px-4">
                        {mod.starter ? <CheckCircle2 className="h-4 w-4 text-[var(--vp-accent)] mx-auto" /> : <span className="text-[var(--text-muted)]">—</span>}
                      </td>
                      <td className="text-center py-3 px-4">
                        {mod.pro ? <CheckCircle2 className="h-4 w-4 text-[var(--vp-accent)] mx-auto" /> : <span className="text-[var(--text-muted)]">—</span>}
                      </td>
                      <td className="text-center py-3 px-4">
                        {mod.enterprise ? <CheckCircle2 className="h-4 w-4 text-[var(--vp-accent)] mx-auto" /> : <span className="text-[var(--text-muted)]">—</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Enterprise CTA */}
        <section className="relative py-28 overflow-hidden" dir="rtl" style={{ background: 'var(--vp-gradient-dark)' }}>
          <div className="container-shade relative z-10">
            <div className="mx-auto max-w-2xl text-center" data-vp-animate="slide-up">
              <h2 className="vp-hero text-white mb-6">تحدث مع فريق المبيعات</h2>
              <p className="vp-subtitle text-white/70 max-w-xl mx-auto mb-4">
                لكل شركة احتياجاتها. دعنا نبني خطة مخصصة تناسب حجم قواك العاملة وميزانيتك.
              </p>
              <p className="text-sm text-white/50 mb-10">
                فترة تجريبية مجانية — بدون بطاقة ائتمان — بدون التزام.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/demo" className="btn-premium !bg-white !text-[var(--vp-ink)] group">
                  اطلب عرضاً تجريبياً
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                </Link>
                <Link href="/contact" className="btn-ghost !border-white/20 !text-white hover:!bg-white/5">
                  تواصل مع فريقنا
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
