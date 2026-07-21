"use client";

import { useEffect, useState } from "react";
import { Reveal } from "./Reveal";
import { SectionEyebrow } from "./SectionEyebrow";
import { testimonials } from "./data";

export function TestimonialSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setActive((i) => (i + 1) % testimonials.length),
      5000
    );
    return () => clearInterval(id);
  }, []);

  const current = testimonials[active];

  return (
    <section className="bg-fog py-24">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <Reveal>
          <SectionEyebrow>Testemunhos</SectionEyebrow>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-4 min-h-[160px] flex flex-col justify-center">
            <div aria-hidden="true" className="text-performance-green-dark text-lg mb-4">
              ★★★★★
            </div>
            <span className="sr-only">Avaliação: 5 de 5 estrelas</span>
            <p className="font-display text-xl md:text-2xl leading-snug text-navy mb-6">
              &ldquo;{current.quote}&rdquo;
            </p>
            <p className="text-sm font-semibold text-[#3d4b63]">
              {current.name}
              <span className="font-normal text-[#8493ab]"> · {current.sport}</span>
            </p>
          </div>
        </Reveal>
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              onClick={() => setActive(i)}
              aria-label={`Testemunho ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === active ? "w-6 bg-performance-green-dark" : "w-2 bg-black/15"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
