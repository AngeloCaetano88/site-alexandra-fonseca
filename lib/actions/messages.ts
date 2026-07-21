"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function sendMessage(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Não autenticado.");

  const recipientId = formData.get("recipientId");
  const body = formData.get("body");

  if (typeof recipientId !== "string" || typeof body !== "string") return;
  const trimmedBody = body.trim();
  if (!trimmedBody) return;

  await prisma.message.create({
    data: {
      senderId: session.user.id,
      recipientId,
      body: trimmedBody,
    },
  });

  revalidatePath("/dashboard/mensagens");
  revalidatePath("/admin/mensagens");
}
