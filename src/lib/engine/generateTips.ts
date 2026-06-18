import type { ContextualDiagnosticInput } from "../types";

export function generateContextualTips(
  input: ContextualDiagnosticInput
): Array<{ title: string; body: string }> {
  const { platform, campaignType, auctionModel, funnelStage, conversionEvent } = input;

  const tips: Array<{ title: string; body: string }> = [];

  if (auctionModel === "maxConv") {
    tips.push({
      title: "Maximizar Conversões",
      body: "CPA pode variar +-30% sem ser alarme. Avalie sempre em janela de 7 dias. Budget é a alavanca de escala.",
    });
    tips.push({
      title: "Oscilação esperada",
      body: "Sem tCPA definido, o algoritmo busca máximo volume dentro do budget. Dias de CPA alto são compensados por dias de CPA baixo.",
    });
  }

  if (auctionModel === "tcpa") {
    tips.push({
      title: "CPA desejado (tCPA)",
      body: "Ajustes acima de 20% forçam re-aprendizado. Incrementos de 15% são ideais para mover o algoritmo sem instabilidade.",
    });
    tips.push({
      title: "Janela de avaliação",
      body: "Nunca avalie CPA no dia seguinte a um ajuste. Aguarde no mínimo 5-7 dias para o algoritmo estabilizar.",
    });
  }

  if (auctionModel === "troas") {
    tips.push({
      title: "ROAS desejado (tROAS)",
      body: "Funciona melhor com +30 conversões/mês. Abaixo disso, prefira Maximizar Conversões com monitoramento de ROAS no GA4.",
    });
    tips.push({
      title: "ROAS vs. CPA",
      body: "Em tROAS, foque no ROAS em vez do CPA. Um CPA alto com ROAS bom pode indicar ticket médio elevado.",
    });
  }

  if (auctionModel === "maxClick") {
    tips.push({
      title: "Maximizar Cliques",
      body: "CPA tende a ser maior e CVR mais baixa. Avalie métricas pós-clique no GA4 antes de concluir sobre performance.",
    });
  }

  if (platform === "google" && campaignType === "pmax") {
    tips.push({
      title: "Sinais de audiência",
      body: "Adicione listas de remarketing e clientes como sinais — o PMax usa para prospectar similares.",
    });
    tips.push({
      title: "Janela mínima",
      body: "PMax precisa de 30–50 conv./mês para otimizar. Um dia ruim é sempre ruído, não tendência.",
    });
  }

  if (platform === "meta") {
    tips.push({
      title: "Creative refresh",
      body: "No Meta, a vida útil de um criativo é 7–14 dias com volume alto. Planeje rotação constante de assets.",
    });
    tips.push({
      title: "Dark post",
      body: "Anúncios com alto engajamento orgânico performam melhor quando impulsionados. Use o post ID original para manter sinais sociais.",
    });
  }

  if (platform === "tiktok") {
    tips.push({
      title: "Hook nos 3s",
      body: "Teste pelo menos 3 versões do hook. A abertura define 80% do resultado no TikTok.",
    });
    tips.push({
      title: "UGC é rei",
      body: "Conteúdo que parece orgânico (UGC) tende a ter VTR e CTR maiores do que produções polidas de estúdio.",
    });
    tips.push({
      title: "Trava de CPM",
      body: "CPM alto no TikTok é muitas vezes penalidade por baixa retenção nos 3s. Melhore o hook antes de mexer na segmentação.",
    });
  }

  if (funnelStage === "fundo" && conversionEvent === "purchase") {
    tips.push({
      title: "Ticket médio",
      body: "Se ROAS abaixo com CPA ok: ticket médio caindo. Checar mix de produtos no GA4 antes de mexer no lance.",
    });
  }

  if (funnelStage === "topo" && auctionModel === "tcpa") {
    tips.push({
      title: "Topo de funil com CPA?",
      body: "Topo de funil raramente gera conversões diretas. Considere migrar para CPM ou Maximizar Cliques se o CPA estiver alto.",
    });
  }

  if (platform === "dv360") {
    tips.push({
      title: "DV360 e frequência",
      body: "No DV360, o gerenciamento de frequência é mais granular. Use cap de frequência semanal e diário para evitar saturação cross-campanha.",
    });
  }

  return tips;
}
