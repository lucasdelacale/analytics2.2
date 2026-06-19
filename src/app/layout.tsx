import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Analytics Map — Diagnóstico de Mídia Performance",
  description:
    "Plataforma inteligente de diagnóstico e otimização para campanhas de marketing digital, mídia performance e growth.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Analytics Map — Diagnóstico de Mídia Performance",
    description:
      "Plataforma inteligente de diagnóstico e otimização para campanhas de marketing digital, mídia performance e growth.",
    type: "website",
    siteName: "Analytics Map",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Analytics Map — Diagnóstico de Mídia Performance",
    description:
      "Plataforma inteligente de diagnóstico e otimização para campanhas de marketing digital, mídia performance e growth.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="min-h-screen bg-[#0a0a0b] text-white antialiased">
        <div className="fixed top-0 w-full h-screen -z-10 saturate-50 pointer-events-none"
          style={{
            maskImage: "linear-gradient(to bottom, transparent, black 0%, black 80%, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent, black 0%, black 80%, transparent)"
          }}
        >
          <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_top,_rgba(6,182,212,0.15)_0%,_transparent_60%)]" />
        </div>
        <div className="min-h-screen flex flex-col">
          <Header />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 ml-0 lg:ml-64 transition-all duration-300">
              <div className="mx-auto max-w-7xl">
                {children}
              </div>
            </main>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
