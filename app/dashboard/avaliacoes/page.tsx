import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { updateAthleteProfile } from "@/lib/actions/profile";
import { EvaluationChart } from "@/components/dashboard/EvaluationChart";

export default async function AvaliacoesPage() {
  const session = await auth();
  const userId = session!.user.id;

  const athleteProfile = await prisma.athleteProfile.findUnique({
    where: { userId },
    include: { evaluations: { orderBy: { date: "asc" } } },
  });

  const evaluations = athleteProfile?.evaluations ?? [];

  const strengthPoints = evaluations
    .filter((e) => e.strengthKg != null)
    .map((e) => ({ date: e.date.toISOString(), value: e.strengthKg! }));
  const speedPoints = evaluations
    .filter((e) => e.speedSeconds != null)
    .map((e) => ({ date: e.date.toISOString(), value: e.speedSeconds! }));
  const mobilityPoints = evaluations
    .filter((e) => e.mobilityScore != null)
    .map((e) => ({ date: e.date.toISOString(), value: e.mobilityScore! }));

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="font-display font-bold text-2xl mb-2">Avaliações</h1>
      <p className="text-sm text-[#3d4b63] mb-8">
        O teu peso, objetivos e evolução física ao longo do tempo.
      </p>

      <div className="grid lg:grid-cols-3 gap-4 mb-10">
        <EvaluationChart title="Força (agachamento)" unit="kg" points={strengthPoints} trend="up" />
        <EvaluationChart title="Velocidade (30m)" unit="s" points={speedPoints} trend="down" />
        <EvaluationChart title="Mobilidade" unit="/10" points={mobilityPoints} trend="up" />
      </div>

      <div className="rounded-2xl bg-white border border-black/5 p-6 max-w-lg">
        <h2 className="font-display font-bold text-lg mb-4">Peso e objetivos</h2>
        <form action={updateAthleteProfile} className="space-y-4">
          <div>
            <label htmlFor="weightKg" className="block text-sm font-semibold text-navy mb-2">
              Peso atual (kg)
            </label>
            <input
              id="weightKg"
              name="weightKg"
              type="number"
              step="0.1"
              defaultValue={athleteProfile?.weightKg ?? ""}
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-electric"
            />
          </div>
          <div>
            <label htmlFor="goals" className="block text-sm font-semibold text-navy mb-2">
              Objetivos
            </label>
            <textarea
              id="goals"
              name="goals"
              rows={3}
              defaultValue={athleteProfile?.goals ?? ""}
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-electric resize-none"
              placeholder="Ex: aumentar impulsão vertical, reduzir dor no joelho…"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-performance-green text-navy font-semibold text-sm hover:bg-navy hover:text-white transition-colors"
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}
