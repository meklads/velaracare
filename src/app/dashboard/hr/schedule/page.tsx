"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ChevronLeft, Calendar } from "lucide-react";

export default function SchedulePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface-mid pt-24">
        <div className="container-shade py-8">
          <div className="fade-in-up mb-8">
            <Link href="/dashboard/hr" className="text-sm text-emerald hover:underline inline-flex items-center gap-1 mb-2">
              <ChevronLeft className="h-4 w-4" /> العودة للوحة التحكم
            </Link>
            <h1 className="text-2xl font-bold text-primary">📅 جدولة استشارة</h1>
            <p className="text-secondary">جدولة استشارة جديدة لأحد الموظفين</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="shade-card p-8">
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary">الموظف</label>
                  <select className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-3 text-sm">
                    <option>اختر موظفاً...</option>
                    <option>محمد الأحمد</option>
                    <option>سارة العلي</option>
                    <option>خالد البدر</option>
                    <option>نورة العنزي</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary">نوع الاستشارة</label>
                  <select className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-3 text-sm">
                    <option>تغذية علاجية</option>
                    <option>لياقة بدنية</option>
                    <option>استشارة نفسية</option>
                    <option>تغذية رياضية</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary">التاريخ</label>
                    <input type="date" className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-3 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary">الوقت</label>
                    <input type="time" className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-3 text-sm" />
                  </div>
                </div>

                <button type="submit" className="btn-primary w-full justify-center">
                  <Calendar className="ml-2 h-4 w-4" />
                  تأكيد الحجز
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
