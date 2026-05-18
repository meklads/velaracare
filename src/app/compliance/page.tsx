import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Shield, CheckCircle2, FileText, Lock, Server, Eye, UserCheck, ChevronLeft, Building, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "الامتثال والخصوصية",
  description: "Velara Care ملتزمة بأعلى معايير الأمان والخصوصية للبيانات الصحية",
};

const standards = [
  {
    icon: Shield,
    title: "الامتثال للهيئة السعودية للبيانات (SDAIA)",
    desc: "نلتزم بمتطلبات نظام حماية البيانات الشخصية الصادر عن الهيئة السعودية للبيانات والذكاء الاصطناعي.",
  },
  {
    icon: Lock,
    title: "تشفير البيانات",
    desc: "جميع البيانات مشفرة أثناء النقل (TLS 1.3) وعند التخزين (AES-256). كلمات المرور مشفرة باستخدام scrypt.",
  },
  {
    icon: Server,
    title: "الاستضافة في السعودية",
    desc: "البيانات مستضافة في مراكز بيانات داخل المملكة العربية السعودية لضمان الامتثال المحلي.",
  },
  {
    icon: Eye,
    title: "الخصوصية بالفطرة (Privacy by Design)",
    desc: "النظام مبني على مبدأ الخصوصية بالفطرة. الإدارة ترى فقط إحصائيات مجمعة بدون تفاصيل فردية.",
  },
  {
    icon: UserCheck,
    title: "التحكم في الوصول (RBAC)",
    desc: "نظام صلاحيات متكامل يضمن أن كل مستخدم يرى فقط البيانات المصرح له بها حسب دوره.",
  },
  {
    icon: FileText,
    title: "سجلات التدقيق (Audit Logs)",
    desc: "جميع العمليات الحساسة يتم تسجيلها لضمان الشفافية وإمكانية المراجعة.",
  },
];

export default function CompliancePage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-surface-mid section-padding relative overflow-hidden">
          <div className="shade-circle w-[450px] h-[450px] -top-20 -right-20 opacity-30" />
          <div className="container-shade relative z-10 text-center">
            <span className="tag fade-in-up">الامتثال والخصوصية</span>
            <h1 className="hero-title mt-4 fade-in-up-delay-1">
              بياناتك الصحية <span className="text-emerald">في أيدٍ أمينة</span>
            </h1>
            <p className="subtitle mt-4 text-secondary max-w-2xl mx-auto fade-in-up-delay-2">
              Velara Care ملتزمة بأعلى معايير الأمان والخصوصية المحلية والعالمية لحماية بيانات الموظفين الصحية
            </p>
          </div>
        </section>

        <section className="section-padding bg-surface-deeper">
          <div className="container-shade">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {standards.map((s, i) => (
                <div key={s.title} className={`shade-card p-6 sm:p-8 fade-in-up-delay-${(i % 4) + 1}`}>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-soft mb-5">
                    <s.icon className="h-7 w-7 text-emerald" />
                  </div>
                  <h3 className="text-lg font-bold text-primary">{s.title}</h3>
                  <p className="mt-3 text-secondary leading-relaxed text-sm">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-surface-mid">
          <div className="container-shade max-w-4xl mx-auto">
            <div className="text-center fade-in-up mb-10">
              <h2 className="section-title">سياسة الخصوصية</h2>
              <div className="shade-divider mx-auto mt-4" />
            </div>
            <div className="space-y-6 fade-in-up-delay-2">
              {[
                { title: "البيانات التي نجمعها", content: "نجمع فقط البيانات الصحية التي يقدمها الموظف طواعية من خلال التقييم الصحي (HRA)، بالإضافة إلى البيانات الأساسية مثل الاسم والبريد الإلكتروني والقسم." },
                { title: "كيف نستخدم البيانات", content: "تُستخدم البيانات لتوليد درجة العافية، التوصيات الصحية المخصصة، والتقارير المجمعة للإدارة. لا تُستخدم البيانات لأي غرض آخر دون موافقة صريحة." },
                { title: "مشاركة البيانات", content: "لا تتم مشاركة البيانات الفردية مع أطراف ثالثة. الإدارة ترى فقط إحصائيات مجمعة. يمكن مشاركة بيانات مجمعة غير قابلة للتعريف مع باحثين معتمدين." },
                { title: "الاحتفاظ بالبيانات", content: "تُحتفظ بالبيانات طوال فترة اشتراك الشركة. بعد انتهاء الاشتراك، تُحذف جميع البيانات خلال ٩٠ يوماً." },
                { title: "حقوق الموظفين", content: "للموظف الحق في الوصول إلى بياناته، تصحيحها، أو طلب حذفها في أي وقت. يمكن التواصل مع فريق الخصوصية لطلب ذلك." },
              ].map((section, i) => (
                <div key={i} className="shade-card p-6">
                  <h3 className="font-bold text-primary text-lg mb-2">{section.title}</h3>
                  <p className="text-sm text-secondary leading-relaxed">{section.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-surface-dark text-white text-center">
          <div className="container-shade">
            <Shield className="h-12 w-12 text-emerald mx-auto mb-4" />
            <h2 className="hero-title text-white">الأمان مسؤوليتنا الأولى</h2>
            <p className="subtitle mt-4 text-white/80 max-w-2xl mx-auto">
              نواصل تطوير معايير الأمان والخصوصية لضمان أن بياناتك دائماً في المكان الآمن
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn-primary !bg-white !text-primary">تواصل مع فريق الخصوصية</Link>
              <Link href="/privacy" className="btn-outline !border-white/40 !text-white">سياسة الخصوصية الكاملة</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
