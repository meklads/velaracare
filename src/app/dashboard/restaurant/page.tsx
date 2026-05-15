"use client";

import { useEffect, useState, useCallback } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Loader2, Users, Clock, CheckCircle, XCircle, Coffee, TrendingUp, RefreshCw, ShoppingBag } from "lucide-react";

type OrderUser = { firstName: string; lastName: string; department: string | null };
type MealPlan = { id: string; name: string; type: string; calories: number | null };

type Order = {
  id: string;
  mealName: string;
  status: string;
  notes: string | null;
  orderDate: string;
  mealPlan: MealPlan | null;
  user: OrderUser;
};

const statusConfig: Record<string, { bg: string; text: string; label: string; icon: any; nextLabel: string }> = {
  pending:    { bg: "bg-amber-100", text: "text-amber-700", label: "قيد الانتظار",  icon: Clock,        nextLabel: "ابدأ التحضير" },
  preparing:  { bg: "bg-blue-100",  text: "text-blue-700",  label: "قيد التحضير",  icon: Coffee,       nextLabel: "تجهيز" },
  ready:      { bg: "bg-emerald-100", text: "text-emerald-700", label: "جاهز",      icon: CheckCircle,  nextLabel: "توصيل" },
  delivered:  { bg: "bg-gray-100",  text: "text-gray-500",  label: "تم التسليم",   icon: CheckCircle,  nextLabel: "" },
  cancelled:  { bg: "bg-red-100",   text: "text-red-600",   label: "ملغي",         icon: XCircle,      nextLabel: "" },
};

const nextStatus: Record<string, string> = {
  pending: "preparing",
  preparing: "ready",
  ready: "delivered",
};

export default function RestaurantDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [filter, setFilter] = useState("active");

  const loadOrders = useCallback(async () => {
    try {
      const res = await fetch("/api/meals?type=orders");
      if (res.ok) setOrders(await res.json());
    } catch (e) {
      console.error("Failed to load orders", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadOrders(); }, [loadOrders]);
  // Auto-refresh every 15s
  useEffect(() => { const i = setInterval(loadOrders, 15000); return () => clearInterval(i); }, [loadOrders]);

  async function updateStatus(orderId: string, status: string) {
    setUpdating(orderId);
    try {
      const res = await fetch("/api/meals", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status }),
      });
      if (res.ok) {
        const updated = await res.json();
        setOrders((prev) => prev.map((o) => (o.id === orderId ? updated : o)));
      }
    } catch (e) {
      console.error("Update failed", e);
    } finally {
      setUpdating(null);
    }
  }

  const activeOrders = orders.filter((o) => o.status !== "delivered" && o.status !== "cancelled");

  const filteredOrders = filter === "active"
    ? activeOrders
    : filter === "all"
    ? orders
    : orders.filter((o) => o.status === filter);

  const stats = {
    pending: activeOrders.filter((o) => o.status === "pending").length,
    preparing: activeOrders.filter((o) => o.status === "preparing").length,
    ready: activeOrders.filter((o) => o.status === "ready").length,
  };

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
        <div className="container-shade py-6">
          {/* Header */}
          <div className="fade-in-up mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-primary flex items-center gap-2">🍽️ لوحة المطعم</h1>
              <p className="text-secondary mt-1">إدارة وتحضير وتوصيل الوجبات للموظفين</p>
            </div>
            <button onClick={loadOrders} className="text-sm py-2 px-4 rounded-xl border border-[var(--surface-border)] text-secondary hover:text-primary transition-all flex items-center gap-1.5">
              <RefreshCw className="h-4 w-4" /> تحديث
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: "بانتظار التحضير", value: stats.pending, color: "border-r-4 border-amber-500" },
              { label: "قيد التحضير", value: stats.preparing, color: "border-r-4 border-blue-500" },
              { label: "جاهز للتوصيل", value: stats.ready, color: "border-r-4 border-emerald-500" },
            ].map((s) => (
              <div key={s.label} className={`shade-card p-4 ${s.color}`}>
                <p className="text-2xl font-bold text-primary">{s.value}</p>
                <p className="text-xs text-secondary">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Filter Tabs */}
          <div className="fade-in-up mb-6 flex items-center gap-2 overflow-x-auto pb-2">
            {[
              { key: "active", label: `🟢 نشطة (${activeOrders.length})` },
              { key: "pending", label: `🟡 انتظار (${stats.pending})` },
              { key: "preparing", label: `🔵 تحضير (${stats.preparing})` },
              { key: "ready", label: `🟢 جاهز (${stats.ready})` },
              { key: "all", label: "📋 الكل" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`text-sm px-4 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                  filter === tab.key
                    ? "bg-emerald text-white shadow-lg shadow-emerald/20"
                    : "bg-surface-mid text-secondary hover:text-primary border border-[var(--surface-border)]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Orders List */}
          {filteredOrders.length === 0 ? (
            <div className="text-center py-16 text-secondary">
              <ShoppingBag className="h-16 w-16 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">لا توجد طلبات</p>
              <p className="text-sm mt-1">انتظر حتى يطلب الموظفون وجباتهم</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredOrders.map((order) => {
                const cfg = statusConfig[order.status] || statusConfig.pending;
                const StatusIcon = cfg.icon;
                const next = nextStatus[order.status];

                return (
                  <div key={order.id} className="shade-card p-4 fade-in-up hover:shadow-md transition-all">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className={`w-11 h-11 rounded-xl ${cfg.bg} flex items-center justify-center shrink-0`}>
                          <StatusIcon className={`h-5 w-5 ${cfg.text}`} />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-primary truncate">{order.mealName}</p>
                          <p className="text-xs text-secondary flex items-center gap-2 mt-0.5">
                            <Users className="h-3 w-3" />
                            {order.user.firstName} {order.user.lastName}
                            {order.user.department && <><span className="opacity-30">|</span> {order.user.department}</>}
                            <span className="opacity-30">|</span>
                            <Clock className="h-3 w-3" />
                            {new Date(order.orderDate).toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`tag text-xs py-1 px-3 ${cfg.bg} ${cfg.text} rounded-lg font-medium`}>{cfg.label}</span>
                        {next && (
                          <button
                            onClick={() => updateStatus(order.id, next)}
                            disabled={updating === order.id}
                            className="text-xs py-1.5 px-4 rounded-lg bg-emerald text-white hover:bg-emerald-dark transition-all disabled:opacity-50 font-medium flex items-center gap-1 shadow-lg shadow-emerald/20"
                          >
                            {updating === order.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <>{cfg.nextLabel} ←</>}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
