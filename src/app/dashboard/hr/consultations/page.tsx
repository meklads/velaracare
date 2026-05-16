"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ChevronLeft, Calendar, Loader2 } from "lucide-react";

const typeLabels: Record<string, string> = {
  nutrition: "تغذية علاجية", fitness: "لياقة بدنية", mental: "استشارة نفسية", general: "عام",
};

type Consultation = {
  id: string;
  type: string;
  status: string;
  scheduledAt: string;
  patient: { firstName: string; lastName: string; department: string | null };
  consultant: { firstName: string; lastName: string } | null;
};

export default function HRConsultationsPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);

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

  const statusColors: Record<string, string> = {
    scheduled: "text-emerald bg-emerald-soft",
    completed: "text-gray-500 bg-gray-100",
    cancelled: "text-red-500 bg-red-100",
    in_progress: "text-amber-500 bg-amber-100",
  };

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
      <main className="min-h-screen bg-surface-mid pt-24">
        <div className="container-shade py-8">
          <div className="fade-in-up mb-8">
            <Link href="/dashboard/hr" className="text-sm text-emerald hover:underline inline-flex items-center gap-1 mb-2">
              <ChevronLeft className="h-4 w-4" /> العودة للوحة التحكم
            </Link>
            <h1 className="text-2xl font-bold text-primary">📅 الاستشارات</h1>
            <p className="text-secondary">{consultations.length} استشارة مسجلة</p>
          </div>
          <div className="shade-card p-6">
            {consultations.length === 0 ? (
              <div className="text-center py-8 text-secondary">
                <Calendar className="h-10 w-10 mx-auto mb-2 opacity-30" />
                <p className="text-sm">لا توجد استشارات حتى الآن</p>
              </div>
            ) : (
              <div className="space-y-3">
                {consultations.map((c) => {
                  const p = c.patient;
                  return (
                    <div key={c.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-[var(--white-warm)] transition-colors border border-[var(--surface-border)]">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-gradient text-white flex items-center justify-center text-sm font-bold">
                          {p?.firstName?.charAt(0) || "?"}
                        </div>
                        <div>
                          <p className="font-semibold text-primary text-sm">{p?.firstName} {p?.lastName}</p>
                          <p className="text-xs text-secondary">{p?.department || "بدون قسم"} · {typeLabels[c.type] || c.type}</p>
                        </div>
                      </div>
                      <div className="text-left flex items-center gap-3">
                        <div>
                          <p className="text-sm text-emerald">{new Date(c.scheduledAt).toLocaleDateString("ar-SA")}</p>
                          <p className="text-xs text-secondary">
                            {new Date(c.scheduledAt).toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" })}
                            {c.consultant ? ` · مع ${c.consultant.firstName}` : ""}
                          </p>
                        </div>
                        <span className={`tag text-xs py-1 px-2.5 rounded-lg ${statusColors[c.status] || "text-gray-500 bg-gray-100"}`}>
                          {c.status === "scheduled" ? "قادم" : c.status === "completed" ? "مكتمل" : c.status === "cancelled" ? "ملغي" : c.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
