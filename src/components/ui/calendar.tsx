"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col gap-4 md:flex-row md:gap-8",
        month: "space-y-4",
        caption: "flex items-center justify-between",
        caption_label: "text-sm font-semibold text-ink-800",
        nav: "flex items-center gap-2",
        nav_button: cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "h-8 w-8 rounded-full border-ink-100 text-ink-500 hover:text-ink-700"
        ),
        nav_button_previous: "",
        nav_button_next: "",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "w-9 rounded-md text-[0.75rem] font-medium text-ink-400",
        row: "mt-2 flex w-full",
        cell: "relative h-9 w-9 rounded-md text-center text-sm",
        day: cn(
          "h-9 w-9 rounded-md p-0 font-medium text-ink-700 aria-selected:bg-brand-600 aria-selected:text-white"
        ),
        day_today: "bg-ink-50 text-ink-700",
        day_outside: "text-ink-300",
        day_disabled: "text-ink-300",
        day_range_middle: "aria-selected:bg-brand-50 aria-selected:text-brand-700",
        day_hidden: "invisible",
        ...classNames
      }}
      components={{
        IconLeft: ({ className: iconClassName, ...iconProps }) => (
          <ChevronLeft className={cn("h-4 w-4", iconClassName)} {...iconProps} />
        ),
        IconRight: ({ className: iconClassName, ...iconProps }) => (
          <ChevronRight className={cn("h-4 w-4", iconClassName)} {...iconProps} />
        )
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
