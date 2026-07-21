import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminClientsPage() {
  const clients = await prisma.user.findMany({
    where: { role: "CLIENT" },
    orderBy: { name: "asc" },
    include: {
      enrollments: {
        where: { status: "ACTIVE" },
        include: { program: true },
        take: 1,
      },
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="font-display font-bold text-2xl mb-1">Clientes</h1>
      <p className="text-sm text-[#3d4b63] mb-8">
        {clients.length} cliente{clients.length !== 1 ? "s" : ""} registado
        {clients.length !== 1 ? "s" : ""}.
      </p>

      {clients.length === 0 ? (
        <div className="rounded-2xl bg-white border border-black/5 p-8 text-sm text-[#3d4b63]">
          Ainda não há clientes registados.
        </div>
      ) : (
        <div className="rounded-2xl bg-white border border-black/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/5 text-left text-xs uppercase tracking-wide text-[#8493ab]">
                <th className="px-6 py-4 font-semibold">Nome</th>
                <th className="px-6 py-4 font-semibold">Email</th>
                <th className="px-6 py-4 font-semibold">Telefone</th>
                <th className="px-6 py-4 font-semibold">Programa ativo</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className="border-b border-black/5 last:border-0">
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/clientes/${client.id}`}
                      className="font-medium text-navy hover:text-electric transition-colors"
                    >
                      {client.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-[#8493ab]">{client.email}</td>
                  <td className="px-6 py-4 text-[#8493ab]">{client.phone ?? "—"}</td>
                  <td className="px-6 py-4 text-[#8493ab]">
                    {client.enrollments[0]?.program.name ?? "—"}
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
