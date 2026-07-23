import { GlassButton } from "./GlassButton";
import { Reveal } from "./Reveal";
import { Stat } from "./Stat";

export function Hero() {
  return (
    <section className="relative pt-16 bg-navy overflow-hidden">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(21,101,192,0.5), transparent 55%), radial-gradient(circle at 10% 80%, rgba(0,200,83,0.25), transparent 45%)",
        }}
      />
      <div className="relative max-w-3xl mx-auto px-6 pt-24 pb-32 text-center">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-performance-green mb-5">
            Preparação física de alto rendimento
          </p>
          <h1 className="font-display font-extrabold text-white text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.08] tracking-tight">
            Transforma o teu potencial em resultados.
          </h1>
          <p className="mt-6 text-lg text-[#c9d6ea] max-w-md mx-auto leading-relaxed">
            Treino personalizado para atletas, equipas e pessoas que procuram
            excelência física e mental.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <GlassButton href="/calendario">Marcar Avaliação</GlassButton>
            <GlassButton variant="outline" href="/#servicos">
              Conhecer Serviços
            </GlassButton>
          </div>
        </Reveal>
      </div>

      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          <Stat value={200} suffix="+" label="Atletas acompanhados" delay={0} />
          <Stat value={10} suffix="+" label="Anos de experiência" delay={100} />
          <Stat value={95} suffix="%" label="Satisfação" delay={200} />
          <Stat value={500} suffix="+" label="Sessões realizadas" delay={300} />
        </div>
      </div>
    </section>
  );
}
