"use client";
import { HarvestInfo } from "@/lib/types";
import { createDoc } from "@/servers/crud-actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateHavest = () => {
  const queryClient = useQueryClient();

  const { mutate: createHarvest, status } = useMutation({
    mutationFn: (data: {
      workspaceId: string;
      userId: string;
      data: Omit<HarvestInfo, "id" | "workspaces" | "users">;
    }) =>
      createDoc({
        ...data,
        collection: "harvests",
      }),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["harvests", variables.workspaceId],
      });
    },
  });
  return { createHarvest, status };
};
