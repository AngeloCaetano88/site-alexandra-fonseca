"use client";

import { useMemo, useState } from "react";
import { BlogCard, type BlogArticleSummary } from "./BlogCard";

export function BlogList({ articles }: { articles: BlogArticleSummary[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");

  const categories = useMemo(
    () => ["Todos", ...new Set(articles.map((a) => a.category))],
    [articles]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((article) => {
      const matchesCategory = category === "Todos" || article.category === category;
      const matchesQuery =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [articles, query, category]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mb-10">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                category === c
                  ? "bg-navy text-white"
                  : "bg-fog text-[#3d4b63] hover:bg-navy/10"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="relative sm:w-64">
          <span className="sr-only">Pesquisar artigos</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquisar artigos…"
            className="w-full rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm text-navy placeholder:text-[#8493ab] focus:outline-none focus:ring-2 focus:ring-electric"
          />
        </label>
      </div>

      {filtered.length === 0 ? (
        <p className="text-[#3d4b63] py-16 text-center">
          {articles.length === 0
            ? "Ainda não há artigos publicados. Volta em breve."
            : "Nenhum artigo encontrado. Tenta outra pesquisa ou categoria."}
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {filtered.map((article, i) => (
            <BlogCard key={article.slug} article={article} delay={i * 80} />
          ))}
        </div>
      )}
    </div>
  );
}
