"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import { ChevronLeft, Calendar, Clock, User, Loader2, CheckCircle, XCircle, Video, Phone, Filter } from "lucide-react";

type User = { id: string; firstName: string; lastName: string; email: string; role: string; department: string | null };
type Consultation = {
  id: string; type: string; status: string; scheduledAt: string; notes: string | null;
  patient: { firstName: string; lastName: string; department: string | null };
};

const typeOptions = [
  { value: "nutrition", label: "تغذية علاجية" },
  { value: "fitness", label: "لياقة بدنية" },
  { value: "mental", label: "استشارة نفسية" },
  { value: "general", label: "عام" },
];

const typeLabels: Record<string, string> = { nutrition: "تغذية", fitness: "لياقة", mental: "نفسية", general: "عام" };
const statusConfig: Record<string, { label: string; color: string }> = {
  scheduled: { label: "مجدول", color: "bg-blue-100 text-blue-700" },
  in_progress: { label: "قيد الإجراء", color: "bg-amber-100 text-amber-700" },
  completed: { label: "مكتمل", color: "bg-emerald-100 text-emerald-700" },
  cancelled: { label: "ملغي", color: "bg-red-100 text-red-600" },
};

export default function SchedulePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [form, setForm] = useState({ patientId: "", type: "nutrition", scheduledAt: "", notes: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [activeTab, setActiveTab] = useState<"new" | "upcoming">("upcoming");

  async function loadData() {
    try {
      const [usersRes, consRes] = await Promise.all([
        fetch("/api/users"),
        fetch("/api/consultations?type=all"),
      ]);
      if (usersRes.ok) setUsers(await usersRes.json() || []);
      if (consRes.ok) setConsultations(await consRes.json() || []);
    } catch {}
  }

  useEffect(() => { loadData(); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.patientId || !form.scheduledAt) return;
    setLoading(true);
    setMsg("");
    try {
      const res = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setMsg("✅ تم جدولة الاستشارة بنجاح!");
        setForm({ patientId: "", type: "nutrition", scheduledAt: "", notes: "" });
        loadData();
      } else {
        const err = await res.json();
        setMsg(`❌ ${err.error || "حدث خطأ"}`);
      }
    } catch {
      setMsg("❌ حدث خطأ في الاتصال");
    } finally {
      setLoading(false);
    }
  }

  const upcoming = consultations.filter(c => c.status === "scheduled" || c.status === "in_progress")
    .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime());
  const past = consultations.filter(c => c.status === "completed" || c.status === "cancelled")
    .sort((a, b) => new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime());
  const todayCount = consultations.filter(c =>
    c.status !== "cancelled" &&
    new Date(c.scheduledAt).toDateString() === new Date().toDateString()
  ).length;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface-mid pt-24">
        <div className="container-shade py-8">
          <div className="fade-in-up mb-8">
            <Link href="/dashboard/hr" className="text-sm text-emerald hover:underline inline-flex items-center gap-1 mb-2">
              <ChevronLeft className="h-4 w-4" /> العودة للوحة التحكم
            </Link>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-primary">📅 جدولة الاستشارات</h1>
                <p className="text-secondary">إدارة وجدولة استشارات الموظفين</p>
              </div>
              {todayCount > 0 && (
                <div className="text-sm bg-blue-50 text-blue-700 px-4 py-2 rounded-xl font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> {todayCount} استشارة اليوم
                </div>
              )}
            </div>
          </div>

          {msg && (
            <div className={`fade-in-up mb-6 rounded-xl px-5 py-3 text-sm text-center font-medium ${
              msg.includes("✅") ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"
            }`}>
              {msg}
            </div>
          )}

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === "upcoming" ? "bg-emerald text-white shadow-md" : "bg-white text-secondary border border-[var(--surface-border)]"
              }`}
            >
              الاستشارات القادمة ({upcoming.length})
            </button>
            <button
              onClick={() => setActiveTab("new")}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === "new" ? "bg-emerald text-white shadow-md" : "bg-white text-secondary border border-[var(--surface-border)]"
              }`}
            >
              + جدولة جديدة
            </button>
          </div>

          {activeTab === "new" && (
            <div className="max-w-2xl mx-auto">
              <div className="shade-card p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary">الموظف</label>
                    <select
                      value={form.patientId}
                      onChange={(e) => setForm((p) => ({ ...p, patientId: e.target.value }))}
                      required
                      className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-3 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-emerald/30"
                    >
                      <option value="">اختر موظفاً...</option>
                      {users.filter((u) => u.role === "EMPLOYEE").map((u) => (
                        <option key={u.id} value={u.id}>{u.firstName} {u.lastName} {u.department ? `— ${u.department}` : ""}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary">نوع الاستشارة</label>
                    <select
                      value={form.type}
                      onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}
                      className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-3 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-emerald/30"
                    >
                      {typeOptions.map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-primary">التاريخ</label>
                      <input
                        type="date"
                        value={form.scheduledAt.split("T")[0] || ""}
                        onChange={(e) => setForm((p) => ({ ...p, scheduledAt: e.target.value }))}
                        min={new Date().toISOString().split("T")[0]}
                        required
                        className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-3 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-emerald/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-primary">الوقت</label>
                      <input
                        type="time"
                        value={form.scheduledAt.split("T")[1]?.slice(0, 5) || ""}
                        onChange={(e) => setForm((p) => ({ ...p, scheduledAt: `${new Date().toISOString().split("T")[0]}T${e.target.value}:00` }))}
                        required
                        className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-3 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-emerald/30"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary">ملاحظات (اختياري)</label>
                    <textarea
                      value={form.notes}
                      onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                      rows={3}
                      placeholder="أي ملاحظات إضافية للاستشارة..."
                      className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-3 text-sm text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-emerald/30"
                    />
                  </div>

                  <button type="submit" disabled={loading} className="btn-primary w-full justify-center text-sm disabled:opacity-60">
                    {loading ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : <Calendar className="ml-2 h-4 w-4" />}
                    {loading ? "جاري الحجز..." : "تأكيد الحجز"}
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeTab === "upcoming" && (
            <>
              {upcoming.length === 0 ? (
                <div className="text-center py-16">
                  <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-lg font-medium text-primary">لا توجد استشارات قادمة</p>
                  <p className="text-sm text-secondary mt-1">قم بجدولة استشارة جديدة للموظفين</p>
                  <button onClick={() => setActiveTab("new")} className="btn-primary text-sm mt-4 px-6 py-2.5">
                    + جدولة استشارة
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {upcoming.map((c) => {
                    const dateStr = new Date(c.scheduledAt).toLocaleDateString("ar-SA", {
                      weekday: "long", year: "numeric", month: "long", day: "numeric"
                    });
                    const timeStr = new Date(c.scheduledAt).toLocaleTimeString("ar-SA", {
                      hour: "2-digit", minute: "2-digit"
                    });
                    const isToday = new Date(c.scheduledAt).toDateString() === new Date().toDateString();
                    return (
                      <div key={c.id} className={`shade-card p-5 flex items-center gap-4 hover:shadow-lg transition-all ${isToday ? "border-r-4 border-r-emerald" : ""}`}>
                        <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center shrink-0">
                          <User className="h-6 w-6 text-blue-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-primary">{c.patient.firstName} {c.patient.lastName}</p>
                          <p className="text-xs text-secondary">
                            {typeLabels[c.type] || c.type}
                            {c.patient.department ? ` — ${c.patient.department}` : ""}
                          </p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-secondary flex items-center gap-1">
                              <Calendar className="h-3 w-3" /> {dateStr}
                            </span>
                            <span className="text-xs text-secondary flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {timeStr}
                            </span>
                          </div>
                        </div>
                        <span className={`tag text-xs py-1 px-3 ${statusConfig[c.status]?.color || "bg-gray-100 text-gray-600"} whitespace-nowrap`}>
                          {statusConfig[c.status]?.label || c.status}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Past consultations */}
              {past.length > 0 && (
                <details className="mt-8 shade-card p-4">
                  <summary className="cursor-pointer text-sm font-medium text-secondary select-none flex items-center gap-2">
                    <Clock className="h-4 w-4" /> الاستشارات السابقة
                    <span className="tag text-xs py-0.5 px-2 bg-gray-100 text-gray-500">{past.length}</span>
                  </summary>
                  <div className="mt-4 space-y-2">
                    {past.slice(0, 10).map((c) => {
                      const dateStr = new Date(c.scheduledAt).toLocaleDateString("ar-SA");
                      return (
                        <div key={c.id} className="flex items-center justify-between py-2.5 border-b border-[var(--surface-border)] last:border-0">
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-primary font-medium">{c.patient.firstName} {c.patient.lastName}</span>
                            <span className="text-xs text-secondary">{typeLabels[c.type] || c.type}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-secondary">{dateStr}</span>
                            <span className={`tag text-[11px] py-0.5 px-2.5 ${statusConfig[c.status]?.color || "bg-gray-100 text-gray-600"} rounded-md`}>
                              {statusConfig[c.status]?.label || c.status}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </details>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}
