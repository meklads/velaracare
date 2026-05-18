"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, Heart, Phone, Mail, MapPin } from "lucide-react";

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
    <footer className="border-t border-[var(--border-primary)] bg-[var(--bg-primary)]" dir="rtl">
      <div className="container-shade py-16 lg:py-20">
        {/* Top section: Brand + Links */}
        <div className="grid gap-10 lg:grid-cols-6 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)]">
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

            {/* Certifications */}
            <div className="mt-6">
              <p className="text-xs font-semibold text-[var(--text-muted)] mb-3">الشهادات والاعتماد</p>
              <div className="flex flex-wrap gap-2">
                {certifications.map((cert) => (
                  <div
                    key={cert.name}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[11px] font-medium text-[var(--text-secondary)]"
                  >
                    <Shield className="h-3 w-3 text-[var(--accent)]" />
                    {cert.name}
                    <span className="text-[var(--text-muted)]">—</span>
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
                      className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact bar */}
        <div className="flex flex-wrap gap-4 items-center justify-between py-5 px-6 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] mb-10">
          <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
            <Phone className="h-4 w-4 text-[var(--accent)]" />
            <span>+966 800 123 4567</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
            <Mail className="h-4 w-4 text-[var(--accent)]" />
            <span>hello@velara.care</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
            <MapPin className="h-4 w-4 text-[var(--accent)]" />
            <span>الرياض، المملكة العربية السعودية</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
            <Heart className="h-4 w-4 text-rose-500" />
            <span>دعم فني 24/7</span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[var(--border-primary)]">
          <p className="text-xs text-[var(--text-muted)]">
            &copy; {new Date().getFullYear()} Velara Care. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
              الخصوصية
            </Link>
            <span className="text-[var(--text-muted)]">|</span>
            <Link href="/terms" className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
              الشروط
            </Link>
            <span className="text-[var(--text-muted)]">|</span>
            <Link href="/compliance" className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
              الامتثال
            </Link>
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            Predict. Prevent. Perform.
          </p>
        </div>
      </div>
    </footer>
  );
}
