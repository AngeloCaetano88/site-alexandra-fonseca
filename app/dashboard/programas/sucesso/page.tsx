import Link from "next/link";
import { reconcileCheckoutSession } from "@/lib/checkout";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;

  if (!sessionId) {
    return (
      <div className="max-w-xl mx-auto px-6 py-16 text-center">
        <h1 className="font-display font-bold text-2xl mb-2">Sessão inválida</h1>
        <Link href="/dashboard/programas" className="text-electric font-semibold">
          ← Voltar aos programas
        </Link>
      </div>
    );
  }

  const result = await reconcileCheckoutSession(sessionId);
  const success = result.status === "reconciled" || result.status === "already_reconciled";

  return (
    <div className="max-w-xl mx-auto px-6 py-16 text-center">
      <div
        className={`mx-auto w-14 h-14 rounded-full flex items-center justify-center mb-5 ${
          success ? "bg-performance-green/15" : "bg-red-50"
        }`}
      >
        <span className={`text-2xl ${success ? "text-performance-green" : "text-red-600"}`}>
          {success ? "✓" : "!"}
        </span>
      </div>
      <h1 className="font-display font-bold text-2xl mb-2">
        {success ? "Pagamento confirmado" : "Não foi possível confirmar o pagamento"}
      </h1>
      <p className="text-sm text-[#3d4b63] mb-8">
        {success
          ? "A tua inscrição foi ativada. Já podes ver o teu novo programa na área de cliente."
          : "Se o valor foi debitado, contacta-nos para confirmarmos manualmente."}
      </p>
      <Link
        href="/dashboard"
        className="inline-flex px-6 py-3 rounded-full bg-performance-green text-navy font-semibold text-sm hover:bg-navy hover:text-white transition-colors"
      >
        Ir para a minha área
      </Link>
    </div>
  );
}
