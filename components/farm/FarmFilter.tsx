"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { IoSearch } from "react-icons/io5";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
export default function FarmFilter() {
  const [location, setLocation] = useState("");
  const locations = [
    { id: 1, name: "Kano", value: "kano" },
    { id: 2, name: "Abuja", value: "abuja" },
    { id: 3, name: "Enugu", value: "enugu" },
  ];
  return (
    <div className="flex items-center justify-between">
      <div className="flex w-[35%] items-center border border-border gap-2 rounded-lg px-2">
        <IoSearch />
        <Input
          placeholder="Search Farms..."
          className="border-none p-0 group focus-visible:none shadow-none"
        />
      </div>

      <Select onValueChange={(e) => setLocation(e)} defaultValue={location}>
        <SelectTrigger className="text-dark border w-[130px]  border-border bg-white rounded-lg">
          <SelectValue placeholder="All Locations" className="text-dark" />
        </SelectTrigger>
        <SelectContent className="bg-white border-border text-zinc-400">
          {locations.map((x) => (
            <SelectItem
              key={x.id}
              value={x.value}
              className="hover:bg-zinc-900 transition-all duration-500 cursor-pointer"
            >
              {x.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
