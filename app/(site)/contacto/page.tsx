import type { Metadata } from "next";
import { ContactForm } from "@/components/marketing/ContactForm";
import { PageHero } from "@/components/marketing/PageHero";

export const metadata: Metadata = {
  title: "Contacto | Alexandra Fonseca — Coach Desportivo",
  description:
    "Fala comigo para tirar dúvidas sobre os programas de coaching desportivo ou marcar a tua avaliação inicial.",
};

const contactDetails = [
  { label: "Email", value: "geral@alexandrafonseca.pt" },
  { label: "Telefone", value: "+351 910 000 000" },
  { label: "Localização", value: "Lisboa, Portugal" },
];

export default function ContactoPage() {
  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title="Vamos falar sobre os teus objetivos."
        subtitle="Preenche o formulário ou usa os contactos diretos abaixo — respondo o mais depressa possível."
      />
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display font-bold text-2xl mb-6">
              Envia uma mensagem
            </h2>
            <ContactForm />
          </div>
          <div>
            <h2 className="font-display font-bold text-2xl mb-6">
              Contactos diretos
            </h2>
            <ul className="space-y-4 mb-8">
              {contactDetails.map((detail) => (
                <li
                  key={detail.label}
                  className="rounded-xl bg-fog border border-black/5 px-5 py-4"
                >
                  <div className="text-xs font-semibold uppercase tracking-wide text-electric mb-1">
                    {detail.label}
                  </div>
                  <div className="text-navy font-medium">{detail.value}</div>
                </li>
              ))}
            </ul>
            <div className="relative aspect-4/3 rounded-2xl bg-gradient-to-br from-electric/10 to-performance-green/10 border border-black/5 flex items-center justify-center">
              <div className="text-center px-8">
                <div className="mx-auto w-14 h-14 rounded-full border-2 border-electric flex items-center justify-center mb-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-electric" />
                </div>
                <p className="text-[#3d4b63] text-sm">
                  [ mapa incorporado — localização do estúdio ]
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
