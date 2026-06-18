<p align="center">
  <img src="https://img.shields.io/badge/Next.js%2014-000000?logo=next.js&logoColor=white" alt="Next.js 14" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Zustand-443E38?logo=react&logoColor=white" alt="Zustand" />
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="MIT" />
</p>

<h1 align="center">Analytics Map</h1>

<p align="center">
  Plataforma inteligente de diagnóstico e otimização para campanhas de mídia performance.
  <br/>
  <a href="https://lucasdelacale.github.io/analytics2.0/"><strong>Acessar o app →</strong></a>
</p>

---

## Visão Geral

O **Analytics Map** é uma ferramenta educacional e estratégica para profissionais de marketing digital. Em vez de depender de inputs numéricos do usuário (que introduzem viés), o motor de decisão analisa exclusivamente o **contexto da campanha** — plataforma, tipo, funil, modelo de lance e evento de conversão — e gera um guia personalizado com:

- Métricas prioritárias para o cenário
- Checklist de verificação
- Sinais de alerta com níveis de severidade
- Recomendações priorizadas
- Macetes específicos por plataforma

Tudo isso com uma interface escura e sofisticada (Aurora Design System), 100% responsiva e acessível de qualquer dispositivo.

## Stack

| Camada      | Tecnologia                              |
|-------------|-----------------------------------------|
| Framework   | Next.js 14 (App Router)                 |
| Linguagem   | TypeScript                              |
| Estilo      | Tailwind CSS (Aurora Design System)     |
| Estado      | Zustand                                 |
| Ícones      | lucide-react                            |
| Fonte       | Satoshi (Fontshare CDN)                 |
| Deploy      | GitHub Pages (static export)            |

## Funcionalidades

- **Diagnóstico Contextual** — 7 passos de seleção que geram um guia completo sem inputs numéricos
- **Guia de Métricas** — Dicionário educacional com 10+ métricas, sinais de alerta e correlações
- **Checklist Inteligente** — Itens de verificação baseados na combinação plataforma × modelo × funil
- **Sinais de Alerta** — Riscos identificados automaticamente pela configuração da campanha
- **Recomendações Priorizadas** — Ações organizadas por gravidade (alta/média/baixa)
- **Macetes por Plataforma** — Dicas específicas para Google Ads, Meta Ads, TikTok Ads e DV360
- **Radar de Alertas** — 8 padrões de diagnóstico para monitoramento
- **Funil de Marketing** — Métricas e correlações por estágio do funil
- **Agentes IA** *(em breve)* — Assistentes especializados por plataforma com DeepSeek V4 Flash
- **Exportação** — Copiar ou baixar o guia como `.txt`

## Páginas

| Rota            | Descrição                                    |
|-----------------|----------------------------------------------|
| `/`             | Dashboard com visão geral e atalhos          |
| `/diagnostico`  | Motor de decisão em 7 passos                 |
| `/funil`        | Métricas e correlações por estágio do funil  |
| `/radar`        | 8 alertas com filtro de severidade           |
| `/plataformas`  | Macetes por plataforma (Google, Meta, TikTok) |
| `/ga4`          | Fluxo GA4 + tabela de diagnóstico rápido     |
| `/agente-ia`    | Agentes IA (status "Em breve")               |
| `/regras`       | 8 regras de ouro de mídia performance        |

## Aurora Design System

O design segue o sistema **Aurora** com tema escuro e glassmorphism:

- Fundo `#0a0a0b` com gradiente radial sutil
- Cards com `backdrop-blur` e bordas translúcidas
- Cantos arredondados (`rounded-3xl` / `rounded-[24px]`)
- Tons ciano como cor de destaque (`#06b6d4`)
- Animações suaves de entrada (`fadeIn`)
- Foco visível para acessibilidade (`focus-visible`)

## Rodando localmente

```bash
# Clone o repositório
git clone https://github.com/lucasdelacale/analytics2.0.git
cd analytics2.0

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

### Build estático

```bash
npm run build
# A pasta out/ contém os arquivos estáticos
```

## Licença

MIT &mdash; sinta-se à vontade para usar, modificar e compartilhar.
