"use client";
import { CropInfo } from "@/lib/types";
import { createDoc } from "@/servers/crud-actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateCrop = () => {
  const queryClient = useQueryClient();

  const { mutate: createCrop, status } = useMutation({
    mutationFn: (data: {
      workspaceId: string;
      userId: string;
      data: Omit<CropInfo, "id" | "workspaces" | "users">;
    }) =>
      createDoc({
        ...data,
        collection: "crops",
      }),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["crops", variables.workspaceId],
      });
    },
  });
  return { createCrop, status };
};
