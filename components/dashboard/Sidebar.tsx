"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Visão geral" },
  { href: "/dashboard/programas", label: "Programas" },
  { href: "/dashboard/treinos", label: "Treinos" },
  { href: "/dashboard/avaliacoes", label: "Avaliações" },
  { href: "/dashboard/pagamentos", label: "Pagamentos" },
  { href: "/dashboard/recursos", label: "Recursos" },
  { href: "/dashboard/mensagens", label: "Mensagens" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex overflow-x-auto md:flex-col gap-1 md:w-56 shrink-0 border-b md:border-b-0 md:border-r border-black/5 bg-white px-3 py-3 md:py-6">
      {links.map((link) => {
        const active =
          link.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`shrink-0 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
              active
                ? "bg-navy text-white"
                : "text-[#3d4b63] hover:bg-fog"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
