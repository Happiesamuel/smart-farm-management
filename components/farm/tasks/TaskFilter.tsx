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

export default function TaskFilter() {
  const [assig, setAssig] = useState("all");
  const [stat, setStat] = useState("all");
  const [priority, setPriority] = useState("all");

  const assignes = [
    { id: 4, name: "All Assigniees", value: "all" },
    { id: 1, name: "John Farmer", value: "john-farmer" },
    { id: 2, name: "Mary Jane", value: "mary-jane" },
    { id: 3, name: "Peter Obi", value: "peter-obi" },
  ];
  const status = [
    { id: 1, name: "All Statuses", value: "all" },
    { id: 2, name: "In Progress", value: "progess" },
    { id: 3, name: "Pending", value: "pending" },
    { id: 4, name: "Overdue", value: "overdue" },
    { id: 5, name: "Completed", value: "compleeted" },
  ];
  const priorities = [
    { id: 1, name: "All Priorities", value: "all" },
    { id: 2, name: "High", value: "high" },
    { id: 3, name: "Medium", value: "medium" },
    { id: 4, name: "Low", value: "low" },
  ];
  return (
    <div className="flex sm:flex-row gap-4 flex-col items-center justify-between pb-4">
      <div className="flex sm:flex-row flex-col items-center sm:w-fit w-full gap-2 sm:gap-4">
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
        <Select onValueChange={(e) => setPriority(e)} defaultValue={priority}>
          <SelectTrigger className="text-dark/90 border w-full border-border bg-white rounded-lg">
            <SelectValue placeholder="All Priorities" />
          </SelectTrigger>
          <SelectContent className="bg-white border-border text-zinc-400">
            {priorities.map((x) => (
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
        <Select onValueChange={(e) => setAssig(e)} defaultValue={assig}>
          <SelectTrigger className="text-dark/90 border w-full border-border bg-white rounded-lg">
            <SelectValue placeholder="All Assigniees" />
          </SelectTrigger>
          <SelectContent className="bg-white border-border text-zinc-400">
            {assignes.map((x) => (
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
            placeholder="Search tasks..."
            className="border-none p-0 group focus-visible:none shadow-none"
          />
        </div>
      </div>
      <Button className="bg-primary-green w-full sm:w-fit cursor-pointer text-white">
        <Link
          href={"/user/farms/1/create-task"}
          className="flex items-center gap-1"
        >
          <GoPlus />
          <p>Add Task</p>
        </Link>
      </Button>
    </div>
  );
}
