"use client";
import {
  getDashboardStats,
  getInsightData,
  getLandingStats,
  getWorkspaceAnalytics,
} from "@/servers/analytics";
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
export const useLandingStats = () => {
  const { data, status, error } = useQuery({
    queryKey: ["landing-stats"],
    queryFn: () => getLandingStats(),
  });
  return { data, status, error };
};

export const useInsights = (
  workspaceId: string | null,
  userId: string | null,
) => {
  const { data, status, error } = useQuery({
    queryKey: ["insights", workspaceId],

    queryFn: async () => {
      const result = await getInsightData({
        workspaceId: workspaceId as string,
        userId: userId as string,
      });

      if (!result.success) {
        throw new Error(result.error);
      }

      return result.data;
    },

    enabled: !!workspaceId && !!userId,

    staleTime: 1000 * 60 * 10,
  });

  return {
    insights: data,
    status,
    error,
  };
};
