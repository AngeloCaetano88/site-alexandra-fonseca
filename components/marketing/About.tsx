import Image from "next/image";
import { Reveal } from "./Reveal";
import { SectionEyebrow } from "./SectionEyebrow";
import { skills } from "./data";

export function About() {
  return (
    <section id="sobre" className="bg-fog pt-4 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <Reveal>
            <div className="flex items-center gap-5 mb-6">
              <Image
                src="/images/alexandra-fonseca.jpg"
                alt="Alexandra Fonseca"
                width={96}
                height={96}
                className="w-24 h-24 rounded-full object-cover border-2 border-performance-green shrink-0"
              />
              <div>
                <SectionEyebrow>Sobre mim</SectionEyebrow>
              </div>
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl leading-tight mb-6">
              Mais de uma década a preparar corpos e mentes para competir.
            </h2>
            <p className="text-[#3d4b63] leading-relaxed mb-4">
              Trabalho com atletas individuais e equipas na construção de
              planos de treino baseados em dados, não em suposições. A missão
              é simples: cada sessão aproxima-te do teu melhor desempenho, de
              forma segura e sustentável.
            </p>
            <p className="text-[#3d4b63] leading-relaxed">
              Valorizo o rigor técnico, a comunicação próxima e a evolução
              mensurável — três pilares que se refletem em cada programa.
            </p>
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
