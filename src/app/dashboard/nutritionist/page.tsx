"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Loader2, CalendarDays, Users, FileText, Clock, CheckCircle,
  Video, Phone, User, Wifi, WifiOff, ChevronLeft, RefreshCw,
  TrendingUp, AlertTriangle, Star, MessageSquare, Activity,
  Brain, Heart, Apple, Zap, ChevronRight, ListChecks, Timer
} from "lucide-react";
import { SkeletonKPIGrid, SkeletonCard, SkeletonBlock, SkeletonTable } from "@/components/ui/skeleton";
import { useSSE } from "@/lib/useSSE";

// ── Types ──
type PatientUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string | null;
  wellnessScore?: { score: number; riskLevel: string } | null;
};

type Consultation = {
  id: string;
  type: string;
  status: string;
  scheduledAt: string;
  notes: string | null;
  patient: { firstName: string; lastName: string; email: string; department: string | null };
};

type HRAResult = {
  id: string;
  riskLevel: string;
  completedAt: string;
  responses: Record<string, any>;
};

// ── Config ──
const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  scheduled:    { label: "قادم",     color: "bg-blue-100 text-blue-700",       icon: CalendarDays },
  in_progress:  { label: "قيد الإجراء", color: "bg-amber-100 text-amber-700", icon: Clock },
  completed:    { label: "مكتمل",    color: "bg-emerald-100 text-emerald-700",  icon: CheckCircle },
  cancelled:    { label: "ملغي",    color: "bg-red-100 text-red-600",          icon: Clock },
};

const typeConfig: Record<string, { emoji: string; label: string }> = {
  nutrition: { emoji: "🥗", label: "تغذية" },
  fitness:   { emoji: "💪", label: "لياقة" },
  general:   { emoji: "🩺", label: "عام" },
  mental:    { emoji: "🧠", label: "نفسي" },
};

function timeAgo(date: Date): string {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "الآن";
  if (mins < 60) return `منذ ${mins} د`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `منذ ${hours} س`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `منذ ${days} ي`;
  return `منذ ${Math.floor(days / 30)} ش`;
}

export default function NutritionistDashboard() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [patients, setPatients] = useState<PatientUser[]>([]);
  const [hraMap, setHraMap] = useState<Record<string, HRAResult[]>>({});
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [updating, setUpdating] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<"schedule" | "patients" | "all">("schedule");
  const [noteInput, setNoteInput] = useState<Record<string, string>>({});
  const [savingNote, setSavingNote] = useState<string | null>(null);

  // ── Load all data ──
  const loadData = useCallback(async () => {
    try {
      const [consRes, usersRes] = await Promise.all([
        fetch("/api/consultations?type=all"),
        fetch("/api/users?role=EMPLOYEE"),
      ]);

      if (consRes.ok) setConsultations(await consRes.json());
      if (usersRes.ok) {
        const data = await usersRes.json();
        // `/api/users` returns array directly
        setPatients(Array.isArray(data) ? data : data.users || []);

        // Fetch HRA results for patients with wellness concerns
        if (Array.isArray(data) || data.users) {
          const patientList = Array.isArray(data) ? data : data.users;
          const hraPromises = patientList.slice(0, 50).map(async (p: PatientUser) => {
            try {
              const hraRes = await fetch(`/api/hra?userId=${p.id}`);
              if (hraRes.ok) return { userId: p.id, results: await hraRes.json() };
            } catch {}
            return { userId: p.id, results: [] };
          });
          const hraResults = await Promise.all(hraPromises);
          const hraMapData: Record<string, HRAResult[]> = {};
          hraResults.forEach((r) => { hraMapData[r.userId] = r.results || []; });
          setHraMap(hraMapData);
        }
      }
    } catch (e) {
      console.error("Failed to load data", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  // ── SSE for real-time updates ──
  useSSE("consultations", (event: any) => {
    if (event.type === "connected") setConnected(true);
    if (event.type === "consultations_update") {
      setConsultations(event.consultations || []);
      setConnected(true);
    }
  });

  // ── Update consultation status ──
  async function updateConsultation(id: string, status: string) {
    setUpdating(id);
    try {
      const res = await fetch("/api/consultations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        const updated = await res.json();
        setConsultations((prev) => prev.map((c) => (c.id === id ? { ...c, status: updated.status } : c)));
      }
    } catch (e) {
      console.error("Update failed", e);
    } finally {
      setUpdating(null);
    }
  }

  // ── Save consultation notes ──
  async function saveNotes(consultId: string) {
    const notes = noteInput[consultId];
    if (!notes?.trim()) return;
    setSavingNote(consultId);
    try {
      const res = await fetch("/api/consultations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: consultId, notes }),
      });
      if (res.ok) {
        setConsultations((prev) => prev.map((c) => (c.id === consultId ? { ...c, notes } : c)));
        setNoteInput((prev) => ({ ...prev, [consultId]: "" }));
      }
    } catch (e) {
      console.error("Failed to save notes", e);
    } finally {
      setSavingNote(null);
    }
  }

  // ── Computed ──
  const now = new Date();
  const todayStr = now.toDateString();
  const todayConsults = consultations.filter((c) => new Date(c.scheduledAt).toDateString() === todayStr);
  const upcoming = consultations.filter((c) => c.status === "scheduled");
  const inProgress = consultations.filter((c) => c.status === "in_progress");
  const completed = consultations.filter((c) => c.status === "completed");

  const highRiskPatients = patients.filter(
    (p) => p.wellnessScore?.riskLevel === "high" || p.wellnessScore?.riskLevel === "critical"
  );

  const todayByTime = [...todayConsults].sort(
    (a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()
  );

  // ── Loading ──
  if (loading) {
    return (
      <div className="min-h-screen bg-surface-mid pt-24">
        <div className="container-shade py-6">
          <div className="mb-6"><SkeletonBlock width="200px" height="28px" /></div>
          <SkeletonKPIGrid count={4} />
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <SkeletonCard lines={8} />
            <SkeletonCard lines={8} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface-mid pt-24 pb-12">
        <div className="container-shade py-6">
          {/* ── Header ── */}
          <div className="fade-in-up mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Link href="/dashboard/nutritionist" className="text-sm text-emerald hover:underline inline-flex items-center gap-1">
                  <ChevronLeft className="h-4 w-4" /> العودة
                </Link>
              </div>
              <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
                🥗 لوحة الاستشاري
              </h1>
              <p className="text-secondary mt-1">إدارة المرضى وجدولة الاستشارات الغذائية والصحية</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-colors ${
                connected ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
              }`}>
                {connected ? <Wifi className="h-3.5 w-3.5" /> : <WifiOff className="h-3.5 w-3.5" />}
                {connected ? "مباشر" : "غير متصل"}
              </span>
              <button onClick={loadData} className="text-sm p-2 rounded-xl border border-[var(--surface-border)] text-secondary hover:text-primary transition-all">
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* ── KPI Grid ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              { label: "استشارات اليوم", value: todayConsults.length, icon: CalendarDays, color: "from-emerald-500 to-emerald-600", sub: `${inProgress.length} قيد الإجراء` },
              { label: "بانتظار الموعد", value: upcoming.length, icon: Clock, color: "from-blue-500 to-indigo-600", sub: "قادمة" },
              { label: "مرضى المخاطر", value: highRiskPatients.length, icon: AlertTriangle, color: "from-rose-500 to-pink-600", sub: "يحتاج متابعة" },
              { label: "إجمالي المرضى", value: patients.length, icon: Users, color: "from-gray-500 to-gray-600", sub: `${completed.length} استشارة مكتملة` },
            ].map((s) => (
              <div key={s.label} className="shade-card p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center`}>
                    <s.icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-primary">{s.value}</span>
                </div>
                <p className="text-xs text-secondary">{s.label}</p>
                <p className="text-[10px] text-emerald mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* ── Tab Navigation ── */}
          <div className="fade-in-up mb-6 flex items-center gap-2 overflow-x-auto pb-2">
            {[
              { key: "schedule", label: `📅 جدول اليوم (${todayConsults.length})` },
              { key: "patients", label: `👥 المرضى (${patients.length})` },
              { key: "all", label: "📋 جميع الاستشارات" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedTab(tab.key as any)}
                className={`text-sm px-4 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                  selectedTab === tab.key
                    ? "bg-emerald text-white shadow-lg shadow-emerald/20"
                    : "bg-surface-mid text-secondary hover:text-primary border border-[var(--surface-border)]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ════════════════════════════════════════ */}
          {/* TAB 1: TODAY'S SCHEDULE                */}
          {/* ════════════════════════════════════════ */}
          {selectedTab === "schedule" && (
            <>
              {todayConsults.length === 0 ? (
                <div className="shade-card p-12 text-center text-secondary">
                  <CalendarDays className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p className="text-lg font-medium">لا توجد استشارات اليوم</p>
                  <p className="text-sm mt-1">يوم هادئ! استعد للاستشارات القادمة</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <h2 className="font-bold text-primary text-lg flex items-center gap-2">
                    <Timer className="h-5 w-5 text-emerald" />
                    جدول اليوم — {todayConsults.length} استشارة
                  </h2>
                  {/* Timeline */}
                  <div className="relative pr-6">
                    {/* Vertical line */}
                    <div className="absolute right-2 top-2 bottom-2 w-0.5 bg-gradient-to-b from-emerald-300 via-amber-300 to-blue-300 rounded-full" />

                    {todayByTime.map((c, idx) => {
                      const cfg = statusConfig[c.status] || statusConfig.scheduled;
                      const StatusIcon = cfg.icon;
                      const tcfg = typeConfig[c.type] || { emoji: "🩺", label: c.type };
                      const time = new Date(c.scheduledAt);
                      const isNow = c.status === "in_progress";
                      const isPast = c.status === "completed" || c.status === "cancelled";
                      const isUpcoming = c.status === "scheduled";

                      return (
                        <div
                          key={c.id}
                          className={`relative mb-4 pr-4 fade-in-up ${isNow ? "" : ""}`}
                          style={{ animationDelay: `${idx * 0.05}s` }}
                        >
                          {/* Timeline dot */}
                          <div className={`absolute right-[-8px] top-2 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm ${
                            isNow ? "bg-amber-500 animate-pulse" :
                            isPast ? "bg-gray-400" :
                            "bg-emerald-500"
                          }`} />

                          <div className={`shade-card p-4 transition-all duration-300 ${
                            isNow ? "ring-2 ring-amber-400/50 shadow-lg shadow-amber-500/10" : "hover:shadow-md"
                          }`}>
                            <div className="flex flex-wrap items-start justify-between gap-3">
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                <div className={`w-11 h-11 rounded-xl ${cfg.color.split(" ")[0]} flex items-center justify-center shrink-0`}>
                                  <StatusIcon className={`h-5 w-5 ${cfg.color.split(" ")[1]}`} />
                                </div>
                                <div className="min-w-0">
                                  <p className="font-bold text-primary text-sm">{tcfg.emoji} {tcfg.label}</p>
                                  <div className="flex items-center gap-2 text-xs text-secondary mt-0.5">
                                    <User className="h-3 w-3" />
                                    <span className="font-medium text-primary">{c.patient.firstName} {c.patient.lastName}</span>
                                    {c.patient.department && <><span className="opacity-30">|</span> {c.patient.department}</>}
                                  </div>
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[11px] font-mono bg-surface-mid px-2 py-0.5 rounded-md text-secondary">
                                      {time.toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" })}
                                    </span>
                                    <span className={`tag text-[11px] py-0.5 px-2 ${cfg.color} rounded-md`}>{cfg.label}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Actions */}
                              <div className="flex items-center gap-2 shrink-0">
                                {c.status === "scheduled" && (
                                  <button
                                    onClick={() => updateConsultation(c.id, "in_progress")}
                                    disabled={updating === c.id}
                                    className="text-xs py-1.5 px-3 rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition-all disabled:opacity-50 font-medium flex items-center gap-1"
                                  >
                                    {updating === c.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <PlayIcon className="h-3 w-3" />}
                                    بدء
                                  </button>
                                )}
                                {c.status === "in_progress" && (
                                  <>
                                    <button
                                      onClick={() => updateConsultation(c.id, "completed")}
                                      disabled={updating === c.id}
                                      className="text-xs py-1.5 px-3 rounded-lg bg-emerald text-white hover:bg-emerald-dark transition-all disabled:opacity-50 font-medium flex items-center gap-1"
                                    >
                                      {updating === c.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <CheckCircle className="h-3 w-3" />}
                                      إكمال
                                    </button>
                                    <button
                                      className="text-xs py-1.5 px-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all flex items-center gap-1 font-medium"
                                      title="بدء مكالمة فيديو"
                                    >
                                      <Video className="h-3 w-3" />
                                      فيديو
                                    </button>
                                  </>
                                )}
                                {(c.status === "scheduled" || c.status === "in_progress") && (
                                  <button
                                    onClick={() => updateConsultation(c.id, "cancelled")}
                                    disabled={updating === c.id}
                                    className="text-xs py-1.5 px-2.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-all disabled:opacity-50 font-medium"
                                  >
                                    {updating === c.id ? <Loader2 className="h-3 w-3 animate-spin" /> : "إلغاء"}
                                  </button>
                                )}
                              </div>
                            </div>

                            {/* Notes Section */}
                            <div className="mt-3 pt-3 border-t border-[var(--surface-border)]">
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  placeholder={c.notes ? `📝 ${c.notes}` : "أضف ملاحظات الاستشارة..."}
                                  value={noteInput[c.id] || ""}
                                  onChange={(e) => setNoteInput((prev) => ({ ...prev, [c.id]: e.target.value }))}
                                  className="flex-1 text-xs rounded-lg border border-[var(--surface-border)] bg-surface-mid px-3 py-1.5 text-primary placeholder:text-secondary focus:outline-none focus:ring-1 focus:ring-emerald-ai/30"
                                />
                                {noteInput[c.id]?.trim() && (
                                  <button
                                    onClick={() => saveNotes(c.id)}
                                    disabled={savingNote === c.id}
                                    className="text-xs py-1.5 px-3 rounded-lg bg-emerald/10 text-emerald hover:bg-emerald/20 transition-all disabled:opacity-50 font-medium"
                                  >
                                    {savingNote === c.id ? <Loader2 className="h-3 w-3 animate-spin" /> : "حفظ"}
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Upcoming consultations this week */}
              {upcoming.length > todayConsults.length && (
                <details className="shade-card p-4 mt-6">
                  <summary className="cursor-pointer text-sm font-medium text-secondary select-none flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    استشارات قادمة هذا الأسبوع ({upcoming.length - todayConsults.length})
                  </summary>
                  <div className="mt-4 space-y-2">
                    {upcoming.filter((c) => !todayConsults.find((t) => t.id === c.id)).slice(0, 5).map((c) => (
                      <div key={c.id} className="flex items-center justify-between text-sm py-2.5 border-b border-[var(--surface-border)] last:border-0">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{typeConfig[c.type]?.emoji || "🩺"}</span>
                          <div>
                            <p className="font-medium text-primary">{c.patient.firstName} {c.patient.lastName}</p>
                            <p className="text-xs text-secondary">{c.patient.department || "بدون قسم"}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-secondary">
                            {new Date(c.scheduledAt).toLocaleDateString("ar-SA", { weekday: "short", day: "numeric", month: "short" })}
                          </span>
                          <span className="tag text-[11px] py-0.5 px-2 bg-blue-100 text-blue-700 rounded-md">
                            {new Date(c.scheduledAt).toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </details>
              )}
            </>
          )}

          {/* ════════════════════════════════════════ */}
          {/* TAB 2: PATIENT LIST                    */}
          {/* ════════════════════════════════════════ */}
          {selectedTab === "patients" && (
            <>
              {patients.length === 0 ? (
                <div className="shade-card p-12 text-center text-secondary">
                  <Users className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p className="text-lg font-medium">لا يوجد مرضى</p>
                  <p className="text-sm mt-1">سيظهر المرضى هنا بعد أن يقوم الموظفون بالتسجيل</p>
                </div>
              ) : (
                <>
                  {/* High-risk alert */}
                  {highRiskPatients.length > 0 && (
                    <div className="fade-in-up mb-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 px-5 py-3.5 text-sm text-rose-600 flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 shrink-0" />
                      <span className="font-medium">{highRiskPatients.length} مرضى بمخاطر صحية عالية — يفضل متابعتهم قريباً</span>
                    </div>
                  )}

                      {/* Patient cards */}
                      <div className="grid md:grid-cols-2 gap-3">
                        {patients.map((p) => {
                          const ws = p.wellnessScore;
                          const riskLevel = ws?.riskLevel || "unknown";
                          const riskColor =
                            riskLevel === "critical" || riskLevel === "high" ? "text-rose-500 bg-rose-50" :
                            riskLevel === "moderate" ? "text-amber-500 bg-amber-50" :
                            "text-emerald bg-emerald-soft";
                          const riskText =
                            riskLevel === "critical" ? "🔴 حرج" :
                            riskLevel === "high" ? "🟠 مرتفع" :
                            riskLevel === "moderate" ? "🟡 متوسط" :
                            ws?.score ? "🟢 منخفض" : "⚪ غير مقيم";

                          const patientConsults = consultations.filter((c) => c.patient.email === p.email);
                          const lastConsult = patientConsults.length > 0 ? patientConsults[0] : null;

                          return (
                            <div key={p.id} className="shade-card p-4 hover:shadow-md transition-all">
                              <div className="flex items-start justify-between gap-3 mb-3">
                                <div className="flex items-center gap-3">
                                  <div className={`w-10 h-10 rounded-full ${
                                    riskLevel === "high" || riskLevel === "critical"
                                      ? "bg-rose-500"
                                      : riskLevel === "moderate"
                                      ? "bg-amber-500"
                                      : "bg-emerald-500"
                                  } text-white flex items-center justify-center text-sm font-bold`}>
                                    {p.firstName.charAt(0)}
                                  </div>
                                  <div>
                                    <p className="font-semibold text-primary text-sm">{p.firstName} {p.lastName}</p>
                                    <p className="text-xs text-secondary">{p.department || "بدون قسم"}</p>
                                  </div>
                                </div>
                                <span className={`tag text-[11px] py-0.5 px-2.5 rounded-lg font-medium ${riskColor}`}>
                                  {riskText}
                                </span>
                              </div>

                              {/* Health score bar */}
                              <div className="mb-3">
                                <div className="flex items-center justify-between text-xs mb-1">
                                  <span className="text-secondary">درجة العافية</span>
                                  <span className="font-bold text-primary">{ws?.score || "—"}</span>
                                </div>
                                <div className="bg-[var(--surface-border)] rounded-full h-1.5 overflow-hidden">
                                  <div className={`h-1.5 rounded-full transition-all ${
                                    (ws?.score || 0) >= 75 ? "bg-emerald-400" :
                                    (ws?.score || 0) >= 55 ? "bg-amber-400" :
                                    "bg-rose-400"
                                  }`} style={{ width: `${ws?.score || 0}%` }} />
                                </div>
                              </div>

                              {/* Last activity */}
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-secondary flex items-center gap-1">
                                  <FileText className="h-3 w-3" />
                                  {lastConsult
                                    ? `${typeConfig[lastConsult.type]?.emoji || "🩺"} ${timeAgo(new Date(lastConsult.scheduledAt))}`
                                    : "لا توجد استشارات سابقة"}
                                </span>
                                <span className="text-secondary">{patientConsults.length} استشارة</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                </>
              )}
            </>
          )}

          {/* ════════════════════════════════════════ */}
          {/* TAB 3: ALL CONSULTATIONS               */}
          {/* ════════════════════════════════════════ */}
          {selectedTab === "all" && (
            <>
              {consultations.length === 0 ? (
                <div className="shade-card p-12 text-center text-secondary">
                  <CalendarDays className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p className="text-lg font-medium">لا توجد استشارات حتى الآن</p>
                  <p className="text-sm mt-1">عند حجز الموظفين للاستشارات ستظهر هنا</p>
                </div>
              ) : (
                <div className="shade-card overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[var(--surface-border)] bg-surface-mid/50">
                          <th className="text-right py-3 px-4 text-secondary font-medium">المريض</th>
                          <th className="text-right py-3 px-4 text-secondary font-medium">النوع</th>
                          <th className="text-right py-3 px-4 text-secondary font-medium">القسم</th>
                          <th className="text-right py-3 px-4 text-secondary font-medium">الموعد</th>
                          <th className="text-center py-3 px-4 text-secondary font-medium">الحالة</th>
                          <th className="text-center py-3 px-4 text-secondary font-medium">إجراء</th>
                        </tr>
                      </thead>
                      <tbody>
                        {consultations.map((c) => {
                          const cfg = statusConfig[c.status] || statusConfig.scheduled;
                          const StatusIcon = cfg.icon;
                          const tcfg = typeConfig[c.type] || { emoji: "🩺", label: c.type };
                          const isLive = c.status === "in_progress";

                          return (
                            <tr key={c.id} className={`border-b border-[var(--surface-border)] last:border-0 hover:bg-[var(--white-warm)] transition-colors ${
                              isLive ? "bg-amber-50/50" : ""
                            }`}>
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-2">
                                  <div className="w-7 h-7 rounded-full bg-emerald-gradient text-white flex items-center justify-center text-xs font-bold">
                                    {c.patient.firstName.charAt(0)}
                                  </div>
                                  <span className="font-semibold text-primary">{c.patient.firstName} {c.patient.lastName}</span>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <span className="flex items-center gap-1">{tcfg.emoji} {tcfg.label}</span>
                              </td>
                              <td className="py-3 px-4 text-secondary">{c.patient.department || "—"}</td>
                              <td className="py-3 px-4 text-secondary text-xs">
                                {new Date(c.scheduledAt).toLocaleDateString("ar-SA")}
                                <br />
                                {new Date(c.scheduledAt).toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" })}
                              </td>
                              <td className="py-3 px-4 text-center">
                                <span className={`tag text-xs py-1 px-2.5 ${cfg.color} rounded-lg inline-flex items-center gap-1`}>
                                  <StatusIcon className="h-3 w-3" /> {cfg.label}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-center">
                                <div className="flex items-center justify-center gap-1">
                                  {c.status === "scheduled" && (
                                    <button
                                      onClick={() => updateConsultation(c.id, "in_progress")}
                                      disabled={updating === c.id}
                                      className="text-[10px] py-1 px-2 rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200 transition-all disabled:opacity-50 font-medium"
                                    >
                                      {updating === c.id ? <Loader2 className="h-3 w-3 animate-spin" /> : "بدء"}
                                    </button>
                                  )}
                                  {c.status === "in_progress" && (
                                    <button
                                      onClick={() => updateConsultation(c.id, "completed")}
                                      disabled={updating === c.id}
                                      className="text-[10px] py-1 px-2 rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-all disabled:opacity-50 font-medium"
                                    >
                                      {updating === c.id ? <Loader2 className="h-3 w-3 animate-spin" /> : "إكمال"}
                                    </button>
                                  )}
                                  {(c.status === "scheduled" || c.status === "in_progress") && (
                                    <button
                                      onClick={() => updateConsultation(c.id, "cancelled")}
                                      disabled={updating === c.id}
                                      className="text-[10px] py-1 px-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-all disabled:opacity-50 font-medium"
                                    >
                                      إلغاء
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

// ── Small Play icon (since lucide doesn't have a simple play triangle) ──
function PlayIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
