import { memo } from "react";
import { cn } from "@/lib/utils";

function buildPath(data: number[], width: number, height: number) {
  if (!data.length) return "";
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const coords = data.map((value, index) => {
    const x = data.length === 1 ? width : (index / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    return { x, y };
  });

  if (coords.length === 1) {
    return `M ${coords[0].x.toFixed(2)} ${coords[0].y.toFixed(2)} L ${width} ${coords[0].y.toFixed(2)}`;
  }

  let path = `M ${coords[0].x.toFixed(2)} ${coords[0].y.toFixed(2)}`;
  for (let i = 0; i < coords.length - 1; i += 1) {
    const prev = coords[i - 1] ?? coords[i];
    const cur = coords[i];
    const next = coords[i + 1];
    const after = coords[i + 2] ?? next;
    const cp1x = cur.x + (next.x - prev.x) / 6;
    const cp1y = cur.y + (next.y - prev.y) / 6;
    const cp2x = next.x - (after.x - cur.x) / 6;
    const cp2y = next.y - (after.y - cur.y) / 6;
    path += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${next.x.toFixed(2)} ${next.y.toFixed(2)}`;
  }
  return path;
}

function SparklineBase({ data, className }: { data: number[]; className?: string }) {
  const width = 440;
  const height = 90;
  const path = buildPath(data, width, height);
  const fillPath = path ? `${path} L ${width} ${height} L 0 ${height} Z` : "";

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn("h-16 w-full", className)}
      aria-hidden
    >
      <defs>
        <linearGradient id="sparkline" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2f7bff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#2f7bff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fillPath} fill="url(#sparkline)" />
      <path d={path} fill="none" stroke="#2f7bff" strokeWidth="2" />
    </svg>
  );
}

export const Sparkline = memo(SparklineBase);
