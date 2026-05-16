import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface-mid flex items-center justify-center p-4">
        <div className="shade-card max-w-md w-full p-10 text-center">
          <div className="text-6xl mb-6">🔍</div>
          <h1 className="text-2xl font-bold text-primary mb-2">الصفحة غير موجودة</h1>
          <p className="text-secondary mb-8">عذراً، الصفحة التي تبحث عنها غير متاحة</p>
          <Link href="/" className="btn-primary">
            العودة للرئيسية
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
