import Image from "next/image";
import { Reveal } from "./Reveal";
import { SectionEyebrow } from "./SectionEyebrow";

export function About() {
  return (
    <section id="sobre" className="bg-fog pt-4 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <Reveal>
          <SectionEyebrow>Sobre mim</SectionEyebrow>
          <h2 className="font-display font-bold text-3xl md:text-4xl leading-tight mb-6">
            Mais de uma década a preparar corpos e mentes para competir.
          </h2>
          <div className="relative aspect-4/5 rounded-2xl overflow-hidden border border-black/10">
            <Image
              src="/images/alexandra-fonseca.jpg"
              alt="Alexandra Fonseca"
              fill
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
