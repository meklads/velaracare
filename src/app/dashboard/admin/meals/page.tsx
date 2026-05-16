"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Loader2, ChevronLeft, Apple, TrendingUp, Users, UtensilsCrossed, Search, Plus, ArrowUpRight, Clock, Filter, X } from "lucide-react";

// ⚡ Don't pre-render at build time — DB is only available at runtime
export const dynamic = "force-dynamic";

type MealPlan = {
  id: string;
  name: string;
  description: string | null;
  type: string;
  calories: number | null;
  isActive: boolean;
  createdAt: string;
  _count: { orders: number };
};

const typeLabels: Record<string, string> = {
  diabetic: "السكري",
  weight_loss: "تخفيف الوزن",
  high_performance: "أداء عالي",
  general: "عام",
  vegan: "نباتي",
};

const typeColors: Record<string, string> = {
  diabetic: "bg-rose-100 text-rose-700",
  weight_loss: "bg-amber-100 text-amber-700",
  high_performance: "bg-blue-100 text-blue-700",
  general: "bg-emerald-100 text-emerald-700",
  vegan: "bg-purple-100 text-purple-700",
};

const typeIcons: Record<string, string> = { diabetic: "🩺", weight_loss: "⚖️", high_performance: "⚡", general: "🍱", vegan: "🥗" };

export default function AdminMealsPage() {
  const [plans, setPlans] = useState<MealPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [adding, setAdding] = useState(false);
  const [addMsg, setAddMsg] = useState("");
  const [newMeal, setNewMeal] = useState({ name: "", description: "", type: "general", calories: "" });

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
  const activePlans = plans.filter((p) => p.isActive).length;
  const totalCalories = plans.reduce((s, p) => s + (p.calories || 0), 0);
  const avgCalories = plans.length ? Math.round(totalCalories / plans.length) : 0;

  const filtered = plans.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.description || "").toLowerCase().includes(search.toLowerCase())
  );

  async function handleAddMeal(e: React.FormEvent) {
    e.preventDefault();
    if (!newMeal.name) return;
    setAdding(true);
    setAddMsg("");
    try {
      const res = await fetch("/api/meals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newMeal.name,
          description: newMeal.description || null,
          type: newMeal.type,
          calories: newMeal.calories ? parseInt(newMeal.calories) : null,
        }),
      });
      if (res.ok) {
        const created = await res.json();
        setPlans((prev) => [{ ...created, _count: { orders: 0 } }, ...prev]);
        setAddMsg("✅ تم إضافة الوجبة بنجاح!");
        setNewMeal({ name: "", description: "", type: "general", calories: "" });
        setShowAdd(false);
        setTimeout(() => setAddMsg(""), 3000);
      } else {
        const err = await res.json();
        setAddMsg(`❌ ${err.error || "حدث خطأ"}`);
      }
    } catch {
      setAddMsg("❌ حدث خطأ في الاتصال");
    } finally {
      setAdding(false);
    }
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
          {/* Breadcrumb */}
          <div className="fade-in-up mb-6">
            <Link href="/dashboard/admin" className="text-sm text-emerald hover:underline inline-flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" /> العودة للوحة التحكم
            </Link>
          </div>

          {/* Header */}
          <div className="fade-in-up mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
                <Apple className="h-7 w-7 text-emerald" />
                إدارة الوجبات
              </h1>
              <p className="text-secondary mt-1">
                خطط وجبات صحية مخصصة للموظفين حسب احتياجاتهم
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard/employee/meals"
                className="text-sm py-2.5 px-4 rounded-xl border border-[var(--surface-border)] text-secondary hover:text-primary hover:border-emerald/30 transition-all flex items-center gap-1.5"
              >
                👁️ معاينة المينيو
              </Link>
              <Link
                href="/dashboard/restaurant"
                className="text-sm py-2.5 px-4 rounded-xl border border-[var(--surface-border)] text-secondary hover:text-primary hover:border-emerald/30 transition-all flex items-center gap-1.5"
              >
                🧑‍🍳 المطعم
              </Link>
              <button onClick={() => setShowAdd(true)} className="btn-primary text-sm py-2.5 px-5">
                <Plus className="ml-2 h-4 w-4" />
                إضافة وجبة جديدة
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "إجمالي الخطط", value: plans.length, icon: UtensilsCrossed, color: "from-emerald-ai to-emerald-ai-dark" },
              { label: "الخطط النشطة", value: activePlans, icon: TrendingUp, color: "from-blue-500 to-indigo-600" },
              { label: "إجمالي الطلبات", value: totalOrders, icon: Users, color: "from-rose-500 to-pink-600" },
              { label: "متوسط السعرات", value: `${avgCalories}`, suffix: "kcal", icon: Apple, color: "from-amber-500 to-orange-600" },
            ].map((stat, i) => (
              <div key={stat.label} className={`shade-card p-5 ${i === 0 ? "fade-in-up-delay-1" : i === 1 ? "fade-in-up-delay-2" : i === 2 ? "fade-in-up-delay-3" : "fade-in-up-delay-4"}`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                </div>
                <p className="stat-number text-primary">{stat.value}</p>
                <p className="text-xs text-[var(--text-muted)] mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Meal Plans Table */}
          <div className="shade-card p-6 fade-in-up-delay-3">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <h2 className="font-bold text-primary text-lg">📋 خطط الوجبات</h2>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary pointer-events-none" />
                  <input
                    type="text"
                    placeholder="بحث عن وجبة..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-56 rounded-xl border border-[var(--surface-border)] bg-surface-mid pr-10 px-4 py-2 text-sm text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-emerald-ai/30 transition-all"
                  />
                </div>
                <button className="text-sm text-secondary hover:text-primary transition-colors flex items-center gap-1.5 border border-[var(--surface-border)] rounded-xl px-3 py-2">
                  <Filter className="h-4 w-4" />
                  تصفية
                </button>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-12 text-secondary">
                <UtensilsCrossed className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p>لا توجد خطط وجبات بعد</p>
                <p className="text-xs mt-1">أضف أول وجبة الآن</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--surface-border)]">
                      <th className="text-right py-3 text-secondary font-medium">الاسم</th>
                      <th className="text-right py-3 text-secondary font-medium">النوع</th>
                      <th className="text-right py-3 text-secondary font-medium">السعرات</th>
                      <th className="text-right py-3 text-secondary font-medium">الطلبات</th>
                      <th className="text-right py-3 text-secondary font-medium">الحالة</th>
                      <th className="text-right py-3 text-secondary font-medium">تاريخ الإضافة</th>
                      <th className="text-right py-3 text-secondary font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((plan) => (
                      <tr key={plan.id} className="border-b border-[var(--surface-border)] last:border-0 hover:bg-[var(--white-warm)] transition-colors">
                        <td className="py-3.5">
                          <div className="flex items-center gap-2.5">
                            <span className="text-xl">{typeIcons[plan.type] || "🍽️"}</span>
                            <div>
                              <p className="font-semibold text-primary">{plan.name}</p>
                              {plan.description && (
                                <p className="text-xs text-secondary mt-0.5">{plan.description}</p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5">
                          <span className={`tag text-xs py-0.5 px-2.5 rounded-lg ${typeColors[plan.type] || "bg-gray-100 text-gray-700"}`}>
                            {typeLabels[plan.type] || plan.type}
                          </span>
                        </td>
                        <td className="py-3.5 text-secondary font-medium">{plan.calories ? `${plan.calories} kcal` : "—"}</td>
                        <td className="py-3.5">
                          <span className="font-semibold text-primary">{plan._count.orders}</span>
                          <span className="text-xs text-secondary mr-1">طلب</span>
                        </td>
                        <td className="py-3.5">
                          <span className={`tag text-xs py-0.5 px-3 ${plan.isActive ? "bg-emerald-soft text-emerald-dark" : "bg-gray-100 text-gray-500"}`}>
                            {plan.isActive ? "نشط" : "غير نشط"}
                          </span>
                        </td>
                        <td className="py-3.5 text-secondary text-xs">
                          {new Date(plan.createdAt).toLocaleDateString("ar-SA")}
                        </td>
                        <td className="py-3.5">
                          <div className="flex items-center gap-2">
                            <button className="text-xs text-emerald hover:underline font-medium">تعديل</button>
                            <button className="text-xs text-rose-500 hover:underline font-medium">حذف</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Bottom Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="shade-card p-5 fade-in-up-delay-3">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-ai to-emerald-ai-dark flex items-center justify-center">
                  <Clock className="h-4 w-4 text-white" />
                </div>
                <h3 className="font-bold text-primary text-sm">أوقات التقديم</h3>
              </div>
              <div className="space-y-2 text-sm text-secondary">
                <p className="flex justify-between"><span>الفطور</span><span className="font-medium text-primary">٧:٣٠ – ٩:٠٠ ص</span></p>
                <p className="flex justify-between"><span>الغداء</span><span className="font-medium text-primary">١٢:٠٠ – ٢:٠٠ م</span></p>
                <p className="flex justify-between"><span>العشاء</span><span className="font-medium text-primary">٦:٠٠ – ٨:٠٠ م</span></p>
              </div>
            </div>

            <div className="shade-card p-5 fade-in-up-delay-3">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <ArrowUpRight className="h-4 w-4 text-white" />
                </div>
                <h3 className="font-bold text-primary text-sm">الأكثر طلباً</h3>
              </div>
              {plans.length > 0 ? (
                <div className="space-y-2">
                  {[...plans]
                    .sort((a, b) => b._count.orders - a._count.orders)
                    .slice(0, 3)
                    .map((p, i) => (
                      <div key={p.id} className="flex items-center justify-between text-sm">
                        <span className="text-secondary flex items-center gap-2">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                            i === 0 ? "bg-amber-500" : i === 1 ? "bg-gray-400" : "bg-amber-700"
                          }`}>{i + 1}</span>
                          {p.name}
                        </span>
                        <span className="font-medium text-primary">{p._count.orders} طلب</span>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-sm text-secondary">لا توجد طلبات بعد</p>
              )}
            </div>

            <div className="shade-card p-5 fade-in-up-delay-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <h3 className="font-bold text-primary text-sm">إحصائيات سريعة</h3>
              </div>
              <div className="space-y-2 text-sm">
                <p className="flex justify-between"><span className="text-secondary">إجمالي الموظفين</span><span className="font-medium text-primary">٢٤٠</span></p>
                <p className="flex justify-between"><span className="text-secondary">معدل الالتزام بالوجبات</span><span className="font-medium text-primary">٦٨٪</span></p>
                <p className="flex justify-between"><span className="text-secondary">الوجبات المقدمة اليوم</span><span className="font-medium text-primary">١٢٤</span></p>
              </div>
            </div>
          </div>

          {/* Success Message */}
          {addMsg && (
            <div className="fixed bottom-6 right-6 z-50 rounded-xl px-5 py-3 text-sm font-medium shadow-lg"
              style={{ backgroundColor: addMsg.includes("✅") ? "rgba(16,185,129,0.95)" : "rgba(239,68,68,0.95)", color: "#fff" }}
            >
              {addMsg}
            </div>
          )}

          {/* Add Meal Modal */}
          {showAdd && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setShowAdd(false)}>
              <div className="shade-card w-full max-w-md p-6 m-4" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-primary text-lg">🍽️ إضافة وجبة جديدة</h2>
                  <button onClick={() => setShowAdd(false)} className="text-secondary hover:text-primary transition-colors">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <form onSubmit={handleAddMeal} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-primary">اسم الوجبة</label>
                    <input
                      type="text"
                      value={newMeal.name}
                      onChange={(e) => setNewMeal((p) => ({ ...p, name: e.target.value }))}
                      placeholder="وجبة الدجاج المشوي"
                      required
                      className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-emerald-ai/30"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-primary">الوصف</label>
                    <textarea
                      value={newMeal.description}
                      onChange={(e) => setNewMeal((p) => ({ ...p, description: e.target.value }))}
                      placeholder="دجاج مشوي مع أرز بني وخضار موسمية"
                      rows={2}
                      className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-emerald-ai/30 resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-primary">نوع الوجبة</label>
                      <select
                        value={newMeal.type}
                        onChange={(e) => setNewMeal((p) => ({ ...p, type: e.target.value }))}
                        className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-emerald-ai/30"
                      >
                        <option value="general">عام</option>
                        <option value="diabetic">السكري</option>
                        <option value="weight_loss">تخفيف الوزن</option>
                        <option value="high_performance">أداء عالي</option>
                        <option value="vegan">نباتي</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-primary">السعرات (kcal)</label>
                      <input
                        type="number"
                        value={newMeal.calories}
                        onChange={(e) => setNewMeal((p) => ({ ...p, calories: e.target.value }))}
                        placeholder="٤٥٠"
                        className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-emerald-ai/30"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAdd(false)}
                      className="flex-1 py-2.5 rounded-xl border border-[var(--surface-border)] text-secondary text-sm hover:text-primary transition-all"
                    >
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      disabled={adding || !newMeal.name}
                      className="flex-1 py-2.5 rounded-xl bg-emerald text-white text-sm font-semibold hover:bg-emerald-dark transition-all disabled:opacity-50 flex items-center justify-center gap-1"
                    >
                      {adding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                      {adding ? "جاري الإضافة..." : "إضافة الوجبة"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
