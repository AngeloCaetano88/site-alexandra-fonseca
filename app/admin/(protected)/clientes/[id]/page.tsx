import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateClientProfile, createEnrollment, updateEnrollmentStatus } from "@/lib/actions/clients";
import { createWorkout, deleteWorkout, toggleWorkoutCompleted } from "@/lib/actions/workouts";
import { createEvaluation, deleteEvaluation } from "@/lib/actions/evaluations";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { StatusSelectForm } from "@/components/admin/StatusSelectForm";
import { ToggleCompletedForm } from "@/components/admin/ToggleCompletedForm";

const enrollmentStatusOptions = [
  { value: "ACTIVE", label: "Ativo" },
  { value: "COMPLETED", label: "Concluído" },
  { value: "PAUSED", label: "Em pausa" },
  { value: "CANCELLED", label: "Cancelado" },
];

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [client, programs] = await Promise.all([
    prisma.user.findUnique({
      where: { id, role: "CLIENT" },
      include: {
        athleteProfile: { include: { evaluations: { orderBy: { date: "desc" } } } },
        enrollments: {
          orderBy: { startDate: "desc" },
          include: { program: true, workouts: { orderBy: { date: "asc" } }, payments: true },
        },
      },
    }),
    prisma.program.findMany({ where: { active: true }, orderBy: { name: "asc" } }),
  ]);

  if (!client) notFound();

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <Link href="/admin/clientes" className="text-sm font-semibold text-electric hover:text-navy transition-colors">
        ← Clientes
      </Link>
      <h1 className="font-display font-bold text-2xl mt-2 mb-8">{client.name}</h1>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="rounded-2xl bg-white border border-black/5 p-6">
          <h2 className="font-display font-bold text-lg mb-4">Perfil</h2>
          <form action={updateClientProfile} className="space-y-4">
            <input type="hidden" name="userId" value={client.id} />
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-navy mb-2">Nome</label>
              <input
                id="name"
                name="name"
                required
                defaultValue={client.name}
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-electric"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy mb-2">Email</label>
              <p className="text-sm text-[#8493ab] px-4 py-2.5">{client.email}</p>
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-navy mb-2">Telefone</label>
              <input
                id="phone"
                name="phone"
                defaultValue={client.phone ?? ""}
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-electric"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="weightKg" className="block text-sm font-semibold text-navy mb-2">Peso (kg)</label>
                <input
                  id="weightKg"
                  name="weightKg"
                  type="number"
                  step="0.1"
                  defaultValue={client.athleteProfile?.weightKg ?? ""}
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-electric"
                />
              </div>
              <div>
                <label htmlFor="heightCm" className="block text-sm font-semibold text-navy mb-2">Altura (cm)</label>
                <input
                  id="heightCm"
                  name="heightCm"
                  type="number"
                  step="0.1"
                  defaultValue={client.athleteProfile?.heightCm ?? ""}
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-electric"
                />
              </div>
            </div>
            <div>
              <label htmlFor="sport" className="block text-sm font-semibold text-navy mb-2">Modalidade</label>
              <input
                id="sport"
                name="sport"
                defaultValue={client.athleteProfile?.sport ?? ""}
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-electric"
              />
            </div>
            <div>
              <label htmlFor="goals" className="block text-sm font-semibold text-navy mb-2">Objetivos</label>
              <textarea
                id="goals"
                name="goals"
                rows={2}
                defaultValue={client.athleteProfile?.goals ?? ""}
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-electric resize-none"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-full bg-performance-green text-navy font-semibold text-sm hover:bg-navy hover:text-white transition-colors"
            >
              Guardar Perfil
            </button>
          </form>
        </div>

        <div className="rounded-2xl bg-white border border-black/5 p-6">
          <h2 className="font-display font-bold text-lg mb-4">Nova inscrição</h2>
          <form action={createEnrollment} className="space-y-4">
            <input type="hidden" name="userId" value={client.id} />
            <div>
              <label htmlFor="programId" className="block text-sm font-semibold text-navy mb-2">Programa</label>
              <select
                id="programId"
                name="programId"
                required
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-electric"
              >
                {programs.map((program) => (
                  <option key={program.id} value={program.id}>{program.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="startDate" className="block text-sm font-semibold text-navy mb-2">Data de início</label>
              <input
                id="startDate"
                name="startDate"
                type="date"
                required
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-electric"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-full bg-navy text-white font-semibold text-sm hover:bg-electric transition-colors"
            >
              Inscrever
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-black/5">
            <h3 className="text-sm font-semibold text-navy mb-3">Avaliações físicas</h3>
            {client.athleteProfile ? (
              <>
                <ul className="space-y-2 mb-4">
                  {client.athleteProfile.evaluations.map((evaluation) => (
                    <li
                      key={evaluation.id}
                      className="flex items-center justify-between gap-3 rounded-xl bg-fog px-4 py-2.5 text-sm"
                    >
                      <span className="text-navy">
                        {evaluation.date.toLocaleDateString("pt-PT", { day: "2-digit", month: "short", year: "numeric" })}
                        {" — "}
                        {[
                          evaluation.strengthKg != null ? `${evaluation.strengthKg}kg` : null,
                          evaluation.speedSeconds != null ? `${evaluation.speedSeconds}s` : null,
                          evaluation.mobilityScore != null ? `${evaluation.mobilityScore}/10` : null,
                        ]
                          .filter(Boolean)
                          .join(" · ")}
                      </span>
                      <DeleteButton
                        action={deleteEvaluation}
                        id={evaluation.id}
                        extraFields={{ userId: client.id }}
                        confirmMessage="Eliminar esta avaliação?"
                      />
                    </li>
                  ))}
                </ul>
                <form action={createEvaluation} className="grid grid-cols-2 gap-2">
                  <input type="hidden" name="athleteProfileId" value={client.athleteProfile.id} />
                  <input type="hidden" name="userId" value={client.id} />
                  <input
                    type="date"
                    name="date"
                    required
                    className="col-span-2 rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-electric"
                  />
                  <input
                    type="number"
                    step="0.1"
                    name="strengthKg"
                    placeholder="Força (kg)"
                    className="rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-electric"
                  />
                  <input
                    type="number"
                    step="0.1"
                    name="speedSeconds"
                    placeholder="Velocidade (s)"
                    className="rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-electric"
                  />
                  <input
                    type="number"
                    step="0.1"
                    name="mobilityScore"
                    placeholder="Mobilidade (/10)"
                    className="rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-electric"
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-fog text-navy font-semibold text-sm hover:bg-black/10 transition-colors"
                  >
                    Adicionar
                  </button>
                </form>
              </>
            ) : (
              <p className="text-sm text-[#8493ab]">
                Guarda o perfil primeiro para poderes registar avaliações.
              </p>
            )}
          </div>
        </div>
      </div>

      <h2 className="font-display font-bold text-lg mb-4">Inscrições e treinos</h2>
      {client.enrollments.length === 0 ? (
        <div className="rounded-2xl bg-white border border-black/5 p-8 text-sm text-[#3d4b63]">
          Sem inscrições ainda.
        </div>
      ) : (
        <div className="space-y-6">
          {client.enrollments.map((enrollment) => (
            <div key={enrollment.id} className="rounded-2xl bg-white border border-black/5 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="font-display font-bold text-lg">{enrollment.program.name}</h3>
                  <p className="text-xs text-[#8493ab]">
                    Início em{" "}
                    {enrollment.startDate.toLocaleDateString("pt-PT", { day: "2-digit", month: "long", year: "numeric" })}
                    {" · "}
                    {enrollment.payments.length} pagamento{enrollment.payments.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <StatusSelectForm
                  action={updateEnrollmentStatus}
                  id={enrollment.id}
                  status={enrollment.status}
                  options={enrollmentStatusOptions}
                  extraFields={{ userId: client.id }}
                  className="text-xs font-semibold rounded-full border-0 px-3 py-1.5 bg-fog text-navy focus:outline-none focus:ring-2 focus:ring-electric cursor-pointer"
                />
              </div>

              {enrollment.workouts.length > 0 && (
                <ul className="space-y-2 mb-4">
                  {enrollment.workouts.map((workout) => (
                    <li
                      key={workout.id}
                      className="flex items-center justify-between gap-3 rounded-xl bg-fog px-4 py-2.5 text-sm"
                    >
                      <div>
                        <span className="font-medium text-navy">{workout.title}</span>
                        <span className="text-[#8493ab]">
                          {" — "}
                          {workout.date.toLocaleDateString("pt-PT", { day: "2-digit", month: "short" })}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <ToggleCompletedForm
                          action={toggleWorkoutCompleted}
                          id={workout.id}
                          userId={client.id}
                          completed={workout.completed}
                        />
                        <DeleteButton action={deleteWorkout} id={workout.id} confirmMessage="Eliminar este treino?" />
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              <form action={createWorkout} className="grid sm:grid-cols-[1fr_auto] gap-2">
                <input type="hidden" name="enrollmentId" value={enrollment.id} />
                <input type="hidden" name="userId" value={client.id} />
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="Título do treino"
                  className="rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-electric"
                />
                <input
                  type="date"
                  name="date"
                  required
                  className="rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-electric"
                />
                <textarea
                  name="exercises"
                  rows={2}
                  placeholder="Um exercício por linha (opcional)"
                  className="sm:col-span-2 rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-electric resize-none"
                />
                <button
                  type="submit"
                  className="sm:col-span-2 rounded-xl bg-navy text-white font-semibold text-sm py-2 hover:bg-electric transition-colors"
                >
                  Adicionar Treino
                </button>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
