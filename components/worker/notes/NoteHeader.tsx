import { IoSearch } from "react-icons/io5";
import { useRouter, useSearchParams } from "next/navigation";
import CropSelect from "@/components/crops/CropSelect";
import { Input } from "@/components/ui/input";
import { ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { GoPlus } from "react-icons/go";
const priorities = [
  {
    name: "All Priorities",
    value: "all",
  },
  {
    name: "High",
    value: "high",
  },
  {
    name: "Medium",
    value: "medium",
  },
  {
    name: "Low",
    value: "low",
  },
];
const types = [
  {
    name: "All types",
    value: "all",
  },
  {
    name: "General",
    value: "general",
  },
  {
    name: "Crop",
    value: "crop",
  },
  {
    name: "Pest",
    value: "pest",
  },
  {
    name: "Irrigation",
    value: "irrigation",
  },
  {
    name: "Fertilizer",
    value: "fertilizer",
  },
  {
    name: "Harvest",
    value: "harvest",
  },
  {
    name: "Weather",
    value: "weather",
  },
  {
    name: "Maintenance",
    value: "maintenance",
  },
];

export default function NoteHeader({
  handleSearch,
  handleClick,
  val,
}: {
  handleSearch(e: string): void;
  handleClick(): void;
  val: string;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = searchParams.get("type") || "all";
  const priority = searchParams.get("priority") || "all";
  function handlePriorityChange(val: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (val && val !== "all") {
      params.set("priority", val);
    } else {
      params.delete("priority");
    }
    router.push(`?${params.toString()}`);
  }
  function handleTypeChange(val: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (val && val !== "all") {
      params.set("type", val);
    } else {
      params.delete("type");
    }
    router.push(`?${params.toString()}`);
  }

  return (
    <div className="flex gap-2 flex-col sm:flex-row items-center justify-between">
      <div className="flex w-full sm:w-[35%]  items-center border border-border gap-2 rounded-lg px-2">
        <IoSearch />
        <Input
          onChange={(e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
            handleSearch(e.target.value);
          }}
          value={val}
          placeholder="Search notes..."
          className="border-none p-0 group focus-visible:none shadow-none"
        />
      </div>
      <div className="flex flex-col sm:flex-row w-full items-center gap-2 md:gap-4 justify-between">
        <CropSelect array={types} val={type} setVal={handleTypeChange} />
        <CropSelect
          array={priorities}
          val={priority}
          setVal={handlePriorityChange}
        />
        <Button
          onClick={handleClick}
          className="bg-primary-green w-full  sm:w-fit cursor-pointer text-white rounded-sm"
        >
          <GoPlus />
          <p>Add Notes</p>
        </Button>
      </div>
    </div>
  );
}
