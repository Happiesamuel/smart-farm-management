"use client";
import { ChangeEvent } from "react";
import { Input } from "../../ui/input";
import { IoSearch } from "react-icons/io5";

export default function FieldHeader({
  handleSearch,
  val,
  num,
}: {
  handleSearch: (e: string) => void;
  val: string;
  num: number;
}) {
  if (!num) return null;
  return (
    <div className="flex gap-2 items-center justify-between">
      <h6 className="text-dark text-base font-semibold">{num} Fields</h6>

      <div className="flex w-[65%] sm:w-[45%] items-center border border-border gap-2 rounded-lg px-2">
        <IoSearch />
        <Input
          onChange={(e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
            handleSearch(e.target.value);
          }}
          value={val}
          placeholder="Search Fields..."
          className="border-none p-0 group focus-visible:none shadow-none"
        />
      </div>
    </div>
  );
}
