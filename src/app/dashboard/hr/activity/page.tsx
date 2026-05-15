import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ChevronLeft, Bell, UserCheck, Calendar, Apple, Activity } from "lucide-react";

export const metadata: Metadata = {
  title: "النشاطات",
  description: "آخر النشاطات في المنصة",
};

const activities = [
  { icon: UserCheck, name: "أحمد العمر", action: "أكمل التقييم الصحي", dept: "الإنتاج", time: "منذ ١٠ دقائق", risk: "مرتفع" },
  { icon: Calendar, name: "نورة الحسين", action: "حجزت استشارة تغذية", dept: "المبيعات", time: "منذ ٣٠ دقيقة", risk: "متوسط" },
  { icon: Apple, name: "فهد المطيري", action: "طلب وجبة الغداء", dept: "تقنية المعلومات", time: "منذ ساعة", risk: "منخفض" },
  { icon: Activity, name: "سارة العنزي", action: "حدّثت ملفها الصحي", dept: "التسويق", time: "منذ ساعتين", risk: "منخفض" },
  { icon: UserCheck, name: "خالد الدوسري", action: "أكمل التقييم الصحي", dept: "الإنتاج", time: "منذ ٣ ساعات", risk: "حرج" },
  { icon: Calendar, name: "محمد الأحمد", action: "حجز استشارة لياقة", dept: "تقنية المعلومات", time: "منذ ٤ ساعات", risk: "منخفض" },
  { icon: Apple, name: "نورة العنزي", action: "طلبت وجبة الإفطار", dept: "التسويق", time: "منذ ٥ ساعات", risk: "منخفض" },
  { icon: UserCheck, name: "عبدالله السعد", action: "أنشأ حساب جديد", dept: "المبيعات", time: "منذ ٦ ساعات", risk: "منخفض" },
];

export default function ActivityPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface-mid pt-24">
        <div className="container-shade py-8">
          <div className="fade-in-up mb-8">
            <Link href="/dashboard/hr" className="text-sm text-emerald hover:underline inline-flex items-center gap-1 mb-2">
              <ChevronLeft className="h-4 w-4" /> العودة للوحة التحكم
            </Link>
            <h1 className="text-2xl font-bold text-primary">🔔 النشاطات</h1>
            <p className="text-secondary">آخر النشاطات والتحديثات في المنصة</p>
          </div>

          <div className="shade-card p-6">
            <div className="space-y-1">
              {activities.map((a, i) => (
                <div key={i} className="flex items-center justify-between py-3 px-3 rounded-xl hover:bg-[var(--white-warm)] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      a.risk === "حرج" ? "bg-red-500" :
                      a.risk === "مرتفع" ? "bg-orange-500" :
                      a.risk === "متوسط" ? "bg-amber-500" :
                      "bg-emerald"
                    }`} />
                    <a.icon className="h-4 w-4 text-secondary" />
                    <div>
                      <p className="text-sm font-semibold text-primary">{a.name}</p>
                      <p className="text-xs text-secondary">{a.action} · {a.dept}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted">{a.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
