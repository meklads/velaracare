import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ChevronLeft, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "الاستشارات",
  description: "إدارة استشارات الموظفين",
};

const consultations = [
  { name: "محمد الأحمد", dept: "الإنتاج", type: "تغذية علاجية", time: "اليوم ١٠:٣٠ ص", consultant: "د. أحمد", status: "قادم" },
  { name: "سارة العلي", dept: "المبيعات", type: "لياقة بدنية", time: "اليوم ١١:٠٠ ص", consultant: "مدرب خالد", status: "قادم" },
  { name: "نورة العنزي", dept: "التسويق", type: "تغذية علاجية", time: "غداً ٣:٣٠ م", consultant: "د. سارة", status: "مؤكد" },
  { name: "فهد المطيري", dept: "تقنية المعلومات", type: "استشارة نفسية", time: "بعد غد ١٠:٠٠ ص", consultant: "د. أحمد", status: "مؤكد" },
];

export default function HRConsultationsPage() {
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
            <p className="text-secondary">جميع استشارات الموظفين</p>
          </div>
          <div className="shade-card p-6">
            <div className="space-y-3">
              {consultations.map((c) => (
                <div key={c.name + c.time} className="flex items-center justify-between p-4 rounded-xl hover:bg-[var(--white-warm)] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-gradient text-white flex items-center justify-center text-sm font-bold">{c.name.charAt(0)}</div>
                    <div>
                      <p className="font-semibold text-primary text-sm">{c.name}</p>
                      <p className="text-xs text-secondary">{c.dept} · {c.type}</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-emerald">{c.time}</p>
                    <p className="text-xs text-secondary">مع {c.consultant}</p>
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
