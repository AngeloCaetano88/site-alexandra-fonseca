import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { hasStripe } from "@/lib/stripe";
import { BuyProgramButton } from "@/components/dashboard/BuyProgramButton";

export default async function DashboardProgramsPage({
  searchParams,
}: {
  searchParams: Promise<{ canceled?: string }>;
}) {
  const session = await auth();
  const userId = session!.user.id;
  const { canceled } = await searchParams;

  const [programs, enrollments] = await Promise.all([
    prisma.program.findMany({ where: { active: true }, orderBy: { priceCents: "asc" } }),
    prisma.enrollment.findMany({
      where: { userId, status: { in: ["ACTIVE", "COMPLETED"] } },
    }),
  ]);

  const enrolledProgramIds = new Set(enrollments.map((e) => e.programId));

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="font-display font-bold text-2xl mb-2">Programas</h1>
      <p className="text-sm text-[#3d4b63] mb-8">
        Escolhe o programa que melhor se adapta aos teus objetivos.
      </p>

      {canceled && (
        <div className="mb-6 rounded-xl bg-fog border border-black/5 px-4 py-3 text-sm text-[#3d4b63]">
          Pagamento cancelado — podes tentar novamente quando quiseres.
        </div>
      )}

      {!hasStripe && (
        <div className="mb-6 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          Pagamentos por cartão ainda não estão configurados neste ambiente.
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {programs.map((program) => {
          const alreadyEnrolled = enrolledProgramIds.has(program.id);
          return (
            <div key={program.id} className="rounded-2xl bg-white border border-black/5 p-6">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="font-display font-bold text-lg">{program.name}</h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-electric/10 text-electric font-semibold">
                  {program.durationWeeks} semanas
                </span>
              </div>
              <p className="text-sm text-[#8493ab] mb-4">{program.description}</p>
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-navy text-xl">
                  {(program.priceCents / 100).toLocaleString("pt-PT", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </span>
                {alreadyEnrolled ? (
                  <span className="text-xs font-semibold rounded-full px-3 py-1.5 bg-performance-green/15 text-performance-green-dark">
                    Já inscrito
                  </span>
                ) : hasStripe ? (
                  <BuyProgramButton programId={program.id} />
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
