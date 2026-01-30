import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  right?: ReactNode;
  align?: "left" | "center";
}

export function PageHeader({ title, subtitle, right, align = "center" }: PageHeaderProps) {
  return (
    <header
      className={[
        "flex flex-wrap items-center justify-between gap-4",
        align === "center" ? "text-center" : "text-left"
      ].join(" ")}
    >
      <div className={align === "center" ? "mx-auto max-w-2xl" : ""}>
        <h1 className="font-display text-3xl font-semibold text-ink-900">{title}</h1>
        {subtitle ? <p className="text-sm text-ink-500">{subtitle}</p> : null}
      </div>
      {right ? <div className={align === "center" ? "mx-auto" : ""}>{right}</div> : null}
    </header>
  );
}
