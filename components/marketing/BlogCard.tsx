import Link from "next/link";
import { Reveal } from "./Reveal";

export type BlogArticleSummary = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTimeMinutes: number | null;
  publishedAt: Date | null;
  createdAt: Date;
};

export function formatDate(date: Date) {
  return date.toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function BlogCard({
  article,
  delay = 0,
}: {
  article: BlogArticleSummary;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <Link href={`/blog/${article.slug}`} className="group block h-full">
        <article className="h-full flex flex-col rounded-2xl border border-black/5 p-8 bg-fog hover:bg-navy transition-colors duration-300">
          <span className="inline-flex w-fit items-center rounded-full bg-electric/10 px-3 py-1 text-xs font-semibold text-electric group-hover:bg-white/10 group-hover:text-performance-green transition-colors mb-4">
            {article.category}
          </span>
          <h3 className="font-display font-bold text-xl mb-3 group-hover:text-white transition-colors">
            {article.title}
          </h3>
          <p className="text-sm text-[#3d4b63] group-hover:text-[#c9d6ea] mb-6 leading-relaxed transition-colors">
            {article.excerpt}
          </p>
          <div className="mt-auto flex items-center justify-between text-xs text-[#8493ab] group-hover:text-[#9fb3d1] transition-colors">
            <span>{formatDate(article.publishedAt ?? article.createdAt)}</span>
            {article.readTimeMinutes && <span>{article.readTimeMinutes} min de leitura</span>}
          </div>
        </article>
      </Link>
    </Reveal>
  );
}
