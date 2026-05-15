import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Brain,
  Heart,
  BarChart3,
  Users,
  TrendingDown,
  Sparkles,
  CheckCircle2,
  Apple,
  Quote,
  ChevronLeft,
  Activity,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "تقييم المخاطر الصحية الذكي",
    desc: "استبيان صحي ذكي يقيس مؤشرات الخطر مثل السمنة، السكري، الضغط، النوم والإجهاد خلال دقائق.",
  },
  {
    icon: Sparkles,
    title: "محرك تنبؤي بالذكاء الاصطناعي",
    desc: "يقوم النظام بتحليل البيانات وتصنيف الموظفين حسب مستوى المخاطر الصحية قبل تطور الحالات.",
  },
  {
    icon: Apple,
    title: "نظام وجبات صحية متكامل",
    desc: "اقتراح وجبات صحية مخصصة حسب حالة كل موظف وربط مباشر مع مزودي الطعام الصحي.",
  },
  {
    icon: BarChart3,
    title: "لوحة تحكم تنفيذية للشركات",
    desc: "تقارير فورية عن Wellness Score، المخاطر المتوقعة، والعائد الصحي والاستثماري.",
  },
  {
    icon: Users,
    title: "استشارات تغذية ولياقة",
    desc: "إحالة الموظفين إلى مختصين مع خطط غذائية ورياضية مخصصة بناءً على نتائج التقييم.",
  },
  {
    icon: TrendingDown,
    title: "تقارير وتقليل التكاليف",
    desc: "متابعة تأثير البرنامج على الإجازات المرضية والإنتاجية والتكاليف التأمينية.",
  },
];

const stats = [
  { value: "٤٠٪", label: "خفض متوقع في الإجازات المرضية" },
  { value: "٢٥٪", label: "تحسن في إنتاجية الموظفين" },
  { value: "١٨", label: "قدرة تنبؤية مبكرة للمخاطر", suffix: "شهر" },
  { value: "١٠٠٪", label: "خصوصية وأمان للبيانات الصحية" },
];

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

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* ── Hero ── */}
        <section className="section-padding bg-surface-mid relative overflow-hidden">
          <div className="shade-circle w-72 h-72 -top-20 -right-20" />
          <div className="shade-circle w-48 h-48 -bottom-10 -left-10" />

          <div className="container-shade">
            <div className="mx-auto max-w-4xl text-center">
              <span className="tag fade-in-up">AI-Powered Corporate Health Intelligence</span>

              <h1 className="hero-title mt-6 fade-in-up-delay-1">
                مستقبل الصحة المؤسسية
                <br />
                <span className="text-emerald">يبدأ قبل ظهور المرض</span>
              </h1>

              <p className="subtitle mt-6 text-secondary fade-in-up-delay-2">
                Velara Care هي منصة ذكية تساعد الشركات على التنبؤ بالمخاطر الصحية لموظفيها
                وتقليل التكاليف الطبية والإجازات المرضية عبر الذكاء الاصطناعي، الوجبات الصحية، والاستشارات الوقائية.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 fade-in-up-delay-3">
                <Link href="/demo" className="btn-primary">
                    احجز عرضاً تجريبياً
                    <ChevronLeft className="h-4 w-4" />
                </Link>
                <Link href="/features" className="btn-outline">
                  استكشف المنصة
                </Link>
              </div>
            </div>

            {/* Preview cards */}
            <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-3 max-w-3xl mx-auto fade-in-up-delay-4">
              {[
                { icon: Heart, value: "٨٥", label: "متوسط العافية" },
                { icon: TrendingDown, value: "-٤٠٪", label: "خفض التكاليف" },
                { icon: Users, value: "٩٢٪", label: "مشاركة الموظفين" },
              ].map((item) => (
                <div key={item.label} className="glass-shade rounded-2xl p-4 sm:p-5 flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-soft">
                    <item.icon className="h-6 w-6 text-emerald" />
                  </div>
                  <div>
                    <p className="stat-number text-emerald">{item.value}</p>
                    <p className="text-sm text-secondary">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Problem / Solution ── */}
        <section className="section-padding bg-surface-deeper">
          <div className="container-shade">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="fade-in-up">
                <span className="tag">المشكلة والحل</span>
                <h2 className="section-title mt-4">
                  معظم الشركات تدفع تكاليف صحية مرتفعة…
                  <br />
                  <span className="text-emerald">دون معرفة السبب الحقيقي</span>
                </h2>
                <div className="shade-divider mt-4" />
                <p className="subtitle mt-6 text-secondary">
                  ترتفع تكاليف التأمين الصحي والإجازات المرضية سنوياً بسبب غياب الرؤية الوقائية.
                  Velara Care تمنح الشركات القدرة على اكتشاف المخاطر الصحية مبكراً،
                  وتحويل البيانات الصحية إلى قرارات عملية قابلة للقياس.
                </p>
                <ul className="mt-6 space-y-4">
                  {[
                    "توقع المخاطر الصحية قبل حدوثها",
                    "تحسين صحة الموظفين بشكل مستمر",
                    "خفض تكاليف الرعاية الصحية بنسبة تصل إلى ٤٠٪",
                    "زيادة الإنتاجية وتقليل الغياب",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-soft">
                        <CheckCircle2 className="h-4 w-4 text-emerald" />
                      </div>
                      <span className="text-secondary">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative fade-in-up-delay-2">
                <div className="shade-card p-8">
                  <h3 className="section-title text-2xl sm:text-3xl mb-6">
                    ٤ أنظمة في منصة واحدة
                  </h3>
                  <div className="space-y-4">
                    {[
                      { icon: Brain, title: "تقييم المخاطر الصحية", desc: "استبيان صحي ذكي" },
                      { icon: Sparkles, title: "محرك AI تنبؤي", desc: "تصنيف المخاطر والتوقع المستقبلي" },
                      { icon: Apple, title: "نظام الوجبات المخصصة", desc: "توصيات حسب الملف الصحي" },
                      { icon: Users, title: "خدمات العافية المتصلة", desc: "أخصائيو تغذية ومدربو لياقة" },
                    ].map((item) => (
                      <div key={item.title} className="flex items-center gap-4 rounded-xl bg-emerald-soft p-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white">
                          <item.icon className="h-6 w-6 text-emerald" />
                        </div>
                        <div>
                          <p className="font-semibold text-primary">{item.title}</p>
                          <p className="text-sm text-secondary">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="section-padding bg-surface-dark text-white">
          <div className="container-shade">
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
              {stats.map((stat, i) => (
                <div key={stat.label} className={`text-center fade-in-up-delay-${i + 1}`}>
                  <p className="stat-number text-emerald">{stat.value}
                    {stat.suffix && <span className="text-2xl font-bold text-emerald mr-1">{stat.suffix}</span>}
                  </p>
                  <p className="mt-2 text-white/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section className="section-padding bg-surface-deeper" id="features">
          <div className="container-shade">
            <div className="mx-auto max-w-2xl text-center fade-in-up">
              <span className="tag">الميزات</span>
              <h2 className="section-title mt-4">
                كل ما تحتاجه لصحة موظفيك في{" "}
                <span className="text-emerald">منصة واحدة</span>
              </h2>
              <div className="shade-divider mx-auto mt-4" />
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f, i) => (
                <div key={f.title} className={`shade-card p-6 sm:p-8 fade-in-up-delay-${(i % 4) + 1}`}>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-soft mb-5">
                    <f.icon className="h-7 w-7 text-emerald" />
                  </div>
                  <h3 className="text-xl font-bold text-primary">{f.title}</h3>
                  <p className="mt-3 text-secondary leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it Works ── */}
        <section className="section-padding bg-surface-mid">
          <div className="container-shade">
            <div className="mx-auto max-w-2xl text-center fade-in-up">
              <span className="tag">كيف تعمل</span>
              <h2 className="section-title mt-4">
                ثلاث خطوات لصحة أفضل
              </h2>
              <div className="shade-divider mx-auto mt-4" />
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {[
                { step: "٠١", title: "تقييم الصحة", desc: "الموظف يجيب على استبيان صحي ذكي. النظام يحلل البيانات ويحسب درجة العافية." },
                { step: "٠٢", title: "التوصيات الذكية", desc: "الذكاء الاصطناعي يوصي بوجبات مخصصة، جلسات استشارية، وبرامج لياقة." },
                { step: "٠٣", title: "التحليل والتقارير", desc: "الشركة تشاهد لوحة تحكم شاملة وتقارير دورية عن العائد على الاستثمار." },
              ].map((item, i) => (
                <div key={item.step} className={`text-center shade-card p-8 fade-in-up-delay-${i + 1}`}>
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-soft">
                    <span className="text-2xl font-bold text-emerald">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-primary">{item.title}</h3>
                  <p className="mt-3 text-secondary leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing ── */}
        <section className="section-padding bg-surface-deeper" id="pricing">
          <div className="container-shade">
            <div className="mx-auto max-w-2xl text-center fade-in-up">
              <span className="tag">الأسعار</span>
              <h2 className="section-title mt-4">
                خطط مرنة تناسب{" "}
                <span className="text-emerald">جميع الشركات</span>
              </h2>
              <div className="shade-divider mx-auto mt-4" />
              <p className="subtitle mt-4 text-secondary">
                اشتراك شهري حسب عدد الموظفين
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3 max-w-5xl mx-auto">
              {plans.map((plan, i) => (
                <div key={plan.name} className={`shade-card p-6 sm:p-8 text-center fade-in-up-delay-${(i % 4) + 1} ${plan.popular ? 'border-2 border-teal shadow-lg shadow-teal/10' : ''}`}>
                  {plan.popular && (
                    <span className="tag bg-emerald-ai text-white text-xs mb-4">الأكثر طلباً</span>
                  )}
                  <p className="text-lg font-bold text-primary">{plan.name}</p>
                  <p className="mt-1 text-sm text-secondary">{plan.desc}</p>
                  <div className="mt-4">
                    <span className="stat-number text-emerald">{plan.price}</span>
                    <span className="text-sm text-secondary mr-1">ريال/موظف</span>
                  </div>
                  <ul className="mt-6 space-y-3 text-right">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-secondary">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/demo" className={`${plan.popular ? 'btn-primary' : 'btn-outline'} mt-6 w-full justify-center text-center`}>
                    اطلع على الخطة
                  </Link>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-sm text-muted">
                جميع الأسعار بالريال السعودي. اشتراك شهري لكل موظف.
                <br />
                اتصل بنا للحصول على خصم للشركات الكبرى (أكثر من ١٠٠٠ موظف).
              </p>
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className="section-padding bg-surface-mid">
          <div className="container-shade">
            <div className="mx-auto max-w-2xl text-center fade-in-up">
              <span className="tag">آراء العملاء</span>
              <h2 className="section-title mt-4">
                ماذا يقولون عن{" "}
                <span className="text-emerald">Velara Care</span>
              </h2>
              <div className="shade-divider mx-auto mt-4" />
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                { quote: "منذ استخدام Velara Care، انخفضت الإجازات المرضية في شركتنا بنسبة ٣٥٪. النظام غير طريقة تعاملنا مع صحة الموظفين.", name: "أ. محمد العبدالله", role: "مدير الموارد البشرية", company: "شركة التقنية المتقدمة" },
                { quote: "تقرير العائد على الاستثمار وحده كان كافياً ليقنع الإدارة العليا. Velara Care أثبتت أن الاستثمار في صحة الموظفين مربح.", name: "أ. سارة القحطاني", role: "الرئيس التنفيذي", company: "مجموعة الخليج المالية" },
                { quote: "نظام الوجبات الذكي غير حياة موظفينا. التوصيات المخصصة حسب الحالة الصحية فرق كبير عن أي خدمة تانية.", name: "م. فيصل الدوسري", role: "مدير العمليات", company: "شركة الاتصالات السعودية" },
              ].map((item, i) => (
                <div key={item.name} className={`shade-card p-6 sm:p-8 flex flex-col fade-in-up-delay-${i + 1}`}>
                  <Quote className="h-8 w-8 text-emerald/20 mb-4" />
                  <p className="text-secondary leading-relaxed flex-1">&ldquo;{item.quote}&rdquo;</p>
                  <div className="mt-6 flex items-center gap-3 border-t border-[var(--surface-border)] pt-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-soft text-sm font-bold text-emerald">{item.name.charAt(0)}</div>
                    <div>
                      <p className="font-semibold text-sm text-primary">{item.name}</p>
                      <p className="text-xs text-secondary">{item.role} — {item.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="section-padding bg-surface-dark text-white relative overflow-hidden">
          <div className="shade-circle w-96 h-96 -top-48 -right-48 bg-white/5" />
          <div className="shade-circle w-64 h-64 -bottom-32 -left-32 bg-white/5" />
          <div className="container-shade relative">
            <div className="mx-auto max-w-3xl text-center">
              <span className="tag bg-emerald-ai text-white border border-white/20 mb-4">ابدأ الآن</span>
              <h2 className="hero-title text-white">جاهز لتحويل صحة موظفيك؟</h2>
              <p className="subtitle mt-6 text-white/80">احجز عرضاً تجريبياً مجاناً واكتشف كيف يمكن لـ Velara Care أن تخفض تكاليف الرعاية الصحية وتزيد إنتاجية فريقك.</p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/demo" className="btn-primary !bg-white !text-primary hover:!shadow-xl">احجز عرضاً تجريبياً <ChevronLeft className="h-4 w-4" /></Link>
                <Link href="/pricing" className="btn-outline !border-white/40 !text-white hover:!bg-white/10">شاهد الأسعار</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
