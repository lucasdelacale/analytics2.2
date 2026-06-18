export type Platform = "google" | "meta" | "tiktok" | "dv360";
export type CampaignType = "pmax" | "search" | "display" | "video" | "shopping" | "advantage";
export type FunnelStage = "topo" | "meio" | "fundo";
export type AuctionModel = "maxConv" | "tcpa" | "troas" | "maxClick";
export type ConversionEvent = "purchase" | "lead" | "install" | "view" | "cart";
export type MetricKey = "cpa" | "cpm" | "is" | "ctr" | "bdg" | "freq" | "roas" | "cpc" | "vtr" | "eng";

export interface MetricGuideEntry {
  key: MetricKey;
  label: string;
  description: string;
  healthyRange: string;
  warningSigns: string[];
  whatToDo: string;
  correlations: string[];
  platforms: Platform[];
  funnelStages: FunnelStage[];
}

export interface AlertSignal {
  signal: string;
  severity: "alta" | "media";
  action: string;
}

export interface Recommendation {
  action: string;
  priority: "alta" | "media" | "baixa";
  reason?: string;
}

export interface ContextualDiagnosticResult {
  scenario: {
    platform: Platform;
    campaignType: CampaignType;
    funnelStage: FunnelStage;
    auctionModel: AuctionModel;
    conversionEvent: ConversionEvent;
  };
  priorityMetrics: MetricGuideEntry[];
  checklist: string[];
  alertSignals: AlertSignal[];
  recommendations: Recommendation[];
  tips: Array<{ title: string; body: string }>;
}

export interface MetricConfig {
  label: string;
  unit: string;
  better: "higher" | "lower";
  mode: "single" | "dual" | "slider";
}

export interface ContextualDiagnosticInput {
  platform: Platform;
  campaignType: CampaignType;
  funnelStage: FunnelStage;
  auctionModel: AuctionModel;
  conversionEvent: ConversionEvent;
}
