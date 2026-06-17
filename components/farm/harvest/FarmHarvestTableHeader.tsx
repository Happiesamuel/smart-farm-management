"use client";

import { IoSearch } from "react-icons/io5";
import { Input } from "../../ui/input";
import HarvestSelect from "@/components/harvests/HarvestSelect";

import { useRouter, useSearchParams } from "next/navigation";
const status = [
  {
    name: "All Status",
    value: "all",
  },
  {
    name: "Stored",
    value: "stored",
  },
  {
    name: "Sold",
    value: "sold",
  },
  {
    name: "Wasted",
    value: "wasted",
  },
];
const quality = [
  {
    name: "All Quality",
    value: "all",
  },
  {
    name: "Excellent",
    value: "excellent",
  },
  {
    name: "Good",
    value: "good",
  },
  {
    name: "Average",
    value: "average",
  },
  {
    name: "Poor",
    value: "poor",
  },
];

export default function FarmHarvestTableHeader({
  fields,
}: {
  fields: { name: string; value: string }[];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const field = searchParams.get("field") || "all";
  const stat = searchParams.get("status") || "all";
  const qual = searchParams.get("quality") || "all";
  function handleFieldChange(val: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (val && val !== "all") {
      params.set("field", val);
    } else {
      params.delete("field");
    }
    router.push(`?${params.toString()}`);
  }
  function handleQualityChange(val: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (val && val !== "all") {
      params.set("quality", val);
    } else {
      params.delete("quality");
    }
    router.push(`?${params.toString()}`);
  }
  function handleStatusChange(val: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (val && val !== "all") {
      params.set("status", val);
    } else {
      params.delete("status");
    }
    router.push(`?${params.toString()}`);
  }
  function handleSearchChange(val: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (val) {
      params.set("search", val);
    } else {
      params.delete("search");
    }
    router.push(`?${params.toString()}`);
  }

  return (
    <div className="flex gap-2 flex-col sm:flex-row items-center justify-between">
      <div className="flex w-full sm:w-[35%]  items-center border border-border gap-2 rounded-lg px-2">
        <IoSearch />
        <Input
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search harvested crops..."
          className="border-none p-0 group focus-visible:none shadow-none"
        />
      </div>
      <div className="flex flex-col sm:flex-row w-full items-center gap-2 md:gap-4 justify-between">
        <HarvestSelect array={fields} val={field} setVal={handleFieldChange} />
        <HarvestSelect array={status} val={stat} setVal={handleStatusChange} />
        <HarvestSelect
          array={quality}
          val={qual}
          setVal={handleQualityChange}
        />
      </div>
    </div>
  );
}
