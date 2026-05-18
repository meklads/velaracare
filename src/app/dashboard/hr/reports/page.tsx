"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Download, ChevronLeft, FileText, BarChart3, Loader2, TrendingUp, Users, Heart, AlertTriangle } from "lucide-react";

type User = { id: string; isActive: boolean; department: string | null; wellnessScore?: { score: number; riskLevel: string } | null };

type ReportData = {
  totalUsers: number;
  activeUsers: number;
  avgWellness: number;
  assessed: number;
  highRisk: number;
  criticalRisk: number;
  departments: number;
  noAssessment: number;
};

// Generate a printable HTML report
function generateReportHTML(data: ReportData, type: "monthly" | "cost" | "participation" | "risk"): string {
  const monthNames = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
  const now = new Date();
  const dateStr = `${now.getDate()} ${monthNames[now.getMonth()]} ${now.getFullYear()}`;

  const titles: Record<string, string> = {
    monthly: "التقرير الشهري للعافية",
    cost: "تحليل التكاليف الطبية",
    participation: "معدلات المشاركة",
    risk: "تقرير المخاطر الصحية",
  };

  return `
    <!DOCTYPE html>
    <html dir="rtl">
    <head><meta charset="utf-8"><title>${titles[type]} — Velara Care</title>
    <style>
      body { font-family: 'Avenir Arabic','Tajawal', Arial, sans-serif; padding: 40px; color: #1a1a2e; max-width: 800px; margin: 0 auto; }
      .header { text-align: center; border-bottom: 2px solid #10B981; padding-bottom: 20px; margin-bottom: 30px; }
      .header h1 { color: #10B981; margin: 0; font-size: 24px; }
      .header p { color: #666; margin: 5px 0 0; font-size: 14px; }
      .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
      .card { border: 1px solid #e5e7eb; border-radius: 12px; padding: 15px; text-align: center; }
      .card .value { font-size: 28px; font-weight: bold; color: #10B981; }
      .card .label { font-size: 12px; color: #666; margin-top: 5px; }
      .section { margin: 25px 0; }
      .section h2 { font-size: 18px; color: #1a1a2e; border-right: 4px solid #10B981; padding-right: 10px; }
      table { width: 100%; border-collapse: collapse; margin: 15px 0; }
      th, td { padding: 10px; text-align: right; border-bottom: 1px solid #e5e7eb; font-size: 14px; }
      th { background: #f9fafb; font-weight: 600; }
      .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #999; }
    </style>
    </head>
    <body>
      <div class="header">
        <h1>${titles[type]}</h1>
        <p>Velara Care — ${dateStr}</p>
      </div>
      <div class="grid">
        <div class="card"><div class="value">${data.activeUsers}</div><div class="label">الموظفون النشطون</div></div>
        <div class="card"><div class="value">${data.avgWellness}%</div><div class="label">متوسط العافية</div></div>
        <div class="card"><div class="value">${data.assessed}</div><div class="label">تم تقييمهم</div></div>
        <div class="card"><div class="value">${data.highRisk + data.criticalRisk}</div><div class="label">مخاطر عالية</div></div>
      </div>
      <div class="section">
        <h2>ملخص تنفيذي</h2>
        <p style="color: #666; line-height: 1.8;">
          إجمالي الموظفين: ${data.totalUsers} | النشطون: ${data.activeUsers} | تم تقييمهم: ${data.assessed}
          <br>
          متوسط درجة العافية: ${data.avgWellness}% | الأقسام: ${data.departments}
          <br>
          مخاطر عالية: ${data.highRisk + data.criticalRisk} | بدون تقييم: ${data.noAssessment}
        </p>
      </div>
      <table>
        <thead><tr><th>المؤشر</th><th>القيمة</th></tr></thead>
        <tbody>
          <tr><td>إجمالي الموظفين</td><td>${data.totalUsers}</td></tr>
          <tr><td>الموظفون النشطون</td><td>${data.activeUsers}</td></tr>
          <tr><td>متوسط العافية</td><td>${data.avgWellness}%</td></tr>
          <tr><td>تم تقييمهم</td><td>${data.assessed}</td></tr>
          <tr><td>مخاطر مرتفعة</td><td>${data.highRisk}</td></tr>
          <tr><td>مخاطر حرجة</td><td>${data.criticalRisk}</td></tr>
          <tr><td>بدون تقييم</td><td>${data.noAssessment}</td></tr>
          <tr><td>الأقسام</td><td>${data.departments}</td></tr>
        </tbody>
      </table>
      <div class="footer">
        <p>تم إنشاء هذا التقرير تلقائياً بواسطة Velara Care — منصة الصحة المؤسسية الذكية</p>
        <p>المملكة العربية السعودية — ${dateStr}</p>
      </div>
    </body></html>
  `;
}

function downloadReport(html: string, filename: string) {
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function HRReportsPage() {
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/users?take=200");
        const res2 = await fetch("/api/dashboard/stats?scope=company");
        let users: User[] = [];

        if (res.ok) {
          const body = await res.json();
          users = Array.isArray(body) ? body : (body.users || []);
        }

        let avgWellness = 0, highRisk = 0, criticalRisk = 0, assessed = 0;
        if (res2.ok) {
          const stats = await res2.json();
          avgWellness = stats.avgWellness || 0;
          highRisk = stats.highRisk || 0;
          criticalRisk = stats.criticalRisk || 0;
          assessed = stats.assessed || 0;
        }

        const activeUsers = users.filter((u) => u.isActive).length;
        const departments = new Set(users.map((u) => u.department).filter(Boolean)).size;
        const noAssessment = activeUsers - assessed;

        setData({
          totalUsers: users.length,
          activeUsers,
          avgWellness,
          assessed,
          highRisk,
          criticalRisk,
          departments,
          noAssessment: Math.max(0, noAssessment),
        });
      } catch (e) {
        console.error("Failed to load report data", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleDownload = (type: "monthly" | "cost" | "participation" | "risk") => {
    if (!data) return;
    setGenerating(type);
    try {
      const html = generateReportHTML(data, type);
      const filename = `velara-${type}-report-${new Date().toISOString().split("T")[0]}.html`;
      downloadReport(html, filename);
    } finally {
      setTimeout(() => setGenerating(null), 500);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-surface-mid pt-24">
          <div className="container-shade py-8">
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 text-emerald animate-spin" />
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const monthNames = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
  const now = new Date();
  const currentMonth = monthNames[now.getMonth()];
  const currentYear = now.getFullYear();

  const reports = [
    {
      id: "monthly" as const,
      name: `التقرير الشهري — ${currentMonth} ${currentYear}`,
      desc: "ملخص العافية والإنتاجية",
      icon: TrendingUp,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      id: "cost" as const,
      name: "تحليل التكاليف الطبية",
      desc: "تقدير التوفير في التأمين الصحي",
      icon: BarChart3,
      color: "from-blue-500 to-indigo-600",
    },
    {
      id: "participation" as const,
      name: "معدلات المشاركة",
      desc: "نسبة مشاركة الموظفين في البرنامج",
      icon: Users,
      color: "from-amber-500 to-orange-600",
    },
    {
      id: "risk" as const,
      name: "تقرير المخاطر الصحية",
      desc: "تحليل توزيع المخاطر بين الموظفين",
      icon: AlertTriangle,
      color: "from-rose-500 to-pink-600",
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface-mid pt-24 pb-12">
        <div className="container-shade py-6">
          <div className="fade-in-up mb-5">
            <Link href="/dashboard/hr" className="text-sm text-emerald hover:underline inline-flex items-center gap-1 mb-2">
              <ChevronLeft className="h-4 w-4" /> العودة للوحة التحكم
            </Link>
          </div>

          <div className="fade-in-up mb-6">
            <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
              <FileText className="h-7 w-7 text-emerald" />
              تقارير العافية
            </h1>
            <p className="text-secondary mt-1">التقارير الشهرية والتحليلات المبنية على بيانات حقيقية</p>
          </div>

          {/* Summary Cards */}
          {data && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 fade-in-up">
              {[
                { label: "متوسط العافية", value: `${data.avgWellness}%`, sub: `من ${data.assessed} موظف`, icon: Heart, color: "from-rose-500 to-pink-600" },
                { label: "النشطون", value: `${data.activeUsers}`, sub: `من أصل ${data.totalUsers}`, icon: Users, color: "from-blue-500 to-indigo-600" },
                { label: "مخاطر عالية", value: `${data.highRisk + data.criticalRisk}`, sub: `${data.criticalRisk} حرج`, icon: AlertTriangle, color: "from-orange-500 to-red-600" },
                { label: "نسبة الإكمال", value: data.totalUsers > 0 ? `${Math.round((data.assessed / data.totalUsers) * 100)}%` : "0%", sub: `${data.noAssessment} لم يقيموا`, icon: TrendingUp, color: "from-emerald-ai to-emerald-ai-dark" },
              ].map((s, i) => (
                <div key={s.label} className="shade-card p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center`}>
                      <s.icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xs text-secondary">{s.sub}</span>
                  </div>
                  <p className="stat-number text-primary">{s.value}</p>
                  <p className="text-xs text-muted mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          )}

          {/* Report Cards */}
          <div className="grid md:grid-cols-2 gap-6 fade-in-up-delay-2">
            {reports.map((r) => (
              <div key={r.id} className="shade-card p-6 flex items-start justify-between hover:shadow-md transition-all">
                <div className="flex items-start gap-3">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${r.color} flex items-center justify-center shrink-0`}>
                    <r.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary">{r.name}</h3>
                    <p className="text-sm text-secondary">{r.desc}</p>
                    {data && (
                      <div className="flex items-center gap-3 mt-2 text-xs text-muted">
                        <span>{data.totalUsers} موظف</span>
                        <span>·</span>
                        <span>{data.departments} أقسام</span>
                        <span>·</span>
                        <span>{currentMonth} {currentYear}</span>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleDownload(r.id)}
                  disabled={generating === r.id}
                  className="btn-outline text-xs py-2 px-3 shrink-0 disabled:opacity-50"
                >
                  {generating === r.id ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <Download className="h-3 w-3" />
                  )}
                  <span className="mr-1">{generating === r.id ? "..." : "PDF"}</span>
                </button>
              </div>
            ))}
          </div>

          {/* Info Note */}
          <div className="mt-8 shade-card p-5 fade-in-up-delay-3">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-emerald shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-primary">التقارير تعتمد على بيانات حقيقية</p>
                <p className="text-xs text-secondary mt-1">
                  يتم إنشاء التقارير بناءً على بيانات التقييم الصحي للموظفين. يتم تحديث البيانات تلقائياً.
                  يمكن حفظ التقرير كملف PDF من خلال متصفحك (طباعة ← حفظ كـ PDF).
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
