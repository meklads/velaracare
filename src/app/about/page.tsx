import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Heart, Users, TrendingDown, Sparkles, Shield, ChevronLeft, Target, Eye, BarChart3 } from "lucide-react";

export const metadata: Metadata = {
  title: "عن Velara Care",
  description: "نبني مستقبل الصحة الوقائية للشركات — AI-Powered Corporate Health Intelligence.",
};

const values = [
  { icon: Shield, title: "الوقاية أولاً", desc: "نؤمن أن اكتشاف المشكلة قبل حدوثها هو مستقبل الرعاية الصحية." },
  { icon: BarChart3, title: "القرارات المبنية على البيانات", desc: "كل توصية داخل Velara Care تعتمد على تحليل فعلي للبيانات الصحية." },
  { icon: Eye, title: "الخصوصية والثقة", desc: "بيانات الموظفين الصحية تبقى آمنة ومحمية بالكامل." },
  { icon: Heart, title: "الصحة المستدامة", desc: "نساعد الشركات على بناء بيئات عمل صحية طويلة المدى." },
  { icon: Sparkles, title: "الابتكار المستمر", desc: "نطوّر حلولنا باستمرار باستخدام أحدث تقنيات الذكاء الاصطناعي." },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* ── Hero ── */}
        <section className="bg-surface-mid section-padding relative overflow-hidden">
          <div className="shade-circle w-[500px] h-[500px] -top-40 -left-40 opacity-40" />
          <div className="shade-circle w-[300px] h-[300px] top-20 -right-20 opacity-30" />
          <div className="container-shade relative z-10 text-center">
            <div className="fade-in-up"><span className="tag mb-6">عن Velara Care</span></div>
            <h1 className="section-title fade-in-up-delay-1 max-w-4xl mx-auto">
              نبني مستقبل{" "}
              <span className="text-emerald">الصحة الوقائية</span>
              <br />
              للشركات
            </h1>
            <p className="subtitle text-secondary max-w-3xl mx-auto mt-6 fade-in-up-delay-2">
              Velara Care هي منصة سعودية لإدارة الصحة المؤسسية باستخدام الذكاء الاصطناعي والتحليلات الوقائية.
              نستخدم أحدث تقنيات AI لتحليل المخاطر الصحية، وتقديم حلول مخصصة للوجبات والاستشارات —
              لتقليل التكاليف ورفع الإنتاجية.
            </p>
          </div>
        </section>

        {/* ── Story ── */}
        <section className="section-padding bg-surface-deeper relative overflow-hidden">
          <div className="shade-circle w-[400px] h-[400px] -bottom-32 -right-32 opacity-20" />
          <div className="container-shade relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="section-title mb-4">قصة Velara Care</h2>
              <div className="shade-divider mx-auto" />
              <p className="subtitle text-secondary max-w-3xl mx-auto mt-8 leading-relaxed">
                بدأت Velara Care من سؤال بسيط: لماذا تستمر الشركات بدفع تكاليف صحية متزايدة دون امتلاك أدوات وقائية حقيقية؟
              </p>
              <p className="subtitle text-secondary max-w-3xl mx-auto mt-4 leading-relaxed">
                معظم الحلول الحالية تقدم خدمات منفصلة: تطبيق وجبات، منصة لياقة، أو استشارات محدودة.
                لكن لا يوجد نظام موحد قادر على تحويل صحة الموظفين إلى بيانات وقرارات قابلة للتنفيذ.
              </p>
              <p className="subtitle text-secondary max-w-3xl mx-auto mt-4 leading-relaxed">
                لهذا بُنيت Velara Care. منصة ذكية تجمع بين التقييم الصحي، الذكاء الاصطناعي، التغذية، والاستشارات
                داخل نظام واحد يساعد الشركات على حماية موظفيها وتحسين أدائها وتقليل تكاليفها المستقبلية.
              </p>
            </div>
          </div>
        </section>

        {/* ── Vision & Mission ── */}
        <section className="section-padding bg-surface-dark text-white relative overflow-hidden">
          <div className="shade-circle w-[500px] h-[500px] -top-40 -right-40 bg-white/5" />
          <div className="container-shade relative z-10">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="text-center md:text-right">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-ai/20 text-emerald mx-auto md:mx-0 mb-4">
                  <Target className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold mb-3">رؤيتنا</h3>
                <p className="text-white/80 leading-relaxed">
                  أن نصبح المنصة الأولى في الشرق الأوسط لإدارة صحة الموظفين باستخدام الذكاء الاصطناعي والبيانات الوقائية.
                </p>
              </div>
              <div className="text-center md:text-right">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-ai/20 text-emerald mx-auto md:mx-0 mb-4">
                  <Sparkles className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold mb-3">رسالتنا</h3>
                <p className="text-white/80 leading-relaxed">
                  تمكين الشركات من تحسين صحة فرق العمل وتقليل التكاليف الطبية عبر حلول صحية ذكية وقابلة للقياس.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="section-padding relative overflow-hidden">
          <div className="container-shade relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { num: "٩٥٪", label: "رضا العملاء" },
                { num: "١٠٠+", label: "شركة تثق بنا" },
                { num: "٣٠٪", label: "خفض تكاليف التأمين" },
                { num: "٥٠٠٠+", label: "موظف مسجل" },
              ].map((s) => (
                <div key={s.label} className="fade-in-up">
                  <p className="stat-number text-emerald">{s.num}</p>
                  <p className="text-sm text-secondary mt-2">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Values ── */}
        <section className="section-padding bg-surface-deeper relative overflow-hidden">
          <div className="container-shade relative z-10">
            <div className="text-center mb-14">
              <h2 className="section-title">قيمنا</h2>
              <div className="shade-divider mx-auto mt-4" />
            </div>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
              {values.map((v, i) => (
                <div key={v.title} className={`shade-card p-6 text-center fade-in-up-delay-${Math.min(i + 1, 4)}`}>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-soft text-emerald mx-auto shadow-lg mb-4">
                    <v.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-2">{v.title}</h3>
                  <p className="text-sm text-secondary leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="section-padding">
          <div className="container-shade">
            <div className="bg-surface-dark rounded-3xl p-12 sm:p-16 text-center text-white relative overflow-hidden">
              <div className="shade-circle w-[300px] h-[300px] -top-20 -right-20 bg-white/5" />
              <h2 className="section-title text-white relative z-10">انضم إلى ثورة الصحة الوقائية</h2>
              <p className="subtitle text-white/80 mt-4 max-w-xl mx-auto relative z-10">
                احجز عرضاً تجريبياً مجاناً واكتشف كيف يمكن لـ Velara Care أن تغير شركتك
              </p>
              <div className="mt-8 relative z-10">
                <Link href="/demo" className="btn-primary inline-flex">
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
