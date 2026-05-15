import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Building2, Users, CreditCard, TrendingUp, ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "لوحة الإدارة العليا",
  description: "إدارة المنصة والشركات",
};

const companies = [
  { name: "شركة التطوير التقني", employees: 240, plan: "Professional", status: "نشط", revenue: "26,400" },
  { name: "مجموعة الخليج المالية", employees: 560, plan: "Enterprise", status: "نشط", revenue: "89,600" },
  { name: "مؤسسة النور التجارية", employees: 85, plan: "Standard", status: "نشط", revenue: "6,375" },
  { name: "شركة الاتصالات المتقدمة", employees: 1200, plan: "Enterprise", status: "تجريبي", revenue: "0" },
  { name: "مكتب المحاماة الدولي", employees: 45, plan: "Basic", status: "متوقف", revenue: "1,575" },
];

export default function SuperAdminDashboard() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface-mid pt-24">
        <div className="container-shade py-8">
          <div className="fade-in-up mb-8">
            <h1 className="text-2xl font-bold text-primary">⚙️ لوحة الإدارة العليا</h1>
            <p className="text-secondary">إدارة المنصة وجميع الشركات المسجلة</p>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-8">
            {[
              { label: "إجمالي الشركات", value: "24", icon: Building2, color: "from-blue-500 to-indigo-600" },
              { label: "إجمالي الموظفين", value: "8,430", icon: Users, color: "from-emerald-ai to-emerald-ai-dark" },
              { label: "الإيرادات الشهرية", value: "184ألف", icon: CreditCard, color: "from-emerald-ai to-emerald-ai-dark" },
              { label: "معدل النمو", value: "+23٪", icon: TrendingUp, color: "from-rose-500 to-pink-600" },
            ].map((kpi) => (
              <div key={kpi.label} className="shade-card p-5">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${kpi.color} flex items-center justify-center mb-3`}>
                  <kpi.icon className="h-5 w-5 text-white" />
                </div>
                <p className="stat-number text-primary">{kpi.value}</p>
                <p className="text-xs text-[var(--text-muted)]">{kpi.label}</p>
              </div>
            ))}
          </div>

          <div className="shade-card p-6">
            <h3 className="font-bold text-primary mb-4">الشركات المسجلة</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--surface-border)]">
                    <th className="text-right py-3 text-secondary font-medium">الشركة</th>
                    <th className="text-right py-3 text-secondary font-medium">عدد الموظفين</th>
                    <th className="text-right py-3 text-secondary font-medium">الباقة</th>
                    <th className="text-right py-3 text-secondary font-medium">الحالة</th>
                    <th className="text-right py-3 text-secondary font-medium">الإيرادات</th>
                  </tr>
                </thead>
                <tbody>
                  {companies.map((c) => (
                    <tr key={c.name} className="border-b border-[var(--surface-border)] last:border-0 hover:bg-[var(--white-warm)]">
                      <td className="py-3 font-semibold text-primary">{c.name}</td>
                      <td className="py-3 text-secondary">{c.employees.toLocaleString()}</td>
                      <td className="py-3">
                        <span className="tag text-xs py-0.5 px-3">{c.plan}</span>
                      </td>
                      <td className="py-3">
                        <span className={`tag text-xs py-0.5 px-3 ${
                          c.status === "نشط" ? "bg-emerald-soft text-emerald-dark" :
                          c.status === "تجريبي" ? "bg-blue-50 text-blue-600" :
                          "bg-emerald-soft text-rose-600"
                        }`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="py-3 font-semibold text-primary">{c.revenue} ريال</td>
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
