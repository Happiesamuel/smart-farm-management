import CropSelect from "./CropSelect";
import { IoSearch } from "react-icons/io5";
import { Input } from "../ui/input";
import { useRouter, useSearchParams } from "next/navigation";
const status = [
  {
    name: "All Status",
    value: "all",
  },
  {
    name: "Growing",
    value: "growing",
  },
  {
    name: "Harvested",
    value: "harvested",
  },
  {
    name: "Failed",
    value: "failed",
  },
  {
    name: "Planted",
    value: "planted",
  },
  {
    name: "Drying",
    value: "drying",
  },
  {
    name: "Stored",
    value: "stored",
  },
];
export default function CropTableHeader({
  fields,
  farms,
}: {
  fields: { name: string; value: string }[];
  farms: { name: string; value: string }[];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const field = searchParams.get("field") || "all";
  const stat = searchParams.get("status") || "all";
  const farm = searchParams.get("farm") || "all";
  function handleFieldChange(val: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (val && val !== "all") {
      params.set("field", val);
    } else {
      params.delete("field");
    }
    router.push(`?${params.toString()}`);
  }
  function handleFarmChange(val: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (val && val !== "all") {
      params.set("farm", val);
    } else {
      params.delete("farm");
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
          placeholder="Search crops..."
          className="border-none p-0 group focus-visible:none shadow-none"
        />
      </div>
      <div className="flex flex-col sm:flex-row w-full items-center gap-2 md:gap-4 justify-between">
        <CropSelect array={farms} val={farm} setVal={handleFarmChange} />
        <CropSelect array={fields} val={field} setVal={handleFieldChange} />
        <CropSelect array={status} val={stat} setVal={handleStatusChange} />
      </div>
    </div>
  );
}
