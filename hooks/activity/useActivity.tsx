"use client";
import { getDocs, getFarmDocs } from "@/servers/crud-actions";
import { useQuery } from "@tanstack/react-query";

export const useGetFarmActivity = (
  workspaceId: string | null,
  userId: string | null,
  farmId: string,
) => {
  const {
    data: activity,
    status,
    error,
  } = useQuery({
    queryKey: ["activity", workspaceId, farmId],
    queryFn: () =>
      getFarmDocs({
        collection: "activities",
        workspaceId: workspaceId as string,
        userId: userId as string,
        farmId,
      }),
    enabled: !!workspaceId && !!userId && !!farmId,
  });
  return { activity, error, status };
};

export const useGetActivity = (
  workspaceId: string | null,
  userId: string | null,
) => {
  const {
    data: activity,
    status,
    error,
  } = useQuery({
    queryKey: ["activity", workspaceId],
    queryFn: () =>
      getDocs({
        collection: "activities",
        workspaceId: workspaceId as string,
        userId: userId as string,
      }),
  });
  return { activity, error, status };
};
