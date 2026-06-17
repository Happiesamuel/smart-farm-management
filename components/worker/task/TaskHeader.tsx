"use client";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { LuListFilter } from "react-icons/lu";
const array = [
  {
    name: "All Tasks",
    value: "all",
  },
  {
    name: "Recent Tasks",
    value: "recent",
  },
];
export default function TaskHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const val = searchParams.get("sort") || "all";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.push(`?${params.toString()}`);
  };
  return (
    <div className="flex gap-2 sm:flex-row flex-col sm:items-center justify-between">
      <div className="space-y-2">
        <h5 className="text-xl text-dark font-semibold">My Tasks</h5>
        <p className="text-sm text-zinc-500 font-medium">
          View and manage all tasks assigned to you.
        </p>
      </div>
      <div className="w-fit self-end  flex  sm:block sm:w-fit">
        <Select onValueChange={(e) => handleChange(e)} defaultValue={val}>
          <SelectTrigger className="text-dark/90 w-full md:w-full border border-border bg-white rounded-lg">
            <LuListFilter /> <SelectValue placeholder="All Farms" />
          </SelectTrigger>
          <SelectContent className="bg-white mt-6 border-border text-zinc-400">
            {array.map((x) => (
              <SelectItem
                key={x.value}
                value={x.value.toString()}
                className="hover:bg-zinc-900 text-dark/80 transition-all duration-500 cursor-pointer"
              >
                {x.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
