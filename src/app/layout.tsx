import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" }
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://advancingtechnology.dev"),
  title: "Advancing Technology — Contractor Portal",
  description: "Task management, daily reporting, and collaboration for Advancing Technology contractors.",
  keywords: "contractor portal, task management, advancing technology",
  authors: [{ name: "Advancing Technology LLC" }],
  creator: "Advancing Technology LLC",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://advancingtechnology.dev",
    siteName: "AT Contractor Portal",
    title: "Advancing Technology — Contractor Portal",
    description: "Task management, daily reporting, and collaboration for Advancing Technology contractors.",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen bg-background antialiased">
        <ErrorBoundary>
          <ThemeProvider>
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            }>
              <AuthProvider>
                {children}
              </AuthProvider>
            </Suspense>
          </ThemeProvider>
        </ErrorBoundary>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}