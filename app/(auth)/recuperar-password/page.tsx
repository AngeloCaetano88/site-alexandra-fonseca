import type { Metadata } from "next";
import Link from "next/link";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Recuperar Password | Alexandra Fonseca — Coach Desportivo",
};

export default function ForgotPasswordPage() {
  return (
    <div>
      <h1 className="font-display font-bold text-2xl mb-1">Recuperar password</h1>
      <p className="text-sm text-[#8493ab] mb-6">
        Indica o teu email e enviamos-te um link para escolheres uma nova password.
      </p>
      <ForgotPasswordForm />
      <p className="mt-6 text-sm text-center text-[#3d4b63]">
        <Link href="/login" className="font-semibold text-electric hover:text-navy transition-colors">
          ← Voltar ao login
        </Link>
      </p>
    </div>
  );
}
