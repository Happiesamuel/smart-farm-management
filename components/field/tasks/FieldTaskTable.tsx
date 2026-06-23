"use client";

import { FormLoader, NoResult } from "@/components/loader/GeneralLoader";
import { useParams, useSearchParams } from "next/navigation";
import { useCropFilter } from "@/hooks/useCropFilter";
import { useDeleteDoc } from "@/hooks/useDelete";
import { useApp } from "@/stores/useAppStore";
import { useGetFarmTasks } from "@/hooks/tasks/useTask";
import { useGetFarmFields } from "@/hooks/fields/useFields";
import { useWorkspaceUser } from "@/hooks/useAssign";
import TableActions from "@/components/layout/TableAction";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import { FinanceModal } from "@/components/modals/FinanceModal";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { toast } from "sonner";

import FinancePagination from "@/components/layout/FinancePagination";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GoPlus } from "react-icons/go";
import TaskFilter from "@/components/farm/tasks/TaskFilter";
import CreateCropTaskFetch from "@/components/farm/tasks/CreateTaskForm";

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
export default function FarmTaskTable() {
  const { farmId, workspaceId, fieldId } = useParams();
  const searchParams = useSearchParams();
  const { filterCrop } = useCropFilter();
  const { remove, status: deleteStat } = useDeleteDoc();
  const { workspace, user, ready } = useApp();
  const {
    users,
    status: userStat,
    error: userErr,
  } = useWorkspaceUser(workspace?.id ?? null);

  const { tasks, status, error } = useGetFarmTasks(
    workspace?.id ?? null,
    user?.id ?? null,
    farmId as string,
  );

  if (!ready)
    return (
      <div className="h-70">
        <FormLoader>Loading app...</FormLoader>
      </div>
    );

  if (!user || !workspace)
    return (
      <div className="h-70">
        <NoResult>Unauthorised</NoResult>
      </div>
    );

  const isLoading = status === "pending" || userStat === "pending";

  if (isLoading)
    return (
      <div className="h-70">
        <FormLoader>Loading task record...</FormLoader>
      </div>
    );
  const errorMessage = error?.message || userErr?.message;

  if (errorMessage)
    return (
      <div className="h-70">
        <NoResult>{errorMessage}</NoResult>
      </div>
    );
  const newTasks = tasks?.filter((t) => t.fields === fieldId) ?? [];
  if (!newTasks?.length)
    return (
      <div className="h-70 flex items-center justify-center">
        <div className="flex items-center flex-col gap-1 ">
          <NoResult>No task record!</NoResult>
          <Button className="bg-primary-green mt-1 w-full sm:w-fit cursor-pointer text-white">
            <Link
              href={`/user/${workspaceId}/farms/${farmId}/create-task`}
              className="flex items-center gap-1"
            >
              <GoPlus />
              <p>Add task</p>
            </Link>
          </Button>
        </div>
      </div>
    );

  const userMap = new Map(users?.map((u) => [u.id, u]));

  const getInitials = (name: string) => {
    if (!name) return "NA";
    const parts = name.split(" ");
    return parts.length === 1
      ? parts[0][0].toUpperCase()
      : (parts[0][0] + parts[1][0]).toUpperCase();
  };

  const assOpt =
    users
      ?.map((x) => {
        return {
          name: x.name,
          value: `${x.name.split(" ").join("+")}-${x.id}`,
          id: x.id,
        };
      })
      .filter((x) => x.id !== user.id) ?? [];
  const newOpt = [{ name: "All Assigns", value: "all" }, ...assOpt];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const taskArr =
    newTasks?.map((task) => {
      const user = userMap.get(task.assignTo);

      const assigneeName = user?.name ?? "Unknown User";

      let dueStatus: "Overdue" | "Today" | "Upcoming" | "Complete" = "Complete";
      let dueColor = "text-zinc-500";

      if (task.dueDate) {
        const due = new Date(task.dueDate);
        due.setHours(0, 0, 0, 0);

        if (task.status !== "completed") {
          if (due < today) {
            dueStatus = "Overdue";
            dueColor = "text-red-500"; // 🔴 overdue
          } else if (due.getTime() === today.getTime()) {
            dueStatus = "Today";
            dueColor = "text-orange-500"; // 🟠 due today
          } else {
            dueStatus = "Upcoming";
            dueColor = "text-green-600"; // 🟢 safe
          }
        } else {
          dueColor = "text-green-500";
        }
      }

      return {
        id: task.$id,
        taskTitle: task.taskTitle ?? "",

        assignee: assigneeName,
        assignTo: user?.id ?? "",
        initials: getInitials(assigneeName),

        avatar: user?.avatar ?? null,

        fieldId: (fieldId as string) ?? "",
        dueDate: task.dueDate
          ? new Date(task.dueDate).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
          : "No date",

        dueStatus, // 👈 NEW
        dueColor, // 👈 NEW
        description: task.description,
        priority:
          task.priority?.charAt(0).toUpperCase() + task.priority?.slice(1),

        status: task.status?.charAt(0).toUpperCase() + task.status?.slice(1),

        progress:
          task.status === "completed"
            ? 100
            : task.status === "in_progress"
              ? 60
              : task.status === "assigned"
                ? 20
                : 0,
      };
    }) ?? [];
  const PAGE_SIZE = 10;
  const currentPage = Number(searchParams.get("taskPage") || 1);
  const filtered = filterCrop(taskArr ?? []);
  const paginatedTask = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );
  return (
    <div>
      <TaskFilter assigns={newOpt} />
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        {!filtered.length ? (
          <div className="h-100">
            <NoResult>No task found!</NoResult>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto no-scroll hidden md:block">
              <table className="w-full  text-sm">
                {/* Header */}
                <thead className="bg-gray-50 text-gray-600">
                  <tr className="text-left">
                    <th className="p-4">Task</th>
                    <th className="p-4">Assignee</th>
                    <th className="p-4">Due Date</th>
                    <th className="p-4">Priority</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Progress</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>

                {/* Body */}
                <tbody>
                  {paginatedTask.map((t) => (
                    <tr
                      key={t.id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      {/* Task */}
                      <td
                        title={t.taskTitle}
                        className="p-4 text-dark font-medium max-w-[150px] truncate"
                      >
                        {t.taskTitle}
                      </td>

                      {/* Assignee */}
                      <td className="p-4">
                        <div className="flex text-zinc-700 items-start lg:items-center gap-2">
                          <img src={t.avatar} className="rounded-full size-6" />
                          {t.assignee}
                        </div>
                      </td>

                      {/* Due Date */}
                      <td
                        title={t.dueStatus}
                        className={`p-4 ${t.dueColor} font-medium `}
                      >
                        {t.dueDate}
                      </td>

                      {/* Priority */}
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${priorityStyles[t.priority]}`}
                        >
                          {t.priority}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${statusStyles[t.status]}`}
                        >
                          {t.status}
                        </span>
                      </td>

                      {/* Progress */}
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-gray-200 rounded-full">
                            <div
                              className={`h-2 rounded-full ${
                                t.status === "Completed"
                                  ? "bg-green-600"
                                  : "bg-green-700"
                              }`}
                              style={{ width: `${t.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-zinc-700">
                            {t.progress}%
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-3 text-gray-500">
                          <TableActions
                            actions={[
                              {
                                type: "modal",
                                label: "Edit",
                                icon: <LuPencil className="text-sm" />,
                                modal: (onClose) => (
                                  <FinanceModal
                                    text={"Edit your task"}
                                    forWhat="Edit"
                                    type={"Task"}
                                    iconColor="bg-[#fff1dd] text-[#de852c]"
                                    Icon={FaRegCalendarCheck}
                                    open={true}
                                    onClose={onClose}
                                  >
                                    <CreateCropTaskFetch
                                      def={t}
                                      onClose={onClose}
                                    />
                                  </FinanceModal>
                                ),
                              },
                              {
                                type: "callback",
                                label:
                                  deleteStat === "pending"
                                    ? "Deleting..."
                                    : "Delete",
                                icon: <LuTrash2 className="text-sm" />,
                                variant: "danger",
                                onClick: () =>
                                  remove(
                                    {
                                      collection: "tasks",
                                      id: t.id,
                                      workspaceId: workspace.id,
                                      userId: user.id,
                                    },
                                    {
                                      onSuccess: () => {
                                        toast("Deleted successfully", {
                                          description:
                                            "You've deleted a task record",
                                        });
                                      },
                                      onError: (err) =>
                                        toast("Error deleting task", {
                                          description: err.message,
                                          duration: 4000,
                                          closeButton: true,
                                        }),
                                    },
                                  ),
                              },
                            ]}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}

            {/* Mobile View */}
            <div className="md:hidden space-y-3 p-4">
              {paginatedTask.map((t) => (
                <div key={t.id} className="border rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{t.taskTitle}</h4>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${statusStyles[t.status]}`}
                    >
                      {t.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <img src={t.avatar} className="rounded-full size-6" />
                    <span className="text-sm">{t.assignee}</span>
                  </div>

                  <p className="text-xs mt-1">Due: {t.dueDate}</p>

                  <div className="flex gap-2 mt-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${priorityStyles[t.priority]}`}
                    >
                      {t.priority}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-green-600 rounded-full"
                        style={{ width: `${t.progress}%` }}
                      />
                    </div>
                    <span className="text-xs">{t.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <FinancePagination
        type="tasks"
        pageSize={PAGE_SIZE}
        total={filtered.length}
        pageKey="taskPage"
      />
    </div>
  );
}
