"use client";
import DashboardHeader from "./DashboardHeader";
import DashboardBoxes from "./DashboardBoxes";
import DashboardTodaysTask from "./DashboardTodaysTask";
import DashoardRecentActivities from "./DashoardRecentActivities";
import DashboardTips from "./DashboardTips";
import { useApp } from "@/stores/useAppStore";
import { useGetTasks } from "@/hooks/tasks/useTask";
import { useGetFarm } from "@/hooks/farms/useFarm";
import { useGetFields } from "@/hooks/fields/useFields";
import { FormLoader, NoResult } from "@/components/loader/GeneralLoader";

export default function Dashboard() {
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
        <FormLoader>Loading dashboard...</FormLoader>
      </div>
    );

  const errorMessage = error?.message || fieldErr?.message || farmErr?.message;

  if (errorMessage)
    return (
      <div className="h-[92vh]">
        <NoResult>{errorMessage}</NoResult>
      </div>
    );

  return (
    <div className="pt-18 px-2 sm:px-4 pb-8">
      <DashboardHeader fullName={user.fullName} />
      <DashboardBoxes
        tasks={tasks as { [key: string]: string }[]}
        id={user.id}
      />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.7fr] gap-4">
        <DashboardTodaysTask
          farms={farms as { [key: string]: string }[]}
          id={user.id}
          fields={fields as { [key: string]: string }[]}
          tasks={tasks as { [key: string]: string }[]}
        />
        <div className="space-y-2">
          <DashoardRecentActivities />
          <DashboardTips />
        </div>
      </div>
    </div>
  );
}
