"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";
import { deleteCalendarEvent } from "@/lib/google-calendar";

const VALID_STATUSES = ["PENDING", "CONFIRMED", "CANCELLED"] as const;

export async function updateBookingStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");

  if (!id || !VALID_STATUSES.includes(status as (typeof VALID_STATUSES)[number])) {
    return;
  }

  const booking = await prisma.booking.update({
    where: { id },
    data: { status: status as (typeof VALID_STATUSES)[number] },
  });

  if (status === "CANCELLED" && booking.googleEventId) {
    await deleteCalendarEvent(booking.googleEventId).catch((error) => {
      console.error("Failed to delete Google Calendar event", error);
    });
  }

  revalidatePath("/admin/agenda");
}
