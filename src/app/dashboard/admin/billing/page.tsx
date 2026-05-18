"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Loader2, ChevronLeft, CreditCard, Download, CheckCircle, Clock, AlertTriangle, FileText, TrendingUp } from "lucide-react";
import { SkeletonDashboard } from "@/components/ui/skeleton";

type Invoice = {
  id: string;
  amount: number;
  currency: string;
  status: string;
  plan: string;
  periodStart: string;
  periodEnd: string;
  paidAt: string | null;
  invoiceUrl: string | null;
  createdAt: string;
};

export default function BillingPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [summary, setSummary] = useState({ totalBilled: 0, pendingAmount: 0, paidCount: 0, totalInvoices: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/billing");
        if (res.ok) {
          const data = await res.json();
          setInvoices(data.invoices || []);
          setSummary(data.summary || { totalBilled: 0, pendingAmount: 0, paidCount: 0, totalInvoices: 0 });
        }
      } catch (e) {
        console.error("Failed to load billing", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <SkeletonDashboard type="admin" />;

  const planLabels: Record<string, string> = { basic: "أساسية", standard: "قياسية", professional: "احترافية" };
  const statusConfig: Record<string, { label: string; color: string }> = {
    pending: { label: "قيد الانتظار", color: "text-amber-600 bg-amber-50" },
    paid: { label: "مدفوعة", color: "text-emerald-600 bg-emerald-50" },
    overdue: { label: "متأخرة", color: "text-red-600 bg-red-50" },
    cancelled: { label: "ملغية", color: "text-gray-500 bg-gray-100" },
  };
  const formatDate = (d: string) => new Date(d).toLocaleDateString("ar-SA");

  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface-mid pt-24 pb-12">
        <div className="container-shade py-6">
          <div className="fade-in-up mb-5">
            <Link href="/dashboard/admin" className="text-sm text-emerald hover:underline inline-flex items-center gap-1 mb-2">
              <ChevronLeft className="h-4 w-4" /> العودة للوحة التحكم
            </Link>
            <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
              <CreditCard className="h-7 w-7 text-emerald" /> الفواتير والاشتراك
            </h1>
            <p className="text-secondary mt-1">إدارة الفواتير وخطط الاشتراك</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "إجمالي الفواتير", value: `${summary.totalInvoices}`, icon: FileText, color: "from-blue-500 to-indigo-600" },
              { label: "المدفوع", value: `${summary.totalBilled.toLocaleString()} ر.س`, icon: CheckCircle, color: "from-emerald-500 to-emerald-600" },
              { label: "المستحق", value: `${summary.pendingAmount.toLocaleString()} ر.س`, icon: Clock, color: "from-amber-500 to-orange-600" },
              { label: "مدفوعة", value: summary.paidCount > 0 ? `${Math.round((summary.paidCount / summary.totalInvoices) * 100)}%` : "—", icon: TrendingUp, color: "from-purple-500 to-violet-600" },
            ].map((s) => (
              <div key={s.label} className="shade-card p-5 text-center">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mx-auto mb-2`}>
                  <s.icon className="h-5 w-5 text-white" />
                </div>
                <p className="stat-number text-primary">{s.value}</p>
                <p className="text-xs text-secondary">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="shade-card p-6 fade-in-up-delay-2">
            <h3 className="font-bold text-primary mb-4">سجل الفواتير</h3>
            {invoices.length === 0 ? (
              <div className="text-center py-10 text-secondary">
                <CreditCard className="h-10 w-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">لا توجد فواتير بعد</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--surface-border)]">
                      <th className="text-right py-3 text-secondary font-medium">الفترة</th>
                      <th className="text-right py-3 text-secondary font-medium">الخطة</th>
                      <th className="text-right py-3 text-secondary font-medium">المبلغ</th>
                      <th className="text-right py-3 text-secondary font-medium">الحالة</th>
                      <th className="text-right py-3 text-secondary font-medium">تاريخ الدفع</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((inv) => (
                      <tr key={inv.id} className="border-b border-[var(--surface-border)] last:border-0 hover:bg-[var(--white-warm)]">
                        <td className="py-3 font-semibold text-primary">
                          {formatDate(inv.periodStart)} — {formatDate(inv.periodEnd)}
                        </td>
                        <td className="py-3 text-secondary">{planLabels[inv.plan] || inv.plan}</td>
                        <td className="py-3 font-semibold text-primary">{inv.amount.toLocaleString()} {inv.currency}</td>
                        <td className="py-3">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusConfig[inv.status]?.color || "bg-gray-100 text-gray-500"}`}>
                            {statusConfig[inv.status]?.label || inv.status}
                          </span>
                        </td>
                        <td className="py-3 text-secondary">{inv.paidAt ? formatDate(inv.paidAt) : "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
