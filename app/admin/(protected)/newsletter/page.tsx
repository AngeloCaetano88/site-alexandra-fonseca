import { prisma } from "@/lib/prisma";
import { hasMailchimp } from "@/lib/mailchimp";

export default async function AdminNewsletterPage() {
  const subscribers = await prisma.newsletterSubscriber.findMany({
    orderBy: { subscribedAt: "desc" },
    include: { user: true },
  });

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="font-display font-bold text-2xl mb-1">Newsletter</h1>
      <p className="text-sm text-[#3d4b63] mb-6">
        {subscribers.length} subscritor{subscribers.length !== 1 ? "es" : ""}.
      </p>

      {!hasMailchimp && (
        <div className="mb-6 rounded-xl bg-fog border border-black/5 px-4 py-3 text-sm text-[#3d4b63]">
          O Mailchimp ainda não está configurado — os subscritores ficam
          guardados aqui, mas não são sincronizados automaticamente.
        </div>
      )}

      {subscribers.length === 0 ? (
        <div className="rounded-2xl bg-white border border-black/5 p-8 text-sm text-[#3d4b63]">
          Ainda não há subscritores.
        </div>
      ) : (
        <div className="rounded-2xl bg-white border border-black/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/5 text-left text-xs uppercase tracking-wide text-[#8493ab]">
                  <th className="px-6 py-4 font-semibold">Email</th>
                  <th className="px-6 py-4 font-semibold">Cliente</th>
                  <th className="px-6 py-4 font-semibold">Subscrito em</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="border-b border-black/5 last:border-0">
                    <td className="px-6 py-4 font-medium text-navy">{subscriber.email}</td>
                    <td className="px-6 py-4 text-[#8493ab]">{subscriber.user?.name ?? "—"}</td>
                    <td className="px-6 py-4 text-[#8493ab]">
                      {subscriber.subscribedAt.toLocaleDateString("pt-PT", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
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
