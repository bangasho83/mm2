"use client";

import { createContext, useContext, useMemo, useState, useCallback, useEffect } from "react";
import type { DateRange } from "react-day-picker";
import { addDays, format, parseISO, isValid } from "date-fns";

interface DateRangeContextValue {
  ranges: string[];
  selectedRange: string;
  range?: DateRange;
  setRange: (value?: DateRange) => void;
}

const DateRangeContext = createContext<DateRangeContextValue | null>(null);

const COOKIE_NAME = "mm2_date_range";

function readCookie(name: string) {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : "";
}

function writeCookie(name: string, value: string, days = 30) {
  if (typeof document === "undefined") return;
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}`;
}

function parseRangeFromCookie(): DateRange | undefined {
  const raw = readCookie(COOKIE_NAME);
  if (!raw) return undefined;
  try {
    const parsed = JSON.parse(raw) as { from?: string; to?: string };
    if (!parsed.from) return undefined;
    const fromDate = parseISO(parsed.from);
    const toDate = parsed.to ? parseISO(parsed.to) : fromDate;
    if (!isValid(fromDate) || !isValid(toDate)) return undefined;
    return { from: fromDate, to: toDate };
  } catch {
    return undefined;
  }
}

export function DateRangeProvider({
  ranges,
  children
}: {
  ranges: string[];
  children: React.ReactNode;
}) {
  const defaultRange = ranges[0] ?? "";
  const [range, setRangeState] = useState<DateRange | undefined>(undefined);

  useEffect(() => {
    if (range) return;
    const fromCookie = parseRangeFromCookie();
    if (fromCookie?.from) {
      setRangeState(fromCookie);
      return;
    }
    const now = new Date();
    setRangeState({ from: addDays(now, -6), to: now });
  }, [range]);

  const setRangeAndPersist = useCallback((value?: DateRange) => {
    setRangeState(value);
    if (value?.from) {
      const payload = JSON.stringify({
        from: format(value.from, "yyyy-MM-dd"),
        to: value.to ? format(value.to, "yyyy-MM-dd") : format(value.from, "yyyy-MM-dd")
      });
      writeCookie(COOKIE_NAME, payload);
    }
  }, []);

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
      setRange: setRangeAndPersist
    }),
    [ranges, formattedLabel, range, setRangeAndPersist]
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
