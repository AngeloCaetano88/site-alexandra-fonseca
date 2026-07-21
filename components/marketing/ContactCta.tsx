import { GlassButton } from "./GlassButton";
import { Reveal } from "./Reveal";

export function ContactCta() {
  return (
    <section id="contacto" className="bg-navy py-24 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(0,200,83,0.25), transparent 50%)",
        }}
      />
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <Reveal>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
            Pronto para o próximo nível?
          </h2>
          <p className="text-[#c9d6ea] mb-10">
            Marca uma avaliação inicial e desenha, comigo, o teu plano de
            performance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <GlassButton href="/calendario">Marcar Avaliação</GlassButton>
            <GlassButton variant="outline" href="/contacto">
              Contacto Direto
            </GlassButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
