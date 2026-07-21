import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const statusLabels: Record<string, string> = {
  PENDING: "Pendente",
  PAID: "Pago",
  FAILED: "Falhou",
  REFUNDED: "Reembolsado",
};

const statusStyles: Record<string, string> = {
  PENDING: "bg-fog text-[#8493ab]",
  PAID: "bg-performance-green/15 text-performance-green-dark",
  FAILED: "bg-red-50 text-red-600",
  REFUNDED: "bg-electric/10 text-electric",
};

export default async function PagamentosPage() {
  const session = await auth();
  const userId = session!.user.id;

  const payments = await prisma.payment.findMany({
    where: { enrollment: { userId } },
    orderBy: { createdAt: "desc" },
    include: { enrollment: { include: { program: true } } },
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="font-display font-bold text-2xl mb-2">Pagamentos</h1>
      <p className="text-sm text-[#3d4b63] mb-8">
        Histórico de pagamentos associados aos teus programas.
      </p>

      {payments.length === 0 ? (
        <div className="rounded-2xl bg-white border border-black/5 p-8 text-sm text-[#3d4b63]">
          Ainda não há pagamentos registados.
        </div>
      ) : (
        <div className="rounded-2xl bg-white border border-black/5 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/5 text-left text-xs uppercase tracking-wide text-[#8493ab]">
                <th className="px-6 py-4 font-semibold">Programa</th>
                <th className="px-6 py-4 font-semibold">Data</th>
                <th className="px-6 py-4 font-semibold">Método</th>
                <th className="px-6 py-4 font-semibold">Estado</th>
                <th className="px-6 py-4 font-semibold text-right">Valor</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="border-b border-black/5 last:border-0">
                  <td className="px-6 py-4 font-medium text-navy">
                    {payment.enrollment?.program.name ?? "—"}
                  </td>
                  <td className="px-6 py-4 text-[#8493ab]">
                    {payment.createdAt.toLocaleDateString("pt-PT", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 text-[#8493ab]">{payment.method}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-semibold rounded-full px-3 py-1 ${statusStyles[payment.status]}`}
                    >
                      {statusLabels[payment.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-navy">
                    {(payment.amountCents / 100).toLocaleString("pt-PT", {
                      style: "currency",
                      currency: payment.currency,
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
