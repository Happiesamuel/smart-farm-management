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
const priorityStyles: Record<string, string> = {
  Low: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  High: "bg-red-100 text-red-600",
};

const statusStyles: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-700",
  In_progress: "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
  Cancelled: "bg-gray-100 text-gray-600",
  Delayed: "bg-orange-100 text-orange-700",
};

export default function TaskIdHeader({
  task,
}: {
  task: { [key: string]: string };
}) {
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
  const status = task.status?.charAt(0).toUpperCase() + task.status?.slice(1);
  const priority =
    task.priority?.charAt(0).toUpperCase() + task.priority?.slice(1);
  return (
    <div className="space-y-4">
      <div className="flex items-center text-sm text-zinc-500">
        <p>My Tasks </p>
        <MdOutlineKeyboardArrowRight />
        <p>ID-{task.id}</p>
      </div>
      <div className="flex flex-col sm:flex-row items-start md:items-center justify-between">
        <div>
          <div className="pb-3 flex flex-col md:flex-row md:items-center items-start gap-3">
            <p className="text-xl text-dark font-semibold ">{task.taskTitle}</p>
            <div className="flex items-center gap-2">
              <p
                className={` ${statusStyles[status]}  w-fit text-sm px-3 py-1 rounded-md `}
              >
                {status}
              </p>
              <p
                className={`${priorityStyles[priority]} w-fit text-sm px-3 py-1 rounded-md`}
              >
                {priority}
              </p>
            </div>
          </div>
        </div>

        <div className="w-fit self-end  flex  sm:block sm:w-fit">
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
