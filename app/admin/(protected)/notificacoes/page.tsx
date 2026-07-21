import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminNotificationsPage() {
  const session = await auth();
  const adminId = session!.user.id;

  const [pendingBookings, pendingPayments, unreadMessages] = await Promise.all([
    prisma.booking.findMany({
      where: { status: "PENDING" },
      orderBy: { date: "asc" },
    }),
    prisma.payment.findMany({
      where: { status: "PENDING" },
      include: { enrollment: { include: { user: true, program: true } } },
    }),
    prisma.message.findMany({
      where: { recipientId: adminId, readAt: null },
      include: { sender: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const hasNotifications =
    pendingBookings.length > 0 || pendingPayments.length > 0 || unreadMessages.length > 0;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="font-display font-bold text-2xl mb-1">Notificações</h1>
      <p className="text-sm text-[#3d4b63] mb-8">
        Tudo o que precisa da tua atenção agora.
      </p>

      {!hasNotifications ? (
        <div className="rounded-2xl bg-white border border-black/5 p-8 text-sm text-[#3d4b63]">
          Está tudo em dia — sem pendências.
        </div>
      ) : (
        <div className="space-y-8">
          {pendingBookings.length > 0 && (
            <section>
              <h2 className="font-display font-bold text-lg mb-3">
                Marcações por confirmar ({pendingBookings.length})
              </h2>
              <ul className="rounded-2xl bg-white border border-black/5 divide-y divide-black/5">
                {pendingBookings.map((booking) => (
                  <li key={booking.id} className="flex items-center justify-between gap-3 px-6 py-4 text-sm">
                    <div>
                      <span className="font-medium text-navy">{booking.name}</span>
                      <span className="text-[#8493ab]"> · {booking.service}</span>
                    </div>
                    <span className="text-[#8493ab]">
                      {booking.date.toLocaleString("pt-PT", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </li>
                ))}
              </ul>
              <Link href="/admin/agenda" className="inline-block mt-3 text-sm font-semibold text-electric hover:text-navy transition-colors">
                Ver agenda →
              </Link>
            </section>
          )}

          {pendingPayments.length > 0 && (
            <section>
              <h2 className="font-display font-bold text-lg mb-3">
                Pagamentos pendentes ({pendingPayments.length})
              </h2>
              <ul className="rounded-2xl bg-white border border-black/5 divide-y divide-black/5">
                {pendingPayments.map((payment) => (
                  <li key={payment.id} className="flex items-center justify-between gap-3 px-6 py-4 text-sm">
                    <div>
                      <span className="font-medium text-navy">{payment.enrollment?.user.name ?? "—"}</span>
                      <span className="text-[#8493ab]"> · {payment.enrollment?.program.name ?? "—"}</span>
                    </div>
                    <span className="font-semibold text-navy">
                      {(payment.amountCents / 100).toLocaleString("pt-PT", { style: "currency", currency: payment.currency })}
                    </span>
                  </li>
                ))}
              </ul>
              <Link href="/admin/pagamentos" className="inline-block mt-3 text-sm font-semibold text-electric hover:text-navy transition-colors">
                Ver pagamentos →
              </Link>
            </section>
          )}

          {unreadMessages.length > 0 && (
            <section>
              <h2 className="font-display font-bold text-lg mb-3">
                Mensagens por ler ({unreadMessages.length})
              </h2>
              <ul className="rounded-2xl bg-white border border-black/5 divide-y divide-black/5">
                {unreadMessages.map((message) => (
                  <li key={message.id} className="px-6 py-4 text-sm">
                    <span className="font-medium text-navy">{message.sender.name}</span>
                    <p className="text-[#8493ab] truncate">{message.body}</p>
                  </li>
                ))}
              </ul>
              <Link href="/admin/mensagens" className="inline-block mt-3 text-sm font-semibold text-electric hover:text-navy transition-colors">
                Ver mensagens →
              </Link>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
