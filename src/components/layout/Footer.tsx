"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, Heart, Phone, Mail, MapPin, ArrowLeft } from "lucide-react";

const footerLinks = {
  المنصة: [
    { title: "الميزات", href: "/features" },
    { title: "المنتج", href: "/product" },
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
    { title: "الامتثال الصحي", href: "/compliance" },
    { title: "حماية البيانات", href: "/ai-trust" },
  ],
  "روابط سريعة": [
    { title: "اتصل بنا", href: "/contact" },
    { title: "الأسعار", href: "/pricing" },
    { title: "المساعدة", href: "/help" },
    { title: "عرض تجريبي", href: "/demo" },
  ],
};

const certifications = [
  { name: "ISO 27001", desc: "أمن المعلومات" },
  { name: "PDPL", desc: "حماية البيانات" },
  { name: "SDAIA", desc: "الذكاء الاصطناعي" },
  { name: "SOC 2", desc: "الخصوصية" },
];

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/dashboard")) return null;

  return (
    <footer className="relative overflow-hidden border-t border-[var(--border-primary)] bg-gradient-to-b from-[var(--bg-primary)] to-[var(--bg-secondary)]">
      {/* Background grid */}
      <div className="absolute inset-0 vp-grid-bg opacity-[0.03] pointer-events-none" />

      <div className="container-shade relative z-10 py-16 lg:py-20">
        {/* Top section: Brand + Trust */}
        <div className="grid gap-10 lg:grid-cols-6 mb-14">
          {/* Brand column — wider */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--vp-accent)] to-[var(--vp-accent-dark)] shadow-lg shadow-[var(--vp-accent)]/20 transition-transform group-hover:scale-105">
                <span className="text-lg font-bold text-white">V</span>
              </div>
              <div>
                <span className="text-xl font-bold text-[var(--text-primary)]">Velara</span>
                <span className="text-sm font-medium text-[var(--text-secondary)] mr-1">Care</span>
              </div>
            </Link>

            <p className="mt-4 text-sm text-[var(--text-secondary)] leading-relaxed max-w-sm">
              منصة ذكاء صحي مؤسسي — تحوِّل صحة الموظفين إلى قيمة مالية وميزة تنافسية باستخدام
              الذكاء الاصطناعي التنبؤي والتحليلات الوقائية.
            </p>

            {/* Trust / Certifications */}
            <div className="mt-6">
              <p className="text-xs font-semibold text-[var(--text-muted)] mb-3 tracking-wider uppercase">الشهادات والاعتماد</p>
              <div className="flex flex-wrap gap-2">
                {certifications.map((cert) => (
                  <div key={cert.name} className="vp-tag-premium text-[10px]">
                    <Shield className="h-3 w-3" />
                    {cert.name}
                    <span className="opacity-50">—</span>
                    {cert.desc}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-bold text-[var(--text-primary)] mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--text-secondary)] hover:text-[var(--vp-accent)] transition-all duration-300 inline-flex items-center gap-1.5 group"
                    >
                      <span className="w-0 group-hover:w-1.5 h-1.5 rounded-full bg-[var(--vp-accent)] transition-all duration-300" />
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact bar */}
        <div className="flex flex-wrap gap-4 items-center justify-between py-6 px-6 rounded-2xl bg-[var(--vp-glow-soft)] border border-[var(--vp-accent)]/10 mb-10">
          <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
            <Phone className="h-4 w-4 text-[var(--vp-accent)]" />
            <span>+966 800 123 4567</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
            <Mail className="h-4 w-4 text-[var(--vp-accent)]" />
            <span>hello@velara.care</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
            <MapPin className="h-4 w-4 text-[var(--vp-accent)]" />
            <span>الرياض، المملكة العربية السعودية</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-rose-500" />
            <span className="text-xs text-[var(--text-muted)]">دعم فني 24/7</span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[var(--border-primary)]">
          <p className="text-xs text-[var(--text-muted)]">
            © {new Date().getFullYear()} Velara Care. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-[var(--text-muted)] hover:text-[var(--vp-accent)] transition-colors">
              الخصوصية
            </Link>
            <span className="text-[var(--text-muted)] opacity-30">|</span>
            <Link href="/terms" className="text-xs text-[var(--text-muted)] hover:text-[var(--vp-accent)] transition-colors">
              الشروط
            </Link>
            <span className="text-[var(--text-muted)] opacity-30">|</span>
            <Link href="/compliance" className="text-xs text-[var(--text-muted)] hover:text-[var(--vp-accent)] transition-colors">
              الامتثال
            </Link>
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            Predict. Prevent. Perform. — المملكة العربية السعودية
          </p>
        </div>
      </div>
    </footer>
  );
}
