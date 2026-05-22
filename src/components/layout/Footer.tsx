"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, Heart, Phone, Mail, MapPin, Sparkles } from "lucide-react";

const footerLinks = {
  المنصة: [
    { title: "المنتج", href: "/product" },
    { title: "الميزات", href: "/features" },
    { title: "الأسعار", href: "/pricing" },
    { title: "طلب عرض تجريبي", href: "/demo" },
  ],
  الشركة: [
    { title: "عن Velara Care", href: "/about" },
    { title: "الأمان والخصوصية", href: "/ai-trust" },
    { title: "الامتثال", href: "/compliance" },
    { title: "المساعدة", href: "/help" },
  ],
  القانون: [
    { title: "شروط الخدمة", href: "/terms" },
    { title: "سياسة الخصوصية", href: "/privacy" },
    { title: "الامتثال", href: "/compliance" },
    { title: "حماية البيانات", href: "/ai-trust" },
  ],
  "روابط سريعة": [
    { title: "اتصل بنا", href: "/contact" },
    { title: "طلب عرض تجريبي", href: "/demo" },
    { title: "الأسعار", href: "/pricing" },
    { title: "المساعدة", href: "/help" },
  ],
};

const trustSignals = [
  { name: "AI", desc: "تقييم تنبؤي" },
  { name: "TLS 1.3", desc: "تشفير البيانات" },
  { name: "RBAC", desc: "صلاحيات آمنة" },
  { name: "2FA", desc: "مصادقة آمنة" },
];

const contactItems = [
  { icon: Phone, label: "الهاتف", value: "+966 800 123 4567", href: "tel:+9668001234567" },
  { icon: Mail, label: "البريد", value: "hello@velaracare.co", href: "mailto:hello@velaracare.co" },
  { icon: MapPin, label: "المقر", value: "الرياض، المملكة العربية السعودية" },
  { icon: Heart, label: "الدعم", value: "دعم فني 24/7", accent: true },
];

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/dashboard")) return null;

  return (
    <footer className="border-t border-[var(--border-primary)] bg-[var(--bg-primary)]" dir="rtl">
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-l from-[var(--accent)] via-[var(--accent-light)]/40 to-transparent" />

      <div className="container-shade pt-16 lg:pt-20 pb-10">
        {/* ===== MAIN GRID: Brand + Links ===== */}
        <div className="grid gap-12 lg:grid-cols-6 mb-14">
          {/* --- Brand column --- */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] shadow-lg shadow-[var(--accent)]/20 group-hover:shadow-[var(--accent)]/30 transition-all duration-300">
                <span className="text-xl font-bold text-white">V</span>
              </div>
              <div>
                <span className="text-xl font-bold text-[var(--text-primary)]">Velara</span>
                <span className="text-sm font-medium text-[var(--text-secondary)] mr-1">Care</span>
              </div>
            </Link>

            <p className="mt-5 text-sm text-[var(--text-secondary)] leading-relaxed max-w-sm">
              منصة مؤسسية لبرامج عافية الموظفين — تساعد الشركات على تحسين جودة حياة القوى العاملة،
              رفع الإنتاجية، وقياس أثر العافية على أداء المؤسسة. ليس معدات طبية. ليس خدمات صحية.
              منصة عافية مؤسسية فقط.
            </p>

            {/* Trust signals */}
            <div className="mt-8">
              <p className="text-xs font-semibold text-[var(--text-muted)] mb-3 tracking-wide">تقنيات المنصة</p>
              <div className="flex flex-wrap gap-2">
                {trustSignals.map((signal) => (
                  <div
                    key={signal.name}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[11px] font-medium text-[var(--text-secondary)] hover:border-[var(--accent)]/20 transition-colors"
                  >
                    <Shield className="h-3 w-3 text-[var(--accent)]" />
                    {signal.name}
                    <span className="text-[var(--text-muted)]">—</span>
                    {signal.desc}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* --- Link columns --- */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-bold text-[var(--text-primary)] mb-5 relative inline-block">
                {title}
                <span className="absolute -bottom-1 right-0 w-8 h-0.5 rounded-full bg-gradient-to-l from-[var(--accent)] to-transparent" />
              </h4>
              <ul className="space-y-3.5">
                {links.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-all duration-200 inline-flex items-center gap-2 group/link"
                    >
                      <span className="w-1 h-1 rounded-full bg-[var(--accent)]/0 group-hover/link:bg-[var(--accent)]/60 transition-all group-hover/link:w-1.5 group-hover/link:h-1.5" />
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ===== CONTACT BAR — مُعاد تصميمه ===== */}
        <div className="relative rounded-2xl bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-card)] border border-[var(--border-primary)] p-6 lg:p-8 mb-12 overflow-hidden">
          {/* Top glow line */}
          <div className="absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-l from-transparent via-[var(--accent)]/20 to-transparent" />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 relative z-10">
            {contactItems.map((item) => (
              <div key={item.label} className="flex items-center gap-3 group">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg ${
                  item.accent
                    ? 'bg-rose-50 dark:bg-rose-950/30'
                    : 'bg-[var(--accent-soft)]'
                }`}>
                  <item.icon className={`h-5 w-5 ${item.accent ? 'text-rose-500' : 'text-[var(--accent)]'}`} />
                </div>
                <div>
                  <p className="text-[11px] text-[var(--text-muted)] font-medium uppercase tracking-wider">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-sm font-semibold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== BOTTOM BAR — مُعاد تصميمه ===== */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pt-8 border-t border-[var(--border-primary)]">
          {/* Copyright + Legal */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-xs text-[var(--text-muted)]">
            <span>&copy; {new Date().getFullYear()} Velara Care. جميع الحقوق محفوظة.</span>
            <span className="hidden sm:inline text-[var(--border-primary)]">|</span>
            <div className="flex items-center gap-3">
              <Link href="/privacy" className="hover:text-[var(--accent)] transition-colors">الخصوصية</Link>
              <span className="text-[var(--border-primary)]">·</span>
              <Link href="/terms" className="hover:text-[var(--accent)] transition-colors">الشروط</Link>
              <span className="text-[var(--border-primary)]">·</span>
              <Link href="/compliance" className="hover:text-[var(--accent)] transition-colors">الامتثال</Link>
            </div>
          </div>

          {/* Brand tagline */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-[var(--text-muted)]">منصة</span>
            <span className="text-xs font-bold text-[var(--text-secondary)] tracking-widest">VELARA CARE</span>
            <span className="text-[10px] text-[var(--border-primary)]">—</span>
            <span className="text-xs text-[var(--accent)] font-semibold tracking-wide">Predict. Prevent. Perform.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
