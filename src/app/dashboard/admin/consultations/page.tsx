import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ChevronLeft, Calendar, Phone, Video } from "lucide-react";

export const metadata: Metadata = {
  title: "الاستشارات",
  description: "إدارة الاستشارات الصحية",
};

const consultations = [
  { name: "محمد الأحمد", type: "تغذية علاجية", consultant: "د. أحمد", time: "اليوم ١٠:٣٠ ص", mode: "حضوري", status: "قادم" },
  { name: "سارة العلي", type: "لياقة بدنية", consultant: "مدرب خالد", time: "اليوم ١١:٠٠ ص", mode: "عن بعد", status: "قادم" },
  { name: "خالد البدر", type: "تغذية رياضية", consultant: "د. أحمد", time: "اليوم ٢:٠٠ م", mode: "حضوري", status: "انتظار" },
  { name: "نورة العنزي", type: "استشارة نفسية", consultant: "د. سارة", time: "غداً ١٠:٠٠ ص", mode: "عن بعد", status: "مؤكد" },
  { name: "فهد المطيري", type: "تغذية علاجية", consultant: "د. أحمد", time: "غداً ١١:٣٠ ص", mode: "حضوري", status: "مؤكد" },
];

export default function AdminConsultationsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface-mid pt-24">
        <div className="container-shade py-8">
          <div className="fade-in-up mb-8">
            <Link href="/dashboard/admin" className="text-sm text-emerald hover:underline inline-flex items-center gap-1 mb-2">
              <ChevronLeft className="h-4 w-4" /> العودة للوحة التحكم
            </Link>
            <h1 className="text-2xl font-bold text-primary">📅 الاستشارات</h1>
            <p className="text-secondary">إدارة الاستشارات الصحية للموظفين</p>
          </div>

          <div className="shade-card p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--surface-border)]">
                    <th className="text-right py-3 text-secondary font-medium">الموظف</th>
                    <th className="text-right py-3 text-secondary font-medium">النوع</th>
                    <th className="text-right py-3 text-secondary font-medium">المختص</th>
                    <th className="text-right py-3 text-secondary font-medium">الموعد</th>
                    <th className="text-right py-3 text-secondary font-medium">النوع</th>
                    <th className="text-right py-3 text-secondary font-medium">الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {consultations.map((c) => (
                    <tr key={c.name + c.time} className="border-b border-[var(--surface-border)] last:border-0 hover:bg-[var(--white-warm)]">
                      <td className="py-3 font-semibold text-primary">{c.name}</td>
                      <td className="py-3 text-secondary">{c.type}</td>
                      <td className="py-3 text-secondary">{c.consultant}</td>
                      <td className="py-3 text-secondary">{c.time}</td>
                      <td className="py-3">
                        <span className="inline-flex items-center gap-1 text-xs text-secondary">
                          {c.mode === "عن بعد" ? <Video className="h-3 w-3" /> : <Phone className="h-3 w-3" />}
                          {c.mode}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className={`tag text-xs py-0.5 px-3 ${
                          c.status === "قادم" ? "bg-blue-50 text-blue-600" :
                          c.status === "انتظار" ? "bg-amber-50 text-amber-600" :
                          "bg-emerald-soft text-emerald-dark"
                        }`}>{c.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
