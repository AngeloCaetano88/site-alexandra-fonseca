import Link from "next/link";
import { createArticle } from "@/lib/actions/articles";

export default function NewArticlePage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <Link href="/admin/blog" className="text-sm font-semibold text-electric hover:text-navy transition-colors">
        ← Blog
      </Link>
      <h1 className="font-display font-bold text-2xl mt-2 mb-8">Novo Artigo</h1>

      <form action={createArticle} className="space-y-5 rounded-2xl bg-white border border-black/5 p-6">
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-navy mb-2">Título</label>
          <input
            id="title"
            name="title"
            required
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-electric"
          />
        </div>
        <div>
          <label htmlFor="slug" className="block text-sm font-semibold text-navy mb-2">
            Slug <span className="font-normal text-[#8493ab]">(opcional — gerado a partir do título)</span>
          </label>
          <input
            id="slug"
            name="slug"
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
              placeholder="Força, Recuperação…"
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
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-electric font-mono"
          />
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-semibold text-navy mb-2">Estado</label>
          <select
            id="status"
            name="status"
            defaultValue="DRAFT"
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
          Criar Artigo
        </button>
      </form>
    </div>
  );
}
