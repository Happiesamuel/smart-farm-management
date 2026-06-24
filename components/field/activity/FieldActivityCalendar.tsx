"use client";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { useSearchParams, useRouter } from "next/navigation";

export default function FieldActivityCalendar() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const fromParam = searchParams.get("activityFrom");
  const toParam = searchParams.get("activityTo");

  const dateRange: DateRange = {
    from: fromParam ? new Date(fromParam) : undefined,
    to: toParam ? new Date(toParam) : undefined,
  };

  function handleSelect(range: DateRange | undefined) {
    const params = new URLSearchParams(searchParams.toString());
    if (range?.from) {
      params.set("activityFrom", format(range.from, "yyyy-MM-dd"));
    } else {
      params.delete("activityFrom");
    }
    if (range?.to) {
      params.set("activityTo", format(range.to, "yyyy-MM-dd"));
    } else {
      params.delete("activityTo");
    }
    params.set("activityPage", "1");
    router.push(`?${params.toString()}`, { scroll: false });
  }

  function handleClear() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("activityFrom");
    params.delete("activityTo");
    params.set("activityPage", "1");
    router.push(`?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex w-full sm:w-fit flex-col sm:flex-row sm:items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="md:w-full truncate w-full justify-center text-dark/80 text-sm text-left font-normal"
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
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={handleSelect}
            numberOfMonths={2}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
          />
        </PopoverContent>
      </Popover>

      {(fromParam || toParam) && (
        <Button
          className="text-red-500 w-full sm:w-fit bg-transparent border-red-200"
          onClick={handleClear}
        >
          <X className="w-3 h-3 mr-1" /> Clear Date
        </Button>
      )}
    </div>
  );
}
