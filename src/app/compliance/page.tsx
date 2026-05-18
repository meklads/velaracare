"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Shield, Lock, Server, Eye, UserCheck, FileText, ArrowLeft } from "lucide-react";
import { initScrollAnimations } from "@/lib/scroll-animations";

const standards = [
  { icon: Shield, title: "الامتثال للهيئة السعودية للبيانات (SDAIA)", desc: "نلتزم بمتطلبات نظام حماية البيانات الشخصية الصادر عن الهيئة السعودية للبيانات والذكاء الاصطناعي." },
  { icon: Lock, title: "تشفير البيانات", desc: "جميع البيانات مشفرة أثناء النقل (TLS 1.3) وعند التخزين (AES-256). كلمات المرور مشفرة باستخدام scrypt." },
  { icon: Server, title: "الاستضافة في السعودية", desc: "البيانات مستضافة في مراكز بيانات داخل المملكة العربية السعودية لضمان الامتثال المحلي." },
  { icon: Eye, title: "الخصوصية بالفطرة (Privacy by Design)", desc: "النظام مبني على مبدأ الخصوصية بالفطرة. الإدارة ترى فقط إحصائيات مجمعة بدون تفاصيل فردية." },
  { icon: UserCheck, title: "التحكم في الوصول (RBAC)", desc: "نظام صلاحيات متكامل يضمن أن كل مستخدم يرى فقط البيانات المصرح له بها حسب دوره." },
  { icon: FileText, title: "سجلات التدقيق (Audit Logs)", desc: "جميع العمليات الحساسة يتم تسجيلها لضمان الشفافية وإمكانية المراجعة." },
];

export default function CompliancePage() {
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
              الامتثال والخصوصية
            </div>
            <h1 className="vp-hero max-w-4xl mx-auto" data-vp-animate="fade-up" data-vp-delay="1">
              بياناتك الصحية <span className="vp-hero-em">في أيدٍ أمينة</span>
            </h1>
            <p className="vp-subtitle text-[var(--text-secondary)] max-w-2xl mx-auto mt-6" data-vp-animate="fade-up" data-vp-delay="2">
              Velara Care ملتزمة بأعلى معايير الأمان والخصوصية المحلية والعالمية لحماية بيانات الموظفين الصحية
            </p>
          </div>
        </section>

        <section className="section-padding relative overflow-hidden" dir="rtl">
          <div className="absolute inset-0 vp-grid-bg opacity-20" />
          <div className="container-shade relative z-10">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {standards.map((s, i) => (
                <div key={s.title} className="card-premium p-6 sm:p-8" data-vp-animate="fade-up" data-vp-delay={String((i % 4) + 1)}>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--vp-glow-soft)] mb-5">
                    <s.icon className="h-7 w-7 text-[var(--vp-accent)]" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">{s.title}</h3>
                  <p className="mt-3 text-[var(--text-secondary)] leading-relaxed text-sm">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding relative overflow-hidden" dir="rtl" style={{ background: 'var(--vp-gradient-card)' }}>
          <div className="container-shade max-w-4xl mx-auto">
            <div className="text-center mb-10" data-vp-animate="fade-up">
              <span className="vp-label">سياسة الخصوصية</span>
              <h2 className="vp-section-title mt-4">سياسة الخصوصية</h2>
              <div className="w-16 h-1 rounded-full bg-gradient-to-l from-[var(--vp-accent)] to-[var(--vp-cyan)] mx-auto mt-4" />
            </div>
            <div className="space-y-6" data-vp-animate="fade-up" data-vp-delay="2">
              {[
                { title: "البيانات التي نجمعها", content: "نجمع فقط البيانات الصحية التي يقدمها الموظف طواعية من خلال التقييم الصحي (HRA)، بالإضافة إلى البيانات الأساسية مثل الاسم والبريد الإلكتروني والقسم." },
                { title: "كيف نستخدم البيانات", content: "تُستخدم البيانات لتوليد درجة العافية، التوصيات الصحية المخصصة، والتقارير المجمعة للإدارة. لا تُستخدم البيانات لأي غرض آخر دون موافقة صريحة." },
                { title: "مشاركة البيانات", content: "لا تتم مشاركة البيانات الفردية مع أطراف ثالثة. الإدارة ترى فقط إحصائيات مجمعة. يمكن مشاركة بيانات مجمعة غير قابلة للتعريف مع باحثين معتمدين." },
                { title: "الاحتفاظ بالبيانات", content: "تُحتفظ بالبيانات طوال فترة اشتراك الشركة. بعد انتهاء الاشتراك، تُحذف جميع البيانات خلال 90 يوماً." },
                { title: "حقوق الموظفين", content: "للموظف الحق في الوصول إلى بياناته، تصحيحها، أو طلب حذفها في أي وقت. يمكن التواصل مع فريق الخصوصية لطلب ذلك." },
              ].map((section, i) => (
                <div key={i} className="card-premium p-6">
                  <h3 className="font-bold text-[var(--text-primary)] text-lg mb-2">{section.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{section.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-28 overflow-hidden text-center" dir="rtl" style={{ background: 'var(--vp-gradient-dark)' }}>
          <div className="absolute inset-0 vp-grid-bg opacity-[0.03]" />
          <div className="container-shade relative z-10">
            <Shield className="h-12 w-12 text-[var(--vp-accent)] mx-auto mb-4" />
            <h2 className="vp-hero text-white mb-6">الأمان مسؤوليتنا الأولى</h2>
            <p className="vp-subtitle text-white/70 max-w-2xl mx-auto mb-10">نواصل تطوير معايير الأمان والخصوصية لضمان أن بياناتك دائماً في المكان الآمن</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn-premium !bg-white !text-[var(--vp-ink)]">تواصل مع فريق الخصوصية</Link>
              <Link href="/privacy" className="btn-ghost !border-white/20 !text-white hover:!bg-white/5">سياسة الخصوصية الكاملة</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
