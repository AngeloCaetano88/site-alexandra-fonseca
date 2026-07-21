import Link from "next/link";
import { auth } from "@/auth";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { GlassButton } from "./GlassButton";

const navLinks = [
  { href: "/#sobre", label: "Sobre" },
  { href: "/#servicos", label: "Serviços" },
  { href: "/#programas", label: "Programas" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contacto", label: "Contacto" },
];

export async function Header() {
  const session = await auth();

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-navy/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <span className="font-display font-bold text-lg tracking-tight">
            <span className="text-performance-green">80</span>
            <span className="text-white/40">/</span>
            <span className="text-electric">20</span>
          </span>
          <span className="hidden sm:inline text-white/70 text-sm font-medium pl-2.5 border-l border-white/20">
            Alexandra Fonseca
          </span>
        </Link>
        <nav className="hidden lg:flex items-center gap-6 text-sm text-[#c9d6ea] font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4 shrink-0">
          {session?.user ? (
            <>
              <Link
                href={session.user.role === "ADMIN" ? "/admin" : "/dashboard"}
                className="hidden sm:inline text-sm font-semibold text-white/80 hover:text-white transition-colors"
              >
                A minha área
              </Link>
              <SignOutButton
                redirectTo="/"
                className="hidden sm:inline text-sm font-semibold text-white/50 hover:text-white transition-colors"
              />
            </>
          ) : (
            <Link
              href="/login"
              className="hidden sm:inline text-sm font-semibold text-white/80 hover:text-white transition-colors"
            >
              Entrar
            </Link>
          )}
          <GlassButton variant="outline" href="/calendario">
            Marcar Avaliação
          </GlassButton>
        </div>
      </div>
    </header>
  );
}
