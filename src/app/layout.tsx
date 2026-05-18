import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/providers/Providers";
import PWASetup from "@/components/PWASetup";

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
  manifest: "/manifest.json",
  other: {
    "theme-color": "#0a0a1a",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Velara Care",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0a0a1a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Velara Care" />
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
      <body><Providers>{children}</Providers><PWASetup /></body>
    </html>
  );
}
