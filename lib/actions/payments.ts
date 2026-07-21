"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";

const VALID_STATUSES = ["PENDING", "PAID", "FAILED", "REFUNDED"] as const;

export async function updatePaymentStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");

  if (!id || !VALID_STATUSES.includes(status as (typeof VALID_STATUSES)[number])) {
    return;
  }

  await prisma.payment.update({
    where: { id },
    data: { status: status as (typeof VALID_STATUSES)[number] },
  });

  revalidatePath("/admin/pagamentos");
  revalidatePath("/dashboard/pagamentos");
}
