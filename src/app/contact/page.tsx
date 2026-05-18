"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Mail, Phone, MapPin, MessageSquare, ArrowLeft, Clock, Send, ChevronLeft } from "lucide-react";
import { initScrollAnimations } from "@/lib/scroll-animations";

export default function ContactPage() {
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
              تواصل معنا
            </div>
            <h1 className="vp-hero" data-vp-animate="fade-up" data-vp-delay="1">
              نحن هنا <span className="vp-hero-em">لنساعدك</span>
            </h1>
            <p className="vp-subtitle text-[var(--text-secondary)] max-w-2xl mx-auto mt-6" data-vp-animate="fade-up" data-vp-delay="2">
              فريق Velara Care جاهز للإجابة على استفساراتك وتقديم عرض توضيحي للمنصة
            </p>
          </div>
        </section>

        <section className="section-padding relative overflow-hidden" dir="rtl">
          <div className="absolute inset-0 vp-grid-bg opacity-20" />
          <div className="container-shade relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {/* Contact Info */}
              <div className="space-y-8" data-vp-animate="fade-up">
                <div>
                  <span className="vp-label">معلومات التواصل</span>
                  <h2 className="vp-section-title mt-2">تواصل معنا</h2>
                  <div className="w-16 h-1 rounded-full bg-gradient-to-l from-[var(--vp-accent)] to-[var(--vp-cyan)] mt-3" />
                </div>

                <div className="space-y-5">
                  {[
                    { icon: Mail, label: "البريد الإلكتروني", value: "hello@velaracare.co", href: "mailto:hello@velaracare.co" },
                    { icon: Phone, label: "الهاتف", value: "+966 55 123 4567", href: "tel:+966551234567" },
                    { icon: MapPin, label: "المقر", value: "الرياض، المملكة العربية السعودية", href: null },
                    { icon: Clock, label: "ساعات العمل", value: "الأحد – الخميس 9:00 ص – 6:00 م", href: null },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-[var(--vp-glow-soft)] flex items-center justify-center shrink-0">
                        <item.icon className="h-5 w-5 text-[var(--vp-accent)]" />
                      </div>
                      <div>
                        <p className="text-sm text-[var(--text-secondary)]">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="text-base font-semibold text-[var(--text-primary)] hover:text-[var(--vp-accent)] transition-colors">{item.value}</a>
                        ) : (
                          <p className="text-base font-semibold text-[var(--text-primary)]">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="card-premium p-6">
                  <h3 className="font-bold text-[var(--text-primary)] mb-3">تابعنا على</h3>
                  <div className="flex items-center gap-3">
                    {["تويتر", "لينكد إن", "إنستغرام"].map((social) => (
                      <a key={social} href="#"
                        className="text-sm py-2 px-4 rounded-xl bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--vp-accent)] hover:border-[var(--vp-accent)]/30 border border-[var(--border-primary)] transition-all">
                        {social}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="card-premium p-8" data-vp-animate="fade-up" data-vp-delay="2">
                <h2 className="vp-section-title text-2xl mb-2">أرسل لنا رسالة</h2>
                <p className="text-sm text-[var(--text-secondary)] mb-6">سنتواصل معك في أقرب وقت ممكن</p>
                <form action="/api/demo" method="POST" className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-[var(--text-primary)]">الاسم الكامل</label>
                      <input type="text" name="name" required placeholder="محمد العلي"
                        className="shade-input" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-[var(--text-primary)]">الشركة</label>
                      <input type="text" name="company" placeholder="شركتك"
                        className="shade-input" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[var(--text-primary)]">البريد الإلكتروني</label>
                    <input type="email" name="email" required placeholder="email@company.com" dir="ltr"
                      className="shade-input text-left" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[var(--text-primary)]">رقم الجوال</label>
                    <input type="tel" name="phone" placeholder="+966 55 123 4567" dir="ltr"
                      className="shade-input text-left" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[var(--text-primary)]">الرسالة</label>
                    <textarea name="message" rows={4} required placeholder="كيف يمكننا مساعدتك؟"
                      className="shade-input resize-none" />
                  </div>
                  <button type="submit" className="btn-premium w-full justify-center text-sm py-3">
                    <Send className="ml-2 h-4 w-4" />
                    إرسال الرسالة
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding relative overflow-hidden" dir="rtl" style={{ background: 'var(--vp-gradient-card)' }}>
          <div className="container-shade max-w-3xl mx-auto">
            <div className="text-center mb-10" data-vp-animate="fade-up">
              <span className="vp-label">الأسئلة الشائعة</span>
              <h2 className="vp-section-title mt-4">إجابات لأسئلتك</h2>
              <div className="w-16 h-1 rounded-full bg-gradient-to-l from-[var(--vp-accent)] to-[var(--vp-cyan)] mx-auto mt-4" />
            </div>
            <div className="space-y-4" data-vp-animate="fade-up" data-vp-delay="2">
              {[
                { q: "ما هي تكلفة الاشتراك في Velara Care؟", a: "تبدأ الخطط من 35 ريالاً لكل موظف شهرياً. نوفر أيضاً خصومات للشركات الكبرى." },
                { q: "هل بيانات الموظفين الصحية آمنة؟", a: "نعم، جميع البيانات مشفرة ومحمية وفق أعلى معايير الأمان. لا يتم مشاركة أي بيانات فردية مع أطراف ثالثة." },
                { q: "كم من الوقت يستغرق إعداد المنصة؟", a: "يمكن إعداد الحساب وتفعيله خلال دقائق. دعوة الموظفين وإجراء التقييم الصحي لا يستغرق أكثر من أسبوع." },
              ].map((faq, i) => (
                <details key={i} className="card-premium p-5 group">
                  <summary className="cursor-pointer text-sm font-semibold text-[var(--text-primary)] select-none flex items-center justify-between">
                    {faq.q}
                    <ArrowLeft className="h-4 w-4 text-[var(--text-secondary)] group-open:-rotate-90 transition-transform shrink-0" />
                  </summary>
                  <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/help" className="text-sm text-[var(--vp-accent)] hover:underline font-medium">
                عرض جميع الأسئلة ←
              </Link>
            </div>
          </div>
        </section>

        <section className="relative py-28 overflow-hidden text-center" dir="rtl" style={{ background: 'var(--vp-gradient-dark)' }}>
          <div className="absolute inset-0 vp-grid-bg opacity-[0.03]" />
          <div className="absolute top-1/2 left-1/4 w-72 h-72 rounded-full bg-[var(--vp-accent)]/5 blur-3xl" />
          <div className="container-shade relative z-10" data-vp-animate="slide-up">
            <h2 className="vp-hero text-white mb-6">جاهز لتحويل صحة موظفيك؟</h2>
            <p className="vp-subtitle text-white/70 max-w-2xl mx-auto mb-10">احجز عرضاً تجريبياً مجاناً واكتشف كيف يمكن لـ Velara Care أن تخفض تكاليف الرعاية الصحية</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/demo" className="btn-premium !bg-white !text-[var(--vp-ink)]">احجز عرضاً تجريبياً</Link>
              <Link href="/pricing" className="btn-ghost !border-white/20 !text-white hover:!bg-white/5">شاهد الأسعار</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
