"use client";

import { FarmObj } from "@/lib/types";
import {
  createFarm,
  getFarm,
  getFarmInWorkspace,
} from "@/servers/farm-actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const FARMS_STALE_TIME = 1000 * 60 * 10; // 10 minutes — structural data

export function useCreateFarm() {
  const queryClient = useQueryClient();
  const { mutate: create, status, error } = useMutation({
    mutationFn: async (obj: FarmObj) => {
      const result = await createFarm(obj);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["farms", variables.workspaces] });
      queryClient.invalidateQueries({ queryKey: ["farms-with-stats", variables.workspaces] });
      queryClient.invalidateQueries({ queryKey: ["all-farm-stats", variables.workspaces] });
    },
  });

  return { create, status, error };
}

export function useGetFarm(userId: string) {
  const { data: farms, status, error, refetch } = useQuery({
    queryKey: ["farm", userId],
    queryFn: async () => {
      const result = await getFarm(userId);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!userId,
    staleTime: FARMS_STALE_TIME,
  });

  return { farms, status, error, refetch };
}

export function useGetFarmInWorkspace(userId: string, workspaceId: string) {
  const { data: farms, status, error, refetch } = useQuery({
    queryKey: ["farms", workspaceId],
    queryFn: async () => {
      const result = await getFarmInWorkspace({ userId, workspaceId });
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!userId && !!workspaceId,
    staleTime: FARMS_STALE_TIME,
  });

  return { farms, status, error, refetch };
}