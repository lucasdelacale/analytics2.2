import type { MetricGuideEntry } from "../types";

export const METRIC_GUIDE_DATA: MetricGuideEntry[] = [
  {
    key: "cpa",
    label: "CPA",
    description:
      "Custo por Aquisição — valor médio pago por cada conversão gerada. É a métrica central de eficiência em campanhas de performance. Sempre avalie em janela de 7 a 14 dias, nunca por dia isolado.",
    healthyRange: "70–100% do tCPA definido. Abaixo de 70% = oportunidade de escala.",
    warningSigns: [
      "Disparou por 7+ dias consecutivos sem mudança na campanha → problema externo (LP, concorrência, sazonalidade)",
      "CPA caindo + volume caindo → algoritmo conservador, há margem para escala",
      "CPA estável + volume baixo → aumentar budget gradualmente",
    ],
    whatToDo:
      "Antes de mexer no lance, investigue a conversão rate no GA4. Se a LP está convertendo menos, o problema não é de mídia. Compare também com o período anterior para identificar sazonalidade.",
    correlations: [
      "CPA ok + IS baixo = algoritmo conservador. Aumentar tCPA em 15–20%.",
      "CPA ok + ROAS baixo = ticket médio caindo. Problema comercial, não de mídia.",
      "CPA alto + IS alto = problema de LP/oferta. Não mexer no lance.",
      "CPA alto + frequência no limite (Meta) = audiência saturada. Expandir segmentação.",
    ],
    platforms: ["google", "meta", "tiktok"],
    funnelStages: ["fundo"],
  },
  {
    key: "cpm",
    label: "CPM",
    description:
      "Custo por Mil Impressões — mede o custo de alcance. Sobe com leilão aquecido, criativo fraco, audiência concorrida ou público muito segmentado. É a métrica principal de eficiência no topo do funil.",
    healthyRange: "Varia por plataforma e época. Meta: R$ 8–25. TikTok: R$ 5–15. Google Display: R$ 10–30.",
    warningSigns: [
      "CPM subindo + CTR caindo = fadiga de criativo (padrão clássico)",
      "CPM subindo sem perda de CTR = leilão mais competitivo (sazonalidade ou concorrência)",
      "CPM muito baixo + conversão zero = tráfego de baixa qualidade",
    ],
    whatToDo:
      "Se CPM estiver subindo junto com CTR caindo, troque o criativo — não mexa em audiência nem verba. Se só o CPM subiu, pode ser sazonalidade; aguarde 7 dias antes de agir.",
    correlations: [
      "CPM alto + CTR alto = criativo bom em leilão caro. Expandir público.",
      "CPM alto + CTR baixo = criativo em fadiga. Trocar asset imediatamente.",
      "CPM subindo + frequência subindo = audiência saturada (Meta/TikTok).",
    ],
    platforms: ["google", "meta", "tiktok", "dv360"],
    funnelStages: ["topo", "meio"],
  },
  {
    key: "is",
    label: "Lost IS (Impression Share)",
    description:
      "Percentual de impressões que você perdeu no leilão. Divide-se em Lost IS por Rank (lance/QS baixo) e Lost IS por Budget (verba insuficiente). Essencial para diagnóstico de escala no Google Ads e DV360.",
    healthyRange: "Lost IS total abaixo de 40%. Acima disso, há espaço de escala sendo desperdiçado.",
    warningSigns: [
      "Lost IS por Rank > 40% com CPA ok = escala desperdiçada. Aumentar tCPA.",
      "Lost IS por Budget alto = campanha com verba insuficiente. Aumentar budget antes do lance.",
      "Lost IS baixo mas CPA alto = problema não é de leilão. Investigar LP/criativo.",
    ],
    whatToDo:
      "Abra o relatório de IS na plataforma. Se Lost IS por Rank for maior que por Budget, aumente lance. Se for o contrário, aumente budget. Nunca ajuste os dois ao mesmo tempo.",
    correlations: [
      "IS baixo + Lost Rank alto + CPA ok = aumentar tCPA 15-20%.",
      "IS baixo + Lost Budget alto + CPA ok = aumentar budget.",
      "IS baixo + Lost Rank alto + CPA alto = revisar QS e assets antes do lance.",
    ],
    platforms: ["google", "dv360"],
    funnelStages: ["topo", "meio", "fundo"],
  },
  {
    key: "ctr",
    label: "CTR (Click-Through Rate)",
    description:
      "Taxa de cliques — percentual de pessoas que viram o anúncio e clicaram. Mede o apelo do criativo. Varia muito por formato e plataforma. Queda contínua indica fadiga ou perda de relevância.",
    healthyRange: "Search: 3–6% | Display: 0.5–1% | Meta Feed: 1–3% | TikTok: 0.5–2%.",
    warningSigns: [
      "CTR caindo + CPM subindo = fadiga de criativo instalada",
      "CTR alto + conversão zero = desalinhamento entre anúncio e LP",
      "CTR muito baixo desde o início = criativo ou segmentação errada",
    ],
    whatToDo:
      "CTR alto com conversão baixa é o erro mais comum e mais caro: o anúncio vende bem, mas a LP não entrega. Corrija a página antes de mexer na campanha. CTR baixo desde o início = revise criativo e segmentação.",
    correlations: [
      "CTR alto + conversão zero = desalinhamento anúncio × LP.",
      "CTR baixo + CPC alto = criativo fraco. Testar novos copies.",
      "CTR alto + CPA ok = criativo saudável. Escalar com cautela.",
    ],
    platforms: ["google", "meta", "tiktok", "dv360"],
    funnelStages: ["meio", "fundo"],
  },
  {
    key: "bdg",
    label: "Budget / Gasto",
    description:
      "Relação entre o budget disponível e o gasto real. Se o budget não está sendo consumido, o algoritmo pode estar limitado por lance ou audiência. Se termina antes do fim do dia, o lance pode estar agressivo demais.",
    healthyRange:
      "Budget consumindo entre 80-100% ao final do dia. Muito abaixo = conservador demais. Muito acima antes do fim do dia = agressivo.",
    warningSigns: [
      "Budget não consumindo + CPA ok = algoritmo conservador. Aumentar lance.",
      "Budget acabando muito cedo + CPA alto = lance agressivo. Reduzir ou limitar por horário.",
      "Budget não consumindo + CPA alto = segmentação ou criativo com problema.",
    ],
    whatToDo:
      "Se o budget sobra consistentemente, aumente o lance gradualmente. Se acaba muito rápido com CPA alto, reduza o lance ou o budget. Acompanhe por 5-7 dias após cada ajuste.",
    correlations: [
      "Budget sobrando + CPA ok = oportunidade de escala.",
      "Budget acabando cedo + CPA alto = reduzir lance 10-15%.",
      "Budget sobrando + IS baixo = verificar Lost IS por Rank.",
    ],
    platforms: ["google", "meta", "tiktok", "dv360"],
    funnelStages: ["topo", "meio", "fundo"],
  },
  {
    key: "freq",
    label: "Frequência",
    description:
      "Número médio de vezes que cada usuário viu seu anúncio. Essencial para Meta e TikTok. Frequência alta = audiência saturada, CPM sobe, CTR cai. Frequência baixa demais = audiência pode ser pequena.",
    healthyRange: "Meta: 1.5–3.5x/semana. TikTok: 1–3x/semana. Acima de 4x = alerta.",
    warningSigns: [
      "Frequência acima de 4x/sem + CPM subindo = saturação instalada",
      "Frequência abaixo de 1x + CPA alto = audiência muito pequena",
      "Frequência subindo + CTR caindo = fadiga iminente",
    ],
    whatToDo:
      "Frequência acima de 4x: expanda a audiência, exclua conversores recentes ou troque o criativo. Frequência muito baixa com CPA alto: a audiência pode ser pequena demais para o algoritmo otimizar.",
    correlations: [
      "Frequência > 4x + CPM subindo = audiência saturada. Expandir.",
      "Frequência > 4x + CPA alto = lotação no funil. Pausar e renovar.",
      "Frequência baixa + CPA ok = há espaço para escalar.",
    ],
    platforms: ["meta", "tiktok"],
    funnelStages: ["topo", "meio"],
  },
  {
    key: "roas",
    label: "ROAS (Return on Ad Spend)",
    description:
      "Retorno sobre o gasto em anúncios — receita gerada dividida pelo investimento. Métrica principal para campanhas de e-commerce e lead gen com ticket conhecido. Varia muito por margem e setor.",
    healthyRange: "Depende da margem. Geral: 4×+ = excelente, 2–4× = bom, 1–2× = atenção, <1× = prejuízo.",
    warningSigns: [
      "ROAS abaixo do target + CPA ok = ticket médio caindo. Problema comercial.",
      "ROAS caindo + CPA subindo = eficiência piorando. Investigar múltiplas frentes.",
      "ROAS acima do target + volume baixo = há espaço para reduzir tROAS e escalar.",
    ],
    whatToDo:
      "ROAS abaixo com CPA ok: verifique o mix de produtos no GA4 — produtos de menor ticket podem estar puxando a média para baixo. ROAS acima com volume baixo: reduza o tROAS gradualmente para destravar escala.",
    correlations: [
      "ROAS baixo + CPA ok = ticket médio caindo. Segmentar por produto.",
      "ROAS alto + IS baixo = oportunidade de escala. Reduzir tROAS.",
      "ROAS baixo + CPA alto = eficiência comprometida. Revisar estratégia.",
    ],
    platforms: ["google", "meta"],
    funnelStages: ["fundo"],
  },
  {
    key: "cpc",
    label: "CPC (Custo por Clique)",
    description:
      "Valor médio pago por cada clique no anúncio. Mais relevante em campanhas Search e de tráfego. CPC alto nem sempre é problema — depende da taxa de conversão e do ticket médio.",
    healthyRange: "Search: R$ 1–5 (varia por setor). Display: R$ 0.50–2. Meta: R$ 0.50–3.",
    warningSigns: [
      "CPC subindo + conversão caindo = qualidade do tráfego piorando",
      "CPC alto + CTR baixo = criativo ou segmentação fraca",
      "CPC baixo + conversão zero = tráfego irrelevante",
    ],
    whatToDo:
      "CPC alto com CTR baixo: melhore o criativo antes de mexer no lance. CPC subindo com conversão caindo: investigue a segmentação e a qualidade do tráfego no GA4.",
    correlations: [
      "CPC alto + CTR baixo = criativo fraco. Testar novos copies.",
      "CPC alto + Quality Score baixo (Google) = melhorar relevância do anúncio.",
      "CPC baixo + conversão zero = segmentação errada.",
    ],
    platforms: ["google"],
    funnelStages: ["meio", "fundo"],
  },
  {
    key: "vtr",
    label: "VTR (Video Through Rate)",
    description:
      "Taxa de retenção de vídeo — percentual de pessoas que assistiram até o final (ou até um ponto definido). Essencial no TikTok e Meta para campanhas de vídeo. Abertura de 3s define 80% do resultado.",
    healthyRange: "TikTok: 25–40% nos 3s, 5–10% completo. Meta: 15–30% nos 3s.",
    warningSigns: [
      "VTR abaixo de 25% nos 3s iniciais = hook fraco. TikTok penaliza com CPM mais alto.",
      "VTR caindo rapidamente após o início = storytelling não prende.",
      "VTR alta mas conversão zero = call to action fraca ou desalinhada.",
    ],
    whatToDo:
      "VTR baixo no hook: teste 3 variações do início do vídeo (primeiros 3 segundos). No TikTok, o hook define quase todo o resultado. VTR ok mas sem conversão: revise a CTA e o final do vídeo.",
    correlations: [
      "VTR baixo + CPM alto = criativo penalizado pela plataforma. Trocar.",
      "VTR alto + engajamento baixo = vídeo assistido mas sem ação. Melhorar CTA.",
      "VTR alto + CPA ok = criativo saudável. Escalar.",
    ],
    platforms: ["meta", "tiktok"],
    funnelStages: ["topo", "meio"],
  },
  {
    key: "eng",
    label: "Engajamento de Vídeo",
    description:
      "Interações com o conteúdo de vídeo — curtidas, comentários, compartilhamentos. Sinaliza ao algoritmo que o conteúdo ressoa com a audiência. Alto engajamento reduz CPM naturalmente.",
    healthyRange: "Meta: 3–10% de engagement rate. TikTok: 5–15%. Depende muito do formato e segmento.",
    warningSigns: [
      "Engajamento baixo + VTR baixo = conteúdo não prende em nenhum momento",
      "Engajamento alto + VTR baixo = título/hook enganoso",
      "Engajamento caindo ao longo do tempo = criativo perdendo relevância",
    ],
    whatToDo:
      "Alto engajamento orgânico pode ser impulsionado como dark post — anúncios com boa recepção natural performam melhor quando pagos. Use isso a seu favor no Meta.",
    correlations: [
      "Engajamento alto + alcance crescendo = conteúdo viralizando. Aproveitar.",
      "Engajamento baixo + VTR baixo = novo criativo necessário.",
      "Engajamento alto + CPA baixo = oportunidade de escala com novos criativos similares.",
    ],
    platforms: ["meta", "tiktok"],
    funnelStages: ["topo", "meio"],
  },
];

export function getMetricsForContext(
  platform: string,
  campaignType: string,
  funnelStage: string,
  auctionModel: string | null
): MetricGuideEntry[] {
  return METRIC_GUIDE_DATA.filter((m) => {
    if (!m.platforms.includes(platform as any)) return false;
    if (!m.funnelStages.includes(funnelStage as any)) return false;
    if (m.key === "is" && !["google", "dv360"].includes(platform)) return false;
    if (m.key === "freq" && !["meta", "tiktok"].includes(platform)) return false;
    if (["vtr", "eng"].includes(m.key) && campaignType !== "video") return false;
    if (m.key === "roas" && auctionModel !== "troas") return false;
    if (m.key === "cpc" && auctionModel !== "maxClick") return false;
    return true;
  });
}
