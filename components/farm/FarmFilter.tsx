"use client";
import React, { ChangeEvent } from "react";
import { Input } from "../ui/input";
import { IoSearch } from "react-icons/io5";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
export default function FarmFilter({
  handleSearch,
  handleLocation,
  locations,
  val,
  location,
}: {
  handleLocation: (e: string) => void;
  handleSearch: (e: string) => void;
  val: string;
  location: string;
  locations: { id: number; name: string; value: string }[];
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row items-center justify-between">
      <div className="flex w-full sm:w-[35%] items-center border border-border gap-2 rounded-lg px-2">
        <IoSearch />
        <Input
          onChange={(e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
            handleSearch(e.target.value);
          }}
          value={val}
          placeholder="Search Farms..."
          className="border-none p-0 group focus-visible:none shadow-none"
        />
      </div>

      <Select
        onValueChange={(val) => handleLocation(val === location ? "" : val)}
        defaultValue={location}
      >
        <SelectTrigger className="text-dark border w-full sm:w-[200px]  border-border bg-white rounded-lg">
          <SelectValue placeholder="All Locations" className="text-dark" />
        </SelectTrigger>
        <SelectContent className="h-[200px] z-[200] mt-6 bg-white mx border-border text-zinc-400">
          {locations.map((x) => (
            <SelectItem
              key={x.id}
              value={x.value}
              className="hover:bg-zinc-900 text-dark/90 transition-all duration-500 cursor-pointer"
            >
              {x.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
