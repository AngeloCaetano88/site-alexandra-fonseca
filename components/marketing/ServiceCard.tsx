import { Reveal } from "./Reveal";
import type { Service } from "./data";

export function ServiceCard({ service, delay }: { service: Service; delay: number }) {
  return (
    <Reveal delay={delay}>
      <div className="h-full flex flex-col rounded-2xl border border-black/5 p-8 bg-fog hover:bg-navy group transition-colors duration-300">
        <h3 className="font-display font-bold text-xl mb-3 group-hover:text-white transition-colors">
          {service.title}
        </h3>
        <p className="text-sm text-[#3d4b63] group-hover:text-[#c9d6ea] mb-6 leading-relaxed transition-colors">
          {service.desc}
        </p>
        <ul className="space-y-2 mb-8 text-sm">
          {service.points.map((p) => (
            <li
              key={p}
              className="flex items-center gap-2 text-[#3d4b63] group-hover:text-[#c9d6ea] transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-performance-green shrink-0" />
              {p}
            </li>
          ))}
        </ul>
        <div className="mt-auto">
          <a
            href="/calendario"
            className="text-sm font-semibold underline decoration-performance-green decoration-2 underline-offset-4 text-electric group-hover:text-white transition-colors"
          >
            Saber Mais
          </a>
        </div>
      </div>
    </Reveal>
  );
}
