import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Download, ChevronLeft, FileText, BarChart3, TrendingDown, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "التقارير",
  description: "تقارير الصحة المؤسسية",
};

export default function AdminReportsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface-mid pt-24">
        <div className="container-shade py-8">
          <div className="fade-in-up mb-8">
            <Link href="/dashboard/admin" className="text-sm text-emerald hover:underline inline-flex items-center gap-1 mb-2">
              <ChevronLeft className="h-4 w-4" /> العودة للوحة التحكم
            </Link>
            <h1 className="text-2xl font-bold text-primary">📊 التقارير</h1>
            <p className="text-secondary">تقارير الصحة المؤسسية والعائد على الاستثمار</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { icon: FileText, label: "التقرير الشهري", desc: "ملخص أداء العافية للشهر", color: "from-emerald-ai to-emerald-ai-dark" },
              { icon: BarChart3, label: "تحليل الأقسام", desc: "مقارنة درجات العافية بين الأقسام", color: "from-blue-500 to-indigo-600" },
              { icon: TrendingDown, label: "تقارير التكاليف", desc: "تحليل توفير التكاليف الطبية", color: "from-rose-500 to-pink-600" },
            ].map((r) => (
              <div key={r.label} className="shade-card p-6 text-center hover:shadow-lg transition-all">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${r.color} flex items-center justify-center mx-auto mb-4`}>
                  <r.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-primary mb-1">{r.label}</h3>
                <p className="text-sm text-secondary mb-4">{r.desc}</p>
                <button className="btn-outline text-xs py-2 px-4">
                  <Download className="ml-2 h-3 w-3" />
                  تحميل PDF
                </button>
              </div>
            ))}
          </div>

          <div className="shade-card p-6">
            <h3 className="font-bold text-primary mb-4">التقارير السابقة</h3>
            <div className="space-y-3">
              {[
                { name: "التقرير الشهري — أبريل ٢٠٢٦", date: "١ مايو ٢٠٢٦", pages: 12 },
                { name: "التقرير الشهري — مارس ٢٠٢٦", date: "١ أبريل ٢٠٢٦", pages: 10 },
                { name: "التقرير الربعي — Q1 2026", date: "١ يناير ٢٠٢٦", pages: 24 },
                { name: "تحليل العافية — فبراير ٢٠٢٦", date: "٢٨ فبراير ٢٠٢٦", pages: 8 },
              ].map((r) => (
                <div key={r.name} className="flex items-center justify-between p-3 rounded-xl hover:bg-[var(--white-warm)] transition-colors">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-emerald" />
                    <div>
                      <p className="text-sm font-semibold text-primary">{r.name}</p>
                      <p className="text-xs text-secondary">{r.date} · {r.pages} صفحات</p>
                    </div>
                  </div>
                  <button className="text-xs text-emerald hover:underline flex items-center gap-1">
                    <Download className="h-3 w-3" /> تحميل
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
