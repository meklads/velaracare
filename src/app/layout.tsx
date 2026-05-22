import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/providers/Providers";
import PWASetup from "@/components/PWASetup";

export const metadata: Metadata = {
  title: {
    default: "Velara Care — Workforce Wellness Platform for Enterprises",
    template: "%s | Velara Care",
  },
  description:
    "Velara Care is an enterprise wellness platform. Manage employee wellness programs, track participation, improve wellbeing, and measure impact on productivity and retention. Built for HR teams.",
  keywords: [
    "workplace wellness",
    "employee wellbeing",
    "corporate wellness platform",
    "HR technology",
    "wellness program management",
    "employee engagement",
    "workforce wellness",
    "Velara Care",
    "B2B wellness Saudi",
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
