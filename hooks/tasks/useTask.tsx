"use client";
import { TaskInfo } from "@/lib/types";
import { createDoc } from "@/servers/crud-actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
