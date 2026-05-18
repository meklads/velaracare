"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { initScrollAnimations } from "@/lib/scroll-animations";

const plans = [
  { name: "Basic", price: "35", desc: "حل أساسي لتوفير الوجبات الصحية للشركات.", popular: false, features: ["10 وجبات صحية شهرياً", "لوحة طلب للموظفين", "تقارير استخدام بسيطة", "دعم فني أساسي"] },
  { name: "Standard", price: "75", desc: "حل متكامل للصحة الوقائية والتقييم الصحي.", popular: true, features: ["جميع مميزات Basic", "تقييم HRA صحي", "Wellness Score", "تقارير شهرية للشركة", "توصيات غذائية ذكية"] },
  { name: "Enterprise", price: "160", desc: "منصة صحة مؤسسية متقدمة للشركات الكبرى.", popular: false, features: ["جميع مميزات Standard", "AI Predictive Engine", "استشارات تغذية ولياقة", "لوحة تنفيذية متقدمة", "تقارير ROI وتقليل التكاليف", "مدير حساب مخصص"] },
];

export default function PricingPage() {
  useEffect(() => { const c = initScrollAnimations(); return () => c(); }, []);

  return (
    <>
      <Header />
      <main>
        <section className="relative py-28 overflow-hidden bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)]" dir="rtl">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'var(--vp-gradient-hero)' }} />
          <div className="absolute inset-0 vp-grid-bg opacity-30" />
          <div className="container-shade relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[var(--vp-glow-soft)] border border-[var(--vp-accent)]/10 text-[var(--vp-accent)] text-sm font-medium mb-6" data-vp-animate="fade-up">
              <span className="vp-breathing-ring inline-block" style={{ width: '6px', height: '6px' }} />
              الأسعار
            </div>
            <h1 className="vp-hero max-w-3xl mx-auto" data-vp-animate="fade-up" data-vp-delay="1">
              خطط مرنة تناسب
              <br />
              <span className="vp-hero-em">جميع الشركات</span>
            </h1>
            <p className="vp-subtitle text-[var(--text-secondary)] max-w-xl mx-auto mt-6" data-vp-animate="fade-up" data-vp-delay="2">
              ابدأ برنامج الصحة الوقائية لموظفيك. اشتراك شهري حسب عدد الموظفين.
            </p>
          </div>
        </section>

        <section className="section-padding relative overflow-hidden" dir="rtl">
          <div className="absolute inset-0 vp-grid-bg opacity-20" />
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
                    <span className="vp-stat">{plan.price}</span>
                    <span className="text-sm text-[var(--text-secondary)] mr-1.5 font-medium">ريال/موظف</span>
                    <p className="text-xs text-[var(--text-secondary)] mt-1">شهرياً</p>
                  </div>
                  <ul className="mt-6 space-y-3 text-right">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)]">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--vp-accent)]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/demo" className={`${plan.popular ? 'btn-premium' : 'btn-ghost'} w-full justify-center mt-6 text-sm`}>
                    اطلع على الخطة
                  </Link>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-sm text-[var(--text-secondary)]">
                جميع الأسعار بالريال السعودي. اشتراك شهري لكل موظف.
                <br />
                اتصل بنا للحصول على خصم للشركات الكبرى (أكثر من 1000 موظف).
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
