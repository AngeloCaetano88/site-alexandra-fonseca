import type { Metadata } from "next";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import { GlassButton } from "@/components/marketing/GlassButton";
import { PageHero } from "@/components/marketing/PageHero";
import { faqs } from "@/components/marketing/faq-data";

export const metadata: Metadata = {
  title: "FAQ | Alexandra Fonseca — Coach Desportivo",
  description:
    "Perguntas frequentes sobre os programas de coaching desportivo, avaliações e pagamentos.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Perguntas frequentes."
        subtitle="Tudo o que precisas de saber antes de marcares a tua avaliação inicial."
      />
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <FaqAccordion faqs={faqs} />
        </div>
      </section>
      <section className="bg-fog py-20 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display font-bold text-2xl md:text-3xl mb-4">
            Ainda tens dúvidas?
          </h2>
          <p className="text-[#3d4b63] mb-8">
            Fala diretamente comigo através do formulário de contacto ou marca
            já a tua avaliação inicial.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <GlassButton href="/calendario">Marcar Avaliação</GlassButton>
          </div>
        </div>
      </section>
    </>
  );
}
