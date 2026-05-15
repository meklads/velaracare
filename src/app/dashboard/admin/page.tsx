import Link from "next/link";

/**
 * Admin dashboard — pure server component (no "use client").
 * Renders static HTML directly; no JS needed to see the content.
 * This isolates the white-screen issue: if content appears, the
 * problem was in the JS/CSS chunk loading.
 */
export default function AdminDashboard() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
        paddingTop: "96px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "32px 24px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "32px", fontWeight: 700, color: "#0F172A", marginBottom: "16px" }}>
          ✓ لوحة تحكم الموارد البشرية
        </h1>
        <p style={{ color: "#475569", fontSize: "18px", marginBottom: "32px" }}>
          تم تحميل الصفحة بنجاح
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
          <Link
            href="/dashboard/admin/reports"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              background: "#0F7B5A",
              color: "#fff",
              borderRadius: "999px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            ← التقارير
          </Link>
          <Link
            href="/dashboard/admin/meals"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              border: "1.5px solid #DEE2E6",
              color: "#0F172A",
              borderRadius: "999px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            الوجبات →
          </Link>
        </div>
      </div>
    </main>
  );
}
