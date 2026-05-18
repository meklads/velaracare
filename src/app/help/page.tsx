import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ChevronLeft, Search, Mail, MessageCircle, FileText, Shield, Users, CreditCard, Apple, Brain, BarChart3 } from "lucide-react";

export const metadata: Metadata = {
  title: "المركز المساعد",
  description: "إجابات لأسئلتك الشائعة حول Velara Care",
};

const faqs = [
  {
    category: "البدء والإعداد",
    icon: FileText,
    questions: [
      { q: "كيف يمكنني إنشاء حساب في Velara Care؟", a: "يمكنك التسجيل من صفحة التسجيل بإدخال بيانات شركتك. بعد التأكيد، يمكنك البدء بدعوة الموظفين فوراً." },
      { q: "كم من الوقت يستغرق إعداد المنصة؟", a: "إعداد الحساب يستغرق دقائق. إضافة الموظفين ودعوتهم لا يتطلب أكثر من يوم عمل." },
      { q: "هل أحتاج إلى تحميل برامج إضافية؟", a: "لا، Velara Care هي منصة ويب تعمل على المتصفح. كما يمكنك تثبيتها كتطبيق على جوالك." },
    ],
  },
  {
    category: "الخصوصية والأمان",
    icon: Shield,
    questions: [
      { q: "هل بيانات الموظفين الصحية آمنة؟", a: "نعم، جميع البيانات مشفرة باستخدام TLS وأفضل ممارسات الأمان. لا نشارك بيانات الأفراد مع أطراف ثالثة." },
      { q: "من يمكنه رؤية نتائج التقييم الصحي؟", a: "فقط الموظف يمكنه رؤية نتائجه. الإدارة ترى إحصائيات مجمعة فقط بدون تفاصيل فردية." },
      { q: "هل تتوافق المنصة مع نظام حماية البيانات السعودي؟", a: "نعم، تم بناء المنصة وفقاً لمتطلبات الهيئة السعودية للبيانات والذكاء الاصطناعي (SDAIA)." },
    ],
  },
  {
    category: "الاشتراك والفوترة",
    icon: CreditCard,
    questions: [
      { q: "ما هي خطط الأسعار المتاحة؟", a: "نقدم ٣ خطط: Basic (٣٥ ريال/موظف)، Standard (٧٥ ريال/موظف)، وEnterprise (١٦٠ ريال/موظف)." },
      { q: "هل يمكنني تغيير خطتي لاحقاً؟", a: "نعم، يمكنك ترقية أو تخفيض خطتك في أي وقت. يتم تطبيق التغيير من الشهر التالي." },
      { q: "هل تقدمون خصومات للشركات الكبرى؟", a: "نعم، للشركات التي يزيد عدد موظفيها عن ١٠٠٠ موظف، نقدم خصومات خاصة. تواصل معنا للمزيد." },
    ],
  },
  {
    category: "الموظفين والتقييم",
    icon: Users,
    questions: [
      { q: "كيف يمكن دعوة الموظفين للمنصة؟", a: "من لوحة التحكم، يمكنك إضافة موظفين فردياً أو استيراد ملف CSV. سيصلكم بريد إلكتروني بكلمة المرور." },
      { q: "ماذا يتضمن التقييم الصحي (HRA)؟", a: "التقييم يشمل أسئلة عن مؤشر كتلة الجسم، النوم، النشاط البدني، التوتر، التغذية، التاريخ العائلي، والضغط." },
      { q: "كم مرة يجب على الموظف إجراء التقييم؟", a: "نوصي بإجراء التقييم كل ٣ أشهر لمتابعة التحسن. المنصة ترسل تذكيراً تلقائياً." },
    ],
  },
  {
    category: "الوجبات والتغذية",
    icon: Apple,
    questions: [
      { q: "كيف يعمل نظام الوجبات الذكية؟", a: "بناءً على نتائج التقييم الصحي، يوصي النظام بوجبات مناسبة. يمكن للموظف طلب وجبته المفضلة." },
      { q: "هل يمكن تخصيص الوجبات لتناسب احتياجات الشركة؟", a: "نعم، يمكن للإدارة إضافة خطط وجبات مخصصة تناسب احتياجات الموظفين." },
    ],
  },
  {
    category: "التقارير والتحليلات",
    icon: BarChart3,
    questions: [
      { q: "ما هي التقارير المتاحة للإدارة؟", a: "نقدم تقارير شاملة: درجة العافية، توزيع المخاطر، تحليل الأقسام، اتجاهات التحسن، وتوفير التكاليف." },
      { q: "هل يمكن تصدير التقارير؟", a: "نعم، يمكن تصدير جميع التقارير بصيغ PDF و CSV للمشاركة مع الإدارة العليا." },
    ],
  },
];

export default function HelpPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-surface-mid section-padding relative overflow-hidden">
          <div className="shade-circle w-[400px] h-[400px] -top-20 -left-20 opacity-30" />
          <div className="container-shade relative z-10 text-center">
            <span className="tag fade-in-up">المركز المساعد</span>
            <h1 className="hero-title mt-4 fade-in-up-delay-1">
              كيف يمكننا <span className="text-emerald">مساعدتك؟</span>
            </h1>
            <p className="subtitle mt-4 text-secondary max-w-xl mx-auto fade-in-up-delay-2">
              إجابات شاملة لجميع أسئلتك حول Velara Care
            </p>
          </div>
        </section>

        <section className="section-padding bg-surface-deeper">
          <div className="container-shade max-w-4xl mx-auto">
            <div className="space-y-10">
              {faqs.map((section) => {
                const Icon = section.icon;
                return (
                  <div key={section.category} className="fade-in-up">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl bg-emerald-soft flex items-center justify-center">
                        <Icon className="h-5 w-5 text-emerald" />
                      </div>
                      <h2 className="text-xl font-bold text-primary">{section.category}</h2>
                    </div>
                    <div className="space-y-3">
                      {section.questions.map((faq, i) => (
                        <details key={i} className="shade-card p-5 group">
                          <summary className="cursor-pointer text-sm font-semibold text-primary select-none flex items-center justify-between">
                            {faq.q}
                            <ChevronLeft className="h-4 w-4 text-secondary group-open:rotate-90 transition-transform shrink-0" />
                          </summary>
                          <p className="mt-3 text-sm text-secondary leading-relaxed">{faq.a}</p>
                        </details>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="shade-card p-8 text-center mt-10 fade-in-up">
              <MessageCircle className="h-10 w-10 text-emerald mx-auto mb-3" />
              <h2 className="text-lg font-bold text-primary mb-2">لم تجد إجابتك؟</h2>
              <p className="text-sm text-secondary mb-5">فريق الدعم الفني جاهز لمساعدتك</p>
              <Link href="/contact" className="btn-primary text-sm">
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
