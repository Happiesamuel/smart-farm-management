"use client";
import { Input } from "../../ui/input";
import { IoSearch } from "react-icons/io5";

export default function FieldHeader() {
  return (
    <div className="flex gap-2 items-center justify-between">
      <h6 className="text-dark text-base font-semibold">3 Fields</h6>

      <div className="flex w-[65%] sm:w-[45%] items-center border border-border gap-2 rounded-lg px-2">
        <IoSearch />
        <Input
          placeholder="Search Fields..."
          className="border-none p-0 group focus-visible:none shadow-none"
        />
      </div>
    </div>
  );
}
