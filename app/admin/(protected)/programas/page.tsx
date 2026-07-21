import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteProgram } from "@/lib/actions/programs";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function AdminProgramsPage() {
  const programs = await prisma.program.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { enrollments: true } } },
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-2xl mb-1">Programas</h1>
          <p className="text-sm text-[#3d4b63]">
            Gere os programas de coaching disponíveis.
          </p>
        </div>
        <Link
          href="/admin/programas/novo"
          className="px-5 py-2.5 rounded-full bg-performance-green text-navy font-semibold text-sm hover:bg-navy hover:text-white transition-colors"
        >
          Novo Programa
        </Link>
      </div>

      {programs.length === 0 ? (
        <div className="rounded-2xl bg-white border border-black/5 p-8 text-sm text-[#3d4b63]">
          Ainda não há programas criados.
        </div>
      ) : (
        <div className="rounded-2xl bg-white border border-black/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/5 text-left text-xs uppercase tracking-wide text-[#8493ab]">
                <th className="px-6 py-4 font-semibold">Nome</th>
                <th className="px-6 py-4 font-semibold">Duração</th>
                <th className="px-6 py-4 font-semibold">Preço</th>
                <th className="px-6 py-4 font-semibold">Inscrições</th>
                <th className="px-6 py-4 font-semibold">Estado</th>
                <th className="px-6 py-4 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {programs.map((program) => (
                <tr key={program.id} className="border-b border-black/5 last:border-0">
                  <td className="px-6 py-4 font-medium text-navy">{program.name}</td>
                  <td className="px-6 py-4 text-[#8493ab]">{program.durationWeeks} semanas</td>
                  <td className="px-6 py-4 text-[#8493ab]">
                    {(program.priceCents / 100).toLocaleString("pt-PT", {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </td>
                  <td className="px-6 py-4 text-[#8493ab]">{program._count.enrollments}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-semibold rounded-full px-3 py-1 ${
                        program.active
                          ? "bg-performance-green/15 text-performance-green-dark"
                          : "bg-black/5 text-[#8493ab]"
                      }`}
                    >
                      {program.active ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-4">
                      <Link
                        href={`/admin/programas/${program.id}`}
                        className="text-sm font-semibold text-electric hover:text-navy transition-colors"
                      >
                        Editar
                      </Link>
                      <DeleteButton
                        action={deleteProgram}
                        id={program.id}
                        confirmMessage={`Eliminar o programa "${program.name}"? Esta ação não pode ser desfeita.`}
                      />
                    </div>
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
