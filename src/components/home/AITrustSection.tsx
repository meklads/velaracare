"use client";

import { Shield, Lock, Cpu, Database, CheckCircle2, Eye, FileText, Server } from "lucide-react";
import Link from "next/link";

const trustItems = [
  {
    icon: Lock,
    title: "تشفير شامل للبيانات",
    desc: "جميع البيانات الصحية مشفرة باستخدام AES-256 في حالة السكون و TLS 1.3 أثناء النقل.",
  },
  {
    icon: Eye,
    title: "إخفاء الهوية (Anonymization)",
    desc: "يتم فصل البيانات الشخصية عن البيانات الصحية. لا يمكن ربط النتائج بهوية الموظف بدون صلاحية.",
  },
  {
    icon: Cpu,
    title: "AI قابل للتفسير",
    desc: "كل قرار من AI مدعوم بتقرير شفاف يوضح العوامل المؤثرة — لا يوجد صندوق أسود.",
  },
  {
    icon: Database,
    title: "امتثال PDPL",
    desc: "مصمم للتوافق مع نظام حماية البيانات الشخصية السعودي وهيئة الذكاء الاصطناعي SDAIA.",
  },
  {
    icon: Shield,
    title: "حوكمة صحية رقمية",
    desc: "إطار حوكمة متكامل يشمل صلاحيات الوصول، التدقيق، وإدارة الموافقات وفقاً للمعايير العالمية.",
  },
  {
    icon: FileText,
    title: "موافقة مستنيرة (Consent)",
    desc: "الموظف يتحكم ببياناته — موافقة صريحة لكل مرحلة مع إمكانية السحب في أي وقت.",
  },
];

export default function AITrustSection() {
  return (
    <section className="section-padding relative overflow-hidden" dir="rtl">
      <div className="absolute inset-0 vp-grid-bg opacity-20" />
      <div className="container-shade relative z-10">
        <div className="mx-auto max-w-3xl text-center mb-12" data-vp-animate="fade-up">
          <span className="vp-label">الثقة والشفافية</span>
          <h2 className="vp-section-title mt-4">
            ذكاء اصطناعي صحي{' '}
            <span className="vp-hero-em">آمن وشفاف</span>
          </h2>
          <div className="w-16 h-1 rounded-full bg-gradient-to-l from-[var(--vp-accent)] to-[var(--vp-cyan)] mx-auto mt-4" />
          <p className="vp-subtitle mt-4 text-[var(--text-secondary)] max-w-2xl mx-auto">
            نتعامل مع البيانات الصحية بأعلى معايير الأمان والخصوصية. 
            منصة مصممة للامتثال للأنظمة السعودية والعالمية مع شفافية كاملة في قرارات الذكاء الاصطناعي.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-vp-animate="fade-up" data-vp-delay="2">
          {trustItems.map((item) => (
            <div key={item.title} className="card-premium p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--vp-glow-soft)] mb-4">
                <item.icon className="h-6 w-6 text-[var(--vp-accent)]" />
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{item.title}</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center" data-vp-animate="fade-up" data-vp-delay="3">
          <div className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-[var(--vp-glow-soft)] border border-[var(--vp-accent)]/10">
            <CheckCircle2 className="h-5 w-5 text-[var(--vp-accent)] shrink-0" />
            <span className="text-sm text-[var(--text-secondary)]">
              جميع البيانات الصحية تخضع لأعلى معايير الأمان. اقرأ <Link href="/compliance" className="text-[var(--vp-accent)] hover:underline font-medium">سياسة الامتثال والأمان</Link> للمزيد.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
