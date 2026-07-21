import { Reveal } from "./Reveal";
import { SectionEyebrow } from "./SectionEyebrow";
import { ResultCard } from "./ResultCard";
import { results } from "./data";

export function ResultsSection() {
  return (
    <section id="resultados" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <SectionEyebrow>Resultados</SectionEyebrow>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-14 max-w-xl">
            A evolução medida, sessão após sessão.
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {results.map((result, i) => (
            <ResultCard key={result.label} result={result} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}
