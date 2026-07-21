import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateArticle } from "@/lib/actions/articles";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await prisma.article.findUnique({ where: { id } });

  if (!article) notFound();

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <Link href="/admin/blog" className="text-sm font-semibold text-electric hover:text-navy transition-colors">
        ← Blog
      </Link>
      <h1 className="font-display font-bold text-2xl mt-2 mb-8">{article.title}</h1>

      <form action={updateArticle} className="space-y-5 rounded-2xl bg-white border border-black/5 p-6">
        <input type="hidden" name="id" value={article.id} />
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-navy mb-2">Título</label>
          <input
            id="title"
            name="title"
            required
            defaultValue={article.title}
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-electric"
          />
        </div>
        <div>
          <label htmlFor="slug" className="block text-sm font-semibold text-navy mb-2">Slug</label>
          <input
            id="slug"
            name="slug"
            defaultValue={article.slug}
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-electric"
          />
        </div>
        <div>
          <label htmlFor="excerpt" className="block text-sm font-semibold text-navy mb-2">
            Resumo <span className="font-normal text-[#8493ab]">(mostrado nos cartões do blog)</span>
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            rows={2}
            required
            defaultValue={article.excerpt}
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-electric resize-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block text-sm font-semibold text-navy mb-2">Categoria</label>
            <input
              id="category"
              name="category"
              required
              defaultValue={article.category}
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-electric"
            />
          </div>
          <div>
            <label htmlFor="readTimeMinutes" className="block text-sm font-semibold text-navy mb-2">Tempo de leitura (min)</label>
            <input
              id="readTimeMinutes"
              name="readTimeMinutes"
              type="number"
              min={1}
              defaultValue={article.readTimeMinutes ?? undefined}
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-electric"
            />
          </div>
        </div>
        <div>
          <label htmlFor="body" className="block text-sm font-semibold text-navy mb-2">
            Corpo <span className="font-normal text-[#8493ab]">(parágrafos separados por linha em branco)</span>
          </label>
          <textarea
            id="body"
            name="body"
            rows={12}
            required
            defaultValue={article.body}
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-electric font-mono"
          />
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-semibold text-navy mb-2">Estado</label>
          <select
            id="status"
            name="status"
            defaultValue={article.status}
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-electric"
          >
            <option value="DRAFT">Rascunho</option>
            <option value="PUBLISHED">Publicado</option>
          </select>
        </div>
        <button
          type="submit"
          className="px-6 py-3 rounded-full bg-performance-green text-navy font-semibold text-sm hover:bg-navy hover:text-white transition-colors"
        >
          Guardar Alterações
        </button>
      </form>
    </div>
  );
}
