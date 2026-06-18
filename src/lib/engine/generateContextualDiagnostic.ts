import type { ContextualDiagnosticResult, ContextualDiagnosticInput } from "../types";
import { generateContextualRecommendations } from "./generateRecommendations";
import { generateContextualTips } from "./generateTips";
import { getMetricsForContext } from "./metricGuideData";

export function generateContextualDiagnostic(
  input: ContextualDiagnosticInput
): ContextualDiagnosticResult {
  const { platform, campaignType, funnelStage, auctionModel, conversionEvent } = input;

  const priorityMetrics = getMetricsForContext(platform, campaignType, funnelStage, auctionModel);
  const checklist = generateChecklist(platform, campaignType, funnelStage, auctionModel, conversionEvent);
  const alertSignals = generateAlertSignals(platform, campaignType, funnelStage, auctionModel, conversionEvent);
  const recommendations = generateContextualRecommendations(input);
  const tips = generateContextualTips(input);

  return {
    scenario: { platform, campaignType, funnelStage, auctionModel, conversionEvent },
    priorityMetrics,
    checklist,
    alertSignals,
    recommendations,
    tips,
  };
}

function generateChecklist(
  platform: string,
  campaignType: string,
  _funnelStage: string,
  _auctionModel: string,
  _conversionEvent: string
): string[] {
  const items: string[] = [];

  items.push(`Plataforma: ${platform} | Tipo: ${campaignType}`);
  items.push("Verificar se a conversão está sendo contada corretamente no GA4 vs. plataforma");

  if (platform === "google" && campaignType === "pmax") {
    items.push("Checar relatório de grupos de ativos — assets com 'Baixo' limitam o teto");
    items.push("Adicionar listas de remarketing e clientes como sinais de audiência");
    items.push("Confirmar que a campanha tem 30-50 conversões no mês para otimizar");
  }

  if (platform === "google" && campaignType === "search") {
    items.push("Verificar termos de pesquisa para identificar palavras-chave negativas");
    items.push("Analisar Quality Score por palavra-chave no nível do anúncio");
  }

  if (platform === "meta" && campaignType === "advantage") {
    items.push("Ativar Advantage+ Audience para expansão automática");
    items.push("Verificar frequência semanal — acima de 3.5x indica saturação");
    items.push("Planejar rotação de criativos a cada 7-14 dias");
  }

  if (platform === "meta" && campaignType === "video") {
    items.push("Checar VTR nos primeiros 3s — abaixo de 25%, testar novo hook");
    items.push("Verificar engajamento (curtidas/comentários) como sinal ao algoritmo");
  }

  if (platform === "tiktok") {
    items.push("Testar 3 variações de hook nos primeiros 3 segundos");
    items.push("Preferir conteúdo UGC com aparência orgânica");
    items.push("Avaliar se o CPM está dentro do benchmark (R$ 5-15)");
  }

  if (_auctionModel === "troas") {
    items.push("Confirmar que a campanha tem +30 conversões no mês para tROAS funcionar");
    items.push("Comparar ROAS com ticket médio no GA4");
  }

  if (_auctionModel === "tcpa") {
    items.push("Avaliar CPA em janela de 14 dias, nunca por dia isolado");
    items.push("Verificar Lost IS por Rank vs. por Budget no relatório de IS");
  }

  if (_auctionModel === "maxConv") {
    items.push("Monitorar CPA com margem de +-30% — oscilação é esperada");
    items.push("Budget é a única alavanca real neste modelo");
  }

  return items;
}

function generateAlertSignals(
  platform: string,
  campaignType: string,
  funnelStage: string,
  auctionModel: string,
  conversionEvent: string
): Array<{ signal: string; severity: "alta" | "media"; action: string }> {
  const signals: Array<{ signal: string; severity: "alta" | "media"; action: string }> = [];

  if (platform === "google" && campaignType === "pmax") {
    signals.push({
      signal: "PMax sem sinais de audiência",
      severity: "media",
      action: "Adicione listas de remarketing e clientes como sinais para o algoritmo",
    });
  }

  if (platform === "meta" && campaignType === "advantage" && conversionEvent === "purchase") {
    signals.push({
      signal: "Meta Advantage+ com foco em compra sem verificação de frequência",
      severity: "media",
      action: "Acompanhe frequência semanal — acima de 4x, expanda audiência",
    });
  }

  if (auctionModel === "troas") {
    signals.push({
      signal: "tROAS ativo com baixo volume de conversões",
      severity: "alta",
      action: "tROAS requer 30+ conversões/mês. Abaixo disso, prefira Maximizar Conversões",
    });
  }

  if (auctionModel === "tcpa" && platform === "google") {
    signals.push({
      signal: "tCPA sem relatório de IS",
      severity: "media",
      action: "Verifique o Lost IS semanalmente — se >40%, há escala sendo desperdiçada",
    });
  }

  if (funnelStage === "topo" && auctionModel === "tcpa") {
    signals.push({
      signal: "Lance CPA em campanha de topo de funil",
      severity: "alta",
      action: "Topo de funil raramente converte em CPA — considere CPM ou Maximizar Cliques",
    });
  }

  if (platform === "tiktok" && campaignType === "video" && funnelStage === "topo") {
    signals.push({
      signal: "TikTok topo sem teste de hook",
      severity: "media",
      action: "Teste 3+ hooks — o CPM penaliza criativos com baixa retenção nos 3s",
    });
  }

  if (signals.length === 0) {
    signals.push({
      signal: "Nenhum sinal crítico identificado para esta combinação",
      severity: "media",
      action: "Acompanhe o checklist acima e repita o diagnóstico semanalmente",
    });
  }

  return signals;
}
