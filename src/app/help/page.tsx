"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, Mail, MessageCircle, FileText, Shield, CreditCard, Users, Apple, BarChart3 } from "lucide-react";
import { initScrollAnimations } from "@/lib/scroll-animations";

const faqs = [
  {
    category: "البدء والإعداد", icon: FileText,
    questions: [
      { q: "كيف يمكنني إنشاء حساب في Velara Care؟", a: "يمكنك التسجيل من صفحة التسجيل بإدخال بيانات شركتك. بعد التأكيد، يمكنك البدء بدعوة الموظفين فوراً." },
      { q: "كم من الوقت يستغرق إعداد المنصة؟", a: "إعداد الحساب يستغرق دقائق. إضافة الموظفين ودعوتهم لا يتطلب أكثر من يوم عمل." },
      { q: "هل أحتاج إلى تحميل برامج إضافية؟", a: "لا، Velara Care هي منصة ويب تعمل على المتصفح. كما يمكنك تثبيتها كتطبيق على جوالك." },
    ],
  },
  {
    category: "الخصوصية والأمان", icon: Shield,
    questions: [
      { q: "هل بيانات الموظفين الصحية آمنة؟", a: "نعم، جميع البيانات مشفرة باستخدام TLS وأفضل ممارسات الأمان. لا نشارك بيانات الأفراد مع أطراف ثالثة." },
      { q: "من يمكنه رؤية نتائج التقييم الصحي؟", a: "فقط الموظف يمكنه رؤية نتائجه. الإدارة ترى إحصائيات مجمعة فقط بدون تفاصيل فردية." },
      { q: "هل تتوافق المنصة مع نظام حماية البيانات السعودي؟", a: "نعم، تم بناء المنصة وفقاً لمتطلبات الهيئة السعودية للبيانات والذكاء الاصطناعي (SDAIA)." },
    ],
  },
  {
    category: "الاشتراك والفوترة", icon: CreditCard,
    questions: [
      { q: "ما هي خطط الأسعار المتاحة؟", a: "نقدم ٣ خطط: Basic (٣٥ ريال/موظف)، Standard (٧٥ ريال/موظف)، وEnterprise (١٦٠ ريال/موظف)." },
      { q: "هل يمكنني تغيير خطتي لاحقاً؟", a: "نعم، يمكنك ترقية أو تخفيض خطتك في أي وقت. يتم تطبيق التغيير من الشهر التالي." },
      { q: "هل تقدمون خصومات للشركات الكبرى؟", a: "نعم، للشركات التي يزيد عدد موظفيها عن ١٠٠٠ موظف، نقدم خصومات خاصة. تواصل معنا للمزيد." },
    ],
  },
  {
    category: "الموظفين والتقييم", icon: Users,
    questions: [
      { q: "كيف يمكن دعوة الموظفين للمنصة؟", a: "من لوحة التحكم، يمكنك إضافة موظفين فردياً أو استيراد ملف CSV. سيصلكم بريد إلكتروني بكلمة المرور." },
      { q: "ماذا يتضمن التقييم الصحي (HRA)؟", a: "التقييم يشمل أسئلة عن مؤشر كتلة الجسم، النوم، النشاط البدني، التوتر، التغذية، التاريخ العائلي، والضغط." },
      { q: "كم مرة يجب على الموظف إجراء التقييم؟", a: "نوصي بإجراء التقييم كل ٣ أشهر لمتابعة التحسن. المنصة ترسل تذكيراً تلقائياً." },
    ],
  },
  {
    category: "الوجبات والتغذية", icon: Apple,
    questions: [
      { q: "كيف يعمل نظام الوجبات الذكية؟", a: "بناءً على نتائج التقييم الصحي، يوصي النظام بوجبات مناسبة. يمكن للموظف طلب وجبته المفضلة." },
      { q: "هل يمكن تخصيص الوجبات لتناسب احتياجات الشركة؟", a: "نعم، يمكن للإدارة إضافة خطط وجبات مخصصة تناسب احتياجات الموظفين." },
    ],
  },
  {
    category: "التقارير والتحليلات", icon: BarChart3,
    questions: [
      { q: "ما هي التقارير المتاحة للإدارة؟", a: "نقدم تقارير شاملة: درجة العافية، توزيع المخاطر، تحليل الأقسام، اتجاهات التحسن، وتوفير التكاليف." },
      { q: "هل يمكن تصدير التقارير؟", a: "نعم، يمكن تصدير جميع التقارير بصيغ PDF و CSV للمشاركة مع الإدارة العليا." },
    ],
  },
];

export default function HelpPage() {
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
              المركز المساعد
            </div>
            <h1 className="vp-hero" data-vp-animate="fade-up" data-vp-delay="1">
              كيف يمكننا <span className="vp-hero-em">مساعدتك؟</span>
            </h1>
            <p className="vp-subtitle text-[var(--text-secondary)] max-w-xl mx-auto mt-6" data-vp-animate="fade-up" data-vp-delay="2">
              إجابات شاملة لجميع أسئلتك حول Velara Care
            </p>
          </div>
        </section>

        <section className="section-padding relative overflow-hidden" dir="rtl">
          <div className="absolute inset-0 vp-grid-bg opacity-20" />
          <div className="container-shade max-w-4xl mx-auto relative z-10">
            <div className="space-y-10">
              {faqs.map((section) => {
                const Icon = section.icon;
                return (
                  <div key={section.category} data-vp-animate="fade-up">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl bg-[var(--vp-glow-soft)] flex items-center justify-center">
                        <Icon className="h-5 w-5 text-[var(--vp-accent)]" />
                      </div>
                      <h2 className="text-xl font-bold text-[var(--text-primary)]">{section.category}</h2>
                    </div>
                    <div className="space-y-3">
                      {section.questions.map((faq, i) => (
                        <details key={i} className="card-premium p-5 group">
                          <summary className="cursor-pointer text-sm font-semibold text-[var(--text-primary)] select-none flex items-center justify-between">
                            {faq.q}
                            <ArrowLeft className="h-4 w-4 text-[var(--text-secondary)] group-open:-rotate-90 transition-transform shrink-0" />
                          </summary>
                          <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">{faq.a}</p>
                        </details>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="card-premium p-8 text-center mt-10" data-vp-animate="fade-up">
              <MessageCircle className="h-10 w-10 text-[var(--vp-accent)] mx-auto mb-3" />
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">لم تجد إجابتك؟</h2>
              <p className="text-sm text-[var(--text-secondary)] mb-5">فريق الدعم الفني جاهز لمساعدتك</p>
              <Link href="/contact" className="btn-premium text-sm">
                <Mail className="ml-2 h-4 w-4" /> تواصل معنا
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
