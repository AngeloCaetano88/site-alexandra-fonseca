import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function RecursosPage() {
  const session = await auth();
  const userId = session!.user.id;

  const enrollments = await prisma.enrollment.findMany({
    where: { userId },
    include: { program: { include: { resources: true } } },
  });

  const resources = enrollments.flatMap((enrollment) =>
    enrollment.program.resources.map((resource) => ({
      ...resource,
      programName: enrollment.program.name,
    }))
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="font-display font-bold text-2xl mb-2">Recursos</h1>
      <p className="text-sm text-[#3d4b63] mb-8">
        Vídeos técnicos e planos para download dos teus programas.
      </p>

      {resources.length === 0 ? (
        <div className="rounded-2xl bg-white border border-black/5 p-8 text-sm text-[#3d4b63]">
          Ainda não há recursos disponíveis para o teu plano.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {resources.map((resource) => (
            <a
              key={resource.id}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${resource.title} (abre em nova aba)`}
              className="rounded-2xl bg-white border border-black/5 p-6 flex items-center gap-4 hover:border-electric/40 transition-colors"
            >
              <div
                aria-hidden="true"
                className="w-11 h-11 rounded-full bg-electric/10 flex items-center justify-center shrink-0 text-electric font-semibold"
              >
                {resource.type === "VIDEO" ? "▶" : "↓"}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-navy truncate">{resource.title}</p>
                <p className="text-xs text-[#8493ab]">
                  {resource.programName} ·{" "}
                  {resource.type === "VIDEO" ? "Vídeo" : "Documento"}
                </p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
