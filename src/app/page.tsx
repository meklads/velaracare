import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  TrendingDown, BarChart3, Users, Building2,
  ArrowLeft, Activity, Cpu, TrendingUp, DollarSign,
  Clock, Percent, PieChart, CheckCircle2, UserCheck,
  Target, Sparkles, Gift, Medal, Smile, Utensils,
  ClipboardCheck
} from "lucide-react";

const platformCapabilities = [
  {
    icon: Activity,
    title: "مسح العافية للقوى العاملة",
    desc: "أداة مسح سريعة تجمع معلومات عن نمط الحياة، التغذية، النشاط، النوم، والإجهاد — وتحولها إلى لوحة قيادة تنفيذية لمستوى العافية في مؤسستك.",
    metric: "آلاف الموظفين",
    metricLabel: "يُمسحون في أيام",
  },
  {
    icon: BarChart3,
    title: "لوحة قيادة العافية للمؤسسة",
    desc: "مؤشر رقمي موحد (Wellness Score) يعكس مستوى العافية العام للقوى العاملة. يظهر الاتجاهات، المشاركة، التحسن، ومقارنات الأقسام.",
    metric: "100",
    metricLabel: "مؤشر أداء رئيسي",
  },
  {
    icon: DollarSign,
    title: "تحليل أثر برامج العافية",
    desc: "يربط بين المشاركة في برامج العافية والتكاليف التشغيلية — يظهر أثر البرامج على الإنتاجية، الغياب، والاحتفاظ بالموظفين.",
    metric: "حتى 40%",
    metricLabel: "توفير في التكاليف",
  },
  {
    icon: Target,
    title: "توصيات وأنشطة مخصصة",
    desc: "يقدم لكل موظف توصيات مخصصة حسب نمط حياته — تحديات لياقة، وجبات صحية، جلسات استرخاء، ومحتوى توعوي — تزيد المشاركة والتحسن.",
    metric: "85%",
    metricLabel: "متوسط المشاركة",
  },
  {
    icon: Users,
    title: "إدارة برامج العافية",
    desc: "تدير دورة حياة برامج العافية بالكامل — الإعلان، التسجيل، المتابعة، التقييم — مع تقارير أتمتة توفر وقت فريق الموارد البشرية.",
    metric: "70%",
    metricLabel: "توفير وقت فريق HR",
  },
  {
    icon: PieChart,
    title: "تقارير العائد على الاستثمار",
    desc: "تقارير جاهزة لمجلس الإدارة تظهر أثر برامج العافية على الإنتاجية، الاحتفاظ بالموظفين، وخفض التكاليف التشغيلية.",
    metric: "3.2x",
    metricLabel: "متوسط العائد على الاستثمار",
  },
];

const valueCards = [
  {
    icon: TrendingDown,
    title: "Reduce Sick Leave",
    desc: "Wellness programs that lower absenteeism and keep your workforce healthy and present."
  },
  {
    icon: Users,
    title: "Improve Employee Wellbeing",
    desc: "Personalized wellness journeys that improve quality of life and job satisfaction."
  },
  {
    icon: BarChart3,
    title: "Workforce Wellness Analytics",
    desc: "Real-time dashboards that track participation, improvement, and business impact."
  },
  {
    icon: Target,
    title: "Measurable Health Outcomes",
    desc: "Quantifiable results linking wellness investment to productivity and cost reduction."
  }
];

const businessOutcomes = [
  { icon: DollarSign, value: "حتى 40%", label: "توفير في التكاليف التشغيلية" },
  { icon: Users, value: "+25%", label: "تحسن إنتاجية القوى العاملة" },
  { icon: TrendingDown, value: "-35%", label: "انخفاض أيام الغياب" },
  { icon: Medal, value: "85%", label: "مشاركة الموظفين" },
  { icon: Clock, value: "7 أيام", label: "وقت النشر والتشغيل" },
  { icon: Percent, value: "3.2x", label: "عائد على الاستثمار" },
];

const ecosystem = [
  {
    icon: Building2,
    title: "الشركة",
    desc: "تستثمر في عافية موظفيها — وتحصل على إنتاجية أعلى، دوران وظيفي أقل، وتكاليف تشغيلية أقل.",
  },
  {
    icon: Users,
    title: "قسم الموارد البشرية",
    desc: "لوحة قيادة متكاملة تراقب المشاركة، مستوى العافية، والتأثير على الإنتاجية — مع تقارير جاهزة للإدارة.",
  },
  {
    icon: UserCheck,
    title: "الموظفون",
    desc: "تجربة عافية مخصصة — مسح نمط حياة، توصيات، تحديات، وجبات صحية، ومحتوى توعوي — تحسن جودة الحياة اليومية.",
  },
  {
    icon: Utensils,
    title: "شبكة مزودي الخدمات",
    desc: "مطاعم健康ية، استشاريو تغذية، ومدربو لياقة — يعملون عبر المنصة لتقديم خدماتهم للموظفين.",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* ════════════════════════════════════════
           HERO — Enterprise Workforce Health Platform
           ════════════════════════════════════════ */}
        <section className="relative pt-32 pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent-soft)] to-transparent opacity-50" />
          <div className="container-shade relative z-10">
            <div className="mx-auto max-w-4xl text-center">

              <h1 className="text-[clamp(36px,4vw,56px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)]">
                Transform Workforce Health
                <br />
                <span className="text-[var(--accent)]">Into Measurable Business Performance</span>
              </h1>

              <p className="mt-6 text-lg text-[var(--text-secondary)] leading-relaxed max-w-3xl mx-auto">
                Velara helps companies improve employee wellbeing, reduce healthcare-related costs,
                increase productivity, and manage workforce wellness through an integrated
                health optimization platform.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/demo" className="btn-primary text-base px-10 py-4 !h-auto">
                  Book Enterprise Demo
                  <ArrowLeft className="h-4 w-4" />
                </Link>
                <Link href="/product" className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-[var(--border-primary)] text-[var(--text-secondary)] font-semibold text-sm hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">
                  Explore Platform
                </Link>
              </div>

              {/* Enterprise value cards */}
              <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                {valueCards.map((card) => (
                  <div key={card.title} className="bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-xl p-4 text-center hover:border-[var(--accent)]/30 transition-colors">
                    <card.icon className="h-5 w-5 text-[var(--accent)] mx-auto mb-2" />
                    <h3 className="text-sm font-bold text-[var(--text-primary)] mb-1">{card.title}</h3>
                    <p className="text-xs text-[var(--text-secondary)] leading-tight">{card.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
           HOW IT WORKS — The Platform Flow
           ════════════════════════════════════════ */}
        <section className="py-20 bg-[var(--bg-secondary)]" dir="rtl">
          <div className="container-shade">
            <div className="max-w-2xl mx-auto text-center mb-14">
              <h2 className="text-[clamp(28px,3vw,40px)] font-extrabold text-[var(--text-primary)] leading-tight">
                كيف تعمل المنصة
              </h2>
              <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                نظام متكامل يربط بين الموظفين، فريق الموارد البشرية، ومزودي الخدمات.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { icon: ClipboardCheck, step: "1", title: "يقيم الموظف", desc: "يملأ مسح نمط الحياة في 5 دقائق — تغذية، نوم، نشاط، إجهاد" },
                { icon: Cpu, step: "2", title: "تحليل ذكي", desc: "المنصة تحلل البيانات وتنتج Wellness Score مخصص وتوصيات" },
                { icon: Gift, step: "3", title: "برامج مخصصة", desc: "الموظف يتلقى تحديات، وجبات، ومحتوى يناسب نمط حياته" },
                { icon: TrendingUp, step: "4", title: "قياس وتحسين", desc: "HR يتابع التقارير، يحسن البرامج، ويقيس العائد على الاستثمار" },
              ].map((s) => (
                <div key={s.step} className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-[var(--accent-soft)] flex items-center justify-center mx-auto mb-4">
                    <s.icon className="h-7 w-7 text-[var(--accent)]" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[var(--accent)] text-white text-sm font-bold flex items-center justify-center mx-auto mb-3">
                    {s.step}
                  </div>
                  <h3 className="font-bold text-[var(--text-primary)] mb-1">{s.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
           PLATFORM CAPABILITIES
           ════════════════════════════════════════ */}
        <section className="py-20" dir="rtl">
          <div className="container-shade">
            <div className="max-w-2xl mb-14">
              <h2 className="text-[clamp(28px,3vw,40px)] font-extrabold text-[var(--text-primary)] leading-tight">
                قدرات المنصة
              </h2>
              <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                نظام تشغيل متكامل لبرامج العافية المؤسسية — كل قدرة تخدم هدفاً قابلاً للقياس.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {platformCapabilities.map((m) => (
                <div key={m.title} className="bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-2xl p-6 hover:border-[var(--accent)]/30 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center mb-4">
                    <m.icon className="h-6 w-6 text-[var(--accent)]" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{m.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">{m.desc}</p>
                  <div className="pt-3 border-t border-[var(--border-primary)]">
                    <span className="text-lg font-extrabold text-[var(--accent)]">{m.metric}</span>
                    <span className="text-xs text-[var(--text-muted)] mr-1">{m.metricLabel}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
           BUSINESS OUTCOMES
           ════════════════════════════════════════ */}
        <section className="py-20 bg-[var(--bg-secondary)]" dir="rtl">
          <div className="container-shade">
            <div className="max-w-2xl mb-14">
              <h2 className="text-[clamp(28px,3vw,40px)] font-extrabold text-[var(--text-primary)] leading-tight">
                نتائج مؤسسية قابلة للقياس
              </h2>
              <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                برامج العافية ليست تكلفة — هي استثمار measurable مع عائد ملموس.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {businessOutcomes.map((o) => (
                <div key={o.label} className="bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-2xl p-5 text-center">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center mx-auto mb-3">
                    <o.icon className="h-5 w-5 text-[var(--accent)]" />
                  </div>
                  <p className="text-xl font-extrabold text-[var(--accent)] leading-none mb-1">{o.value}</p>
                  <p className="text-xs text-[var(--text-secondary)] leading-tight">{o.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
           ECOSYSTEM
           ════════════════════════════════════════ */}
        <section className="py-20" dir="rtl">
          <div className="container-shade">
            <div className="max-w-2xl mb-14">
              <h2 className="text-[clamp(28px,3vw,40px)] font-extrabold text-[var(--text-primary)] leading-tight">
                منظومة العافية المتكاملة
              </h2>
              <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                Velara Care تربط بين جميع الأطراف المعنية بعافية القوى العاملة في منصة واحدة.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {ecosystem.map((e) => (
                <div key={e.title} className="bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-2xl p-6 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-[var(--accent-soft)] flex items-center justify-center mx-auto mb-4">
                    <e.icon className="h-7 w-7 text-[var(--accent)]" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{e.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{e.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
           FOR HR DIRECTORS
           ════════════════════════════════════════ */}
        <section className="py-20 bg-[var(--bg-secondary)]" dir="rtl">
          <div className="container-shade">
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-4xl mx-auto">
              <div>
                <h2 className="text-[clamp(28px,3vw,40px)] font-extrabold text-[var(--text-primary)] leading-tight">
                  لمدراء الموارد البشرية
                </h2>
                <div className="w-16 h-1 rounded-full bg-[var(--accent)] mt-4 mb-6" />
                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                  تبحث عن طريقة منهجية لتحسين عافية الموظفين وقياس أثر برامجك؟
                  Velara Care تعطيك منصة واحدة تدير كل شيء — من المسح إلى التقارير التنفيذية.
                </p>
                <ul className="space-y-3">
                  {[
                    "لوحة قيادة حية لعافية القوى العاملة",
                    "تقارير جاهزة لمجلس الإدارة والإدارة التنفيذية",
                    "إدارة آلية لبرامج العافية من البداية للنهاية",
                    "تحليل أثر البرامج على الإنتاجية والغياب",
                    "مقارنات أداء بين الأقسام والفروع",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <CheckCircle2 className="h-4 w-4 text-[var(--accent)] shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-2xl p-8">
                <div className="text-center mb-6">
                  <p className="text-4xl font-extrabold text-[var(--accent)]">3.2x</p>
                  <p className="text-sm text-[var(--text-secondary)]">متوسط العائد على استثمار العافية</p>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "انخفاض أيام الغياب", value: "35%" },
                    { label: "تحسن الإنتاجية", value: "25%" },
                    { label: "ارتفاع رضا الموظفين", value: "40%" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-secondary)]">
                      <span className="text-sm text-[var(--text-secondary)]">{item.label}</span>
                      <span className="text-sm font-bold text-[var(--accent)]">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
           FOR EMPLOYEES — What They Get
           ════════════════════════════════════════ */}
        <section className="py-20" dir="rtl">
          <div className="container-shade">
            <div className="max-w-2xl mb-14">
              <h2 className="text-[clamp(28px,3vw,40px)] font-extrabold text-[var(--text-primary)] leading-tight">
                ماذا يحصل الموظف؟
              </h2>
              <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                تجربة متكاملة تبدأ بمسح سريع وتستمر بتوصيات وبرامج مخصصة.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Smile, title: "مسح نمط الحياة", desc: "يقيم عاداته اليومية في 5 دقائق — نوم، تغذية، نشاط، إجهاد" },
                { icon: Medal, title: "Wellness Score شخصي", desc: "يحصل على درجة عافية مخصصة ونصائح لتحسينها" },
                { icon: Gift, title: "تحديات وبرامج", desc: "يشارك في تحديات لياقة، وجبات صحية، ومحتوى توعوي" },
                { icon: TrendingUp, title: "تقدم ملموس", desc: "يتابع تحسنه عبر الوقت ويحصل على مكافآت وتحفيز" },
              ].map((item) => (
                <div key={item.title} className="bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-2xl p-6 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-[var(--accent-soft)] flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-7 w-7 text-[var(--accent)]" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{item.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
           FINAL CTA
           ════════════════════════════════════════ */}
        <section className="py-24 bg-[var(--bg-secondary)]" dir="rtl">
          <div className="container-shade">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-[clamp(28px,3vw,40px)] font-extrabold text-[var(--text-primary)] leading-tight">
                هل تريد بناء برنامج عافية مؤسسي حقيقي؟
              </h2>
              <p className="mt-4 text-lg text-[var(--text-secondary)] leading-relaxed">
                احصل على عرض تجريبي مخصص لمؤسستك — يتضمن تحليلاً أولياً لمستوى عافية القوى العاملة
                وتوصيات مبدئية للبرامج والأنشطة.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/demo" className="btn-primary text-base px-10 py-4 !h-auto">
                  اطلب عرضاً تجريبياً للمؤسسات
                  <ArrowLeft className="h-4 w-4" />
                </Link>
                <Link href="/pricing" className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-[var(--border-primary)] text-[var(--text-secondary)] font-semibold text-sm hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">
                  شاهد الخطط والأسعار
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
