import React from "react";
import { GrFlag } from "react-icons/gr";

export default function TaskPriorityGuide() {
  const priority = [
    {
      title: "High",
      content: "Urgent tasks that need immediate attention",
      iconColor: "bg-[#fee7e7] text-[#e82a2d]",
    },
    {
      title: "Medium",
      content: "Import tasks that should be completed soon",
      iconColor: "bg-[#fff1dd] text-[#de852c] ",
    },
    {
      title: "Low",
      content: "Task that can be completed when time allows",
      iconColor: "bg-[#e7f5eb] text-[#056b36]",
    },
  ];
  return (
    <div className="bg-[#f3fbf5] w-fit md:max-w-xs lg:max-w-full lg:w-full border border-green-200 p-4 rounded-md">
      <h6 className="text-primary-green text-base font-semibold pb-4">
        Quick Priority Guide
      </h6>
      <div className="space-y-3">
        {priority.map((pr) => (
          <div key={pr.title} className="flex items-start gap-3">
            <div
              className={`${pr.iconColor} size-8 text-sm flex items-center justify-center rounded-full`}
            >
              <GrFlag />
            </div>
            <div className="space-y-1">
              <p className="text-dark/90 text-sm font-semibold">{pr.title}</p>
              <p className="text-sm text-zinc-500">{pr.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
