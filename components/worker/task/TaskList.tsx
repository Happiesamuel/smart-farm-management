import Link from "next/link";
import React from "react";
import { BiTask } from "react-icons/bi";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import TaskPagination from "./TaskPagination";

export default function TaskList({ filter }: { filter: string }) {
  const list = [
    {
      title: "Irrigate Field A",
      field: "Field A",
      crop: "Tomatoes",
      status: "In Progress",
      date: "May 20, 2024",
      priority: "High",
      id: 1,
      time: "7:00 AM",
    },
    {
      title: "Apply fertilizer",
      field: "Field B",
      crop: "Maize",
      status: "Pending",
      date: "May 20, 2024",
      priority: "Low",
      id: 2,
      time: "9:00 AM",
    },
    {
      title: "Weed control",
      field: "Field C",
      crop: "Pepper",
      status: "Pending",
      date: "May 20, 2024",
      priority: "Medium",
      id: 3,
      time: "11:00 AM",
    },
    {
      title: "Weed control",
      field: "Field C",
      crop: "Pepper",
      status: "Pending",
      date: "May 20, 2024",
      priority: "High",
      id: 4,
      time: "11:00 AM",
    },
    {
      title: "Check drip system",
      field: "Field A",
      crop: "Tomatoes",
      status: "Completed",
      date: "May 19, 2024",
      priority: "Low",
      id: 5,
      time: "6:30 AM",
    },
    {
      title: "Harvest tomatoes",
      field: "Field A",
      crop: "Tomatoes",
      status: "Completed",
      date: "May 18, 2024",
      priority: "Medium",
      id: 6,
      time: "8:00 AM",
    },
  ];
  const priority: Record<string, string> = {
    High: "bg-[#fee7e7] text-[#e82a2d] ",
    Medium: "text-[#de852c] bg-[#de852c]/15",
    Low: "text-[#2d8952] bg-[#2d8952]/15",
  };
  const color: Record<string, string> = {
    Pending: "text-[#de852c] bg-[#de852c]/15",
    "In Progress": "text-[#1058d6] bg-[#1058d6]/15",
    Completed: "text-[#2d8952] bg-[#2d8952]/15",
  };

  const newFil =
    filter === "all"
      ? list
      : filter === "pending"
        ? list.filter((x) => x.status === "Pending")
        : filter === "in-progress"
          ? list.filter((x) => x.status === "In Progress")
          : list.filter((x) => x.status === "Completed");

  return (
    <div className="mt-4">
      <div className="space-y-2">
        {newFil.map((l) => (
          <Link
            href={`/worker/tasks/${1}`}
            key={l.id}
            className="grid grid-cols-1 gap-2 md:grid-cols-[1fr_20rem] lg:grid-cols-[1fr_30rem] px-2.5 py-3 rounded-xl border border-border/80 shadow-xs hover:shadow-sm transition bg-white"
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex items-center justify-center size-10 text-lg rounded-md ${color[l.status]}`}
              >
                <BiTask />
              </div>
              <div className="space-y-1">
                <p className="text-dark/90 text-base font-medium">{l.title}</p>
                <div className="text-zinc-500  text-sm flex items-center gap-1.5 font-medium">
                  <span>{l.field}</span>
                  <div className="size-1 rounded-full bg-zinc-500" />
                  <span>{l.crop}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pr-2">
              <p
                className={`${priority[l.priority]} text-xs rounded-sm py-1 px-3`}
              >
                {l.priority}
              </p>
              <p className={`${color[l.status]}  text-xs rounded-sm py-1 px-3`}>
                {l.status}
              </p>
              <div className="text-zinc-500 text-end space-y-1 text-xs">
                <p>{l.date}</p>
                <p>{l.time}</p>
              </div>
              <MdOutlineKeyboardArrowRight className="hidden md:block text-zinc-500 text-xl" />
            </div>
          </Link>
        ))}
      </div>
      <TaskPagination />
    </div>
  );
}
