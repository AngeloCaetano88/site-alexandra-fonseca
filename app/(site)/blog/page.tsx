import type { Metadata } from "next";
import { BlogList } from "@/components/marketing/BlogList";
import { NewsletterForm } from "@/components/marketing/NewsletterForm";
import { PageHero } from "@/components/marketing/PageHero";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Blog | Alexandra Fonseca — Coach Desportivo",
  description:
    "Artigos sobre força, recuperação, nutrição desportiva e mentalidade competitiva.",
};

export default async function BlogPage() {
  const articles = await prisma.article.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
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

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Ideias e ferramentas para treinar melhor."
        subtitle="Artigos práticos sobre força, recuperação, nutrição e mentalidade competitiva."
      />
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <BlogList articles={articles} />
        </div>
      </section>
      <section className="bg-navy py-20">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-3">
            Não percas os próximos artigos
          </h2>
          <p className="text-[#c9d6ea] mb-8">
            Um email ocasional com novidades de treino — sem spam.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
