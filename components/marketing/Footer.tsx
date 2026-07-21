import Link from "next/link";

const footerLinks = [
  { href: "/#sobre", label: "Sobre" },
  { href: "/#servicos", label: "Serviços" },
  { href: "/#programas", label: "Programas" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contacto", label: "Contacto" },
  { href: "/calendario", label: "Marcar Avaliação" },
];

export function Footer() {
  return (
    <footer className="bg-[#08172c] text-[#9fb3d1]">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <Link href="/" className="font-display font-bold text-lg tracking-tight">
          <span className="text-performance-green">80</span>
          <span className="text-white/40">/</span>
          <span className="text-electric">20</span>
          <span className="hidden sm:inline text-white/70 text-sm font-medium pl-2.5 ml-2.5 border-l border-white/20">
            Alexandra Fonseca
          </span>
        </Link>
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span>
            © 2026 Alexandra Fonseca — Coach Desportivo. Todos os direitos
            reservados.
          </span>
          <Link
            href="/politica-de-privacidade"
            className="hover:text-white transition-colors underline decoration-performance-green underline-offset-4"
          >
            Política de Privacidade e Cookies (RGPD)
          </Link>
        </div>
      </div>
    </footer>
  );
}
