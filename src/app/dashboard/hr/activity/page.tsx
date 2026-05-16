"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Loader2, ChevronLeft, Bell, UserCheck, Calendar, Apple, Activity, ShoppingBag } from "lucide-react";

type Activity = {
  icon: any;
  name: string;
  action: string;
  dept: string;
  time: string;
  risk: string;
};

export default function ActivityPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [usersRes, ordersRes, consRes] = await Promise.all([
          fetch("/api/users"),
          fetch("/api/meals?type=orders"),
          fetch("/api/consultations?type=all"),
        ]);
        const items: Activity[] = [];

        if (usersRes.ok) {
          const users = await usersRes.json();
          users.slice(0, 3).forEach((u: any) => {
            items.push({
              icon: UserCheck,
              name: `${u.firstName} ${u.lastName}`,
              action: u.wellnessScore ? "أكمل التقييم الصحي" : "أنشأ حساب جديد",
              dept: u.department || "بدون قسم",
              time: timeAgo(new Date(u.createdAt)),
              risk: u.wellnessScore?.riskLevel === "high" || u.wellnessScore?.riskLevel === "critical" ? "مرتفع" : "منخفض",
            });
          });
        }

        if (consRes.ok) {
          const cons = await consRes.json();
          cons.slice(0, 3).forEach((c: any) => {
            items.push({
              icon: Calendar,
              name: `${c.patient?.firstName || ""} ${c.patient?.lastName || ""}`,
              action: `حجز استشارة ${c.type}`,
              dept: c.patient?.department || "بدون قسم",
              time: timeAgo(new Date(c.scheduledAt)),
              risk: c.status === "completed" ? "منخفض" : "متوسط",
            });
          });
        }

        if (ordersRes.ok) {
          const orders = await ordersRes.json();
          orders.slice(0, 3).forEach((o: any) => {
            items.push({
              icon: ShoppingBag,
              name: `${o.user?.firstName || ""} ${o.user?.lastName || ""}`,
              action: `طلب ${o.mealName || "وجبة"}`,
              dept: o.user?.department || "بدون قسم",
              time: timeAgo(new Date(o.orderDate)),
              risk: "منخفض",
            });
          });
        }

        setActivities(items.sort(() => Math.random() - 0.5).slice(0, 10));
      } catch (e) {
        console.error("Failed to load activities", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  function timeAgo(date: Date): string {
    const diff = Date.now() - date.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "الآن";
    if (mins < 60) return `منذ ${mins} دقيقة`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `منذ ${hours} ساعات`;
    return `منذ ${Math.floor(hours / 24)} أيام`;
  }

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
            <h1 className="text-2xl font-bold text-primary">🔔 النشاطات</h1>
            <p className="text-secondary">آخر النشاطات والتحديثات في المنصة</p>
          </div>

          <div className="shade-card p-6">
            {activities.length === 0 ? (
              <div className="text-center py-8 text-secondary">
                <Bell className="h-10 w-10 mx-auto mb-2 opacity-30" />
                <p className="text-sm">لا توجد نشاطات حديثة</p>
              </div>
            ) : (
            <div className="space-y-1">
              {activities.map((a, i) => (
                <div key={i} className="flex items-center justify-between py-3 px-3 rounded-xl hover:bg-[var(--white-warm)] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      a.risk === "حرج" ? "bg-red-500" :
                      a.risk === "مرتفع" ? "bg-orange-500" :
                      a.risk === "متوسط" ? "bg-amber-500" :
                      "bg-emerald"
                    }`} />
                    <a.icon className="h-4 w-4 text-secondary" />
                    <div>
                      <p className="text-sm font-semibold text-primary">{a.name}</p>
                      <p className="text-xs text-secondary">{a.action} · {a.dept}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted">{a.time}</span>
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
