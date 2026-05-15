/**
 * Admin dashboard — pure server component.
 * Returns ONLY plain HTML, zero dependencies.
 */
export default function AdminDashboard() {
  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#e8f5e9",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      fontFamily: "system-ui, sans-serif",
    }}>
      <h1 style={{
        fontSize: "28px",
        fontWeight: 700,
        color: "#0F7B5A",
        marginBottom: "12px",
      }}>
        ✓ لوحة تحكم HR
      </h1>
      <p style={{ color: "#475569", fontSize: "16px" }}>
        الصفحة اشتغلت!
      </p>
    </div>
  );
}
