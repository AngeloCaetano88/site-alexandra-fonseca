import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateProgram } from "@/lib/actions/programs";
import { createResource, deleteResource } from "@/lib/actions/resources";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function EditProgramPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const program = await prisma.program.findUnique({
    where: { id },
    include: { resources: { orderBy: { createdAt: "desc" } } },
  });

  if (!program) notFound();

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <Link href="/admin/programas" className="text-sm font-semibold text-electric hover:text-navy transition-colors">
        ← Programas
      </Link>
      <h1 className="font-display font-bold text-2xl mt-2 mb-8">{program.name}</h1>

      <form action={updateProgram} className="space-y-5 rounded-2xl bg-white border border-black/5 p-6 mb-8">
        <input type="hidden" name="id" value={program.id} />
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-navy mb-2">Nome</label>
          <input
            id="name"
            name="name"
            required
            defaultValue={program.name}
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-electric"
          />
        </div>
        <div>
          <label htmlFor="slug" className="block text-sm font-semibold text-navy mb-2">Slug</label>
          <input
            id="slug"
            name="slug"
            defaultValue={program.slug}
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-electric"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-navy mb-2">Descrição</label>
          <textarea
            id="description"
            name="description"
            rows={3}
            required
            defaultValue={program.description}
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-electric resize-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="durationWeeks" className="block text-sm font-semibold text-navy mb-2">Duração (semanas)</label>
            <input
              id="durationWeeks"
              name="durationWeeks"
              type="number"
              min={1}
              required
              defaultValue={program.durationWeeks}
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-electric"
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-semibold text-navy mb-2">Preço (€)</label>
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min={0}
              required
              defaultValue={(program.priceCents / 100).toFixed(2)}
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-electric"
            />
          </div>
        </div>
        <div>
          <label htmlFor="goals" className="block text-sm font-semibold text-navy mb-2">Objetivos</label>
          <textarea
            id="goals"
            name="goals"
            rows={2}
            defaultValue={program.goals ?? ""}
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-electric resize-none"
          />
        </div>
        <label className="flex items-center gap-2 text-sm font-semibold text-navy">
          <input
            type="checkbox"
            name="active"
            defaultChecked={program.active}
            className="w-4 h-4 accent-performance-green"
          />
          Ativo (visível para inscrições)
        </label>
        <button
          type="submit"
          className="px-6 py-3 rounded-full bg-performance-green text-navy font-semibold text-sm hover:bg-navy hover:text-white transition-colors"
        >
          Guardar Alterações
        </button>
      </form>

      <h2 className="font-display font-bold text-lg mb-4">Recursos (vídeos e downloads)</h2>
      <div className="rounded-2xl bg-white border border-black/5 p-6 mb-6">
        {program.resources.length === 0 ? (
          <p className="text-sm text-[#8493ab] mb-4">Ainda não há recursos.</p>
        ) : (
          <ul className="space-y-2 mb-4">
            {program.resources.map((resource) => (
              <li
                key={resource.id}
                className="flex items-center justify-between gap-3 rounded-xl bg-fog px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-navy truncate">{resource.title}</p>
                  <p className="text-xs text-[#8493ab]">
                    {resource.type === "VIDEO" ? "Vídeo" : "Documento"}
                  </p>
                </div>
                <DeleteButton
                  action={deleteResource}
                  id={resource.id}
                  confirmMessage={`Eliminar o recurso "${resource.title}"?`}
                />
              </li>
            ))}
          </ul>
        )}

        <form action={createResource} className="grid sm:grid-cols-[1fr_auto_auto] gap-3 items-start">
          <input type="hidden" name="programId" value={program.id} />
          <input
            type="text"
            name="title"
            required
            placeholder="Título do recurso"
            className="rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-electric"
          />
          <select
            name="type"
            className="rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-electric"
          >
            <option value="VIDEO">Vídeo</option>
            <option value="DOCUMENT">Documento</option>
          </select>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-full bg-navy text-white font-semibold text-sm hover:bg-electric transition-colors"
          >
            Adicionar
          </button>
          <input
            type="url"
            name="url"
            required
            placeholder="https://…"
            className="sm:col-span-3 rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-electric"
          />
        </form>
      </div>
    </div>
  );
}
