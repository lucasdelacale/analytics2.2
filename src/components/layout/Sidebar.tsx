"use client";

import {
  LayoutDashboard,
  Stethoscope,
  Funnel,
  Radar,
  Monitor,
  ChartArea,
  BookOpen,
  Bot,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Diagnóstico", href: "/diagnostico", icon: Stethoscope },
  { label: "Funil", href: "/funil", icon: Funnel },
  { label: "Radar de Alertas", href: "/radar", icon: Radar },
  { label: "Plataformas", href: "/plataformas", icon: Monitor },
  { label: "GA4", href: "/ga4", icon: ChartArea },
  { label: "Agente IA", href: "/agente-ia", icon: Bot },
  { label: "Regras de Ouro", href: "/regras", icon: BookOpen },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="hidden lg:flex fixed left-0 top-14 bottom-0 w-64 flex-col border-r border-white/10 bg-[#0a0a0b]/60 backdrop-blur-xl p-4"
      aria-label="Navegação principal"
    >
      <nav className="flex-1 space-y-1">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`flex items-center gap-3 rounded-[12px] px-3 py-2.5 text-sm transition-all duration-200 focus-visible:outline-2 focus-visible:outline-cyan-500 focus-visible:outline-offset-2 ${
                isActive
                  ? "bg-white/10 text-white font-medium"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="pt-4 border-t border-white/10">
        <Link
          href="/agente-ia"
          className="block glass-card-sm p-3 hover:bg-white/[0.06] transition focus-visible:outline-2 focus-visible:outline-cyan-500"
        >
          <p className="text-[11px] text-neutral-500 mb-1">DeepSeek V4 Flash</p>
          <p className="text-xs text-cyan-400">Conheça os agentes IA →</p>
        </Link>
      </div>
    </aside>
  );
}
