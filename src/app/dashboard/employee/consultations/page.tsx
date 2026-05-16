"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Loader2, ChevronLeft, Calendar, Clock, CheckCircle, XCircle, Video, Phone, User, Plus, Sparkles } from "lucide-react";
import { SkeletonCard, SkeletonBlock } from "@/components/ui/skeleton";

type Consultation = {
  id: string;
  type: string;
  status: string;
  scheduledAt: string;
  notes: string | null;
  consultant: { firstName: string; lastName: string } | null;
};

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  scheduled: { label: "قادمة", color: "bg-blue-100 text-blue-700", icon: Calendar },
  in_progress: { label: "قيد الإجراء", color: "bg-amber-100 text-amber-700", icon: Clock },
  completed: { label: "مكتملة", color: "bg-emerald-100 text-emerald-700", icon: CheckCircle },
  cancelled: { label: "ملغية", color: "bg-red-100 text-red-600", icon: XCircle },
};

const typeConfig: Record<string, { label: string; emoji: string; desc: string }> = {
  nutrition: { label: "استشارة تغذية", emoji: "🥗", desc: "نظام غذائي مخصص حسب احتياجاتك" },
  fitness: { label: "استشارة لياقة", emoji: "💪", desc: "تمارين وخطط لياقة بدنية" },
  general: { label: "استشارة عامة", emoji: "🩺", desc: "استشارة صحية عامة" },
  mental: { label: "استشارة نفسية", emoji: "🧠", desc: "دعم نفسي وتحسين المزاج" },
};

const consultants = [
  { id: null, name: "د. سارة العبدان", title: "أخصائية تغذية", type: "nutrition", avatar: "🥗" },
];

export default function EmployeeConsultationsPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedType, setSelectedType] = useState("nutrition");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookingMsg, setBookingMsg] = useState("");
  const [booking, setBooking] = useState(false);

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

  async function handleBooking(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;
    setBooking(true);
    setBookingMsg("");
    try {
      const res = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: selectedType,
          scheduledAt: `${selectedDate}T${selectedTime}:00`,
          notes: "",
        }),
      });
      if (res.ok) {
        const newConsultation = await res.json();
        setConsultations((prev) => [newConsultation, ...prev]);
        setBookingMsg("✅ تم حجز الاستشارة بنجاح!");
        setShowBooking(false);
        setTimeout(() => setBookingMsg(""), 4000);
      } else {
        const err = await res.json();
        setBookingMsg(`❌ ${err.error || "حدث خطأ"}`);
      }
    } catch {
      setBookingMsg("❌ حدث خطأ في الاتصال");
    } finally {
      setBooking(false);
    }
  }

  const upcoming = consultations.filter((c) => c.status === "scheduled" || c.status === "in_progress");
  const completed = consultations.filter((c) => c.status === "completed" || c.status === "cancelled");

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-mid pt-24">
        <div className="container-shade py-6">
          <div className="mb-6"><SkeletonBlock width="200px" height="28px" /></div>
          <SkeletonCard lines={4} showAvatar />
          <div className="mt-6"><SkeletonCard lines={3} /></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface-mid pt-24 pb-12">
        <div className="container-shade py-6">
          {/* Breadcrumb */}
          <div className="fade-in-up mb-5">
            <Link href="/dashboard/employee" className="text-sm text-emerald hover:underline inline-flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" /> العودة للوحة التحكم
            </Link>
          </div>

          {/* Header */}
          <div className="fade-in-up mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
                📅 الاستشارات الصحية
              </h1>
              <p className="text-secondary mt-1">احجز استشارة مع أخصائي التغذية والمعتمدين</p>
            </div>
            <button
              onClick={() => setShowBooking(true)}
              className="btn-primary text-sm py-2.5 px-5"
            >
              <Plus className="ml-2 h-4 w-4" />
              حجز استشارة جديدة
            </button>
          </div>

          {/* Success Message */}
          {bookingMsg && (
            <div className="fade-in-up mb-6 rounded-xl px-5 py-3 text-sm text-center font-medium"
              style={{ backgroundColor: bookingMsg.includes("✅") ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)", color: bookingMsg.includes("✅") ? "#059669" : "#dc2626", border: `1px solid ${bookingMsg.includes("✅") ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)"}` }}
            >
              {bookingMsg}
            </div>
          )}

          {/* Booking Modal */}
          {showBooking && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setShowBooking(false)}>
              <div className="shade-card w-full max-w-md p-6 m-4" onClick={(e) => e.stopPropagation()}>
                <h2 className="font-bold text-primary text-lg mb-4">📅 حجز استشارة جديدة</h2>
                <form onSubmit={handleBooking} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-primary block mb-1.5">نوع الاستشارة</label>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(typeConfig).map(([key, cfg]) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setSelectedType(key)}
                          className={`text-sm p-3 rounded-xl text-center transition-all ${
                            selectedType === key
                              ? "bg-emerald text-white shadow-lg shadow-emerald/20"
                              : "bg-surface-mid text-secondary hover:text-primary border border-[var(--surface-border)]"
                          }`}
                        >
                          <span className="text-xl block mb-0.5">{cfg.emoji}</span>
                          <span className="text-xs font-medium">{cfg.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-primary block mb-1.5">الأخصائي</label>
                    <div className="bg-surface-mid rounded-xl p-3 flex items-center gap-3 border border-[var(--surface-border)]">
                      <span className="text-2xl">🥗</span>
                      <div>
                        <p className="font-semibold text-primary text-sm">د. سارة العبدان</p>
                        <p className="text-xs text-secondary">أخصائية تغذية</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium text-primary block mb-1.5">التاريخ</label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        required
                        className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-3 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-emerald-ai/30"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-primary block mb-1.5">الوقت</label>
                      <input
                        type="time"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        required
                        className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-3 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-emerald-ai/30"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowBooking(false)}
                      className="flex-1 py-2.5 rounded-xl border border-[var(--surface-border)] text-secondary text-sm hover:text-primary transition-all"
                    >
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      disabled={booking}
                      className="flex-1 py-2.5 rounded-xl bg-emerald text-white text-sm font-semibold hover:bg-emerald-dark transition-all disabled:opacity-50 flex items-center justify-center gap-1"
                    >
                      {booking ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                      {booking ? "جاري الحجز..." : "تأكيد الحجز"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Upcoming Consultations */}
          {upcoming.length > 0 && (
            <div className="mb-8">
              <h2 className="font-bold text-primary text-lg mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-emerald" />
                استشاراتي القادمة
                <span className="tag text-xs py-0.5 px-2.5 bg-emerald-soft text-emerald-dark rounded-full">{upcoming.length}</span>
              </h2>
              <div className="space-y-3">
                {upcoming.map((c) => {
                  const cfg = statusConfig[c.status] || statusConfig.scheduled;
                  const tcfg = typeConfig[c.type] || { emoji: "🩺", label: c.type };
                  const StatusIcon = cfg.icon;
                  const date = new Date(c.scheduledAt);
                  return (
                    <div key={c.id} className="shade-card p-4 flex items-center justify-between gap-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{tcfg.emoji}</span>
                        <div>
                          <p className="font-semibold text-primary">{tcfg.label}</p>
                          <p className="text-xs text-secondary flex items-center gap-2 mt-0.5">
                            <Calendar className="h-3 w-3" />
                            {date.toLocaleDateString("ar-SA")}
                            <Clock className="h-3 w-3" />
                            {date.toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" })}
                            {c.consultant && (
                              <><User className="h-3 w-3" /> {c.consultant.firstName} {c.consultant.lastName}</>
                            )}
                          </p>
                        </div>
                      </div>
                      <span className={`tag text-xs py-1 px-3 ${cfg.color} rounded-lg flex items-center gap-1`}>
                        <StatusIcon className="h-3 w-3" /> {cfg.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* No upcoming */}
          {upcoming.length === 0 && (
            <div className="shade-card p-8 text-center mb-8">
              <Calendar className="h-12 w-12 mx-auto mb-3 text-secondary opacity-30" />
              <p className="text-secondary font-medium">لا توجد استشارات قادمة</p>
              <p className="text-xs text-secondary mt-1">احجز استشارتك الأولى مع أخصائي التغذية</p>
              <button
                onClick={() => setShowBooking(true)}
                className="mt-4 text-sm py-2 px-5 rounded-xl bg-emerald text-white hover:bg-emerald-dark transition-all inline-flex items-center gap-1"
              >
                <Sparkles className="h-4 w-4" /> احجز الآن
              </button>
            </div>
          )}

          {/* Past Consultations */}
          {completed.length > 0 && (
            <details className="shade-card p-4">
              <summary className="cursor-pointer text-sm font-medium text-secondary select-none flex items-center gap-2">
                📦 استشارات سابقة ({completed.length})
              </summary>
              <div className="mt-4 space-y-2">
                {completed.slice(0, 10).map((c) => {
                  const cfg = statusConfig[c.status] || statusConfig.completed;
                  const tcfg = typeConfig[c.type] || { emoji: "🩺", label: c.type };
                  return (
                    <div key={c.id} className="flex items-center justify-between text-sm py-2.5 border-b border-[var(--surface-border)] last:border-0">
                      <span className="flex items-center gap-2">
                        <span>{tcfg.emoji}</span>
                        <span className="text-primary">{tcfg.label}</span>
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-secondary">
                          {new Date(c.scheduledAt).toLocaleDateString("ar-SA")}
                        </span>
                        <span className={`tag text-[11px] py-0.5 px-2 ${cfg.color} rounded-md`}>{cfg.label}</span>
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
