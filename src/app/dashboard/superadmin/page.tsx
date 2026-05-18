"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Loader2, Building2, Users, CreditCard, TrendingUp, Activity, Shield,
  Globe, CalendarDays, Settings, ArrowUpRight, DollarSign, BarChart3,
  PieChart as PieIcon, UserCheck, Zap
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, Legend
} from "recharts";
import { SkeletonDashboard } from "@/components/ui/skeleton";

const COLORS = {
  emerald: "#24A170",
  amber: "#F59E0B",
  orange: "#F97316",
  red: "#EF4444",
  blue: "#3B82F6",
  purple: "#8B5CF6",
  cyan: "#06B6D4",
  pink: "#EC4899",
};

const PIE_COLORS = ["#24A170", "#3B82F6", "#F59E0B", "#8B5CF6", "#EC4899"];

type GlobalStats = {
  companies: number;
  totalUsers: number;
  totalMealOrders: number;
  totalConsultations: number;
  estimatedRevenue: number;
  growth: string;
};

type Invoice = {
  id: string;
  amount: number;
  currency: string;
  status: string;
  plan: string;
  periodStart: string;
  periodEnd: string;
  paidAt: string | null;
  company?: { name: string; arabicName: string };
};

type Company = {
  id: string; name: string; arabicName?: string; size: number;
  plan: string; status: string; industry?: string; createdAt: string;
  _count?: { users: number };
};

type User = {
  id: string; role: string; isActive: boolean; department?: string;
  firstName: string; lastName: string; companyId?: string;
  wellnessScore?: { score: number; riskLevel: string } | null;
};

export default function SuperAdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [stats, setStats] = useState<GlobalStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [usersRes, companiesRes, statsRes, billsRes] = await Promise.all([
          fetch("/api/users?take=200"),
          fetch("/api/companies"),
          fetch("/api/dashboard/stats?scope=global"),
          fetch("/api/billing"),
        ]);
        if (usersRes.ok) setUsers(await usersRes.json());
        if (companiesRes.ok) setCompanies(await companiesRes.json());
        if (statsRes.ok) setStats(await statsRes.json());
        if (billsRes.ok) {
          const data = await billsRes.json();
          setInvoices(data.invoices || []);
        }
      } catch (e) {
        console.error("Failed to load", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <SkeletonDashboard type="admin" />;

  const activeUsers = users.filter((u) => u.isActive).length;
  const roleDist = {
    admins: users.filter((u) => u.role === "COMPANY_ADMIN").length,
    employees: users.filter((u) => u.role === "EMPLOYEE").length,
    hr: users.filter((u) => u.role === "HR").length,
    nutritionists: users.filter((u) => u.role === "NUTRITIONIST").length,
    restaurant: users.filter((u) => u.role === "RESTAURANT").length,
  };

  const planDist = {
    basic: companies.filter((c) => c.plan === "basic").length,
    standard: companies.filter((c) => c.plan === "standard").length,
    professional: companies.filter((c) => c.plan === "professional").length,
    enterprise: companies.filter((c) => c.plan === "enterprise").length,
  };

  // Risk distribution from wellness scores
  const riskDist = {
    low: users.filter((u) => u.wellnessScore?.riskLevel === "low").length,
    moderate: users.filter((u) => u.wellnessScore?.riskLevel === "moderate").length,
    high: users.filter((u) => u.wellnessScore?.riskLevel === "high").length,
    critical: users.filter((u) => u.wellnessScore?.riskLevel === "critical").length,
  };

  // Revenue chart data from invoices
  const revenueByMonth = invoices
    .filter((inv) => inv.status === "paid" || inv.status === "pending")
    .reduce((acc: Record<string, number>, inv) => {
      const month = new Date(inv.periodStart).toLocaleDateString("ar-SA", { month: "short", year: "numeric" });
      acc[month] = (acc[month] || 0) + inv.amount;
      return acc;
    }, {});
  const revenueChartData = Object.entries(revenueByMonth)
    .map(([month, amount]) => ({ month, amount: Math.round(amount) }))
    .sort((a, b) => a.month.localeCompare(b.month));

  // Department distribution
  const deptDist = users
    .filter((u) => u.department && u.role === "EMPLOYEE")
    .reduce((acc: Record<string, number>, u) => {
      acc[u.department!] = (acc[u.department!] || 0) + 1;
      return acc;
    }, {});
  const deptData = Object.entries(deptDist)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);

  // Plan pie data
  const planData = [
    { name: "أساسي", value: planDist.basic, color: COLORS.blue },
    { name: "قياسي", value: planDist.standard, color: COLORS.cyan },
    { name: "احترافي", value: planDist.professional, color: COLORS.emerald },
    { name: "مؤسسي", value: planDist.enterprise, color: COLORS.purple },
  ].filter((d) => d.value > 0);

  // Risk pie data
  const riskData = [
    { name: "منخفض", value: riskDist.low, color: COLORS.emerald },
    { name: "متوسط", value: riskDist.moderate, color: COLORS.amber },
    { name: "مرتفع", value: riskDist.high, color: COLORS.orange },
    { name: "حرج", value: riskDist.critical, color: COLORS.red },
  ].filter((d) => d.value > 0);

  const totalBilled = invoices
    .filter((inv) => inv.status === "paid")
    .reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface-mid pt-24 pb-12">
        <div className="container-shade py-6">
          {/* Header */}
          <div className="fade-in-up mb-6">
            <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
              <Shield className="h-7 w-7 text-emerald" />
              لوحة الإدارة العليا
            </h1>
            <p className="text-secondary mt-1">
              منصة إدارة عافية الموظفين — {companies.length} شركات | {users.length} مستخدم
            </p>
          </div>

          {/* ── KPI Cards ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "الشركات", value: stats?.companies || companies.length, sub: `${planDist.professional + planDist.enterprise} خطط متقدمة`, icon: Building2, color: "from-blue-500 to-indigo-600" },
              { label: "إجمالي المستخدمين", value: stats?.totalUsers || users.length, sub: `${activeUsers} نشط حالياً`, icon: Users, color: "from-emerald-500 to-emerald-600" },
              { label: "الإيرادات", value: `${totalBilled.toLocaleString()} ر.س`, sub: stats?.growth || "—", icon: DollarSign, color: "from-amber-500 to-orange-600" },
              { label: "الطلبات", value: stats?.totalMealOrders || 0, sub: `${stats?.totalConsultations || 0} استشارة`, icon: Activity, color: "from-purple-500 to-violet-600" },
            ].map((s, i) => (
              <div key={s.label} className={`shade-card p-5 ${i === 0 ? "fade-in-up-delay-1" : i === 1 ? "fade-in-up-delay-2" : i === 2 ? "fade-in-up-delay-3" : "fade-in-up-delay-4"}`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center`}>
                    <s.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xs text-secondary font-medium">{s.sub}</span>
                </div>
                <p className="stat-number text-primary">{s.value}</p>
                <p className="text-xs text-[var(--text-muted)] mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* ── Charts Row ── */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Revenue Trend */}
            <div className="lg:col-span-2 shade-card p-6 fade-in-up-delay-2">
              <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald" /> الإيرادات الشهرية
              </h3>
              {revenueChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={260}>
                  <AreaChart data={revenueChartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                    <defs>
                      <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#24A170" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#24A170" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(15,23,42,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                      formatter={(value: any) => [`${value.toLocaleString()} ر.س`, 'الإيرادات']} />
                    <Area type="monotone" dataKey="amount" stroke="#24A170" strokeWidth={2} fill="url(#revenueGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center py-16 text-secondary">
                  <BarChart3 className="h-10 w-10 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">لا توجد بيانات إيرادات كافية</p>
                </div>
              )}
            </div>

            {/* User Role Distribution */}
            <div className="shade-card p-6 fade-in-up-delay-3">
              <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-emerald" /> توزيع الأدوار
              </h3>
              {users.length > 0 ? (
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "موظف", value: roleDist.employees, color: PIE_COLORS[0] },
                        { name: "مدير شركة", value: roleDist.admins, color: PIE_COLORS[1] },
                        { name: "موارد بشرية", value: roleDist.hr, color: PIE_COLORS[2] },
                        { name: "أخصائي تغذية", value: roleDist.nutritionists, color: PIE_COLORS[3] },
                        { name: "مطعم", value: roleDist.restaurant, color: PIE_COLORS[4] },
                      ].filter((d) => d.value > 0)}
                      cx="50%" cy="50%" innerRadius={55} outerRadius={90}
                      dataKey="value" paddingAngle={3}
                    >
                      {[roleDist.employees, roleDist.admins, roleDist.hr, roleDist.nutritionists, roleDist.restaurant]
                        .filter((v) => v > 0)
                        .map((_, i) => (
                          <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(15,23,42,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center py-16 text-secondary">
                  <Users className="h-10 w-10 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">لا توجد بيانات مستخدمين</p>
                </div>
              )}
              <div className="flex flex-wrap gap-2 mt-3 justify-center">
                {[
                  { label: "موظف", value: roleDist.employees, color: PIE_COLORS[0] },
                  { label: "مدير", value: roleDist.admins, color: PIE_COLORS[1] },
                  { label: "HR", value: roleDist.hr, color: PIE_COLORS[2] },
                  { label: "تغذية", value: roleDist.nutritionists, color: PIE_COLORS[3] },
                ].filter((d) => d.value > 0).map((d) => (
                  <span key={d.label} className="text-[10px] flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                    {d.label}: {d.value}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Second Charts Row ── */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Plan Distribution */}
            <div className="shade-card p-6 fade-in-up-delay-3">
              <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-emerald" /> خطط الاشتراك
              </h3>
              {planData.length > 0 ? (
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={planData}
                      cx="50%" cy="50%" innerRadius={50} outerRadius={85}
                      dataKey="value" paddingAngle={3}
                    >
                      {planData.map((_, i) => (
                        <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(15,23,42,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center py-12 text-secondary">
                  <CreditCard className="h-8 w-8 mx-auto mb-2 opacity-30" />
                  <p className="text-xs">لا توجد بيانات</p>
                </div>
              )}
              <div className="flex flex-wrap gap-2 mt-3 justify-center">
                {planData.map((d) => (
                  <span key={d.name} className="text-[10px] flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                    {d.name}: {d.value}
                  </span>
                ))}
              </div>
            </div>

            {/* Risk Distribution */}
            <div className="shade-card p-6 fade-in-up-delay-3">
              <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-emerald" /> توزيع المخاطر الصحية
              </h3>
              {riskData.length > 0 ? (
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={riskData}
                      cx="50%" cy="50%" innerRadius={50} outerRadius={85}
                      dataKey="value" paddingAngle={3}
                    >
                      {riskData.map((_, i) => (
                        <Cell key={i} fill={[COLORS.emerald, COLORS.amber, COLORS.orange, COLORS.red][i]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(15,23,42,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center py-12 text-secondary">
                  <Shield className="h-8 w-8 mx-auto mb-2 opacity-30" />
                  <p className="text-xs">لم يتم تقييم أي موظف بعد</p>
                </div>
              )}
              <div className="flex flex-wrap gap-2 mt-3 justify-center">
                {riskData.map((d) => (
                  <span key={d.name} className="text-[10px] flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                    {d.name}: {d.value}
                  </span>
                ))}
              </div>
            </div>

            {/* Department Distribution */}
            <div className="shade-card p-6 fade-in-up-delay-4">
              <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                <Building2 className="h-5 w-5 text-emerald" /> الأقسام
              </h3>
              {deptData.length > 0 ? (
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={deptData} layout="vertical" margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} width={90} />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(15,23,42,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                    <Bar dataKey="value" fill="#24A170" radius={[0, 4, 4, 0]} barSize={18} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center py-12 text-secondary">
                  <Building2 className="h-8 w-8 mx-auto mb-2 opacity-30" />
                  <p className="text-xs">لا توجد أقسام مسجلة</p>
                </div>
              )}
            </div>
          </div>

          {/* ── Companies List ── */}
          <div className="shade-card p-6 fade-in-up-delay-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-primary flex items-center gap-2">
                <Building2 className="h-5 w-5 text-emerald" /> الشركات
              </h3>
              <Link href="/dashboard/superadmin/companies" className="text-sm text-emerald hover:underline flex items-center gap-1">
                إدارة الشركات <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
            {companies.length === 0 ? (
              <p className="text-sm text-secondary text-center py-8">لا توجد شركات مسجلة</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--surface-border)]">
                      <th className="text-right py-3 text-secondary font-medium">الشركة</th>
                      <th className="text-right py-3 text-secondary font-medium">الموظفون</th>
                      <th className="text-right py-3 text-secondary font-medium">الخطة</th>
                      <th className="text-right py-3 text-secondary font-medium">الحالة</th>
                      <th className="text-right py-3 text-secondary font-medium">تاريخ الاشتراك</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companies.map((c) => (
                      <tr key={c.id} className="border-b border-[var(--surface-border)] last:border-0 hover:bg-surface-mid/50 transition-colors">
                        <td className="py-3">
                          <p className="font-semibold text-primary">{c.arabicName || c.name}</p>
                          <p className="text-[10px] text-secondary">{c.industry || "—"}</p>
                        </td>
                        <td className="py-3 text-secondary">{c.size}</td>
                        <td className="py-3">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            c.plan === "enterprise" ? "bg-purple-500/10 text-purple-500" :
                            c.plan === "professional" ? "bg-emerald-500/10 text-emerald-500" :
                            c.plan === "standard" ? "bg-blue-500/10 text-blue-500" :
                            "bg-gray-500/10 text-gray-500"
                          }`}>
                            {c.plan === "basic" ? "أساسي" : c.plan === "standard" ? "قياسي" : c.plan === "professional" ? "احترافي" : "مؤسسي"}
                          </span>
                        </td>
                        <td className="py-3">
                          <span className={`tag text-xs py-0.5 px-2.5 ${
                            c.status === "active" ? "bg-emerald-soft text-emerald-dark" :
                            c.status === "trial" ? "bg-amber-soft text-amber-dark" :
                            "bg-red-100 text-red-600"
                          }`}>
                            {c.status === "active" ? "نشط" : c.status === "trial" ? "تجريبي" : "موقوف"}
                          </span>
                        </td>
                        <td className="py-3 text-secondary text-xs">
                          {new Date(c.createdAt).toLocaleDateString("ar-SA", { year: "numeric", month: "short", day: "numeric" })}
                        </td>
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
