"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { createTaskSchema } from "@/lib/schemas";
import { PiFarm } from "react-icons/pi";

import { FiUser, FiUsers } from "react-icons/fi";
import { FaRegSave } from "react-icons/fa";
import { IoMdGrid } from "react-icons/io";
import { GrFlag } from "react-icons/gr";
import CreateTaskInput, {
  CreateTaskDate,
  CreateTaskSelect,
  CreateTaskText,
} from "./CreateTaskField";
import ButtonLoader from "@/components/layout/ButtonLoader";
import { useParams, useRouter } from "next/navigation";
import { useApp } from "@/stores/useAppStore";
import { toast } from "sonner";
import { useCreateTask } from "@/hooks/tasks/useTask";
import { FormLoader, NoResult } from "@/components/loader/GeneralLoader";
import { useGetFarmFields } from "@/hooks/fields/useFields";
import { useGetFarm } from "@/hooks/farms/useFarm";
import { useWorkspaceAssignOptions } from "@/hooks/useAssign";
import { format } from "date-fns";
import { useUpdateDoc } from "@/hooks/useUpdate";
import { safeUpdateLastSeen } from "@/hooks/useLastSeen";

export default function CreateCropTaskFetch({
  onClose,
  def,
}: {
  onClose?(): void;
  def?: { [key: string]: string | number };
}) {
  const { workspace, user, ready } = useApp();
  const { farmId: x } = useParams();
  const { farms, status, error } = useGetFarm(
    workspace?.id ?? null,
    user?.id ?? null,
  );
  const {
    assignOptions,
    status: assStat,
    error: assErr,
  } = useWorkspaceAssignOptions(workspace?.id ?? null);
  const {
    error: fieldErr,
    fields,
    status: fieldStat,
  } = useGetFarmFields(workspace?.id ?? null, user?.id ?? null, x as string);

  if (!ready)
    return (
      <div className="h-100">
        <FormLoader>Loading...</FormLoader>
      </div>
    );
  if (!user && ready) return <p>error</p>;
  const isLoading = fieldStat === "pending" || assStat === "pending";
  if (status === "pending" || isLoading)
    return (
      <div className="h-100">
        <FormLoader>Loading form...</FormLoader>
      </div>
    );
  const errMssg = fieldErr?.message || error?.message || assErr?.message;
  if (errMssg)
    return (
      <div className="h-100">
        <NoResult>{errMssg}</NoResult>;
      </div>
    );
  const farmId = farms?.find((y) => y.$id === x)?.$id ?? undefined;
  const farmOptions =
    farms?.map((f) => ({
      name: f.farmName,
      value: f.$id,
    })) ?? [];

  return (
    <CreateTaskForm
      workspaceId={workspace!.id}
      assignOptions={assignOptions}
      userId={user!.id}
      farms={farmOptions}
      field={fields}
      farmId={farmId as string}
      onClose={onClose}
      def={def}
    />
  );
}

function CreateTaskForm({
  workspaceId,
  userId,
  farms,
  field,
  def,
  farmId,
  onClose,
  assignOptions,
}: {
  workspaceId: string;
  userId: string;
  farmId: string;
  farms: { name: string; value: string }[];
  assignOptions: { name: string; value: string }[];
  field: { [key: string]: string | number }[] | undefined;
  onClose?(): void;
  def?: { [key: string]: string | number };
}) {
  const defaultValue = def?.id
    ? {
        taskTitle: def?.taskTitle ?? "",
        farm: farmId ?? def.farmId ?? "",
        description: def?.description ?? "",
        field: def?.fieldId ?? "",
        priority: (def?.priority as string).toLowerCase() ?? "",
        status: (def?.status as string).toLowerCase() ?? "",
        assignTo: def?.assignTo ?? "",
        dueDate: def?.dueDate ? new Date(def.dueDate) : new Date(),
      }
    : {
        farm: farmId ? farmId : "",
      };
  const form = useForm<z.infer<typeof createTaskSchema>>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: defaultValue as unknown as z.infer<typeof createTaskSchema>,
  });
  const { update, status: upStat } = useUpdateDoc();
  const { farmId: id } = useParams();
  const router = useRouter();
  const { createTask, status } = useCreateTask();
  const { workspace, user } = useApp();
  async function onSubmit(values: z.infer<typeof createTaskSchema>) {
    const { farm, field, ...val } = values;
    const obj = {
      userId: userId,
      workspaceId: workspaceId,
      data: {
        ...val,
        farms: farm,
        fields: field,
      },
    };
    safeUpdateLastSeen(userId);
    if (def?.id) {
      const o = obj.data;
      const newO = { ...o, dueDate: format(o.dueDate, "PPP") };
      update(
        {
          collection: "tasks",
          id: def.id as string,
          data: newO,
          workspaceId: workspaceId,
          userId: userId,
        },
        {
          onSuccess: () => {
            toast("Task updated successfully", {
              description: "You've updated your task",
            });

            onClose?.();
          },
          onError: (err) =>
            toast("Error updating task", {
              description: err.message,
              duration: 4000,
              closeButton: true,
            }),
        },
      );
    } else {
      createTask(obj, {
        onSuccess: () => {
          toast("Task created successfully", {
            description: "You can now proceed to managing your task",
          });
          return farmId
            ? router.push(
                `/user/${workspace?.workspaceId}/farms/${farmId}?tab=tasks`,
              )
            : onClose?.();
        },
        onError: (err) =>
          toast("Error creating task", {
            description: err.message,
            duration: 4000,
            closeButton: true,
          }),
      });
    }
  }

  const fields =
    field?.map((f) => ({
      name: f.fieldName,
      value: f.$id,
    })) ?? [];
  const priority = [
    {
      name: "High",
      value: "high",
    },
    {
      name: "Medium",
      value: "medium",
    },
    {
      name: "Low",
      value: "low",
    },
  ];
  const stats = [
    { name: "Pending", value: "pending" }, // created but not started
    { name: "In Progress", value: "in_progress" }, // currently working
    { name: "Completed", value: "completed" }, // done
    { name: "Delayed", value: "delayed" }, // missed expected time
    { name: "Cancelled", value: "cancelled" }, // no longer needed
  ];
  const assign = assignOptions.filter((x) => x.value !== user!.id);
  return (
    <div className="w-full lg:w-[90%] mx-auto ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 md:space-y-6 pt-6 w-full "
        >
          <p className="text-primary-green text-start  pb-1 text-sm w-full font-semibold border-border border-b">
            Task Information
          </p>
          <div className="flex gap-4 md:gap-6 items-center flex-col md:flex-row justify-between">
            <CreateTaskInput
              label="Task Title"
              placeholder="e.g Irrigate Field A"
              Icon={FiUser}
              name="taskTitle"
              control={form.control}
            />
            <CreateTaskSelect
              name="farm"
              control={form.control}
              label="Select Farm"
              placeholder={
                farmId
                  ? (farms.find((x) => x.value === farmId)?.name ?? "")
                  : def?.id
                    ? (farms.find((x) => x.value === def.farmId)?.name ?? "")
                    : "Select farm"
              }
              array={farmId || id ? [] : farms}
              Icon={PiFarm}
              disabled={farmId ? true : false}
            />
          </div>

          <div className="flex gap-4 md:gap-6 items-center flex-col md:flex-row justify-between">
            <CreateTaskSelect
              name="field"
              control={form.control}
              label="Select Field"
              placeholder={
                def?.id
                  ? ((fields.find((x) => x.value === def.fieldId)?.name ??
                      "Select Field") as string)
                  : "Select field"
              }
              array={fields as { [key: string]: string }[]}
              Icon={IoMdGrid}
            />
            <CreateTaskSelect
              name="priority"
              control={form.control}
              label="Priority"
              placeholder={
                def?.id
                  ? ((priority.find(
                      (x) => x.value === (def.priority as string).toLowerCase(),
                    )?.name ?? "Select priority") as string)
                  : "Select priority"
              }
              array={priority}
              Icon={GrFlag}
            />
          </div>
          <div className="flex gap-4 md:gap-6 items-center flex-col md:flex-row justify-between">
            <CreateTaskSelect
              name="assignTo"
              control={form.control}
              label="Assign To"
              placeholder={
                def?.id
                  ? ((assign.find(
                      (x) => x.value === (def.assignTo as string).toLowerCase(),
                    )?.name ?? "Select assignee") as string)
                  : "Select assignee"
              }
              disabled={def?.assignTo ? true : false}
              array={assign}
              Icon={FiUsers}
            />
            <CreateTaskDate
              label="Due Date"
              name="dueDate"
              control={form.control}
            />
          </div>
          <div className="flex gap-4 md:gap-6 items-center flex-col md:flex-row justify-between">
            <CreateTaskSelect
              name="status"
              control={form.control}
              label="Status"
              placeholder={
                def?.id
                  ? ((stats.find(
                      (x) => x.value === (def.status as string).toLowerCase(),
                    )?.name ?? "Select status") as string)
                  : "Select status"
              }
              array={stats}
              Icon={GrFlag}
            />
            <CreateTaskText
              label="Description"
              placeholder="Enter task description"
              name="description"
              control={form.control}
            />
          </div>

          <div className="flex items-center gap-4 relative justify-end">
            <Button
              type="reset"
              onClick={() => (def?.id ? onClose?.() : router.back())}
              className="text-dark bg-transparent rounded-md w-fit px-6 h-9 cursor-pointer border-border border"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={status === "pending" || upStat === "pending"}
              className="text-white bg-dark-green rounded-md w-fit px-6 h-9 cursor-pointer border-none"
            >
              {status === "pending" || upStat === "pending" ? (
                <>
                  <ButtonLoader />
                  {def?.id ? "Updating..." : "Creating..."}
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <FaRegSave /> {def?.id ? "Update Task" : "Add Task"}
                </div>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
