"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Loader2, ChevronLeft, User, Mail, Building, Calendar, Heart, TrendingUp, Apple, Activity, Dumbbell, Moon, Brain } from "lucide-react";

type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  department: string | null;
  position: string | null;
  phone: string | null;
  isActive: boolean;
  createdAt: string;
  wellnessScore?: { score: number; riskLevel: string; sleepScore: number; stressScore: number; activityScore: number; nutritionScore: number; bmiScore: number; trend: string } | null;
};

const roleLabels: Record<string, string> = {
  SUPER_ADMIN: "مدير النظام",
  COMPANY_ADMIN: "مدير الشركة",
  HR: "موارد بشرية",
  EMPLOYEE: "موظف",
  NUTRITIONIST: "أخصائي تغذية",
  RESTAURANT: "مطعم",
};

export default function EmployeeDetailPage() {
  const params = useParams();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/users");
        if (res.ok) {
          const users: Employee[] = await res.json();
          const found = users.find((u) => u.id === params.id);
          setEmployee(found || null);
        }
      } catch (e) {
        console.error("Failed to load employee", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-mid">
        <Loader2 className="h-8 w-8 text-emerald animate-spin" />
      </div>
    );
  }

  if (!employee) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-surface-mid pt-24 pb-12">
          <div className="container-shade py-6 text-center">
            <User className="h-16 w-16 mx-auto mb-4 text-secondary opacity-30" />
            <h1 className="text-2xl font-bold text-primary mb-2">الموظف غير موجود</h1>
            <p className="text-secondary mb-6">لم يتم العثور على الموظف المطلوب</p>
            <Link href="/dashboard/admin/employees" className="btn-primary text-sm">
              العودة لقائمة الموظفين
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const ws = employee.wellnessScore;
  const scoreColor = ws ? (ws.score >= 80 ? "text-emerald-400" : ws.score >= 60 ? "text-amber-400" : "text-red-400") : "text-gray-400";
  const riskColor = ws?.riskLevel === "low" ? "text-emerald-400 bg-emerald-500/10" : ws?.riskLevel === "medium" ? "text-amber-400 bg-amber-500/10" : "text-red-400 bg-red-500/10";

  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface-mid pt-24 pb-12">
        <div className="container-shade py-6 max-w-4xl mx-auto">
          <div className="fade-in-up mb-5">
            <Link href="/dashboard/admin/employees" className="text-sm text-emerald hover:underline inline-flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" /> العودة لقائمة الموظفين
            </Link>
          </div>

          {/* Profile Header */}
          <div className="shade-card p-6 mb-6 fade-in-up">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-full bg-emerald-gradient flex items-center justify-center text-2xl font-bold text-white">
                {employee.firstName[0]}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-primary">{employee.firstName} {employee.lastName}</h1>
                <div className="flex flex-wrap items-center gap-3 mt-1.5">
                  <span className="text-sm text-secondary flex items-center gap-1">
                    <Mail className="h-3.5 w-3.5" /> {employee.email}
                  </span>
                  <span className="text-sm text-secondary">·</span>
                  <span className="text-sm text-secondary flex items-center gap-1">
                    <Building className="h-3.5 w-3.5" /> {employee.department || "بدون قسم"}
                  </span>
                  <span className="text-sm text-secondary">·</span>
                  <span className={`tag text-xs py-0.5 px-2.5 ${riskColor}`}>
                    {ws?.riskLevel === "low" ? "منخفض" : ws?.riskLevel === "medium" ? "متوسط" : "مرتفع"}
                  </span>
                </div>
              </div>
              <div className="text-center">
                <p className={`text-4xl font-extrabold ${scoreColor}`}>{ws?.score || "—"}</p>
                <p className="text-xs text-secondary mt-1">Wellness Score</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Personal Info */}
            <div className="shade-card p-6 fade-in-up-delay-2">
              <h2 className="font-bold text-primary mb-4 flex items-center gap-2">
                <User className="h-5 w-5 text-emerald" /> المعلومات الشخصية
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-[var(--surface-border)]">
                  <span className="text-secondary">الاسم الكامل</span>
                  <span className="font-medium text-primary">{employee.firstName} {employee.lastName}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[var(--surface-border)]">
                  <span className="text-secondary">البريد الإلكتروني</span>
                  <span className="font-medium text-primary">{employee.email}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[var(--surface-border)]">
                  <span className="text-secondary">الجوال</span>
                  <span className="font-medium text-primary">{employee.phone || "—"}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[var(--surface-border)]">
                  <span className="text-secondary">القسم</span>
                  <span className="font-medium text-primary">{employee.department || "—"}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[var(--surface-border)]">
                  <span className="text-secondary">المسمى الوظيفي</span>
                  <span className="font-medium text-primary">{employee.position || "—"}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[var(--surface-border)]">
                  <span className="text-secondary">الدور</span>
                  <span className="font-medium text-primary">{roleLabels[employee.role] || employee.role}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-secondary">تاريخ التسجيل</span>
                  <span className="font-medium text-primary">{new Date(employee.createdAt).toLocaleDateString("ar-SA")}</span>
                </div>
              </div>
            </div>

            {/* Wellness Score Details */}
            <div className="shade-card p-6 fade-in-up-delay-3">
              <h2 className="font-bold text-primary mb-4 flex items-center gap-2">
                <Heart className="h-5 w-5 text-emerald" /> تفاصيل العافية
              </h2>
              {ws ? (
                <div className="space-y-4">
                  {[
                    { label: "مؤشر كتلة الجسم", value: ws.bmiScore, max: 100, icon: Brain, color: "text-indigo-400" },
                    { label: "النوم", value: ws.sleepScore, max: 100, icon: Moon, color: "text-indigo-400" },
                    { label: "النشاط البدني", value: ws.activityScore, max: 100, icon: Dumbbell, color: "text-emerald-400" },
                    { label: "التوتر", value: ws.stressScore, max: 100, icon: Activity, color: "text-amber-400" },
                    { label: "التغذية", value: ws.nutritionScore, max: 100, icon: Apple, color: "text-green-400" },
                  ].map((metric) => (
                    <div key={metric.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-secondary flex items-center gap-1.5">
                          <metric.icon className={`h-3.5 w-3.5 ${metric.color}`} />
                          {metric.label}
                        </span>
                        <span className="font-semibold text-primary">{metric.value}</span>
                      </div>
                      <div className="w-full bg-[var(--surface-border)] rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${metric.value >= 75 ? "bg-emerald" : metric.value >= 50 ? "bg-amber-500" : "bg-rose-500"}`}
                          style={{ width: `${metric.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 pt-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-emerald" />
                    <span className="text-secondary">الاتجاه: </span>
                    <span className={`font-medium ${ws.trend === "up" ? "text-emerald" : ws.trend === "down" ? "text-red-500" : "text-secondary"}`}>
                      {ws.trend === "up" ? "تصاعدي" : ws.trend === "down" ? "تنازلي" : "مستقر"}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-secondary">
                  <Heart className="h-10 w-10 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">لم يتم إجراء تقييم صحي بعد</p>
                  <p className="text-xs mt-1">يمكن للموظف إجراء التقييم من لوحة التحكم</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
