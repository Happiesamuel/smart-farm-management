"use client";
import TaskHeader from "./TaskHeader";
import TaskGroup from "./TaskGroup";
import TaskList from "./TaskList";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useGetTasks } from "@/hooks/tasks/useTask";
import { FormLoader, NoResult } from "@/components/loader/GeneralLoader";
import { useCropFilter } from "@/hooks/useCropFilter";
import { useApp } from "@/stores/useAppStore";
import { useGetFarm } from "@/hooks/farms/useFarm";
import { useGetFields } from "@/hooks/fields/useFields";
import TaskPagination from "./TaskPagination";
export default function WorkersTasks() {
  const searchParams = useSearchParams();
  const [fil, setFil] = useState(searchParams.get("worTask") || "all");

  const { filterCrop } = useCropFilter();
  const { workspace, user, ready } = useApp();

  const { tasks, status, error } = useGetTasks(
    workspace?.id ?? null,
    user?.id ?? null,
  );
  const {
    farms,
    status: farmStat,
    error: farmErr,
  } = useGetFarm(workspace?.id ?? null, user?.id ?? null);
  const {
    fields,
    status: fieldStat,
    error: fieldErr,
  } = useGetFields(workspace?.id ?? null, user?.id ?? null);

  if (!ready)
    return (
      <div className="h-[92vh]">
        <FormLoader>Loading app...</FormLoader>
      </div>
    );

  if (!user || !workspace)
    return (
      <div className="h-[92vh]">
        <NoResult>Unauthorised</NoResult>
      </div>
    );

  const isLoading =
    status === "pending" || farmStat === "pending" || fieldStat === "pending";

  if (isLoading)
    return (
      <div className="h-[92vh]">
        <FormLoader>Loading task records...</FormLoader>
      </div>
    );

  const errorMessage = error?.message || fieldErr?.message || farmErr?.message;

  if (errorMessage)
    return (
      <div className="h-[92vh]">
        <NoResult>{errorMessage}</NoResult>
      </div>
    );

  if (!tasks?.length)
    return (
      <div className="h-[92vh]">
        <NoResult>No task record!</NoResult>
      </div>
    );

  const newTask = tasks.filter((x) => x.assignTo === user.id);
  if (!newTask?.length)
    return (
      <div className="h-[92vh]">
        <NoResult>No task record!</NoResult>
      </div>
    );
  const fieldMap = new Map(fields?.map((f) => [f.$id, f]));
  const farmMap = new Map(farms?.map((f) => [f.$id, f]));
  const taskArr =
    newTask?.map((task) => {
      const field = fieldMap.get(task.fields);
      const farm = farmMap.get(task.farms);
      const dateObj = new Date(task.$createdAt);

      return {
        id: task.$id,
        farmId: farm?.$id ?? "",
        fieldId: field?.$id ?? "",
        field: field?.fieldName ?? "Unknown Field",
        farm: farm?.farmName ?? "Unknown Farm",
        priority:
          task.priority.slice(0, 1).toUpperCase() + task.priority.slice(1),
        status: task.status.slice(0, 1).toUpperCase() + task.status.slice(1),
        title: task.taskTitle,
        createdAt: task.$createdAt,
        date: dateObj.toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),

        time: dateObj.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
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
    <div className="pt-18 px-2 sm:px-4 pb-8">
      <TaskHeader />
      <TaskGroup active={fil} setActive={setFil} />
      <TaskList tasks={paginatedTask} filter={fil} />
      <TaskPagination
        total={filtered.length}
        pageSize={PAGE_SIZE}
        pageKey={`taskPage`}
        type="tasks"
      />
    </div>
  );
}
