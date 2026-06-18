"use client";

import { useState } from "react";
import {
  Bot,
  Cpu,
  MessageSquare,
  Sparkles,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";

const agents = [
  {
    id: "google",
    name: "Google Ads Specialist",
    description: "Análise de Search, PMax, Shopping, Quality Score, IS",
    status: "coming-soon",
    icon: "G",
    color: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  },
  {
    id: "meta",
    name: "Meta Ads Specialist",
    description: "Análise de criativos, frequência, Advantage+, retargeting",
    status: "coming-soon",
    icon: "M",
    color: "bg-sky-500/20 text-sky-300 border-sky-500/30",
  },
  {
    id: "tiktok",
    name: "TikTok Ads Specialist",
    description: "VTR, hook, tendências, criativos UGC",
    status: "coming-soon",
    icon: "T",
    color: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  },
  {
    id: "general",
    name: "Analista Geral",
    description: "Visão multi-plataforma, estratégia integrada, crescimento",
    status: "coming-soon",
    icon: "A",
    color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  },
];

export default function AgenteIAPage() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  return (
    <div className="space-y-6 fade-up">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Agente IA
        </h1>
        <p className="text-sm text-neutral-400 mt-1">
          Especialistas em cada plataforma para analisar suas campanhas
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {agents.map((agent) => (
          <button
            key={agent.id}
            onClick={() => setSelectedAgent(agent.id)}
            className={cn(
              "glass-card-sm p-4 text-left transition-all duration-200",
              selectedAgent === agent.id
                ? "ring-1 ring-cyan-500/50"
                : "hover:bg-white/[0.04]"
            )}
          >
            <div
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-[14px] text-sm font-bold border mb-3",
                agent.color
              )}
            >
              {agent.icon}
            </div>
            <h3 className="text-sm font-semibold text-white mb-1">
              {agent.name}
            </h3>
            <p className="text-xs text-neutral-500 mb-3 leading-relaxed">
              {agent.description}
            </p>
            <span className="inline-flex items-center rounded-full bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[10px] text-amber-300">
              <Cpu className="h-3 w-3 mr-1" />
              Em breve
            </span>
          </button>
        ))}
      </div>

      <div className="glass-card p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="inline-flex h-8 w-8 items-center justify-center rounded-[12px] bg-white/10 border border-white/20">
            <MessageSquare className="h-4 w-4 text-neutral-300" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">
              {selectedAgent
                ? agents.find((a) => a.id === selectedAgent)?.name
                : "Selecione um agente"}
            </h3>
            <p className="text-[11px] text-neutral-500">
              {selectedAgent
                ? "Faça uma pergunta sobre sua campanha"
                : "Escolha um especialista acima para começar"}
            </p>
          </div>
          {!selectedAgent && (
            <div className="ml-auto">
              <Sparkles className="h-4 w-4 text-amber-400 animate-pulse" />
            </div>
          )}
        </div>

        <div className="rounded-[16px] bg-white/[0.02] border border-white/[0.06] p-8 text-center">
          <Bot className="h-10 w-10 text-neutral-700 mx-auto mb-3" />
          <p className="text-sm text-neutral-500">
            {selectedAgent
              ? "Agente em desenvolvimento. Em breve você poderá conversar com este especialista."
              : "Selecione um agente especialista acima para iniciar uma conversa sobre sua campanha."}
          </p>
          <p className="text-xs text-neutral-600 mt-2">
            Os agentes utilizarão DeepSeek V4 Flash para análises gratuitas e
            em tempo real.
          </p>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Digite sua pergunta sobre a campanha..."
            disabled={!selectedAgent}
            className="flex-1 rounded-full bg-white/[0.05] border border-white/10 px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500/30 transition disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Mensagem para o agente"
          />
          <button
            disabled={!selectedAgent || !message.trim()}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500 text-white hover:bg-cyan-400 transition disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Enviar mensagem"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="glass-card-sm p-4">
        <h4 className="text-xs font-semibold text-white mb-2">
          Sobre os Agentes
        </h4>
        <div className="space-y-1.5 text-xs text-neutral-500 leading-relaxed">
          <p>
            Cada agente é especializado em uma plataforma de anúncios e utiliza
            o modelo <strong className="text-neutral-300">DeepSeek V4 Flash</strong>{" "}
            para gerar análises gratuitas.
          </p>
          <p>
            Os agentes consideram o contexto completo da sua campanha
            (plataforma, tipo, métricas, histórico) para oferecer recomendações
            personalizadas.
          </p>
          <p>
            Futuramente: integração com Google Ads API e Meta API para análise
            de dados reais.
          </p>
        </div>
      </div>
    </div>
  );
}
