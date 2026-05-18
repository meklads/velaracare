"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Loader2, Users, Clock, CheckCircle, XCircle, Coffee,
  TrendingUp, RefreshCw, ShoppingBag, Wifi, WifiOff,
  Timer, Volume2, VolumeX, Zap, AlertTriangle, Star, ChevronLeft
} from "lucide-react";
import { SkeletonKPIGrid, SkeletonCard, SkeletonBlock } from "@/components/ui/skeleton";
import { useSSE } from "@/lib/useSSE";

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

// ── Thresholds for elapsed time warnings (in minutes) ──
const TIME_THRESHOLDS = {
  pending:    { warning: 5,  critical: 12 },
  preparing:  { warning: 10, critical: 20 },
  ready:      { warning: 8,  critical: 15 },
};

// ── Web Audio API: play notification chime ──
function playNewOrderSound() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const now = ctx.currentTime;

    // Chime — two-tone ascending sine wave
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = "sine";
    osc.frequency.setValueAtTime(880, now);         // A5
    osc.frequency.setValueAtTime(1108.73, now + 0.12); // C#6
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

    osc.start(now);
    osc.stop(now + 0.4);

    // Auto-close after sound ends
    setTimeout(() => ctx.close(), 500);
  } catch {
    // Silently fail if audio not supported
  }
}

// ── Format elapsed time for display ──
function formatElapsed(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const mins = Math.floor(totalSec / 60);
  const secs = totalSec % 60;
  if (mins >= 60) {
    const hrs = Math.floor(mins / 60);
    return `${hrs}s ${mins % 60}d`;
  }
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function RestaurantDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [filter, setFilter] = useState("active");
  const [connected, setConnected] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [newOrderIds, setNewOrderIds] = useState<Set<string>>(new Set());
  const [now, setNow] = useState(Date.now());

  // ── Known order IDs (ref to avoid re-renders) ──
  const knownIdsRef = useRef<Set<string>>(new Set());
  const newOrderTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Timer: update every second ──
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  // ── Initial load ──
  const loadOrders = useCallback(async () => {
    try {
      const res = await fetch("/api/meals?type=orders");
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
        knownIdsRef.current = new Set(data.map((o: Order) => o.id));
      }
    } catch (e) {
      console.error("Failed to load orders", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadOrders(); }, [loadOrders]);

  // ── SSE for real-time updates ──
  useSSE("orders", (event: any) => {
    if (event.type === "connected") {
      setConnected(true);
    }
    if (event.type === "orders_update") {
      const incoming: Order[] = event.orders || [];

      // Detect truly new orders (brand-new IDs)
      const currentKnown = knownIdsRef.current;
      const freshIds = incoming
        .filter((o: Order) => !currentKnown.has(o.id) && (o.status === "pending" || o.status === "preparing"))
        .map((o: Order) => o.id);

      if (freshIds.length > 0 && audioEnabled) {
        playNewOrderSound();
      }

      // Flash effect for new pending/preparing orders
      if (freshIds.length > 0) {
        setNewOrderIds(new Set(freshIds));
        if (newOrderTimeoutRef.current) clearTimeout(newOrderTimeoutRef.current);
        newOrderTimeoutRef.current = setTimeout(() => setNewOrderIds(new Set()), 4000);
      }

      setOrders(incoming);
      knownIdsRef.current = new Set(incoming.map((o: Order) => o.id));
      setConnected(true);
    }
  });

  // ── Update order status ──
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

  // ── Computed stats ──
  const activeOrders = orders.filter((o) => o.status !== "delivered" && o.status !== "cancelled");
  const todayStr = new Date().toISOString().split("T")[0];
  const todayOrders = orders.filter((o) => o.orderDate?.startsWith(todayStr));
  const todayCompleted = todayOrders.filter((o) => o.status === "delivered");
  const todayPending = todayOrders.filter((o) => o.status === "pending");

  // Average prep time (orderDate → delivered) for today's completed
  let avgPrepMin = 0;
  if (todayCompleted.length > 0) {
    const totalMin = todayCompleted.reduce((sum, o) => {
      const ordered = new Date(o.orderDate).getTime();
      // Use now as proxy since we don't have a completion timestamp
      const elapsed = (now - ordered) / 60000;
      return sum + Math.min(elapsed, 60); // cap at 60min for sanity
    }, 0);
    avgPrepMin = Math.round(totalMin / todayCompleted.length);
  }

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

  // ── Loading state ──
  if (loading) {
    return (
      <div className="min-h-screen bg-surface-mid pt-24">
        <div className="container-shade py-6">
          <div className="mb-6"><SkeletonBlock width="200px" height="28px" /></div>
          <SkeletonKPIGrid count={5} />
          <div className="mt-6"><SkeletonCard lines={6} /></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface-mid pt-24 pb-12" dir="rtl">
        <div className="container-shade py-6">
          {/* ── Header ── */}
          <div className="fade-in-up mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Link href="/dashboard/restaurant" className="text-sm text-emerald hover:underline inline-flex items-center gap-1">
                  <ChevronLeft className="h-4 w-4" /> العودة
                </Link>
              </div>
              <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
                🍽️ لوحة المطبخ
              </h1>
              <p className="text-secondary mt-1">نظام عرض وإدارة الطلبات — عرض المطبخ المباشر</p>
            </div>
            <div className="flex items-center gap-3">
              {/* Sound toggle */}
              <button
                onClick={() => setAudioEnabled(!audioEnabled)}
                className={`text-sm p-2 rounded-xl transition-all ${
                  audioEnabled
                    ? "bg-emerald-soft text-emerald-dark border border-emerald-200"
                    : "bg-surface-mid text-secondary border border-[var(--surface-border)]"
                }`}
                title={audioEnabled ? "الصوت مفعل" : "الصوت معطل"}
              >
                {audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </button>
              {/* Connection status */}
              <span className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-colors ${
                connected ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
              }`}>
                {connected ? <Wifi className="h-3.5 w-3.5" /> : <WifiOff className="h-3.5 w-3.5" />}
                {connected ? "مباشر" : "غير متصل"}
              </span>
              <button onClick={loadOrders} className="text-sm py-2 px-4 rounded-xl border border-[var(--surface-border)] text-secondary hover:text-primary transition-all flex items-center gap-1.5">
                <RefreshCw className="h-4 w-4" /> تحديث
              </button>
            </div>
          </div>

          {/* ── Enhanced Stats Bar ── */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
            {[
              { label: "بانتظار التحضير", value: stats.pending, color: "border-r-4 border-amber-500", icon: Clock },
              { label: "قيد التحضير", value: stats.preparing, color: "border-r-4 border-blue-500", icon: Coffee },
              { label: "جاهز للتوصيل", value: stats.ready, color: "border-r-4 border-emerald-500", icon: CheckCircle },
              { label: "مكتمل اليوم", value: todayCompleted.length, color: "border-r-4 border-gray-500", icon: TrendingUp },
              { label: "متوسط الوقت", value: avgPrepMin ? `${avgPrepMin} د` : "—", color: "border-r-4 border-purple-500", icon: Timer },
            ].map((s) => (
              <div key={s.label} className={`shade-card p-3 ${s.color}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xl font-bold text-primary">{s.value}</p>
                    <p className="text-xs text-secondary">{s.label}</p>
                  </div>
                  <s.icon className="h-5 w-5 text-secondary opacity-40" />
                </div>
              </div>
            ))}
          </div>

          {/* ── Filter Tabs ── */}
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

          {/* ── Orders Grid (Kitchen Display) ── */}
          {filteredOrders.length === 0 ? (
            <div className="text-center py-16 text-secondary">
              <ShoppingBag className="h-16 w-16 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">لا توجد طلبات</p>
              <p className="text-sm mt-1">انتظر حتى يطلب الموظفون وجباتهم</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {filteredOrders.map((order) => {
                const cfg = statusConfig[order.status] || statusConfig.pending;
                const StatusIcon = cfg.icon;
                const next = nextStatus[order.status];
                const isNew = newOrderIds.has(order.id);

                // ── Elapsed time calculation ──
                const orderTime = new Date(order.orderDate).getTime();
                const elapsedMs = now - orderTime;
                const elapsedMins = Math.floor(elapsedMs / 60000);
                const elapsedFormatted = formatElapsed(elapsedMs);

                // ── Time-based urgency ──
                const thresholds = TIME_THRESHOLDS[order.status as keyof typeof TIME_THRESHOLDS] || TIME_THRESHOLDS.pending;
                const isUrgent = elapsedMins >= thresholds.critical;
                const isWarning = elapsedMins >= thresholds.warning && !isUrgent;

                // ── Glow / flash classes ──
                let glowClass = "";
                if (isNew) glowClass = "animate-new-order-glow shadow-[0_0_24px_rgba(16,185,129,0.35)]";
                else if (isUrgent) glowClass = "animate-urgent-glow shadow-[0_0_20px_rgba(239,68,68,0.3)]";
                else if (isWarning) glowClass = "shadow-[0_0_12px_rgba(245,158,11,0.2)]";

                // ── Time display color ──
                let timeColor = "text-secondary";
                if (isUrgent) timeColor = "text-red-500 font-bold";
                else if (isWarning) timeColor = "text-amber-500 font-bold";

                return (
                  <div
                    key={order.id}
                    className={`shade-card p-4 transition-all duration-500 hover:shadow-md ${glowClass} ${
                      isNew ? "ring-2 ring-emerald-400/50" : ""
                    } ${isUrgent ? "ring-1 ring-red-400/40" : ""}`}
                  >
                    {/* Header row: icon + status + time */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-10 h-10 rounded-xl ${cfg.bg} flex items-center justify-center shrink-0`}>
                          <StatusIcon className={`h-5 w-5 ${cfg.text}`} />
                        </div>
                        <div>
                          <p className="font-bold text-primary text-sm leading-tight">{order.mealName}</p>
                          <span className={`tag text-[11px] py-0.5 px-2 ${cfg.bg} ${cfg.text} rounded-md font-medium`}>
                            {cfg.label}
                          </span>
                        </div>
                      </div>
                      {/* Elapsed timer */}
                      <div className={`flex items-center gap-1 shrink-0 text-xs font-mono ${timeColor} bg-black/5 dark:bg-white/5 rounded-lg px-2 py-1`}>
                        <Timer className="h-3.5 w-3.5" />
                        <span dir="ltr">{elapsedFormatted}</span>
                      </div>
                    </div>

                    {/* Employee info */}
                    <div className="flex items-center gap-1.5 text-xs text-secondary mb-3">
                      <Users className="h-3 w-3" />
                      <span className="font-medium">{order.user.firstName} {order.user.lastName}</span>
                      {order.user.department && (
                        <>
                          <span className="opacity-30">|</span>
                          <span>{order.user.department}</span>
                        </>
                      )}
                      <span className="opacity-30 mr-auto">
                        {new Date(order.orderDate).toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>

                    {/* Urgency / warning badge */}
                    <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                      {isNew && (
                        <span className="text-[11px] py-0.5 px-2 rounded-full bg-emerald-500/15 text-emerald-600 font-semibold flex items-center gap-1 animate-pulse">
                          <Zap className="h-3 w-3" /> جديد
                        </span>
                      )}
                      {isUrgent && (
                        <span className="text-[11px] py-0.5 px-2 rounded-full bg-red-500/15 text-red-600 font-semibold flex items-center gap-1 animate-pulse">
                          <AlertTriangle className="h-3 w-3" /> متأخر
                        </span>
                      )}
                      {isWarning && !isNew && (
                        <span className="text-[11px] py-0.5 px-2 rounded-full bg-amber-500/15 text-amber-600 font-semibold flex items-center gap-1">
                          <Timer className="h-3 w-3" /> {elapsedMins} د
                        </span>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2">
                      {next && (
                        <button
                          onClick={() => updateStatus(order.id, next)}
                          disabled={updating === order.id}
                          className="flex-1 text-xs py-2 rounded-lg bg-emerald text-white hover:bg-emerald-dark transition-all disabled:opacity-50 font-semibold flex items-center justify-center gap-1 shadow-lg shadow-emerald/20"
                        >
                          {updating === order.id ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            <>{cfg.nextLabel} ←</>
                          )}
                        </button>
                      )}
                      {(order.status === "pending" || order.status === "preparing") && !next && (
                        <button
                          onClick={() => updateStatus(order.id, "cancelled")}
                          disabled={updating === order.id}
                          className="text-xs py-1.5 px-3 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-all disabled:opacity-50 font-medium"
                        >
                          {updating === order.id ? <Loader2 className="h-3 w-3 animate-spin" /> : "إلغاء"}
                        </button>
                      )}
                      {order.notes && (
                        <span className="text-[10px] text-secondary bg-surface-mid rounded-md px-2 py-1 truncate max-w-[120px]">
                          📝 {order.notes}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ── Today's completion summary ── */}
          {todayCompleted.length > 0 && (
            <div className="mt-8 shade-card p-4">
              <h3 className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
                <Star className="h-4 w-4 text-amber-400" />
                ملخص اليوم — {todayCompleted.length} طلب مكتمل
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-surface-mid rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-emerald">{todayCompleted.length}</p>
                  <p className="text-secondary">مكتمل</p>
                </div>
                <div className="bg-surface-mid rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-amber-600">{todayPending.length}</p>
                  <p className="text-secondary">معلق</p>
                </div>
                <div className="bg-surface-mid rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-primary">{avgPrepMin ? `${avgPrepMin} د` : "—"}</p>
                  <p className="text-secondary">متوسط التحضير</p>
                </div>
                <div className="bg-surface-mid rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-primary">
                    {orders.filter((o) => o.status === "delivered" || o.status === "cancelled").length}
                  </p>
                  <p className="text-secondary">الإجمالي</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />

      {/* ── Keyframes for glow animations ── */}
      <style>{`
        @keyframes new-order-glow {
          0%, 100% { box-shadow: 0 0 8px rgba(16,185,129,0.2); }
          50% { box-shadow: 0 0 28px rgba(16,185,129,0.5); }
        }
        @keyframes urgent-glow {
          0%, 100% { box-shadow: 0 0 8px rgba(239,68,68,0.2); }
          50% { box-shadow: 0 0 24px rgba(239,68,68,0.45); }
        }
        .animate-new-order-glow {
          animation: new-order-glow 1.5s ease-in-out infinite;
        }
        .animate-urgent-glow {
          animation: urgent-glow 1.5s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
