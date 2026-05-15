import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Apple, Users, Clock, CheckCircle2, ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "لوحة المطعم",
  description: "إدارة الوجبات والتوصيل",
};

const todayMeals = [
  { name: "وجبة السكري", orders: 24, ready: 20, time: "12:30" },
  { name: "وجبة تخفيف الوزن", orders: 36, ready: 30, time: "12:30" },
  { name: "وجبة الأداء العالي", orders: 18, ready: 15, time: "12:30" },
  { name: "وجبة عامة", orders: 45, ready: 38, time: "12:30" },
];

export default function RestaurantDashboard() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface-mid pt-24">
        <div className="container-shade py-8">
          <div className="fade-in-up mb-8">
            <h1 className="text-2xl font-bold text-primary">🍽️ لوحة المطعم</h1>
            <p className="text-secondary">إدارة الوجبات الصحية والتوصيل</p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: "طلبات اليوم", value: "123", icon: Apple },
              { label: "تم التوصيل", value: "103", icon: CheckCircle2 },
              { label: "متبقي", value: "20", icon: Clock },
            ].map((s) => (
              <div key={s.label} className="shade-card p-5 text-center">
                <s.icon className="h-6 w-6 text-emerald mx-auto mb-2" />
                <p className="stat-number text-primary">{s.value}</p>
                <p className="text-xs text-[var(--text-muted)]">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="shade-card p-6">
            <h3 className="font-bold text-primary mb-4">وجبات اليوم</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--surface-border)]">
                    <th className="text-right py-3 text-secondary font-medium">الوجبة</th>
                    <th className="text-right py-3 text-secondary font-medium">الطلبات</th>
                    <th className="text-right py-3 text-secondary font-medium">جاهز</th>
                    <th className="text-right py-3 text-secondary font-medium">وقت التوصيل</th>
                    <th className="text-right py-3 text-secondary font-medium">الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {todayMeals.map((m) => (
                    <tr key={m.name} className="border-b border-[var(--surface-border)] last:border-0">
                      <td className="py-3 font-semibold text-primary">{m.name}</td>
                      <td className="py-3 text-secondary">{m.orders}</td>
                      <td className="py-3 text-secondary">{m.ready}/{m.orders}</td>
                      <td className="py-3 text-secondary">{m.time}</td>
                      <td className="py-3">
                        <span className="tag text-xs py-0.5 px-3 bg-emerald-soft text-emerald-dark">
                          جاري التجهيز
                        </span>
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
