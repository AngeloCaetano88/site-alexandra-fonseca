export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="h-[2px] w-8 bg-performance-green" />
      <span className="text-xs font-semibold tracking-[0.25em] uppercase text-electric">
        {children}
      </span>
    </div>
  );
}
