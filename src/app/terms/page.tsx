import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "الشروط والأحكام",
  description: "شروط وأحكام استخدام منصة Velara Care",
};

const sections = [
  { title: "القبول بالشروط", content: "باستخدامك لمنصة Velara Care، فإنك توافق على هذه الشروط والأحكام. إذا كنت لا توافق على أي جزء من هذه الشروط، يجب عليك التوقف عن استخدام المنصة." },
  { title: "الخدمات المقدمة", content: "توفر Velara Care منصة متكاملة لإدارة الصحة المؤسسية تشمل: التقييم الصحي الذكي (HRA)، التحليلات التنبؤية بالذكاء الاصطناعي، نظام الوجبات الصحية المخصصة، الاستشارات الغذائية والرياضية، وتقارير العافية للشركات." },
  { title: "حسابات المستخدمين", content: "أنت مسؤول عن الحفاظ على سرية بيانات تسجيل الدخول الخاصة بك. يجب إبلاغنا فوراً عن أي استخدام غير مصرح به لحسابك. يحق لنا تعليق أو إلغاء أي حساب ينتهك هذه الشروط." },
  { title: "البيانات الصحية", content: "البيانات الصحية التي تقدمها تستخدم فقط لتقديم التوصيات المخصصة وتحسين خدماتنا. نحن نلتزم بأعلى معايير الخصوصية والأمان في التعامل مع بياناتك الصحية وفقاً لسياسة الخصوصية." },
  { title: "الملكية الفكرية", content: "جميع حقوق الملكية الفكرية للمنصة ومحتواها محفوظة لـ Velara Care. لا يجوز نسخ أو توزيع أو استخدام أي جزء من المنصة دون إذن كتابي." },
  { title: "الدفع والاشتراكات", content: "يتم الدفع شهرياً حسب الخطة المختارة وعدد الموظفين. جميع الأسعار بالريال السعودي. يمكن إلغاء الاشتراك في أي وقت مع تطبيق سياسة الإلغاء." },
  { title: "إخلاء المسؤولية", content: "التوصيات المقدمة من المنصة هي لأغراض توعوية فقط ولا تغني عن الاستشارة الطبية المباشرة. في الحالات الطارئة، يرجى الاتصال بالطوارئ مباشرة." },
  { title: "تعديل الشروط", content: "نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم إخطار المستخدمين بالتغييرات الجوهرية عبر البريد الإلكتروني." },
];

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface-mid pt-28 pb-16">
        <div className="container-shade max-w-4xl">
          <div className="text-center mb-12 fade-in-up">
            <span className="tag mb-4">الشروط والأحكام</span>
            <h1 className="section-title">الشروط والأحكام</h1>
            <p className="subtitle text-secondary mt-4">آخر تحديث: مايو ٢٠٢٦</p>
          </div>

          <div className="space-y-8 fade-in-up-delay-2">
            {sections.map((s) => (
              <div key={s.title} className="shade-card p-8">
                <h2 className="text-xl font-bold text-primary mb-3">{s.title}</h2>
                <p className="text-secondary leading-relaxed">{s.content}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
