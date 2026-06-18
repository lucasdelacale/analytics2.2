"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface Macete {
  tag: string;
  tagColor: string;
  title: string;
  body: string;
}

const platformData: Record<string, { id: string; name: string; macetes: Macete[] }> = {
  google: {
    id: "google", name: "Google Ads",
    macetes: [
      { tag: "IS Diagnóstico", tagColor: "text-cyan-400", title: "Lost IS: budget vs. rank", body: 'Se <code>Lost IS budget</code> alto → aumentar verba. Se <code>Lost IS rank</code> alto → lance ou QS baixo. Os dois juntos dão o diagnóstico completo.' },
      { tag: "PMax · Escala", tagColor: "text-green-400", title: "CPA real abaixo do tCPA = oportunidade", body: 'Algoritmo conservador com margem. Aumentar tCPA em <code>15–20%</code> para forçar escala sem risco imediato de estourar o objetivo.' },
      { tag: "PMax · Aprendizado", tagColor: "text-red-400", title: "Mínimo 30–50 conversões/mês", body: 'Aguarde <code>7–10 dias</code> após qualquer alteração de lance antes de agir novamente. Intervenções precoces prolongam a instabilidade.' },
      { tag: "Search", tagColor: "text-cyan-400", title: "Quality Score como alavanca oculta", body: "QS alto = paga menos por leilão. Checar relevância do anúncio, CTR esperado e experiência na LP. QS baixo = desvantagem de preço mesmo com lance alto." },
      { tag: "Assets", tagColor: "text-blue-400", title: "Assets fracos limitam o teto", body: 'Assets com "Baixo desempenho" puxam a média para baixo. Trocar antes de ajustar lances. Criativo é o chão do algoritmo.' },
      { tag: "Incrementos", tagColor: "text-green-400", title: "Regra dos 20%", body: 'Alterações acima de <code>20%</code> por vez no tCPA/tROAS forçam re-aprendizado. Incrementos menores movem o algoritmo sem instabilidade.' },
    ],
  },
  meta: {
    id: "meta", name: "Meta Ads",
    macetes: [
      { tag: "Fadiga", tagColor: "text-red-400", title: "CPM subindo + CTR caindo", body: "Criativo em fadiga. Trocar o asset antes de mexer em verba ou público. Essa sequência é quase invariável." },
      { tag: "Frequência", tagColor: "text-cyan-400", title: "Acima de 4x/semana = problema", body: "Audiência esgotada. Ampliar segmentação, excluir conversores recentes ou ativar Advantage+ Audience para expandir automaticamente." },
      { tag: "Advantage+", tagColor: "text-green-400", title: "Menos restrição = mais espaço", body: "Advantage+ Shopping geralmente vence audiências manuais em contas com bom volume de conversão. Menos limitações = mais espaço pro algoritmo." },
      { tag: "Criativo", tagColor: "text-blue-400", title: "Engajamento como proxy de qualidade", body: "Alto compartilhamento = distribuição orgânica extra. Use em retargeting e dark posts. Alto engajamento → CPM cai naturalmente." },
      { tag: "Atribuição", tagColor: "text-cyan-400", title: "7d click + 1d view", body: "Meta pode inflar conversões vs. GA4. A diferença é normal — monitore a evolução histórica, não o número absoluto." },
      { tag: "Aprendizado", tagColor: "text-red-400", title: "~50 resultados em 7 dias", body: "Qualquer alteração significativa reinicia o aprendizado. Evite editar campanhas em fase de aprendizagem." },
    ],
  },
  tiktok: {
    id: "tiktok", name: "TikTok Ads",
    macetes: [
      { tag: "Hook", tagColor: "text-blue-400", title: "Os primeiros 3 segundos definem tudo", body: 'VTR abaixo de <code>25% nos 3s</code> = hook fraco. TikTok pune criativos que não prendem com CPM mais alto. Teste o início antes de qualquer outra mudança.' },
      { tag: "Métricas nativas", tagColor: "text-cyan-400", title: "VTR · 6s view rate · anchor rate", body: '<code>VTR</code> = assistiu completo. <code>6s view rate</code> = passou do gancho. <code>Anchor rate</code> = clicou. Os três juntos mostram exatamente onde o vídeo perde o usuário.' },
      { tag: "Escala", tagColor: "text-green-400", title: "Criativo novo supera ajuste de lance", body: "CPA alto no TikTok quase sempre se resolve com novos vídeos. Planeje ao menos 2 novos criativos por semana em contas ativas." },
      { tag: "Saturação", tagColor: "text-red-400", title: "Ciclo de vida: 7–14 dias", body: "Criativos saturam rápido com volume alto. CPM subindo + CTR caindo = trocar o ativo, não o público nem o lance." },
    ],
  },
  dv360: {
    id: "dv360", name: "DV360",
    macetes: [
      { tag: "Inventário", tagColor: "text-cyan-400", title: "Open Auction vs. PMP", body: "Open Auction entrega volume. PMP entrega qualidade e contexto premium. CPM alto sem resultado = comparar desempenho entre os dois tipos." },
      { tag: "Frequência", tagColor: "text-green-400", title: "Controle por dispositivo", body: "DV360 permite frequência por dispositivo. Em awareness, limite <code>3–5 impressões/semana</code> por usuário." },
      { tag: "Viewability", tagColor: "text-blue-400", title: "Abaixo de 50% = alerta", body: "Metade das impressões não vistas. Ative filtros de viewability e prefira inventário garantido acima de 70%." },
      { tag: "Brand safety", tagColor: "text-red-400", title: "Exclusões são obrigatórias", body: "Open Auction pode entregar em inventário inadequado sem exclusões. Configure listas negativas e revise placements mensalmente." },
    ],
  },
};

export default function PlataformasPage() {
  const [active, setActive] = useState("google");
  const current = platformData[active];

  return (
    <div className="space-y-6 fade-up">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Macetes por Plataforma
        </h1>
        <p className="text-sm text-neutral-400 mt-1">
          Dicas específicas de diagnóstico, escala, criativo e alertas para cada
          plataforma
        </p>
      </div>

      <div className="flex gap-1 border-b border-white/[0.06] overflow-x-auto">
        {Object.values(platformData).map((p) => (
          <button
            key={p.id}
            onClick={() => setActive(p.id)}
            className={cn(
              "px-4 py-2.5 text-xs font-medium border-b-2 transition whitespace-nowrap",
              active === p.id
                ? "text-cyan-300 border-cyan-500"
                : "text-neutral-500 border-transparent hover:text-neutral-300"
            )}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {current.macetes.map((macete, i) => (
          <div
            key={i}
            className="rounded-[16px] border border-l-[3px] border-white/[0.06] bg-white/[0.02] p-4 hover:bg-white/[0.04] transition"
            style={{ borderLeftColor: "rgba(6,182,212,0.3)" }}
          >
            <div className={cn("text-[10px] font-bold uppercase tracking-[0.12em] mb-2", macete.tagColor)}>
              {macete.tag}
            </div>
            <div className="text-sm font-semibold text-white mb-2">
              {macete.title}
            </div>
            <div
              className="text-xs text-neutral-400 leading-relaxed [&_code]:text-[10px] [&_code]:bg-white/10 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-cyan-300"
              dangerouslySetInnerHTML={{ __html: macete.body }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
