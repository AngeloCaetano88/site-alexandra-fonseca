import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { Sidebar } from "@/components/dashboard/Sidebar";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex flex-col bg-fog">
      <header className="bg-navy">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="font-display font-bold text-lg tracking-tight">
              <span className="text-performance-green">80</span>
              <span className="text-white/40">/</span>
              <span className="text-electric">20</span>
            </span>
            <span className="text-white/70 text-sm font-medium pl-2.5 border-l border-white/20">
              A minha área
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#c9d6ea]">{session.user.name}</span>
            <SignOutButton
              redirectTo="/"
              className="text-sm font-semibold text-white/70 hover:text-white transition-colors"
            />
          </div>
        </div>
      </header>
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto md:px-0">
        <Sidebar />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
