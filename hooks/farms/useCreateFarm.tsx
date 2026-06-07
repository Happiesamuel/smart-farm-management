"use client";

import { FarmObj } from "@/lib/types";
import {
  createFarm,
  getFarm,
  getFarmInWorkspace,
} from "@/servers/farm-actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useCreateFarm() {
  const queryClient = useQueryClient();
  const {
    mutate: create,
    status,
    error,
  } = useMutation({
    mutationFn: async (obj: FarmObj) => await createFarm(obj),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          "farms-with-stats",
          "farms",
          "all-farm-stats",
          variables.workspaces,
        ],
      });
    },
  });

  return { create, status, error };
}
export function useGetFarm(userId: string) {
  const {
    data: farms,
    status,
    error,
    refetch,
  } = useQuery({
    queryKey: ["farm"],
    queryFn: async () => await getFarm(userId),
    enabled: !!userId,
  });

  return { farms, status, error, refetch };
}
export function useGetFarmInWorkspace(userId: string, workspaceId: string) {
  const {
    data: farms,
    status,
    error,
    refetch,
  } = useQuery({
    queryKey: ["farms", workspaceId],
    queryFn: async () => await getFarmInWorkspace({ userId, workspaceId }),
    enabled: !!userId && !!workspaceId,
  });

  return { farms, status, error, refetch };
}
