"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Loader2, ChevronLeft, Clock, CheckCircle, XCircle, ShoppingCart, Coffee, Sun, Moon, Sparkles, Flame, Timer, ShoppingBag, TrendingUp, Award, UtensilsCrossed, Info, ChevronDown, Search, Filter } from "lucide-react";

// ── Types ──
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

// ── Meal config ──
const typeConfig: Record<string, {
  label: string;
  emoji: string;
  gradient: string;
  image: string;
  macros: { protein: number; carbs: number; fat: number };
  tags: string[];
  planSummary: string;
}> = {
  diabetic: {
    label: "السكري",
    emoji: "🩺",
    gradient: "from-rose-500 to-pink-500",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop",
    macros: { protein: 28, carbs: 30, fat: 15 },
    tags: ["منخفض السكر", "غني بالألياف"],
    planSummary: "وجبات متوازنة منخفضة السكر تناسب مرضى السكري",
  },
  weight_loss: {
    label: "تخفيف الوزن",
    emoji: "⚖️",
    gradient: "from-amber-500 to-orange-500",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&h=400&fit=crop",
    macros: { protein: 35, carbs: 25, fat: 12 },
    tags: ["قليل السعرات", "عالي البروتين"],
    planSummary: "سعرات حرارية منخفضة لخسارة الوزن بشكل صحي",
  },
  high_performance: {
    label: "أداء عالي",
    emoji: "⚡",
    gradient: "from-blue-500 to-indigo-500",
    image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311e65?w=600&h=400&fit=crop",
    macros: { protein: 45, carbs: 55, fat: 20 },
    tags: ["طاقة", "بروتين عالي"],
    planSummary: "بروتين عالي لبناء العضلات وتعزيز الأداء",
  },
  general: {
    label: "عام",
    emoji: "🍱",
    gradient: "from-emerald-500 to-emerald-600",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop",
    macros: { protein: 30, carbs: 45, fat: 18 },
    tags: ["متوازن", "صحي"],
    planSummary: "وجبات متوازنة تناسب جميع الاحتياجات اليومية",
  },
  vegan: {
    label: "نباتي",
    emoji: "🥗",
    gradient: "from-purple-500 to-violet-500",
    image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=600&h=400&fit=crop",
    macros: { protein: 22, carbs: 50, fat: 16 },
    tags: ["نباتي", "ألياف"],
    planSummary: "وجبات نباتية غنية بالألياف والعناصر الغذائية",
  },
  keto: {
    label: "كيتو",
    emoji: "🥑",
    gradient: "from-violet-500 to-purple-600",
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=600&h=400&fit=crop",
    macros: { protein: 30, carbs: 10, fat: 60 },
    tags: ["قليل الكارب", "دهون صحية"],
    planSummary: "نظام كيتو عالي الدهون مناسب لحرق الدهون",
  },
  mediterranean: {
    label: "بحر المتوسط",
    emoji: "🫒",
    gradient: "from-cyan-500 to-teal-500",
    image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=600&h=400&fit=crop",
    macros: { protein: 25, carbs: 40, fat: 35 },
    tags: ["زيت زيتون", "صحي للقلب"],
    planSummary: "نظام البحر المتوسط الغني بأوميغا 3 والدهون الصحية",
  },
  post_workout: {
    label: "ما بعد التمرين",
    emoji: "💪",
    gradient: "from-orange-500 to-red-500",
    image: "https://images.unsplash.com/photo-1593095948071-474c5cc2c1cf?w=600&h=400&fit=crop",
    macros: { protein: 50, carbs: 40, fat: 10 },
    tags: ["استشفاء", "بروتين عالي"],
    planSummary: "وجبات غنية بالبروتين لتعافي العضلات بعد التمرين",
  },
  breakfast: {
    label: "إفطار",
    emoji: "🌅",
    gradient: "from-yellow-500 to-amber-500",
    image: "https://images.unsplash.com/photo-1513442542250-854d436a73f2?w=600&h=400&fit=crop",
    macros: { protein: 20, carbs: 50, fat: 15 },
    tags: ["خفيف", "طاقة صباحية"],
    planSummary: "وجبات فطور مغذية لبداية يوم نشطة",
  },
  smoothie: {
    label: "سموذي",
    emoji: "🥤",
    gradient: "from-pink-500 to-rose-500",
    image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=600&h=400&fit=crop",
    macros: { protein: 15, carbs: 35, fat: 8 },
    tags: ["منعش", "فيتامينات"],
    planSummary: "مشروبات طبيعية غنية بالفيتامينات والعناصر الغذائية",
  },
};

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  pending: { label: "قيد الانتظار", color: "bg-amber-100 text-amber-700", icon: Clock },
  preparing: { label: "قيد التحضير", color: "bg-blue-100 text-blue-700", icon: Coffee },
  ready: { label: "جاهز", color: "bg-emerald-100 text-emerald-700", icon: CheckCircle },
  delivered: { label: "تم التسليم", color: "bg-gray-100 text-gray-500", icon: CheckCircle },
  cancelled: { label: "ملغي", color: "bg-red-100 text-red-600", icon: XCircle },
};

const mealTimes = [
  { name: "الفطور", time: "٧:٣٠ – ٩:٠٠ ص", emoji: "🌅" },
  { name: "الغداء", time: "١٢:٠٠ – ٢:٠٠ م", emoji: "☀️" },
  { name: "العشاء", time: "٦:٠٠ – ٨:٠٠ م", emoji: "🌙" },
];

// ── Component ──
// ── Macros pie helper ──
function MacrosPie({ protein, carbs, fat, size = 56 }: { protein: number; carbs: number; fat: number; size?: number }) {
  const total = protein + carbs + fat;
  const pPct = Math.round((protein / total) * 100);
  const cPct = Math.round((carbs / total) * 100);
  const fPct = Math.round((fat / total) * 100);
  // SVG polar pie (simpler, no deps)
  const r = size / 2 - 4;
  const circ = 2 * Math.PI * r;
  const pLen = (pPct / 100) * circ;
  const cLen = (cPct / 100) * circ;
  const fLen = (fPct / 100) * circ;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e5e7eb" strokeWidth={5} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#3B82F6" strokeWidth={5}
        strokeDasharray={`${pLen} ${circ - pLen}`} transform={`rotate(-90 ${size / 2} ${size / 2})`} strokeLinecap="round" />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#F59E0B" strokeWidth={5}
        strokeDasharray={`${cLen} ${circ - cLen}`} transform={`rotate(${pPct * 3.6 - 90} ${size / 2} ${size / 2})`} strokeLinecap="round" />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#EF4444" strokeWidth={5}
        strokeDasharray={`${fLen} ${circ - fLen}`} transform={`rotate(${(pPct + cPct) * 3.6 - 90} ${size / 2} ${size / 2})`} strokeLinecap="round" />
      <text x={size / 2} y={size / 2} textAnchor="middle" dominantBaseline="central" className="text-[10px] font-bold fill-gray-800" fontSize="10">
        {pPct}%
      </text>
    </svg>
  );
}

// ── Macro mini bar ──
function MacroBar({ protein, carbs, fat, compact = false }: { protein: number; carbs: number; fat: number; compact?: boolean }) {
  const total = protein + carbs + fat;
  const wP = (protein / total) * 100;
  const wC = (carbs / total) * 100;
  const wF = (fat / total) * 100;
  return (
    <div className={`flex flex-col gap-1 ${compact ? "" : "bg-surface-mid rounded-xl p-3"}`}>
      {!compact && (
        <div className="flex justify-between text-[11px] text-secondary mb-1">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" /> بروتين</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> كارب</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500" /> دهون</span>
        </div>
      )}
      <div className={`flex rounded-full overflow-hidden ${compact ? "h-1.5" : "h-2"}`}>
        <div className="bg-blue-500" style={{ width: `${wP}%` }} />
        <div className="bg-amber-500" style={{ width: `${wC}%` }} />
        <div className="bg-rose-500" style={{ width: `${wF}%` }} />
      </div>
    </div>
  );
}

export default function EmployeeMealsPage() {
  const [plans, setPlans] = useState<MealPlan[]>([]);
  const [orders, setOrders] = useState<MealOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [ordering, setOrdering] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [cartCount, setCartCount] = useState(0);
  const [showPlanGuide, setShowPlanGuide] = useState(true);
  const filterRef = useRef<HTMLDivElement>(null);
  const [isFilterSticky, setIsFilterSticky] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const [plansRes, ordersRes] = await Promise.all([
          fetch("/api/meals"),
          fetch("/api/meals?type=orders"),
        ]);
        if (plansRes.ok) {
          const data = await plansRes.json();
          setPlans(data);
        }
        if (ordersRes.ok) {
          const data = await ordersRes.json();
          setOrders(data);
          setCartCount(data.filter((o: MealOrder) => o.status !== "delivered" && o.status !== "cancelled").length);
        }
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
        setCartCount((c) => c + 1);
        setSuccessMsg(`✅ تم طلب "${plan.name}" بنجاح!`);
        setTimeout(() => setSuccessMsg(""), 4000);
      }
    } catch (e) {
      console.error("Order failed", e);
    } finally {
      setOrdering(null);
    }
  }

  async function cancelOrder(orderId: string) {
    setCancelling(orderId);
    try {
      const res = await fetch("/api/meals", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: "cancelled" }),
      });
      if (res.ok) {
        const updated = await res.json();
        setOrders((prev) => prev.map((o) => (o.id === orderId ? updated : o)));
        setCartCount((c) => Math.max(0, c - 1));
        setSuccessMsg(`✅ تم إلغاء الطلب`);
        setTimeout(() => setSuccessMsg(""), 3000);
      }
    } catch (e) {
      console.error("Cancel failed", e);
    } finally {
      setCancelling(null);
    }
  }

  // ── Scroll observer for sticky filter ──
  useEffect(() => {
    const el = filterRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFilterSticky(!entry.isIntersecting),
      { rootMargin: "-64px 0px 0px 0px", threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [plans]);

  // ── Sticky filter scroll helper ──
  const setFilterSticky = (sticky: boolean) => setIsFilterSticky(sticky);
  const categories = ["all", ...new Set(plans.map((p) => p.type))];
  const filteredPlans = selectedCategory === "all" ? plans : plans.filter((p) => p.type === selectedCategory);

  const activeOrders = orders.filter((o) => o.status !== "delivered" && o.status !== "cancelled");

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
      <main className="min-h-screen bg-surface-mid pt-24 pb-12" style={{ backgroundImage: "radial-gradient(ellipse at top, rgba(16,185,129,0.05) 0%, transparent 50%)" }}>
        <div className="container-shade py-6">
          {/* Breadcrumb */}
          <div className="fade-in-up mb-5">
            <Link href="/dashboard/employee" className="text-sm text-emerald hover:underline inline-flex items-center gap-1 transition-colors">
              <ChevronLeft className="h-4 w-4" /> العودة للوحة التحكم
            </Link>
          </div>

          {/* Hero Header — Calo-inspired */}
          <div className="fade-in-up mb-8 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-amber/5 rounded-full blur-3xl" />
            <div className="relative">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold bg-gradient-to-r from-emerald to-emerald-600 text-white px-3 py-1 rounded-full shadow-sm">🍽️ قائمة طعام اليوم</span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-primary mt-2 leading-tight">
                    وجبات صحية <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-l from-emerald to-emerald-600">
                      على كيفك
                    </span>
                  </h1>
                  <p className="text-secondary mt-2 max-w-xl">
                    وجبات مُحضّرة من أمهر الطهاة ومتوازنة بالسعرات ومُعتمدة من أخصائيي التغذية، تُوصّل يومياً إلى مكتبك. فقط سخّن، كل، واستمتع.
                  </p>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1.5">
                      <TrendingUp className="h-4 w-4 text-emerald" />
                      <span className="text-xs font-medium text-primary">{plans.length} وجبة متاحة</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Award className="h-4 w-4 text-amber-500" />
                      <span className="text-xs font-medium text-primary">{plans.filter(p => p.isActive).length} نشطة</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <UtensilsCrossed className="h-4 w-4 text-emerald" />
                      <span className="text-xs font-medium text-primary">{Object.keys(typeConfig).length} خطط غذائية</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {cartCount > 0 && (
                    <div className="flex items-center gap-2 bg-emerald-soft text-emerald-dark px-4 py-2 rounded-xl text-sm font-medium shadow-sm">
                      <ShoppingBag className="h-4 w-4" />
                      <span>{cartCount} طلب نشط</span>
                    </div>
                  )}
                  <div className="text-sm text-secondary bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-[var(--surface-border)] flex items-center gap-2 shadow-sm">
                    <Sparkles className="h-4 w-4 text-amber-500" />
                    <span>توصيل مجاني للشركة</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Success Message */}
          {successMsg && (
            <div className="fade-in-up mb-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 px-5 py-3.5 text-sm text-emerald-600 text-center font-medium flex items-center justify-center gap-2">
              <CheckCircle className="h-5 w-5" />
              {successMsg}
            </div>
          )}

          {/* Meal Times Strip */}
          <div className="fade-in-up mb-8 grid grid-cols-3 gap-3">
            {mealTimes.map((mt) => (
              <div key={mt.name} className="shade-card py-3 px-4 text-center hover:shadow-md transition-shadow">
                <span className="text-xl block mb-0.5">{mt.emoji}</span>
                <p className="text-xs font-bold text-primary">{mt.name}</p>
                <p className="text-[10px] text-secondary">{mt.time}</p>
              </div>
            ))}
          </div>

          {/* ── Plan Guide (Calo-inspired) ── */}
          {showPlanGuide && (
            <div className="fade-in-up mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-primary flex items-center gap-2">
                  <Award className="h-5 w-5 text-emerald" />
                  الخطط الغذائية المناسبة لك
                </h2>
                <button onClick={() => setShowPlanGuide(false)} className="text-xs text-secondary hover:text-primary transition-colors">
                  إخفاء
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(typeConfig).slice(0, 8).map(([key, cfg]) => {
                  const total = cfg.macros.protein + cfg.macros.carbs + cfg.macros.fat;
                  const pPct = Math.round((cfg.macros.protein / total) * 100);
                  const cPct = Math.round((cfg.macros.carbs / total) * 100);
                  const fPct = Math.round((cfg.macros.fat / total) * 100);
                  const hasMeals = categories.includes(key);
                  return (
                    <button
                      key={key}
                      onClick={() => { setSelectedCategory(key); setShowPlanGuide(false); }}
                      className={`shade-card p-4 text-right hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 text-right ${
                        !hasMeals ? "opacity-40 pointer-events-none" : ""
                      } ${selectedCategory === key ? "ring-2 ring-emerald ring-offset-2" : ""}`}
                    >
                      <div className="flex items-start gap-2 mb-2">
                        <span className="text-xl">{cfg.emoji}</span>
                        <span className="text-xs font-bold text-primary">{cfg.label}</span>
                      </div>
                      <div className="flex items-center gap-3 mb-2">
                        <MacrosPie protein={cfg.macros.protein} carbs={cfg.macros.carbs} fat={cfg.macros.fat} size={44} />
                        <div className="flex-1 min-w-0">
                          <MacroBar protein={cfg.macros.protein} carbs={cfg.macros.carbs} fat={cfg.macros.fat} compact />
                          <div className="flex gap-2 mt-1 text-[10px] text-secondary">
                            <span>بروتين {pPct}%</span>
                            <span>كارب {cPct}%</span>
                            <span>دهون {fPct}%</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-[10px] text-muted leading-relaxed">{cfg.planSummary}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          {!showPlanGuide && (
            <button onClick={() => setShowPlanGuide(true)} className="fade-in-up text-xs text-emerald hover:underline mb-4 flex items-center gap-1">
              <Info className="h-3 w-3" /> عرض الخطط الغذائية
            </button>
          )}

          {/* ── Sticky Category Filter ── */}
          {plans.length > 0 && (
            <>
              <div ref={filterRef} />
              <div className={`${isFilterSticky ? "fixed top-16 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-b border-[var(--surface-border)] shadow-sm transition-all duration-200" : ""} ${isFilterSticky ? "py-3 px-4" : "mb-7"}`}>
                <div className={`${isFilterSticky ? "max-w-7xl mx-auto" : ""}`}>
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    {isFilterSticky && <Filter className="h-4 w-4 text-secondary shrink-0" />}
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`text-sm px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-200 font-medium shrink-0 ${
                          selectedCategory === cat
                            ? "bg-emerald text-white shadow-lg shadow-emerald/20 scale-105"
                            : "bg-white text-secondary hover:text-primary border border-[var(--surface-border)] hover:border-emerald/30"
                        }`}
                      >
                        {cat === "all" ? "📋 الكل" : `${typeConfig[cat]?.emoji || "🍽️"} ${typeConfig[cat]?.label || cat}`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className={isFilterSticky ? "h-12" : ""} />
            </>
          )}

          {/* Menu Grid — Premium Cards with Images */}
          {filteredPlans.length === 0 ? (
            <div className="text-center py-20 text-secondary">
              <span className="text-6xl block mb-4">🍽️</span>
              <p className="text-lg font-medium">لا توجد وجبات متاحة حالياً</p>
              <p className="text-sm mt-1">تواصل مع قسم الموارد البشرية لإضافة وجبات جديدة</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {filteredPlans.map((plan, i) => {
                const cfg = typeConfig[plan.type] || typeConfig.general;
                const imgUrl = `https://images.unsplash.com/photo-${getUnsplashId(plan.type)}?w=600&h=400&fit=crop&auto=format`;
                return (
                  <div
                    key={plan.id}
                    className="group shade-card overflow-hidden fade-in-up hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                    style={{ animationDelay: `${(i % 4) * 0.1}s` }}
                  >
                    {/* Image Section */}
                    <div className="relative h-48 md:h-52 overflow-hidden bg-gray-100">
                      <img
                        src={imgUrl}
                        alt={plan.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-3 right-3 left-3 flex items-start justify-between">
                        <span className={`tag text-xs py-1 px-3 rounded-lg bg-white/90 backdrop-blur-sm text-gray-800 font-medium shadow-sm`}>
                          {cfg.emoji} {cfg.label}
                        </span>
                        {plan.calories && (
                          <span className="tag text-xs py-1 px-3 rounded-lg bg-black/40 backdrop-blur-sm text-white font-medium flex items-center gap-1">
                            <Flame className="h-3 w-3 text-amber-400" />
                            {plan.calories} kcal
                          </span>
                        )}
                      </div>

                      {/* Bottom Info on Image */}
                      <div className="absolute bottom-3 right-3 left-3 flex items-center gap-2">
                        {cfg.tags.map((tag) => (
                          <span key={tag} className="text-[10px] py-0.5 px-2 rounded-md bg-white/20 backdrop-blur-sm text-white font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <h3 className="font-bold text-primary text-lg leading-tight">{plan.name}</h3>
                          {plan.description && (
                            <p className="text-sm text-secondary mt-1 line-clamp-2">{plan.description}</p>
                          )}
                        </div>
                      </div>

                      {/* Macro Nutrients — Calo-inspired pie + bar */}
                      <div className="flex items-center gap-3 mb-4">
                        <MacrosPie protein={cfg.macros.protein} carbs={cfg.macros.carbs} fat={cfg.macros.fat} size={56} />
                        <div className="flex-1 min-w-0">
                          <div className="grid grid-cols-3 gap-1 text-center mb-1">
                            <div>
                              <p className="text-[10px] text-secondary">بروتين</p>
                              <p className="text-xs font-bold text-primary">{cfg.macros.protein}g</p>
                            </div>
                            <div className="border-x border-[var(--surface-border)]">
                              <p className="text-[10px] text-secondary">كارب</p>
                              <p className="text-xs font-bold text-primary">{cfg.macros.carbs}g</p>
                            </div>
                            <div>
                              <p className="text-[10px] text-secondary">دهون</p>
                              <p className="text-xs font-bold text-primary">{cfg.macros.fat}g</p>
                            </div>
                          </div>
                          <MacroBar protein={cfg.macros.protein} carbs={cfg.macros.carbs} fat={cfg.macros.fat} compact />
                        </div>
                      </div>

                      {/* Order Button */}
                      <button
                        onClick={() => placeOrder(plan)}
                        disabled={ordering === plan.id || !plan.isActive}
                        className={`w-full py-3 rounded-2xl text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
                          !plan.isActive
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : ordering === plan.id
                            ? "bg-emerald/80 text-white cursor-wait"
                            : "bg-emerald text-white hover:bg-emerald-dark active:scale-[0.98] shadow-lg shadow-emerald/20 hover:shadow-xl hover:shadow-emerald/30"
                        }`}
                      >
                        {ordering === plan.id ? (
                          <><Loader2 className="h-5 w-5 animate-spin" /> جاري الطلب...</>
                        ) : !plan.isActive ? (
                          "غير متاح حالياً"
                        ) : (
                          <><ShoppingCart className="h-5 w-5" /> أطلب الآن</>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Active Orders */}
          {activeOrders.length > 0 && (
            <div className="fade-in-up mb-8">
              <h2 className="font-bold text-primary text-lg mb-4 flex items-center gap-2">
                <Timer className="h-5 w-5 text-emerald" />
                طلباتي الحالية
                <span className="tag text-xs py-0.5 px-2.5 bg-emerald-soft text-emerald-dark rounded-full">{activeOrders.length}</span>
              </h2>
              <div className="space-y-3">
                {activeOrders.map((order) => {
                  const cfg = statusConfig[order.status] || statusConfig.pending;
                  const StatusIcon = cfg.icon;
                  return (
                    <div key={order.id} className="shade-card p-4 flex items-center justify-between gap-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl ${cfg.color.split(" ")[0]} flex items-center justify-center`}>
                          <StatusIcon className={`h-5 w-5 ${cfg.color.split(" ")[1]}`} />
                        </div>
                        <div>
                          <p className="font-semibold text-primary">{order.mealName}</p>
                          <p className="text-xs text-secondary">{new Date(order.orderDate).toLocaleString("ar-SA")}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {(order.status === "pending" || order.status === "preparing") && (
                          <button
                            onClick={() => cancelOrder(order.id)}
                            disabled={cancelling === order.id}
                            className="text-xs py-1 px-2.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-all disabled:opacity-50 font-medium"
                          >
                            {cancelling === order.id ? <Loader2 className="h-3 w-3 animate-spin" /> : "إلغاء"}
                          </button>
                        )}
                        <span className={`tag text-xs py-1 px-3 ${cfg.color} whitespace-nowrap rounded-lg`}>
                          {cfg.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Past Orders */}
          {orders.filter((o) => o.status === "delivered" || o.status === "cancelled").length > 0 && (
            <details className="fade-in-up shade-card p-4">
              <summary className="cursor-pointer text-sm font-medium text-secondary select-none flex items-center gap-2">
                <Clock className="h-4 w-4" />
                الطلبات السابقة
                <span className="tag text-xs py-0.5 px-2 bg-gray-100 text-gray-500">
                  {orders.filter((o) => o.status === "delivered" || o.status === "cancelled").length}
                </span>
              </summary>
              <div className="mt-4 space-y-2">
                {orders.filter((o) => o.status === "delivered" || o.status === "cancelled").slice(0, 10).map((order) => {
                  const cfg = statusConfig[order.status] || statusConfig.delivered;
                  return (
                    <div key={order.id} className="flex items-center justify-between text-sm py-2.5 border-b border-[var(--surface-border)] last:border-0">
                      <span className="text-primary font-medium">{order.mealName}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-secondary">{new Date(order.orderDate).toLocaleDateString("ar-SA")}</span>
                        <span className={`tag text-[11px] py-0.5 px-2.5 ${cfg.color} rounded-md`}>{cfg.label}</span>
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

// ── Unsplash photo IDs per meal type ──
function getUnsplashId(type: string): string {
  const map: Record<string, string> = {
    general: "1546069901-ba9599a7e63c",
    diabetic: "1512621776951-a57141f2eefd",
    weight_loss: "1467003909585-2f8a72700288",
    high_performance: "1482049016688-2d3e1b311e65",
    vegan: "1505252585461-04db1eb84625",
    keto: "1606787366850-de6330128bfc",
    mediterranean: "1511690743698-d9d85f2fbf38",
    post_workout: "1593095948071-474c5cc2c1cf",
    breakfast: "1513442542250-854d436a73f2",
    smoothie: "1505252585461-04db1eb84625",
  };
  return map[type] || "1490645935967-10de6ba17061";
}