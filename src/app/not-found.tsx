"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-mid p-4" dir="rtl">
      <div className="shade-card max-w-lg w-full p-12 text-center relative overflow-hidden">
        <div className="shade-circle w-64 h-64 -top-32 -left-32 opacity-10" />
        <div className="relative z-10">
          {/* Animated 404 */}
          <div className="text-8xl font-bold mb-4 flex items-center justify-center gap-2">
            <span className="text-emerald animate-bounce" style={{ animationDelay: "0s" }}>4</span>
            <span className="text-amber-500 animate-bounce" style={{ animationDelay: "0.15s" }}>0</span>
            <span className="text-emerald animate-bounce" style={{ animationDelay: "0.3s" }}>4</span>
          </div>

          {/* Icon */}
          <div className="text-6xl mb-4">🔍</div>

          <h1 className="text-2xl font-bold text-primary mb-2">الصفحة غير موجودة</h1>
          <p className="text-secondary mb-8 leading-relaxed">
            عذراً، الصفحة التي تبحث عنها غير متاحة أو تم نقلها.
            <br />
            تحقق من الرابط أو عد إلى الرئيسية.
          </p>

          <div className="flex items-center justify-center gap-3">
            <Link href="/" className="btn-primary text-sm py-2.5 px-6">
              ← العودة للرئيسية
            </Link>
            <button
              onClick={() => window.history.back()}
              className="text-sm py-2.5 px-6 rounded-2xl border border-[var(--surface-border)] text-secondary hover:text-primary hover:border-emerald/30 transition-all font-medium"
            >
              الرجوع للصفحة السابقة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
