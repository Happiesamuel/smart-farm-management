"use client";
import { TaskInfo } from "@/lib/types";
import { createDoc, getDocs, getFarmDocs } from "@/servers/crud-actions";
import { getSingleTaskDocs } from "@/servers/task-actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const TASKS_STALE_TIME = 1000 * 60 * 1; // 1 minute

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  const { mutate: createTask, status } = useMutation({
    mutationFn: async (data: {
      workspaceId: string;
      userId: string;
      data: Omit<TaskInfo, "id" | "workspaces" | "users">;
    }) => {
      const result = await createDoc({ ...data, collection: "tasks" });
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tasks", variables.workspaceId] });
    },
  });

  return { createTask, status };
};

export const useGetFarmTasks = (
  workspaceId: string | null,
  userId: string | null,
  farmId: string,
) => {
  const { data: tasks, status, error } = useQuery({
    queryKey: ["tasks", workspaceId, farmId],
    queryFn: async () => {
      const result = await getFarmDocs({
        collection: "tasks",
        workspaceId: workspaceId as string,
        userId: userId as string,
        farmId,
      });
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!workspaceId && !!userId && !!farmId,
    staleTime: TASKS_STALE_TIME,
  });

  return { tasks, error, status };
};

export const useGetTasks = (
  workspaceId: string | null,
  userId: string | null,
) => {
  const { data: tasks, status, error } = useQuery({
    queryKey: ["tasks", workspaceId],
    queryFn: async () => {
      const result = await getDocs({
        collection: "tasks",
        workspaceId: workspaceId as string,
        userId: userId as string,
      });
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!workspaceId && !!userId,
    staleTime: TASKS_STALE_TIME,
  });

  return { tasks, error, status };
};

export const useGetSingleTask = (
  workspaceId: string | null,
  userId: string | null,
  taskId: string,
) => {
  const { data: task, status, error } = useQuery({
    queryKey: ["tasks", workspaceId, taskId],
    queryFn: async () => {
      const result = await getSingleTaskDocs({
        collection: "tasks",
        workspaceId: workspaceId as string,
        userId: userId as string,
        taskId,
      });
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!workspaceId && !!userId && !!taskId,
    staleTime: TASKS_STALE_TIME, // single task can be slightly shorter since it's detail view
  });

  return { task, error, status };
};