"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Loader2, ChevronLeft, Building2, Plus, Search, CheckCircle, XCircle, Edit3, Trash2, Users, CreditCard, Globe } from "lucide-react";

type Company = {
  id: string;
  name: string;
  arabicName: string;
  domain: string | null;
  size: number;
  industry: string | null;
  plan: string;
  status: string;
  _count?: { users: number };
  createdAt: string;
};

const planLabels: Record<string, string> = {
  basic: "Basic",
  professional: "Professional",
  enterprise: "Enterprise",
};

const planColors: Record<string, string> = {
  basic: "bg-gray-100 text-gray-600",
  professional: "bg-emerald-100 text-emerald-700",
  enterprise: "bg-purple-100 text-purple-700",
};

export default function SuperAdminCompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Company | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  // Form state
  const [form, setForm] = useState({
    name: "",
    arabicName: "",
    domain: "",
    size: "0",
    industry: "",
    plan: "basic",
    status: "active",
  });

  useEffect(() => {
    loadCompanies();
  }, []);

  async function loadCompanies() {
    try {
      const res = await fetch("/api/companies");
      if (res.ok) setCompanies(await res.json());
    } catch (e) {
      console.error("Failed to load companies", e);
    } finally {
      setLoading(false);
    }
  }

  function openCreate() {
    setEditing(null);
    setForm({ name: "", arabicName: "", domain: "", size: "0", industry: "", plan: "basic", status: "active" });
    setShowModal(true);
  }

  function openEdit(company: Company) {
    setEditing(company);
    setForm({
      name: company.name,
      arabicName: company.arabicName || "",
      domain: company.domain || "",
      size: String(company.size),
      industry: company.industry || "",
      plan: company.plan,
      status: company.status,
    });
    setShowModal(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg("");

    try {
      const url = editing ? "/api/companies" : "/api/companies";
      const method = editing ? "PATCH" : "POST";
      const body = editing
        ? { id: editing.id, ...form, size: parseInt(form.size) || 0 }
        : { ...form, size: parseInt(form.size) || 0 };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setMsg(editing ? "✅ تم تحديث الشركة بنجاح" : "✅ تم إنشاء الشركة بنجاح");
        setShowModal(false);
        loadCompanies();
      } else {
        const err = await res.json();
        setMsg(`❌ ${err.error || "حدث خطأ"}`);
      }
    } catch {
      setMsg("❌ حدث خطأ في الاتصال");
    } finally {
      setSaving(false);
    }
  }

  async function toggleStatus(company: Company) {
    const newStatus = company.status === "active" ? "inactive" : "active";
    try {
      const res = await fetch("/api/companies", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: company.id, status: newStatus }),
      });
      if (res.ok) loadCompanies();
    } catch (e) {
      console.error("Failed to update company", e);
    }
  }

  const filtered = companies.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.arabicName.includes(search) ||
    (c.domain?.includes(search))
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-mid">
        <Loader2 className="h-8 w-8 text-emerald animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface-mid pt-24 pb-12">
        <div className="container-shade py-6">
          {/* Header */}
          <div className="fade-in-up mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <Link href="/dashboard/superadmin" className="text-sm text-emerald hover:underline inline-flex items-center gap-1 mb-1">
                <ChevronLeft className="h-4 w-4" /> العودة للوحة التحكم
              </Link>
              <h1 className="text-2xl font-bold text-primary flex items-center gap-2 mt-1">
                <Building2 className="h-7 w-7 text-emerald" />
                إدارة الشركات
              </h1>
              <p className="text-secondary mt-1">{companies.length} شركة مسجلة</p>
            </div>
            <button onClick={openCreate} className="btn-primary text-sm py-2 px-5">
              <Plus className="ml-2 h-4 w-4" />
              إضافة شركة
            </button>
          </div>

          {/* Message */}
          {msg && (
            <div className={`fade-in-up mb-4 rounded-xl px-5 py-3 text-sm text-center font-medium ${
              msg.includes("✅") ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"
            }`}>
              {msg}
            </div>
          )}

          {/* Search */}
          <div className="fade-in-up mb-6">
            <div className="relative max-w-sm">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary pointer-events-none" />
              <input
                type="text"
                placeholder="بحث باسم الشركة..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid pr-10 px-4 py-2.5 text-sm text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-emerald-ai/30"
              />
            </div>
          </div>

          {/* Companies Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-secondary">
              <Building2 className="h-16 w-16 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">لا توجد شركات</p>
              <p className="text-sm mt-1">أضف شركة جديدة للبدء</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filtered.map((company) => (
                <div key={company.id} className="shade-card p-5 fade-in-up hover:shadow-md transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="w-12 h-12 rounded-xl bg-emerald-soft flex items-center justify-center shrink-0">
                        <Building2 className="h-6 w-6 text-emerald" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-primary truncate">{company.arabicName || company.name}</h3>
                          <span className={`tag text-xs py-0.5 px-2.5 ${planColors[company.plan] || planColors.basic}`}>
                            {planLabels[company.plan] || company.plan}
                          </span>
                        </div>
                        <p className="text-xs text-secondary flex flex-wrap items-center gap-2 mt-0.5">
                          <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {company._count?.users || 0} مستخدم</span>
                          <span className="opacity-30">|</span>
                          <span>{company.size} موظف</span>
                          {company.domain && <><span className="opacity-30">|</span> <Globe className="h-3 w-3" /> {company.domain}</>}
                          {company.industry && <><span className="opacity-30">|</span> {company.industry}</>}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`tag text-xs py-1 px-2.5 ${
                        company.status === "active" ? "bg-emerald-soft text-emerald-dark" : "bg-red-100 text-red-600"
                      }`}>
                        {company.status === "active" ? "نشط" : "غير نشط"}
                      </span>
                      <button onClick={() => openEdit(company)} className="p-2 rounded-lg hover:bg-surface-mid text-secondary hover:text-emerald transition-all" title="تعديل">
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button onClick={() => toggleStatus(company)} className="p-2 rounded-lg hover:bg-surface-mid text-secondary hover:text-amber-500 transition-all" title="تعطيل/تفعيل">
                        {company.status === "active" ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Create/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setShowModal(false)}>
            <div className="shade-card w-full max-w-lg m-4 p-6" onClick={(e) => e.stopPropagation()}>
              <h2 className="font-bold text-primary text-lg mb-4">
                {editing ? "✏️ تعديل الشركة" : "🏢 إضافة شركة جديدة"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-primary">اسم الشركة (إنجليزي)</label>
                    <input type="text" value={form.name} onChange={(e) => setForm(p => ({...p, name: e.target.value}))} required
                      className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-emerald-ai/30" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-primary">الاسم بالعربية</label>
                    <input type="text" value={form.arabicName} onChange={(e) => setForm(p => ({...p, arabicName: e.target.value}))}
                      className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-emerald-ai/30" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-primary">النطاق (Domain)</label>
                    <input type="text" value={form.domain} onChange={(e) => setForm(p => ({...p, domain: e.target.value}))} placeholder="company.com" dir="ltr"
                      className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-2.5 text-sm text-primary text-left focus:outline-none focus:ring-2 focus:ring-emerald-ai/30" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-primary">عدد الموظفين</label>
                    <input type="number" value={form.size} onChange={(e) => setForm(p => ({...p, size: e.target.value}))} min={0}
                      className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-emerald-ai/30" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-primary">القطاع</label>
                    <input type="text" value={form.industry} onChange={(e) => setForm(p => ({...p, industry: e.target.value}))} placeholder="تقنية"
                      className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-emerald-ai/30" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-primary">الباقة</label>
                    <select value={form.plan} onChange={(e) => setForm(p => ({...p, plan: e.target.value}))}
                      className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-emerald-ai/30">
                      <option value="basic">Basic</option>
                      <option value="professional">Professional</option>
                      <option value="enterprise">Enterprise</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-primary">الحالة</label>
                    <select value={form.status} onChange={(e) => setForm(p => ({...p, status: e.target.value}))}
                      className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-emerald-ai/30">
                      <option value="active">نشط</option>
                      <option value="inactive">غير نشط</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <button type="button" onClick={() => setShowModal(false)}
                    className="flex-1 py-2.5 rounded-xl border border-[var(--surface-border)] text-secondary text-sm hover:text-primary transition-all">
                    إلغاء
                  </button>
                  <button type="submit" disabled={saving}
                    className="flex-1 py-2.5 rounded-xl bg-emerald text-white text-sm font-semibold hover:bg-emerald-dark transition-all disabled:opacity-50 flex items-center justify-center gap-1">
                    {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                    {saving ? "جاري الحفظ..." : editing ? "تحديث" : "إنشاء"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
