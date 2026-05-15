import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ChevronLeft, Users, TrendingUp, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "الأقسام",
  description: "إدارة أقسام الشركة",
};

const departments = [
  { dept: "تقنية المعلومات", score: 81, employees: 45, risk: "منخفض", trend: "تصاعدي" },
  { dept: "الموارد البشرية", score: 75, employees: 12, risk: "منخفض", trend: "مستقر" },
  { dept: "المبيعات", score: 62, employees: 68, risk: "متوسط", trend: "مستقر" },
  { dept: "التسويق", score: 74, employees: 24, risk: "منخفض", trend: "تصاعدي" },
  { dept: "الإدارة", score: 79, employees: 15, risk: "منخفض", trend: "تصاعدي" },
  { dept: "الإنتاج", score: 55, employees: 76, risk: "مرتفع", trend: "تنازلي" },
  { dept: "الشؤون المالية", score: 82, employees: 18, risk: "منخفض", trend: "مستقر" },
];

export default function DepartmentsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface-mid pt-24">
        <div className="container-shade py-8">
          <div className="fade-in-up mb-8">
            <Link href="/dashboard/hr" className="text-sm text-emerald hover:underline inline-flex items-center gap-1 mb-2">
              <ChevronLeft className="h-4 w-4" /> العودة للوحة التحكم
            </Link>
            <h1 className="text-2xl font-bold text-primary">🏢 الأقسام</h1>
            <p className="text-secondary">درجات العافية حسب القسم</p>
          </div>

          <div className="grid gap-4">
            {departments.map((d) => (
              <div key={d.dept} className="shade-card p-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-soft">
                    <Users className="h-6 w-6 text-emerald" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary">{d.dept}</h3>
                    <p className="text-sm text-secondary">{d.employees} موظف</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-sm text-secondary">درجة العافية</p>
                    <p className="text-xl font-bold text-primary">{d.score}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-secondary">المخاطر</p>
                    <span className={`tag text-xs py-0.5 px-3 ${
                      d.risk === "منخفض" ? "bg-emerald-soft text-emerald-dark" :
                      d.risk === "متوسط" ? "bg-amber-50 text-amber-600" :
                      "bg-rose-50 text-rose-600"
                    }`}>{d.risk}</span>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-secondary">الاتجاه</p>
                    <span className={`text-sm font-semibold flex items-center gap-1 ${
                      d.trend === "تصاعدي" ? "text-emerald" : d.trend === "تنازلي" ? "text-red-500" : "text-secondary"
                    }`}>
                      {d.trend === "تصاعدي" && <TrendingUp className="h-4 w-4" />}
                      {d.trend === "تنازلي" && <AlertTriangle className="h-4 w-4" />}
                      {d.trend}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
