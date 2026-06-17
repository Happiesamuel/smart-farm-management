"use client";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { useSearchParams, useRouter } from "next/navigation";
export default function BothCalendar({type}:{type:string}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const fromParam = searchParams.get("from");
  const toParam = searchParams.get("to");

  const dateRange: DateRange = {
    from: fromParam ? new Date(fromParam) : undefined,
    to: toParam ? new Date(toParam) : undefined,
  };

  function handleSelect(range: DateRange | undefined) {
    const params = new URLSearchParams(searchParams.toString());
    if (range?.from) {
      params.set("from", format(range.from, "yyyy-MM-dd"));
    } else {
      params.delete("from");
    }
    if (range?.to) {
      params.set("to", format(range.to, "yyyy-MM-dd"));
    } else {
      params.delete("to");
    }
    params.set(type, "1");
    router.push(`?${params.toString()}`);
  }


  return (
    <div className="w-full">
      <Popover>
        {/* Trigger */}
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="md:w-full w-full justify-center text-dark/80 text-sm text-left font-normal"
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
          onSelect={handleSelect}
          numberOfMonths={2}
          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
        />
      </PopoverContent>
      </Popover>
    </div>
  );
}
