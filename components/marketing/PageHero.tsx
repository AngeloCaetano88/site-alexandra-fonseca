export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative pt-16 bg-navy overflow-hidden">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(21,101,192,0.5), transparent 55%), radial-gradient(circle at 10% 80%, rgba(0,200,83,0.25), transparent 45%)",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-16 text-center">
        <p className="text-xs font-semibold tracking-[0.3em] uppercase text-performance-green mb-4">
          {eyebrow}
        </p>
        <h1 className="font-display font-extrabold text-white text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 text-lg text-[#c9d6ea] max-w-xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
