"use client";

import { ChartLine, Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", href: "/" },
  { label: "Diagnóstico", href: "/diagnostico" },
  { label: "Funil", href: "/funil" },
  { label: "Radar", href: "/radar" },
  { label: "Plataformas", href: "/plataformas" },
  { label: "GA4", href: "/ga4" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0b]/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-8 w-8 items-center justify-center rounded-[12px] bg-gradient-to-br from-cyan-500 to-cyan-600 shadow-lg shadow-cyan-900/40">
              <ChartLine className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-semibold tracking-tight text-white">
              Analytics Map
            </span>
          </div>

          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-neutral-400 hover:text-white transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 border border-white/20"
          >
            {mobileOpen ? (
              <X className="h-4 w-4 text-neutral-300" />
            ) : (
              <Menu className="h-4 w-4 text-neutral-300" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="lg:hidden border-t border-white/10 px-4 py-3 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block text-sm text-neutral-400 hover:text-white transition-colors py-1.5"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
