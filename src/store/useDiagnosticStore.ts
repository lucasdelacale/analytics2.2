import { create } from "zustand";
import type { Platform, CampaignType, FunnelStage, AuctionModel, ConversionEvent, ContextualDiagnosticResult } from "@/lib/types";

interface DiagnosticState {
  step: number;
  platform: Platform | null;
  campaignType: CampaignType | null;
  funnelStage: FunnelStage | null;
  auctionModel: AuctionModel | null;
  conversionEvent: ConversionEvent | null;
  result: ContextualDiagnosticResult | null;
  loading: boolean;

  setPlatform: (p: Platform) => void;
  setCampaignType: (t: CampaignType) => void;
  setFunnelStage: (f: FunnelStage) => void;
  setAuctionModel: (m: AuctionModel) => void;
  setConversionEvent: (e: ConversionEvent) => void;
  setResult: (r: ContextualDiagnosticResult | null) => void;
  setLoading: (l: boolean) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (s: number) => void;
  reset: () => void;
}

const initialState = {
  step: 0,
  platform: null as Platform | null,
  campaignType: null as CampaignType | null,
  funnelStage: null as FunnelStage | null,
  auctionModel: null as AuctionModel | null,
  conversionEvent: null as ConversionEvent | null,
  result: null as ContextualDiagnosticResult | null,
  loading: false,
};

export const useDiagnosticStore = create<DiagnosticState>((set) => ({
  ...initialState,

  setPlatform: (p) => set({ platform: p, campaignType: null }),
  setCampaignType: (t) =>
    set({ campaignType: t, funnelStage: null, conversionEvent: null }),
  setFunnelStage: (f) => set({ funnelStage: f }),
  setAuctionModel: (m) => set({ auctionModel: m }),
  setConversionEvent: (e) => set({ conversionEvent: e }),
  setResult: (r) => set({ result: r }),
  setLoading: (l) => set({ loading: l }),
  nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 6) })),
  prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 0) })),
  goToStep: (s) => set({ step: s }),
  reset: () => set(initialState),
}));
