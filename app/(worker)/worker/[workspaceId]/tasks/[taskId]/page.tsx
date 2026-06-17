"use client";
import { FormLoader, NoResult } from "@/components/loader/GeneralLoader";
import TaskActivity from "@/components/worker/task/TaskActivity";
import TaskCreation from "@/components/worker/task/TaskCreation";
import TaskDescription from "@/components/worker/task/TaskDescription";
import TaskIdHeader from "@/components/worker/task/TaskIdHeader";
import TaskInfo from "@/components/worker/task/TaskInfo";
import { useGetFarm } from "@/hooks/farms/useFarm";
import { useGetFields } from "@/hooks/fields/useFields";
import { useGetSingleTask } from "@/hooks/tasks/useTask";
import { useWorkspaceUser } from "@/hooks/useAssign";
import { FarmInfo, FieldInfo } from "@/lib/types";
import { useApp } from "@/stores/useAppStore";
import { useParams } from "next/navigation";

export default function Page() {
  const { workspace, user, ready } = useApp();
  const { taskId } = useParams();
  const { error, status, task } = useGetSingleTask(
    workspace?.id ?? null,
    user?.id ?? null,
    taskId as string,
  );
  const {
    users,
    status: uStat,
    error: uErr,
  } = useWorkspaceUser(workspace?.id ?? null);
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
      <div className="h-[80vh]">
        <FormLoader>Loading app...</FormLoader>
      </div>
    );

  if (!user || !workspace)
    return (
      <div className="h-[80vh]">
        <NoResult>Unauthorised</NoResult>
      </div>
    );

  const isLoading =
    status === "pending" ||
    fieldStat === "pending" ||
    farmStat === "pending" ||
    uStat === "pending";

  if (isLoading)
    return (
      <div className="h-[80vh]">
        <FormLoader>Loading task details...</FormLoader>
      </div>
    );

  const errorMessage =
    error?.message || fieldErr?.message || farmErr?.message || uErr?.message;

  if (errorMessage)
    return (
      <div className="h-[80vh]">
        <NoResult>{errorMessage}</NoResult>
      </div>
    );

  if (!task?.id)
    return (
      <div className="h-[80vh]">
        <NoResult>Task not found</NoResult>
      </div>
    );
  const assignTo = users.find((x) => x.id === task?.assignTo);
  const createdBy = users.find((x) => x.id === task?.users);
  const fieldMap = new Map(fields?.map((f) => [f.$id, f]));
  const farmMap = new Map(farms?.map((f) => [f.$id, f]));
  const field = fieldMap.get(task!.fields);
  const farm = farmMap.get(task!.farms);
  return (
    <div className="pt-18 px-2 sm:px-4 ">
      <TaskIdHeader task={task as { [key: string]: string }} />
      <TaskCreation
        createdAt={task?.createdAt ?? ""}
        dueDate={task?.dueDate ?? ""}
        assignTo={
          assignTo as {
            name: string;
            avatar: string;
            role: string;
          }
        }
        createdBy={
          createdBy as {
            name: string;
            avatar: string;
            role: string;
          }
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 ">
        <TaskActivity task={task} users={users} />
        <TaskInfo
          task={task}
          field={field as unknown as FieldInfo}
          farm={farm as unknown as FarmInfo}
        />
      </div>
      <TaskDescription desc={task?.description ?? ""} />
    </div>
  );
}
