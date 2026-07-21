import { prisma } from "@/lib/prisma";
import { updateBookingStatus } from "@/lib/actions/bookings";
import { StatusSelectForm } from "@/components/admin/StatusSelectForm";

const statusOptions = [
  { value: "PENDING", label: "Pendente" },
  { value: "CONFIRMED", label: "Confirmada" },
  { value: "CANCELLED", label: "Cancelada" },
];

export default async function AdminAgendaPage() {
  const bookings = await prisma.booking.findMany({
    orderBy: { date: "asc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="font-display font-bold text-2xl mb-1">Agenda</h1>
      <p className="text-sm text-[#3d4b63] mb-8">
        Marcações de avaliações e sessões.
      </p>

      {bookings.length === 0 ? (
        <div className="rounded-2xl bg-white border border-black/5 p-8 text-sm text-[#3d4b63]">
          Ainda não há marcações.
        </div>
      ) : (
        <div className="rounded-2xl bg-white border border-black/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/5 text-left text-xs uppercase tracking-wide text-[#8493ab]">
                <th className="px-6 py-4 font-semibold">Nome</th>
                <th className="px-6 py-4 font-semibold">Serviço</th>
                <th className="px-6 py-4 font-semibold">Data</th>
                <th className="px-6 py-4 font-semibold">Contacto</th>
                <th className="px-6 py-4 font-semibold">Estado</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-b border-black/5 last:border-0">
                  <td className="px-6 py-4 font-medium text-navy">{booking.name}</td>
                  <td className="px-6 py-4 text-[#8493ab]">{booking.service}</td>
                  <td className="px-6 py-4 text-[#8493ab]">
                    {booking.date.toLocaleString("pt-PT", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-6 py-4 text-[#8493ab]">
                    <div>{booking.email}</div>
                    {booking.phone && <div>{booking.phone}</div>}
                  </td>
                  <td className="px-6 py-4">
                    <StatusSelectForm
                      action={updateBookingStatus}
                      id={booking.id}
                      status={booking.status}
                      options={statusOptions}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
