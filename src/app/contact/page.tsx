"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Mail, Phone, MapPin, MessageSquare, ArrowLeft, Clock, Send, Sparkles } from "lucide-react";
import { initScrollAnimations } from "@/lib/scroll-animations";

export default function ContactPage() {
  useEffect(() => { const c = initScrollAnimations(); return () => c(); }, []);

  return (
    <>
      <Header />
      <main>
        {/* HERO */}
        <section className="relative pt-32 pb-20 overflow-hidden" dir="rtl">
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent-soft)] via-transparent to-transparent opacity-60" />
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[var(--accent)]/8 via-[var(--accent)]/3 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute bottom-[-15%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[var(--accent)]/5 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute inset-0 vp-grid-bg opacity-[0.03]" />
          <svg width="0" height="0" className="absolute"><defs><clipPath id="circleFrame" clipPathUnits="objectBoundingBox"><circle cx="0.5" cy="0.5" r="0.5" /></clipPath></defs></svg>
          <div className="container-shade relative z-10">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div data-vp-animate="fade-up" className="lg:pl-8">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent-soft)] border border-[var(--accent)]/10 text-[var(--accent)] text-xs font-semibold mb-5">
                  <Sparkles className="h-3.5 w-3.5" />
                  تواصل معنا
                </span>
                <h1 className="vp-hero mt-5">
                  نحن هنا <span className="vp-hero-em">لنساعدك</span>
                </h1>
                <p className="text-sm lg:text-base text-[var(--text-secondary)] mt-6 leading-relaxed max-w-lg">
                  فريق Velara Care جاهز للإجابة على استفساراتك وتقديم عرض توضيحي للمنصة.
                </p>
              </div>
              <div className="relative flex items-center justify-center" data-vp-animate="scale-in" data-vp-delay="2">
                <div className="absolute w-[320px] h-[320px] lg:w-[420px] lg:h-[420px] rounded-full bg-gradient-to-br from-[var(--accent)]/12 via-[var(--accent)]/3 to-transparent blur-[80px] pointer-events-none" />
                <div className="absolute w-[240px] h-[240px] lg:w-[320px] lg:h-[320px] rounded-full bg-gradient-to-tr from-[var(--accent)]/8 to-transparent blur-[60px] pointer-events-none translate-y-6" />
                <div className="relative w-[240px] h-[240px] lg:w-[340px] lg:h-[340px]">
                  <div className="absolute -inset-[5px] lg:-inset-[7px] rounded-full bg-gradient-to-br from-[var(--accent)] via-[var(--accent-light)]/50 to-[var(--accent-dark)] shadow-2xl shadow-[var(--accent)]/20" />
                  <div className="absolute -inset-[1.5px] lg:-inset-[2.5px] rounded-full bg-[var(--bg-primary)]" />
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <div className="w-full h-full" style={{ clipPath: 'url(#circleFrame)' }}>
                      <Image src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=500&h=500&fit=crop&auto=format" alt="فريق الدعم" width={500} height={500} className="w-full h-full object-cover scale-105" priority />
                    </div>
                    <div className="absolute inset-0 rounded-full pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, transparent 35%, transparent 65%, rgba(0,0,0,0.12) 100%)' }} />
                  </div>
                  <div className="absolute -top-2 -right-1 lg:-top-3 lg:-right-2 w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-[var(--bg-card)] border border-[var(--accent)]/20 flex items-center justify-center shadow-lg backdrop-blur-sm rotate-12 hover:rotate-0 hover:scale-110 transition-all duration-500 z-10">
                    <MessageSquare className="h-4 w-4 lg:h-5 lg:w-5 text-[var(--accent)]" />
                  </div>
                  <div className="absolute -bottom-2 -left-1 lg:-bottom-3 lg:-left-2 w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] flex items-center justify-center shadow-lg backdrop-blur-sm -rotate-12 hover:rotate-0 hover:scale-110 transition-all duration-500 z-10">
                    <Phone className="h-4 w-4 lg:h-5 lg:w-5 text-emerald-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="py-24 bg-[var(--bg-secondary)] relative overflow-hidden" dir="rtl">
          <div className="absolute inset-0 vp-data-dots pointer-events-none" />
          <div className="container-shade relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {/* Contact Info */}
              <div className="space-y-8" data-vp-animate="fade-up">
                <div>
                  <span className="vp-label">معلومات التواصل</span>
                  <h2 className="vp-section-title mt-2">تواصل معنا</h2>
                  <div className="w-16 h-1 rounded-full bg-gradient-to-l from-[var(--accent)] to-[var(--accent-light)] mt-3" />
                </div>
                <div className="space-y-5">
                  {[
                    { icon: Mail, label: "البريد الإلكتروني", value: "hello@velaracare.co", href: "mailto:hello@velaracare.co" },
                    { icon: Phone, label: "الهاتف", value: "+966 55 123 4567", href: "tel:+966551234567" },
                    { icon: MapPin, label: "المقر", value: "الرياض، المملكة العربية السعودية", href: null },
                    { icon: Clock, label: "ساعات العمل", value: "الأحد – الخميس 9:00 ص – 6:00 م", href: null },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4 group">
                      <div className="w-11 h-11 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <item.icon className="h-5 w-5 text-[var(--accent)]" />
                      </div>
                      <div>
                        <p className="text-sm text-[var(--text-secondary)]">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="text-base font-semibold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors">{item.value}</a>
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
                        className="text-sm py-2 px-4 rounded-xl bg-[var(--accent-soft)] text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)]/30 border border-[var(--border-primary)] transition-all">
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
                      <input type="text" name="name" required placeholder="محمد العلي" className="shade-input" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-[var(--text-primary)]">الشركة</label>
                      <input type="text" name="company" placeholder="شركتك" className="shade-input" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[var(--text-primary)]">البريد الإلكتروني</label>
                    <input type="email" name="email" required placeholder="email@company.com" dir="ltr" className="shade-input text-left" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[var(--text-primary)]">رقم الجوال</label>
                    <input type="tel" name="phone" placeholder="+966 55 123 4567" dir="ltr" className="shade-input text-left" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[var(--text-primary)]">الرسالة</label>
                    <textarea name="message" rows={4} required placeholder="كيف يمكننا مساعدتك؟" className="shade-input resize-none" />
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

        {/* FAQS */}
        <section className="py-24 bg-[var(--bg-primary)] relative overflow-hidden" dir="rtl">
          <div className="absolute inset-0 vp-grid-bg opacity-[0.03]" />
          <div className="container-shade max-w-3xl mx-auto">
            <div className="text-center mb-14" data-vp-animate="fade-up">
              <span className="vp-label">الأسئلة الشائعة</span>
              <h2 className="vp-section-title mt-4">إجابات لأسئلتك</h2>
              <div className="w-16 h-1 rounded-full bg-gradient-to-l from-[var(--accent)] to-[var(--accent-light)] mx-auto mt-4" />
            </div>
            <div className="space-y-4" data-vp-animate="fade-up" data-vp-delay="2">
              {[
                { q: "ما هي تكلفة الاشتراك في Velara Care؟", a: "تبدأ الخطط من 35 ريالاً لكل موظف شهرياً. نوفر أيضاً خصومات للشركات الكبرى." },
                { q: "هل بيانات الموظفين آمنة؟", a: "نعم، جميع البيانات مشفرة ومحمية وفق أعلى معايير الأمان. لا يتم مشاركة أي بيانات فردية مع أطراف ثالثة." },
                { q: "كم من الوقت يستغرق إعداد المنصة؟", a: "يمكن إعداد الحساب وتفعيله خلال دقائق. دعوة الموظفين وإجراء التقييم لا يستغرق أكثر من أسبوع." },
              ].map((faq, i) => (
                <details key={i} className="card-premium p-5 group hover:shadow-md transition-all">
                  <summary className="cursor-pointer text-sm font-semibold text-[var(--text-primary)] select-none flex items-center justify-between">
                    {faq.q}
                    <ArrowLeft className="h-4 w-4 text-[var(--text-secondary)] group-open:-rotate-90 transition-transform shrink-0" />
                  </summary>
                  <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-28 overflow-hidden" dir="rtl" style={{ background: 'linear-gradient(160deg, #071F1F 0%, #0A3A3A 40%, #0D4F4F 70%, #071F1F 100%)' }}>
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 25% 40%, rgba(45,212,191,0.10) 0%, transparent 50%), radial-gradient(circle at 75% 60%, rgba(45,212,191,0.06) 0%, transparent 50%)' }} />
          <div className="absolute inset-0 vp-grid-bg opacity-[0.04]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-l from-transparent via-white/10 to-transparent" />
          <div className="container-shade relative z-10">
            <div className="max-w-4xl mx-auto" data-vp-animate="slide-up">
              <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] p-10 lg:p-16" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.015) 100%)', backdropFilter: 'blur(24px)' }}>
                <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[var(--accent)]/10 blur-[120px] pointer-events-none" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-white/[0.02] blur-[120px] pointer-events-none" />
                <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-l from-transparent via-white/20 to-transparent" />
                <div className="relative text-center">
                  <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/[0.06] border border-white/[0.10] text-white/80 text-xs font-semibold mb-8 backdrop-blur-sm">
                    <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" /></span>
                    تواصل معنا
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-[1.15] mb-6">هل تريد تحسين عافية قواك العاملة؟</h2>
                  <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">احصل على عرض تجريبي مخصص لمؤسستك واكتشف كيف تخفض التكاليف وتحسن الإنتاجية.</p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                    <Link href="/demo" className="group relative inline-flex items-center gap-2.5 px-10 py-4 rounded-2xl bg-white text-[var(--vp-ink)] font-bold text-base shadow-xl shadow-white/10 hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5">
                      اطلب عرضاً تجريبياً للمؤسسات
                      <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    </Link>
                    <Link href="/pricing" className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl border border-white/20 text-white/80 font-semibold text-sm hover:bg-white/[0.06] hover:border-white/30 transition-all duration-300">
                      <div className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                      شاهد الأسعار
                    </Link>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 pt-8 border-t border-white/[0.06]">
                    <div className="text-center"><p className="text-white font-extrabold text-xl">100+</p><p className="text-white/40 text-xs">شركة تثق بنا</p></div>
                    <div className="w-px h-10 bg-white/[0.06]" />
                    <div className="text-center"><p className="text-white font-extrabold text-xl">5,000+</p><p className="text-white/40 text-xs">موظف على المنصة</p></div>
                    <div className="w-px h-10 bg-white/[0.06]" />
                    <div className="text-center"><p className="text-white font-extrabold text-xl">3.2x</p><p className="text-white/40 text-xs">متوسط العائد على الاستثمار</p></div>
                  </div>
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
