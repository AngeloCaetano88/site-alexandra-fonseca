import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

type Exercise = {
  name: string;
  sets?: number;
  reps?: number;
  duration?: string;
};

function parseExercises(value: unknown): Exercise[] {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (item): item is Exercise =>
      typeof item === "object" && item !== null && "name" in item
  );
}

export default async function TreinosPage() {
  const session = await auth();
  const userId = session!.user.id;

  const workouts = await prisma.workout.findMany({
    where: { enrollment: { userId } },
    orderBy: { date: "asc" },
    include: { enrollment: { include: { program: true } } },
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="font-display font-bold text-2xl mb-2">Treinos</h1>
      <p className="text-sm text-[#3d4b63] mb-8">
        Calendário de sessões do teu plano atual.
      </p>

      {workouts.length === 0 ? (
        <div className="rounded-2xl bg-white border border-black/5 p-8 text-sm text-[#3d4b63]">
          Ainda não há treinos registados no teu plano.
        </div>
      ) : (
        <div className="space-y-4">
          {workouts.map((workout) => {
            const exercises = parseExercises(workout.exercises);
            return (
              <div
                key={workout.id}
                className="rounded-2xl bg-white border border-black/5 p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <h2 className="font-display font-bold text-lg">
                    {workout.title}
                  </h2>
                  <span
                    className={`text-xs font-semibold rounded-full px-3 py-1 ${
                      workout.completed
                        ? "bg-performance-green/15 text-performance-green-dark"
                        : "bg-fog text-[#8493ab]"
                    }`}
                  >
                    {workout.completed ? "Concluído" : "Por realizar"}
                  </span>
                </div>
                <p className="text-sm text-[#8493ab] mb-4">
                  {workout.enrollment.program.name} ·{" "}
                  {workout.date.toLocaleDateString("pt-PT", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                {exercises.length > 0 && (
                  <ul className="space-y-1.5 text-sm text-navy">
                    {exercises.map((exercise) => (
                      <li key={exercise.name} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-electric shrink-0" />
                        {exercise.name}
                        {exercise.sets && exercise.reps
                          ? ` — ${exercise.sets}×${exercise.reps}`
                          : exercise.sets && exercise.duration
                          ? ` — ${exercise.sets}×${exercise.duration}`
                          : ""}
                      </li>
                    ))}
                  </ul>
                )}
                {workout.notes && (
                  <p className="mt-4 text-sm text-[#3d4b63] italic">
                    {workout.notes}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
