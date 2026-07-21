"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function updateAthleteProfile(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Não autenticado.");

  const weightRaw = formData.get("weightKg");
  const goals = formData.get("goals");

  const weightKg =
    typeof weightRaw === "string" && weightRaw.trim() !== ""
      ? Number(weightRaw)
      : null;

  await prisma.athleteProfile.upsert({
    where: { userId: session.user.id },
    update: {
      weightKg,
      goals: typeof goals === "string" ? goals.trim() || null : null,
    },
    create: {
      userId: session.user.id,
      weightKg,
      goals: typeof goals === "string" ? goals.trim() || null : null,
    },
  });

  revalidatePath("/dashboard/avaliacoes");
}
