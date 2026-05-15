"use client";

import { useEffect } from "react";

/**
 * Minimal admin dashboard — no Header / Footer / icons to isolate
 * the white-screen problem.
 */
export default function AdminDashboard() {
  useEffect(() => {
    document.title = "لوحة تحكم HR | Velara Care";
  }, []);

  return (
    <main className="min-h-screen bg-surface-mid pt-24">
      <div className="container-shade py-8 text-center">
        <h1 className="text-3xl font-bold text-primary mb-4">
          ✓ لوحة تحكم الموارد البشرية
        </h1>
        <p className="text-secondary">تم تحميل الصفحة بنجاح</p>
      </div>
    </main>
  );
}
