import { About } from "@/components/marketing/About";
import { ContactCta } from "@/components/marketing/ContactCta";
import { Hero } from "@/components/marketing/Hero";
import { JsonLd } from "@/components/marketing/JsonLd";
import { LaneSeam } from "@/components/marketing/LaneSeam";
import { ProgramsSection } from "@/components/marketing/ProgramsSection";
import { ResultsSection } from "@/components/marketing/ResultsSection";
import { ServicesSection } from "@/components/marketing/ServicesSection";
import { TestimonialSlider } from "@/components/marketing/TestimonialSlider";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Alexandra Fonseca — Coach Desportivo",
  description:
    "Coaching desportivo profissional com o método 80/20 — planos de treino, avaliações e acompanhamento personalizado.",
  url: SITE_URL,
  areaServed: "PT",
  founder: {
    "@type": "Person",
    name: "Alexandra Fonseca",
    jobTitle: "Coach Desportivo",
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <Hero />
      <LaneSeam />
      <About />
      <ServicesSection />
      <LaneSeam flip />
      <ProgramsSection />
      <ResultsSection />
      <TestimonialSlider />
      <ContactCta />
    </>
  );
}
