import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/providers/Providers";

export const metadata: Metadata = {
  title: {
    default: "Velara Care — AI-Powered Corporate Health Intelligence",
    template: "%s | Velara Care",
  },
  description:
    "Predict. Prevent. Perform. Velara Care helps companies predict health risks, reduce medical costs, and improve workforce performance through AI-powered preventive wellness.",
  keywords: [
    "corporate wellness",
    "employee health",
    "Saudi wellness platform",
    "predictive health AI",
    "Velara Care",
    "corporate health intelligence",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body><Providers>{children}</Providers></body>
    </html>
  );
}
