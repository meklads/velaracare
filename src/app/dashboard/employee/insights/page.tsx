"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Loader2, ChevronLeft, Brain, Heart, Activity, TrendingUp, Calendar,
  Sparkles, Shield, AlertTriangle, CheckCircle2, Clock, ArrowUpRight,
  BarChart3, FileText, Lightbulb, Target, Award
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, AreaChart, Area, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from "recharts";

// ── Types ──
type Prediction = {
  id: string;
  type: string;
  probability: number;
  riskLevel: string;
  factors: Record<string, number>;
  suggestions: string[];
  createdAt: string;
};

type HRAResult = {
  id: string;
  riskLevel: string;
  completedAt: string;
  responses: Record<string, any>;
  recommendations: { recommendations?: string[]; score?: number; nextSteps?: string } | null;
};

type WellnessHistory = {
  score: number;
  sleepScore: number;
  stressScore: number;
  activityScore: number;
  nutritionScore: number;
  riskLevel: string;
  trend: string;
  trendHistory?: { date: string; score: number; riskLevel: string }[];
};

const typeLabels: Record<string, { label: string; icon: string; desc: string; color: string }> = {
  diabetes: { label: "السكري", icon: "🩸", desc: "احتمالية الإصابة بالسكري من النوع الثاني", color: "text-rose-500" },
  obesity: { label: "السمنة", icon: "⚖️", desc: "مؤشر كتلة الجسم وزيادة الوزن", color: "text-amber-500" },
  burnout: { label: "الاحتراق النفسي", icon: "🔥", desc: "الإجهاد المزمن والضغط النفسي", color: "text-orange-500" },
  heart_disease: { label: "أمراض القلب", icon: "❤️‍🩹", desc: "مخاطر القلب والأوعية الدموية", color: "text-red-500" },
  productivity: { label: "الإنتاجية", icon: "📈", desc: "مؤشر الطاقة والإنتاجية الوظيفية", color: "text-emerald-500" },
};

const riskColors: Record<string, string> = {
  low: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  moderate: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  high: "text-orange-500 bg-orange-500/10 border-orange-500/20",
  critical: "text-red-500 bg-red-500/10 border-red-500/20",
};

const riskBg: Record<string, string> = {
  low: "bg-emerald-500",
  moderate: "bg-amber-500",
  high: "bg-orange-500",
  critical: "bg-red-500",
};

export default function EmployeeInsightsPage() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [hraHistory, setHraHistory] = useState<HRAResult[]>([]);
  const [wellness, setWellness] = useState<WellnessHistory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [predRes, hraRes, wellRes] = await Promise.all([
          fetch("/api/predictions"),
          fetch("/api/hra"),
          fetch("/api/wellness"),
        ]);
        if (predRes.ok) setPredictions(await predRes.json());
        if (hraRes.ok) {
          const data = await hraRes.json();
          setHraHistory(Array.isArray(data) ? data : []);
        }
        if (wellRes.ok) setWellness(await wellRes.json());
      } catch (e) {
        console.error("Failed to load insights", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const score = wellness?.score ?? 0;
  const scoreColor = score >= 80 ? "text-emerald" : score >= 60 ? "text-amber-500" : "text-rose-500";

  // Build health radar data
  const radarData = wellness ? [
    { metric: "النوم", value: wellness.sleepScore },
    { metric: "النشاط", value: wellness.activityScore },
    { metric: "التوتر", value: 100 - wellness.stressScore },
    { metric: "التغذية", value: wellness.nutritionScore },
    { metric: "العافية", value: wellness.score },
  ] : [];

  // Calculate overall risk summary
  const highPredictions = predictions.filter((p) => p.riskLevel === "high" || p.riskLevel === "critical");
  const latestHRA = hraHistory[0];
  const lastAssessmentDate = latestHRA ? new Date(latestHRA.completedAt) : null;
  const daysSinceAssessment = lastAssessmentDate
    ? Math.floor((Date.now() - lastAssessmentDate.getTime()) / (1000 * 60 * 60 * 24))
    : null;

  // Score trend for chart
  const scoreHistory = wellness?.trendHistory?.length
    ? wellness.trendHistory.map((h) => ({
        date: new Date(h.date).toLocaleDateString("ar-SA", { month: "short", day: "numeric" }),
        score: h.score,
      }))
    : [];

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
          {/* Breadcrumb */}
          <div className="fade-in-up mb-5 flex items-center justify-between">
            <Link href="/dashboard/employee" className="text-sm text-emerald hover:underline inline-flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" /> العودة للوحة التحكم
            </Link>
          </div>

          {/* Header */}
          <div className="fade-in-up mb-6">
            <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
              <Brain className="h-7 w-7 text-emerald" />
              الرؤى الصحية الذكية
            </h1>
            <p className="text-secondary mt-1">تحليل شامل لحالتك الصحية مع توصيات مخصصة من الذكاء الاصطناعي</p>
          </div>

          {/* ── Summary Cards ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              {
                label: "درجة العافية", value: `${score}%`, sub: wellness?.trend === "improving" ? "في تحسن" : wellness?.trend === "declining" ? "في انخفاض" : "مستقرة",
                icon: Heart, color: "from-rose-500 to-pink-600", trend: wellness?.trend,
              },
              {
                label: "التقييمات الصحية", value: `${hraHistory.length}`, sub: daysSinceAssessment !== null ? `آخرها منذ ${daysSinceAssessment} يوم` : "لم يتم بعد",
                icon: FileText, color: "from-blue-500 to-indigo-600",
              },
              {
                label: "التوقعات الذكية", value: `${predictions.length}`, sub: `${highPredictions.length} تحتاج متابعة`,
                icon: Sparkles, color: "from-emerald-500 to-emerald-600",
              },
              {
                label: "مستوى المخاطر", value: latestHRA?.riskLevel === "low" ? "منخفض" : latestHRA?.riskLevel === "moderate" ? "متوسط" : latestHRA?.riskLevel === "high" ? "مرتفع" : "حرج",
                sub: wellness?.riskLevel === "low" ? "آمن" : "يحتاج متابعة",
                icon: Shield, color: wellness?.riskLevel === "low" ? "from-emerald-500 to-emerald-600" : "from-amber-500 to-orange-600",
              },
            ].map((kpi, i) => (
              <div key={kpi.label} className={`shade-card p-5 ${i === 0 ? "fade-in-up-delay-1" : i === 1 ? "fade-in-up-delay-2" : i === 2 ? "fade-in-up-delay-3" : "fade-in-up-delay-4"}`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${kpi.color} flex items-center justify-center`}>
                    <kpi.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className={`text-xs font-semibold ${kpi.trend === "improving" ? "text-emerald" : kpi.trend === "declining" ? "text-rose-500" : "text-secondary"}`}>
                    {kpi.sub}
                  </span>
                </div>
                <p className="stat-number text-primary">{kpi.value}</p>
                <p className="text-xs text-[var(--text-muted)] mt-1">{kpi.label}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* ── Wellness Trend Chart ── */}
            <div className="lg:col-span-2 shade-card p-6 fade-in-up-delay-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-primary flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-emerald" /> تطور درجة العافية
                </h2>
                {wellness?.trend && (
                  <span className={`tag text-xs py-0.5 px-3 ${
                    wellness.trend === "improving" ? "bg-emerald-soft text-emerald-dark" :
                    wellness.trend === "declining" ? "bg-rose-50 text-rose-500" :
                    "bg-gray-100 text-gray-500"
                  }`}>
                    {wellness.trend === "improving" ? "🟢 في تحسن" : wellness.trend === "declining" ? "🔴 في انخفاض" : "⚪ مستقر"}
                  </span>
                )}
              </div>
              {scoreHistory.length > 0 ? (
                <ResponsiveContainer width="100%" height={260}>
                  <AreaChart data={scoreHistory} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                    <defs>
                      <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#24A170" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#24A170" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                    <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(15,23,42,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                    <Area type="monotone" dataKey="score" stroke="#24A170" strokeWidth={2} fill="url(#scoreGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center py-12 text-secondary">
                  <BarChart3 className="h-10 w-10 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">لا توجد بيانات كافية للعرض</p>
                  <p className="text-xs mt-1">قم بإجراء تقييمين صحيين على الأقل لرؤية التطور</p>
                </div>
              )}
            </div>

            {/* ── Health Radar ── */}
            <div className="shade-card p-6 fade-in-up-delay-3">
              <h2 className="font-bold text-primary mb-4 flex items-center gap-2">
                <Activity className="h-5 w-5 text-emerald" /> خريطة الصحة
              </h2>
              {radarData.length > 0 ? (
                <ResponsiveContainer width="100%" height={260}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="rgba(255,255,255,0.08)" />
                    <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10, fill: '#94A3B8' }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar name="الصحة" dataKey="value" stroke="#24A170" fill="#24A170" fillOpacity={0.2} strokeWidth={2} />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(15,23,42,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                  </RadarChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center py-12 text-secondary">
                  <Activity className="h-10 w-10 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">لم يتم إجراء تقييم صحي بعد</p>
                </div>
              )}
            </div>
          </div>

          {/* ── AI Predictions ── */}
          <div className="shade-card p-6 mb-8 fade-in-up-delay-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-primary flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-emerald" /> توقعات الذكاء الاصطناعي
              </h2>
              <span className="tag-cyan text-[10px] px-2 py-0.5">AI</span>
            </div>
            {predictions.length === 0 ? (
              <div className="text-center py-10 text-secondary">
                <Brain className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p className="text-sm font-medium">لا توجد توقعات حتى الآن</p>
                <p className="text-xs mt-1">قم بإجراء التقييم الصحي لتفعيل التحليلات التنبؤية</p>
                <Link href="/hra" className="btn-primary text-xs py-2 px-5 mt-4 inline-flex">إجراء تقييم صحي</Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {predictions.map((pred) => {
                  const cfg = typeLabels[pred.type] || {
                    label: pred.type, icon: "🔮", desc: "", color: "text-secondary"
                  };
                  const probPct = Math.round(pred.probability * 100);
                  const riskLevel = pred.riskLevel;

                  return (
                    <div key={pred.id} className={`rounded-xl border p-5 ${riskColors[riskLevel] || "bg-white/[0.03] border-white/5"}`}>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{cfg.icon}</span>
                          <div>
                            <h3 className="font-bold text-primary text-sm">{cfg.label}</h3>
                            <p className="text-xs text-secondary">{cfg.desc}</p>
                          </div>
                        </div>
                        <div className="text-center shrink-0">
                          <div className={`text-lg font-extrabold ${riskLevel === "high" || riskLevel === "critical" ? "text-red-500" : riskLevel === "moderate" ? "text-amber-500" : "text-emerald"}`}>
                            {probPct}%
                          </div>
                          <div className="w-16 bg-[var(--surface-border)] rounded-full h-1.5 mt-1">
                            <div className={`h-1.5 rounded-full ${riskBg[riskLevel] || "bg-gray-400"}`}
                              style={{ width: `${probPct}%` }} />
                          </div>
                        </div>
                      </div>

                      {/* Contributing Factors */}
                      {pred.factors && Object.keys(pred.factors).length > 0 && (
                        <div className="mb-3">
                          <p className="text-xs text-secondary mb-1.5 font-medium">العوامل المؤثرة:</p>
                          <div className="flex flex-wrap gap-1.5">
                            {Object.entries(pred.factors).slice(0, 4).map(([key, val]) => (
                              <span key={key} className="text-[10px] py-0.5 px-2 rounded-md bg-white/5 text-secondary border border-white/5">
                                {key === "bmi" ? "مؤشر كتلة الجسم" :
                                 key === "sleep" ? "النوم" :
                                 key === "stress" ? "التوتر" :
                                 key === "activity" ? "النشاط" :
                                 key === "nutrition" ? "التغذية" :
                                 key === "age" ? "العمر" :
                                 key === "family_history" ? "التاريخ العائلي" :
                                 key === "smoking" ? "التدخين" : key}: {Math.round(val * 100)}%
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Suggestions */}
                      {pred.suggestions && pred.suggestions.length > 0 && (
                        <div className="pt-3 border-t border-white/5">
                          <p className="text-xs text-secondary mb-1.5 font-medium">التوصيات:</p>
                          <ul className="space-y-1">
                            {pred.suggestions.slice(0, 2).map((s, i) => (
                              <li key={i} className="text-xs text-secondary flex items-start gap-1.5">
                                <Lightbulb className="h-3 w-3 text-amber-400 shrink-0 mt-0.5" />
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="mt-3 text-[10px] text-secondary">
                        {new Date(pred.createdAt).toLocaleDateString("ar-SA")}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── HRA History & Recommendations ── */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Assessment History */}
            <div className="shade-card p-6 fade-in-up-delay-3">
              <h2 className="font-bold text-primary mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-emerald" /> سجل التقييمات الصحية
              </h2>
              {hraHistory.length === 0 ? (
                <div className="text-center py-8 text-secondary">
                  <FileText className="h-10 w-10 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">لم يتم إجراء أي تقييم صحي</p>
                  <Link href="/hra" className="btn-primary text-xs py-2 px-5 mt-3 inline-flex">
                    ابدأ التقييم الأول
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {hraHistory.map((hra) => {
                    const rl = hra.riskLevel || "low";
                    return (
                      <div key={hra.id} className="flex items-center justify-between p-3 rounded-xl bg-surface-mid border border-[var(--surface-border)]">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full ${riskBg[rl] || "bg-gray-400"} flex items-center justify-center text-white text-xs font-bold`}>
                            {hra.responses?.bmi ? "H" : "R"}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-primary">
                              {rl === "low" ? "منخفض" : rl === "moderate" ? "متوسط" : rl === "high" ? "مرتفع" : "حرج"}
                            </p>
                            <p className="text-xs text-secondary">
                              {new Date(hra.completedAt).toLocaleDateString("ar-SA", {
                                weekday: "short", year: "numeric", month: "short", day: "numeric"
                              })}
                            </p>
                          </div>
                        </div>
                        <span className={`tag text-xs py-0.5 px-2.5 ${riskColors[rl]}`}>
                          {rl === "low" ? "🟢" : rl === "moderate" ? "🟡" : rl === "high" ? "🟠" : "🔴"} {rl}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Smart Recommendations */}
            <div className="shade-card p-6 fade-in-up-delay-4">
              <h2 className="font-bold text-primary mb-4 flex items-center gap-2">
                <Target className="h-5 w-5 text-emerald" /> توصيات مخصصة
              </h2>
              {latestHRA?.recommendations?.recommendations && latestHRA.recommendations.recommendations.length > 0 ? (
                <div className="space-y-3">
                  {latestHRA.recommendations.recommendations.map((rec: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-emerald-soft/50 border border-emerald-500/10">
                      <div className="w-6 h-6 rounded-full bg-emerald-soft flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald" />
                      </div>
                      <p className="text-sm text-secondary">{rec}</p>
                    </div>
                  ))}
                  <div className="pt-3 border-t border-[var(--surface-border)]">
                    <p className="text-xs text-secondary">
                      آخر تحديث: {new Date(latestHRA.completedAt).toLocaleDateString("ar-SA")}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-secondary">
                  <Lightbulb className="h-10 w-10 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">لا توجد توصيات حالياً</p>
                  <p className="text-xs mt-1">قم بإجراء التقييم الصحي للحصول على توصيات مخصصة</p>
                  <Link href="/hra" className="btn-primary text-xs py-2 px-5 mt-3 inline-flex">
                    تقييم صحي
                  </Link>
                </div>
              )}

              {/* Quick Actions */}
              <div className="mt-6 pt-4 border-t border-[var(--surface-border)]">
                <p className="text-xs font-medium text-secondary mb-3">إجراءات مقترحة:</p>
                <div className="flex flex-wrap gap-2">
                  <Link href="/dashboard/employee/consultations"
                    className="text-xs py-1.5 px-3 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-all flex items-center gap-1">
                    🩺 حجز استشارة
                  </Link>
                  <Link href="/dashboard/employee/meals"
                    className="text-xs py-1.5 px-3 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-all flex items-center gap-1">
                    🍽️ طلب وجبة
                  </Link>
                  <Link href="/hra"
                    className="text-xs py-1.5 px-3 rounded-lg bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition-all flex items-center gap-1">
                    📋 تقييم جديد
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ── Health Goals & Achievements ── */}
          {wellness && (
            <div className="shade-card p-6 fade-in-up-delay-4">
              <h2 className="font-bold text-primary mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-400" /> الإنجازات والأهداف
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  {
                    label: "مثابر", achieved: true,
                    desc: "أكملت تقييمك الصحي الأول", icon: "🌟",
                  },
                  {
                    label: "نوم مثالي", achieved: (wellness.sleepScore || 0) >= 75,
                    desc: "درجة النوم ٧٥٪ فأكثر", icon: "🌙",
                  },
                  {
                    label: "نشاط عالي", achieved: (wellness.activityScore || 0) >= 75,
                    desc: "درجة النشاط ٧٥٪ فأكثر", icon: "⚡",
                  },
                  {
                    label: "عافية ممتازة", achieved: (wellness.score || 0) >= 80,
                    desc: "درجة العافية ٨٠٪ فأكثر", icon: "🏆",
                  },
                  {
                    label: "تغذية متوازنة", achieved: (wellness.nutritionScore || 0) >= 75,
                    desc: "درجة التغذية ٧٥٪ فأكثر", icon: "🥗",
                  },
                  {
                    label: "هادئ", achieved: (wellness.stressScore || 100) <= 30,
                    desc: "مستوى التوتر منخفض", icon: "🧘",
                  },
                  {
                    label: "متقدم", achieved: hraHistory.length >= 2,
                    desc: "أجريت تقييمين صحيين أو أكثر", icon: "📈",
                  },
                  {
                    label: "متابع", achieved: predictions.length >= 2,
                    desc: "تلقيت توقعات ذكية متعددة", icon: "🔮",
                  },
                ].map((badge) => (
                  <div key={badge.label} className={`p-4 rounded-xl text-center transition-all ${
                    badge.achieved
                      ? "bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20"
                      : "bg-surface-mid border border-[var(--surface-border)] opacity-50"
                  }`}>
                    <span className="text-2xl block mb-1">{badge.icon}</span>
                    <p className="text-sm font-bold text-primary">{badge.label}</p>
                    <p className="text-[10px] text-secondary mt-0.5">{badge.desc}</p>
                    {badge.achieved && (
                      <span className="text-[10px] text-emerald mt-1 block">✅ مكتمل</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}
