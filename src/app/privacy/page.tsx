"use client";

import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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
          <div className="text-center mb-12" data-vp-animate="fade-up">
            <span className="vp-label">سياسة الخصوصية</span>
            <h1 className="vp-section-title mt-4">سياسة الخصوصية</h1>
            <p className="vp-subtitle text-[var(--text-secondary)] mt-4">آخر تحديث: مايو 2026</p>
          </div>

          <div className="space-y-6" data-vp-animate="fade-up" data-vp-delay="2">
            {sections.map((s) => (
              <div key={s.title} className="card-premium p-8">
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">{s.title}</h2>
                <p className="text-[var(--text-secondary)] leading-relaxed">{s.content}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
