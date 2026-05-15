import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Brain,
  Sparkles,
  Apple,
  BarChart3,
  Users,
  TrendingDown,
  Heart,
  Activity,
  FileText,
  Shield,
  ChevronLeft,
} from "lucide-react";

export const metadata: Metadata = {
  title: "الميزات",
  description: "منصة متكاملة لإدارة صحة الموظفين بالذكاء الاصطناعي",
};

const featuresDetailed = [
  {
    icon: Heart,
    title: "Health Risk Assessment (HRA)",
    desc: "يقوم الموظف بالإجابة على تقييم صحي ذكي خلال أقل من ٧ دقائق، يشمل مؤشرات النوم، النشاط، التغذية، الإجهاد، التاريخ العائلي، والوزن.",
  },
  {
    icon: Sparkles,
    title: "Predictive AI Engine",
    desc: "محرك تنبؤي يحلل البيانات الصحية ويصنف الموظفين إلى مستويات مخاطر مختلفة مع اقتراحات عملية للتدخل المبكر.",
  },
  {
    icon: Heart,
    title: "Wellness Score",
    desc: "رقم ذكي من ١٠٠ يعكس مستوى الصحة المؤسسية للفريق بالكامل ويساعد الإدارة على قياس التحسن شهرياً.",
  },
  {
    icon: Apple,
    title: "Smart Meal System",
    desc: "نظام توصية وجبات صحية حسب احتياجات كل موظف وربط مباشر مع مزودي الأغذية الصحية.",
  },
  {
    icon: Users,
    title: "Professional Consultations",
    desc: "إمكانية حجز استشارات تغذية ولياقة وصحة نفسية مباشرة من داخل المنصة.",
  },
  {
    icon: BarChart3,
    title: "Executive Dashboard",
    desc: "لوحة تنفيذية للإدارة تعرض مؤشرات الصحة المؤسسية والتكاليف المتوقعة والعائد على الاستثمار.",
  },
];

export default function FeaturesPage() {
  return (
    <>
      <Header />
      <main>
        {/* ── Hero ── */}
        <section className="bg-surface-mid section-padding relative overflow-hidden">
          <div className="shade-circle w-[500px] h-[500px] -top-40 -left-40 opacity-40" />
          <div className="shade-circle w-[300px] h-[300px] top-20 -right-20 opacity-30" />

          <div className="container-shade relative z-10 text-center">
            <div className="fade-in-up">
              <span className="tag mb-6">الميزات</span>
            </div>
            <h1 className="section-title fade-in-up-delay-1 max-w-4xl mx-auto">
              منصة متكاملة لإدارة صحة الموظفين
              <br />
              <span className="text-emerald">بالذكاء الاصطناعي</span>
            </h1>
            <p className="subtitle text-secondary max-w-2xl mx-auto mt-6 fade-in-up-delay-2">
              Velara Care تجمع بين التحليل الصحي، الذكاء الاصطناعي، الوجبات الصحية، والاستشارات المتخصصة داخل منصة واحدة قابلة للقياس والتوسع.
            </p>
          </div>
        </section>

        {/* ── Features Grid ── */}
        <section className="section-padding bg-surface-deeper relative overflow-hidden">
          <div className="shade-circle w-[400px] h-[400px] -bottom-32 -right-32 opacity-20" />

          <div className="container-shade relative z-10">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuresDetailed.map((f, i) => (
                <div
                  key={f.title}
                  className={`shade-card p-6 fade-in-up-delay-${Math.min(i + 1, 4)}`}
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-soft text-emerald shadow-lg">
                    <f.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">
                    {f.title}
                  </h3>
                  <p className="text-secondary leading-relaxed text-sm">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="section-padding relative overflow-hidden">
          <div className="shade-circle w-[600px] h-[600px] -top-60 -left-60 opacity-20" />

          <div className="container-shade relative z-10">
            <div className="bg-surface-dark rounded-3xl p-12 sm:p-16 text-center text-white relative overflow-hidden">
              <div className="shade-circle w-[300px] h-[300px] -top-20 -right-20 bg-white/5" />
              <div className="shade-circle w-[200px] h-[200px] -bottom-10 -left-10 bg-white/5" />

              <h2 className="section-title text-white relative z-10">
                جاهز تجرب المنصة؟
              </h2>
              <p className="subtitle text-white/80 mt-4 max-w-xl mx-auto relative z-10">
                احجز عرضاً تجريبياً مجاناً لمدة ١٤ يوماً
              </p>
              <div className="mt-8 relative z-10">
                <Link
                  href="/demo"
                  className="btn-primary inline-flex"
                >
                  اطلب عرضاً تجريبياً
                  <ChevronLeft className="h-4 w-4" />
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
