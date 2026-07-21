"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";

export async function createWorkout(formData: FormData) {
  await requireAdmin();
  const enrollmentId = String(formData.get("enrollmentId") ?? "");
  const userId = String(formData.get("userId") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const date = String(formData.get("date") ?? "");
  const notes = String(formData.get("notes") ?? "").trim();
  const exercisesRaw = String(formData.get("exercises") ?? "");

  if (!enrollmentId || !title || !date) return;

  const exercises = exercisesRaw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((name) => ({ name }));

  await prisma.workout.create({
    data: {
      enrollmentId,
      title,
      date: new Date(date),
      notes: notes || null,
      exercises,
    },
  });

  revalidatePath(`/admin/clientes/${userId}`);
}

export async function toggleWorkoutCompleted(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const userId = String(formData.get("userId") ?? "");
  const completed = formData.get("completed") === "true";
  if (!id) return;

  await prisma.workout.update({ where: { id }, data: { completed: !completed } });
  revalidatePath(`/admin/clientes/${userId}`);
  revalidatePath("/dashboard/treinos");
}

export async function deleteWorkout(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const workout = await prisma.workout.delete({
    where: { id },
    include: { enrollment: true },
  });
  revalidatePath(`/admin/clientes/${workout.enrollment.userId}`);
}
