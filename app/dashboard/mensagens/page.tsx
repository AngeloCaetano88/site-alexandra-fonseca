import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { sendMessage } from "@/lib/actions/messages";

export default async function MensagensPage() {
  const session = await auth();
  const userId = session!.user.id;

  const coach = await prisma.user.findFirst({ where: { role: "ADMIN" } });

  if (!coach) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="font-display font-bold text-2xl mb-2">Mensagens</h1>
        <p className="text-sm text-[#3d4b63]">
          De momento não há nenhum coach disponível para contacto direto.
        </p>
      </div>
    );
  }

  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { senderId: userId, recipientId: coach.id },
        { senderId: coach.id, recipientId: userId },
      ],
    },
    orderBy: { createdAt: "asc" },
  });

  await prisma.message.updateMany({
    where: { senderId: coach.id, recipientId: userId, readAt: null },
    data: { readAt: new Date() },
  });

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="font-display font-bold text-2xl mb-2">Mensagens</h1>
      <p className="text-sm text-[#3d4b63] mb-8">
        Conversa direta com {coach.name}.
      </p>

      <div className="rounded-2xl bg-white border border-black/5 p-6 mb-4 space-y-4 max-h-[28rem] overflow-y-auto">
        {messages.length === 0 ? (
          <p className="text-sm text-[#8493ab]">
            Ainda não há mensagens. Escreve a primeira abaixo.
          </p>
        ) : (
          messages.map((message) => {
            const isMine = message.senderId === userId;
            return (
              <div
                key={message.id}
                className={`flex ${isMine ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                    isMine
                      ? "bg-navy text-white"
                      : "bg-fog text-navy"
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
        <input type="hidden" name="recipientId" value={coach.id} />
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
    </div>
  );
}
