/**
 * Divisor diagonal tracejado — elemento de assinatura visual.
 * Usar com moderação, apenas nas transições principais da homepage.
 */
export function LaneSeam({ flip = false }: { flip?: boolean }) {
  return (
    <div className="relative h-16 md:h-24 overflow-hidden" aria-hidden="true">
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 1200 100"
      >
        <polygon
          points={flip ? "0,100 1200,0 1200,100" : "0,0 1200,100 0,100"}
          fill="#0B1F3A"
        />
        <line
          x1="0"
          y1={flip ? "100" : "100"}
          x2="1200"
          y2={flip ? "0" : "0"}
          stroke="#00C853"
          strokeWidth="2"
          strokeDasharray="14 10"
        />
      </svg>
    </div>
  );
}
