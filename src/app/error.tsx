"use client";

import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface-mid flex items-center justify-center p-4">
        <div className="shade-card max-w-md w-full p-10 text-center">
          <div className="text-6xl mb-6">⚠️</div>
          <h1 className="text-2xl font-bold text-primary mb-2">حدث خطأ غير متوقع</h1>
          <p className="text-secondary mb-8">عذراً، حدث خطأ أثناء تحميل الصفحة. حاول مرة أخرى.</p>
          <button onClick={reset} className="btn-primary">
            إعادة المحاولة
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}
