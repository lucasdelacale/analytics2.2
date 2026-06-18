import { cn } from "@/lib/utils";

const steps = [
  {
    num: "1",
    label: "Qualidade do tráfego",
    metric: "Engagement rate · Bounce · Tempo",
    desc: "Bounce alto e tempo baixo indicam segmentação errada ou desalinhamento criativo/página.",
    warn: "Engagement rate abaixo de 40% em tráfego pago é alerta.",
    color: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  },
  {
    num: "2",
    label: "Comportamento na LP",
    metric: "Scroll depth · Cliques na CTA",
    desc: "Não rolou = UX. Rolou e não clicou = copy ou oferta. Os dois eventos te dizem onde a LP quebra.",
    warn: null,
    color: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  },
  {
    num: "3",
    label: "Taxa de conversão",
    metric: "Session conv. rate · Por canal",
    desc: "Pago vs. orgânico. Ambos caíram = LP. Só o pago caiu = segmentação.",
    warn: "Queda em todos os canais = LP. Só no pago = segmentação.",
    color: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  },
  {
    num: "4",
    label: "Atribuição vs. plataforma",
    metric: "Source/medium · Por canal",
    desc: "Meta e Google usam modelos favoráveis. GA4 usa último clique. Divergência vs. histórico é o sinal relevante.",
    warn: null,
    color: "bg-green-500/20 text-green-300 border-green-500/30",
  },
];

export default function GA4Page() {
  return (
    <div className="space-y-6 fade-up">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          GA4
        </h1>
        <p className="text-sm text-neutral-400 mt-1">
          Quando o CPA piora sem mudança nas campanhas, o GA4 é onde você
          encontra a resposta real.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((step) => (
          <div key={step.num} className="glass-card p-5 flex flex-col">
            <div
              className={cn(
                "inline-flex h-8 w-8 items-center justify-center rounded-[12px] text-xs font-bold border mb-4",
                step.color
              )}
            >
              {step.num}
            </div>

            <h3 className="text-sm font-semibold text-white mb-1">
              {step.label}
            </h3>

            <div className="text-[10px] font-medium uppercase tracking-[0.1em] text-neutral-500 mb-3">
              {step.metric}
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed flex-1">
              {step.desc}
            </p>

            {step.warn && (
              <div className="mt-3 rounded-[10px] bg-amber-500/10 border border-amber-500/20 px-3 py-2 text-[11px] text-amber-200/80">
                {step.warn}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="glass-card p-6">
        <h3 className="text-sm font-semibold text-white mb-3">
          Diagnóstico Rápido — Sinal → Causa → Ação
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left py-2.5 px-3 text-neutral-400 font-medium">Sinal observado</th>
                <th className="text-left py-2.5 px-3 text-neutral-400 font-medium">Possível causa</th>
                <th className="text-left py-2.5 px-3 text-neutral-400 font-medium">Ação recomendada</th>
                <th className="text-left py-2.5 px-3 text-neutral-400 font-medium">Onde verificar</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                  <td className="py-2.5 px-3 text-white font-medium">{row.signal}</td>
                  <td className="py-2.5 px-3 text-neutral-400">{row.cause}</td>
                  <td className="py-2.5 px-3 text-neutral-300">{row.action}</td>
                  <td className="py-2.5 px-3 text-cyan-300">{row.where}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const rows = [
  { signal: "CPA alto por 1–3 dias", cause: "Oscilação normal", action: "Aguardar. Avaliar em janela de 7 dias.", where: "Google / Meta — visão semanal" },
  { signal: "CPA alto por +10 dias", cause: "Lance, LP ou criativo", action: "Investigar conv. rate no GA4. Se LP ok, revisar assets e lance.", where: "GA4 + plataforma" },
  { signal: "Budget sobrando + CPA ok", cause: "Algoritmo conservador", action: "Aumentar tCPA em 15–20%.", where: "Google PMax / Meta" },
  { signal: "Lost IS rank alto + CPA ok", cause: "Escala desperdiçada", action: "Aumentar tCPA gradualmente.", where: "Google Ads — IS" },
  { signal: "Lost IS budget alto", cause: "Budget insuficiente", action: "Aumentar budget antes de mexer no lance.", where: "Google Ads — IS" },
  { signal: "CTR alto + conversão zero", cause: "Desalinhamento anúncio × LP", action: "Alinhar mensagem criativo com a página.", where: "GA4 + plataforma" },
  { signal: "CPM subindo + CTR caindo", cause: "Fadiga de criativo", action: "Trocar assets. Não mexer em audiência nem verba.", where: "Meta / TikTok" },
  { signal: "Frequência acima de 4x/sem", cause: "Audiência saturada", action: "Ampliar segmentação ou trocar criativo.", where: "Meta Ads" },
  { signal: "VTR abaixo de 25%", cause: "Hook fraco", action: "Testar variações do início do vídeo.", where: "TikTok Ads" },
  { signal: "CPA ok mas ROAS abaixo", cause: "Ticket médio caindo", action: "Verificar mix de produtos. Problema comercial.", where: "GA4 — e-commerce" },
  { signal: "Conv. rate caiu sem mudança", cause: "Problema de LP/oferta", action: "Testar LP manualmente. Checar velocidade e formulário.", where: "GA4 + PageSpeed" },
  { signal: "Campanha em aprendizado", cause: "Volume insuficiente", action: "Consolidar grupos. Meta ~50 conv/7d.", where: "Meta / Google" },
];
