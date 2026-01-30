"use client";

import { useEffect, useMemo, useState } from "react";
import { addDays, endOfMonth, endOfWeek, format, startOfMonth, startOfWeek } from "date-fns";
import { CalendarDays } from "lucide-react";
import type { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useDateRange } from "@/components/layout/DateRangeContext";

const presets = [
  { label: "Today", getRange: () => ({ from: new Date(), to: new Date() }) },
  {
    label: "Yesterday",
    getRange: () => {
      const date = addDays(new Date(), -1);
      return { from: date, to: date };
    }
  },
  { label: "Last 7 days", getRange: () => ({ from: addDays(new Date(), -6), to: new Date() }) },
  { label: "Last 14 days", getRange: () => ({ from: addDays(new Date(), -13), to: new Date() }) },
  { label: "Last 30 days", getRange: () => ({ from: addDays(new Date(), -29), to: new Date() }) },
  {
    label: "This Week",
    getRange: () => ({
      from: startOfWeek(new Date(), { weekStartsOn: 1 }),
      to: endOfWeek(new Date(), { weekStartsOn: 1 })
    })
  },
  {
    label: "Last Week",
    getRange: () => {
      const start = addDays(startOfWeek(new Date(), { weekStartsOn: 1 }), -7);
      return { from: start, to: addDays(start, 6) };
    }
  },
  {
    label: "This Month",
    getRange: () => ({ from: startOfMonth(new Date()), to: endOfMonth(new Date()) })
  },
  {
    label: "Last Month",
    getRange: () => {
      const start = startOfMonth(addDays(new Date(), -30));
      return { from: start, to: endOfMonth(start) };
    }
  }
];

function formatRange(range?: DateRange) {
  if (!range?.from) return "Pick a date";
  if (!range.to) return format(range.from, "MMM dd, yyyy");
  if (range.from.getTime() === range.to.getTime()) {
    return format(range.from, "MMM dd, yyyy");
  }
  return `${format(range.from, "MMM dd, yyyy")} - ${format(range.to, "MMM dd, yyyy")}`;
}

export function DateRangePicker() {
  const { range, setRange } = useDateRange();
  const [open, setOpen] = useState(false);
  const [tempRange, setTempRange] = useState(range);

  useEffect(() => {
    if (open) {
      setTempRange(range);
    }
  }, [open, range]);

  const label = useMemo(() => formatRange(range), [range]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("h-10 gap-2 rounded-full border-ink-200 bg-white px-4 font-semibold")}
        >
          <CalendarDays className="h-4 w-4 text-brand-600" />
          <span className="text-sm text-ink-700">{label}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex flex-col gap-4 p-4 md:flex-row">
          <div className="rounded-2xl border border-ink-100 bg-white">
            <Calendar
              mode="range"
              numberOfMonths={2}
              selected={tempRange}
              onSelect={setTempRange}
              defaultMonth={tempRange?.from}
            />
          </div>
          <div className="flex w-full flex-col gap-2 md:w-40">
            {presets.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => setTempRange(preset.getRange())}
                className="rounded-xl border border-ink-100 bg-white px-3 py-2 text-left text-sm font-semibold text-ink-700 transition hover:bg-ink-50"
              >
                {preset.label}
              </button>
            ))}
            <div className="mt-auto flex items-center justify-end gap-2 pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setTempRange(range);
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  setRange(tempRange);
                  setOpen(false);
                }}
              >
                Update
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
