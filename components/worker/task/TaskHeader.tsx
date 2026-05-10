import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { LuListFilter } from "react-icons/lu";

export default function TaskHeader() {
  const [val, setVal] = useState("all");
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
  return (
    <div className="flex gap-2 sm:flex-row flex-col sm:items-center justify-between">
      <div className="space-y-2">
        <h5 className="text-xl text-dark font-semibold">My Tasks</h5>
        <p className="text-sm text-zinc-500 font-medium">
          View and manage all tasks assigned to you.
        </p>
      </div>
      <div>
        <Select onValueChange={(e) => setVal(e)} defaultValue={val}>
          <SelectTrigger className="text-dark/90 w-full md:w-full border border-border bg-white rounded-lg">
            <LuListFilter /> <SelectValue placeholder="All Farms" />
          </SelectTrigger>
          <SelectContent className="bg-white border-border text-zinc-400">
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
