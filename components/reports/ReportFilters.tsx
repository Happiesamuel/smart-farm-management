"use client";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import ReportCalendar from "./ReportCalendar";
import ReportSelect from "./ReportSelect";
export default function ReportFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <div className="flex gap-2 flex-col sm:flex-row items-center p-2 justify-between border-border border-b">
      <div className="flex flex-col w-full sm:w-fit   sm:flex-row items-center gap-2 sm:gap-4">
        <ReportCalendar />

        {(searchParams.get("from") || searchParams.get("to")) && (
          <Button
            variant="outline"
            className="text-red-500 rounded border-red-200 w-full sm:w-fit"
            onClick={() => {
              const params = new URLSearchParams(searchParams.toString());
              params.delete("from");
              params.delete("to");
              router.push(`?${params.toString()}`);
            }}
          >
            Clear dates
          </Button>
        )}
      </div>
      <ReportSelect array={[]} />
    </div>
  );
}
