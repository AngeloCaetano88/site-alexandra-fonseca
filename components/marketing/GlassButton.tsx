export function GlassButton({
  children,
  variant = "solid",
  href = "#",
}: {
  children: React.ReactNode;
  variant?: "solid" | "outline";
  href?: string;
}) {
  const base =
    "inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-performance-green";

  if (variant === "solid") {
    return (
      <a
        href={href}
        className={`${base} bg-performance-green text-navy hover:bg-white hover:shadow-[0_0_0_1px_rgba(255,255,255,0.4)] hover:-translate-y-0.5`}
      >
        {children}
      </a>
    );
  }
  return (
    <a
      href={href}
      className={`${base} text-white bg-white/10 backdrop-blur-md border border-white/25 hover:bg-white/20 hover:-translate-y-0.5`}
    >
      {children}
    </a>
  );
}
