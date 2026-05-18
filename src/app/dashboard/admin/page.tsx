import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Users, TrendingDown, Heart, Brain, Apple, Download, Calendar, ShoppingBag, DollarSign, Activity } from "lucide-react";
import { RiskPieChart, DeptBarChart } from "@/components/charts/AdminCharts";

export const metadata = {
  title: "لوحة تحكم الإدارة",
  description: "إدارة صحة موظفيك بذكاء",
};

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const session = await auth();
  const user = session?.user as any;
  if (!user || (user.role !== "COMPANY_ADMIN" && user.role !== "SUPER_ADMIN")) {
    redirect("/login");
  }

  // ── Real Data ──
  let totalUsers = 0;
  let activeUsers = 0;
  let highRisk = 0;
  let totalScore = 0;
  let usersWithScore = 0;
  let riskDistribution = { low: 0, medium: 0, high: 0, critical: 0 };
  let deptScores: { dept: string; score: number }[] = [];
  let todayConsultations = 0;
  let pendingOrders = 0;
  let totalInvoices = 0;
  let pendingInvoices = 0;

  try {
    const whereFilter = user.role === "SUPER_ADMIN" ? {} : { companyId: user.companyId };

    const users = await prisma.user.findMany({
      where: whereFilter,
      select: {
        id: true,
        isActive: true,
        department: true,
        wellnessScore: { select: { score: true, riskLevel: true } },
      },
    });

    totalUsers = users.length;
    activeUsers = users.filter((u) => u.isActive).length;

    const deptMap = new Map<string, number[]>();

    users.forEach((u) => {
      const ws = u.wellnessScore;
      if (ws) {
        usersWithScore++;
        totalScore += ws.score;
        if (ws.riskLevel === "low" || ws.riskLevel === "medium" || ws.riskLevel === "high" || ws.riskLevel === "critical") {
          riskDistribution[ws.riskLevel]++;
        }
        if (ws.riskLevel === "high" || ws.riskLevel === "critical") highRisk++;

        const dept = u.department || "بدون قسم";
        if (!deptMap.has(dept)) deptMap.set(dept, []);
        deptMap.get(dept)!.push(ws.score);
      }
    });

    deptScores = Array.from(deptMap.entries())
      .map(([dept, scores]) => ({
        dept,
        score: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    if (deptScores.length === 0) {
      deptScores = [
        { dept: "تقنية المعلومات", score: 0 },
        { dept: "الموارد البشرية", score: 0 },
        { dept: "المبيعات", score: 0 },
        { dept: "التسويق", score: 0 },
        { dept: "الإدارة", score: 0 },
      ];
    }

    // ── Extra stats ──
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000);

    todayConsultations = await prisma.consultation.count({
      where: {
        ...whereFilter,
        scheduledAt: { gte: todayStart, lte: todayEnd },
        status: { not: "cancelled" },
      },
    });

    pendingOrders = await prisma.mealOrder.count({
      where: { status: { in: ["pending", "preparing"] } },
    });

    const invoices = await prisma.invoice.findMany({
      where: whereFilter,
      select: { status: true, amount: true },
    });
    totalInvoices = invoices.length;
    pendingInvoices = invoices.filter((inv) => inv.status === "pending" || inv.status === "overdue").length;

  } catch (e) {
    console.error("Admin dashboard data error:", e);
  }

  const avgWellness = usersWithScore > 0 ? Math.round(totalScore / usersWithScore) : 0;
  const totalRisk = riskDistribution.low + riskDistribution.medium + riskDistribution.high + riskDistribution.critical;
  const lowPct = totalRisk > 0 ? Math.round((riskDistribution.low / totalRisk) * 100) : 0;
  const medPct = totalRisk > 0 ? Math.round((riskDistribution.medium / totalRisk) * 100) : 0;
  const highPct = totalRisk > 0 ? Math.round((riskDistribution.high / totalRisk) * 100) : 0;
  const critPct = totalRisk > 0 ? Math.round((riskDistribution.critical / totalRisk) * 100) : 0;


  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface-mid pt-24">
        <div className="container-shade py-8">
          {/* Header */}
          <div className="fade-in-up mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-primary">لوحة تحكم الإدارة</h1>
              <p className="text-secondary">{activeUsers} موظف نشط من أصل {totalUsers}</p>
            </div>
            <Link href="/dashboard/admin/reports" className="btn-primary text-sm py-2 px-5">
              <Download className="ml-2 h-4 w-4" />
              تصدير التقرير
            </Link>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "درجة العافية الإجمالية", value: `${avgWellness}%`, change: usersWithScore > 0 ? `${usersWithScore} موظف` : "لا توجد بيانات", icon: Heart, color: "from-rose-500 to-pink-600" },
              { label: "الموظفون النشطون", value: `${activeUsers}`, change: `من أصل ${totalUsers}`, icon: Users, color: "from-blue-500 to-indigo-600" },
              { label: "المخاطر العالية", value: `${highRisk}`, change: totalRisk > 0 ? `${Math.round((highRisk / totalRisk) * 100)}%` : "—", icon: Activity, color: "from-orange-500 to-red-600" },
              { label: "معدل الاكتمال", value: totalUsers > 0 ? `${Math.round((usersWithScore / totalUsers) * 100)}%` : "0%", change: "التقييم الصحي", icon: Brain, color: "from-emerald to-emerald-600" },
            ].map((kpi, i) => (
              <div key={kpi.label} className={`shade-card p-5 ${i === 0 ? "fade-in-up-delay-1" : i === 1 ? "fade-in-up-delay-2" : i === 2 ? "fade-in-up-delay-3" : "fade-in-up-delay-4"}`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${kpi.color} flex items-center justify-center`}>
                    <kpi.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className={`text-xs font-semibold ${kpi.label === "المخاطر العالية" && highRisk > 0 ? "text-rose-500" : "text-emerald"}`}>
                    {kpi.change}
                  </span>
                </div>
                <p className="stat-number text-primary">{kpi.value}</p>
                <p className="text-xs text-[var(--text-muted)] mt-1">{kpi.label}</p>
              </div>
            ))}
          </div>

          {/* Secondary KPIs Row */}
          <div className="grid grid-cols-3 gap-3 mb-8 fade-in-up-delay-2">
            <div className="shade-card p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                <Calendar className="h-4 w-4 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-primary">{todayConsultations}</p>
                <p className="text-[10px] text-secondary">استشارات اليوم</p>
              </div>
            </div>
            <div className="shade-card p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center">
                <ShoppingBag className="h-4 w-4 text-amber-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-primary">{pendingOrders}</p>
                <p className="text-[10px] text-secondary">طلبات قيد التحضير</p>
              </div>
            </div>
            <div className="shade-card p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-emerald" />
              </div>
              <div>
                <p className="text-sm font-bold text-primary">{pendingInvoices}</p>
                <p className="text-[10px] text-secondary">فواتير غير مدفوعة</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6 fade-in-up-delay-2">
            <RiskPieChart data={[
              { label: "منخفض", value: lowPct, color: "#24A170" },
              { label: "متوسط", value: medPct, color: "#F59E0B" },
              { label: "عالٍ", value: highPct, color: "#F97316" },
              { label: "حرج", value: critPct, color: "#EF4444" },
            ]} />
            <DeptBarChart data={deptScores} />
          </div>

          {/* Bottom Row */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="shade-card p-6 fade-in-up-delay-3">
              <h3 className="font-bold text-primary mb-4">🍎 تغذية الموظفين</h3>
              <p className="text-sm text-secondary mb-3">
                {usersWithScore > 0
                  ? `${Math.round((activeUsers / totalUsers) * 100)}% من الموظفين نشطون — قم بتفعيل خطط الوجبات الصحية لدعم العافية العامة.`
                  : 'لم يقم الموظفون بالتقييم الصحي بعد — قم بدعوتهم لإجراء التقييم.'}
              </p>
              <Link href="/dashboard/admin/meals" className="text-sm text-[var(--emerald-ai)] hover:underline font-medium">
                عرض خطط التغذية ←
              </Link>
            </div>

            <div className="shade-card p-6 fade-in-up-delay-4">
              <h3 className="font-bold text-primary mb-4">🧠 توصيات ذكية</h3>
              <ul className="space-y-2 text-sm text-secondary">
                {highRisk > 0 ? (
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald shrink-0" />
                    {highRisk} موظفاً بمخاطر عالية — يوصى بعمل فحوصات دورية وتوفير استشارات تغذية
                  </li>
                ) : null}
                {deptScores.length > 0 && deptScores[deptScores.length - 1]?.score < 65 ? (
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald shrink-0" />
                    قسم {deptScores[deptScores.length - 1].dept} بحاجة لبرنامج تحسين عافية — العافية {deptScores[deptScores.length - 1].score}%
                  </li>
                ) : null}
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald shrink-0" />
                  {usersWithScore > 0 ? `تم تقييم ${usersWithScore} موظفاً — متوسط العافية ${avgWellness}%` : 'لم يتم إجراء تقييمات صحية بعد'}
                </li>
              </ul>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 fade-in-up-delay-4">
            <Link href="/dashboard/admin/meals" className="shade-card p-4 text-center hover:shadow-md transition-all hover:-translate-y-0.5">
              <span className="text-2xl block mb-1">🍽️</span>
              <p className="text-sm font-semibold text-primary">الوجبات</p>
              <p className="text-[10px] text-secondary">إدارة خطط الوجبات</p>
            </Link>
            <Link href="/dashboard/admin/employees" className="shade-card p-4 text-center hover:shadow-md transition-all hover:-translate-y-0.5">
              <span className="text-2xl block mb-1">👥</span>
              <p className="text-sm font-semibold text-primary">الموظفين</p>
              <p className="text-[10px] text-secondary">إدارة الموظفين</p>
            </Link>
            <Link href="/dashboard/employee/meals" className="shade-card p-4 text-center hover:shadow-md transition-all hover:-translate-y-0.5">
              <span className="text-2xl block mb-1">📋</span>
              <p className="text-sm font-semibold text-primary">المينيو</p>
              <p className="text-[10px] text-secondary">معاينة قائمة الوجبات</p>
            </Link>
            <Link href="/dashboard/restaurant" className="shade-card p-4 text-center hover:shadow-md transition-all hover:-translate-y-0.5">
              <span className="text-2xl block mb-1">🧑‍🍳</span>
              <p className="text-sm font-semibold text-primary">المطعم</p>
              <p className="text-[10px] text-secondary">عرض الطلبات</p>
            </Link>
            <Link href="/dashboard/admin/billing" className="shade-card p-4 text-center hover:shadow-md transition-all hover:-translate-y-0.5">
              <span className="text-2xl block mb-1">💰</span>
              <p className="text-sm font-semibold text-primary">الفواتير</p>
              <p className="text-[10px] text-secondary">الاشتراك والفوترة</p>
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
