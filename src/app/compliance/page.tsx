"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Shield, Lock, Server, Eye, UserCheck, FileText, ArrowLeft, Sparkles } from "lucide-react";
import { initScrollAnimations } from "@/lib/scroll-animations";

const standards = [
  { icon: Shield, title: "توافق مع الأنظمة السعودية (SDAIA)", desc: "نبني المنصة وفق متطلبات نظام حماية البيانات الشخصية الصادر عن الهيئة السعودية للبيانات والذكاء الاصطناعي." },
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
        {/* HERO */}
        <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)]" dir="rtl">
          <div className="absolute inset-0 vp-grid-bg opacity-[0.03]" />
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[var(--accent)]/8 to-transparent blur-3xl pointer-events-none" />
          <div className="container-shade relative z-10 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent-soft)] border border-[var(--accent)]/10 text-[var(--accent)] text-xs font-semibold mb-6" data-vp-animate="fade-up">
              <Sparkles className="h-3.5 w-3.5" />
              الامتثال والخصوصية
            </span>
            <h1 className="vp-hero max-w-4xl mx-auto" data-vp-animate="fade-up" data-vp-delay="1">
              بياناتك الصحية <span className="vp-hero-em">في أيدٍ أمينة</span>
            </h1>
            <p className="vp-subtitle max-w-2xl mx-auto mt-6" data-vp-animate="fade-up" data-vp-delay="2">
              Velara Care ملتزمة بأعلى معايير الأمان والخصوصية المحلية والعالمية لحماية بيانات الموظفين الصحية
            </p>
          </div>
        </section>

        {/* STANDARDS */}
        <section className="py-24 bg-[var(--bg-secondary)] relative overflow-hidden" dir="rtl">
          <div className="absolute inset-0 vp-data-dots pointer-events-none" />
          <div className="container-shade relative z-10">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {standards.map((s, i) => (
                <div key={s.title} className="card-premium p-6 sm:p-8 group hover:shadow-xl" data-vp-animate="fade-up" data-vp-delay={String((i % 4) + 1)}>
                  <div className="w-14 h-14 rounded-2xl bg-[var(--accent-soft)] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <s.icon className="h-7 w-7 text-[var(--accent)]" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">{s.title}</h3>
                  <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* IMAGE */}
        <section className="relative py-16 bg-[var(--bg-primary)]" dir="rtl">
          <div className="container-shade">
            <div className="max-w-4xl mx-auto relative" data-vp-animate="scale-in">
              <div className="absolute -inset-6 bg-gradient-to-r from-[var(--accent)]/10 via-[var(--accent)]/5 to-transparent rounded-3xl blur-3xl" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[var(--border-primary)]">
                <Image src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1000&h=500&fit=crop&auto=format" alt="Compliance Documents" width={1000} height={500} className="w-full h-auto object-cover" />
              </div>
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" />
            </div>
          </div>
        </section>

        {/* PRIVACY POLICY */}
        <section className="py-24 bg-[var(--bg-secondary)] relative overflow-hidden" dir="rtl">
          <div className="absolute inset-0 vp-grid-bg opacity-[0.03]" />
          <div className="container-shade max-w-4xl mx-auto relative z-10">
            <div className="text-center mb-14" data-vp-animate="fade-up">
              <span className="vp-label">سياسة الخصوصية</span>
              <h2 className="vp-section-title mt-4">سياسة الخصوصية</h2>
              <div className="w-16 h-1 rounded-full bg-gradient-to-l from-[var(--accent)] to-[var(--accent-light)] mx-auto mt-4" />
            </div>
            <div className="space-y-5" data-vp-animate="fade-up" data-vp-delay="2">
              {[
                { title: "البيانات التي نجمعها", content: "نجمع فقط البيانات الصحية التي يقدمها الموظف طواعية من خلال التقييم الصحي (HRA)، بالإضافة إلى البيانات الأساسية مثل الاسم والبريد الإلكتروني والقسم." },
                { title: "كيف نستخدم البيانات", content: "تُستخدم البيانات لتوليد درجة العافية، التوصيات الصحية المخصصة، والتقارير المجمعة للإدارة. لا تُستخدم البيانات لأي غرض آخر دون موافقة صريحة." },
                { title: "مشاركة البيانات", content: "لا تتم مشاركة البيانات الفردية مع أطراف ثالثة. الإدارة ترى فقط إحصائيات مجمعة. يمكن مشاركة بيانات مجمعة غير قابلة للتعريف مع باحثين معتمدين." },
                { title: "الاحتفاظ بالبيانات", content: "تُحتفظ بالبيانات طوال فترة اشتراك الشركة. بعد انتهاء الاشتراك، تُحذف جميع البيانات خلال 90 يوماً." },
                { title: "حقوق الموظفين", content: "للموظف الحق في الوصول إلى بياناته، تصحيحها، أو طلب حذفها في أي وقت. يمكن التواصل مع فريق الخصوصية لطلب ذلك." },
              ].map((section, i) => (
                <div key={i} className="card-premium p-6 group hover:shadow-md">
                  <h3 className="font-bold text-[var(--text-primary)] text-lg mb-2">{section.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{section.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-28 overflow-hidden text-center" dir="rtl" style={{ background: 'linear-gradient(135deg, var(--vp-ink) 0%, #0D4F4F 100%)' }}>
          <div className="absolute inset-0 vp-grid-bg opacity-[0.03]" />
          <div className="absolute top-1/2 left-1/3 w-72 h-72 rounded-full bg-[var(--accent)]/10 blur-3xl" />
          <div className="container-shade relative z-10">
            <div className="mx-auto max-w-2xl" data-vp-animate="slide-up">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-semibold mb-6">
                <Sparkles className="h-3.5 w-3.5" />
                حماية بياناتك
              </span>
              <Shield className="h-12 w-12 text-[var(--accent)] mx-auto mb-4" />
              <h2 className="vp-hero text-white mb-6">الأمان مسؤوليتنا الأولى</h2>
              <p className="vp-subtitle text-white/70 max-w-2xl mx-auto mb-10">نواصل تطوير معايير الأمان والخصوصية لضمان أن بياناتك دائماً في المكان الآمن</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact" className="btn-premium !bg-white !text-[var(--vp-ink)]">تواصل مع فريق الخصوصية</Link>
                <Link href="/privacy" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white/80 font-semibold text-sm hover:bg-white/5 hover:border-white/30 transition-all">سياسة الخصوصية الكاملة</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
