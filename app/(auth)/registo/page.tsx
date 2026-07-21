import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Criar Conta | Alexandra Fonseca — Coach Desportivo",
};

export default function RegisterPage() {
  return (
    <div>
      <h1 className="font-display font-bold text-2xl mb-1">Criar conta</h1>
      <p className="text-sm text-[#8493ab] mb-6">
        Regista-te para acompanhares o teu plano de treino.
      </p>
      <RegisterForm />
      <p className="mt-6 text-sm text-center text-[#3d4b63]">
        Já tens conta?{" "}
        <Link href="/login" className="font-semibold text-electric hover:text-navy transition-colors">
          Entrar
        </Link>
      </p>
    </div>
  );
}
