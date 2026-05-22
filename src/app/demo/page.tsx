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
        <section className="relative pt-32 pb-24 overflow-hidden" dir="rtl">
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent-soft)] via-transparent to-transparent opacity-60" />
          <div className="absolute inset-0 vp-grid-bg opacity-[0.03]" />
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[var(--accent)]/8 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-[var(--accent)]/5 to-transparent blur-3xl pointer-events-none" />
          <div className="container-shade relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Content */}
              <div data-vp-animate="fade-up">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent-soft)] border border-[var(--accent)]/10 text-[var(--accent)] text-xs font-semibold mb-6">
                  <Building2 className="h-3.5 w-3.5" />
                  عرض تجريبي للمؤسسات
                </span>
                <h1 className="vp-hero">احصل على عرض تجريبي مخصص <span className="vp-hero-em">لمؤسستك</span></h1>
                <p className="vp-subtitle mt-6">في هذا العرض التجريبي، سنريك كيف تستطيع Velara Care مساعدة شركتك على بناء برنامج عافية متكامل، رفع مشاركة الموظفين، وقياس أثر العافية على الإنتاجية والاحتفاظ.</p>
                <div className="mt-8 space-y-4">
                  {[
                    { icon: BarChart3, text: "عرض حي للوحة قيادة العافية ومؤشرات المشاركة" },
                    { icon: TrendingDown, text: "تحليل أولي مجاني لمستوى عافية القوى العاملة وفرص التحسين" },
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
                <div className="mt-6 p-4 rounded-xl bg-[var(--accent-soft)] border border-[var(--accent)]/10">
                  <p className="text-xs text-[var(--text-muted)]">العرض التجريبي مجاني وبدون التزام. لا حاجة لبطاقة ائتمان. مدة العرض 30 دقيقة يناسب مدراء الموارد البشرية وصناع القرار.</p>
                </div>
              </div>

              {/* Image + Form */}
              <div className="space-y-6" data-vp-animate="fade-up" data-vp-delay="2">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[var(--border-primary)]">
                  <Image src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=700&h=400&fit=crop&auto=format" alt="Enterprise Demo" width={700} height={400} className="w-full h-auto object-cover" />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" />
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
