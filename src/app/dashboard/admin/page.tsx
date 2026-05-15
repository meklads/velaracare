import { cookies } from "next/headers";

/**
 * Admin dashboard — pure server component.
 * BUILD_ID will change every deployment to bust cache.
 * Includes diagnostics so we can see what the server receives.
 */
export default async function AdminDashboard() {
  const jar = await cookies();
  const allCookies = jar.getAll();

  const nextauthCookie = allCookies.find(c => c.name.includes("next-auth"));

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#e8f5e9",
      padding: "40px",
      fontFamily: "system-ui, sans-serif",
      direction: "rtl",
    }}>
      <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#0F7B5A" }}>
        ✓ لوحة تحكم HR
      </h1>
      <p style={{ color: "#475569", fontSize: "16px" }}>
        الصفحة اشتغلت!
      </p>
      <hr style={{ margin: "24px 0" }} />
      <h2 style={{ fontSize: "16px", fontWeight: 600 }}>Diagnostics</h2>
      <pre style={{
        background: "#f8f9fa",
        padding: "16px",
        borderRadius: "8px",
        fontSize: "12px",
        direction: "ltr",
        textAlign: "left",
        overflowX: "auto",
      }}>
{JSON.stringify({
  cookies: allCookies.length,
  nextauth_cookie: nextauthCookie ? {
    name: nextauthCookie.name,
    value: nextauthCookie.value.slice(0, 30) + "...",
  } : "not found",
  date: new Date().toISOString(),
}, null, 2)}
      </pre>
      <p style={{ color: "#94A3B8", fontSize: "12px", marginTop: "8px" }}>
        build: 2026-05-15T18
      </p>
    </div>
  );
}
