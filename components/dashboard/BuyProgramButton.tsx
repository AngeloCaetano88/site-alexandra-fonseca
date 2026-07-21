"use client";

import { useState } from "react";

export function BuyProgramButton({ programId }: { programId: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ programId }),
    });
    const data = await res.json().catch(() => ({}));

    if (!res.ok || !data.url) {
      setError(data.error ?? "Não foi possível iniciar o pagamento.");
      setLoading(false);
      return;
    }

    window.location.href = data.url;
  }

  return (
    <div>
      {error && <p className="text-xs text-red-600 mb-2">{error}</p>}
      <button
        onClick={handleClick}
        disabled={loading}
        className="px-5 py-2.5 rounded-full bg-performance-green text-navy font-semibold text-sm hover:bg-navy hover:text-white transition-colors disabled:opacity-50"
      >
        {loading ? "A abrir pagamento…" : "Comprar Programa"}
      </button>
    </div>
  );
}
