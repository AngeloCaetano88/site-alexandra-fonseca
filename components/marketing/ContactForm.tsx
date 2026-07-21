"use client";

import { useState, type FormEvent } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-black/5 bg-fog p-8 text-center">
        <div className="mx-auto w-12 h-12 rounded-full bg-performance-green/15 flex items-center justify-center mb-4">
          <span className="text-performance-green-dark text-xl">✓</span>
        </div>
        <h3 className="font-display font-bold text-xl mb-2">Mensagem enviada</h3>
        <p className="text-sm text-[#3d4b63]">
          Obrigada pelo contacto. Respondo o mais brevemente possível.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-navy mb-2">
            Nome
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-navy placeholder:text-[#8493ab] focus:outline-none focus:ring-2 focus:ring-electric"
            placeholder="O teu nome"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-navy mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-navy placeholder:text-[#8493ab] focus:outline-none focus:ring-2 focus:ring-electric"
            placeholder="tu@email.com"
          />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-semibold text-navy mb-2">
          Assunto
        </label>
        <select
          id="subject"
          name="subject"
          className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-electric"
          defaultValue="Coaching Individual"
        >
          <option>Coaching Individual</option>
          <option>Coaching Online</option>
          <option>Equipas</option>
          <option>Outro assunto</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-navy mb-2">
          Mensagem
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-navy placeholder:text-[#8493ab] focus:outline-none focus:ring-2 focus:ring-electric resize-none"
          placeholder="Conta-me um pouco sobre os teus objetivos…"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-performance-green text-navy font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-navy hover:text-white"
      >
        Enviar Mensagem
      </button>
    </form>
  );
}
