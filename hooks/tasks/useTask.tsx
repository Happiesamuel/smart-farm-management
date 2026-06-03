"use client";
import { TaskInfo } from "@/lib/types";
import { createDoc, getDocs, getFarmDocs } from "@/servers/crud-actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  const { mutate: createTask, status } = useMutation({
    mutationFn: (data: {
      workspaceId: string;
      userId: string;
      data: Omit<TaskInfo, "id" | "workspaces" | "users">;
    }) =>
      createDoc({
        ...data,
        collection: "task",
      }),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["task", variables.workspaceId],
      });
    },
  });
  return { createTask, status };
};

export const useGetFarmTasks = (
  workspaceId: string,
  userId: string,
  farmId: string,
) => {
  const {
    data: tasks,
    status,
    error,
  } = useQuery({
    queryKey: ["tasks", workspaceId, farmId],
    queryFn: () =>
      getFarmDocs({
        collection: "tasks",
        workspaceId,
        userId,
        farmId,
      }),
    enabled: !!workspaceId && !!userId && !!farmId,
  });
  return { tasks, error, status };
};

export const useGetTasks = (workspaceId: string, userId: string) => {
  const {
    data: tasks,
    status,
    error,
  } = useQuery({
    queryKey: ["tasks", workspaceId],
    queryFn: () =>
      getDocs({
        collection: "tasks",
        workspaceId,
        userId,
      }),
  });
  return { tasks, error, status };
};
