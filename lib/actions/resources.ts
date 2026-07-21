"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";

export async function createResource(formData: FormData) {
  await requireAdmin();
  const programId = String(formData.get("programId") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const url = String(formData.get("url") ?? "").trim();
  const type = formData.get("type") === "DOCUMENT" ? "DOCUMENT" : "VIDEO";

  if (!programId || !title || !url) return;

  await prisma.resource.create({ data: { programId, title, url, type } });
  revalidatePath(`/admin/programas/${programId}`);
}

export async function deleteResource(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const resource = await prisma.resource.delete({ where: { id } });
  revalidatePath(`/admin/programas/${resource.programId}`);
}
