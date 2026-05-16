"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Loader2, ChevronLeft, Calendar, Phone, Video, Clock, CheckCircle, XCircle, Filter, Search, User } from "lucide-react";
import { SkeletonBlock, SkeletonKPIGrid, SkeletonTable } from "@/components/ui/skeleton";

type Consultation = {
  id: string;
  type: string;
  status: string;
  scheduledAt: string;
  notes: string | null;
  patient: { firstName: string; lastName: string; email: string; department: string | null };
  consultant: { firstName: string; lastName: string } | null;
};

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  scheduled: { label: "مجدول", color: "bg-blue-100 text-blue-700", icon: Calendar },
  in_progress: { label: "قيد الإجراء", color: "bg-amber-100 text-amber-700", icon: Clock },
  completed: { label: "مكتمل", color: "bg-emerald-100 text-emerald-700", icon: CheckCircle },
  cancelled: { label: "ملغي", color: "bg-red-100 text-red-600", icon: XCircle },
};

const typeLabels: Record<string, string> = {
  nutrition: "تغذية",
  fitness: "لياقة بدنية",
  general: "عام",
  mental: "نفسي",
};

const typeIcons: Record<string, string> = {
  nutrition: "🥗",
  fitness: "💪",
  general: "🩺",
  mental: "🧠",
};

export default function AdminConsultationsPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/consultations?type=all");
        if (res.ok) setConsultations(await res.json());
      } catch (e) {
        console.error("Failed to load consultations", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function updateStatus(id: string, status: string) {
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

  const filtered = consultations.filter((c) => {
    const matchesStatus = filter === "all" || c.status === filter;
    const name = `${c.patient.firstName} ${c.patient.lastName}`.toLowerCase();
    const matchesSearch = name.includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: consultations.length,
    upcoming: consultations.filter((c) => c.status === "scheduled").length,
    completed: consultations.filter((c) => c.status === "completed").length,
    cancelled: consultations.filter((c) => c.status === "cancelled").length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-mid pt-24">
        <div className="container-shade py-6">
          <div className="mb-6"><SkeletonBlock width="200px" height="28px" /></div>
          <SkeletonKPIGrid count={4} />
          <div className="mt-6"><SkeletonTable rows={6} cols={7} /></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface-mid pt-24 pb-12">
        <div className="container-shade py-6">
          <div className="fade-in-up mb-5">
            <Link href="/dashboard/admin" className="text-sm text-emerald hover:underline inline-flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" /> العودة للوحة التحكم
            </Link>
          </div>

          <div className="fade-in-up mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
                📅 الاستشارات
              </h1>
              <p className="text-secondary mt-1">إدارة الاستشارات الصحية للموظفين — {consultations.length} استشارة</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: "إجمالي الاستشارات", value: stats.total, color: "from-blue-500 to-indigo-600" },
              { label: "قادمة", value: stats.upcoming, color: "from-emerald-500 to-emerald-600" },
              { label: "مكتملة", value: stats.completed, color: "from-gray-500 to-gray-600" },
              { label: "ملغية", value: stats.cancelled, color: "from-rose-500 to-pink-600" },
            ].map((s) => (
              <div key={s.label} className="shade-card p-4">
                <p className="text-2xl font-bold text-primary">{s.value}</p>
                <p className="text-xs text-secondary">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Filter & Search */}
          <div className="fade-in-up mb-6 flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary pointer-events-none" />
              <input
                type="text"
                placeholder="بحث باسم الموظف..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid pr-10 px-4 py-2 text-sm text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-emerald-ai/30"
              />
            </div>
            {[
              { key: "all", label: `📋 الكل (${stats.total})` },
              { key: "scheduled", label: `📅 قادمة (${stats.upcoming})` },
              { key: "completed", label: `✅ مكتملة (${stats.completed})` },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`text-sm px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                  filter === tab.key
                    ? "bg-emerald text-white shadow-lg shadow-emerald/20"
                    : "bg-surface-mid text-secondary hover:text-primary border border-[var(--surface-border)]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="shade-card overflow-hidden">
            {filtered.length === 0 ? (
              <div className="text-center py-16 text-secondary">
                <Calendar className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p>لا توجد استشارات</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--surface-border)] bg-surface-mid/50">
                      <th className="text-right py-3 px-4 text-secondary font-medium">الموظف</th>
                      <th className="text-right py-3 px-4 text-secondary font-medium">النوع</th>
                      <th className="text-right py-3 px-4 text-secondary font-medium">المختص</th>
                      <th className="text-right py-3 px-4 text-secondary font-medium">الموعد</th>
                      <th className="text-right py-3 px-4 text-secondary font-medium">القسم</th>
                      <th className="text-center py-3 px-4 text-secondary font-medium">الحالة</th>
                      <th className="text-center py-3 px-4 text-secondary font-medium">إجراء</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((c) => {
                      const cfg = statusConfig[c.status] || statusConfig.scheduled;
                      const StatusIcon = cfg.icon;
                      return (
                        <tr key={c.id} className="border-b border-[var(--surface-border)] last:border-0 hover:bg-[var(--white-warm)] transition-colors">
                          <td className="py-3 px-4 font-semibold text-primary">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-secondary" />
                              {c.patient.firstName} {c.patient.lastName}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="flex items-center gap-1">
                              {typeIcons[c.type] || "🩺"} {typeLabels[c.type] || c.type}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-secondary">{c.consultant ? `${c.consultant.firstName} ${c.consultant.lastName}` : "—"}</td>
                          <td className="py-3 px-4 text-secondary text-xs">
                            {new Date(c.scheduledAt).toLocaleDateString("ar-SA")}
                            <br />
                            {new Date(c.scheduledAt).toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" })}
                          </td>
                          <td className="py-3 px-4 text-secondary">{c.patient.department || "—"}</td>
                          <td className="py-3 px-4 text-center">
                            <span className={`tag text-xs py-1 px-2.5 ${cfg.color} rounded-lg inline-flex items-center gap-1`}>
                              <StatusIcon className="h-3 w-3" /> {cfg.label}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <div className="flex items-center justify-center gap-1">
                              {c.status === "scheduled" && (
                                <button
                                  onClick={() => updateStatus(c.id, "in_progress")}
                                  disabled={updating === c.id}
                                  className="text-[10px] py-1 px-2 rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200 transition-all disabled:opacity-50 font-medium"
                                >
                                  {updating === c.id ? <Loader2 className="h-3 w-3 animate-spin" /> : "بدء"}
                                </button>
                              )}
                              {c.status === "in_progress" && (
                                <button
                                  onClick={() => updateStatus(c.id, "completed")}
                                  disabled={updating === c.id}
                                  className="text-[10px] py-1 px-2 rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-all disabled:opacity-50 font-medium"
                                >
                                  {updating === c.id ? <Loader2 className="h-3 w-3 animate-spin" /> : "إكمال"}
                                </button>
                              )}
                              {(c.status === "scheduled" || c.status === "in_progress") && (
                                <button
                                  onClick={() => updateStatus(c.id, "cancelled")}
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
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
