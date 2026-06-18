---
name: analytics-map
description: Plataforma de diagnóstico de mídia performance com Next.js, Tailwind (Aurora), Zustand e motor de decisão modular.
---

# Analytics Map — Skill de Contexto

## Stack
- **Framework**: Next.js 14 (App Router) + TypeScript
- **Design**: Tailwind CSS + Aurora Design System (tema escuro, glassmorphism)
- **Estado**: Zustand (`src/store/`)
- **Engine**: Motor de decisão modular (`src/lib/engine/`)
- **Ícones**: lucide-react
- **Fonte**: Satoshi (Fontshare CDN)

## Estrutura de Diretórios

```
src/
├── app/                     # Páginas (App Router)
│   ├── page.tsx             # Dashboard
│   ├── layout.tsx           # Root layout (Header + Sidebar + Footer)
│   ├── diagnostico/         # Formulário multi-step (7 passos)
│   ├── funil/               # Funil de Marketing
│   ├── radar/               # Radar de Alertas
│   ├── plataformas/         # Macetes por plataforma
│   ├── ga4/                 # Fluxo GA4 + tabela diagnóstico
│   ├── historico/           # Análises salvas
│   ├── regras/              # Regras de Ouro
│   └── agente-ia/           # Agentes IA (DeepSeek)
├── components/
│   ├── layout/              # Header, Sidebar, Footer
│   └── diagnostico/         # DiagnosticForm, MetricGuide, SelectionGrid, ContextualResultPanel
├── lib/
│   ├── engine/              # Motor de decisão (modular)
│   │   ├── index.ts                    # Export principal
│   │   ├── generateContextualDiagnostic.ts  # Motor contextual (sem scores)
│   │   ├── generateRecommendations.ts       # Recomendações por contexto
│   │   ├── generateTips.ts                  # Macetes por plataforma
│   │   └── metricGuideData.ts               # Dicionário educacional de métricas
│   ├── constants.ts          # FILTERS, METRICS_CONFIG, nomes
│   ├── types.ts              # Tipos compartilhados
│   ├── utils.ts              # cn()
│   └── prisma.ts             # Prisma client singleton
└── store/
    └── useDiagnosticStore.ts # Estado do formulário (7 steps)
```

## Aurora Design System (Tokens)

```css
/* Cores base */
bg-[#0a0a0b]             /* fundo */
bg-white/[0.03-0.15]     /* cards e superfícies */
border-white/[0.06-0.15] /* bordas */

/* Efeitos */
.glass-card               /* rounded-[24px] + backdrop-blur + ::before gradiente */
.glass-card-sm            /* rounded-[16px] + backdrop-blur */

/* Utilitários */
.icon-box                 /* inline-flex h-9 w-9 rounded-[16px] border */
.pill-btn                 /* rounded-full px-2.5 py-1 text-[11px] */
.section-label            /* text-xs uppercase tracking-[0.14em] */

/* Animações */
animate-fadeIn            /* fadeIn 0.3s ease-out (opacity + translateY) */
```

## Fluxo do Diagnóstico (7 steps)

1. **Plataforma** → `SelectionGrid` com `PLATFORM_NAMES`
2. **Tipo Campanha** → filtrado por `FILTERS.platToTipo[platform]`
3. **Fase Funil** → filtrado por `FILTERS.tipoToFase[campaignType]`
4. **Estratégia Lance** → filtrado por `FILTERS.platToLeilao[platform]`
5. **Evento Conversão** → filtrado por `FILTERS.tipoToConv[campaignType]`
6. **Guia Métricas** → `MetricGuide` com cards educacionais (`metricGuideData.ts`)
7. **Revisar** → resumo + botão "Gerar Guia"

Store: `useDiagnosticStore` (Zustand) — `platform`, `campaignType`, `funnelStage`, `auctionModel`, `conversionEvent`

## Convenções de Código

- **className condicional**: sempre usar `cn()` de `@/lib/utils`
- **Componentes com interatividade**: `"use client"`
- **CSS**: Tailwind utility classes. Evitar CSS customizado.
- **Ícones**: Importar de `lucide-react`
- **Engine**: Funções puras, tipadas, sem efeitos colaterais
- **API routes**: Em `src/app/api/` (formato Next.js App Router)
- **Acessibilidade**: `aria-label` em botões sem texto, `focus-visible` outlines
