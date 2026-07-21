import type { Metadata } from "next";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Repor Password | Alexandra Fonseca — Coach Desportivo",
};

export default async function ResetPasswordPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  return (
    <div>
      <h1 className="font-display font-bold text-2xl mb-1">Repor password</h1>
      <p className="text-sm text-[#8493ab] mb-6">
        Escolhe uma nova password para a tua conta.
      </p>
      <ResetPasswordForm token={token} />
    </div>
  );
}
