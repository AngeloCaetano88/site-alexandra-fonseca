import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col bg-navy relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(21,101,192,0.5), transparent 55%), radial-gradient(circle at 10% 80%, rgba(0,200,83,0.25), transparent 45%)",
        }}
      />
      <div className="relative flex flex-col flex-1 items-center justify-center px-6 py-16">
        <Link href="/" className="mb-8 flex items-center gap-2.5">
          <span className="font-display font-bold text-xl tracking-tight">
            <span className="text-performance-green">80</span>
            <span className="text-white/40">/</span>
            <span className="text-electric">20</span>
          </span>
          <span className="text-white/70 text-sm font-medium pl-2.5 border-l border-white/20">
            Alexandra Fonseca
          </span>
        </Link>
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
          {children}
        </div>
      </div>
    </div>
  );
}
