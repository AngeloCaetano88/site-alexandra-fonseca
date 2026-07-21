"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";

export async function createEvaluation(formData: FormData) {
  await requireAdmin();
  const athleteProfileId = String(formData.get("athleteProfileId") ?? "");
  const userId = String(formData.get("userId") ?? "");
  const date = String(formData.get("date") ?? "");
  const strengthRaw = formData.get("strengthKg");
  const speedRaw = formData.get("speedSeconds");
  const mobilityRaw = formData.get("mobilityScore");
  const notes = String(formData.get("notes") ?? "").trim();

  if (!athleteProfileId || !date) return;

  await prisma.evaluation.create({
    data: {
      athleteProfileId,
      date: new Date(date),
      strengthKg: strengthRaw ? Number(strengthRaw) : null,
      speedSeconds: speedRaw ? Number(speedRaw) : null,
      mobilityScore: mobilityRaw ? Number(mobilityRaw) : null,
      notes: notes || null,
    },
  });

  revalidatePath(`/admin/clientes/${userId}`);
  revalidatePath("/dashboard/avaliacoes");
}

export async function deleteEvaluation(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const userId = String(formData.get("userId") ?? "");
  if (!id) return;

  await prisma.evaluation.delete({ where: { id } });
  revalidatePath(`/admin/clientes/${userId}`);
  revalidatePath("/dashboard/avaliacoes");
}
