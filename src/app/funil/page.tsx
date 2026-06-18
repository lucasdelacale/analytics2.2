"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StageData {
  id: string;
  name: string;
  objective: string;
  color: string;
  dotColor: string;
  badgeColor: string;
  metrics: { name: string; desc: string }[];
  correlations: {
    google: { signal: string; action: string }[];
    meta: { signal: string; action: string }[];
  };
  signals: {
    label: string;
    text: string;
    type: "ok" | "warn" | "bad";
  }[];
}

const stages: StageData[] = [
  {
    id: "topo",
    name: "Geração de demanda & alcance",
    objective: "Impactar o maior número de pessoas qualificadas ao menor CPM",
    color: "text-funnel-topo",
    dotColor: "bg-funnel-topo",
    badgeColor: "bg-funnel-topo/20 text-funnel-topo border-funnel-topo/30",
    metrics: [
      { name: "Alcance", desc: "Usuários únicos impactados. Queda indica saturação ou budget restritivo. Compare com a janela anterior." },
      { name: "Frequência", desc: "Acima de 3–4x/semana = saturação. Algoritmo paga mais pelas mesmas pessoas. Expandir audiência ou trocar criativo." },
      { name: "CPM", desc: "Custo por mil impressões. Sobe com leilão aquecido, criativo fraco ou audiência concorrida." },
      { name: "VTR", desc: "% que assistiu até o final. Abaixo de 25% nos 3s iniciais = hook fraco. Problema no criativo." },
      { name: "Impression Share", desc: "% do leilão que você ganha. Abaixo de 50% = perda de volume relevante." },
      { name: "Lost IS por Budget", desc: "% perdida por limite de verba. Budget está travando antes do lance ser um problema." },
    ],
    correlations: {
      google: [
        { signal: "CPM subindo + alcance caindo", action: "Audiência saturada. Ampliar segmentação ou excluir conversores." },
        { signal: "IS baixo + Lost IS budget alto", action: "Budget sufocando. Aumentar verba antes de mexer no lance." },
        { signal: "IS baixo + Lost IS rank alto", action: "Lance insuficiente. Aumentar CPM máx ou mudar estratégia." },
        { signal: "Viewability abaixo de 50% (DV360)", action: "Ativar filtros de viewability ou migrar para inventário garantido." },
      ],
      meta: [
        { signal: "Frequência > 3x + CPM subindo", action: "Audiência saturada. Expandir segmentação ou trocar criativo." },
        { signal: "VTR abaixo de 25% (TikTok)", action: "Trocar hook do vídeo. 3s iniciais não estão prendendo." },
        { signal: "Alcance estagnado + frequência subindo", action: "Ampliar audiência ou renovar criativos." },
        { signal: "CPM ok + CTR caindo no Meta", action: "Criativo perdendo tração. Preparar novo asset." },
      ],
    },
    signals: [
      { label: "✓ Saudável", text: "CPM estável, frequência 1.5–3x, alcance crescendo", type: "ok" },
      { label: "⚠ Atenção", text: "Frequência acima de 4x ou CPM subindo +20% sem sazonalidade", type: "warn" },
      { label: "✕ Agir", text: "Alcance estagnado + CPM disparando. Fadiga instalada.", type: "bad" },
    ],
  },
  {
    id: "meio",
    name: "Engajamento & intenção",
    objective: "Qualificar o tráfego. Sinalizar intenção ao algoritmo.",
    color: "text-funnel-meio",
    dotColor: "bg-funnel-meio",
    badgeColor: "bg-funnel-meio/20 text-funnel-meio border-funnel-meio/30",
    metrics: [
      { name: "CTR", desc: "Mede o apelo do anúncio. Abaixo de 1% em display ou 3% em search merece atenção imediata." },
      { name: "CPC", desc: "CPC subindo sem conversão = LP ou tráfego com qualidade baixa. Não mexa no lance antes de investigar." },
      { name: "Taxa de engajamento", desc: "Reações, comentários, shares. Alta taxa sinaliza ao algoritmo que o criativo ressoa e reduz CPM." },
      { name: "Tempo na página (GA4)", desc: "Saída em menos de 15s = usuário não leu a oferta. Problema de LP, segmentação ou desalinhamento." },
      { name: "Scroll depth (GA4)", desc: "Usuário que não rola não chegou à CTA. Problema de UX ou copy do headline da LP." },
      { name: "Engagement Rate (GA4)", desc: "Sessão engajada = +10s ou +1 pageview. Bounce acima de 70% em tráfego pago é alarme." },
    ],
    correlations: {
      google: [
        { signal: "CTR alto + conversão zero", action: "Problema na LP. Alinhar mensagem do criativo com a página." },
        { signal: "CPC alto + CTR baixo", action: "Criativo fraco. Testar novos copies antes de subir lance." },
        { signal: "Tempo na pág < 20s + alto volume", action: "Segmentação errada. Revisar audiência e copy do anúncio." },
        { signal: "Quality Score baixo + CPC alto", action: "Melhorar relevância do anúncio e experiência na LP." },
      ],
      meta: [
        { signal: "CTR alto + conversão zero", action: "Problema na LP. Alinhar mensagem do criativo com a página." },
        { signal: "Engajamento alto no Meta", action: "Reaproveitar em retargeting de fundo de funil." },
        { signal: "Tempo na pág < 20s + tráfego pago", action: "Segmentação errada ou desalinhamento criativo/LP." },
        { signal: "Hook rate baixo no TikTok", action: "Testar 3 variações do início do vídeo." },
      ],
    },
    signals: [
      { label: "✓ Saudável", text: "CTR acima de 2%, bounce abaixo de 50%, tempo médio acima de 45s", type: "ok" },
      { label: "⚠ Atenção", text: "CPC subindo sem ganho de conversão. Investigar LP.", type: "warn" },
      { label: "✕ Agir", text: "CTR alto + conversão zero. Desalinhamento crítico.", type: "bad" },
    ],
  },
  {
    id: "fundo",
    name: "Conversão & performance",
    objective: "É aqui que a meta é batida. CPA e ROAS são o centro.",
    color: "text-funnel-fundo",
    dotColor: "bg-funnel-fundo",
    badgeColor: "bg-funnel-fundo/20 text-funnel-fundo border-funnel-fundo/30",
    metrics: [
      { name: "CPA", desc: "Analisar em janela de 7–14 dias. CPA de um dia isolado é ruído, não sinal." },
      { name: "ROAS", desc: "Retorno sobre gasto. Se abaixo do target em janela, investigar mix, ticket médio ou LP." },
      { name: "tCPA / tROAS", desc: "O sinal que você dá ao algoritmo. Conservador = não escala. Agressivo = CPA estoura. Ajuste em 15–20%." },
      { name: "Lost IS por Rank", desc: "Acima de 40% com CPA ok = deixando escala na mesa. Aumentar tCPA." },
      { name: "Lost IS por Budget", desc: "Budget freando campanha com CPA saudável. Aumentar verba antes do lance." },
      { name: "Volume de conversões", desc: "Mínimo 30–50 conv/mês para PMax operar bem. Abaixo disso o algoritmo não tem dados suficientes." },
    ],
    correlations: {
      google: [
        { signal: "CPA ok + IS baixo + budget sobrando", action: "Algoritmo conservador. Aumentar tCPA em 15–20%." },
        { signal: "CPA alto + Lost IS rank alto", action: "Lance insuficiente. Aumentar tCPA e monitorar 7–10 dias." },
        { signal: "CPA subindo + conv. rate caindo", action: "Problema de LP ou oferta. Não é o anúncio." },
        { signal: "CPA ok mas ROAS abaixo do target", action: "Ticket médio caindo. Verificar mix de produtos." },
      ],
      meta: [
        { signal: "CPA alto + frequência no limite", action: "Problema de audiência. Expandir antes de mexer no lance." },
        { signal: "ROAS abaixo + CPA ok", action: "Ticket médio caindo. Verificar mix de produtos no GA4." },
        { signal: "CPA subindo + conv. rate caindo", action: "Problema de LP ou oferta. Não é o anúncio." },
        { signal: "CPA estável + volume baixo", action: "Aumentar budget gradualmente — há margem para escalar." },
      ],
    },
    signals: [
      { label: "✓ Saudável", text: "CPA abaixo do target em 7d, budget consumindo normalmente", type: "ok" },
      { label: "⚠ Atenção", text: "CPA + ROAS divergentes. Verificar ticket médio e mix de produtos.", type: "warn" },
      { label: "✕ Agir", text: "CPA acima do target por mais de 10 dias consecutivos.", type: "bad" },
    ],
  },
];

function FunnelStageBlock({ stage }: { stage: StageData }) {
  const [open, setOpen] = useState(false);
  const [corrTab, setCorrTab] = useState<"google" | "meta">("google");

  return (
    <div
      className={cn(
        "rounded-[16px] border transition-all duration-200",
        open
          ? "border-cyan-500/30 bg-white/[0.04]"
          : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]"
      )}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-5 py-4 text-left"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className={cn("w-2 h-2 rounded-full shrink-0", stage.dotColor)} />
          <div className="min-w-0">
            <div className="text-sm font-semibold text-white truncate">{stage.name}</div>
            <div className="text-[11px] text-neutral-500 truncate">{stage.objective}</div>
          </div>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-neutral-500 shrink-0 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-5 animate-fadeIn">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {stage.metrics.map((m) => (
              <div key={m.name} className="rounded-[12px] bg-white/[0.03] border border-white/[0.06] p-3">
                <div className="text-xs font-semibold text-white mb-1">{m.name}</div>
                <div className="text-[11px] text-neutral-400 leading-relaxed">{m.desc}</div>
              </div>
            ))}
          </div>

          <div>
            <div className="text-[10px] font-medium uppercase tracking-[0.12em] text-neutral-500 mb-2">
              Correlações → decisão
            </div>
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => setCorrTab("google")}
                className={cn(
                  "rounded-full px-3 py-1 text-[10px] font-medium border transition",
                  corrTab === "google"
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
                    : "bg-white/[0.03] text-neutral-500 border-white/10 hover:text-neutral-300"
                )}
              >
                Google / DV360
              </button>
              <button
                onClick={() => setCorrTab("meta")}
                className={cn(
                  "rounded-full px-3 py-1 text-[10px] font-medium border transition",
                  corrTab === "meta"
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
                    : "bg-white/[0.03] text-neutral-500 border-white/10 hover:text-neutral-300"
                )}
              >
                Meta / TikTok
              </button>
            </div>
            <div className="space-y-1.5">
              {stage.correlations[corrTab].map((c, i) => (
                <div key={i} className="grid grid-cols-[1fr_20px_1fr] gap-2 items-center text-xs">
                  <div className="rounded-[8px] bg-white/[0.03] border border-white/[0.06] px-3 py-2 text-neutral-300 italic">
                    {c.signal}
                  </div>
                  <div className="text-neutral-600 text-center">→</div>
                  <div className="rounded-[8px] bg-cyan-500/10 border border-cyan-500/20 px-3 py-2 text-neutral-200 font-medium">
                    {c.action}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-3 border-t border-white/[0.06]">
            {stage.signals.map((s) => (
              <div
                key={s.label}
                className={cn(
                  "rounded-[12px] p-3 border",
                  s.type === "ok" && "bg-green-500/10 border-green-500/20",
                  s.type === "warn" && "bg-amber-500/10 border-amber-500/20",
                  s.type === "bad" && "bg-red-500/10 border-red-500/20"
                )}
              >
                <div
                  className={cn(
                    "text-[10px] font-bold uppercase tracking-wide mb-1",
                    s.type === "ok" && "text-green-300",
                    s.type === "warn" && "text-amber-300",
                    s.type === "bad" && "text-red-300"
                  )}
                >
                  {s.label}
                </div>
                <div className="text-[11px] text-neutral-400 leading-relaxed">{s.text}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function FunilPage() {
  return (
    <div className="space-y-6 fade-up">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Funil de Marketing
        </h1>
        <p className="text-sm text-neutral-400 mt-1">
          Cada estágio tem um objetivo diferente. Clique em cada etapa para ver
          métricas, correlações e semáforo de saúde.
        </p>
      </div>

      <div className="grid grid-cols-[120px_1fr] gap-0">
        <div className="flex flex-col items-end pr-4 pt-5">
          {[
            { label: "Topo", sub: "Awareness", color: "text-funnel-topo" },
            { label: "Meio", sub: "Consideração", color: "text-funnel-meio" },
            { label: "Fundo", sub: "Conversão", color: "text-funnel-fundo" },
          ].map((item, i) => (
            <div key={item.label} className="flex flex-col items-end">
              <span className={cn("text-lg font-semibold italic", item.color)}>
                {item.label}
              </span>
              <span className="text-[10px] uppercase tracking-[0.08em] text-neutral-500">
                {item.sub}
              </span>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          {stages.map((stage) => (
            <FunnelStageBlock key={stage.id} stage={stage} />
          ))}
        </div>
      </div>
    </div>
  );
}
