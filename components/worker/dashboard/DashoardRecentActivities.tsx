import Link from "next/link";
import React from "react";
import { TfiWrite } from "react-icons/tfi";

export default function DashoardRecentActivities() {
  const activities = [
    {
      name: "Task completed: Irrigate Field C",
      time: "Today, 6:30 AM",
      id: 1,
      field: "Field A",
    },
    {
      name: "Task started: Apply fertilizer",
      time: "Today, 9:05 AM",
      id: 2,
      field: "Field A",
    },
    {
      name: "Status updated: Weed control",
      time: "Today, 8:05 AM",
      id: 3,
      field: "Field B",
    },
    {
      name: "Status updated: Weed ontrol",
      time: "Today, 8:05 AM",
      id: 4,
      field: "Field C",
    },
  ];
  return (
    <div className="flex flex-col  gap-4 border border-border h-[320px] rounded-md  p-4 shadow-xs bg-white">
      <div className="flex items-center justify-between gap-2  py-2 pb-4">
        <h3 className="text-dark  text-base">Recent Activity</h3>
        <Link className="text-[#1058d6] text-sm" href="/worker/tasks">
          View all activity
        </Link>
      </div>

      <div className="space-y-3">
        {activities.map((act) => (
          <div className="flex items-center justify-between" key={act.id}>
            <div className="flex items-center gap-2">
              <div className=" rounded-md text-base bg-[#fee7e7] text-[#e82a2d] size-8 flex items-center justify-center">
                <TfiWrite />
              </div>
              <div className="space-y-1">
                <h6 className="text-dark/80 font-medium text-sm">{act.name}</h6>
                <p className="text-xs text-zinc-500 font-normal">{act.field}</p>
              </div>
            </div>
            <p className="text-xs text-zinc-500 font-normal">{act.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
