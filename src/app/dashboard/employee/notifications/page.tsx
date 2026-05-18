"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import { Loader2, Bell, Calendar, Clock, AlertTriangle, CheckCircle2, ShoppingBag, Apple, Brain, Heart, ArrowLeft, Trash2, Info } from "lucide-react";

type NotificationItem = {
  id: string;
  type: string;
  title: string;
  message: string;
  href?: string;
  urgent: boolean;
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/notifications")
      .then((r) => r.json())
      .then((data) => {
        setNotifications(Array.isArray(data) ? data : []);
      })
      .catch(() => setNotifications([]))
      .finally(() => setLoading(false));
  }, []);

  const typeIcon = (type: string) => {
    switch (type) {
      case "consultation": return <Calendar className="h-5 w-5 text-blue-500" />;
      case "hra": return <Heart className="h-5 w-5 text-rose-500" />;
      case "order": return <ShoppingBag className="h-5 w-5 text-amber-500" />;
      case "risk": return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default: return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const typeBg = (type: string) => {
    switch (type) {
      case "consultation": return "bg-blue-100";
      case "hra": return "bg-rose-100";
      case "order": return "bg-amber-100";
      case "risk": return "bg-red-100";
      default: return "bg-gray-100";
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface-mid pt-24">
        <div className="container-shade py-8">
          {/* Header */}
          <div className="fade-in-up mb-8">
            <Link href="/dashboard/employee" className="text-sm text-emerald hover:underline inline-flex items-center gap-1 transition-colors mb-3">
              <ArrowLeft className="h-4 w-4" /> العودة للوحة التحكم
            </Link>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
                  <Bell className="h-6 w-6 text-emerald" />
                  الإشعارات
                </h1>
                <p className="text-secondary text-sm mt-1">{notifications.length} إشعار{notifications.length !== 1 ? "ات" : ""}</p>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 text-emerald animate-spin" />
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-20">
              <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-lg font-medium text-primary">لا توجد إشعارات</p>
              <p className="text-sm text-secondary mt-1">ستظهر هنا جميع الإشعارات والتذكيرات الخاصة بك</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((n, i) => (
                <div
                  key={n.id}
                  className={`fade-in-up shade-card p-4 flex items-start gap-4 hover:shadow-lg transition-all ${
                    n.urgent ? "border-r-4 border-r-red-400" : ""
                  }`}
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <div className={`w-12 h-12 rounded-2xl ${typeBg(n.type)} flex items-center justify-center shrink-0`}>
                    {typeIcon(n.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-semibold text-primary text-sm">{n.title}</h3>
                      {n.urgent && (
                        <span className="text-[10px] font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded-full">عاجل</span>
                      )}
                    </div>
                    <p className="text-sm text-secondary">{n.message}</p>
                  </div>
                  {n.href && (
                    <Link
                      href={n.href}
                      className="shrink-0 text-xs font-medium text-emerald hover:text-emerald-600 transition-colors px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100"
                    >
                      عرض
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}