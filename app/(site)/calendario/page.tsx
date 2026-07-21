import type { Metadata } from "next";
import { BookingCalendar } from "@/components/marketing/BookingCalendar";
import { PageHero } from "@/components/marketing/PageHero";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Marcar Avaliação | Alexandra Fonseca — Coach Desportivo",
  description:
    "Marca a tua avaliação física inicial ou sessão de acompanhamento.",
};

export default async function CalendarioPage() {
  const now = new Date();
  const windowEnd = new Date(now);
  windowEnd.setDate(windowEnd.getDate() + 30);

  const existingBookings = await prisma.booking.findMany({
    where: {
      date: { gte: now, lte: windowEnd },
      status: { not: "CANCELLED" },
    },
    select: { date: true },
  });

  const takenSlots = existingBookings.map((b) => b.date.toISOString());

  return (
    <>
      <PageHero
        eyebrow="Calendário"
        title="Marca a tua avaliação."
        subtitle="Escolhe o tipo de sessão, a data e a hora que preferires. Confirmo contigo por email."
      />
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <BookingCalendar takenSlots={takenSlots} />
        </div>
      </section>
    </>
  );
}
