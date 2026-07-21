"use client";

import { useState, type FormEvent } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      setError(data.error ?? "Não foi possível subscrever.");
      setStatus("error");
      return;
    }

    setStatus("done");
  }

  if (status === "done") {
    return (
      <p className="text-sm font-semibold text-performance-green">
        Subscrito! Vais receber os próximos artigos por email.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="O teu email"
        className="flex-1 rounded-full border border-black/10 bg-white px-5 py-3 text-sm text-navy placeholder:text-[#8493ab] focus:outline-none focus:ring-2 focus:ring-electric"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="px-6 py-3 rounded-full bg-performance-green text-navy font-semibold text-sm hover:bg-navy hover:text-white transition-colors disabled:opacity-50 shrink-0"
      >
        {status === "loading" ? "A subscrever…" : "Subscrever"}
      </button>
      {error && <p className="text-xs text-red-600 sm:col-span-2">{error}</p>}
    </form>
  );
}
