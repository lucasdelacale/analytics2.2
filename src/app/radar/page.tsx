"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface Alert {
  severity: "red" | "amber" | "purple" | "green";
  severityLabel: string;
  title: string;
  signal: string;
  body: string;
  checks: string[];
}

const alerts: Alert[] = [
  {
    severity: "red", severityLabel: "Urgente",
    title: "CPA disparando sem mudança na campanha",
    signal: "CPA alto por 7d+ · Conv. rate caindo · Budget consumindo",
    body: "Se o anúncio não mudou, o problema é externo. LP com erro técnico, oferta desatualizada ou concorrência nova. Nunca mexa no lance como primeiro passo.",
    checks: ["Checar conv. rate no GA4 por canal (fonte/meio)", "Testar a LP manualmente — velocidade, formulário, preço", "Comparar com janela equivalente do mês anterior"],
  },
  {
    severity: "red", severityLabel: "Urgente",
    title: "CTR alto com conversão próxima de zero",
    signal: "CTR alto · Conversão ~0 · Bounce alto · Budget consumindo",
    body: "O anúncio vende bem a promessa, mas a LP não entrega. Um dos erros mais caros: gasto em cliques que não convertem. Funil quebra entre o clique e a página.",
    checks: ["Mensagem do anúncio bate com o headline da LP?", "LP carrega em menos de 3s no mobile?", "Formulário ou botão de compra funcionando?"],
  },
  {
    severity: "amber", severityLabel: "Atenção",
    title: "Criativo em fadiga",
    signal: "CPM subindo · CTR caindo · Frequência alta",
    body: "A plataforma continua entregando, mas o usuário já viu esse anúncio muitas vezes e está ignorando. Custo sobe, resultado cai. Alavanca: criativo, não lance.",
    checks: ["Frequência acima de 3.5x/sem no Meta?", "CTR caiu mais de 30% vs. semana 1 do criativo?", "Testar novo hook antes de qualquer ajuste de lance"],
  },
  {
    severity: "amber", severityLabel: "Atenção",
    title: "Perda de IS por rank com budget disponível",
    signal: "IS baixo · Lost IS rank alto · Budget não esgotado",
    body: "A campanha tem verba mas perde leilões por competitividade. Lance ou QS está abaixo do necessário. Disponibilidade de budget não é o problema.",
    checks: ["Lost IS por rank acima de 40%?", "Quality Score dos anúncios principais", "Considerar aumento de tCPA ou revisão de assets"],
  },
  {
    severity: "amber", severityLabel: "Atenção",
    title: "ROAS abaixo com CPA dentro da meta",
    signal: "CPA ok · ROAS abaixo do target",
    body: "Custo por conversão controlado, mas retorno em receita está baixo. Geralmente indica que produtos de menor ticket estão convertendo mais. Problema comercial, não de mídia.",
    checks: ["Quais produtos/SKUs estão convertendo no GA4?", "Ticket médio caiu vs. período anterior?", "Segmentar por produto com tROAS específico"],
  },
  {
    severity: "purple", severityLabel: "Monitorar",
    title: "Campanha travada no aprendizado",
    signal: 'Status "Aprendizagem" persistente · Volume de conv. baixo',
    body: "Meta e Google precisam de volume mínimo de conversões para sair do aprendizado. Edições frequentes reiniciam o ciclo. Consolide grupos, evite edições.",
    checks: ["Meta: menos de 50 resultados em 7 dias?", "PMax: menos de 30 conv. no mês?", "Consolidar ad sets similares em um só"],
  },
  {
    severity: "purple", severityLabel: "Monitorar",
    title: "Budget consumindo muito rápido",
    signal: "Budget esgotado antes do fim do dia · CPA alto",
    body: "Lance agressivo demais para o budget disponível. O algoritmo gasta rápido nos melhores horários mas perde os leilões mais baratos por falta de verba.",
    checks: ["Horário em que o budget se esgota?", "Reduzir tCPA em 10–15% ou limitar por horário", "Avaliar aumento de budget se CPA está dentro do target"],
  },
  {
    severity: "green", severityLabel: "Oportunidade",
    title: "Campanha com espaço de escala identificado",
    signal: "CPA abaixo de 70% da meta · IS baixo · Budget sobrando",
    body: "Três sinais positivos juntos: eficiência alta, baixa participação no leilão e verba disponível. Oportunidade de escala que está sendo ignorada.",
    checks: ["Aumentar tCPA em até 20% do target atual", "Monitorar IS e conversões por 7 dias após ajuste", "Se CPA se mantiver: novo incremento de 15–20%"],
  },
];

const filters = [
  { key: "all", label: "Todos" },
  { key: "red", label: "🔴 Urgente" },
  { key: "amber", label: "🟡 Atenção" },
  { key: "purple", label: "🟣 Monitorar" },
  { key: "green", label: "🟢 Oportunidade" },
] as const;

export default function RadarPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = activeFilter === "all"
    ? alerts
    : alerts.filter((a) => a.severity === activeFilter);

  return (
    <div className="space-y-6 fade-up">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Radar de Alertas
        </h1>
        <p className="text-sm text-neutral-400 mt-1">
          Padrões que sinalizam campanhas que precisam de otimização. Filtre por
          urgência para focar no que importa agora.
        </p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-xs font-medium border transition",
              activeFilter === f.key
                ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
                : "bg-white/[0.03] text-neutral-500 border-white/10 hover:text-neutral-300"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((alert, i) => (
          <AlertCard key={i} alert={alert} />
        ))}
      </div>
    </div>
  );
}

function AlertCard({ alert }: { alert: Alert }) {
  const [expanded, setExpanded] = useState(false);

  const severityStyles = {
    red: "border-l-red-500 bg-red-500/[0.04]",
    amber: "border-l-amber-500 bg-amber-500/[0.04]",
    purple: "border-l-purple-500 bg-purple-500/[0.04]",
    green: "border-l-green-500 bg-green-500/[0.04]",
  };

  const badgeStyles = {
    red: "bg-red-500/20 text-red-300 border-red-500/30",
    amber: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    purple: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    green: "bg-green-500/20 text-green-300 border-green-500/30",
  };

  return (
    <div
      className={cn(
        "rounded-[16px] border border-l-[3px] border-white/[0.06] p-4 sm:p-5 transition-all duration-200",
        severityStyles[alert.severity],
        expanded ? "shadow-lg" : "hover:bg-white/[0.02]"
      )}
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          className={cn(
            "inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium border",
            badgeStyles[alert.severity]
          )}
        >
          {alert.severityLabel}
        </span>
      </div>

      <h3 className="text-sm font-semibold text-white mb-1.5">{alert.title}</h3>
      <p className="text-[11px] text-neutral-500 mb-3">{alert.signal}</p>

      <p className="text-xs text-neutral-400 leading-relaxed mb-3">{alert.body}</p>

      <button
        onClick={() => setExpanded(!expanded)}
        className={cn(
          "text-[11px] font-medium transition",
          expanded ? "text-cyan-400" : "text-neutral-500 hover:text-neutral-300"
        )}
      >
        {expanded ? "− Esconder checklist" : "+ Mostrar checklist"}
      </button>

      {expanded && (
        <div className="mt-3 space-y-1.5 animate-fadeIn">
          {alert.checks.map((check, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-neutral-300">
              <span className="text-cyan-400 mt-0.5">→</span>
              <span>{check}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
