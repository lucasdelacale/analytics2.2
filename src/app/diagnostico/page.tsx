import { DiagnosticForm } from "@/components/diagnostico/DiagnosticForm";

export default function DiagnosticoPage() {
  return (
    <div className="space-y-6 fade-up">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Diagnóstico
        </h1>
        <p className="text-sm text-neutral-400 mt-1">
          Tomador de Decisão — responda 7 passos para diagnosticar sua campanha
          de mídia performance
        </p>
      </div>
      <DiagnosticForm />
    </div>
  );
}
