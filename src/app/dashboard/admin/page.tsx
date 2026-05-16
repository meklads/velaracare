import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma";
import { Users, TrendingDown, Heart, Brain, Apple, Download } from "lucide-react";

export const metadata = {
  title: "لوحة تحكم HR",
  description: "إدارة صحة موظفيك بذكاء",
};

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  // ── Real Data ──
  let totalUsers = 0;
  let activeUsers = 0;
  let highRisk = 0;
  let totalScore = 0;
  let usersWithScore = 0;
  let riskDistribution = { low: 0, medium: 0, high: 0, critical: 0 };
  let deptScores: { dept: string; score: number }[] = [];

  try {
    const users = await prisma.user.findMany({
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

    // If no departments with scores, show some defaults
    if (deptScores.length === 0) {
      deptScores = [
        { dept: "تقنية المعلومات", score: 0 },
        { dept: "الموارد البشرية", score: 0 },
        { dept: "المبيعات", score: 0 },
        { dept: "التسويق", score: 0 },
        { dept: "الإدارة", score: 0 },
      ];
    }
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
              <h1 className="text-2xl font-bold text-primary">لوحة تحكم الموارد البشرية</h1>
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
              { label: "درجة العافية الإجمالية", value: `${avgWellness}%`, change: usersWithScore > 0 ? `من ${usersWithScore} موظف` : "لا توجد بيانات", icon: Heart, color: "from-rose-500 to-pink-600" },
              { label: "الموظفون النشطون", value: `${activeUsers}`, change: `من أصل ${totalUsers}`, icon: Users, color: "from-blue-500 to-indigo-600" },
              { label: "المخاطر العالية", value: `${highRisk}`, change: totalRisk > 0 ? `${Math.round((highRisk / totalRisk) * 100)}%` : "—", icon: Brain, color: "from-orange-500 to-red-600" },
              { label: "معدل الاكتمال", value: totalUsers > 0 ? `${Math.round((usersWithScore / totalUsers) * 100)}%` : "0%", change: "التقييم الصحي", icon: Heart, color: "from-emerald-ai to-emerald-ai-dark" },
            ].map((kpi, i) => (
              <div key={kpi.label} className={`shade-card p-5 ${i === 0 ? "fade-in-up-delay-1" : i === 1 ? "fade-in-up-delay-2" : i === 2 ? "fade-in-up-delay-3" : "fade-in-up-delay-4"}`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${kpi.color} flex items-center justify-center`}>
                    <kpi.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className={`text-sm font-semibold ${kpi.change.startsWith("+") ? "text-emerald" : "text-rose-500"}`}>
                    {kpi.change}
                  </span>
                </div>
                <p className="stat-number text-primary">{kpi.value}</p>
                <p className="text-xs text-[var(--text-muted)] mt-1">{kpi.label}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Risk Distribution */}
            <div className="shade-card p-6 fade-in-up-delay-2">
              <h3 className="font-bold text-primary mb-4">توزيع المخاطر الصحية</h3>
              <div className="space-y-4">
                {[
                  { label: "منخفض", value: lowPct, color: "bg-emerald-400" },
                  { label: "متوسط", value: medPct, color: "bg-amber-400" },
                  { label: "عالٍ", value: highPct, color: "bg-orange-500" },
                  { label: "حرج", value: critPct, color: "bg-red-500" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-secondary">{item.label}</span>
                      <span className="font-semibold text-primary">{item.value}%</span>
                    </div>
                    <div className="w-full bg-[var(--surface-border)] rounded-full h-2">
                      <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Department Comparison */}
            <div className="shade-card p-6 fade-in-up-delay-3">
              <h3 className="font-bold text-primary mb-4">مقارنة الأقسام</h3>
              <div className="space-y-4">
                {deptScores.map((d) => (
                  <div key={d.dept}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-secondary">{d.dept}</span>
                      <span className="font-semibold text-primary">{d.score}</span>
                    </div>
                    <div className="w-full bg-[var(--surface-border)] rounded-full h-1.5">
                      <div className="bg-emerald-gradient h-1.5 rounded-full" style={{ width: `${d.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
