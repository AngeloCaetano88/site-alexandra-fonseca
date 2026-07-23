import { Reveal } from "./Reveal";
import { SectionEyebrow } from "./SectionEyebrow";
import { skills } from "./data";

export function About() {
  return (
    <section id="sobre" className="bg-fog pt-4 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <Reveal>
            <SectionEyebrow>Sobre mim</SectionEyebrow>
            <h2 className="font-display font-bold text-3xl md:text-4xl leading-tight mb-6">
              Mais de uma década a preparar corpos e mentes para competir.
            </h2>
            <div className="relative aspect-4/5 rounded-2xl bg-gradient-to-br from-electric/30 to-performance-green/10 border border-black/10 flex items-center justify-center">
              <div className="text-center px-8">
                <div className="mx-auto w-16 h-16 rounded-full border-2 border-performance-green flex items-center justify-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-performance-green" />
                </div>
                <p className="text-[#5c6b84] text-sm">
                  [ espaço para fotografia / vídeo de treino de alta performance ]
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill) => (
                <div
                  key={skill}
                  className="rounded-xl bg-white border border-black/5 px-5 py-4 text-sm font-semibold text-navy shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  {skill}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
