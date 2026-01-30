import { cn } from "@/lib/utils";

function buildPath(data: number[], width: number, height: number) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  return data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}

export function Sparkline({ data, className }: { data: number[]; className?: string }) {
  const width = 180;
  const height = 60;
  const path = buildPath(data, width, height);
  const fillPath = `${path} L ${width} ${height} L 0 ${height} Z`;

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
