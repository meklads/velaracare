"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Loader2, CalendarDays, Users, FileText, Clock, CheckCircle, Video, Phone, User } from "lucide-react";

type Consultation = {
  id: string;
  type: string;
  status: string;
  scheduledAt: string;
  notes: string | null;
  patient: { firstName: string; lastName: string; email: string; department: string | null };
};

const statusConfig: Record<string, { label: string; color: string }> = {
  scheduled: { label: "قادم", color: "bg-blue-100 text-blue-700" },
  in_progress: { label: "قيد الإجراء", color: "bg-amber-100 text-amber-700" },
  completed: { label: "مكتمل", color: "bg-emerald-100 text-emerald-700" },
  cancelled: { label: "ملغي", color: "bg-red-100 text-red-600" },
};

const typeIcons: Record<string, string> = {
  nutrition: "🥗", fitness: "💪", general: "🩺", mental: "🧠",
};

export default function NutritionistDashboard() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/consultations?type=all");
        if (res.ok) setConsultations(await res.json());
      } catch (e) {
        console.error("Failed to load", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const today = new Date().toDateString();
  const todayConsults = consultations.filter((c) => new Date(c.scheduledAt).toDateString() === today);
  const upcoming = consultations.filter((c) => c.status === "scheduled");
  const completed = consultations.filter((c) => c.status === "completed");

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-surface-mid">
      <Loader2 className="h-8 w-8 text-emerald animate-spin" />
    </div>
  );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface-mid pt-24 pb-12">
        <div className="container-shade py-6">
          <div className="fade-in-up mb-6">
            <h1 className="text-2xl font-bold text-primary flex items-center gap-2">🥗 لوحة الاستشاري</h1>
            <p className="text-secondary mt-1">إدارة الاستشارات الغذائية والصحية</p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: "استشارات اليوم", value: todayConsults.length, icon: CalendarDays, color: "from-emerald-500 to-emerald-600" },
              { label: "القادمة", value: upcoming.length, icon: Clock, color: "from-blue-500 to-indigo-600" },
              { label: "المكتملة", value: completed.length, icon: FileText, color: "from-gray-500 to-gray-600" },
            ].map((s) => (
              <div key={s.label} className="shade-card p-5 text-center">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mx-auto mb-2`}>
                  <s.icon className="h-5 w-5 text-white" />
                </div>
                <p className="stat-number text-primary">{s.value}</p>
                <p className="text-xs text-secondary">{s.label}</p>
              </div>
            ))}
          </div>

          {consultations.length === 0 ? (
            <div className="shade-card p-12 text-center text-secondary">
              <CalendarDays className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p>لا توجد استشارات حتى الآن</p>
            </div>
          ) : (
            <div className="shade-card p-6">
              <h3 className="font-bold text-primary mb-4">
                {todayConsults.length > 0 ? "📅 استشارات اليوم" : "📋 جميع الاستشارات"}
              </h3>
              <div className="space-y-3">
                {(todayConsults.length > 0 ? todayConsults : consultations.slice(0, 10)).map((c) => {
                  const cfg = statusConfig[c.status] || statusConfig.scheduled;
                  return (
                    <div key={c.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-mid transition-colors border border-[var(--surface-border)]">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-gradient text-white flex items-center justify-center text-sm font-bold">
                          {c.patient.firstName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-primary text-sm">
                            {c.patient.firstName} {c.patient.lastName}
                          </p>
                          <p className="text-xs text-secondary flex items-center gap-1">
                            {typeIcons[c.type] || "🩺"} {c.type}
                            {c.patient.department && <><span className="opacity-30">|</span> {c.patient.department}</>}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-secondary">
                          {new Date(c.scheduledAt).toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" })}
                        </span>
                        <span className={`tag text-xs py-0.5 px-3 ${cfg.color}`}>{cfg.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
