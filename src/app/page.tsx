import { ArrowRight, BarChart3, Funnel, Radar, Stethoscope, BookOpen, Bot, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="space-y-8 fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Analytics Map
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Diagnóstico inteligente para campanhas de mídia performance
          </p>
        </div>
        <Link
          href="/diagnostico"
          className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-400 transition shadow-lg shadow-cyan-900/40"
        >
          Novo Diagnóstico
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="glass-card p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`icon-box ${stat.color}`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
              <span className="section-label">{stat.label}</span>
            </div>
            <p className="text-2xl font-semibold tracking-tight text-white">
              {stat.value}
            </p>
            <p className="text-xs text-neutral-500 mt-1">{stat.subtext}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-card p-5 sm:p-6">
          <h2 className="text-sm font-semibold text-white mb-4">
            Início Rápido
          </h2>
          <div className="space-y-2">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between rounded-[16px] bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] px-4 py-3 transition"
              >
                <div className="flex items-center gap-3">
                  <div className={`icon-box ${link.color}`}>
                    <link.icon className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {link.label}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {link.description}
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-neutral-500" />
              </Link>
            ))}
          </div>
        </div>

        <div className="glass-card p-5 sm:p-6">
          <h2 className="text-sm font-semibold text-white mb-4">
            Recursos
          </h2>
          <div className="space-y-2">
            {resources.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between rounded-[16px] bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] px-4 py-3 transition"
              >
                <div className="flex items-center gap-3">
                  <div className={`icon-box ${link.color}`}>
                    <link.icon className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {link.label}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {link.description}
                    </p>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-neutral-500" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const stats = [
  {
    label: "Plataformas",
    value: "4",
    subtext: "Google Ads, Meta, TikTok, DV360",
    icon: BarChart3,
    color: "bg-cyan-500 border-cyan-300/70",
  },
  {
    label: "Estratégias",
    value: "4",
    subtext: "Max Conv, tCPA, tROAS, Max Click",
    icon: Funnel,
    color: "bg-purple-500/80 border-purple-300/70",
  },
  {
    label: "Alertas",
    value: "8",
    subtext: "Padrões de diagnóstico",
    icon: Radar,
    color: "bg-amber-500/80 border-amber-300/70",
  },
  {
    label: "Agentes IA",
    value: "Em breve",
    subtext: "DeepSeek V4 Flash",
    icon: Stethoscope,
    color: "bg-emerald-500 border-emerald-300/70",
  },
];

const resources = [
  {
    label: "Regras de Ouro",
    description: "8 princípios fundamentais de mídia performance",
    href: "/regras",
    icon: BookOpen,
    color: "bg-amber-500/80 border-amber-300/70",
  },
  {
    label: "Agente IA",
    description: "Assistentes especializados por plataforma",
    href: "/agente-ia",
    icon: Bot,
    color: "bg-emerald-500 border-emerald-300/70",
  },
];

const quickLinks = [
  {
    label: "Diagnóstico Completo",
    description: "Analise sua campanha passo a passo",
    href: "/diagnostico",
    icon: Stethoscope,
    color: "bg-cyan-500 border-cyan-300/70",
  },
  {
    label: "Funil de Marketing",
    description: "Métricas e correlações por estágio",
    href: "/funil",
    icon: Funnel,
    color: "bg-purple-500/80 border-purple-300/70",
  },
  {
    label: "Radar de Alertas",
    description: "8 padrões de alerta para monitorar",
    href: "/radar",
    icon: Radar,
    color: "bg-amber-500/80 border-amber-300/70",
  },
  {
    label: "Macetes por Plataforma",
    description: "Dicas específicas Google, Meta, TikTok",
    href: "/plataformas",
    icon: BarChart3,
    color: "bg-emerald-500 border-emerald-300/70",
  },
];
