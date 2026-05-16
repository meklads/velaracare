"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ChevronLeft, Mail, Loader2, CheckCircle, Upload, Users, Download, AlertTriangle, FileSpreadsheet } from "lucide-react";

type BulkResult = { success: boolean; email: string; name: string; error?: string };

export default function InvitePage() {
  const [tab, setTab] = useState<"single" | "bulk">("single");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Single Invite State ──
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", department: "", position: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // ── Bulk Invite State ──
  const [csvData, setCsvData] = useState<{ firstName: string; lastName: string; email: string; department: string; position: string }[]>([]);
  const [bulkLoading, setBulkLoading] = useState(false);
  const [bulkResults, setBulkResults] = useState<BulkResult[] | null>(null);
  const [bulkMsg, setBulkMsg] = useState("");

  function update(field: string, value: string) {
    setForm((p) => ({ ...p, [field]: value }));
  }

  // ── Single Invite ──
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setMsg("✅ تم إرسال الدعوة بنجاح!");
        setForm({ firstName: "", lastName: "", email: "", department: "", position: "" });
      } else {
        const err = await res.json();
        setMsg(`❌ ${err.error || "حدث خطأ"}`);
      }
    } catch {
      setMsg("❌ حدث خطأ في الاتصال");
    } finally {
      setLoading(false);
    }
  }

  // ── CSV Parsing ──
  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target?.result as string;
      const lines = text.split("\n").filter((l) => l.trim());
      if (lines.length < 2) {
        setBulkMsg("❌ الملف فارغ أو لا يحتوي على بيانات كافية");
        return;
      }

      // Parse header
      const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
      const firstNameIdx = headers.findIndex((h) => h.includes("first") || h.includes("الاسم") || h.includes("اسم"));
      const lastNameIdx = headers.findIndex((h) => h.includes("last") || h.includes("العائلة") || h.includes("لقب"));
      const emailIdx = headers.findIndex((h) => h.includes("email") || h.includes("البريد") || h.includes("ايميل"));
      const deptIdx = headers.findIndex((h) => h.includes("dept") || h.includes("department") || h.includes("قسم"));
      const posIdx = headers.findIndex((h) => h.includes("position") || h.includes("pos") || h.includes("مسمى") || h.includes("وظيفي"));

      if (emailIdx === -1 || firstNameIdx === -1) {
        setBulkMsg("❌ لم يتم العثور على أعمدة 'email' و 'firstName' في الملف. تأكد من وجود رؤوس الأعمدة.");
        return;
      }

      const parsed: typeof csvData = [];
      for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(",").map((c) => c.trim().replace(/^"|"$/g, ""));
        const firstName = cols[firstNameIdx] || "";
        const email = cols[emailIdx] || "";
        if (!email || !firstName) continue; // skip rows without required fields
        parsed.push({
          firstName,
          lastName: lastNameIdx >= 0 ? cols[lastNameIdx] || "" : "",
          email,
          department: deptIdx >= 0 ? cols[deptIdx] || "" : "",
          position: posIdx >= 0 ? cols[posIdx] || "" : "",
        });
      }

      if (parsed.length === 0) {
        setBulkMsg("❌ لم يتم العثور على بيانات صالحة في الملف");
        return;
      }

      setCsvData(parsed);
      setBulkMsg(`✅ تم قراءة ${parsed.length} موظف من الملف. راجع البيانات ثم اضغط "استيراد".`);
      setBulkResults(null);
    };
    reader.readAsText(file);
  }

  // ── Bulk Submit ──
  async function handleBulkSubmit() {
    if (csvData.length === 0) return;
    setBulkLoading(true);
    setBulkMsg("");
    setBulkResults(null);
    try {
      const res = await fetch("/api/users/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employees: csvData, companyName: "الشركة" }),
      });
      const data = await res.json();
      setBulkResults(data.results || []);
      setBulkMsg(data.message || "تمت العملية");
      if (data.succeeded > 0) setCsvData([]);
    } catch {
      setBulkMsg("❌ حدث خطأ في الاتصال");
    } finally {
      setBulkLoading(false);
    }
  }

  function downloadTemplate() {
    const csv = "firstName,lastName,email,department,position\nMohamed,Al-Ali,employee@company.com,IT,Developer\nNora,Al-Saud,nora@company.com,HR,Specialist";
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "employees_template.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface-mid pt-24 pb-12">
        <div className="container-shade py-6">
          {/* Breadcrumb */}
          <div className="fade-in-up mb-5">
            <Link href="/dashboard/hr" className="text-sm text-emerald hover:underline inline-flex items-center gap-1 mb-2">
              <ChevronLeft className="h-4 w-4" /> العودة للوحة التحكم
            </Link>
          </div>

          {/* Header */}
          <div className="fade-in-up mb-6">
            <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
              <Users className="h-7 w-7 text-emerald" />
              دعوة الموظفين
            </h1>
            <p className="text-secondary mt-1">أضف موظفين جدد إلى منصة Velara Care</p>
          </div>

          {/* Tab Switcher */}
          <div className="fade-in-up mb-6 flex items-center gap-2">
            <button
              onClick={() => setTab("single")}
              className={`text-sm px-5 py-2 rounded-xl transition-all ${
                tab === "single"
                  ? "bg-emerald text-white shadow-lg shadow-emerald/20"
                  : "bg-surface-mid text-secondary hover:text-primary border border-[var(--surface-border)]"
              }`}
            >
              <Mail className="h-4 w-4 ml-1.5 inline" />
              دعوة فردية
            </button>
            <button
              onClick={() => setTab("bulk")}
              className={`text-sm px-5 py-2 rounded-xl transition-all ${
                tab === "bulk"
                  ? "bg-emerald text-white shadow-lg shadow-emerald/20"
                  : "bg-surface-mid text-secondary hover:text-primary border border-[var(--surface-border)]"
              }`}
            >
              <Upload className="h-4 w-4 ml-1.5 inline" />
              استيراد ملف CSV
            </button>
          </div>

          {tab === "single" && (
            <div className="max-w-2xl mx-auto">
              {msg && (
                <div className={`mb-4 rounded-xl px-5 py-3 text-sm text-center font-medium ${
                  msg.includes("✅") ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"
                }`}>
                  {msg}
                </div>
              )}
              <div className="shade-card p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-primary">الاسم الأول</label>
                      <input
                        type="text"
                        value={form.firstName}
                        onChange={(e) => update("firstName", e.target.value)}
                        placeholder="محمد"
                        required
                        className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-3 text-sm text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-emerald-ai/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-primary">الاسم الأخير</label>
                      <input
                        type="text"
                        value={form.lastName}
                        onChange={(e) => update("lastName", e.target.value)}
                        placeholder="العلي"
                        required
                        className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-3 text-sm text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-emerald-ai/30"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary">البريد الإلكتروني للشركة</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="employee@company.com"
                      dir="ltr"
                      required
                      className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-3 text-sm text-left text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-emerald-ai/30"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-primary">القسم</label>
                      <input
                        type="text"
                        value={form.department}
                        onChange={(e) => update("department", e.target.value)}
                        placeholder="تقنية المعلومات"
                        className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-3 text-sm text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-emerald-ai/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-primary">المسمى الوظيفي</label>
                      <input
                        type="text"
                        value={form.position}
                        onChange={(e) => update("position", e.target.value)}
                        placeholder="مطور برمجيات"
                        className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-3 text-sm text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-emerald-ai/30"
                      />
                    </div>
                  </div>

                  <button type="submit" disabled={loading} className="btn-primary w-full justify-center text-sm disabled:opacity-60">
                    {loading ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : <Mail className="ml-2 h-4 w-4" />}
                    {loading ? "جاري الإرسال..." : "إرسال دعوة"}
                  </button>
                </form>
              </div>
            </div>
          )}

          {tab === "bulk" && (
            <div className="max-w-3xl mx-auto">
              {/* Messages */}
              {bulkMsg && (
                <div className={`mb-4 rounded-xl px-5 py-3 text-sm text-center font-medium ${
                  bulkMsg.includes("✅") || bulkMsg.includes("تم")
                    ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                    : bulkMsg.includes("❌")
                    ? "bg-red-500/10 text-red-500 border border-red-500/20"
                    : "bg-blue-500/10 text-blue-600 border border-blue-500/20"
                }`}>
                  {bulkMsg}
                </div>
              )}

              {/* Upload Area */}
              {csvData.length === 0 && (
                <div className="shade-card p-8 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-soft flex items-center justify-center mx-auto mb-4">
                    <FileSpreadsheet className="h-8 w-8 text-emerald" />
                  </div>
                  <h2 className="text-lg font-bold text-primary mb-2">استيراد موظفين من ملف CSV</h2>
                  <p className="text-sm text-secondary mb-6 max-w-md mx-auto">
                    ارفع ملف CSV يحتوي على بيانات الموظفين. يمكن تنزيل نموذج جاهز للبدء.
                  </p>
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="btn-primary text-sm py-3 px-8"
                    >
                      <Upload className="ml-2 h-4 w-4" />
                      اختيار ملف CSV
                    </button>
                    <button
                      onClick={downloadTemplate}
                      className="btn-outline text-sm py-3 px-6"
                    >
                      <Download className="ml-2 h-4 w-4" />
                      تنزيل النموذج
                    </button>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="text-xs text-secondary space-y-1">
                    <p>📌 رأس العمود الأول: <strong>firstName</strong> — الاسم الأول</p>
                    <p>📌 رأس العمود الثاني: <strong>lastName</strong> — الاسم الأخير</p>
                    <p>📌 رأس العمود الثالث: <strong>email</strong> — البريد الإلكتروني (مطلوب)</p>
                    <p>📌 رأس العمود الرابع: <strong>department</strong> — القسم</p>
                    <p>📌 رأس العمود الخامس: <strong>position</strong> — المسمى الوظيفي</p>
                  </div>
                </div>
              )}

              {/* Preview Table */}
              {csvData.length > 0 && (
                <div className="shade-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-primary flex items-center gap-2">
                      <Users className="h-5 w-5 text-emerald" />
                      معاينة البيانات
                      <span className="tag text-xs py-0.5 px-2.5 bg-emerald-soft text-emerald-dark">{csvData.length} موظف</span>
                    </h2>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => { setCsvData([]); setBulkMsg(""); setBulkResults(null); }}
                        className="text-sm py-2 px-4 rounded-xl border border-[var(--surface-border)] text-secondary hover:text-primary transition-all"
                      >
                        رفع ملف جديد
                      </button>
                      <button
                        onClick={handleBulkSubmit}
                        disabled={bulkLoading}
                        className="btn-primary text-sm py-2 px-6"
                      >
                        {bulkLoading ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : <Upload className="ml-2 h-4 w-4" />}
                        {bulkLoading ? "جاري الاستيراد..." : "استيراد الجميع"}
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto max-h-96 overflow-y-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[var(--surface-border)] bg-surface-mid/50">
                          <th className="text-right py-2.5 px-3 text-secondary font-medium">#</th>
                          <th className="text-right py-2.5 px-3 text-secondary font-medium">الاسم الأول</th>
                          <th className="text-right py-2.5 px-3 text-secondary font-medium">الاسم الأخير</th>
                          <th className="text-right py-2.5 px-3 text-secondary font-medium">البريد</th>
                          <th className="text-right py-2.5 px-3 text-secondary font-medium">القسم</th>
                          <th className="text-right py-2.5 px-3 text-secondary font-medium">المسمى</th>
                        </tr>
                      </thead>
                      <tbody>
                        {csvData.map((row, i) => (
                          <tr key={i} className="border-b border-[var(--surface-border)] last:border-0 hover:bg-surface-mid/30">
                            <td className="py-2.5 px-3 text-secondary text-xs">{i + 1}</td>
                            <td className="py-2.5 px-3 font-medium text-primary">{row.firstName}</td>
                            <td className="py-2.5 px-3 text-secondary">{row.lastName}</td>
                            <td className="py-2.5 px-3 text-secondary dir-ltr text-xs">{row.email}</td>
                            <td className="py-2.5 px-3 text-secondary">{row.department || "—"}</td>
                            <td className="py-2.5 px-3 text-secondary">{row.position || "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Results */}
              {bulkResults && bulkResults.length > 0 && (
                <div className="shade-card p-6 mt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-primary">النتائج:</span>
                      <span className="tag text-xs py-0.5 px-2.5 bg-emerald-soft text-emerald-dark">{bulkResults.filter((r) => r.success).length} ناجح</span>
                      {bulkResults.filter((r) => !r.success).length > 0 && (
                        <span className="tag text-xs py-0.5 px-2.5 bg-red-50 text-red-500">{bulkResults.filter((r) => !r.success).length} فاشل</span>
                      )}
                    </div>
                  </div>
                  <div className="space-y-1 max-h-60 overflow-y-auto">
                    {bulkResults.map((r, i) => (
                      <div key={i} className={`flex items-center justify-between text-sm py-1.5 px-3 rounded-lg ${
                        r.success ? "bg-emerald-500/5" : "bg-red-500/5"
                      }`}>
                        <span className="flex items-center gap-2">
                          {r.success
                            ? <CheckCircle className="h-4 w-4 text-emerald" />
                            : <AlertTriangle className="h-4 w-4 text-red-500" />
                          }
                          <span className="text-primary font-medium">{r.name}</span>
                          <span className="text-secondary text-xs">{r.email}</span>
                        </span>
                        {r.error && <span className="text-xs text-red-500">{r.error}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
