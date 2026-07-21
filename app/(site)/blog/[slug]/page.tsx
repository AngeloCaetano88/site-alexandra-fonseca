import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogCard, formatDate } from "@/components/marketing/BlogCard";
import { GlassButton } from "@/components/marketing/GlassButton";
import { JsonLd } from "@/components/marketing/JsonLd";
import { PageHero } from "@/components/marketing/PageHero";
import { prisma } from "@/lib/prisma";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function generateStaticParams() {
  const articles = await prisma.article.findMany({
    where: { status: "PUBLISHED" },
    select: { slug: true },
  });
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await prisma.article.findUnique({ where: { slug } });
  if (!article) return {};
  return {
    title: article.seoTitle || `${article.title} | Blog Alexandra Fonseca`,
    description: article.seoDescription || article.excerpt,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await prisma.article.findUnique({
    where: { slug },
    include: { author: true },
  });

  if (!article || article.status !== "PUBLISHED") notFound();

  const related = await prisma.article.findMany({
    where: {
      status: "PUBLISHED",
      category: article.category,
      slug: { not: article.slug },
    },
    orderBy: { publishedAt: "desc" },
    take: 3,
    select: {
      slug: true,
      title: true,
      excerpt: true,
      category: true,
      readTimeMinutes: true,
      publishedAt: true,
      createdAt: true,
    },
  });

  const paragraphs = article.body.split(/\n\s*\n/).filter(Boolean);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: (article.publishedAt ?? article.createdAt).toISOString(),
    dateModified: article.updatedAt.toISOString(),
    author: { "@type": "Person", name: article.author.name },
    url: `${SITE_URL}/blog/${article.slug}`,
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <PageHero eyebrow={article.category} title={article.title} />
      <article className="bg-white py-16">
        <div className="max-w-2xl mx-auto px-6">
          <div className="flex items-center gap-3 text-sm text-[#8493ab] mb-10 pb-6 border-b border-black/5">
            <span>{article.author.name}</span>
            <span>·</span>
            <span>{formatDate(article.publishedAt ?? article.createdAt)}</span>
            {article.readTimeMinutes && (
              <>
                <span>·</span>
                <span>{article.readTimeMinutes} min de leitura</span>
              </>
            )}
          </div>
          <div className="space-y-6 text-[#3d4b63] leading-relaxed">
            {paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t border-black/5">
            <Link
              href="/blog"
              className="text-sm font-semibold text-electric hover:text-navy transition-colors"
            >
              ← Voltar ao blog
            </Link>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-fog py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-display font-bold text-2xl mb-10">
              Também pode interessar-te
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((a, i) => (
                <BlogCard key={a.slug} article={a} delay={i * 80} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-navy py-20 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-4">
            Queres aplicar isto ao teu treino?
          </h2>
          <p className="text-[#c9d6ea] mb-8">
            Marca uma avaliação inicial e desenhamos, juntos, o teu plano de
            performance.
          </p>
          <GlassButton href="/calendario">Marcar Avaliação</GlassButton>
        </div>
      </section>
    </>
  );
}
