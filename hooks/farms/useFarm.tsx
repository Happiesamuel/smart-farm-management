"use client";
import { FarmInfo } from "@/lib/types";
import { getFarmFinanceStats } from "@/servers/analytics";
import { createDoc, getDocs } from "@/servers/crud-actions";
import {
  getAllFarmStats,
  getAssignedFarms,
  getFarmsWithStats,
  getSingleFarmDocs,
} from "@/servers/farm-actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const FARMS_STALE_TIME = 1000 * 60 * 10;        // 10 minutes — structural data, rarely changes
const FARM_STATS_STALE_TIME = 1000 * 60 * 5;    // 5 minutes — aggregated stats, changes when sub-records change
const FARM_FINANCE_STALE_TIME = 1000 * 60 * 2;  // 2 minutes — financial, more sensitive to changes
const ASSIGNED_FARMS_STALE_TIME = 1000 * 60 * 3; // 3 minutes — based on task assignments

export const useCreateFarm = () => {
  const queryClient = useQueryClient();

  const { mutate: createFarm, status } = useMutation({
    mutationFn: async (data: {
      workspaceId: string;
      userId: string;
      data: Omit<FarmInfo, "id" | "workspaces" | "users">;
    }) => {
      const result = await createDoc({ ...data, collection: "farms" });
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["farms", variables.workspaceId] });
      queryClient.invalidateQueries({ queryKey: ["farms-with-stats", variables.workspaceId] });
      queryClient.invalidateQueries({ queryKey: ["all-farm-stats", variables.workspaceId] });
    },
  });

  return { createFarm, status };
};

export const useGetFarm = (
  workspaceId: string | null,
  userId: string | null,
) => {
  const { data: farms, status, error } = useQuery({
    queryKey: ["farms", workspaceId],
    queryFn: async () => {
      const result = await getDocs({
        collection: "farms",
        workspaceId: workspaceId as string,
        userId: userId as string,
      });
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!workspaceId && !!userId,
    staleTime: FARMS_STALE_TIME,
  });

  return { farms, error, status };
};

export const useGetSingleFarm = (
  workspaceId: string | null,
  userId: string | null,
  farmId: string,
) => {
  const { data: farm, status, error } = useQuery({
    queryKey: ["farms", workspaceId, farmId],
    queryFn: async () => {
      const result = await getSingleFarmDocs({
        collection: "farms",
        workspaceId: workspaceId as string,
        userId: userId as string,
        farmId,
      });
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!workspaceId && !!userId && !!farmId,
    staleTime: FARMS_STALE_TIME,
  });

  return { farm, error, status };
};

export const useGetFarmsWithStats = (
  workspaceId: string | null,
  userId: string | null,
) => {
  const { data: farms, status, error } = useQuery({
    queryKey: ["farms-with-stats", workspaceId],
    queryFn: async () => {
      const result = await getFarmsWithStats({
        workspaceId: workspaceId as string,
        userId: userId as string,
      });
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!workspaceId && !!userId,
    staleTime: FARM_STATS_STALE_TIME,
  });

  return { farms, status, error };
};

export const useGetAllFarmStats = (
  workspaceId: string | null,
  userId: string | null,
) => {
  const { data, status, error } = useQuery({
    queryKey: ["all-farm-stats", workspaceId],
    queryFn: async () => {
      const result = await getAllFarmStats({
        workspaceId: workspaceId as string,
        userId: userId as string,
      });
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!workspaceId && !!userId,
    staleTime: FARM_STATS_STALE_TIME,
  });

  return { data, status, error };
};

export const useGetFarmFinanceStats = (
  workspaceId: string | null,
  farmId: string,
  userId: string | null,
) => {
  const { data, status, error } = useQuery({
    queryKey: ["farm-finance", workspaceId, farmId],
    queryFn: async () => {
      const result = await getFarmFinanceStats({
        workspaceId: workspaceId as string,
        farmId,
        userId: userId as string,
      });
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!workspaceId && !!farmId && !!userId,
    staleTime: FARM_FINANCE_STALE_TIME,
  });

  return { data, status, error };
};

export const useAssignedFarms = (
  workspaceId: string | null,
  userId: string | null,
) => {
  const { data, status, error } = useQuery({
    queryKey: ["farms", workspaceId, userId],
    queryFn: async () => {
      const result = await getAssignedFarms({
        workspaceId: workspaceId!,
        userId: userId!,
      });
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!workspaceId && !!userId,
    staleTime: ASSIGNED_FARMS_STALE_TIME,
  });

  return { data, status, error };
};