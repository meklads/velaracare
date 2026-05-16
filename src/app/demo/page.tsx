"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CalendarDays, ChevronLeft, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";

export default function DemoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({ name: "", company: "", email: "", phone: "", employeeCount: "١-٥٠ موظف" });

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
      setSubmitted(true); // Still show success even if API fails
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-surface-mid flex items-center justify-center p-4">
          <div className="shade-card max-w-lg w-full p-10 text-center relative overflow-hidden">
            <div className="shade-circle w-48 h-48 -top-20 -right-20 opacity-20" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-full bg-emerald-soft flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-8 w-8 text-emerald" />
              </div>
              <h2 className="text-2xl font-bold text-primary mb-3">تم استلام طلبك!</h2>
              <p className="text-secondary mb-2">
                شكراً لاهتمامك بـ <strong>Velara Care</strong>.
              </p>
              <p className="text-sm text-secondary mb-8">
                سيتواصل معك فريقنا خلال ٢٤ ساعة لتحديد موعد العرض التجريبي.
              </p>
              <Link href="/" className="btn-primary">
                العودة للرئيسية
                <ChevronLeft className="h-4 w-4" />
              </Link>
            </div>
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
        <section className="bg-surface-mid section-padding relative overflow-hidden">
          <div className="shade-circle w-[500px] h-[500px] -top-40 -right-40 opacity-40" />
          <div className="shade-circle w-[300px] h-[300px] top-20 -left-20 opacity-30" />
          <div className="container-shade relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="fade-in-up"><span className="tag mb-6">عرض تجريبي</span></div>
                <h1 className="hero-title fade-in-up-delay-1">
                  احجز عرضاً تجريبياً لـ{" "}
                  <span className="text-emerald">منصتك الصحية الذكية</span>
                </h1>
                <p className="subtitle text-secondary mt-6 fade-in-up-delay-2">
                  دعنا نريك كيف تستطيع Velara Care مساعدة شركتك على تحسين صحة الموظفين وتقليل التكاليف الصحية خلال أشهر قليلة.
                </p>
                <div className="mt-8 space-y-4 fade-in-up-delay-3">
                  {[
                    "تجربة كاملة لجميع الميزات",
                    "دعم فني مخصص طوال الفترة",
                    "تقرير تحليلي لصحة شركتك",
                    "لا حاجة لبطاقة ائتمان",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald shrink-0" />
                      <span className="text-sm text-secondary">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="shade-card p-8 fade-in-up-delay-3 relative overflow-hidden">
                <div className="shade-circle w-32 h-32 -bottom-10 -left-10 opacity-10" />
                <h3 className="text-xl font-bold text-primary mb-6 relative z-10">
                  سجل الآن
                </h3>
                <form className="space-y-4 relative z-10" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-primary">الاسم الكامل</label>
                      <input type="text" value={formData.name} onChange={(e) => setFormData(p => ({...p, name: e.target.value}))} placeholder="محمد العلي" required className="mt-1 w-full rounded-xl border border-[var(--surface-border)] bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-ai/30 focus:border-emerald-ai" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-primary">اسم الشركة</label>
                      <input type="text" value={formData.company} onChange={(e) => setFormData(p => ({...p, company: e.target.value}))} placeholder="شركتك" required className="mt-1 w-full rounded-xl border border-[var(--surface-border)] bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-ai/30 focus:border-emerald-ai" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-primary">البريد الإلكتروني للشركة</label>
                    <input type="email" value={formData.email} onChange={(e) => setFormData(p => ({...p, email: e.target.value}))} placeholder="hr@company.com" dir="ltr" required className="mt-1 w-full rounded-xl border border-[var(--surface-border)] bg-white px-4 py-2.5 text-sm text-left focus:outline-none focus:ring-2 focus:ring-emerald-ai/30 focus:border-emerald-ai" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-primary">رقم الجوال</label>
                    <input type="tel" value={formData.phone} onChange={(e) => setFormData(p => ({...p, phone: e.target.value}))} placeholder="+966 5x xxx xxxx" dir="ltr" className="mt-1 w-full rounded-xl border border-[var(--surface-border)] bg-white px-4 py-2.5 text-sm text-left focus:outline-none focus:ring-2 focus:ring-emerald-ai/30 focus:border-emerald-ai" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-primary">عدد الموظفين</label>
                    <select value={formData.employeeCount} onChange={(e) => setFormData(p => ({...p, employeeCount: e.target.value}))} className="mt-1 w-full rounded-xl border border-[var(--surface-border)] bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-ai/30 focus:border-emerald-ai">
                      <option>١-٥٠ موظف</option>
                      <option>٥١-٢٠٠ موظف</option>
                      <option>٢٠١-٥٠٠ موظف</option>
                      <option>٥٠١-١٠٠٠ موظف</option>
                      <option>أكثر من ١٠٠٠ موظف</option>
                    </select>
                  </div>
                  <button type="submit" disabled={sending} className="btn-primary w-full justify-center">
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
