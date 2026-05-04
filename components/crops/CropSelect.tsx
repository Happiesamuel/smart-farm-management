import React, { Dispatch, SetStateAction } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
export default function CropSelect({
  array,
  val,
  setVal,
}: {
  array: { [key: string]: string }[];
  val: string;
  setVal: Dispatch<SetStateAction<string>>;
}) {
  return (
    <Select onValueChange={(e) => setVal(e)} defaultValue={val}>
      <SelectTrigger className="text-dark/90 w-full md:w-full border border-border bg-white rounded-lg">
        <SelectValue placeholder="All Farms" />
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
  );
}
