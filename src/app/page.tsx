import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Shield, TrendingDown, BarChart3, Users, Building2,
  ArrowLeft, Target, Activity, Cpu, TrendingUp, DollarSign,
  Clock, Percent, PieChart, Layers, Network, CheckCircle2, UserCheck
} from "lucide-react";

const platformModules = [
  {
    icon: Activity,
    title: "مسح صحة القوى العاملة",
    desc: "أداة تقييم جماعية تجمع بيانات صحية شاملة من جميع الموظفين — وتحولها إلى لوحة قيادة تنفيذية عن صحة مؤسستك.",
    metric: "آلاف الموظفين",
    metricLabel: "يمكن مسحهم في أيام",
  },
  {
    icon: BarChart3,
    title: "تحليلات صحة المؤسسة",
    desc: "لوحة قيادة حية تعرض Wellness Score المؤسسي، توزيع المخاطر، اتجاهات الصحة، مؤشرات الإنتاجية، ومقارنات الأقسام.",
    metric: "100",
    metricLabel: "مؤشر أداء رئيسي",
  },
  {
    icon: TrendingDown,
    title: "ذكاء خفض التكاليف الصحية",
    desc: "نموذج تحليلي يربط البيانات الصحية بالتكاليف التأمينية — يتوقع الإنفاق المستقبلي ويوصي بخطط وقائية تخفض الأعباء المالية.",
    metric: "حتى 40%",
    metricLabel: "خفض في التكاليف",
  },
  {
    icon: Target,
    title: "التدخل الوقائي الذكي",
    desc: "يحدد القوى العاملة الأكثر عرضة للمخاطر ويطلق توصيات وقائية مخصصة — استشارات، برامج تغذية، خطط لياقة — قبل تطور الحالات.",
    metric: "98%",
    metricLabel: "دقة في تحديد المخاطر",
  },
  {
    icon: Users,
    title: "إدارة برامج العافية المؤسسية",
    desc: "منصة تشغيلية تدير برامج الصحة الوقائية — من الدعوات والتسجيل إلى المتابعة وإصدار التقارير — كل شيء في نظام واحد.",
    metric: "100%",
    metricLabel: "إدارة آلية للبرامج",
  },
  {
    icon: PieChart,
    title: "تقارير العائد على الاستثمار",
    desc: "تقارير جاهزة لمجلس الإدارة تظهر العائد على استثمار الصحة — خفض التكاليف، تحسن الإنتاجية، انخفاض الإجازات المرضية.",
    metric: "3.2x",
    metricLabel: "متوسط العائد على الاستثمار",
  },
];

const businessOutcomes = [
  { icon: DollarSign, value: "حتى 40%", label: "خفض تكاليف الرعاية الصحية" },
  { icon: Users, value: "+25%", label: "تحسن إنتاجية القوى العاملة" },
  { icon: TrendingDown, value: "-35%", label: "انخفاض الإجازات المرضية" },
  { icon: Target, value: "98%", label: "دقة التنبؤ بالمخاطر الصحية" },
  { icon: Clock, value: "7 أيام", label: "وقت النشر والتشغيل" },
  { icon: Percent, value: "3.2x", label: "عائد على الاستثمار" },
];

const ecosystem = [
  {
    icon: Building2,
    title: "الشركة",
    desc: "تشتري المنصة وتحصل على عائد استثمار measurable — موظفون أكثر صحة، تكاليف أقل، إنتاجية أعلى.",
  },
  {
    icon: Users,
    title: "قسم الموارد البشرية",
    desc: "لوحة قيادة متكاملة تراقب المشاركة، التحسن الصحي، والتكاليف — مع تقارير جاهزة للإدارة التنفيذية.",
  },
  {
    icon: UserCheck,
    title: "الموظفون",
    desc: "تجربة صحية مخصصة — تقييم، توصيات، برامج، متابعة — داخل تطبيق واحد يحسن جودة الحياة.",
  },
  {
    icon: Shield,
    title: "المنصة (نظام التشغيل)",
    desc: "طبقة التنسيق المركزية: تحليلات، توصيات، سير عمل، تقييم صحي، تتبع المشاركة، وإعداد التقارير.",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* ═══════════════════════════════════════════════════
           HERO — Enterprise Workforce Health Platform
           ═══════════════════════════════════════════════════ */}
        <section className="relative pt-32 pb-24 overflow-hidden" dir="rtl">
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent-soft)] to-transparent opacity-50" />
          <div className="container-shade relative z-10">
            <div className="mx-auto max-w-4xl text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] text-sm font-medium mb-6">
                <Building2 className="h-4 w-4" />
                منصة تحسين صحة القوى العاملة للشركات
              </div>

              <h1 className="text-[clamp(36px,4vw,56px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)]">
                حوِّل صحة موظفيك إلى
                <br />
                <span className="text-[var(--accent)]">ذكاء مؤسسي وقيمة مالية</span>
              </h1>

              <p className="mt-6 text-lg text-[var(--text-secondary)] leading-relaxed max-w-3xl mx-auto">
                Velara Care هي منصة مؤسسية لتحسين صحة القوى العاملة — تجمع بين التقييم الصحي الشامل،
                التحليلات التنبؤية، وإدارة برامج العافية — لتخفض التكاليف، ترفع الإنتاجية،
                وتعطيك رؤية كاملة عن صحة مؤسستك.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/demo"
                  className="btn-primary text-base px-10 py-4 !h-auto"
                >
                  اطلب عرضاً تجريبياً للمؤسسات
                  <ArrowLeft className="h-4 w-4" />
                </Link>
                <Link
                  href="/product"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-[var(--border-primary)] text-[var(--text-secondary)] font-semibold text-sm hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                >
                  اكتشف المنصة
                </Link>
              </div>

              {/* Quick value props */}
              <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-[var(--text-muted)]">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  تخفيض التكاليف الصحية حتى 40%
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  تحسين إنتاجية القوى العاملة
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  نظام تشغيل صحي مؤسسي متكامل
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
           THE PROBLEM WE SOLVE
           ═══════════════════════════════════════════════════ */}
        <section className="py-20 bg-[var(--bg-secondary)]" dir="rtl">
          <div className="container-shade">
            <div className="max-w-3xl mx-auto text-center mb-14">
              <h2 className="text-[clamp(28px,3vw,40px)] font-extrabold text-[var(--text-primary)] leading-tight">
                التحدي الذي تواجهه كل شركة
              </h2>
              <div className="w-16 h-1 rounded-full bg-[var(--accent)] mx-auto mt-4" />
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { title: "تكاليف صحية متزايدة", desc: "أقساط التأمين الصحي ترتفع سنوياً بنسبة 15-20%. الشركات تدفع أكثر وتحصل على نتائج أقل." },
                { title: "غياب الرؤية الصحية", desc: "ليس لديك أدوات لقياس صحة القوى العاملة بشكل موضوعي. القرارات تُبنى على تخمين وليس بيانات." },
                { title: "حلول منفصلة غير فعالة", desc: "تطبيقات وجبات، برامج لياقة، استشارات — كلها منصات منفصلة لا تتكامل ولا تقيس العائد." },
              ].map((item) => (
                <div key={item.title} className="bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mx-auto mb-4">
                    <TrendingDown className="h-6 w-6 text-red-500" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{item.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
           PLATFORM MODULES — What Velara Actually Does
           ═══════════════════════════════════════════════════ */}
        <section className="py-20" dir="rtl">
          <div className="container-shade">
            <div className="max-w-2xl mb-14">
              <h2 className="text-[clamp(28px,3vw,40px)] font-extrabold text-[var(--text-primary)] leading-tight">
                مكونات المنصة المؤسسية
              </h2>
              <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                نظام تشغيل متكامل لتحسين صحة القوى العاملة — كل مكوّن يخدم هدفاً مؤسسياً قابلاً للقياس.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {platformModules.map((m) => (
                <div
                  key={m.title}
                  className="bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-2xl p-6 hover:border-[var(--accent)]/30 transition-colors"
                >
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

        {/* ═══════════════════════════════════════════════════
           BUSINESS OUTCOMES — Measurable, Defensible
           ═══════════════════════════════════════════════════ */}
        <section className="py-20 bg-[var(--bg-secondary)]" dir="rtl">
          <div className="container-shade">
            <div className="max-w-2xl mb-14">
              <h2 className="text-[clamp(28px,3vw,40px)] font-extrabold text-[var(--text-primary)] leading-tight">
                نتائج مؤسسية قابلة للقياس
              </h2>
              <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                المنصة لا تقدم وعوداً — تقدم بيانات. كل نتيجة قابلة للتتبع والقياس والإبلاغ.
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

        {/* ═══════════════════════════════════════════════════
           ECOSYSTEM — Who Is Involved
           ═══════════════════════════════════════════════════ */}
        <section className="py-20" dir="rtl">
          <div className="container-shade">
            <div className="max-w-2xl mb-14">
              <h2 className="text-[clamp(28px,3vw,40px)] font-extrabold text-[var(--text-primary)] leading-tight">
                منظومة متكاملة الأطراف
              </h2>
              <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                Velara Care تربط بين جميع الأطراف المعنية بصحة القوى العاملة في منصة واحدة.
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

        {/* ═══════════════════════════════════════════════════
           FOR HR DIRECTORS — Direct Pitch
           ═══════════════════════════════════════════════════ */}
        <section className="py-20 bg-[var(--bg-secondary)]" dir="rtl">
          <div className="container-shade">
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-4xl mx-auto">
              <div>
                <h2 className="text-[clamp(28px,3vw,40px)] font-extrabold text-[var(--text-primary)] leading-tight">
                  لمديري الموارد البشرية
                </h2>
                <div className="w-16 h-1 rounded-full bg-[var(--accent)] mt-4 mb-6" />
                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                  هل تواجه صعوبة في قياس أثر برامج العافية على التكاليف والإنتاجية؟
                  هل تريد أداة واحدة تدير كل شيء — من التقييم إلى التقارير التنفيذية؟
                </p>
                <ul className="space-y-3">
                  {[
                    "لوحة قيادة حية لمؤشرات صحة القوى العاملة",
                    "تقارير جاهزة لمجلس الإدارة والإدارة التنفيذية",
                    "إدارة آلية لبرامج العافية من البداية للنهاية",
                    "ربط مباشر بين البيانات الصحية والتكاليف التأمينية",
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
                  <p className="text-sm text-[var(--text-secondary)]">متوسط العائد على استثمار الصحة</p>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "انخفاض الإجازات المرضية", value: "35%" },
                    { label: "تحسن الإنتاجية", value: "25%" },
                    { label: "خفض تكاليف التأمين", value: "40%" },
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

        {/* ═══════════════════════════════════════════════════
           HOW IT WORKS — Deployment Model
           ═══════════════════════════════════════════════════ */}
        <section className="py-20" dir="rtl">
          <div className="container-shade">
            <div className="max-w-2xl mb-14">
              <h2 className="text-[clamp(28px,3vw,40px)] font-extrabold text-[var(--text-primary)] leading-tight">
                النشر والتشغيل
              </h2>
              <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                منصة سحابية تنشر في أيام — بدون تعقيد تقني أو تكاليف بنية تحتية إضافية.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Building2, step: "1", title: "إعداد الحساب المؤسسي", desc: "نسجل شركتك ونحدد الصلاحيات والأدوار في دقائق" },
                { icon: Users, step: "2", title: "دعوة القوى العاملة", desc: "نرسل دعوات للموظفين مع روابط تسجيل مخصصة" },
                { icon: Cpu, step: "3", title: "التقييم والتحليل", desc: "الموظفون يقيمون صحتهم — AI يحلل وينتج التقارير" },
                { icon: TrendingUp, step: "4", title: "القياس والتحسين المستمر", desc: "متابعة حية للنتائج وتقارير دورية للعائد على الاستثمار" },
              ].map((s) => (
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

        {/* ═══════════════════════════════════════════════════
           FINAL CTA — Enterprise Demo
           ═══════════════════════════════════════════════════ */}
        <section className="py-24 bg-[var(--bg-secondary)]" dir="rtl">
          <div className="container-shade">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-[clamp(28px,3vw,40px)] font-extrabold text-[var(--text-primary)] leading-tight">
                هل تريد خفض تكاليف الرعاية الصحية وتحسين إنتاجية القوى العاملة؟
              </h2>
              <p className="mt-4 text-lg text-[var(--text-secondary)] leading-relaxed">
                احصل على عرض تجريبي مخصص لمؤسستك — يتضمن تحليلاً أولياً مجانياً للتكاليف الصحية
                وتوصيات مبدئية للتحسين.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/demo" className="btn-primary text-base px-10 py-4 !h-auto">
                  اطلب عرضاً تجريبياً للمؤسسات
                  <ArrowLeft className="h-4 w-4" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-[var(--border-primary)] text-[var(--text-secondary)] font-semibold text-sm hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                >
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
