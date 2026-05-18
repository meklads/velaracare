"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CalendarDays, ArrowLeft, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { useState } from "react";

export default function DemoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({ name: "", company: "", email: "", phone: "", employeeCount: "1-50 موظف" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center p-4" dir="rtl">
          <div className="card-premium max-w-lg w-full p-10 text-center" data-vp-animate="scale-in">
            <div className="w-16 h-16 rounded-full bg-[var(--vp-glow-soft)] flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-8 w-8 text-[var(--vp-accent)]" />
            </div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">تم استلام طلبك!</h2>
            <p className="text-[var(--text-secondary)] mb-2">
              شكراً لاهتمامك بـ <strong>Velara Care</strong>.
            </p>
            <p className="text-sm text-[var(--text-secondary)] mb-8">
              سيتواصل معك فريقنا خلال 24 ساعة لتحديد موعد العرض التجريبي.
            </p>
            <Link href="/" className="btn-premium">
              العودة للرئيسية
              <ArrowLeft className="h-4 w-4" />
            </Link>
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
        <section className="relative py-28 overflow-hidden bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)]" dir="rtl">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'var(--vp-gradient-hero)' }} />
          <div className="absolute inset-0 vp-grid-bg opacity-30" />
          <div className="container-shade relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div data-vp-animate="fade-up">
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[var(--vp-glow-soft)] border border-[var(--vp-accent)]/10 text-[var(--vp-accent)] text-sm font-medium mb-6">
                  <span className="vp-breathing-ring inline-block" style={{ width: '6px', height: '6px' }} />
                  عرض تجريبي
                </div>
                <h1 className="vp-hero">
                  احجز عرضاً تجريبياً لـ{' '}
                  <span className="vp-hero-em">منصتك الصحية الذكية</span>
                </h1>
                <p className="vp-subtitle text-[var(--text-secondary)] mt-6">
                  دعنا نريك كيف تستطيع Velara Care مساعدة شركتك على تحسين صحة الموظفين وتقليل التكاليف الصحية خلال أشهر قليلة.
                </p>
                <div className="mt-8 space-y-4">
                  {["تجربة كاملة لجميع الميزات", "دعم فني مخصص طوال الفترة", "تقرير تحليلي لصحة شركتك", "لا حاجة لبطاقة ائتمان"].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-[var(--vp-accent)] shrink-0" />
                      <span className="text-sm text-[var(--text-secondary)]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-premium p-8" data-vp-animate="fade-up" data-vp-delay="2">
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6">سجل الآن</h3>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-[var(--text-primary)]">الاسم الكامل</label>
                      <input type="text" value={formData.name} onChange={(e) => setFormData(p => ({...p, name: e.target.value}))} placeholder="محمد العلي" required className="shade-input mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[var(--text-primary)]">اسم الشركة</label>
                      <input type="text" value={formData.company} onChange={(e) => setFormData(p => ({...p, company: e.target.value}))} placeholder="شركتك" required className="shade-input mt-1" />
                    </div>
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
                    <label className="text-sm font-medium text-[var(--text-primary)]">عدد الموظفين</label>
                    <select value={formData.employeeCount} onChange={(e) => setFormData(p => ({...p, employeeCount: e.target.value}))} className="shade-input mt-1">
                      <option>1-50 موظف</option>
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
        </section>
      </main>
      <Footer />
    </>
  );
}
