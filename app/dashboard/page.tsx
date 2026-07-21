import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const session = await auth();
  const userId = session!.user.id;

  const [enrollments, athleteProfile, nextWorkout, unreadCount] =
    await Promise.all([
      prisma.enrollment.findMany({
        where: { userId },
        include: { program: true },
        orderBy: { startDate: "desc" },
      }),
      prisma.athleteProfile.findUnique({ where: { userId } }),
      prisma.workout.findFirst({
        where: { enrollment: { userId }, completed: false },
        orderBy: { date: "asc" },
      }),
      prisma.message.count({
        where: { recipientId: userId, readAt: null },
      }),
    ]);

  const activeEnrollment = enrollments.find((e) => e.status === "ACTIVE");

  const stats = [
    {
      label: "Peso atual",
      value: athleteProfile?.weightKg ? `${athleteProfile.weightKg} kg` : "—",
      href: "/dashboard/avaliacoes",
    },
    {
      label: "Próximo treino",
      value: nextWorkout
        ? nextWorkout.date.toLocaleDateString("pt-PT", { day: "2-digit", month: "short" })
        : "—",
      href: "/dashboard/treinos",
    },
    {
      label: "Mensagens por ler",
      value: String(unreadCount),
      href: "/dashboard/mensagens",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="font-display font-bold text-2xl mb-2">
        Bem-vindo, {session!.user.name}
      </h1>
      <p className="text-sm text-[#3d4b63] mb-8">
        {activeEnrollment
          ? `Estás inscrito no programa ${activeEnrollment.program.name}.`
          : "Ainda não tens nenhum programa ativo."}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-2xl bg-white border border-black/5 p-6 hover:border-electric/40 transition-colors"
          >
            <div className="font-display font-bold text-2xl text-navy">
              {stat.value}
            </div>
            <div className="mt-1 text-sm text-[#8493ab]">{stat.label}</div>
          </Link>
        ))}
      </div>

      <h2 className="font-display font-bold text-lg mb-4">Os teus programas</h2>
      {enrollments.length === 0 ? (
        <div className="rounded-2xl bg-white border border-black/5 p-8 text-sm text-[#3d4b63]">
          Ainda não tens nenhum programa associado. Fala comigo para
          começarmos o teu plano.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {enrollments.map((enrollment) => (
            <div
              key={enrollment.id}
              className="rounded-2xl bg-white border border-black/5 p-6"
            >
              <span className="inline-flex w-fit items-center rounded-full bg-performance-green/15 px-3 py-1 text-xs font-semibold text-performance-green-dark mb-3">
                {enrollment.status === "ACTIVE" ? "Ativo" : enrollment.status}
              </span>
              <h3 className="font-display font-bold text-lg mb-1">
                {enrollment.program.name}
              </h3>
              <p className="text-sm text-[#8493ab]">
                Início em{" "}
                {enrollment.startDate.toLocaleDateString("pt-PT", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
