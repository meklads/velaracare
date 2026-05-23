"use client";

import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CalendarDays, ArrowLeft, CheckCircle2, Loader2, Building2, TrendingDown, BarChart3, Users, Gift, Sparkles } from "lucide-react";
import { useState } from "react";

export default function DemoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    name: "", company: "", email: "", phone: "", employeeCount: "51-200 موظف", role: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("/api/demo", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      if (res.ok) setSubmitted(true);
    } catch { setSubmitted(true); }
    finally { setSending(false); }
  }

  if (submitted) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center p-4" dir="rtl">
          <div className="card-premium max-w-lg w-full p-10 text-center" data-vp-animate="scale-in">
            <div className="w-16 h-16 rounded-full bg-[var(--accent-soft)] flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-8 w-8 text-[var(--accent)]" />
            </div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">تم استلام طلبك!</h2>
            <p className="text-[var(--text-secondary)] mb-2">شكراً لاهتمامك بـ <strong>Velara Care</strong>.</p>
            <p className="text-sm text-[var(--text-secondary)] mb-8">سيتواصل معك فريق المبيعات خلال 24 ساعة لتحديد موعد العرض التجريبي المخصص لمؤسستك.</p>
            <Link href="/" className="btn-premium">العودة للرئيسية <ArrowLeft className="h-4 w-4" /></Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        <section className="relative pt-32 pb-20 overflow-hidden" dir="rtl">
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent-soft)] via-transparent to-transparent opacity-60" />
          <div className="absolute inset-0 vp-grid-bg opacity-[0.03]" />
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[var(--accent)]/8 via-[var(--accent)]/3 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute bottom-[-15%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[var(--accent)]/5 to-transparent blur-3xl pointer-events-none" />
          <svg width="0" height="0" className="absolute"><defs><clipPath id="circleFrame" clipPathUnits="objectBoundingBox"><circle cx="0.5" cy="0.5" r="0.5" /></clipPath></defs></svg>
          <div className="container-shade relative z-10">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* Content */}
              <div data-vp-animate="fade-up" className="lg:pl-8">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent-soft)] border border-[var(--accent)]/10 text-[var(--accent)] text-xs font-semibold mb-5">
                  <Building2 className="h-3.5 w-3.5" />
                  عرض تجريبي للمؤسسات
                </span>
                <h1 className="vp-hero mt-5">احصل على عرض تجريبي مخصص <span className="vp-hero-em">لمؤسستك</span></h1>
                <p className="text-sm lg:text-base text-[var(--text-secondary)] mt-6 leading-relaxed max-w-lg">في هذا العرض التجريبي، سنريك كيف تستطيع Velara Care مساعدة شركتك على بناء برنامج عافية متكامل، رفع مشاركة الموظفين، وقياس أثر العافية على الإنتاجية والاحتفاظ.</p>
                <div className="mt-8 space-y-3">
                  {[
                    { icon: BarChart3, text: "عرض حي للوحة قيادة العافية ومؤشرات المشاركة" },
                    { icon: TrendingDown, text: "تحليل أولي مجاني لمستوى عافية القوى العاملة" },
                    { icon: Users, text: "محاكاة لتجربة الموظف — مسح، توصيات، برامج" },
                    { icon: Gift, text: "خطة نشر مخصصة حسب حجم مؤسستك واحتياجاتها" },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-3 group">
                      <div className="w-9 h-9 rounded-lg bg-[var(--accent-soft)] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <item.icon className="h-4 w-4 text-[var(--accent)]" />
                      </div>
                      <span className="text-sm text-[var(--text-secondary)]">{item.text}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 p-4 rounded-xl bg-[var(--accent-soft)] border border-[var(--accent)]/10">
                  <p className="text-xs text-[var(--text-muted)]">العرض التجريبي مجاني وبدون التزام. لا حاجة لبطاقة ائتمان. مدة العرض 30 دقيقة.</p>
                </div>
              </div>

              {/* Image circle + Form */}
              <div data-vp-animate="scale-in" data-vp-delay="2">
                <div className="relative flex items-center justify-center mb-6">
                  <div className="absolute w-[320px] h-[320px] lg:w-[400px] lg:h-[400px] rounded-full bg-gradient-to-br from-[var(--accent)]/12 via-[var(--accent)]/3 to-transparent blur-[80px] pointer-events-none" />
                  <div className="absolute w-[240px] h-[240px] lg:w-[300px] lg:h-[300px] rounded-full bg-gradient-to-tr from-[var(--accent)]/8 to-transparent blur-[60px] pointer-events-none translate-y-6" />
                  <div className="relative w-[220px] h-[220px] lg:w-[300px] lg:h-[300px]">
                    <div className="absolute -inset-[5px] lg:-inset-[7px] rounded-full bg-gradient-to-br from-[var(--accent)] via-[var(--accent-light)]/50 to-[var(--accent-dark)] shadow-2xl shadow-[var(--accent)]/20" />
                    <div className="absolute -inset-[1.5px] lg:-inset-[2.5px] rounded-full bg-[var(--bg-primary)]" />
                    <div className="relative w-full h-full rounded-full overflow-hidden">
                      <div className="w-full h-full" style={{ clipPath: 'url(#circleFrame)' }}>
                        <Image src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&h=500&fit=crop&auto=format" alt="Enterprise Demo" width={500} height={500} className="w-full h-full object-cover scale-105" priority />
                      </div>
                      <div className="absolute inset-0 rounded-full pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, transparent 35%, transparent 65%, rgba(0,0,0,0.12) 100%)' }} />
                    </div>
                    <div className="absolute -top-2 -right-1 lg:-top-3 lg:-right-2 w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-[var(--bg-card)] border border-[var(--accent)]/20 flex items-center justify-center shadow-lg backdrop-blur-sm rotate-12 hover:rotate-0 hover:scale-110 transition-all duration-500 z-10">
                      <CalendarDays className="h-4 w-4 lg:h-5 lg:w-5 text-[var(--accent)]" />
                    </div>
                    <div className="absolute -bottom-2 -left-1 lg:-bottom-3 lg:-left-2 w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] flex items-center justify-center shadow-lg backdrop-blur-sm -rotate-12 hover:rotate-0 hover:scale-110 transition-all duration-500 z-10">
                      <Sparkles className="h-4 w-4 lg:h-5 lg:w-5 text-amber-400" />
                    </div>
                  </div>
                </div>
                <div className="card-premium p-8">
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1">طلب عرض تجريبي</h3>
                  <p className="text-sm text-[var(--text-secondary)] mb-6">املأ النموذج وسنعود إليك خلال 24 ساعة</p>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-[var(--text-primary)]">الاسم الكامل</label>
                        <input type="text" value={formData.name} onChange={(e) => setFormData(p => ({...p, name: e.target.value}))} placeholder="محمد العلي" required className="shade-input mt-1" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-[var(--text-primary)]">المسمى الوظيفي</label>
                        <input type="text" value={formData.role} onChange={(e) => setFormData(p => ({...p, role: e.target.value}))} placeholder="مدير الموارد البشرية" className="shade-input mt-1" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[var(--text-primary)]">اسم الشركة</label>
                      <input type="text" value={formData.company} onChange={(e) => setFormData(p => ({...p, company: e.target.value}))} placeholder="اسم شركتك" required className="shade-input mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[var(--text-primary)]">البريد الإلكتروني للشركة</label>
                      <input type="email" value={formData.email} onChange={(e) => setFormData(p => ({...p, email: e.target.value}))} placeholder="hr@company.com" dir="ltr" required className="shade-input mt-1 text-left" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[var(--text-primary)]">رقم الجوال</label>
                      <input type="tel" value={formData.phone} onChange={(e) => setFormData(p => ({...p, phone: e.target.value}))} placeholder="+966 5x xxx xxxx" dir="ltr" className="shade-input mt-1 text-left" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[var(--text-primary)]">حجم القوى العاملة</label>
                      <select value={formData.employeeCount} onChange={(e) => setFormData(p => ({...p, employeeCount: e.target.value}))} className="shade-input mt-1">
                        <option>أقل من 50 موظف</option>
                        <option>51-200 موظف</option>
                        <option>201-500 موظف</option>
                        <option>501-1000 موظف</option>
                        <option>أكثر من 1000 موظف</option>
                      </select>
                    </div>
                    <button type="submit" disabled={sending} className="btn-premium w-full justify-center">
                      {sending ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : <CalendarDays className="ml-2 h-4 w-4" />}
                      {sending ? "جاري الإرسال..." : "احجز العرض التجريبي"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
