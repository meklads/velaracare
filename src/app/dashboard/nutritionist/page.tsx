import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CalendarDays, Users, FileText, ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "لوحة الاستشاري",
  description: "إدارة الاستشارات الغذائية",
};

const todayConsultations = [
  { name: "محمد الأحمد", time: "١٠:٣٠ ص", type: "تغذية علاجية", status: "قادم" },
  { name: "سارة العلي", time: "١١:٠٠ ص", type: "لياقة بدنية", status: "قادم" },
  { name: "خالد البدر", time: "٢:٠٠ م", type: "تغذية رياضية", status: "انتظار" },
  { name: "نورة العنزي", time: "٣:٣٠ م", type: "تغذية علاجية", status: "قادم" },
];

export default function NutritionistDashboard() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface-mid pt-24">
        <div className="container-shade py-8">
          <div className="fade-in-up mb-8">
            <h1 className="text-2xl font-bold text-primary">🥗 لوحة الاستشاري</h1>
            <p className="text-secondary">إدارة الاستشارات والملفات الصحية</p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: "استشارات اليوم", value: "٤", icon: CalendarDays },
              { label: "المراجعون النشطون", value: "٢٨", icon: Users },
              { label: "تقارير هذا الأسبوع", value: "١٢", icon: FileText },
            ].map((s) => (
              <div key={s.label} className="shade-card p-5 text-center">
                <s.icon className="h-6 w-6 text-emerald mx-auto mb-2" />
                <p className="stat-number text-primary">{s.value}</p>
                <p className="text-xs text-[var(--text-muted)]">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="shade-card p-6">
            <h3 className="font-bold text-primary mb-4">استشارات اليوم</h3>
            <div className="space-y-3">
              {todayConsultations.map((c) => (
                <div key={c.name} className="flex items-center justify-between p-3 rounded-xl hover:bg-[var(--white-warm)] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-gradient text-white flex items-center justify-center text-sm font-bold">
                      {c.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-primary text-sm">{c.name}</p>
                      <p className="text-xs text-[var(--text-muted)]">{c.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-secondary">{c.time}</span>
                    <span className={`tag text-xs py-0.5 px-3 ${
                      c.status === "قادم" ? "bg-blue-50 text-blue-600" : "bg-emerald-soft text-emerald-600"
                    }`}>
                      {c.status}
                    </span>
                  </div>
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
