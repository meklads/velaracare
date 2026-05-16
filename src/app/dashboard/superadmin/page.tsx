"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Loader2, Building2, Users, CreditCard, TrendingUp, Activity, Shield, Globe, CalendarDays, Settings, ArrowUpRight } from "lucide-react";

type User = { id: string; firstName: string; lastName: string; email: string; role: string; isActive: boolean; createdAt: string; companyId: string | null; };
type Company = { id: string; name: string; arabicName?: string; size: number; plan: string; status: string; };

export default function SuperAdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [usersRes, companiesRes] = await Promise.all([
          fetch("/api/users"),
          fetch("/api/companies"),
        ]);
        if (usersRes.ok) setUsers(await usersRes.json());
        if (companiesRes.ok) setCompanies(await companiesRes.json());
      } catch (e) {
        console.error("Failed to load", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const stats = {
    companies: companies.length,
    users: users.length,
    activeUsers: users.filter((u) => u.isActive).length,
    admins: users.filter((u) => u.role === "COMPANY_ADMIN").length,
    employees: users.filter((u) => u.role === "EMPLOYEE").length,
    proCompanies: companies.filter((c) => c.plan === "professional").length,
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-surface-mid">
      <Loader2 className="h-8 w-8 text-emerald animate-spin" />
    </div>
  );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface-mid pt-24 pb-12">
        <div className="container-shade py-6">
          <div className="fade-in-up mb-6">
            <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
              <Shield className="h-7 w-7 text-emerald" />
              لوحة الإدارة العليا
            </h1>
            <p className="text-secondary mt-1">نظرة عامة على المنصة وجميع الشركات</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "الشركات", value: stats.companies, icon: Building2, color: "from-blue-500 to-indigo-600" },
              { label: "المستخدمين", value: stats.users, icon: Users, color: "from-emerald-500 to-emerald-600" },
              { label: "نشط حالياً", value: stats.activeUsers, icon: Activity, color: "from-amber-500 to-orange-600" },
              { label: "خطط احترافية", value: stats.proCompanies, icon: CreditCard, color: "from-purple-500 to-violet-600" },
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

          <div className="grid md:grid-cols-2 gap-6">
            <div className="shade-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-primary flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-emerald" /> الشركات
                </h3>
                <Link href="/dashboard/superadmin/companies" className="text-sm text-emerald hover:underline flex items-center gap-1">
                  إدارة <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>
              {companies.length === 0 ? (
                <p className="text-sm text-secondary">لا توجد شركات</p>
              ) : (
                <div className="space-y-3">
                  {companies.slice(0, 5).map((c) => (
                    <div key={c.id} className="flex items-center justify-between p-3 rounded-xl border border-[var(--surface-border)] hover:bg-surface-mid transition-colors">
                      <div>
                        <p className="font-semibold text-primary text-sm">{c.arabicName || c.name}</p>
                        <p className="text-xs text-secondary">{c.size} موظف · {c.plan}</p>
                      </div>
                      <span className={`tag text-xs py-0.5 px-2.5 ${
                        c.status === "active" ? "bg-emerald-soft text-emerald-dark" : "bg-gray-100 text-gray-500"
                      }`}>{c.status === "active" ? "نشط" : c.status}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="shade-card p-6">
              <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-emerald" /> المستخدمين
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between p-2 rounded-lg bg-surface-mid">
                  <span className="text-secondary">إجمالي المستخدمين</span>
                  <span className="font-bold text-primary">{stats.users}</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-surface-mid">
                  <span className="text-secondary">مديري شركات</span>
                  <span className="font-bold text-primary">{stats.admins}</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-surface-mid">
                  <span className="text-secondary">موظفين</span>
                  <span className="font-bold text-primary">{stats.employees}</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-surface-mid">
                  <span className="text-secondary">نشط</span>
                  <span className="font-bold text-emerald">{stats.activeUsers}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
