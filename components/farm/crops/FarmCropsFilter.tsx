"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { GoPlus } from "react-icons/go";
import { IoSearch } from "react-icons/io5";

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
export default function FarmCropsFilter({
  fields,
}: {
  fields: { name: string; value: string }[];
}) {
  const { workspaceId } = useParams();
  const { farmId } = useParams();

  const searchParams = useSearchParams();
  const router = useRouter();
  const field = searchParams.get("field") || "all";
  const stat = searchParams.get("status") || "all";
  function handleFieldChange(val: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (val && val !== "all") {
      params.set("field", val);
    } else {
      params.delete("field");
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
    <div className="flex sm:flex-row gap-4 flex-col items-center justify-between pb-4">
      <div className="flex sm:flex-row flex-col items-center sm:w-fit w-full gap-2 sm:gap-4">
        <Select
          onValueChange={(e) => handleFieldChange(e)}
          defaultValue={field}
        >
          <SelectTrigger className="text-dark/90 border w-full border-border bg-white rounded-lg">
            <SelectValue placeholder="All Fields" />
          </SelectTrigger>
          <SelectContent className="bg-white mt-6 border-border text-zinc-400">
            {fields.map((x) => (
              <SelectItem
                key={x.value}
                value={x.value}
                className="hover:bg-zinc-900 text-dark/90 transition-all duration-500 cursor-pointer"
              >
                {x.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          onValueChange={(e) => handleStatusChange(e)}
          defaultValue={stat}
        >
          <SelectTrigger className="text-dark/90 w-full border border-border bg-white rounded-lg">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent className="bg-white border-border text-zinc-400">
            {status.map((x) => (
              <SelectItem
                key={x.name}
                value={x.value}
                className="hover:bg-zinc-900 text-dark/90 transition-all duration-500 cursor-pointer"
              >
                {x.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex w-full  items-center border border-border gap-2 rounded-lg px-2">
          <IoSearch />
          <Input
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search Crops..."
            className="border-none p-0 group focus-visible:none shadow-none w-full"
          />
        </div>
      </div>

      <Button className="bg-primary-green w-full sm:w-fit cursor-pointer text-white">
        <Link
          href={`/user/${workspaceId}/farms/${farmId}/add-crop`}
          className="flex items-center gap-1"
        >
          <GoPlus />
          <p>Add Crop</p>
        </Link>
      </Button>
    </div>
  );
}
