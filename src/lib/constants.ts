import type { CampaignType, Platform, AuctionModel, FunnelStage, ConversionEvent, MetricConfig, MetricKey } from "./types";

export const FILTERS = {
  platToTipo: {
    google: ["pmax", "search", "display", "video", "shopping"] as CampaignType[],
    meta: ["video", "advantage"] as CampaignType[],
    tiktok: ["video"] as CampaignType[],
    dv360: ["display", "video"] as CampaignType[],
  } satisfies Record<Platform, CampaignType[]>,

  platToLeilao: {
    google: ["maxConv", "tcpa", "troas", "maxClick"] as AuctionModel[],
    meta: ["maxConv", "tcpa", "troas"] as AuctionModel[],
    tiktok: ["maxConv", "tcpa"] as AuctionModel[],
    dv360: ["maxConv", "tcpa"] as AuctionModel[],
  } satisfies Record<Platform, AuctionModel[]>,

  tipoToFase: {
    pmax: ["meio", "fundo"] as FunnelStage[],
    search: ["meio", "fundo"] as FunnelStage[],
    display: ["topo", "meio"] as FunnelStage[],
    video: ["topo", "meio"] as FunnelStage[],
    shopping: ["fundo"] as FunnelStage[],
    advantage: ["meio", "fundo"] as FunnelStage[],
  } satisfies Record<CampaignType, FunnelStage[]>,

  tipoToConv: {
    pmax: ["purchase", "lead"] as ConversionEvent[],
    search: ["purchase", "lead", "cart"] as ConversionEvent[],
    display: ["view", "lead"] as ConversionEvent[],
    video: ["view", "install"] as ConversionEvent[],
    shopping: ["purchase", "cart"] as ConversionEvent[],
    advantage: ["purchase", "lead"] as ConversionEvent[],
  } satisfies Record<CampaignType, ConversionEvent[]>,

  leilaoToMetrics: {
    maxConv: ["cpa", "cpm", "is", "ctr", "bdg", "freq", "vtr", "eng"] as MetricKey[],
    tcpa: ["cpa", "cpm", "is", "ctr", "bdg", "freq", "vtr", "eng"] as MetricKey[],
    troas: ["roas", "cpm", "is", "ctr", "bdg", "freq", "vtr", "eng"] as MetricKey[],
    maxClick: ["cpc", "cpm", "is", "ctr", "bdg", "freq", "vtr", "eng"] as MetricKey[],
  } satisfies Record<AuctionModel, MetricKey[]>,
} as const;

export const METRICS_CONFIG: Record<MetricKey, MetricConfig> = {
  cpa: { label: "CPA", unit: "R$", better: "lower", mode: "dual" },
  cpm: { label: "CPM", unit: "R$", better: "higher", mode: "dual" },
  is: { label: "Lost IS", unit: "", better: "higher", mode: "slider" },
  ctr: { label: "CTR", unit: "", better: "higher", mode: "single" },
  roas: { label: "ROAS", unit: "×", better: "higher", mode: "dual" },
  cpc: { label: "CPC", unit: "R$", better: "lower", mode: "dual" },
  bdg: { label: "Budget", unit: "", better: "higher", mode: "slider" },
  freq: { label: "Frequência", unit: "", better: "higher", mode: "single" },
  vtr: { label: "VTR", unit: "%", better: "higher", mode: "single" },
  eng: { label: "Engaj. Vídeo", unit: "%", better: "higher", mode: "single" },
};

export const PLATFORM_NAMES: Record<Platform, string> = {
  google: "Google Ads",
  meta: "Meta Ads",
  tiktok: "TikTok Ads",
  dv360: "DV360",
};

export const CAMPAIGN_TYPE_NAMES: Record<CampaignType, string> = {
  pmax: "Performance Max",
  search: "Search",
  display: "Display/DSA",
  video: "Vídeo/Reels",
  shopping: "Shopping",
  advantage: "Advantage+",
};

export const FUNNEL_STAGE_NAMES: Record<FunnelStage, string> = {
  topo: "Topo (Awareness)",
  meio: "Meio (Consideração)",
  fundo: "Fundo (Conversão)",
};

export const AUCTION_MODEL_NAMES: Record<AuctionModel, string> = {
  maxConv: "Maximizar Conversões",
  tcpa: "CPA desejado (tCPA)",
  troas: "ROAS desejado (tROAS)",
  maxClick: "Maximizar Cliques",
};

export const CONVERSION_EVENT_NAMES: Record<ConversionEvent, string> = {
  purchase: "Compra/Venda",
  lead: "Lead/Cadastro",
  install: "Instalação",
  view: "Visualização/Alcance",
  cart: "Adicionar ao carrinho",
};

export const STATUS_LABELS = {
  excelente: "Excelente ✓",
  bom: "Bom ✓",
  na_meta: "Na meta",
  atencao: "Atenção ✗",
  critico: "Crítico ✗",
} as const;
