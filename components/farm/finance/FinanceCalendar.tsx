"use client";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { useState } from "react";

export default function FinanceCalendar() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  return (
    <Popover>
      {/* Trigger */}
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-fit justify-start text-dark/80 text-sm text-left font-normal"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />

          {dateRange?.from ? (
            dateRange.to ? (
              <>
                {format(dateRange.from, "MMM dd, yyyy")} -{" "}
                {format(dateRange.to, "MMM dd, yyyy")}
              </>
            ) : (
              format(dateRange.from, "MMM dd, yyyy")
            )
          ) : (
            <span>Select date</span>
          )}
        </Button>
      </PopoverTrigger>

      {/* Calendar */}
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="range"
          defaultMonth={dateRange?.from}
          selected={dateRange}
          onSelect={setDateRange}
          numberOfMonths={2}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
        />
      </PopoverContent>
    </Popover>
  );
}
