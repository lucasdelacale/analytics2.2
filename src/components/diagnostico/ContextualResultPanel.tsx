"use client";

import { useState } from "react";
import { CheckCircle2, AlertTriangle, Sparkles, Copy, Check, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import type { ContextualDiagnosticResult } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ContextualResultPanel({
  result,
}: {
  result: ContextualDiagnosticResult;
}) {
  const [copied, setCopied] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);

  const handleCopy = async () => {
    const text = generateReportText(result);
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = () => {
    const text = generateReportText(result);
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `diagnostico-${result.scenario.platform}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Scenario header */}
      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-white mb-3">Cenário Analisado</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <Badge label="Plataforma" value={result.scenario.platform} />
          <Badge label="Campanha" value={result.scenario.campaignType} />
          <Badge label="Funil" value={result.scenario.funnelStage} />
          <Badge label="Lance" value={result.scenario.auctionModel} />
          <Badge label="Conversão" value={result.scenario.conversionEvent} />
        </div>
      </div>

      {/* Priority Metrics */}
      <div className="glass-card p-5">
        <button
          onClick={() => setShowMetrics(!showMetrics)}
          className="w-full flex items-center justify-between"
          aria-expanded={showMetrics}
        >
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-white">
              Métricas Prioritárias ({result.priorityMetrics.length})
            </h3>
          </div>
          {showMetrics ? (
            <ChevronUp className="h-4 w-4 text-neutral-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-neutral-500" />
          )}
        </button>
        {showMetrics && (
          <div className="mt-4 space-y-2 animate-fadeIn">
            {result.priorityMetrics.map((m) => (
              <div
                key={m.key}
                className="rounded-[12px] bg-white/[0.03] border border-white/[0.06] px-3 py-2.5"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-white">
                    {m.label}
                  </span>
                  <span className="text-[10px] text-neutral-500">
                    {m.healthyRange}
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  {m.description.slice(0, 120)}...
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Checklist */}
      <div className="glass-card p-5">
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <h3 className="text-sm font-semibold text-white">Checklist</h3>
        </div>
        <ul className="space-y-2">
          {result.checklist.map((item, i) => (
            <li
              key={i}
              className={cn(
                "flex items-start gap-2 text-xs leading-relaxed",
                i === 0
                  ? "text-cyan-300 font-medium"
                  : "text-neutral-300"
              )}
            >
              <span
                className={cn(
                  "mt-0.5 shrink-0 h-4 w-4 rounded-full flex items-center justify-center text-[9px] font-bold",
                  i === 0
                    ? "bg-cyan-500/20 text-cyan-400"
                    : "bg-white/10 text-neutral-500"
                )}
              >
                {i + 1}
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Alert Signals */}
      <div className="glass-card p-5">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="h-4 w-4 text-amber-400" />
          <h3 className="text-sm font-semibold text-white">
            Sinais de Alerta
          </h3>
        </div>
        <div className="space-y-3">
          {result.alertSignals.map((signal, i) => (
            <div
              key={i}
              className={cn(
                "rounded-[12px] border px-4 py-3",
                signal.severity === "alta"
                  ? "bg-red-500/5 border-red-500/20"
                  : "bg-amber-500/5 border-amber-500/20"
              )}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span
                  className={cn(
                    "text-[10px] font-semibold uppercase tracking-wider",
                    signal.severity === "alta"
                      ? "text-red-400"
                      : "text-amber-400"
                  )}
                >
                  {signal.severity === "alta" ? "Alta prioridade" : "Atenção"}
                </span>
                <span
                  className={cn(
                    "pill-btn",
                    signal.severity === "alta"
                      ? "bg-red-500/15 text-red-300"
                      : "bg-amber-500/15 text-amber-300"
                  )}
                >
                  {signal.severity === "alta" ? "Ação recomendada" : "Monitore"}
                </span>
              </div>
              <p className="text-sm font-medium text-white mb-1">
                {signal.signal}
              </p>
              <p className="text-xs text-neutral-400">{signal.action}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-white mb-3">
          Recomendações
        </h3>
        <div className="space-y-3">
          {result.recommendations.map((rec, i) => (
            <div
              key={i}
              className={cn(
                "rounded-[12px] border px-4 py-3",
                rec.priority === "alta"
                  ? "bg-cyan-500/5 border-cyan-500/20"
                  : rec.priority === "media"
                    ? "bg-white/[0.03] border-white/10"
                    : "bg-white/[0.02] border-white/[0.06]"
              )}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={cn(
                    "text-[10px] font-semibold uppercase tracking-wider",
                    rec.priority === "alta"
                      ? "text-cyan-400"
                      : rec.priority === "media"
                        ? "text-neutral-400"
                        : "text-neutral-500"
                  )}
                >
                  {rec.priority === "alta"
                    ? "Prioridade alta"
                    : rec.priority === "media"
                      ? "Recomendado"
                      : "Sugestão"}
                </span>
              </div>
              <p className="text-sm text-white">{rec.action}</p>
              {rec.reason && (
                <p className="text-[11px] text-neutral-500 mt-1">
                  {rec.reason}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      {result.tips.length > 0 && (
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-white mb-3">Macetes</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {result.tips.map((tip, i) => (
              <div
                key={i}
                className="rounded-[12px] bg-white/[0.03] border border-white/[0.06] px-4 py-3"
              >
                <p className="text-xs font-medium text-cyan-300 mb-1">
                  {tip.title}
                </p>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  {tip.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-xs text-neutral-300 hover:bg-white/15 transition border border-white/10"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-green-400" />
              Copiado
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copiar guia
            </>
          )}
        </button>
        <button
          onClick={handleExport}
          className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-xs text-neutral-300 hover:bg-white/15 transition border border-white/10"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Exportar .txt
        </button>
      </div>
    </div>
  );
}

function Badge({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[12px] bg-white/[0.03] border border-white/[0.06] px-3 py-2">
      <p className="text-[10px] uppercase tracking-[0.1em] text-neutral-500 mb-0.5">
        {label}
      </p>
      <p className="text-xs font-medium text-white">{value}</p>
    </div>
  );
}

function generateReportText(result: ContextualDiagnosticResult): string {
  const lines: string[] = [];
  lines.push("=== GUIA DE DIAGNÓSTICO DE MÍDIA ===");
  lines.push(`Plataforma: ${result.scenario.platform}`);
  lines.push(`Campanha: ${result.scenario.campaignType}`);
  lines.push(`Funil: ${result.scenario.funnelStage}`);
  lines.push(`Lance: ${result.scenario.auctionModel}`);
  lines.push(`Conversão: ${result.scenario.conversionEvent}`);
  lines.push("");

  lines.push("--- CHECKLIST ---");
  result.checklist.forEach((item, i) => lines.push(`${i + 1}. ${item}`));
  lines.push("");

  lines.push("--- SINAIS DE ALERTA ---");
  result.alertSignals.forEach((s) => {
    lines.push(`[${s.severity === "alta" ? "ALTA" : "MÉDIA"}] ${s.signal}`);
    lines.push(`  → ${s.action}`);
  });
  lines.push("");

  lines.push("--- RECOMENDAÇÕES ---");
  result.recommendations.forEach((r) => {
    lines.push(`[${r.priority === "alta" ? "ALTA" : r.priority === "media" ? "MÉDIA" : "BAIXA"}] ${r.action}`);
    if (r.reason) lines.push(`  → ${r.reason}`);
  });
  lines.push("");

  lines.push("--- MACETES ---");
  result.tips.forEach((t) => {
    lines.push(`${t.title}: ${t.body}`);
  });

  return lines.join("\n");
}
