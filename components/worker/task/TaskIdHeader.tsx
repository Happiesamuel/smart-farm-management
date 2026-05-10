"use client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";

export default function TaskIdHeader() {
  const [val, setVal] = useState("pending");
  const array = [
    {
      name: "Pending",
      value: "pending",
    },
    {
      name: "In Progress",
      value: "in-proggess",
    },
    {
      name: "Completed",
      value: "completed",
    },
  ];
  return (
    <div className="space-y-4">
      {" "}
      <div className="flex items-center text-sm text-zinc-500">
        <p>My Tasks </p>
        <MdOutlineKeyboardArrowRight />
        <p>taskID</p>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <div className="pb-3 flex items-center gap-3">
            <p className="text-xl text-dark font-semibold ">Task Title</p>
            <p className="text-[#1058d6] w-fit text-sm px-3 py-1 rounded-md bg-[#1058d6]/15">
              In Progress
            </p>
            <p className="text-red-500 w-fit text-sm px-3 py-1 rounded-md bg-red-200/80">
              High Prioity
            </p>
          </div>
        </div>

        <div className="">
          <Select onValueChange={(e) => setVal(e)} defaultValue={val}>
            <SelectTrigger className="text-dark/90 w-full md:w-full border border-border bg-white rounded-lg">
              <RxUpdate /> <SelectValue placeholder="In Progress" />
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
    </div>
  );
}
