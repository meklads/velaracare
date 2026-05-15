import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Apple, ChevronLeft, Plus, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "إدارة الوجبات",
  description: "إدارة الوجبات الصحية للشركة",
};

const meals = [
  { name: "وجبة السكري", type: "diabetic", calories: 1800, orders: 24, status: "نشط" },
  { name: "وجبة تخفيف الوزن", type: "weight_loss", calories: 1500, orders: 36, status: "نشط" },
  { name: "وجبة الأداء العالي", type: "high_performance", calories: 2200, orders: 18, status: "نشط" },
  { name: "وجبة عامة", type: "general", calories: 2000, orders: 45, status: "نشط" },
  { name: "وجبة نباتية", type: "vegan", calories: 1600, orders: 8, status: "تجريبي" },
];

export default function AdminMealsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface-mid pt-24">
        <div className="container-shade py-8">
          <div className="fade-in-up mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <Link href="/dashboard/admin" className="text-sm text-emerald hover:underline inline-flex items-center gap-1 mb-2">
                <ChevronLeft className="h-4 w-4" /> العودة للوحة التحكم
              </Link>
              <h1 className="text-2xl font-bold text-primary">🍎 إدارة الوجبات</h1>
              <p className="text-secondary">إدارة الوجبات الصحية المقدمة للموظفين</p>
            </div>
            <button className="btn-primary text-sm py-2 px-5">
              <Plus className="ml-2 h-4 w-4" />
              إضافة وجبة جديدة
            </button>
          </div>

          <div className="shade-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary" />
                <input type="text" placeholder="بحث عن وجبة..." className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid pr-10 px-4 py-2.5 text-sm text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-emerald-ai/30" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--surface-border)]">
                    <th className="text-right py-3 text-secondary font-medium">الاسم</th>
                    <th className="text-right py-3 text-secondary font-medium">النوع</th>
                    <th className="text-right py-3 text-secondary font-medium">السعرات</th>
                    <th className="text-right py-3 text-secondary font-medium">الطلبات</th>
                    <th className="text-right py-3 text-secondary font-medium">الحالة</th>
                    <th className="text-right py-3 text-secondary font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {meals.map((m) => (
                    <tr key={m.name} className="border-b border-[var(--surface-border)] last:border-0 hover:bg-[var(--white-warm)]">
                      <td className="py-3 font-semibold text-primary">{m.name}</td>
                      <td className="py-3 text-secondary">{m.type}</td>
                      <td className="py-3 text-secondary">{m.calories} kcal</td>
                      <td className="py-3 text-secondary">{m.orders}</td>
                      <td className="py-3">
                        <span className={`tag text-xs py-0.5 px-3 ${m.status === "نشط" ? "bg-emerald-soft text-emerald-dark" : "bg-amber-50 text-amber-600"}`}>{m.status}</span>
                      </td>
                      <td className="py-3">
                        <button className="text-xs text-emerald hover:underline">تعديل</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
