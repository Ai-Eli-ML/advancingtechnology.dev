import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export const metadata: Metadata = {
  title: "AdvancingTechnology.dev - AI Tools Marketplace",
  description: "The flagship hub of the Agentic Ecosystem - a marketplace where developers and clients buy, sell, and collaborate on plug-and-play AI tools.",
  keywords: "AI tools, marketplace, plugins, agentic ecosystem, AI development",
  authors: [{ name: "Sxilent" }],
  creator: "Sxilent",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://advancingtechnology.dev",
    siteName: "AdvancingTechnology.dev",
    title: "AdvancingTechnology.dev - AI Tools Marketplace",
    description: "The flagship hub of the Agentic Ecosystem - a marketplace where developers and clients buy, sell, and collaborate on plug-and-play AI tools.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AdvancingTechnology.dev"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "AdvancingTechnology.dev - AI Tools Marketplace",
    description: "The flagship hub of the Agentic Ecosystem - a marketplace where developers and clients buy, sell, and collaborate on plug-and-play AI tools.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
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
      </body>
    </html>
  );
}