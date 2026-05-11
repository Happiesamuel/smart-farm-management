import Link from "next/link";
import React from "react";
import { BiTask } from "react-icons/bi";

export default function DashboardTodaysTask() {
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
  return (
    <div className="flex flex-col  gap-4 border border-border  rounded-md  p-4 shadow-xs bg-white">
      <div className="flex items-center justify-between gap-2 border-b border-border py-2 pb-4">
        <h3 className="text-dark  text-base">Today&apos;s Tasks</h3>
        <Link className="text-[#1058d6] text-sm" href="/worker/tasks">
          View all tasks
        </Link>
      </div>
      <div className="space-y-2 h-[222px] overflow-scroll no-scroll">
        {list.map((l) => (
          <Link
            href={`/worker/tasks/${1}`}
            key={l.id}
            className="grid grid-cols-1  gap-2 last:border-b-0 border-b border-border  md:grid-cols-[1fr_8rem] px-2.5 py-3 first:pt-0  bg-white"
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

            <div className="flex items-center justify-between ">
              <p
                className={`${priority[l.priority]} text-xs rounded-sm py-1 px-3`}
              >
                {l.priority}
              </p>

              <p className="text-sm text-zinc-500">{l.time}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
