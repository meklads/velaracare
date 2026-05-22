"use client";

import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { FileText, Sparkles } from "lucide-react";
import { initScrollAnimations } from "@/lib/scroll-animations";

const sections = [
  { title: "القبول بالشروط", content: "باستخدامك لمنصة Velara Care، فإنك توافق على هذه الشروط والأحكام. إذا كنت لا توافق على أي جزء من هذه الشروط، يرجى عدم استخدام المنصة." },
  { title: "الحسابات", content: "لتستخدم المنصة، يجب عليك إنشاء حساب. أنت مسؤول عن الحفاظ على سرية معلومات حسابك وكلمة المرور. يجب أن تكون المعلومات التي تقدمها دقيقة وكاملة." },
  { title: "الخدمات", content: "تقدم Velara Care خدمات التقييم الصحي، التوصيات الغذائية، الاستشارات المتخصصة، وتقارير العافية. قد نقوم بتحديث أو تعديل خدماتنا من وقت لآخر." },
  { title: "الخصوصية", content: "جمع واستخدام بياناتك يخضع لسياسة الخصوصية الخاصة بنا. باستخدام المنصة، فإنك توافق على ممارسات جمع البيانات الموضحة في سياسة الخصوصية." },
  { title: "الاشتراك والدفع", content: "الاشتراك في المنصة شهري ويتم احتسابه حسب عدد الموظفين. يتم إصدار فواتير شهرية ويجب الدفع خلال 30 يوماً من تاريخ الفاتورة." },
  { title: "إلغاء الاشتراك", content: "يمكنك إلغاء اشتراكك في أي وقت. سيتم إلغاء الخدمات في نهاية فترة الفوترة الحالية. لا نقدم استرداداً للفترة المتبقية." },
  { title: "الملكية الفكرية", content: "جميع حقوق الملكية الفكرية للمنصة ومحتواها تعود لشركة Velara Care. لا يجوز نسخ أو توزيع أو استخدام أي جزء من المنصة دون إذن خطي." },
  { title: "اتصل بنا", content: "للاستفسارات المتعلقة بالشروط والأحكام، يرجى التواصل معنا على: legal@velaracare.co" },
];

export default function TermsPage() {
  useEffect(() => { const c = initScrollAnimations(); return () => c(); }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[var(--bg-primary)] pt-28 pb-16" dir="rtl">
        <div className="container-shade max-w-4xl">
          <div className="text-center mb-14" data-vp-animate="fade-up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent-soft)] border border-[var(--accent)]/10 text-[var(--accent)] text-xs font-semibold mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              الشروط والأحكام
            </span>
            <h1 className="vp-section-title">الشروط والأحكام</h1>
            <p className="vp-subtitle mt-4">آخر تحديث: مايو 2026</p>
            <div className="w-16 h-1 rounded-full bg-gradient-to-l from-[var(--accent)] to-[var(--accent-light)] mx-auto mt-4" />
          </div>
          <div className="space-y-5" data-vp-animate="fade-up" data-vp-delay="2">
            {sections.map((section, i) => (
              <div key={i} className="card-premium p-6 group hover:shadow-md">
                <h2 className="font-bold text-[var(--text-primary)] text-lg mb-2">{section.title}</h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
