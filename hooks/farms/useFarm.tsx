"use client";
import { FarmInfo } from "@/lib/types";
import { createDoc, getDocs } from "@/servers/crud-actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateFarm = () => {
  const queryClient = useQueryClient();

  const { mutate: createFarm, status } = useMutation({
    mutationFn: (data: {
      workspaceId: string;
      userId: string;
      data: Omit<FarmInfo, "id" | "workspaces" | "users">;
    }) =>
      createDoc({
        ...data,
        collection: "farms",
      }),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["farms", variables.workspaceId],
      });
    },
  });
  return { createFarm, status };
};
export const useGetFarm = (workspaceId: string, userId: string) => {
  const {
    data: farms,
    status,
    error,
  } = useQuery({
    queryKey: ["farms", workspaceId],
    queryFn: () =>
      getDocs({
        collection: "farms",
        workspaceId,
        userId,
      }),
  });
  return { farms, error, status };
};
