import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/PageHero";

export const metadata: Metadata = {
  title: "Política de Privacidade | Alexandra Fonseca — Coach Desportivo",
  description: "Política de privacidade e utilização de cookies (RGPD).",
};

const sections = [
  {
    title: "1. Responsável pelo tratamento",
    body: "Alexandra Fonseca é a responsável pelo tratamento dos dados pessoais recolhidos através deste website, nos termos do Regulamento Geral sobre a Proteção de Dados (RGPD).",
  },
  {
    title: "2. Dados recolhidos",
    body: "Recolhemos apenas os dados que fornece diretamente através dos formulários de contacto e marcação (nome, email, telefone) e dados de navegação através de cookies de análise, descritos na secção 4.",
  },
  {
    title: "3. Finalidade do tratamento",
    body: "Os dados são utilizados exclusivamente para responder a pedidos de contacto, gerir marcações de avaliações e sessões, e enviar comunicações relacionadas com os serviços de coaching desportivo — nunca são vendidos ou partilhados com terceiros para fins de marketing.",
  },
  {
    title: "4. Cookies",
    body: "Este site utiliza cookies essenciais ao funcionamento e cookies de análise para compreender como o site é utilizado. Podes aceitar ou recusar os cookies não essenciais através do banner apresentado na tua primeira visita, e alterar a tua escolha a qualquer momento, bastando limpar os dados de navegação do teu navegador.",
  },
  {
    title: "5. Os teus direitos",
    body: "Tens direito a aceder, corrigir, apagar ou solicitar a portabilidade dos teus dados pessoais a qualquer momento, bem como a retirar o consentimento dado. Para exercer estes direitos, contacta-nos através da página de Contacto.",
  },
  {
    title: "6. Retenção de dados",
    body: "Os dados são conservados apenas pelo tempo necessário para cumprir as finalidades descritas nesta política, ou enquanto durar a relação de acompanhamento connosco.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="RGPD"
        title="Política de Privacidade e Cookies"
        subtitle="Como recolhemos, usamos e protegemos os teus dados pessoais."
      />
      <section className="bg-white py-20">
        <div className="max-w-2xl mx-auto px-6 space-y-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="font-display font-bold text-xl mb-3">
                {section.title}
              </h2>
              <p className="text-[#3d4b63] leading-relaxed">{section.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
