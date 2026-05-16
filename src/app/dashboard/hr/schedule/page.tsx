"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ChevronLeft, Calendar, Loader2, CheckCircle } from "lucide-react";

type User = { id: string; firstName: string; lastName: string; email: string; role: string; department: string | null };

const typeOptions = [
  { value: "nutrition", label: "تغذية علاجية" },
  { value: "fitness", label: "لياقة بدنية" },
  { value: "mental", label: "استشارة نفسية" },
  { value: "general", label: "عام" },
];

export default function SchedulePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState({ patientId: "", type: "nutrition", scheduledAt: "", notes: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/users")
      .then((r) => r.ok && r.json())
      .then((data) => setUsers(data || []))
      .catch(() => {});
  }, []);

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

  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface-mid pt-24">
        <div className="container-shade py-8">
          <div className="fade-in-up mb-8">
            <Link href="/dashboard/hr" className="text-sm text-emerald hover:underline inline-flex items-center gap-1 mb-2">
              <ChevronLeft className="h-4 w-4" /> العودة للوحة التحكم
            </Link>
            <h1 className="text-2xl font-bold text-primary">📅 جدولة استشارة</h1>
            <p className="text-secondary">جدولة استشارة جديدة لأحد الموظفين</p>
          </div>

          <div className="max-w-2xl mx-auto">
            {msg && (
              <div className={`mb-4 rounded-xl px-5 py-3 text-sm text-center font-medium ${
                msg.includes("✅") ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"
              }`}>
                {msg}
              </div>
            )}
            <div className="shade-card p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary">الموظف</label>
                  <select
                    value={form.patientId}
                    onChange={(e) => setForm((p) => ({ ...p, patientId: e.target.value }))}
                    required
                    className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-3 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-emerald-ai/30"
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
                    className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-3 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-emerald-ai/30"
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
                      className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-3 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-emerald-ai/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary">الوقت</label>
                    <input
                      type="time"
                      value={form.scheduledAt.split("T")[1]?.slice(0, 5) || ""}
                      onChange={(e) => setForm((p) => ({ ...p, scheduledAt: `${new Date().toISOString().split("T")[0]}T${e.target.value}:00` }))}
                      required
                      className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-3 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-emerald-ai/30"
                    />
                  </div>
                </div>

                <button type="submit" disabled={loading} className="btn-primary w-full justify-center text-sm disabled:opacity-60">
                  {loading ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : <Calendar className="ml-2 h-4 w-4" />}
                  {loading ? "جاري الحجز..." : "تأكيد الحجز"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
