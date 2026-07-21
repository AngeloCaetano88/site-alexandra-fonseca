"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";

export async function updateClientProfile(formData: FormData) {
  await requireAdmin();
  const userId = String(formData.get("userId") ?? "");
  if (!userId) throw new Error("Cliente inválido.");

  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const weightRaw = formData.get("weightKg");
  const heightRaw = formData.get("heightCm");
  const sport = String(formData.get("sport") ?? "").trim();
  const goals = String(formData.get("goals") ?? "").trim();

  await prisma.user.update({
    where: { id: userId },
    data: { name, phone: phone || null },
  });

  await prisma.athleteProfile.upsert({
    where: { userId },
    update: {
      weightKg: weightRaw ? Number(weightRaw) : null,
      heightCm: heightRaw ? Number(heightRaw) : null,
      sport: sport || null,
      goals: goals || null,
    },
    create: {
      userId,
      weightKg: weightRaw ? Number(weightRaw) : null,
      heightCm: heightRaw ? Number(heightRaw) : null,
      sport: sport || null,
      goals: goals || null,
    },
  });

  revalidatePath(`/admin/clientes/${userId}`);
}

export async function createEnrollment(formData: FormData) {
  await requireAdmin();
  const userId = String(formData.get("userId") ?? "");
  const programId = String(formData.get("programId") ?? "");
  const startDate = String(formData.get("startDate") ?? "");

  if (!userId || !programId || !startDate) return;

  await prisma.enrollment.create({
    data: { userId, programId, startDate: new Date(startDate) },
  });

  revalidatePath(`/admin/clientes/${userId}`);
}

const VALID_ENROLLMENT_STATUSES = ["ACTIVE", "COMPLETED", "CANCELLED", "PAUSED"] as const;

export async function updateEnrollmentStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  const userId = String(formData.get("userId") ?? "");

  if (!id || !VALID_ENROLLMENT_STATUSES.includes(status as (typeof VALID_ENROLLMENT_STATUSES)[number])) {
    return;
  }

  await prisma.enrollment.update({
    where: { id },
    data: { status: status as (typeof VALID_ENROLLMENT_STATUSES)[number] },
  });

  revalidatePath(`/admin/clientes/${userId}`);
}
