import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { sendMessage } from "@/lib/actions/messages";

export default async function AdminMensagensPage({
  searchParams,
}: {
  searchParams: Promise<{ client?: string }>;
}) {
  const session = await auth();
  const adminId = session!.user.id;
  const { client: selectedClientId } = await searchParams;

  const clients = await prisma.user.findMany({
    where: { role: "CLIENT" },
    orderBy: { name: "asc" },
    include: {
      receivedMessages: {
        where: { senderId: adminId },
        orderBy: { createdAt: "desc" },
        take: 1,
      },
      sentMessages: {
        where: { recipientId: adminId, readAt: null },
      },
    },
  });

  const activeClient = selectedClientId
    ? clients.find((c) => c.id === selectedClientId)
    : clients[0];

  const conversation = activeClient
    ? await prisma.message.findMany({
        where: {
          OR: [
            { senderId: adminId, recipientId: activeClient.id },
            { senderId: activeClient.id, recipientId: adminId },
          ],
        },
        orderBy: { createdAt: "asc" },
      })
    : [];

  if (activeClient) {
    await prisma.message.updateMany({
      where: { senderId: activeClient.id, recipientId: adminId, readAt: null },
      data: { readAt: new Date() },
    });
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="font-display font-bold text-2xl mb-2">Mensagens</h1>
      <p className="text-sm text-[#3d4b63] mb-8">Conversas com clientes.</p>

      <div className="grid md:grid-cols-[16rem_1fr] gap-4">
        <div className="rounded-2xl bg-white border border-black/5 overflow-hidden divide-y divide-black/5">
          {clients.map((client) => {
            const unread = client.sentMessages.length;
            const isActive = activeClient?.id === client.id;
            return (
              <Link
                key={client.id}
                href={`/admin/mensagens?client=${client.id}`}
                className={`flex items-center justify-between px-4 py-3 text-sm transition-colors ${
                  isActive ? "bg-fog" : "hover:bg-fog/60"
                }`}
              >
                <span className="font-medium text-navy truncate">{client.name}</span>
                {unread > 0 && (
                  <span className="shrink-0 w-5 h-5 rounded-full bg-performance-green text-navy text-[10px] font-bold flex items-center justify-center">
                    {unread}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        <div className="rounded-2xl bg-white border border-black/5 p-6 flex flex-col">
          {!activeClient ? (
            <p className="text-sm text-[#8493ab]">Sem clientes.</p>
          ) : (
            <>
              <h2 className="font-display font-bold text-lg mb-4">
                {activeClient.name}
              </h2>
              <div className="space-y-4 mb-4 max-h-[24rem] overflow-y-auto flex-1">
                {conversation.length === 0 ? (
                  <p className="text-sm text-[#8493ab]">Ainda não há mensagens.</p>
                ) : (
                  conversation.map((message) => {
                    const isMine = message.senderId === adminId;
                    return (
                      <div
                        key={message.id}
                        className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                            isMine ? "bg-navy text-white" : "bg-fog text-navy"
                          }`}
                        >
                          <p>{message.body}</p>
                          <p
                            className={`mt-1 text-[10px] ${
                              isMine ? "text-white/50" : "text-[#8493ab]"
                            }`}
                          >
                            {message.createdAt.toLocaleString("pt-PT", {
                              day: "2-digit",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              <form action={sendMessage} className="flex gap-3">
                <input type="hidden" name="recipientId" value={activeClient.id} />
                <input
                  type="text"
                  name="body"
                  required
                  placeholder="Escreve uma mensagem…"
                  className="flex-1 rounded-full border border-black/10 bg-white px-5 py-3 text-sm text-navy placeholder:text-[#8493ab] focus:outline-none focus:ring-2 focus:ring-electric"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-performance-green text-navy font-semibold text-sm hover:bg-navy hover:text-white transition-colors"
                >
                  Enviar
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
