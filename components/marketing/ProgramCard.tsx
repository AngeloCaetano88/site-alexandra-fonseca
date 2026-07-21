import { Reveal } from "./Reveal";
import type { Program } from "./data";

export function ProgramCard({ program, delay }: { program: Program; delay: number }) {
  return (
    <Reveal delay={delay}>
      <div className="rounded-2xl bg-white/5 border border-white/10 p-7 flex items-center justify-between gap-6 hover:border-performance-green/50 transition-colors">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-display font-bold text-white text-lg">
              {program.name}
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-performance-green/15 text-performance-green font-semibold">
              {program.duration}
            </span>
          </div>
          <p className="text-sm text-[#9fb3d1] leading-relaxed">{program.goal}</p>
        </div>
        <a
          href="/calendario"
          className="shrink-0 text-sm font-semibold text-performance-green hover:text-white transition-colors"
        >
          Inscrever →
        </a>
      </div>
    </Reveal>
  );
}
