import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ChevronLeft, Apple, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "الوجبات",
  description: "إدارة الوجبات الصحية",
};

export default function HRMealsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface-mid pt-24">
        <div className="container-shade py-8">
          <div className="fade-in-up mb-8">
            <Link href="/dashboard/hr" className="text-sm text-emerald hover:underline inline-flex items-center gap-1 mb-2">
              <ChevronLeft className="h-4 w-4" /> العودة للوحة التحكم
            </Link>
            <h1 className="text-2xl font-bold text-primary">🍎 الوجبات</h1>
            <p className="text-secondary">إدارة الوجبات الصحية المقدمة للموظفين</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {[
              { label: "طلبات اليوم", value: "142", change: "+12%" },
              { label: "متوسط السعرات", value: "1,850", change: "kcal" },
              { label: "رضا الموظفين", value: "94%", change: "+5%" },
            ].map((s) => (
              <div key={s.label} className="shade-card p-5">
                <p className="text-sm text-secondary">{s.label}</p>
                <p className="stat-number text-primary">{s.value}</p>
                <p className="text-xs text-emerald">{s.change}</p>
              </div>
            ))}
          </div>

          <div className="shade-card p-6">
            <h3 className="font-bold text-primary mb-4">الوجبات المتاحة</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { name: "وجبة السكري", desc: "وجبة منخفضة السكريات", orders: 24 },
                { name: "وجبة تخفيف الوزن", desc: "وجبة منخفضة السعرات", orders: 36 },
                { name: "وجبة الأداء العالي", desc: "غنية بالبروتين", orders: 18 },
                { name: "وجبة عامة", desc: "وجبة متوازنة", orders: 45 },
              ].map((m) => (
                <div key={m.name} className="flex items-center justify-between p-4 rounded-xl bg-[var(--white-warm)]">
                  <div className="flex items-center gap-3">
                    <Apple className="h-6 w-6 text-emerald" />
                    <div>
                      <p className="font-semibold text-primary">{m.name}</p>
                      <p className="text-xs text-secondary">{m.desc}</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-primary">{m.orders} طلب</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
