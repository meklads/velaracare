"use client";

import { useEffect, useState } from "react";
import { Bell, BellOff, X } from "lucide-react";

/**
 * PWASetup — Registers service worker and manages push notification subscription.
 * Renders a small banner to request notification permission.
 */
export default function PWASetup() {
  const [supported, setSupported] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission | "unavailable">("default");
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if push notifications are supported
    if (!("Notification" in window) || !("serviceWorker" in navigator) || !("PushManager" in window)) {
      setPermission("unavailable");
      return;
    }
    setSupported(true);
    setPermission(Notification.permission);

    // Register service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          console.log("✅ SW registered:", reg.scope);
        })
        .catch((err) => console.warn("⚠️ SW registration failed:", err));
    }
  }, []);

  async function requestPermission() {
    try {
      const result = await Notification.requestPermission();
      setPermission(result);

      if (result === "granted") {
        // Subscribe to push
        const registration = await navigator.serviceWorker.ready;
        // For a full implementation, you'd use VAPID keys:
        // const subscription = await registration.pushManager.subscribe({
        //   userVisibleOnly: true,
        //   applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
        // });
        // await fetch("/api/push", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({ action: "subscribe", subscription }),
        // });

        // Show a welcome notification
        registration.showNotification("مرحباً بك في Velara Care 🎉", {
          body: "سنقوم بإعلامك بمواعيد الاستشارات وتحديثات الوجبات",
          icon: "/icons/icon-192.svg",
          dir: "rtl",
          lang: "ar-SA",
        });
      }
    } catch {}
  }

  if (!supported || permission === "unavailable" || permission === "granted" || dismissed) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 fade-in-up" style={{ direction: "rtl" }}>
      <div className="bg-emerald text-white px-5 py-3 rounded-2xl shadow-2xl shadow-emerald/30 flex items-center gap-3 max-w-sm">
        <Bell className="h-5 w-5 shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold">تفعيل الإشعارات</p>
          <p className="text-xs text-white/70">لتصلك تنبيهات الاستشارات والوجبات</p>
        </div>
        <button
          onClick={requestPermission}
          className="text-xs py-1.5 px-4 rounded-lg bg-white/20 hover:bg-white/30 transition-all font-medium shrink-0"
        >
          تفعيل
        </button>
        <button
          onClick={() => setDismissed(true)}
          className="p-1 rounded-lg hover:bg-white/10 transition-all shrink-0"
          aria-label="إغلاق"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

/**
 * Convert a base64-encoded string to a Uint8Array for VAPID key usage.
 * Keep this for when VAPID is configured.
 */
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
