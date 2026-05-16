"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useSession } from "next-auth/react";
import {
  Heart,
  Brain,
  Apple,
  Activity,
  TrendingUp,
  Moon,
  Droplets,
  Dumbbell,
  Coffee,
  Sparkles,
  Calendar,
  Award,
  Zap,
  Loader2,
} from "lucide-react";
import { SkeletonDashboard } from "@/components/ui/skeleton";

type WellnessData = {
  score: number;
  sleepScore: number;
  stressScore: number;
  activityScore: number;
  nutritionScore: number;
  riskLevel: string;
  trend: string;
  trendHistory?: { date: string; score: number; riskLevel: string }[];
};

type AITip = {
  id: string;
  type: string;
  probability: number;
  suggestions: string[];
  riskLevel: string;
  factors?: Record<string, number>;
};

type MealPlan = {
  id: string;
  name: string;
  description: string | null;
  type: string;
  calories: number | null;
};

type Consultation = {
  id: string;
  type: string;
  status: string;
  scheduledAt: string;
  consultant: { firstName: string; lastName: string } | null;
};

const maxChartValue = 100;

const typeEmoji: Record<string, string> = {
  nutrition: "🥗", fitness: "💪", general: "🩺", mental: "🧠",
};

export default function EmployeeDashboard() {
  const { data: session } = useSession();
  const userName = session?.user?.name || "أحمد";
  const [wellness, setWellness] = useState<WellnessData | null>(null);
  const [tips, setTips] = useState<AITip[]>([]);
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [wellRes, predRes, mealRes, consRes] = await Promise.all([
          fetch("/api/wellness"),
          fetch("/api/predictions"),
          fetch("/api/meals"),
          fetch("/api/consultations?type=upcoming"),
        ]);
        if (wellRes.ok) setWellness(await wellRes.json());
        if (predRes.ok) setTips(await predRes.json());
        if (mealRes.ok) {
          const plans = await mealRes.json();
          setMealPlans(plans.slice(0, 3));
        }
        if (consRes.ok) setConsultations(await consRes.json());
      } catch (e) {
        console.error("Failed to load dashboard data", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const score = wellness?.score ?? 82;
  const scoreColor = score >= 80 ? "text-emerald-400" : score >= 60 ? "text-amber-400" : "text-red-400";
  const scoreRing = score >= 80 ? "stroke-emerald-400" : score >= 60 ? "stroke-amber-400" : "stroke-red-400";
  const progress = score;

  // Build health metrics from wellness data
  const healthMetrics = [
    { label: "النوم", value: wellness?.sleepScore ?? 70, unit: "%", icon: Moon, color: "text-indigo-400", bg: "bg-indigo-500/10", status: (wellness?.sleepScore ?? 70) >= 75 ? "جيد" : (wellness?.sleepScore ?? 70) >= 50 ? "متوسط" : "قليل" },
    { label: "النشاط", value: wellness?.activityScore ?? 65, unit: "%", icon: Dumbbell, color: "text-emerald-400", bg: "bg-emerald-500/10", status: (wellness?.activityScore ?? 65) >= 80 ? "ممتاز" : (wellness?.activityScore ?? 65) >= 60 ? "جيد" : "قليل" },
    { label: "التوتر", value: wellness?.stressScore ?? 30, unit: "%", icon: Brain, color: "text-amber-400", bg: "bg-amber-500/10", status: (wellness?.stressScore ?? 30) <= 35 ? "منخفض" : "مرتفع" },
    { label: "التغذية", value: wellness?.nutritionScore ?? 75, unit: "%", icon: Apple, color: "text-green-400", bg: "bg-green-500/10", status: (wellness?.nutritionScore ?? 75) >= 80 ? "ممتاز" : (wellness?.nutritionScore ?? 75) >= 60 ? "جيد" : "قليل" },
    { label: "العافية", value: score, unit: "%", icon: Heart, color: "text-rose-400", bg: "bg-rose-500/10", status: score >= 80 ? "ممتازة" : score >= 60 ? "جيدة" : "تحتاج تحسين" },
  ];

  const riskLabel = wellness?.riskLevel === "low" ? "منخفض" : wellness?.riskLevel === "medium" ? "متوسط" : wellness?.riskLevel === "high" ? "مرتفع" : "حرج";
  const riskColor = wellness?.riskLevel === "low" ? "text-emerald-400 bg-emerald-500/10" : wellness?.riskLevel === "medium" ? "text-amber-400 bg-amber-500/10" : "text-red-400 bg-red-500/10";

  // Build weekly trend from real history or fall back to score-based estimate
  const dayNames = ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "اليوم"];
  const weeklyTrend = wellness?.trendHistory && wellness.trendHistory.length > 0
    ? wellness.trendHistory.slice(-7).map((h, i) => ({
        day: dayNames[i] || "اليوم",
        value: h.score,
      }))
    : dayNames.map((d, i) => ({
        day: d,
        value: i < 6
          ? Math.max(40, score - (6 - i) * 2 + Math.round(Math.sin(i * 1.5) * 3))
          : score,
      }));

  const trendDirection = wellness?.trend === "up" ? "تحسن" : wellness?.trend === "down" ? "انخفاض" : "استقرار";
  const trendIcon = wellness?.trend === "up" ? "+" : wellness?.trend === "down" ? "-" : "=";

  if (loading) {
    return <SkeletonDashboard type="employee" />;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface-deeper pt-20 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* ── Welcome Header ── */}
          <div className="flex items-center justify-between mb-8 fade-in-up">
            <div>
              <h1 className="text-2xl font-bold text-primary">مرحباً، {userName} 👋</h1>
              <p className="text-secondary text-sm mt-1">هذه حالتك الصحية اليوم</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-secondary">مستوى المخاطر</p>
                <span className={`tag text-xs px-3 py-1 ${riskColor}`}>{riskLabel}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* ── Left Column ── */}
            <div className="lg:col-span-2 space-y-6">

              {/* Wellness Score Ring */}
              <div className="glass-card p-6 flex items-center gap-6 fade-in-up-delay-1">
                <div className="relative flex-shrink-0">
                  <svg className="w-28 h-28 -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
                    <circle
                      cx="60" cy="60" r="52"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 52}`}
                      strokeDashoffset={`${2 * Math.PI * 52 * (1 - progress / 100)}`}
                      className={scoreRing}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <span className={`text-3xl font-extrabold ${scoreColor}`}>{score}</span>
                      <p className="text-[10px] text-secondary mt-0.5">من ١٠٠</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-primary">Wellness Score</h2>
                  <p className="text-sm text-secondary mt-1">
                    {score >= 80 ? "درجة عافية ممتازة! استمر في هذا المستوى 🎯" :
                     score >= 60 ? "درجة عافية جيدة — يمكنك التحسن أكثر 💪" :
                     "درجة عافية منخفضة — ننصح بإجراء تقييم صحي 🩺"}
                  </p>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1.5">
                      <TrendingUp className="h-4 w-4 text-emerald-400" />
                      <span className="text-xs text-emerald-400 font-medium">{trendDirection} {trendIcon} عن الأسبوع الماضي</span>
                    </div>
                    <Link href="/hra" className="btn-primary text-xs py-1.5 px-4 mt-2 inline-flex">
                      إعادة التقييم الصحي
                    </Link>
                  </div>
                </div>
              </div>

              {/* ── Health Status Today ── */}
              <div className="glass-card p-6 fade-in-up-delay-2">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-base font-bold text-primary">حالتك الصحية اليوم</h3>
                  {wellness && <span className="text-xs text-secondary">آخر تحديث: منذ لحظات</span>}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {healthMetrics.map((m) => (
                    <div key={m.label} className={`rounded-2xl ${m.bg} p-4 text-center`}>
                      <m.icon className={`h-5 w-5 ${m.color} mx-auto mb-2`} />
                      <p className="text-xs text-secondary mb-1">{m.label}</p>
                      <p className="text-lg font-bold text-primary">{m.value}</p>
                      <p className="text-[10px] text-muted">{m.unit}</p>
                      <span className={`inline-block mt-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        m.status === "ممتاز" || m.status === "ممتازة" || m.status === "جيد جداً" ? "text-emerald-400 bg-emerald-500/10" :
                        m.status === "جيد" || m.status === "جيدة" ? "text-cyan-400 bg-cyan-500/10" :
                        m.status === "منخفض" ? "text-amber-400 bg-amber-500/10" :
                        "text-red-400 bg-red-500/10"
                      }`}>
                        {m.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── AI Recommendations ── */}
              <div className="glass-card p-6 fade-in-up-delay-3">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-emerald-400" />
                    <h3 className="text-base font-bold text-primary">توصيات الذكاء الاصطناعي</h3>
                  </div>
                  <span className="tag-cyan text-[10px] px-2 py-0.5">AI</span>
                </div>
                <div className="space-y-3">
                  {tips.length === 0 ? (
                    <p className="text-sm text-secondary text-center py-4">لا توجد توصيات حالياً — أكمل التقييم الصحي أولاً</p>
                  ) : (
                    tips.slice(0, 4).map((tip, i) => {
                      const riskColors: Record<string, string> = {
                        high: "border-r-2 border-amber-500 bg-amber-500/5",
                        moderate: "border-r-2 border-orange-500 bg-orange-500/5",
                        low: "border-r-2 border-emerald-500 bg-emerald-500/5",
                      };
                      const probPct = Math.round((tip.probability || 0) * 100);
                      return (
                        <div key={tip.id || i} className={`flex items-start gap-3 p-3 rounded-xl ${riskColors[tip.riskLevel] || "bg-white/[0.03]"} transition-colors`}>
                          <div className="p-1.5 rounded-lg bg-white/[0.05] shrink-0">
                            <Brain className={`h-4 w-4 ${tip.riskLevel === "high" || tip.riskLevel === "moderate" ? "text-amber-400" : "text-emerald-400"}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <p className="text-xs font-semibold text-primary">
                                {tip.type === "diabetes" ? "السكري" :
                                 tip.type === "heart_disease" ? "القلب" :
                                 tip.type === "burnout" ? "الاحتراق النفسي" :
                                 tip.type === "obesity" ? "السمنة" :
                                 tip.type === "productivity" ? "الإنتاجية" : tip.type}
                              </p>
                              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                tip.riskLevel === "high" ? "bg-amber-500/20 text-amber-400" :
                                tip.riskLevel === "moderate" ? "bg-orange-500/20 text-orange-400" :
                                "bg-emerald-500/20 text-emerald-400"
                              }`}>
                                {probPct}%
                              </span>
                            </div>
                            <p className="text-sm text-secondary leading-relaxed">{tip.suggestions?.[0] || `توصية: تحسين مستوى ${tip.type}`}</p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            {/* ── Right Column ── */}
            <div className="space-y-6">

              {/* ── Smart Meals ── */}
              <div className="glass-card p-6 fade-in-up-delay-2">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Coffee className="h-5 w-5 text-emerald-400" />
                    <h3 className="text-base font-bold text-primary">الوجبات الذكية</h3>
                  </div>
                  <span className="text-[10px] text-muted">حسب حالتك الصحية</span>
                </div>
                <div className="space-y-3">
                  {mealPlans.length === 0 ? (
                    <p className="text-sm text-secondary text-center py-4">لا توجد وجبات متاحة حالياً</p>
                  ) : (
                    mealPlans.slice(0, 3).map((meal) => (
                      <div key={meal.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03]">
                        <span className="text-2xl">🍽️</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-primary">{meal.name}</p>
                          </div>
                          <p className="text-xs text-secondary truncate mt-0.5">{meal.description || "وجبة صحية متوازنة"}</p>
                        </div>
                        <span className="text-[10px] text-muted whitespace-nowrap">{meal.calories ? `${meal.calories} kcal` : ""}</span>
                      </div>
                    ))
                  )}
                </div>
                <Link href="/dashboard/employee/meals" className="w-full mt-4 py-2.5 text-sm font-medium text-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/10 rounded-xl transition-colors block text-center">
                  طلب وجبة الآن
                </Link>
              </div>

              {/* ── Consultation ── */}
              <div className="glass-card p-6 fade-in-up-delay-3">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-cyan-400" />
                    <h3 className="text-base font-bold text-primary">الاستشارات</h3>
                  </div>
                </div>
                {consultations.length > 0 ? (
                  <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10 mb-4">
                    <p className="text-xs text-cyan-400 font-medium mb-1">القادمة</p>
                    <p className="text-sm font-semibold text-primary">
                      {typeEmoji[consultations[0].type] || "🩺"} استشارة {consultations[0].type}
                    </p>
                    <p className="text-xs text-secondary">
                      {consultations[0].consultant ? `مع ${consultations[0].consultant.firstName} ${consultations[0].consultant.lastName}` : ""}
                      {" — "}{new Date(consultations[0].scheduledAt).toLocaleDateString("ar-SA")}
                    </p>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10 mb-4 text-center">
                    <p className="text-xs text-cyan-400">لا توجد استشارات قادمة</p>
                  </div>
                )}
                <Link href="/dashboard/employee/consultations" className="w-full py-2.5 text-sm font-medium text-cyan-400 bg-cyan-500/5 hover:bg-cyan-500/10 rounded-xl transition-colors block text-center">
                  حجز استشارة جديدة
                </Link>
              </div>

              {/* ── Weekly Trend ── */}
              <div className="glass-card p-6 fade-in-up-delay-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-emerald-400" />
                    <h3 className="text-base font-bold text-primary">اتجاه الأسبوع</h3>
                  </div>
                </div>
                <div className="flex items-end justify-between gap-1.5 h-28 pt-2">
                  {weeklyTrend.map((day) => (
                    <div key={day.day} className="flex flex-col items-center gap-1.5 flex-1">
                      <div
                        className="w-full rounded-t-lg transition-all duration-500"
                        style={{
                          height: `${(day.value / maxChartValue) * 100}%`,
                          background: day.day === "اليوم"
                            ? 'linear-gradient(180deg, #10B981, #06B6D4)'
                            : 'rgba(255,255,255,0.08)',
                          minHeight: '8px',
                        }}
                      />
                      <span className={`text-[10px] ${day.day === "اليوم" ? "text-emerald-400 font-semibold" : "text-muted"}`}>
                        {day.value}
                      </span>
                      <span className="text-[8px] text-muted">{day.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Gamification ── */}
              <div className="glass-card p-6 fade-in-up-delay-4">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="h-5 w-5 text-amber-400" />
                  <h3 className="text-base font-bold text-primary">إنجازاتك</h3>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  {[
                    { icon: Heart, label: "الالتزام", value: wellness ? `${Math.min(10, Math.round(score / 10))}/١٠` : "٨/١٠", color: "text-rose-400" },
                    { icon: Zap, label: "التقييم", value: wellness ? "مكتمل" : "غير مكتمل", color: wellness ? "text-emerald-400" : "text-amber-400" },
                    { icon: Award, label: "النقاط", value: wellness ? `${score * 15}` : "١,٢٤٠", color: "text-amber-400" },
                  ].map((item) => (
                    <div key={item.label} className="p-3 rounded-xl bg-white/[0.03]">
                      <item.icon className={`h-4 w-4 ${item.color} mx-auto mb-1`} />
                      <p className="text-xs font-semibold text-primary">{item.value}</p>
                      <p className="text-[9px] text-muted">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
