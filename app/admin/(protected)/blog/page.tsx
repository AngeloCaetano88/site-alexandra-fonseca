import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteArticle } from "@/lib/actions/articles";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function AdminBlogPage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: true, _count: { select: { comments: true } } },
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-2xl mb-1">Blog</h1>
          <p className="text-sm text-[#3d4b63]">Gere os artigos publicados no site.</p>
        </div>
        <Link
          href="/admin/blog/novo"
          className="px-5 py-2.5 rounded-full bg-performance-green text-navy font-semibold text-sm hover:bg-navy hover:text-white transition-colors"
        >
          Novo Artigo
        </Link>
      </div>

      {articles.length === 0 ? (
        <div className="rounded-2xl bg-white border border-black/5 p-8 text-sm text-[#3d4b63]">
          Ainda não há artigos criados.
        </div>
      ) : (
        <div className="rounded-2xl bg-white border border-black/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/5 text-left text-xs uppercase tracking-wide text-[#8493ab]">
                <th className="px-6 py-4 font-semibold">Título</th>
                <th className="px-6 py-4 font-semibold">Categoria</th>
                <th className="px-6 py-4 font-semibold">Comentários</th>
                <th className="px-6 py-4 font-semibold">Estado</th>
                <th className="px-6 py-4 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id} className="border-b border-black/5 last:border-0">
                  <td className="px-6 py-4 font-medium text-navy max-w-xs truncate">
                    {article.title}
                  </td>
                  <td className="px-6 py-4 text-[#8493ab]">{article.category}</td>
                  <td className="px-6 py-4 text-[#8493ab]">{article._count.comments}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-semibold rounded-full px-3 py-1 ${
                        article.status === "PUBLISHED"
                          ? "bg-performance-green/15 text-performance-green-dark"
                          : "bg-black/5 text-[#8493ab]"
                      }`}
                    >
                      {article.status === "PUBLISHED" ? "Publicado" : "Rascunho"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-4">
                      <Link
                        href={`/admin/blog/${article.id}`}
                        className="text-sm font-semibold text-electric hover:text-navy transition-colors"
                      >
                        Editar
                      </Link>
                      <DeleteButton
                        action={deleteArticle}
                        id={article.id}
                        confirmMessage={`Eliminar o artigo "${article.title}"? Esta ação não pode ser desfeita.`}
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
