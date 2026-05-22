"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Shield, Lock, Cpu, Database, Eye, FileText, Server, CheckCircle2,
  ArrowLeft, Users, Key, Fingerprint, Search, Download, Layers, Network, Sparkles
} from "lucide-react";
import { initScrollAnimations } from "@/lib/scroll-animations";

const trustPillars = [
  { icon: Lock, title: "تشفير شامل للبيانات", desc: "جميع البيانات الصحية مشفرة باستخدام AES-256 في حالة السكون (at rest) و TLS 1.3 أثناء النقل (in transit). لا يمكن الوصول للبيانات إلا من قبل المخولين.", details: ["AES-256 تشفير", "TLS 1.3 للنقل", "مفاتيح تشفير منفصلة", "دعم HSM للأجهزة"] },
  { icon: Eye, title: "إخفاء الهوية (Data Anonymization)", desc: "يتم فصل البيانات الشخصية عن البيانات الصحية بشكل تام. النظام يفصل الهوية عن النتائج الصحية — لا يمكن ربط أي نتيجة صحية بموظف محدد بدون صلاحية إدارية.", details: ["فصل كامل للبيانات", "إخفاء الهوية تلقائياً", "بيانات غير معرفة", "صلاحيات صارمة للربط"] },
  { icon: Cpu, title: "الذكاء الاصطناعي القابل للتفسير (Explainable AI)", desc: "كل قرار يصدره النظام مدعوم بتقرير شفاف يوضح العوامل المؤثرة، درجة الثقة، والمصادر. لا يوجد صندوق أسود — كل تنبؤ مفسر بالكامل.", details: ["تفسير كل قرار", "عوامل مؤثرة موضحة", "درجة ثقة لكل تنبؤ", "سجل قرارات AI"] },
  { icon: Database, title: "الامتثال للأنظمة السعودية (PDPL & SDAIA)", desc: "مصمم للتوافق مع نظام حماية البيانات الشخصية السعودي (PDPL) ومتطلبات الهيئة السعودية للبيانات والذكاء الاصطناعي (SDAIA). تقارير جاهزة للمراجعة.", details: ["امتثال PDPL كامل", "متطلبات SDAIA", "تقارير جاهزة للتدقيق", "تحديث مستمر للأنظمة"] },
  { icon: Users, title: "الموافقة المستنيرة (Informed Consent)", desc: "الموظف يتحكم ببياناته بالكامل. موافقة صريحة مطلوبة لكل مرحلة — مع إمكانية سحب الموافقة في أي وقت. واجهة شفافة لإدارة الصلاحيات.", details: ["موافقة صريحة لكل مرحلة", "إمكانية سحب الموافقة", "إدارة الصلاحيات", "سجل الموافقات"] },
  { icon: FileText, title: "سجل التدقيق (Audit Log)", desc: "كل عملية وصول أو تعديل للبيانات مسجلة بتوقيع زمني كامل. سجل تدقيق غير قابل للتعديل يوفر شفافية كاملة للمسؤولين والجهات الرقابية.", details: ["تسجيل كل عملية", "توقيع زمني", "سجل غير قابل للتعديل", "جاهز للجهات الرقابية"] },
];

const securityLayers = [
  { icon: Fingerprint, title: "المصادقة متعددة العوامل (MFA)", desc: "دعم كامل للمصادقة متعددة العوامل بحسابات الشركة" },
  { icon: Users, title: "صلاحيات قائمة على الأدوار (RBAC)", desc: "كل مستخدم يرى فقط ما يحتاجه حسب دوره وصلاحياته" },
  { icon: Key, title: "إدارة المفاتيح (Key Management)", desc: "مفاتيح تشفير منفصلة لكل شركة مع تدوير دوري" },
  { icon: Search, title: "مراقبة أمنية 24/7", desc: "نظام كشف ومنع الاختراق مع مراقبة مستمرة للتهديدات" },
  { icon: Network, title: "عزل الشبكة (Network Isolation)", desc: "بيئة سحابية معزولة مع جدران نارية مخصصة" },
  { icon: Shield, title: "نسخ احتياطي واسترداد", desc: "نسخ احتياطي مشفر يومي مع خطة استرداد معتمدة" },
];

export default function AITrustPage() {
  useEffect(() => { const c = initScrollAnimations(); return () => c(); }, []);

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)]" dir="rtl">
          <div className="absolute inset-0 vp-grid-bg opacity-[0.03]" />
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[var(--accent)]/8 to-transparent blur-3xl pointer-events-none" />
          <div className="container-shade relative z-10 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent-soft)] border border-[var(--accent)]/10 text-[var(--accent)] text-xs font-semibold mb-6" data-vp-animate="fade-up">
              <Sparkles className="h-3.5 w-3.5" />
              الثقة والأمان
            </span>
            <h1 className="vp-hero max-w-4xl mx-auto" data-vp-animate="fade-up" data-vp-delay="1">
              ذكاء اصطناعي صحي
              <br />
              <span className="vp-hero-em">آمن وشفاف</span>
            </h1>
            <p className="vp-subtitle max-w-2xl mx-auto mt-6" data-vp-animate="fade-up" data-vp-delay="2">
              في Velara Care، نتعامل مع البيانات الصحية بأعلى معايير الأمان والخصوصية. منصتنا مصممة للامتثال للأنظمة السعودية والعالمية مع شفافية كاملة في قرارات الذكاء الاصطناعي.
            </p>
          </div>
        </section>

        {/* Trust Pillars */}
        <section className="py-24 bg-[var(--bg-secondary)] relative overflow-hidden" dir="rtl">
          <div className="absolute inset-0 vp-data-dots pointer-events-none" />
          <div className="container-shade relative z-10">
            <div className="mx-auto max-w-3xl text-center mb-14" data-vp-animate="fade-up">
              <span className="vp-label">ركائز الثقة</span>
              <h2 className="vp-section-title mt-4">ستة أبعاد لضمان <span className="vp-hero-em">الأمان والخصوصية</span></h2>
              <div className="w-16 h-1 rounded-full bg-gradient-to-l from-[var(--accent)] to-[var(--accent-light)] mx-auto mt-4" />
            </div>
            <div className="space-y-5">
              {trustPillars.map((pillar, i) => (
                <div key={pillar.title} className="card-premium p-6 lg:p-8" data-vp-animate="fade-up" data-vp-delay={String(Math.min(i + 1, 4))}>
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex items-start gap-4 lg:w-80 shrink-0">
                      <div className="w-14 h-14 rounded-2xl bg-[var(--accent-soft)] flex items-center justify-center shrink-0">
                        <pillar.icon className="h-7 w-7 text-[var(--accent)]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[var(--text-primary)]">{pillar.title}</h3>
                        <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">{pillar.desc}</p>
                      </div>
                    </div>
                    <div className="flex-1 grid sm:grid-cols-2 gap-3">
                      {pillar.details.map((detail) => (
                        <div key={detail} className="flex items-center gap-2 p-3 rounded-xl bg-[var(--accent-soft)]">
                          <CheckCircle2 className="h-4 w-4 text-[var(--accent)] shrink-0" />
                          <span className="text-sm text-[var(--text-secondary)]">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
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
                <Image src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1000&h=500&fit=crop&auto=format" alt="AI Security Technology" width={1000} height={500} className="w-full h-auto object-cover" />
              </div>
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" />
            </div>
          </div>
        </section>

        {/* Security Architecture */}
        <section className="py-24 bg-[var(--bg-secondary)] relative overflow-hidden" dir="rtl">
          <div className="absolute inset-0 vp-grid-bg opacity-[0.03]" />
          <div className="container-shade">
            <div className="mx-auto max-w-3xl text-center mb-14" data-vp-animate="fade-up">
              <span className="vp-label">البنية الأمنية</span>
              <h2 className="vp-section-title mt-4">أمان متعدد <span className="vp-hero-em">المستويات</span></h2>
              <div className="w-16 h-1 rounded-full bg-gradient-to-l from-[var(--accent)] to-[var(--accent-light)] mx-auto mt-4" />
              <p className="vp-subtitle mt-4">بنية أمنية متكاملة تغطي جميع طبقات المنصة</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-vp-animate="fade-up" data-vp-delay="2">
              {securityLayers.map((item) => (
                <div key={item.title} className="card-premium p-5 group hover:shadow-md">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-[var(--accent-soft)] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <item.icon className="h-4 w-4 text-[var(--accent)]" />
                    </div>
                    <h3 className="text-sm font-bold text-[var(--text-primary)]">{item.title}</h3>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Governance */}
        <section className="py-24 bg-[var(--bg-primary)] relative overflow-hidden" dir="rtl">
          <div className="absolute inset-0 vp-grid-bg opacity-[0.02]" />
          <div className="container-shade relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div data-vp-animate="fade-up">
                <span className="vp-label">الحوكمة</span>
                <h2 className="vp-section-title mt-4">حوكمة صحية رقمية <span className="vp-hero-em">بمعايير عالمية</span></h2>
                <div className="w-16 h-1 rounded-full bg-gradient-to-l from-[var(--accent)] to-[var(--accent-light)] mt-4 mb-6" />
                <p className="text-[var(--text-secondary)] leading-relaxed">إطار حوكمة متكامل يشمل صلاحيات الوصول، التدقيق، وإدارة الموافقات. مصمم للتوافق مع أفضل الممارسات العالمية في حوكمة البيانات الصحية.</p>
                <ul className="mt-6 space-y-3">
                  {["مجلس حوكمة بيانات صحية", "سياسات وإجراءات موثقة", "تدقيق دوري من جهات خارجية", "خطة استجابة للحوادث الأمنية", "توعية وتدريب سنوي للمستخدمين"].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <CheckCircle2 className="h-4 w-4 text-[var(--accent)] shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card-premium p-8" data-vp-animate="fade-up" data-vp-delay="2">
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">تقنيات الأمان في المنصة</h3>
                <div className="space-y-4">
                  {[
                    { icon: Shield, title: "تشفير AES-256", desc: "تشفير البيانات أثناء التخزين" },
                    { icon: Lock, title: "TLS 1.3", desc: "تشفير البيانات أثناء النقل" },
                    { icon: Shield, title: "RBAC", desc: "صلاحيات وصول دقيقة حسب الدور" },
                    { icon: Shield, title: "2FA", desc: "مصادقة متعددة العوامل" },
                  ].map((cert) => (
                    <div key={cert.title} className="flex items-center gap-3 p-3 rounded-xl bg-[var(--accent-soft)] group hover:bg-[var(--accent-soft)]/80 transition-colors">
                      <cert.icon className="h-5 w-5 text-[var(--accent)] shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-[var(--text-primary)]">{cert.title}</p>
                        <p className="text-xs text-[var(--text-secondary)]">{cert.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-28 overflow-hidden" dir="rtl" style={{ background: 'linear-gradient(135deg, var(--vp-ink) 0%, #0D4F4F 100%)' }}>
          <div className="absolute inset-0 vp-grid-bg opacity-[0.03]" />
          <div className="absolute top-1/2 left-1/3 w-72 h-72 rounded-full bg-[var(--accent)]/10 blur-3xl" />
          <div className="container-shade relative z-10">
            <div className="mx-auto max-w-2xl text-center" data-vp-animate="slide-up">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-semibold mb-6">
                <Sparkles className="h-3.5 w-3.5" />
                الأمان أولاً
              </span>
              <h2 className="vp-hero text-white mb-6">الأمان أولويتنا القصوى</h2>
              <p className="vp-subtitle text-white/70 max-w-xl mx-auto mb-10">لمعرفة المزيد عن سياسات الأمان والامتثال، تواصل مع فريقنا</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/compliance" className="btn-premium !bg-white !text-[var(--vp-ink)] group">
                  سياسة الامتثال
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white/80 font-semibold text-sm hover:bg-white/5 hover:border-white/30 transition-all">
                  تواصل معنا
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
