import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function BothSelect({
  array,
}: {
  array: { [key: string]: string }[];
}) {
  const [val, setVal] = useState("all");

  return (
    <Select onValueChange={(e) => setVal(e)} defaultValue={val}>
      <SelectTrigger className="text-dark w-[120px] border border-border bg-white rounded-lg">
        <SelectValue placeholder="All Farms" />
      </SelectTrigger>
      <SelectContent className="bg-white border-border text-zinc-400">
        {array.map((x) => (
          <SelectItem
            key={x.value}
            value={x.value.toString()}
            className="hover:bg-zinc-900 transition-all duration-500 cursor-pointer"
          >
            {x.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
