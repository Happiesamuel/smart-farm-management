"use client";
import { FieldInfo } from "@/lib/types";
import { createDoc } from "@/servers/crud-actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateField = () => {
  const queryClient = useQueryClient();

  const { mutate: createField, status } = useMutation({
    mutationFn: (data: {
      workspaceId: string;
      userId: string;
      data: Omit<FieldInfo, "id" | "workspaces" | "users">;
    }) =>
      createDoc({
        ...data,
        collection: "fields",
      }),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["fields", variables.workspaceId],
      });
    },
  });
  return { createField, status };
};
