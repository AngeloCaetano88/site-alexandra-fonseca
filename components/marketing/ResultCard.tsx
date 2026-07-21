import { Reveal } from "./Reveal";
import type { Result } from "./data";

export function ResultCard({ result, delay }: { result: Result; delay: number }) {
  return (
    <Reveal delay={delay}>
      <div className="rounded-2xl border border-black/5 bg-fog p-7">
        <p className="text-sm font-semibold text-[#3d4b63] mb-5">{result.label}</p>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xs text-[#8493ab] mb-1">Antes</div>
            <div className="font-display font-bold text-2xl text-[#8493ab]">
              {result.before}
            </div>
          </div>
          <div className="text-performance-green-dark font-bold text-xl pb-1">→</div>
          <div>
            <div className="text-xs text-[#8493ab] mb-1">Depois</div>
            <div className="font-display font-bold text-2xl text-navy">
              {result.after}
            </div>
          </div>
        </div>
        <div className="mt-5 h-1.5 rounded-full bg-black/5 overflow-hidden">
          <div className="h-full bg-performance-green rounded-full" style={{ width: "72%" }} />
        </div>
        <div className="mt-2 text-right text-sm font-bold text-performance-green-dark">
          {result.pct}
        </div>
      </div>
    </Reveal>
  );
}
