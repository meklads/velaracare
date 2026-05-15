import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CheckCircle2, ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "الأسعار",
  description: "خطط مرنة تناسب جميع الشركات. اشتراك شهري حسب عدد الموظفين.",
};

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

export default function PricingPage() {
  return (
    <>
      <Header />
      <main>
        {/* ── Hero ── */}
        <section className="bg-surface-mid section-padding relative overflow-hidden">
          <div className="shade-circle w-[500px] h-[500px] -top-40 -right-40 opacity-40" />
          <div className="shade-circle w-[300px] h-[300px] top-20 -left-20 opacity-30" />

          <div className="container-shade relative z-10 text-center">
            <div className="fade-in-up">
              <span className="tag mb-6">الأسعار</span>
            </div>
            <h1 className="section-title fade-in-up-delay-1 max-w-3xl mx-auto">
              خطط مرنة تناسب
              <br />
              <span className="text-emerald">جميع الشركات</span>
            </h1>
            <p className="subtitle text-secondary max-w-xl mx-auto mt-6 fade-in-up-delay-2">
              ابدأ برنامج الصحة الوقائية لموظفيك. اشتراك شهري حسب عدد الموظفين.
            </p>
          </div>
        </section>

        {/* ── Pricing Grid ── */}
        <section className="section-padding bg-surface-deeper relative overflow-hidden">
          <div className="shade-circle w-[400px] h-[400px] -bottom-32 -left-32 opacity-20" />

          <div className="container-shade relative z-10">
            <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
              {plans.map((plan, i) => (
                <div
                  key={plan.name}
                  className={`shade-card p-6 relative fade-in-up-delay-${Math.min(i + 1, 4)} ${
                    plan.popular ? "border-teal ring-2 ring-emerald-ai/20" : ""
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-gradient text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap">
                      الأكثر طلباً
                    </span>
                  )}
                  <p className="text-xl font-bold text-primary mt-2">{plan.name}</p>
                  <p className="mt-1 text-sm text-secondary">{plan.desc}</p>
                  <div className="mt-5 pt-5 border-t border-[var(--surface-border)]">
                    <span className="stat-number text-emerald">
                      {plan.price}
                    </span>
                    <span className="text-sm text-secondary mr-1.5 font-medium">
                      ريال/موظف
                    </span>
                    <p className="text-xs text-secondary mt-1">شهرياً</p>
                  </div>
                  <ul className="mt-6 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-secondary">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/demo"
                    className={plan.popular ? "btn-primary w-full justify-center mt-6 text-sm" : "btn-outline w-full justify-center mt-6 text-sm"}
                  >
                    اطلع على الخطة
                    <ChevronLeft className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-sm text-secondary">
                جميع الأسعار بالريال السعودي. اشتراك شهري لكل موظف.
                <br />
                اتصل بنا للحصول على خصم للشركات الكبرى (أكثر من ١٠٠٠ موظف).
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
