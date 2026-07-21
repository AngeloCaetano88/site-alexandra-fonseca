import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminOverviewPage() {
  const [clients, activeEnrollments, pendingBookings, publishedArticles] =
    await Promise.all([
      prisma.user.count({ where: { role: "CLIENT" } }),
      prisma.enrollment.count({ where: { status: "ACTIVE" } }),
      prisma.booking.count({ where: { status: "PENDING" } }),
      prisma.article.count({ where: { status: "PUBLISHED" } }),
    ]);

  const stats = [
    { label: "Clientes", value: clients, href: "/admin/clientes" },
    { label: "Inscrições ativas", value: activeEnrollments, href: "/admin/relatorios" },
    { label: "Marcações pendentes", value: pendingBookings, href: "/admin/agenda" },
    { label: "Artigos publicados", value: publishedArticles, href: "/admin/blog" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="font-display font-bold text-2xl mb-2">Visão geral</h1>
      <p className="text-sm text-[#3d4b63] mb-8">
        Gestão de clientes, programas, blog, pagamentos e agenda.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-2xl bg-white border border-black/5 p-6 hover:border-electric/40 transition-colors"
          >
            <div className="font-display font-bold text-3xl text-navy">
              {stat.value}
            </div>
            <div className="mt-1 text-sm text-[#8493ab]">{stat.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
