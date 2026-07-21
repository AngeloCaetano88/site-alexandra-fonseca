"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slugify";

function parseArticleInput(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const readTimeMinutes = Number(formData.get("readTimeMinutes") ?? 0) || null;
  const status = formData.get("status") === "PUBLISHED" ? "PUBLISHED" : "DRAFT";

  return {
    title,
    slug: slugify(slugInput || title),
    excerpt,
    category,
    body,
    readTimeMinutes,
    status: status as "DRAFT" | "PUBLISHED",
  };
}

export async function createArticle(formData: FormData) {
  const session = await requireAdmin();
  const data = parseArticleInput(formData);

  if (!data.title || !data.slug || !data.body || !data.excerpt) {
    throw new Error("Título, slug, resumo e corpo do artigo são obrigatórios.");
  }

  await prisma.article.create({
    data: {
      ...data,
      authorId: session.user.id,
      publishedAt: data.status === "PUBLISHED" ? new Date() : null,
    },
  });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog");
}

export async function updateArticle(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Artigo inválido.");

  const data = parseArticleInput(formData);
  const existing = await prisma.article.findUnique({ where: { id } });

  await prisma.article.update({
    where: { id },
    data: {
      ...data,
      publishedAt:
        data.status === "PUBLISHED"
          ? (existing?.publishedAt ?? new Date())
          : null,
    },
  });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${data.slug}`);
  redirect("/admin/blog");
}

export async function deleteArticle(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await prisma.article.delete({ where: { id } });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}
