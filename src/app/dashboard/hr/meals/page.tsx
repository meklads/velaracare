"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Loader2, ChevronLeft, Apple, TrendingUp, UtensilsCrossed } from "lucide-react";

type MealPlan = { id: string; name: string; description: string | null; type: string; calories: number | null; isActive: boolean; _count: { orders: number } };

export default function HRMealsPage() {
  const [plans, setPlans] = useState<MealPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/meals");
        if (res.ok) setPlans(await res.json());
      } catch (e) {
        console.error("Failed to load meals", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const totalOrders = plans.reduce((s, p) => s + p._count.orders, 0);
  const avgCalories = plans.length ? Math.round(plans.reduce((s, p) => s + (p.calories || 0), 0) / plans.length) : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-mid">
        <Loader2 className="h-8 w-8 text-emerald animate-spin" />
      </div>
    );
  }

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
              { label: "إجمالي الطلبات", value: totalOrders, change: `${plans.length} خطة` },
              { label: "متوسط السعرات", value: avgCalories ? `${avgCalories.toLocaleString()}` : "—", change: "kcal" },
              { label: "الخطط النشطة", value: plans.filter((p) => p.isActive).length, change: `من أصل ${plans.length}` },
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
            {plans.length === 0 ? (
              <p className="text-sm text-secondary text-center py-6">لا توجد وجبات متاحة بعد</p>
            ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {plans.map((m) => (
                <div key={m.id} className="flex items-center justify-between p-4 rounded-xl bg-[var(--white-warm)]">
                  <div className="flex items-center gap-3">
                    <UtensilsCrossed className="h-6 w-6 text-emerald" />
                    <div>
                      <p className="font-semibold text-primary">{m.name}</p>
                      <p className="text-xs text-secondary">{m.description || m.type}</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-primary">{m._count.orders} طلب</span>
                </div>
              ))}
            </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
