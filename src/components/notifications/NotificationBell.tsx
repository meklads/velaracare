"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { Bell, X, Loader2, AlertTriangle, Calendar, ClipboardList, ShoppingBag } from "lucide-react";

type Notification = {
  id: string;
  type: string;
  title: string;
  message: string;
  href?: string;
  urgent: boolean;
};

const typeIcons: Record<string, any> = {
  consultation: Calendar,
  hra: ClipboardList,
  order: ShoppingBag,
  risk: AlertTriangle,
};

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const loadNotifications = useCallback(async () => {
    try {
      const res = await fetch("/api/notifications");
      if (res.ok) setNotifications(await res.json());
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotifications();
    // Poll every 60 seconds
    pollRef.current = setInterval(loadNotifications, 60000);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [loadNotifications]);

  const urgentCount = notifications.filter((n) => n.urgent).length;
  const totalCount = notifications.length;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative flex items-center justify-center w-9 h-9 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] hover:border-[var(--accent)] transition-all"
        aria-label="الإشعارات"
      >
        <Bell className="h-4 w-4 text-primary" />
        {totalCount > 0 && (
          <span className={`absolute -top-1.5 -right-1.5 flex items-center justify-center w-4.5 h-4.5 text-[10px] font-bold text-white rounded-full ${
            urgentCount > 0 ? "bg-red-500" : "bg-emerald"
          }`}>
            {totalCount > 9 ? "⁹⁺" : totalCount}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full mt-2 z-50 w-80 sm:w-96 rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-primary)]">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-primary" />
                <span className="text-sm font-bold text-primary">الإشعارات</span>
                {totalCount > 0 && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    urgentCount > 0 ? "bg-red-500/10 text-red-500" : "bg-emerald-soft text-emerald-dark"
                  }`}>
                    {totalCount}
                  </span>
                )}
              </div>
              <button onClick={() => setOpen(false)} className="text-secondary hover:text-primary transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-5 w-5 text-emerald animate-spin" />
                </div>
              ) : notifications.length === 0 ? (
                <div className="text-center py-8 text-secondary">
                  <Bell className="h-8 w-8 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">لا توجد إشعارات</p>
                </div>
              ) : (
                <div className="divide-y divide-[var(--border-primary)]">
                  {notifications.map((n) => {
                    const Icon = typeIcons[n.type] || Bell;
                    return (
                      <div key={n.id} className={`${n.urgent ? "bg-red-500/5" : ""} transition-colors`}>
                        {n.href ? (
                          <Link
                            href={n.href}
                            onClick={() => setOpen(false)}
                            className="flex items-start gap-3 px-4 py-3 hover:bg-[var(--white-warm)] transition-colors"
                          >
                            <div className={`p-1.5 rounded-lg shrink-0 ${
                              n.urgent ? "bg-red-500/10 text-red-500" : "bg-emerald-soft text-emerald"
                            }`}>
                              <Icon className="h-4 w-4" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-primary">{n.title}</p>
                              <p className="text-xs text-secondary mt-0.5 line-clamp-2">{n.message}</p>
                            </div>
                          </Link>
                        ) : (
                          <div className="flex items-start gap-3 px-4 py-3">
                            <div className={`p-1.5 rounded-lg shrink-0 ${
                              n.urgent ? "bg-red-500/10 text-red-500" : "bg-emerald-soft text-emerald"
                            }`}>
                              <Icon className="h-4 w-4" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-primary">{n.title}</p>
                              <p className="text-xs text-secondary mt-0.5">{n.message}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {notifications.length > 0 && (
              <div className="px-4 py-2.5 border-t border-[var(--border-primary)] text-center flex items-center justify-center gap-3">
                <Link
                  href="/dashboard/employee/notifications"
                  onClick={() => setOpen(false)}
                  className="text-xs text-emerald hover:text-emerald-600 font-medium transition-colors"
                >
                  عرض جميع الإشعارات ←
                </Link>
                <span className="text-muted">|</span>
                <button
                  onClick={() => { setOpen(false); loadNotifications(); }}
                  className="text-xs text-secondary hover:text-primary transition-colors"
                >
                  🔄 تحديث
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}