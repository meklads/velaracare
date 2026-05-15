"use client";

import Link from "next/link";
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
} from "lucide-react";

const score = 82;
const scoreColor = score >= 80 ? "text-emerald-400" : score >= 60 ? "text-amber-400" : "text-red-400";
const scoreRing = score >= 80 ? "stroke-emerald-400" : score >= 60 ? "stroke-amber-400" : "stroke-red-400";
const progress = score;

const healthMetrics = [
  { label: "النوم", value: 7.5, unit: "ساعات", icon: Moon, color: "text-indigo-400", bg: "bg-indigo-500/10", status: "جيد" },
  { label: "النشاط", value: 42, unit: "دقيقة", icon: Dumbbell, color: "text-emerald-400", bg: "bg-emerald-500/10", status: "ممتاز" },
  { label: "التوتر", value: 32, unit: "%", icon: Brain, color: "text-amber-400", bg: "bg-amber-500/10", status: "منخفض" },
  { label: "التغذية", value: 85, unit: "%", icon: Apple, color: "text-green-400", bg: "bg-green-500/10", status: "جيد جداً" },
  { label: "الماء", value: 5, unit: "أكواب", icon: Droplets, color: "text-cyan-400", bg: "bg-cyan-500/10", status: "قليل" },
];

const aiTips = [
  { icon: Zap, text: "ننصح بالمشي ٢٠ دقيقة اليوم — مستوى نشاطك أقل من المعدل", color: "text-emerald-400" },
  { icon: Brain, text: "مستوى الإجهاد مرتفع قليلاً — جرب تمرين التنفس العميق", color: "text-amber-400" },
  { icon: Apple, text: "يُفضل تقليل السكريات اليوم — اختر وجبة خفيفة صحية", color: "text-green-400" },
  { icon: Moon, text: "تحتاج نوم إضافي — حاول النوم قبل ١١ مساءً", color: "text-indigo-400" },
];

const meals = [
  { name: "الإفطار", time: "٨:٠٠ ص", desc: "شوفان مع فواكه + بيض مسلوق", calories: 450, emoji: "🥣" },
  { name: "الغداء", time: "١:٠٠ م", desc: "دجاج مشوي + أرز بني + خضار", calories: 650, emoji: "🍗" },
  { name: "العشاء", time: "٧:٠٠ م", desc: "سمك مع سلطة كينوا + زبادي", calories: 520, emoji: "🥗" },
];

const weeklyTrend = [
  { day: "السبت", value: 76 },
  { day: "الأحد", value: 80 },
  { day: "الإثنين", value: 78 },
  { day: "الثلاثاء", value: 83 },
  { day: "الأربعاء", value: 82 },
  { day: "الخميس", value: 85 },
  { day: "اليوم", value: 82 },
];

const maxChartValue = 100;

export default function EmployeeDashboard() {
  const { data: session } = useSession();
  const userName = session?.user?.name || "أحمد";

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
                <span className="tag text-xs px-3 py-1">منخفض</span>
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
                  <p className="text-sm text-secondary mt-1">درجة عافية ممتازة! استمر في هذا المستوى 🎯</p>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1.5">
                      <TrendingUp className="h-4 w-4 text-emerald-400" />
                      <span className="text-xs text-emerald-400 font-medium">تحسن +٦٪ عن الأسبوع الماضي</span>
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
                  <span className="text-xs text-secondary">آخر تحديث: منذ ساعة</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {healthMetrics.map((m) => (
                    <div key={m.label} className={`rounded-2xl ${m.bg} p-4 text-center`}>
                      <m.icon className={`h-5 w-5 ${m.color} mx-auto mb-2`} />
                      <p className="text-xs text-secondary mb-1">{m.label}</p>
                      <p className="text-lg font-bold text-primary">{m.value}</p>
                      <p className="text-[10px] text-muted">{m.unit}</p>
                      <span className={`inline-block mt-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        m.status === "ممتاز" || m.status === "جيد جداً" ? "text-emerald-400 bg-emerald-500/10" :
                        m.status === "جيد" ? "text-cyan-400 bg-cyan-500/10" :
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
                  {aiTips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.05] transition-colors">
                      <div className="p-1.5 rounded-lg bg-white/[0.05]">
                        <tip.icon className={`h-4 w-4 ${tip.color}`} />
                      </div>
                      <p className="text-sm text-secondary leading-relaxed">{tip.text}</p>
                    </div>
                  ))}
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
                  {meals.map((meal) => (
                    <div key={meal.name} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03]">
                      <span className="text-2xl">{meal.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-primary">{meal.name}</p>
                          <span className="text-[10px] text-muted">{meal.time}</span>
                        </div>
                        <p className="text-xs text-secondary truncate mt-0.5">{meal.desc}</p>
                      </div>
                      <span className="text-[10px] text-muted whitespace-nowrap">{meal.calories} kcal</span>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 py-2.5 text-sm font-medium text-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/10 rounded-xl transition-colors">
                  طلب وجبة الآن
                </button>
              </div>

              {/* ── Consultation ── */}
              <div className="glass-card p-6 fade-in-up-delay-3">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-cyan-400" />
                    <h3 className="text-base font-bold text-primary">الاستشارات</h3>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10 mb-4">
                  <p className="text-xs text-cyan-400 font-medium mb-1">القادمة</p>
                  <p className="text-sm font-semibold text-primary">استشارة تغذية</p>
                  <p className="text-xs text-secondary">مع د. سارة — غداً ١٠:٠٠ ص</p>
                </div>
                <button className="w-full py-2.5 text-sm font-medium text-cyan-400 bg-cyan-500/5 hover:bg-cyan-500/10 rounded-xl transition-colors">
                  حجز استشارة جديدة
                </button>
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
                    { icon: Heart, label: "الالتزام", value: "٨/١٠", color: "text-rose-400" },
                    { icon: Zap, label: "التقييم", value: "مكتمل", color: "text-emerald-400" },
                    { icon: Award, label: "النقاط", value: "١,٢٤٠", color: "text-amber-400" },
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
