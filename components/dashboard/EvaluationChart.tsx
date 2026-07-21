"use client";

import { useId, useState } from "react";

type Point = { date: string; value: number };

export function EvaluationChart({
  title,
  unit,
  points,
  trend,
}: {
  title: string;
  unit: string;
  points: Point[];
  /** "up" if a rising value is the desired direction, "down" otherwise */
  trend: "up" | "down";
}) {
  const gradientId = useId();
  const [hovered, setHovered] = useState<number | null>(null);

  if (points.length === 0) {
    return (
      <div className="rounded-2xl bg-white border border-black/5 p-6">
        <h3 className="font-semibold text-navy mb-1">{title}</h3>
        <p className="text-sm text-[#8493ab]">Ainda sem avaliações registadas.</p>
      </div>
    );
  }

  const width = 320;
  const height = 140;
  const padding = 24;

  const values = points.map((p) => p.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const coords = points.map((p, i) => {
    const x =
      points.length === 1
        ? width / 2
        : padding + (i / (points.length - 1)) * (width - padding * 2);
    const y =
      height - padding - ((p.value - min) / range) * (height - padding * 2);
    return { x, y, ...p };
  });

  const path = coords
    .map((c, i) => `${i === 0 ? "M" : "L"} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`)
    .join(" ");
  const areaPath = `${path} L ${coords[coords.length - 1].x.toFixed(1)} ${height - padding} L ${coords[0].x.toFixed(1)} ${height - padding} Z`;

  const first = points[0];
  const last = points[points.length - 1];
  const delta = last.value - first.value;
  const improved = trend === "up" ? delta > 0 : delta < 0;

  return (
    <div className="rounded-2xl bg-white border border-black/5 p-6">
      <div className="flex items-start justify-between mb-1">
        <h3 className="font-semibold text-navy">{title}</h3>
        {points.length > 1 && (
          <span
            className={`text-xs font-semibold rounded-full px-2 py-0.5 ${
              improved
                ? "bg-performance-green/15 text-performance-green-dark"
                : "bg-black/5 text-[#8493ab]"
            }`}
          >
            {delta > 0 ? "+" : ""}
            {delta.toFixed(1)} {unit}
          </span>
        )}
      </div>
      <p className="text-2xl font-display font-bold text-navy mb-3">
        {last.value}
        <span className="text-sm font-sans font-normal text-[#8493ab]"> {unit}</span>
      </p>
      <div className="relative">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible"
          role="img"
          aria-label={`${title}: ${points
            .map((p) => `${formatDate(p.date)} ${p.value}${unit}`)
            .join(", ")}`}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1565C0" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#1565C0" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line
            x1={padding}
            y1={height - padding}
            x2={width - padding}
            y2={height - padding}
            stroke="#e5e9ef"
            strokeWidth="1"
          />
          <path d={areaPath} fill={`url(#${gradientId})`} stroke="none" />
          <path
            d={path}
            fill="none"
            stroke="#1565C0"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {coords.map((c, i) => (
            <circle
              key={c.date}
              cx={c.x}
              cy={c.y}
              r={hovered === i ? 6 : 4}
              fill="#1565C0"
              stroke="white"
              strokeWidth="2"
              className="transition-all cursor-pointer"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            />
          ))}
        </svg>
        {hovered !== null && (
          <div
            className="absolute -translate-x-1/2 -translate-y-full rounded-lg bg-navy text-white text-xs px-2.5 py-1.5 pointer-events-none whitespace-nowrap shadow-lg"
            style={{
              left: `${(coords[hovered].x / width) * 100}%`,
              top: `${(coords[hovered].y / height) * 100 - 6}%`,
            }}
          >
            {formatDate(coords[hovered].date)} · {coords[hovered].value} {unit}
          </div>
        )}
      </div>
    </div>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "short",
  });
}
