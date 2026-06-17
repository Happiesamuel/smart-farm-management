import { FarmInfo, FieldInfo, TaskInfo as Task } from "@/lib/types";
import React from "react";
import { RiFileList3Line } from "react-icons/ri";

const priorityStyles: Record<string, string> = {
  Low: "bg-green-600 text-green-700",
  Medium: "bg-yellow-600 text-yellow-700",
  High: "bg-red-600 text-red-600",
};

const statusStyles: Record<string, string> = {
  Pending: "bg-yellow-600 text-yellow-700",
  In_progress: "bg-blue-600 text-blue-700",
  Completed: "bg-green-600 text-green-700",
  Cancelled: "bg-gray-600 text-gray-600",
  Delayed: "bg-orange-600 text-orange-700",
};

export default function TaskInfo({
  task,
  field,
  farm,
}: {
  task: Task;
  field: FieldInfo;
  farm: FarmInfo;
}) {
  const status = task.status?.charAt(0).toUpperCase() + task.status?.slice(1);
  const priority =
    task.priority?.charAt(0).toUpperCase() + task.priority?.slice(1);
  return (
    <div className="flex flex-col   gap-4 border border-border  rounded-md  p-4 shadow-xs bg-white">
      <div className="flex items-center gap-2 pb-1">
        <RiFileList3Line className="text-lg text-primary-green" />
        <p className="text-base text-dark/90">Task Information</p>
      </div>

      <div className="space-y-2">
        <div className="border-b border-border pb-2 grid grid-cols-[0.5fr_1fr] sm:grid-cols-[0.4fr_1fr]">
          <p className="text-dark/80 text-sm font-medium">Farm</p>
          <p className="text-dark/90 text-sm font-medium">{farm.farmName}</p>
        </div>
        <div className="border-b border-border pb-2 grid grid-cols-[0.5fr_1fr] sm:grid-cols-[0.4fr_1fr]">
          <p className="text-dark/80 text-sm font-medium">Field</p>
          <p className="text-dark/90 text-sm font-medium">{field.fieldName}</p>
        </div>

        <div className="border-b border-border pb-2 grid grid-cols-[0.5fr_1fr] sm:grid-cols-[0.4fr_1fr]">
          <p className="text-dark/80 text-sm font-medium">Task Type</p>
          <p className="text-dark/90 text-sm font-medium">Irrigation</p>
        </div>
        <div className="border-b border-border pb-2 grid grid-cols-[0.5fr_1fr] sm:grid-cols-[0.4fr_1fr]">
          <p className="text-dark/80 text-sm font-medium">Priority</p>
          <div className="flex items-center gap-2">
            <p
              className={`rounded-full size-2 ${priorityStyles[priority]}  `}
            />
            <p className="text-dark/90 text-sm font-medium"> {priority}</p>
          </div>
        </div>
        <div className=" pb-2 grid grid-cols-[0.5fr_1fr] sm:grid-cols-[0.4fr_1fr]">
          <p className="text-dark/80 text-sm font-medium">Status</p>
          <div className="flex items-center gap-2">
            <p className={`rounded-full size-2 ${statusStyles[status]}`} />
            <p className="text-dark/90 text-sm font-medium"> {status}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
