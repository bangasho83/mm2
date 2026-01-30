"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";
import { format } from "date-fns";

interface DateRangeContextValue {
  ranges: string[];
  selectedRange: string;
  range?: DateRange;
  setRange: (value?: DateRange) => void;
}

const DateRangeContext = createContext<DateRangeContextValue | null>(null);

export function DateRangeProvider({
  ranges,
  children
}: {
  ranges: string[];
  children: React.ReactNode;
}) {
  const defaultRange = ranges[0] ?? "";
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(2025, 11, 1),
    to: new Date(2025, 11, 29)
  });

  const formattedLabel = useMemo(() => {
    if (!range?.from) return defaultRange;
    if (!range.to) return format(range.from, "MMM dd, yyyy");
    if (range.from.getTime() === range.to.getTime()) {
      return format(range.from, "MMM dd, yyyy");
    }
    return `${format(range.from, "MMM dd, yyyy")} - ${format(range.to, "MMM dd, yyyy")}`;
  }, [range, defaultRange]);

  const value = useMemo(
    () => ({
      ranges,
      selectedRange: formattedLabel,
      range,
      setRange
    }),
    [ranges, formattedLabel, range]
  );

  return <DateRangeContext.Provider value={value}>{children}</DateRangeContext.Provider>;
}

export function useDateRange() {
  const context = useContext(DateRangeContext);
  if (!context) {
    throw new Error("useDateRange must be used within DateRangeProvider");
  }
  return context;
}
