"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export function LoginForm({
  portal,
  googleEnabled,
  redirectTo,
}: {
  portal: "client" | "admin";
  googleEnabled: boolean;
  redirectTo: string;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      portal,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError(
        portal === "admin"
          ? "Credenciais inválidas ou esta conta não tem acesso de administrador."
          : "Email ou password incorretos."
      );
      return;
    }

    router.push(redirectTo);
    router.refresh();
  }

  return (
    <div>
      {error && (
        <div className="mb-5 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}
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
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-navy placeholder:text-[#8493ab] focus:outline-none focus:ring-2 focus:ring-electric"
            placeholder="tu@email.com"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="password" className="block text-sm font-semibold text-navy">
              Password
            </label>
            {portal === "client" && (
              <Link
                href="/recuperar-password"
                className="text-xs font-semibold text-electric hover:text-navy transition-colors"
              >
                Esqueceste-te?
              </Link>
            )}
          </div>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-navy placeholder:text-[#8493ab] focus:outline-none focus:ring-2 focus:ring-electric"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-performance-green text-navy font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-navy hover:text-white disabled:opacity-50"
        >
          {loading ? "A entrar…" : "Entrar"}
        </button>
      </form>

      {googleEnabled && portal === "client" && (
        <>
          <div className="my-6 flex items-center gap-3 text-xs text-[#8493ab]">
            <span className="h-px flex-1 bg-black/10" />
            ou
            <span className="h-px flex-1 bg-black/10" />
          </div>
          <button
            onClick={() => signIn("google", { redirectTo })}
            className="w-full inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-black/10 text-sm font-semibold text-navy hover:bg-fog transition-colors"
          >
            Entrar com Google
          </button>
        </>
      )}
    </div>
  );
}
