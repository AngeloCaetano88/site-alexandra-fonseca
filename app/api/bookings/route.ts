import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { createCalendarEvent } from "@/lib/google-calendar";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
  const service = typeof body?.service === "string" ? body.service.trim() : "";
  const dateRaw = typeof body?.date === "string" ? body.date : "";

  if (!name || !email || !service || !dateRaw) {
    return NextResponse.json(
      { error: "Preenche o nome, email, serviço e data." },
      { status: 400 }
    );
  }

  const date = new Date(dateRaw);
  if (Number.isNaN(date.getTime()) || date.getTime() < Date.now()) {
    return NextResponse.json({ error: "Data inválida." }, { status: 400 });
  }

  const conflicting = await prisma.booking.findFirst({
    where: { date, status: { not: "CANCELLED" } },
  });
  if (conflicting) {
    return NextResponse.json(
      { error: "Este horário já foi reservado. Escolhe outro." },
      { status: 409 }
    );
  }

  const session = await auth();

  const booking = await prisma.booking.create({
    data: {
      userId: session?.user?.id,
      name,
      email,
      phone: phone || null,
      service,
      date,
      status: "PENDING",
    },
  });

  try {
    const eventId = await createCalendarEvent({ name, email, service, date });
    if (eventId) {
      await prisma.booking.update({ where: { id: booking.id }, data: { googleEventId: eventId } });
    }
  } catch (error) {
    console.error("Failed to sync booking to Google Calendar", error);
  }

  return NextResponse.json({ id: booking.id }, { status: 201 });
}
