import { Reveal } from "./Reveal";
import { SectionEyebrow } from "./SectionEyebrow";
import { ServiceCard } from "./ServiceCard";
import { services } from "./data";

export function ServicesSection() {
  return (
    <section id="servicos" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <SectionEyebrow>Serviços</SectionEyebrow>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-14 max-w-xl">
            Um caminho para cada objetivo.
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}
