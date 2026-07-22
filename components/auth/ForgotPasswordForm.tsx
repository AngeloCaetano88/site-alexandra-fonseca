"use client";

import { useState, type FormEvent } from "react";

export function ForgotPasswordForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: formData.get("email") }),
    });
    const data = await res.json().catch(() => ({}));

    setLoading(false);
    setMessage(
      data.message ??
        "Se existir uma conta com este email, vais receber um link para repor a password."
    );
  }

  if (message) {
    return (
      <div className="rounded-xl bg-fog border border-black/5 px-4 py-4 text-sm text-[#3d4b63]">
        {message}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-navy mb-2">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoCapitalize="none"
          autoCorrect="off"
          autoComplete="email"
          spellCheck={false}
          className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-navy placeholder:text-[#8493ab] focus:outline-none focus:ring-2 focus:ring-electric"
          placeholder="tu@email.com"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-performance-green text-navy font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-navy hover:text-white disabled:opacity-50"
      >
        {loading ? "A enviar…" : "Enviar Link de Recuperação"}
      </button>
    </form>
  );
}
