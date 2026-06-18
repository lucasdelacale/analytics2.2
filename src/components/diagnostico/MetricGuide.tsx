"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, AlertTriangle, Lightbulb, Link2 } from "lucide-react";
import type { MetricGuideEntry } from "@/lib/types";
import { cn } from "@/lib/utils";

export function MetricGuide({ metrics }: { metrics: MetricGuideEntry[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  if (metrics.length === 0) {
    return (
      <div className="glass-card p-6 text-center">
        <p className="text-sm text-neutral-400">
          Nenhuma métrica específica identificada para esta combinação.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-xs text-neutral-400">
        Baseado na sua configuração, estas são as métricas prioritárias para
        acompanhar:
      </p>

      <div className="grid gap-3">
        {metrics.map((metric) => {
          const isOpen = expanded === metric.key;
          return (
            <div
              key={metric.key}
              className={cn(
                "glass-card overflow-hidden transition-all",
                isOpen ? "ring-1 ring-cyan-500/20" : "hover:ring-1 hover:ring-white/10"
              )}
            >
              <button
                onClick={() => setExpanded(isOpen ? null : metric.key)}
                className="w-full flex items-center justify-between p-4 text-left"
                aria-expanded={isOpen}
                aria-label={`${metric.label} - detalhes`}
              >
                <div className="flex items-center gap-3">
                  <span className="icon-box bg-cyan-500/10 border-cyan-500/20">
                    <span className="text-xs font-bold text-cyan-400">
                      {metric.label.slice(0, 3)}
                    </span>
                  </span>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {metric.label}
                    </p>
                    <p className="text-[11px] text-neutral-500 mt-0.5">
                      Benchmark: {metric.healthyRange}
                    </p>
                  </div>
                </div>
                {isOpen ? (
                  <ChevronUp className="h-4 w-4 text-neutral-500 shrink-0" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-neutral-500 shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-4 pb-4 space-y-4 animate-fadeIn">
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {metric.description}
                  </p>

                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
                      <span className="text-[11px] font-medium text-amber-300 uppercase tracking-wider">
                        Sinais de alerta
                      </span>
                    </div>
                    <ul className="space-y-1.5">
                      {metric.warningSigns.map((sign, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs text-neutral-400"
                        >
                          <span className="text-amber-400/60 mt-0.5 shrink-0">
                            →
                          </span>
                          {sign}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <Lightbulb className="h-3.5 w-3.5 text-cyan-400" />
                      <span className="text-[11px] font-medium text-cyan-300 uppercase tracking-wider">
                        O que fazer
                      </span>
                    </div>
                    <p className="text-sm text-neutral-300 leading-relaxed">
                      {metric.whatToDo}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <Link2 className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-[11px] font-medium text-emerald-300 uppercase tracking-wider">
                        Correlações
                      </span>
                    </div>
                    <ul className="space-y-1.5">
                      {metric.correlations.map((corr, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs text-neutral-400"
                        >
                          <span className="text-emerald-400/60 mt-0.5 shrink-0">
                            ◆
                          </span>
                          {corr}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
