export default function TestPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "#f0fdf4",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "32px", fontWeight: 700, color: "#0F7B5A", marginBottom: "12px" }}>
        ✅ Test Page
      </h1>
      <p style={{ color: "#475569", fontSize: "16px" }}>
        If you can see this, the server is serving HTML correctly.
      </p>
    </div>
  );
}
