import { cookies } from "next/headers";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Users, TrendingDown, Heart, Brain, Apple, Download } from "lucide-react";

export const metadata = {
  title: "لوحة تحكم HR",
  description: "إدارة صحة موظفيك بذكاء",
};

export default async function AdminDashboard() {
  // ── Diagnostics ──────────────────────────────────────────────
  let diagnostics: Record<string, unknown> = { error: "unknown" };
  try {
    const jar = await cookies();
    const allCookies = jar.getAll();
    const sessionCookie = allCookies.find(c => c.name.includes("session-token"));
    const allAuthCookies = allCookies.filter(c => c.name.includes("authjs") || c.name.includes("next-auth"));
    diagnostics = {
      total_cookies: allCookies.length,
      auth_cookies: allAuthCookies.map(c => c.name),
      session_cookie: sessionCookie ? {
        name: sessionCookie.name,
        value: sessionCookie.value.slice(0, 30) + "...",
      } : "not found",
      date: new Date().toISOString(),
    };
  } catch (e) {
    diagnostics = { error: String(e), date: new Date().toISOString() };
  }
  // ────────────────────────────────────────────────────────────

  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface-mid pt-24">
        <div className="container-shade py-8">
          {/* Header */}
          <div className="fade-in-up mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-primary">لوحة تحكم الموارد البشرية</h1>
              <p className="text-secondary">شركة التطوير التقني | 240 موظف</p>
            </div>
            <Link href="/dashboard/admin/reports" className="btn-primary text-sm py-2 px-5">
              <Download className="ml-2 h-4 w-4" />
              تصدير التقرير
            </Link>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "درجة العافية الإجمالية", value: "72%", change: "+5%", icon: Heart, color: "from-rose-500 to-pink-600" },
              { label: "الموظفون المسجلون", value: "218", change: "+12", icon: Users, color: "from-blue-500 to-indigo-600" },
              { label: "المخاطر العالية", value: "18", change: "-3", icon: Brain, color: "from-emerald-ai to-emerald-ai-dark" },
              { label: "توفير التأمين", value: "420ألف", change: "+18%", icon: TrendingDown, color: "from-emerald-ai to-emerald-ai-dark" },
            ].map((kpi, i) => (
              <div key={kpi.label} className={`shade-card p-5 fade-in-up-delay-${Math.min(i + 1, 4)}`}>
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
                  { label: "منخفض", value: 45, color: "bg-accent-soft" },
                  { label: "متوسط", value: 30, color: "bg-accent-soft" },
                  { label: "عالٍ", value: 15, color: "bg-orange-500" },
                  { label: "حرج", value: 3, color: "bg-red-500" },
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
                {[
                  { dept: "تقنية المعلومات", score: 81 },
                  { dept: "الموارد البشرية", score: 75 },
                  { dept: "المبيعات", score: 68 },
                  { dept: "التسويق", score: 74 },
                  { dept: "الإدارة", score: 79 },
                ].map((d) => (
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
                ٦٨٪ من الموظفين يفضلون وجبات صحية — قمنا بتخصيص خطط تغذية لكل قسم حسب مؤشر كتلة الجسم.
              </p>
              <Link href="/dashboard/admin/meals" className="text-sm text-[var(--emerald-ai)] hover:underline font-medium">
                عرض خطط التغذية ←
              </Link>
            </div>

            <div className="shade-card p-6 fade-in-up-delay-4">
              <h3 className="font-bold text-primary mb-4">🧠 توصيات الذكاء الاصطناعي</h3>
              <ul className="space-y-2 text-sm text-secondary">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald shrink-0" />
                  ارتفاع خطر السكري لدى ١٢ موظفاً — يوصى بعمل فحوصات دورية
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald shrink-0" />
                  قسم المبيعات بحاجة لبرنامج تخفيف إجهاد — العافية النفسية ٦٢٪
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald shrink-0" />
                  تحسن ملحوظ في مؤشرات صحة الموظفين بعد برنامج رمضان
                </li>
              </ul>
            </div>
          </div>

          {/* ── Diagnostics Section ─────────────────────────── */}
          <details className="mt-12 shade-card p-4" style={{ opacity: 0.6 }}>
            <summary className="cursor-pointer text-sm font-medium text-secondary select-none">
              🛠 Diagnostics (click to expand)
            </summary>
            <pre className="mt-3 text-xs text-left ltr" style={{
              background: "#f8f9fa",
              padding: "12px",
              borderRadius: "6px",
              overflowX: "auto",
              unicodeBidi: "embed",
            }}>
{JSON.stringify(diagnostics, null, 2)}
            </pre>
            <p className="text-xs text-[var(--text-muted)] mt-2">build: 2026-05-15T18</p>
          </details>
          {/* ──────────────────────────────────────────────────── */}
        </div>
      </main>
      <Footer />
    </>
  );
}
