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
import { useUpdateDoc } from "@/hooks/useUpdate";
import { TaskInfo } from "@/lib/types";
import { useApp } from "@/stores/useAppStore";
import { toast } from "sonner";
import { safeUpdateLastSeen } from "@/hooks/useLastSeen";

const priorityStyles: Record<string, string> = {
  low: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-red-100 text-red-600",
};

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  in_progress: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-gray-100 text-gray-600",
  delayed: "bg-purple-100 text-purple-600",
};

const formatLabel = (val: string) =>
  val.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase());

export default function TaskIdHeader({
  task,
}: {
  task: { [key: string]: string };
}) {
  const { update, status } = useUpdateDoc();
  const { user, workspace } = useApp();
  const [statusVal, setStatusVal] = useState(task.status ?? "pending");

  const statusOptions = [
    { name: "Pending", value: "pending" },
    { name: "In Progress", value: "in_progress" },
    { name: "Completed", value: "completed" },
    { name: "Delayed", value: "delayed" },
  ];
  const priority = task.priority ?? "low";

  const handleChange = (val: string) => {
    if (!workspace?.id || !user?.id) return;

    safeUpdateLastSeen(user.id);

    update(
      {
        collection: "tasks",
        id: task.id,
        workspaceId: workspace.id,
        userId: user.id,
        data: { status: val },
      },
      {
        onSuccess: () => {
          setStatusVal(val);

          toast("Task updated successfully", {
            description: "You've updated your task",
          });
        },
        onError: (err) =>
          toast("Error updating task", {
            description: err.message,
          }),
      },
    );
  };
  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-zinc-500">
        <p>My Tasks</p>
        <MdOutlineKeyboardArrowRight />
        <p>ID-{task.id}</p>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start md:items-center justify-between">
        <div>
          <div className="pb-3 flex flex-col md:flex-row md:items-center items-start gap-3">
            <p className="text-xl text-dark font-semibold">{task.taskTitle}</p>

            <div className="flex items-center gap-2">
              {/* STATUS */}
              <p
                className={`${statusStyles[statusVal]} text-sm px-3 py-1 rounded-md`}
              >
                {formatLabel(statusVal)}
              </p>

              {/* PRIORITY */}
              <p
                className={`${priorityStyles[priority]} text-sm px-3 py-1 rounded-md`}
              >
                {formatLabel(priority)}
              </p>
            </div>
          </div>
        </div>

        {/* STATUS UPDATE */}
        <div className="w-fit self-end sm:block">
          <Select
            disabled={task.status === "cancelled"}
            onValueChange={handleChange}
            defaultValue={statusVal}
          >
            <SelectTrigger className="text-dark/90 w-full border border-border bg-white rounded-lg flex items-center gap-2">
              <RxUpdate />
              <SelectValue placeholder="Update Status" />
            </SelectTrigger>

            <SelectContent className="bg-white mt-6 border-border text-zinc-400">
              {statusOptions.map((x) => (
                <SelectItem
                  key={x.value}
                  value={x.value}
                  className="hover:bg-zinc-100 text-dark/80 cursor-pointer"
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
