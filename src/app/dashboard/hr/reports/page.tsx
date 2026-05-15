import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Download, ChevronLeft, FileText, BarChart3 } from "lucide-react";

export const metadata: Metadata = {
  title: "تقارير الموارد البشرية",
  description: "تقارير العافية للموارد البشرية",
};

export default function HRReportsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface-mid pt-24">
        <div className="container-shade py-8">
          <div className="fade-in-up mb-8">
            <Link href="/dashboard/hr" className="text-sm text-emerald hover:underline inline-flex items-center gap-1 mb-2">
              <ChevronLeft className="h-4 w-4" /> العودة للوحة التحكم
            </Link>
            <h1 className="text-2xl font-bold text-primary">📄 تقارير العافية</h1>
            <p className="text-secondary">التقارير الشهرية والتحليلات</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {[
              { name: "التقرير الشهري — أبريل ٢٠٢٦", desc: "ملخص العافية والإنتاجية", date: "١ مايو ٢٠٢٦" },
              { name: "تحليل التكاليف الطبية", desc: "تقدير التوفير في التأمين الصحي", date: "٢٨ أبريل ٢٠٢٦" },
              { name: "معدلات المشاركة", desc: "نسبة مشاركة الموظفين في البرنامج", date: "١٥ أبريل ٢٠٢٦" },
              { name: "تقرير المخاطر الصحية", desc: "تحليل توزيع المخاطر بين الموظفين", date: "١ أبريل ٢٠٢٦" },
            ].map((r) => (
              <div key={r.name} className="shade-card p-6 flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <FileText className="h-8 w-8 text-emerald shrink-0" />
                  <div>
                    <h3 className="font-bold text-primary">{r.name}</h3>
                    <p className="text-sm text-secondary">{r.desc}</p>
                    <p className="text-xs text-muted mt-1">{r.date}</p>
                  </div>
                </div>
                <button className="btn-outline text-xs py-2 px-3 shrink-0">
                  <Download className="ml-1 h-3 w-3" /> PDF
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
