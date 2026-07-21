"use client";

import { useCountUp, useInView } from "./hooks";

export function Stat({
  value,
  suffix,
  label,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const count = useCountUp(value, inView, 1600);
  return (
    <div ref={ref} className="text-center">
      <div
        className="font-display font-bold text-4xl md:text-5xl text-white tabular-nums transition-opacity duration-500"
        style={{ transitionDelay: `${delay}ms` }}
      >
        {count}
        <span className="text-performance-green">{suffix}</span>
      </div>
      <div className="mt-2 text-xs md:text-sm tracking-[0.15em] uppercase text-[#9fb3d1]">
        {label}
      </div>
    </div>
  );
}
