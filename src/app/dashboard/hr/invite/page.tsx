"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ChevronLeft, Mail } from "lucide-react";

export default function InvitePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface-mid pt-24">
        <div className="container-shade py-8">
          <div className="fade-in-up mb-8">
            <Link href="/dashboard/hr" className="text-sm text-emerald hover:underline inline-flex items-center gap-1 mb-2">
              <ChevronLeft className="h-4 w-4" /> العودة للوحة التحكم
            </Link>
            <h1 className="text-2xl font-bold text-primary">👤 دعوة موظف جديد</h1>
            <p className="text-secondary">أضف موظفاً جديداً إلى منصة Velara Care</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="shade-card p-8">
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary">الاسم الأول</label>
                    <input type="text" placeholder="محمد" className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-3 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary">الاسم الأخير</label>
                    <input type="text" placeholder="العلي" className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-3 text-sm" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary">البريد الإلكتروني للشركة</label>
                  <input type="email" placeholder="employee@company.com" dir="ltr" className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-3 text-sm text-left" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary">القسم</label>
                  <select className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-3 text-sm">
                    <option>تقنية المعلومات</option>
                    <option>الموارد البشرية</option>
                    <option>المبيعات</option>
                    <option>التسويق</option>
                    <option>الإنتاج</option>
                    <option>الإدارة</option>
                  </select>
                </div>

                <button type="submit" className="btn-primary w-full justify-center">
                  <Mail className="ml-2 h-4 w-4" />
                  إرسال دعوة
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
