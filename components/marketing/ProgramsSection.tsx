import { Reveal } from "./Reveal";
import { SectionEyebrow } from "./SectionEyebrow";
import { ProgramCard } from "./ProgramCard";
import { programs } from "./data";

export function ProgramsSection() {
  return (
    <section id="programas" className="bg-navy pt-4 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <SectionEyebrow>Programas</SectionEyebrow>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-14 max-w-xl">
            Blocos de treino estruturados, com início e fim definidos.
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-5">
          {programs.map((program, i) => (
            <ProgramCard key={program.name} program={program} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
