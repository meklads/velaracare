"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Loader2, ChevronLeft, Apple, Clock, CheckCircle, XCircle, ShoppingCart, Sparkles, Coffee, Sun, Moon } from "lucide-react";

type MealPlan = {
  id: string;
  name: string;
  description: string | null;
  type: string;
  calories: number | null;
  isActive: boolean;
};

type MealOrder = {
  id: string;
  mealPlanId: string | null;
  mealName: string;
  status: string;
  notes: string | null;
  orderDate: string;
  mealPlan: MealPlan | null;
};

const typeLabels: Record<string, string> = {
  diabetic: "السكري",
  weight_loss: "تخفيف الوزن",
  high_performance: "أداء عالي",
  general: "عام",
  vegan: "نباتي",
};

const typeEmojis: Record<string, string> = {
  diabetic: "🩺",
  weight_loss: "⚖️",
  high_performance: "⚡",
  general: "🍱",
  vegan: "🥗",
};

const typeColors: Record<string, string> = {
  diabetic: "from-rose-500 to-pink-600",
  weight_loss: "from-amber-500 to-orange-600",
  high_performance: "from-blue-500 to-indigo-600",
  general: "from-emerald-500 to-emerald-600",
  vegan: "from-purple-500 to-violet-600",
};

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  pending: { label: "قيد الانتظار", color: "bg-amber-100 text-amber-700", icon: Clock },
  preparing: { label: "قيد التحضير", color: "bg-blue-100 text-blue-700", icon: Coffee },
  ready: { label: "جاهز", color: "bg-emerald-100 text-emerald-700", icon: CheckCircle },
  delivered: { label: "تم التسليم", color: "bg-gray-100 text-gray-500", icon: CheckCircle },
  cancelled: { label: "ملغي", color: "bg-red-100 text-red-600", icon: XCircle },
};

const mealTimes = [
  { name: "الفطور", time: "٧:٣٠ – ٩:٠٠ ص", emoji: "🌅", icon: Sun },
  { name: "الغداء", time: "١٢:٠٠ – ٢:٠٠ م", emoji: "☀️", icon: Sun },
  { name: "العشاء", time: "٦:٠٠ – ٨:٠٠ م", emoji: "🌙", icon: Moon },
];

export default function EmployeeMealsPage() {
  const { data: session } = useSession();
  const [plans, setPlans] = useState<MealPlan[]>([]);
  const [orders, setOrders] = useState<MealOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [ordering, setOrdering] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    async function load() {
      try {
        const [plansRes, ordersRes] = await Promise.all([
          fetch("/api/meals"),
          fetch("/api/meals?type=orders"),
        ]);
        if (plansRes.ok) setPlans(await plansRes.json());
        if (ordersRes.ok) setOrders(await ordersRes.json());
      } catch (e) {
        console.error("Failed to load meals", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function placeOrder(plan: MealPlan) {
    setOrdering(plan.id);
    setSuccessMsg("");
    try {
      const res = await fetch("/api/meals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "order", mealPlanId: plan.id, mealName: plan.name }),
      });
      if (res.ok) {
        const newOrder = await res.json();
        setOrders((prev) => [newOrder, ...prev]);
        setSuccessMsg(`✅ تم طلب "${plan.name}" بنجاح!`);
        setTimeout(() => setSuccessMsg(""), 3000);
      }
    } catch (e) {
      console.error("Order failed", e);
    } finally {
      setOrdering(null);
    }
  }

  const categories = ["all", ...new Set(plans.map((p) => p.type))];
  const filteredPlans = selectedCategory === "all" ? plans : plans.filter((p) => p.type === selectedCategory);

  const activeOrders = orders.filter((o) => o.status !== "delivered" && o.status !== "cancelled");
  const pastOrders = orders.filter((o) => o.status === "delivered" || o.status === "cancelled");

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
      <main className="min-h-screen bg-surface-mid pt-24 pb-12">
        <div className="container-shade py-8">
          {/* Breadcrumb */}
          <div className="fade-in-up mb-6">
            <Link href="/dashboard/employee" className="text-sm text-emerald hover:underline inline-flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" /> العودة للوحة التحكم
            </Link>
          </div>

          {/* Header */}
          <div className="fade-in-up mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
                <Apple className="h-7 w-7 text-emerald" />
                قائمة الوجبات
              </h1>
              <p className="text-secondary mt-1">
                اختر وجبتك المفضلة من القائمة الصحية
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-secondary bg-surface-mid px-4 py-2 rounded-xl border border-[var(--surface-border)]">
              <ShoppingCart className="h-4 w-4 text-emerald" />
              <span>طلباتي النشطة: <strong className="text-primary">{activeOrders.length}</strong></span>
            </div>
          </div>

          {/* Success Message */}
          {successMsg && (
            <div className="fade-in-up mb-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-5 py-3 text-sm text-emerald-600 text-center font-medium">
              {successMsg}
            </div>
          )}

          {/* Meal Times */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {mealTimes.map((mt) => (
              <div key={mt.name} className="shade-card p-3 text-center fade-in-up-delay-1">
                <mt.icon className="h-5 w-5 mx-auto mb-1 text-emerald" />
                <p className="text-xs font-semibold text-primary">{mt.name}</p>
                <p className="text-[10px] text-secondary">{mt.time}</p>
              </div>
            ))}
          </div>

          {/* Category Filter */}
          <div className="fade-in-up-delay-1 mb-6 flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-sm px-4 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-emerald text-white shadow-lg shadow-emerald/20"
                    : "bg-surface-mid text-secondary hover:text-primary border border-[var(--surface-border)]"
                }`}
              >
                {cat === "all" ? "📋 الكل" : `${typeEmojis[cat] || "🍽️"} ${typeLabels[cat] || cat}`}
              </button>
            ))}
          </div>

          {/* Menu Grid */}
          {filteredPlans.length === 0 ? (
            <div className="text-center py-16 text-secondary">
              <Coffee className="h-16 w-16 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">لا توجد وجبات متاحة حالياً</p>
              <p className="text-sm mt-1">تواصل مع قسم الموارد البشرية لإضافة وجبات جديدة</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-5 mb-10">
              {filteredPlans.map((plan, i) => (
                <div key={plan.id} className={`shade-card p-5 fade-in-up-delay-${Math.min(i + 1, 4)} hover:shadow-lg transition-all`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${typeColors[plan.type] || "from-emerald-500 to-emerald-600"} flex items-center justify-center text-2xl shrink-0`}>
                      {typeEmojis[plan.type] || "🍽️"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-bold text-primary text-lg">{plan.name}</h3>
                          <span className="tag text-[11px] py-0.5 px-2 rounded-md bg-white/50 text-secondary border border-[var(--surface-border)]">
                            {typeLabels[plan.type] || plan.type}
                          </span>
                        </div>
                        {plan.calories && (
                          <span className="text-sm font-semibold text-secondary bg-surface-mid px-2.5 py-1 rounded-lg whitespace-nowrap">
                            🔥 {plan.calories} kcal
                          </span>
                        )}
                      </div>
                      {plan.description && (
                        <p className="text-sm text-secondary mt-2 line-clamp-2">{plan.description}</p>
                      )}
                      <button
                        onClick={() => placeOrder(plan)}
                        disabled={ordering === plan.id || !plan.isActive}
                        className={`mt-3 w-full py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                          !plan.isActive
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : ordering === plan.id
                            ? "bg-emerald/80 text-white cursor-wait"
                            : "bg-emerald text-white hover:bg-emerald-dark active:scale-[0.98] shadow-lg shadow-emerald/20"
                        }`}
                      >
                        {ordering === plan.id ? (
                          <><Loader2 className="h-4 w-4 animate-spin" /> جاري الطلب...</>
                        ) : !plan.isActive ? (
                          "غير متاح حالياً"
                        ) : (
                          <><ShoppingCart className="h-4 w-4" /> اطلب الآن</>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Active Orders */}
          {activeOrders.length > 0 && (
            <div className="fade-in-up-delay-3 mb-8">
              <h2 className="font-bold text-primary text-lg mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-emerald" />
                طلباتي النشطة
              </h2>
              <div className="space-y-3">
                {activeOrders.map((order) => {
                  const cfg = statusConfig[order.status] || statusConfig.pending;
                  const StatusIcon = cfg.icon;
                  return (
                    <div key={order.id} className="shade-card p-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl ${cfg.color.split(" ")[0]} flex items-center justify-center`}>
                          <StatusIcon className={`h-5 w-5 ${cfg.color.split(" ")[1]}`} />
                        </div>
                        <div>
                          <p className="font-semibold text-primary">{order.mealName}</p>
                          <p className="text-xs text-secondary">{new Date(order.orderDate).toLocaleString("ar-SA")}</p>
                        </div>
                      </div>
                      <span className={`tag text-xs py-1 px-3 ${cfg.color} whitespace-nowrap`}>
                        {cfg.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Past Orders */}
          {pastOrders.length > 0 && (
            <details className="fade-in-up-delay-4 shade-card p-4">
              <summary className="cursor-pointer text-sm font-medium text-secondary select-none">
                📦 طلبات سابقة ({pastOrders.length})
              </summary>
              <div className="mt-4 space-y-2">
                {pastOrders.slice(0, 10).map((order) => {
                  const cfg = statusConfig[order.status] || statusConfig.delivered;
                  return (
                    <div key={order.id} className="flex items-center justify-between text-sm py-2 border-b border-[var(--surface-border)] last:border-0">
                      <span className="text-primary">{order.mealName}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-secondary">{new Date(order.orderDate).toLocaleDateString("ar-SA")}</span>
                        <span className={`tag text-[11px] py-0.5 px-2 ${cfg.color}`}>{cfg.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </details>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}