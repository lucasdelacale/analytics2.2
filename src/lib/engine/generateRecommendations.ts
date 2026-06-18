import type { ContextualDiagnosticInput, Recommendation } from "../types";

export function generateContextualRecommendations(
  input: ContextualDiagnosticInput
): Recommendation[] {
  const { platform, campaignType, funnelStage, auctionModel, conversionEvent } = input;

  const acoes: Recommendation[] = [];

  if (platform === "google" && campaignType === "pmax") {
    acoes.push({
      action: "Conferir relatório de grupos de ativos — assets com desempenho 'Baixo' limitam o teto da campanha",
      priority: "alta",
    });
    acoes.push({
      action: "Adicionar listas de remarketing e clientes como sinais de audiência",
      priority: "media",
      reason: "PMax usa sinais para prospectar públicos similares",
    });
  }

  if (platform === "google" && campaignType === "search") {
    acoes.push({
      action: "Verificar termos de pesquisa e adicionar palavras-chave negativas semanalmente",
      priority: "alta",
    });
    acoes.push({
      action: "Analisar Quality Score por palavra-chave — abaixo de 6, melhore o anúncio",
      priority: "media",
    });
  }

  if (platform === "meta" && campaignType === "advantage") {
    acoes.push({
      action: "Manter Advantage+ Audience ativado — a expansão automática melhora a entrega",
      priority: "alta",
    });
    acoes.push({
      action: "Planejar rotação de criativos a cada 7–14 dias para evitar fadiga",
      priority: "alta",
    });
  }

  if (platform === "meta" && campaignType === "video") {
    acoes.push({
      action: "Testar 3 variações de hook para os primeiros 3 segundos do vídeo",
      priority: "alta",
    });
    acoes.push({
      action: "Usar dark posts orgânicos com alto engajamento como base para anúncios pagos",
      priority: "media",
    });
  }

  if (platform === "tiktok") {
    acoes.push({
      action: "Testar pelo menos 3 hooks diferentes — a abertura define 80% do CTR no TikTok",
      priority: "alta",
    });
    acoes.push({
      action: "Priorizar conteúdo UGC com aparência orgânica em vez de produções polidas",
      priority: "alta",
    });
  }

  if (auctionModel === "tcpa") {
    acoes.push({
      action: "Avaliar CPA em janela de 14 dias. Um dia isolado não é tendência",
      priority: "alta",
    });
    acoes.push({
      action: "Se CPA estiver acima do target, ajuste o tCPA em 15-20% (nunca acima de 20%)",
      priority: "media",
      reason: "Ajustes acima de 20% forçam re-aprendizado do algoritmo",
    });
  }

  if (auctionModel === "maxConv") {
    acoes.push({
      action: "Budget é a única alavanca real — aumente o budget para escalar, não o lance",
      priority: "alta",
    });
    acoes.push({
      action: "CPA pode variar +-30% sem ser alarme. Monitore em janela de 7 dias",
      priority: "media",
    });
  }

  if (auctionModel === "troas") {
    acoes.push({
      action: "Confirmar 30+ conversões no mês — tROAS funciona mal com volume baixo",
      priority: "alta",
    });
    acoes.push({
      action: "Se ROAS abaixo: verifique ticket médio no GA4 antes de mexer no lance",
      priority: "media",
      reason: "Ticket médio baixo puxa ROAS para baixo mesmo com CPA saudável",
    });
  }

  if (auctionModel === "maxClick") {
    acoes.push({
      action: "Avaliar CVR no GA4 — CPC baixo não significa resultados se a taxa de conversão for muito baixa",
      priority: "alta",
    });
  }

  if (funnelStage === "fundo" && conversionEvent === "purchase") {
    acoes.push({
      action: "Comparar ROAS com ticket médio — ROAS baixo com CPA ok indica problema de mix de produtos",
      priority: "media",
    });
  }

  if (platform === "google" && ["display", "video"].includes(campaignType)) {
    acoes.push({
      action: "Verificar segmentação por afinidade e in-market — display e video precisam de audiência qualificada",
      priority: "alta",
    });
  }

  if (acoes.length === 0) {
    acoes.push({
      action: "Nenhuma recomendação específica para esta combinação. Acompanhe o checklist geral.",
      priority: "baixa",
    });
  }

  return acoes;
}
