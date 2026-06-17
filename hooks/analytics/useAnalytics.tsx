"use client";
import { getDashboardStats, getWorkspaceAnalytics } from "@/servers/analytics";
import { useQuery } from "@tanstack/react-query";

export const useGetAnalytics = (workspaceId: string, userId: string) => {
  const { data, status, error } = useQuery({
    queryKey: ["analytics", workspaceId],
    queryFn: () =>
      getWorkspaceAnalytics({
        workspaceId,
        userId,
      }),
    enabled: !!workspaceId && !!userId,
  });
  return { data, status, error };
};

export const useDashboardStats = (workspaceId: string, userId: string) => {
  const { data, status, error } = useQuery({
    queryKey: ["dashboard-stats", workspaceId],
    queryFn: () =>
      getDashboardStats({
        workspaceId,
        userId,
      }),
    enabled: !!workspaceId && !!userId,
  });
  return { data, status, error };
};
