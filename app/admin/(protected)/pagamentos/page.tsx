import { prisma } from "@/lib/prisma";
import { updatePaymentStatus } from "@/lib/actions/payments";
import { StatusSelectForm } from "@/components/admin/StatusSelectForm";

const statusOptions = [
  { value: "PENDING", label: "Pendente" },
  { value: "PAID", label: "Pago" },
  { value: "FAILED", label: "Falhou" },
  { value: "REFUNDED", label: "Reembolsado" },
];

export default async function AdminPaymentsPage() {
  const payments = await prisma.payment.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      enrollment: { include: { program: true, user: true } },
      booking: true,
    },
  });

  const totalPaidCents = payments
    .filter((p) => p.status === "PAID")
    .reduce((sum, p) => sum + p.amountCents, 0);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="font-display font-bold text-2xl mb-1">Pagamentos</h1>
      <p className="text-sm text-[#3d4b63] mb-6">
        Histórico de pagamentos de clientes e marcações.
      </p>

      <div className="rounded-2xl bg-white border border-black/5 p-6 mb-8 max-w-xs">
        <div className="font-display font-bold text-2xl text-navy">
          {(totalPaidCents / 100).toLocaleString("pt-PT", { style: "currency", currency: "EUR" })}
        </div>
        <div className="mt-1 text-sm text-[#8493ab]">Total recebido</div>
      </div>

      {payments.length === 0 ? (
        <div className="rounded-2xl bg-white border border-black/5 p-8 text-sm text-[#3d4b63]">
          Ainda não há pagamentos registados.
        </div>
      ) : (
        <div className="rounded-2xl bg-white border border-black/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/5 text-left text-xs uppercase tracking-wide text-[#8493ab]">
                <th className="px-6 py-4 font-semibold">Cliente</th>
                <th className="px-6 py-4 font-semibold">Referente a</th>
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
                    {payment.enrollment?.user.name ?? payment.booking?.name ?? "—"}
                  </td>
                  <td className="px-6 py-4 text-[#8493ab]">
                    {payment.enrollment?.program.name ?? payment.booking?.service ?? "—"}
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
                    <StatusSelectForm
                      action={updatePaymentStatus}
                      id={payment.id}
                      status={payment.status}
                      options={statusOptions}
                    />
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
        </div>
      )}
    </div>
  );
}
