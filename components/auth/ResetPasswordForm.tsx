"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("As passwords não coincidem.");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    const data = await res.json().catch(() => ({}));

    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Não foi possível repor a password.");
      return;
    }

    setSuccess(true);
    setTimeout(() => router.push("/login"), 2000);
  }

  if (success) {
    return (
      <div className="rounded-xl bg-fog border border-black/5 px-4 py-4 text-sm text-[#3d4b63]">
        Password atualizada com sucesso. A redirecionar para o login…
      </div>
    );
  }

  return (
    <div>
      {error && (
        <div className="mb-5 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}{" "}
          {error.includes("expirou") && (
            <Link href="/recuperar-password" className="underline font-semibold">
              Pedir novo link
            </Link>
          )}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-navy mb-2">
            Nova password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-navy placeholder:text-[#8493ab] focus:outline-none focus:ring-2 focus:ring-electric"
            placeholder="Mínimo 8 caracteres"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-semibold text-navy mb-2">
            Confirmar password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            minLength={8}
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-navy placeholder:text-[#8493ab] focus:outline-none focus:ring-2 focus:ring-electric"
            placeholder="Repete a password"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-performance-green text-navy font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-navy hover:text-white disabled:opacity-50"
        >
          {loading ? "A guardar…" : "Repor Password"}
        </button>
      </form>
    </div>
  );
}
