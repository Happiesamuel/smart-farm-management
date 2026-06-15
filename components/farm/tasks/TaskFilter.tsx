"use client";
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
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { GoPlus } from "react-icons/go";
import { IoSearch } from "react-icons/io5";

const status = [
  { name: "All Statuses", value: "all" },
  { name: "Pending", value: "pending" }, // created but not started
  { name: "In Progress", value: "in_progress" }, // currently working
  { name: "Completed", value: "completed" }, // done
  { name: "Delayed", value: "delayed" }, // missed expected time
  { name: "Cancelled", value: "cancelled" }, // no longer needed
];
const priorities = [
  { id: 1, name: "All Priorities", value: "all" },
  { id: 2, name: "High", value: "high" },
  { id: 3, name: "Medium", value: "medium" },
  { id: 4, name: "Low", value: "low" },
];
export default function TaskFilter({
  assigns,
  fields,
}: {
  assigns?: { name: string; value: string }[];
  fields?: { name: string; value: string }[];
}) {
  const searchParams = useSearchParams();
  const { farmId, workspaceId } = useParams();
  const router = useRouter();
  const field = searchParams.get("field") || "all";
  const stat = searchParams.get("status") || "all";
  const priority = searchParams.get("priority") || "all";
  const assign = searchParams.get("assign") || "all";
  function handleFieldChange(val: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (val && val !== "all") {
      params.set("field", val);
    } else {
      params.delete("field");
    }
    router.push(`?${params.toString()}`);
  }
  function handlePriorityChange(val: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (val && val !== "all") {
      params.set("priority", val);
    } else {
      params.delete("priority");
    }
    router.push(`?${params.toString()}`);
  }
  function handleStatusChange(val: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (val && val !== "all") {
      params.set("status", val);
    } else {
      params.delete("status");
    }
    router.push(`?${params.toString()}`);
  }
  function handleAssignChange(val: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (val && val !== "all") {
      params.set("assign", val);
    } else {
      params.delete("assign");
    }
    router.push(`?${params.toString()}`);
  }
  function handleSearchChange(val: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (val) {
      params.set("search", val);
    } else {
      params.delete("search");
    }
    router.push(`?${params.toString()}`);
  }
  console.log(assign.split("-").at(0)?.split("+").join(" "));
  return (
    <div className="flex sm:flex-row gap-4 flex-col items-center justify-between pb-4">
      <div className="flex sm:flex-row flex-col items-center sm:w-fit w-full gap-2 sm:gap-4">
        <Select
          onValueChange={(e) => handleStatusChange(e)}
          defaultValue={stat}
        >
          <SelectTrigger className="text-dark/90 w-full border border-border bg-white rounded-lg">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent className="bg-white mt-6 border-border text-zinc-400">
            {status.map((x) => (
              <SelectItem
                key={x.value}
                value={x.value}
                className="hover:bg-zinc-900 text-dark/90 transition-all duration-500 cursor-pointer"
              >
                {x.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          onValueChange={(e) => handleFieldChange(e)}
          defaultValue={field}
        >
          <SelectTrigger className="text-dark/90 w-full border border-border bg-white rounded-lg">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent className="bg-white mt-6 border-border text-zinc-400">
            {fields.map((x) => (
              <SelectItem
                key={x.value}
                value={x.value}
                className="hover:bg-zinc-900 text-dark/90 transition-all duration-500 cursor-pointer"
              >
                {x.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          onValueChange={(e) => handlePriorityChange(e)}
          defaultValue={priority}
        >
          <SelectTrigger className="text-dark/90 border w-full border-border bg-white rounded-lg">
            <SelectValue placeholder="All Priorities" />
          </SelectTrigger>
          <SelectContent className="bg-white mt-6 border-border text-zinc-400">
            {priorities.map((x) => (
              <SelectItem
                key={x.value}
                value={x.value}
                className="hover:bg-zinc-900 text-dark/90 transition-all duration-500 cursor-pointer"
              >
                {x.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          onValueChange={(e) => handleAssignChange(e)}
          defaultValue={assign}
        >
          <SelectTrigger className="text-dark/90 border w-full border-border bg-white rounded-lg">
            <SelectValue placeholder="All Assigniees" />
          </SelectTrigger>
          <SelectContent className="bg-white mt-6 border-border text-zinc-400">
            {assigns.map((x) => (
              <SelectItem
                key={x.value}
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
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search tasks..."
            className="border-none p-0 group focus-visible:none shadow-none"
          />
        </div>
      </div>
      <Button className="bg-primary-green w-full sm:w-fit cursor-pointer text-white">
        <Link
          href={`/user/${workspaceId}/farms/${farmId}/create-task`}
          className="flex items-center gap-1"
        >
          <GoPlus />
          <p>Add Task</p>
        </Link>
      </Button>
    </div>
  );
}
