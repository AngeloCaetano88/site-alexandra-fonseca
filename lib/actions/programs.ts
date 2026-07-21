"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slugify";

function parseProgramInput(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const durationWeeks = Number(formData.get("durationWeeks") ?? 0);
  const goals = String(formData.get("goals") ?? "").trim();
  const priceEuros = Number(formData.get("price") ?? 0);
  const active = formData.get("active") === "on";
  const slugInput = String(formData.get("slug") ?? "").trim();

  return {
    name,
    description,
    durationWeeks,
    goals: goals || null,
    priceCents: Math.round(priceEuros * 100),
    active,
    slug: slugify(slugInput || name),
  };
}

export async function createProgram(formData: FormData) {
  await requireAdmin();
  const data = parseProgramInput(formData);

  if (!data.name || !data.slug) {
    throw new Error("Nome do programa é obrigatório.");
  }

  await prisma.program.create({ data });
  revalidatePath("/admin/programas");
  redirect("/admin/programas");
}

export async function updateProgram(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Programa inválido.");

  const data = parseProgramInput(formData);
  await prisma.program.update({ where: { id }, data });

  revalidatePath("/admin/programas");
  revalidatePath(`/admin/programas/${id}`);
  redirect("/admin/programas");
}

export async function deleteProgram(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await prisma.program.delete({ where: { id } });
  revalidatePath("/admin/programas");
}
