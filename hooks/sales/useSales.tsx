"use client";
import { SalesInfo } from "@/lib/types";
import { createDoc } from "@/servers/crud-actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateSales = () => {
  const queryClient = useQueryClient();

  const { mutate: createSales, status } = useMutation({
    mutationFn: (data: {
      workspaceId: string;
      userId: string;
      data: Omit<SalesInfo, "id" | "workspaces" | "users">;
    }) =>
      createDoc({
        ...data,
        collection: "sales",
      }),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["sales", variables.workspaceId],
      });
    },
  });
  return { createSales, status };
};
