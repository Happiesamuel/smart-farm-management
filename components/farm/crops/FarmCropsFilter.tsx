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
import React, { useState } from "react";
import { GoPlus } from "react-icons/go";
import { IoSearch } from "react-icons/io5";

export default function FarmCropsFilter() {
  const [field, setField] = useState("all");
  const [stat, setStat] = useState("all");

  const fields = [
    { id: 1, name: "All Fields", value: "all" },
    { id: 2, name: "Field B", value: "fieldA" },
    { id: 3, name: "Field C", value: "fieldB" },
    { id: 4, name: "Field D", value: "fieldC" },
    { id: 5, name: "Field B", value: "fieldD" },
  ];
  const status = [
    { id: 1, name: "All Statuses", value: "all" },
    { id: 2, name: "Pending", value: "pending" },
    { id: 3, name: "Inactive", value: "inactive" },
    { id: 4, name: "Growing", value: "growing" },
  ];
  return (
    <div className="flex sm:flex-row gap-4 flex-col items-center justify-between pb-4">
      <div className="flex sm:flex-row flex-col items-center sm:w-fit w-full gap-2 sm:gap-4">
        <Select onValueChange={(e) => setField(e)} defaultValue={field}>
          <SelectTrigger className="text-dark/90 border w-full border-border bg-white rounded-lg">
            <SelectValue placeholder="All Fields" />
          </SelectTrigger>
          <SelectContent className="bg-white border-border text-zinc-400">
            {fields.map((x) => (
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
        <Select onValueChange={(e) => setStat(e)} defaultValue={stat}>
          <SelectTrigger className="text-dark/90 w-full border border-border bg-white rounded-lg">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent className="bg-white border-border text-zinc-400">
            {status.map((x) => (
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
        <div className="flex w-full  items-center border border-border gap-2 rounded-lg px-2">
          <IoSearch />
          <Input
            placeholder="Search Crops..."
            className="border-none p-0 group focus-visible:none shadow-none"
          />
        </div>
      </div>

      <Button className="bg-primary-green w-full sm:w-fit cursor-pointer text-white">
        <Link
          href={"/user/farms/1/add-crop"}
          className="flex items-center gap-1"
        >
          <GoPlus />
          <p>Add Crop</p>
        </Link>
      </Button>
    </div>
  );
}
