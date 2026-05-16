"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ChevronLeft, TrendingUp, Download, Loader2 } from "lucide-react";

type User = {
  id: string;
  isActive: boolean;
  department: string | null;
  wellnessScore?: { score: number; riskLevel: string } | null;
};

export default function WellnessReportPage() {
  const [data, setData] = useState<{ avgWellness: number; totalUsers: number; highRisk: number; assessed: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/dashboard/stats?scope=company");
        const res2 = await fetch("/api/users");
        let avgWellness = 0, highRisk = 0, totalUsers = 0, assessed = 0;

        if (res.ok) {
          const stats = await res.json();
          avgWellness = stats.avgWellness || 0;
          highRisk = stats.highRisk || 0;
        }

        if (res2.ok) {
          const users: User[] = await res2.json();
          totalUsers = users.filter((u) => u.isActive).length;
          assessed = users.filter((u) => u.wellnessScore?.score).length;
        }

        setData({ avgWellness, totalUsers, highRisk, assessed });
      } catch (e) {
        console.error("Failed to load report data", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const months = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
  const currentMonth = months[new Date().getMonth()];
  const currentYear = new Date().getFullYear();

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
            <h1 className="text-2xl font-bold text-primary">📊 تقرير العافية الشهري</h1>
            <p className="text-secondary">{currentMonth} {currentYear}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "متوسط العافية", value: data ? `${data.avgWellness}%` : "—", change: data ? `من ${data.assessed} موظف` : "—", color: "text-emerald" },
              { label: "معدل المشاركة", value: data && data.totalUsers > 0 ? `${Math.round((data.assessed / data.totalUsers) * 100)}%` : "—", change: data ? `${data.assessed} من ${data.totalUsers} موظف` : "—", color: "text-blue-500" },
              { label: "المخاطر المرتفعة", value: data ? `${data.highRisk}` : "—", change: data ? "يحتاج متابعة" : "—", color: data && data.highRisk > 0 ? "text-rose-500" : "text-emerald" },
              { label: "الموظفون النشطون", value: data ? `${data.totalUsers}` : "—", change: data ? "إجمالي مسجل" : "—", color: "text-emerald" },
            ].map((s) => (
              <div key={s.label} className="shade-card p-5">
                <p className="text-sm text-secondary">{s.label}</p>
                <p className="stat-number text-primary">{s.value}</p>
                <p className={`text-xs ${s.color}`}>{s.change}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="shade-card p-6">
              <h3 className="font-bold text-primary mb-4">توزيع المخاطر</h3>
              {data && data.assessed > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-secondary">منخفض</span>
                    <span className="font-semibold text-emerald">{Math.max(0, 100 - Math.round((data.highRisk / data.assessed) * 100))}%</span>
                  </div>
                  <div className="bg-[var(--surface-border)] rounded-full h-2">
                    <div className="bg-emerald-400 h-2 rounded-full" style={{ width: `${Math.max(0, 100 - Math.round((data.highRisk / data.assessed) * 100))}%` }} />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-secondary">مرتفع / حرج</span>
                    <span className="font-semibold text-rose-500">{data.assessed > 0 ? Math.round((data.highRisk / data.assessed) * 100) : 0}%</span>
                  </div>
                  <div className="bg-[var(--surface-border)] rounded-full h-2">
                    <div className="bg-rose-500 h-2 rounded-full" style={{ width: `${data.assessed > 0 ? Math.round((data.highRisk / data.assessed) * 100) : 0}%` }} />
                  </div>
                </div>
              ) : (
                <p className="text-sm text-secondary text-center py-4">لا توجد بيانات تقييم بعد</p>
              )}
            </div>
            <div className="shade-card p-6 text-center">
              <TrendingUp className="h-12 w-12 text-emerald mx-auto mb-4" />
              <h3 className="font-bold text-primary text-lg mb-2">تحسن مستمر في صحة الموظفين</h3>
              <p className="text-secondary max-w-lg mx-auto mb-6">
                {data && data.assessed > 0
                  ? `متوسط العافية ${data.avgWellness}% بين ${data.assessed} موظف قاموا بالتقييم. نواصل العمل على تحسين العافية العامة للفريق.`
                  : "لم يقم الموظفون بالتقييم الصحي بعد. قم بدعوتهم لإجراء التقييم."}
              </p>
              <button className="btn-primary opacity-60 cursor-not-allowed" disabled title="قريباً">
                <Download className="ml-2 h-4 w-4" />
                تحميل التقرير الكامل (PDF) — قريباً
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
