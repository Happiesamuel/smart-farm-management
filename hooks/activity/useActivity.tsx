"use client";
import { getDocs, getFarmDocs } from "@/servers/crud-actions";
import { useQuery } from "@tanstack/react-query";

const ACTIVITY_STALE_TIME = 1000 * 30; // 30 seconds — frequently updated, near real-time

export const useGetFarmActivity = (
  workspaceId: string | null,
  userId: string | null,
  farmId: string,
) => {
  const { data: activity, status, error } = useQuery({
    queryKey: ["activity", workspaceId, farmId],
    queryFn: async () => {
      const result = await getFarmDocs({
        collection: "activities",
        workspaceId: workspaceId as string,
        userId: userId as string,
        farmId,
      });
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!workspaceId && !!userId && !!farmId,
    staleTime: ACTIVITY_STALE_TIME,
  });

  return { activity, error, status };
};

export const useGetActivity = (
  workspaceId: string | null,
  userId: string | null,
) => {
  const { data: activity, status, error } = useQuery({
    queryKey: ["activity", workspaceId],
    queryFn: async () => {
      const result = await getDocs({
        collection: "activities",
        workspaceId: workspaceId as string,
        userId: userId as string,
      });
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!workspaceId && !!userId,
    staleTime: ACTIVITY_STALE_TIME,
  });

  return { activity, error, status };
};