import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Mail, Phone, MapPin, MessageSquare, ChevronLeft, Clock, Send } from "lucide-react";

export const metadata: Metadata = {
  title: "اتصل بنا",
  description: "تواصل مع فريق Velara Care — نحن هنا لمساعدتك",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        {/* ── Hero ── */}
        <section className="bg-surface-mid section-padding relative overflow-hidden">
          <div className="shade-circle w-[400px] h-[400px] -top-20 -right-20 opacity-30" />
          <div className="container-shade relative z-10 text-center">
            <div className="fade-in-up">
              <span className="tag mb-6">تواصل معنا</span>
              <h1 className="hero-title mt-4">
                نحن هنا{" "}
                <span className="text-emerald">لنساعدك</span>
              </h1>
              <p className="subtitle mt-4 text-secondary max-w-2xl mx-auto">
                فريق Velara Care جاهز للإجابة على استفساراتك وتقديم عرض توضيحي للمنصة
              </p>
            </div>
          </div>
        </section>

        {/* ── Contact Grid ── */}
        <section className="section-padding bg-surface-deeper">
          <div className="container-shade">
            <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {/* Contact Info */}
              <div className="space-y-8 fade-in-up">
                <div>
                  <h2 className="section-title text-2xl">معلومات التواصل</h2>
                  <div className="shade-divider mt-3" />
                </div>

                <div className="space-y-5">
                  {[
                    { icon: Mail, label: "البريد الإلكتروني", value: "hello@velaracare.co", href: "mailto:hello@velaracare.co" },
                    { icon: Phone, label: "الهاتف", value: "+966 55 123 4567", href: "tel:+966551234567" },
                    { icon: MapPin, label: "المقر", value: "الرياض، المملكة العربية السعودية", href: null },
                    { icon: Clock, label: "ساعات العمل", value: "الأحد – الخميس ٩:٠٠ ص – ٦:٠٠ م", href: null },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-emerald-soft flex items-center justify-center shrink-0">
                        <item.icon className="h-5 w-5 text-emerald" />
                      </div>
                      <div>
                        <p className="text-sm text-secondary">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="text-base font-semibold text-primary hover:text-emerald transition-colors">
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-base font-semibold text-primary">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="shade-card p-6">
                  <h3 className="font-bold text-primary mb-3">تابعنا على</h3>
                  <div className="flex items-center gap-3">
                    {[
                      { name: "تويتر", href: "#" },
                      { name: "لينكد إن", href: "#" },
                      { name: "إنستغرام", href: "#" },
                    ].map((social) => (
                      <a key={social.name} href={social.href}
                        className="text-sm py-2 px-4 rounded-xl bg-surface-mid text-secondary hover:text-emerald hover:border-emerald/30 border border-[var(--surface-border)] transition-all">
                        {social.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="shade-card p-8 fade-in-up-delay-2">
                <h2 className="section-title text-2xl mb-2">أرسل لنا رسالة</h2>
                <p className="text-sm text-secondary mb-6">سنتواصل معك في أقرب وقت ممكن</p>
                <form action="/api/demo" method="POST" className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-primary">الاسم الكامل</label>
                      <input type="text" name="name" required placeholder="محمد العلي"
                        className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-3 text-sm text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-emerald-ai/30" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-primary">الشركة</label>
                      <input type="text" name="company" placeholder="شركتك"
                        className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-3 text-sm text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-emerald-ai/30" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-primary">البريد الإلكتروني</label>
                    <input type="email" name="email" required placeholder="email@company.com" dir="ltr"
                      className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-3 text-sm text-left text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-emerald-ai/30" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-primary">رقم الجوال</label>
                    <input type="tel" name="phone" placeholder="+966 55 123 4567" dir="ltr"
                      className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-3 text-sm text-left text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-emerald-ai/30" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-primary">الرسالة</label>
                    <textarea name="message" rows={4} required placeholder="كيف يمكننا مساعدتك؟"
                      className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-3 text-sm text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-emerald-ai/30 resize-none" />
                  </div>
                  <button type="submit"
                    className="btn-primary w-full justify-center text-sm py-3">
                    <Send className="ml-2 h-4 w-4" />
                    إرسال الرسالة
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ Preview ── */}
        <section className="section-padding bg-surface-mid">
          <div className="container-shade max-w-3xl mx-auto">
            <div className="text-center fade-in-up mb-10">
              <span className="tag">الأسئلة الشائعة</span>
              <h2 className="section-title mt-4">إجابات لأسئلتك</h2>
              <div className="shade-divider mx-auto mt-4" />
            </div>
            <div className="space-y-4 fade-in-up-delay-2">
              {[
                { q: "ما هي تكلفة الاشتراك في Velara Care؟", a: "تبدأ الخطط من ٣٥ ريالاً لكل موظف شهرياً. نوفر أيضاً خصومات للشركات الكبرى." },
                { q: "هل بيانات الموظفين الصحية آمنة؟", a: "نعم، جميع البيانات مشفرة ومحمية وفق أعلى معايير الأمان. لا يتم مشاركة أي بيانات فردية مع أطراف ثالثة." },
                { q: "كم من الوقت يستغرق إعداد المنصة؟", a: "يمكن إعداد الحساب وتفعيله خلال دقائق. دعوة الموظفين وإجراء التقييم الصحي لا يستغرق أكثر من أسبوع." },
                { q: "هل تدعمون التكامل مع أنظمة الشركة الحالية؟", a: "نعم، نوفر واجهات API للتكامل مع أنظمة الموارد البشرية والتأمين الصحي." },
              ].map((faq, i) => (
                <details key={i} className="shade-card p-5 group">
                  <summary className="cursor-pointer text-sm font-semibold text-primary select-none flex items-center justify-between">
                    {faq.q}
                    <ChevronLeft className="h-4 w-4 text-secondary group-open:rotate-90 transition-transform" />
                  </summary>
                  <p className="mt-3 text-sm text-secondary leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/help" className="text-sm text-emerald hover:underline font-medium">
                عرض جميع الأسئلة ←
              </Link>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="section-padding bg-surface-dark text-white text-center">
          <div className="container-shade">
            <h2 className="hero-title text-white">جاهز لتحويل صحة موظفيك؟</h2>
            <p className="subtitle mt-4 text-white/80 max-w-2xl mx-auto">
              احجز عرضاً تجريبياً مجاناً واكتشف كيف يمكن لـ Velara Care أن تخفض تكاليف الرعاية الصحية
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/demo" className="btn-primary !bg-white !text-primary">احجز عرضاً تجريبياً</Link>
              <Link href="/pricing" className="btn-outline !border-white/40 !text-white">شاهد الأسعار</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
