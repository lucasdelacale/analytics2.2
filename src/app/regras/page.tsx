const rules = [
  {
    num: "I",
    title: "Nunca analise CPA por dia isolado",
    body: "Avalie sempre em janela de <strong>7 a 14 dias</strong> antes de qualquer decisão de lance.",
  },
  {
    num: "II",
    title: "Diagnostique antes de otimizar",
    body: "O problema é de <strong>campanha, criativo ou landing page?</strong> A maioria das otimizações erradas vai na direção certa, no lugar errado.",
  },
  {
    num: "III",
    title: "Uma variável por vez",
    body: "Nunca mude lance, criativo e audiência ao mesmo tempo. <strong>Você não vai saber o que funcionou.</strong>",
  },
  {
    num: "IV",
    title: "Incremente lances em no máximo 20%",
    body: "<strong>Ajustes de 15–20%</strong> são suficientes para mover o algoritmo sem forçar re-aprendizado.",
  },
  {
    num: "V",
    title: "Use o GA4 como árbitro",
    body: "Quando os números da plataforma não batem com o resultado real, <strong>o GA4 tem a resposta</strong>.",
  },
  {
    num: "VI",
    title: "CPA real abaixo do tCPA = escala disponível",
    body: "Algoritmo conservador é oportunidade. <strong>Aumente o tCPA proativamente</strong> e deixe ele buscar volume.",
  },
  {
    num: "VII",
    title: "Criativo é a maior alavanca no topo",
    body: "<strong>Nenhuma otimização de lance supera um bom criativo</strong> no Meta e TikTok.",
  },
  {
    num: "VIII",
    title: "Respeite o período de aprendizado",
    body: "Toda alteração significativa reinicia o aprendizado. <strong>Evite editar</strong> campanhas em aprendizado.",
  },
];

export default function RegrasPage() {
  return (
    <div className="space-y-6 fade-up">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Regras de Ouro
        </h1>
        <p className="text-sm text-neutral-400 mt-1">
          Princípios que evitam os erros mais comuns na análise diária.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rules.map((rule) => (
          <div
            key={rule.num}
            className="glass-card p-5 sm:p-6 flex items-start gap-4"
          >
            <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-cyan-500/30 to-cyan-600/10 border border-cyan-500/30 text-sm font-bold text-cyan-300">
              {rule.num}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-1.5 leading-snug">
                {rule.title}
              </h3>
              <p
                className="text-xs text-neutral-400 leading-relaxed [&_strong]:text-neutral-200"
                dangerouslySetInnerHTML={{ __html: rule.body }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
