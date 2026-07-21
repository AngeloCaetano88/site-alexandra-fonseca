import { prisma } from "@/lib/prisma";

export default async function AdminReportsPage() {
  const [payments, enrollments, clients] = await Promise.all([
    prisma.payment.findMany({
      where: { status: "PAID" },
      include: { enrollment: { include: { program: true } } },
    }),
    prisma.enrollment.findMany({ include: { program: true, user: true } }),
    prisma.user.findMany({ where: { role: "CLIENT" } }),
  ]);

  const totalRevenueCents = payments.reduce((sum, p) => sum + p.amountCents, 0);

  const revenueByProgram = new Map<string, number>();
  for (const payment of payments) {
    const name = payment.enrollment?.program.name ?? "Outros";
    revenueByProgram.set(name, (revenueByProgram.get(name) ?? 0) + payment.amountCents);
  }
  const revenueRows = [...revenueByProgram.entries()].sort((a, b) => b[1] - a[1]);
  const maxRevenue = Math.max(...revenueRows.map(([, cents]) => cents), 1);

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const newClients = clients.filter((c) => c.createdAt >= thirtyDaysAgo).length;

  const statusCounts = enrollments.reduce<Record<string, number>>((acc, e) => {
    acc[e.status] = (acc[e.status] ?? 0) + 1;
    return acc;
  }, {});
  const nonCancelled = enrollments.filter((e) => e.status !== "CANCELLED").length;
  const retentionRate = enrollments.length
    ? Math.round((nonCancelled / enrollments.length) * 100)
    : 0;

  const enrollmentsByClient = new Map<string, number>();
  for (const e of enrollments) {
    enrollmentsByClient.set(e.userId, (enrollmentsByClient.get(e.userId) ?? 0) + 1);
  }
  const repeatClients = [...enrollmentsByClient.values()].filter((count) => count > 1).length;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="font-display font-bold text-2xl mb-1">Relatórios</h1>
      <p className="text-sm text-[#3d4b63] mb-8">Receita, adesão e retenção.</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="rounded-2xl bg-white border border-black/5 p-6">
          <div className="font-display font-bold text-2xl text-navy">
            {(totalRevenueCents / 100).toLocaleString("pt-PT", { style: "currency", currency: "EUR" })}
          </div>
          <div className="mt-1 text-sm text-[#8493ab]">Receita total</div>
        </div>
        <div className="rounded-2xl bg-white border border-black/5 p-6">
          <div className="font-display font-bold text-2xl text-navy">{clients.length}</div>
          <div className="mt-1 text-sm text-[#8493ab]">Clientes totais</div>
        </div>
        <div className="rounded-2xl bg-white border border-black/5 p-6">
          <div className="font-display font-bold text-2xl text-navy">{newClients}</div>
          <div className="mt-1 text-sm text-[#8493ab]">Novos (30 dias)</div>
        </div>
        <div className="rounded-2xl bg-white border border-black/5 p-6">
          <div className="font-display font-bold text-2xl text-navy">{retentionRate}%</div>
          <div className="mt-1 text-sm text-[#8493ab]">Retenção de inscrições</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-white border border-black/5 p-6">
          <h2 className="font-display font-bold text-lg mb-5">Receita por programa</h2>
          {revenueRows.length === 0 ? (
            <p className="text-sm text-[#8493ab]">Sem pagamentos registados.</p>
          ) : (
            <div className="space-y-4">
              {revenueRows.map(([name, cents]) => (
                <div key={name}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="font-medium text-navy">{name}</span>
                    <span className="text-[#8493ab]">
                      {(cents / 100).toLocaleString("pt-PT", { style: "currency", currency: "EUR" })}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-fog overflow-hidden">
                    <div
                      className="h-full bg-electric rounded-full"
                      style={{ width: `${(cents / maxRevenue) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl bg-white border border-black/5 p-6">
          <h2 className="font-display font-bold text-lg mb-5">Adesão e retenção</h2>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center justify-between">
              <span className="text-[#3d4b63]">Inscrições ativas</span>
              <span className="font-semibold text-navy">{statusCounts.ACTIVE ?? 0}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-[#3d4b63]">Inscrições concluídas</span>
              <span className="font-semibold text-navy">{statusCounts.COMPLETED ?? 0}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-[#3d4b63]">Em pausa</span>
              <span className="font-semibold text-navy">{statusCounts.PAUSED ?? 0}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-[#3d4b63]">Canceladas</span>
              <span className="font-semibold text-navy">{statusCounts.CANCELLED ?? 0}</span>
            </li>
            <li className="flex items-center justify-between pt-3 border-t border-black/5">
              <span className="text-[#3d4b63]">Clientes com mais de uma inscrição</span>
              <span className="font-semibold text-navy">{repeatClients}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
