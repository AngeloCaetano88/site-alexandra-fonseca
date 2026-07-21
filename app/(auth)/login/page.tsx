import type { Metadata } from "next";
import Link from "next/link";
import { hasGoogleAuth } from "@/auth";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Entrar | Alexandra Fonseca — Coach Desportivo",
};

export default function LoginPage() {
  return (
    <div>
      <h1 className="font-display font-bold text-2xl mb-1">Entrar</h1>
      <p className="text-sm text-[#8493ab] mb-6">
        Acede ao teu plano, treinos e avaliações.
      </p>
      <LoginForm portal="client" googleEnabled={hasGoogleAuth} redirectTo="/dashboard" />
      <p className="mt-6 text-sm text-center text-[#3d4b63]">
        Ainda não tens conta?{" "}
        <Link href="/registo" className="font-semibold text-electric hover:text-navy transition-colors">
          Criar conta
        </Link>
      </p>
    </div>
  );
}
