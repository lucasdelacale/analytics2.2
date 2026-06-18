import { ChartLine } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#0a0a0b] mt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="inline-flex h-6 w-6 items-center justify-center rounded-[8px] bg-gradient-to-br from-cyan-500 to-cyan-600">
                <ChartLine className="h-3 w-3 text-white" />
              </div>
              <span className="text-sm font-semibold text-white">Analytics Map</span>
            </div>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Plataforma inteligente de diagnóstico e otimização para campanhas
              de marketing digital, mídia performance e growth.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white mb-3">Plataformas</h4>
            <div className="space-y-1.5">
              {["Google Ads", "Meta Ads", "TikTok Ads", "DV360"].map((p) => (
                <p key={p} className="text-xs text-neutral-500">{p}</p>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white mb-3">Recursos</h4>
            <div className="space-y-1.5">
              {[
                { label: "Diagnóstico", href: "/diagnostico" },
                { label: "Funil", href: "/funil" },
                { label: "Radar de Alertas", href: "/radar" },
                { label: "Agente IA", href: "/agente-ia" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-xs text-neutral-500 hover:text-neutral-300 transition"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center justify-between">
          <p className="text-[10px] text-neutral-600">
            Analytics Map · Análise de performance · Uso interno
          </p>
          <p className="text-[10px] text-neutral-600">
            Feito para profissionais de mídia performance
          </p>
        </div>
      </div>
    </footer>
  );
}
