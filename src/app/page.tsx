import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Shield, Heart, Phone, Mail, MapPin, ArrowLeft,
  Users, TrendingDown, BarChart3, Activity, Brain,
  CheckCircle2, Clock, Award, Star
} from "lucide-react";

const services = [
  {
    icon: Brain,
    title: "التقييم الصحي التنبؤي",
    desc: "تحليل ذكي لـ ١٢ مؤشراً صحياً مع تقارير مخصصة لكل موظف. نحدد المخاطر قبل ١٢ شهراً من تطورها.",
  },
  {
    icon: Heart,
    title: "برامج العافية المخصصة",
    desc: "خطط تغذية ولياقة واستشارات صحية مبنية على التحليل الفردي. ربط مباشر مع مزودي الخدمات.",
  },
  {
    icon: TrendingDown,
    title: "خفض التكاليف التأمينية",
    desc: "تحليلات مالية تنبؤية تخفض التكاليف التأمينية بنسبة تصل إلى ٤٠٪ مع تحسين العائد على الاستثمار.",
  },
  {
    icon: BarChart3,
    title: "تقارير ولوحات قيادة",
    desc: "مؤشرات أداء حية للقوى العاملة. تقارير جاهزة لمجلس الإدارة والإدارة التنفيذية.",
  },
];

const trustPillars = [
  { icon: Award, title: "خبرة تمتد لـ ٤٥+ عاماً", desc: "فريقنا يضم خبراء في الصحة المؤسسية والتكنولوجيا" },
  { icon: Shield, title: "أمان وامتثال دولي", desc: "ISO 27001, PDPL, SDAIA, SOC 2 — نطبق أعلى معايير الأمان" },
  { icon: Users, title: "أكثر من ٢٥٠ مؤسسة", desc: "تثق بنا في تحسين صحة موظفيها وخفض التكاليف" },
];

const certifications = [
  { name: "ISO 27001", desc: "أمن المعلومات" },
  { name: "PDPL", desc: "حماية البيانات" },
  { name: "SDAIA", desc: "الذكاء الاصطناعي" },
  { name: "SOC 2", desc: "الخصوصية" },
  { name: "PIPL", desc: "الامتثال الصحي" },
  { name: "GDPR", desc: "الخصوصية الأوروبية" },
];

const steps = [
  { icon: ClipboardCheck, step: "١", title: "تقييم شامل", desc: "يقيم الموظف صحته عبر HRA ذكي في ٧ دقائق" },
  { icon: Cpu, step: "٢", title: "تحليل ذكي", desc: "AI يحلل البيانات ويصنف المخاطر بدقة ٩٨٪" },
  { icon: Heart, step: "٣", title: "خطط مخصصة", desc: "توصيات تغذية ولياقة واستشارات حسب الحالة" },
  { icon: TrendingUp, step: "٤", title: "قياس وتحسين", desc: "متابعة مستمرة وتقارير دورية وقياس العائد" },
];

import { ClipboardCheck, Cpu, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* ═══════════════════════════════════════
           HERO — Clear, Calm, Trustworthy
           ═══════════════════════════════════════ */}
        <section className="relative pt-32 pb-24 overflow-hidden" dir="rtl">
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent-soft)] to-transparent opacity-50" />
          <div className="container-shade relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] text-sm font-medium mb-6">
                <Shield className="h-4 w-4" />
                منصة الصحة المؤسسية — Velara Care
              </div>

              <h1 className="text-[clamp(36px,4vw,56px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)]">
                صحة أفضل لقوى عاملة
                <br />
                <span className="text-[var(--accent)]">أكثر إنتاجية وعطاءً</span>
              </h1>

              <p className="mt-6 text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
                Velara Care منصة ذكاء صحي مؤسسي تجمع بين التقييم التنبؤي بالذكاء الاصطناعي،
                برامج العافية المخصصة، والتحليلات المالية — لتحويل صحة الموظفين إلى قيمة مؤسسية.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/demo"
                  className="btn-primary text-base px-10 py-4 !h-auto"
                >
                  اطلب عرضاً تجريبياً
                  <ArrowLeft className="h-4 w-4" />
                </Link>
                <Link
                  href="/product"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-[var(--border-primary)] text-[var(--text-secondary)] font-semibold text-sm hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                >
                  اكتشف المنصة
                </Link>
              </div>

              {/* Trust indicators — simple text */}
              <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-[var(--text-muted)]">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  معتمد من هيئة الصحة السعودية
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  متوافق مع PDPL و SDAIA
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  يستخدم من ٢٥٠+ مؤسسة
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
           CORE SERVICES — Simple Cards
           ═══════════════════════════════════════ */}
        <section className="py-20" dir="rtl">
          <div className="container-shade">
            <div className="max-w-2xl mb-14">
              <h2 className="text-[clamp(28px,3vw,40px)] font-extrabold text-[var(--text-primary)] leading-tight">
                خدماتنا المتكاملة
              </h2>
              <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                منصة واحدة تجمع كل ما تحتاجه لتحسين صحة القوى العاملة — من التقييم إلى التنفيذ والمتابعة.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((s) => (
                <div
                  key={s.title}
                  className="bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-2xl p-6 hover:border-[var(--accent)]/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center mb-4">
                    <s.icon className="h-6 w-6 text-[var(--accent)]" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{s.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
           WHY VELARA — Trust Pillars
           ═══════════════════════════════════════ */}
        <section className="py-20 bg-[var(--bg-secondary)]" dir="rtl">
          <div className="container-shade">
            <div className="max-w-2xl mb-14">
              <h2 className="text-[clamp(28px,3vw,40px)] font-extrabold text-[var(--text-primary)] leading-tight">
                لماذا Velara Care؟
              </h2>
              <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                أكثر من منصة صحية — نحن شريك استراتيجي في تحسين صحة القوى العاملة وخفض التكاليف.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {trustPillars.map((p) => (
                <div key={p.title} className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-[var(--accent-soft)] flex items-center justify-center mx-auto mb-5">
                    <p.icon className="h-8 w-8 text-[var(--accent)]" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">{p.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
           HOW IT WORKS — Simple Steps
           ═══════════════════════════════════════ */}
        <section className="py-20" dir="rtl">
          <div className="container-shade">
            <div className="max-w-2xl mb-14">
              <h2 className="text-[clamp(28px,3vw,40px)] font-extrabold text-[var(--text-primary)] leading-tight">
                كيف تعمل المنصة
              </h2>
              <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                أربع خطوات بسيطة لتحويل صحة القوى العاملة إلى قيمة مؤسسية قابلة للقياس.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((s, i) => (
                <div key={s.step} className="relative">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[var(--accent)] text-white text-sm font-bold flex items-center justify-center shrink-0">
                      {s.step}
                    </div>
                    <div className="h-px flex-1 bg-[var(--border-primary)] hidden lg:block" />
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center mb-4">
                    <s.icon className="h-6 w-6 text-[var(--accent)]" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">{s.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
           CERTIFICATIONS & TRUST
           ═══════════════════════════════════════ */}
        <section className="py-20 bg-[var(--bg-secondary)]" dir="rtl">
          <div className="container-shade">
            <div className="max-w-2xl mb-14 text-center mx-auto">
              <h2 className="text-[clamp(28px,3vw,40px)] font-extrabold text-[var(--text-primary)] leading-tight">
                الشهادات والاعتمادات
              </h2>
              <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                نطبق أعلى معايير الأمان والجودة العالمية لضمان حماية بياناتكم وامتثال المنصة.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              {certifications.map((cert) => (
                <div
                  key={cert.name}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-[var(--border-primary)] text-sm font-semibold text-[var(--text-primary)]"
                >
                  <Shield className="h-4 w-4 text-[var(--accent)]" />
                  {cert.name}
                  <span className="text-[var(--text-muted)] font-normal">— {cert.desc}</span>
                </div>
              ))}
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              {[
                { value: "٢٥٠+", label: "مؤسسة تثق بنا" },
                { value: "٩٨٪", label: "دقة التنبؤ" },
                { value: "٤٠٪", label: "خفض التكاليف" },
                { value: "٤.٩/٥", label: "تقييم العملاء" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-6 bg-white border border-[var(--border-primary)] rounded-2xl">
                  <p className="text-[clamp(32px,3vw,44px)] font-extrabold text-[var(--accent)] leading-none mb-2">
                    {stat.value}
                  </p>
                  <p className="text-sm text-[var(--text-secondary)]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
           FINAL CTA — Simple, Direct
           ═══════════════════════════════════════ */}
        <section className="py-24" dir="rtl">
          <div className="container-shade">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-[clamp(28px,3vw,40px)] font-extrabold text-[var(--text-primary)] leading-tight">
                جاهز لتحسين صحة قواك العاملة؟
              </h2>
              <p className="mt-4 text-lg text-[var(--text-secondary)] leading-relaxed">
                احصل على عرض تجريبي مخصص لاحتياجات مؤسستك — مع تحليل أولي مجاني للتكاليف الصحية.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/demo" className="btn-primary text-base px-10 py-4 !h-auto">
                  اطلب عرضاً تجريبياً
                  <ArrowLeft className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-[var(--border-primary)] text-[var(--text-secondary)] font-semibold text-sm hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                >
                  تواصل معنا
                </Link>
              </div>

              <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[var(--text-muted)]">
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" />
                  +966 800 123 4567
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" />
                  hello@velara.care
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  الرياض، المملكة العربية السعودية
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
