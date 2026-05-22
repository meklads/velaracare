"use client";

import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Shield, Sparkles } from "lucide-react";
import { initScrollAnimations } from "@/lib/scroll-animations";

const sections = [
  { title: "المقدمة", content: "نحن في Velara Care نلتزم بحماية خصوصية بياناتك الشخصية. توضح هذه السياسة كيفية جمع واستخدام وحماية المعلومات التي تشاركها معنا عند استخدام منصتنا." },
  { title: "المعلومات التي نجمعها", content: "نقوم بجمع المعلومات التالية: الاسم والبريد الإلكتروني ورقم الجوال، بيانات الملف الصحي (الطول، الوزن، العمر، التاريخ الصحي)، نتائج التقييمات الصحية، طلبات الوجبات والاستشارات، ومعلومات الاستخدام داخل المنصة." },
  { title: "كيف نستخدم معلوماتك", content: "نستخدم معلوماتك لتقديم التوصيات الصحية المخصصة، تحسين خدماتنا، التواصل معك بخصوص استشاراتك، إعداد تقارير العافية للشركات (بدون كشف هويتك)، وتحسين تجربة المستخدم." },
  { title: "حماية البيانات", content: "نستخدم أحدث معايير الأمان لحماية بياناتك. جميع البيانات مشفرة أثناء النقل والتخزين. لا نشارك بياناتك الصحية مع أطراف ثالثة دون موافقتك." },
  { title: "الاحتفاظ بالبيانات", content: "نحتفظ ببياناتك طوال فترة اشتراك شركتك في المنصة. يمكنك طلب حذف بياناتك في أي وقت بالتواصل مع فريق الدعم." },
  { title: "حقوقك", content: "لديك الحق في الوصول إلى بياناتك، تصحيحها، حذفها، أو طلب تقييد معالجتها. يمكنك أيضاً الاعتراض على معالجة بياناتك أو طلب نقلها." },
  { title: "التعديلات", content: "قد نقوم بتحديث سياسة الخصوصية من وقت لآخر. سنخطرك بأي تغييرات جوهرية عبر البريد الإلكتروني أو إشعار داخل المنصة." },
  { title: "اتصل بنا", content: "للاستفسارات المتعلقة بالخصوصية، يرجى التواصل معنا على: privacy@velaracare.co" },
];

export default function PrivacyPage() {
  useEffect(() => { const c = initScrollAnimations(); return () => c(); }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[var(--bg-primary)] pt-28 pb-16" dir="rtl">
        <div className="container-shade max-w-4xl">
          <div className="text-center mb-14" data-vp-animate="fade-up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent-soft)] border border-[var(--accent)]/10 text-[var(--accent)] text-xs font-semibold mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              الخصوصية
            </span>
            <h1 className="vp-section-title">سياسة الخصوصية</h1>
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
