"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { useDiagnosticStore } from "@/store/useDiagnosticStore";
import { SelectionGrid } from "./SelectionGrid";
import { MetricGuide } from "./MetricGuide";
import { ContextualResultPanel } from "./ContextualResultPanel";
import { generateContextualDiagnostic, getMetricsForContext } from "@/lib/engine";
import {
  FILTERS,
  PLATFORM_NAMES,
  CAMPAIGN_TYPE_NAMES,
  FUNNEL_STAGE_NAMES,
  AUCTION_MODEL_NAMES,
  CONVERSION_EVENT_NAMES,
} from "@/lib/constants";
import type { Platform, CampaignType, FunnelStage, AuctionModel, ConversionEvent } from "@/lib/types";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: "platform", label: "Plataforma", short: "1" },
  { id: "tipo", label: "Tipo de Campanha", short: "2" },
  { id: "fase", label: "Fase do Funil", short: "3" },
  { id: "leilao", label: "Estratégia de Lance", short: "4" },
  { id: "conv", label: "Evento de Conversão", short: "5" },
  { id: "metricas", label: "Guia de Métricas", short: "6" },
  { id: "review", label: "Revisar", short: "7" },
] as const;

export function DiagnosticForm() {
  const store = useDiagnosticStore();
  const [step, setStep] = useState(0);

  const canGoNext = checkStepValid(step, store);

  function handleSelect(field: string, value: string) {
    switch (field) {
      case "platform":
        store.setPlatform(value as Platform);
        break;
      case "tipo":
        store.setCampaignType(value as CampaignType);
        break;
      case "fase":
        store.setFunnelStage(value as FunnelStage);
        break;
      case "leilao":
        store.setAuctionModel(value as AuctionModel);
        break;
      case "conv":
        store.setConversionEvent(value as ConversionEvent);
        break;
    }
    if (["platform", "tipo", "fase", "leilao", "conv"].includes(field)) {
      setTimeout(() => setStep((s) => Math.min(s + 1, STEPS.length - 1)), 200);
    }
  }

  function handleRun() {
    if (!store.platform || !store.campaignType || !store.funnelStage || !store.auctionModel || !store.conversionEvent) return;

    store.setLoading(true);

    setTimeout(() => {
      const result = generateContextualDiagnostic({
        platform: store.platform!,
        campaignType: store.campaignType!,
        funnelStage: store.funnelStage!,
        auctionModel: store.auctionModel!,
        conversionEvent: store.conversionEvent!,
      });

      store.setResult(result);
      store.setLoading(false);
    }, 100);
  }

  function handleReset() {
    store.reset();
    setStep(0);
  }

  const relevantMetrics =
    store.platform && store.campaignType && store.funnelStage && store.auctionModel
      ? getMetricsForContext(
          store.platform,
          store.campaignType,
          store.funnelStage,
          store.auctionModel
        )
      : [];

  return (
    <div className="space-y-6">
      {/* Step indicator */}
      <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-2">
        {STEPS.map((s, i) => {
          const isActive = step === i;
          const isDone = store.result !== null || isStepDone(i, store);
          return (
            <button
              key={s.id}
              onClick={() => {
                if (store.result) return;
                if (i <= step || isDone) setStep(i);
              }}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium transition-all shrink-0 border",
                isActive
                  ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
                  : isDone
                    ? "bg-green-500/10 text-green-300 border-green-500/20"
                    : "bg-white/[0.03] text-neutral-500 border-white/10"
              )}
            >
              <span
                className={cn(
                  "inline-flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold",
                  isActive
                    ? "bg-cyan-500 text-white"
                    : isDone
                      ? "bg-green-500/30 text-green-200"
                      : "bg-white/10 text-neutral-500"
                )}
              >
                {isDone && !isActive ? "✓" : s.short}
              </span>
              <span className="hidden sm:inline">{s.label}</span>
            </button>
          );
        })}
      </div>

      {store.result ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Resultado do Diagnóstico</h2>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs text-neutral-300 hover:bg-white/15 transition border border-white/10"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Novo diagnóstico
            </button>
          </div>
          <ContextualResultPanel result={store.result} />
        </div>
      ) : (
        <>
          <div>
            <h2 className="text-lg font-semibold text-white">
              {STEPS[step].label}
            </h2>
            <p className="text-sm text-neutral-400 mt-1">
              {stepDescriptions[step]}
            </p>
          </div>

          <div className="min-h-[300px]">
            {step === 0 && (
              <SelectionGrid
                options={Object.entries(PLATFORM_NAMES).map(([value, label]) => ({
                  value,
                  label,
                }))}
                selected={store.platform}
                onSelect={(v) => handleSelect("platform", v)}
                columns={4}
              />
            )}

            {step === 1 && (
              <SelectionGrid
                options={Object.entries(CAMPAIGN_TYPE_NAMES)
                  .filter(
                    ([value]) =>
                      !store.platform ||
                      FILTERS.platToTipo[store.platform]?.includes(
                        value as CampaignType
                      )
                  )
                  .map(([value, label]) => ({
                    value,
                    label,
                  }))}
                selected={store.campaignType}
                onSelect={(v) => handleSelect("tipo", v)}
                columns={3}
              />
            )}

            {step === 2 && (
              <SelectionGrid
                options={Object.entries(FUNNEL_STAGE_NAMES)
                  .filter(
                    ([value]) =>
                      !store.campaignType ||
                      FILTERS.tipoToFase[store.campaignType]?.includes(
                        value as FunnelStage
                      )
                  )
                  .map(([value, label]) => ({
                    value,
                    label,
                  }))}
                selected={store.funnelStage}
                onSelect={(v) => handleSelect("fase", v)}
                columns={3}
              />
            )}

            {step === 3 && (
              <SelectionGrid
                options={Object.entries(AUCTION_MODEL_NAMES)
                  .filter(
                    ([value]) =>
                      !store.platform ||
                      FILTERS.platToLeilao[store.platform]?.includes(
                        value as AuctionModel
                      )
                  )
                  .map(([value, label]) => ({
                    value,
                    label,
                  }))}
                selected={store.auctionModel}
                onSelect={(v) => handleSelect("leilao", v)}
                columns={3}
              />
            )}

            {step === 4 && (
              <SelectionGrid
                options={Object.entries(CONVERSION_EVENT_NAMES)
                  .filter(
                    ([value]) =>
                      !store.campaignType ||
                      FILTERS.tipoToConv[store.campaignType]?.includes(
                        value as ConversionEvent
                      )
                  )
                  .map(([value, label]) => ({
                    value,
                    label,
                  }))}
                selected={store.conversionEvent}
                onSelect={(v) => handleSelect("conv", v)}
                columns={3}
              />
            )}

            {step === 5 && <MetricGuide metrics={relevantMetrics} />}

            {step === 6 && (
              <div className="glass-card p-6 space-y-5">
                <h3 className="text-sm font-semibold text-white">
                  Revise suas escolhas
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ReviewItem
                    label="Plataforma"
                    value={store.platform ? PLATFORM_NAMES[store.platform] : "—"}
                  />
                  <ReviewItem
                    label="Tipo de Campanha"
                    value={
                      store.campaignType
                        ? CAMPAIGN_TYPE_NAMES[store.campaignType]
                        : "—"
                    }
                  />
                  <ReviewItem
                    label="Fase do Funil"
                    value={
                      store.funnelStage
                        ? FUNNEL_STAGE_NAMES[store.funnelStage]
                        : "—"
                    }
                  />
                  <ReviewItem
                    label="Estratégia de Lance"
                    value={
                      store.auctionModel
                        ? AUCTION_MODEL_NAMES[store.auctionModel]
                        : "—"
                    }
                  />
                  <ReviewItem
                    label="Evento de Conversão"
                    value={
                      store.conversionEvent
                        ? CONVERSION_EVENT_NAMES[store.conversionEvent]
                        : "—"
                    }
                  />
                  <ReviewItem
                    label="Métricas relacionadas"
                    value={`${relevantMetrics.length} métrica${relevantMetrics.length !== 1 ? "s" : ""} no guia`}
                  />
                </div>

                <button
                  onClick={handleRun}
                  disabled={store.loading}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-cyan-500 px-6 py-3 text-sm font-medium text-white hover:bg-cyan-400 transition shadow-lg shadow-cyan-900/40 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {store.loading
                    ? "Gerando guia..."
                    : "Gerar Guia de Diagnóstico"}
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <button
              onClick={() => setStep((s) => Math.max(s - 1, 0))}
              disabled={step === 0}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-xs text-neutral-300 hover:bg-white/15 transition disabled:opacity-30 disabled:cursor-not-allowed border border-white/10"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              Voltar
            </button>

            <button
              onClick={() => {
                if (step === STEPS.length - 1) return;
                setStep((s) => s + 1);
              }}
              disabled={!canGoNext}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-xs text-neutral-300 hover:bg-white/15 transition disabled:opacity-30 disabled:cursor-not-allowed border border-white/10"
            >
              Avançar
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function ReviewItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[12px] bg-white/[0.03] border border-white/[0.06] px-4 py-3">
      <p className="text-[10px] uppercase tracking-[0.1em] text-neutral-500 mb-1">
        {label}
      </p>
      <p className="text-sm font-medium text-white">{value}</p>
    </div>
  );
}

const stepDescriptions = [
  "Selecione a plataforma onde sua campanha está sendo veiculada",
  "Escolha o formato da campanha",
  "Em qual estágio do funil sua campanha está focada?",
  "Qual estratégia de lance você está utilizando?",
  "Qual é o principal evento de conversão da campanha?",
  "Veja quais métricas são prioritárias para o seu cenário",
  "Confirme as informações e gere o guia de diagnóstico",
];

function checkStepValid(
  step: number,
  store: {
    platform: string | null;
    campaignType: string | null;
    funnelStage: string | null;
    auctionModel: string | null;
    conversionEvent: string | null;
  }
): boolean {
  switch (step) {
    case 0:
      return !!store.platform;
    case 1:
      return !!store.campaignType;
    case 2:
      return !!store.funnelStage;
    case 3:
      return !!store.auctionModel;
    case 4:
      return !!store.conversionEvent;
    case 5:
      return true;
    case 6:
      return true;
    default:
      return false;
  }
}

function isStepDone(
  step: number,
  store: {
    platform: string | null;
    campaignType: string | null;
    funnelStage: string | null;
    auctionModel: string | null;
    conversionEvent: string | null;
  }
): boolean {
  switch (step) {
    case 0:
      return !!store.platform;
    case 1:
      return !!store.campaignType;
    case 2:
      return !!store.funnelStage;
    case 3:
      return !!store.auctionModel;
    case 4:
      return !!store.conversionEvent;
    default:
      return false;
  }
}
