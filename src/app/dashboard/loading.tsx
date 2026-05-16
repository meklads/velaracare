export default function DashboardLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-mid">
      <div className="text-center">
        <div className="w-12 h-12 rounded-full border-4 border-emerald/30 border-t-emerald animate-spin mx-auto mb-4" />
        <p className="text-sm text-secondary">جاري تحميل لوحة التحكم...</p>
      </div>
    </div>
  );
}
