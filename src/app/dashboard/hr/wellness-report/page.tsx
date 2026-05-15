import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ChevronLeft, TrendingUp, Download } from "lucide-react";

export const metadata: Metadata = {
  title: "تقرير العافية",
  description: "تقرير العافية الشهري",
};

export default function WellnessReportPage() {
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
            <p className="text-secondary">أبريل ٢٠٢٦</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "متوسط العافية", value: "72", change: "+5%", color: "text-emerald" },
              { label: "معدل المشاركة", value: "91%", change: "+8%", color: "text-blue-500" },
              { label: "المخاطر المرتفعة", value: "18", change: "-3", color: "text-rose-500" },
              { label: "توفير التأمين", value: "420ألف", change: "+18%", color: "text-emerald" },
            ].map((s) => (
              <div key={s.label} className="shade-card p-5">
                <p className="text-sm text-secondary">{s.label}</p>
                <p className="stat-number text-primary">{s.value}</p>
                <p className={`text-xs ${s.color}`}>{s.change} عن الشهر الماضي</p>
              </div>
            ))}
          </div>

          <div className="shade-card p-6 text-center">
            <TrendingUp className="h-12 w-12 text-emerald mx-auto mb-4" />
            <h3 className="font-bold text-primary text-lg mb-2">تحسن مستمر في صحة الموظفين</h3>
            <p className="text-secondary max-w-lg mx-auto mb-6">
              نسبة المشاركة في البرنامج في ارتفاع مستمر. نواصل العمل على تحسين العافية العامة للفريق.
            </p>
            <button className="btn-primary">
              <Download className="ml-2 h-4 w-4" />
              تحميل التقرير الكامل (PDF)
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
