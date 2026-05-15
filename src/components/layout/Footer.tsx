import Link from "next/link";

const footerLinks = {
  المنصة: [
    { title: "الميزات", href: "/features" },
    { title: "الأسعار", href: "/pricing" },
    { title: "طلب عرض", href: "/demo" },
  ],
  الشركة: [
    { title: "عن Velara Care", href: "/about" },
    { title: "سياسة الخصوصية", href: "/privacy" },
    { title: "الشروط والأحكام", href: "/terms" },
  ],
  الدعم: [
    { title: "مركز المساعدة", href: "/help" },
    { title: "اتصل بنا", href: "/contact" },
    { title: "الخصوصية", href: "/privacy" },
  ],
  القانون: [
    { title: "شروط الخدمة", href: "/terms" },
    { title: "سياسة الخصوصية", href: "/privacy" },
    { title: "الامتثال", href: "/compliance" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-[var(--surface-border)] bg-surface-mid">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-gradient">
                <span className="text-sm font-bold text-white">V</span>
              </div>
              <span className="text-lg font-bold text-primary">Velara</span>
              <span className="text-sm font-medium text-secondary">Care</span>
            </Link>
            <p className="mt-3 text-sm text-secondary leading-relaxed">
              Velara Care هي منصة سعودية لإدارة الصحة المؤسسية باستخدام الذكاء الاصطناعي والتحليلات الوقائية.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-primary mb-3">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className="text-sm text-secondary hover:text-emerald-400 transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-[var(--surface-border)] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            © 2026 Velara Care. جميع الحقوق محفوظة.
          </p>
          <p className="text-xs text-muted">
            Predict. Prevent. Perform. — المملكة العربية السعودية
          </p>
        </div>
      </div>
    </footer>
  );
}
