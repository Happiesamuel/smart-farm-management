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


// One thing to consider — if you want dashboard stats to reflect mutations immediately, you can add queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] }) and ["analytics"] inside your createDoc, updateDoc, and deleteDoc mutation onSuccess callbacks. That way the staleTime guards against unnecessary background refetches, but the data still updates instantly after user actions.