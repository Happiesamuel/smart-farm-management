"use client";
import { HarvestInfo } from "@/lib/types";
import { createDoc, getDocs, getFarmDocs } from "@/servers/crud-actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const HARVESTS_STALE_TIME = 1000 * 60 * 5; // 5 minutes

export const useCreateHavest = () => {
  const queryClient = useQueryClient();

  const { mutate: createHarvest, status } = useMutation({
    mutationFn: async (data: {
      workspaceId: string;
      userId: string;
      data: Omit<HarvestInfo, "id" | "workspaces" | "users">;
    }) => {
      const result = await createDoc({ ...data, collection: "harvests" });
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["harvests", variables.workspaceId] });
    },
  });

  return { createHarvest, status };
};

export const useGetFarmHarvest = (
  workspaceId: string | null,
  userId: string | null,
  farmId: string,
) => {
  const { data: harvests, status, error } = useQuery({
    queryKey: ["harvests", workspaceId, farmId],
    queryFn: async () => {
      const result = await getFarmDocs({
        collection: "harvests",
        workspaceId: workspaceId as string,
        userId: userId as string,
        farmId: farmId as string,
      });
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!workspaceId && !!userId && !!farmId,
    staleTime: HARVESTS_STALE_TIME,
  });

  return { harvests, error, status };
};

export const useGetHarvest = (
  workspaceId: string | null,
  userId: string | null,
) => {
  const { data: harvests, status, error } = useQuery({
    queryKey: ["harvests", workspaceId],
    queryFn: async () => {
      const result = await getDocs({
        collection: "harvests",
        workspaceId: workspaceId as string,
        userId: userId as string,
      });
      if (!result.success) throw new Error(result.error);
      return result.data;
    }, enabled: !!workspaceId && !!userId,
    staleTime: HARVESTS_STALE_TIME,
  });

  return { harvests, error, status };
};