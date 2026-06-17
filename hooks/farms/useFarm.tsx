"use client";
import { FarmInfo } from "@/lib/types";
import { getFarmFinanceStats } from "@/servers/analytics";
import { createDoc, getDocs } from "@/servers/crud-actions";
import {
  getAllFarmStats,
  getFarmsWithStats,
  getSingleFarmDocs,
} from "@/servers/farm-actions";
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
        queryKey: [
          "farms",
          "farms-with-stats",
          "all-farm-stats",
          variables.workspaceId,
        ],
      });
    },
  });
  return { createFarm, status };
};
export const useGetFarm = (
  workspaceId: string | null,
  userId: string | null,
) => {
  const {
    data: farms,
    status,
    error,
  } = useQuery({
    queryKey: ["farms", workspaceId],
    queryFn: () =>
      getDocs({
        collection: "farms",
        workspaceId: workspaceId as string,
        userId: userId as string,
      }),
    enabled: !!workspaceId && !!userId,
  });
  return { farms, error, status };
};
export const useGetSingleFarm = (
  workspaceId: string | null,
  userId: string | null,
  farmId: string,
) => {
  const {
    data: farm,
    status,
    error,
  } = useQuery({
    queryKey: ["farms", workspaceId, farmId],
    queryFn: () =>
      getSingleFarmDocs({
        collection: "farms",
        workspaceId: workspaceId as string,
        userId: userId as string,
        farmId,
      }),
    enabled: !!workspaceId && !!userId && !!farmId,
  });
  return { farm, error, status };
};

export const useGetFarmsWithStats = (
  workspaceId: string | null,
  userId: string | null,
) => {
  const {
    data: farms,
    status,
    error,
  } = useQuery({
    queryKey: ["farms-with-stats", workspaceId],
    queryFn: () =>
      getFarmsWithStats({
        workspaceId: workspaceId as string,
        userId: userId as string,
      }),
    enabled: !!workspaceId && !!userId,
  });
  return {
    farms,
    status,
    error,
  };
};

export const useGetAllFarmStats = (
  workspaceId: string | null,
  userId: string | null,
) => {
  const { data, status, error } = useQuery({
    queryKey: ["all-farm-stats", workspaceId],
    queryFn: () =>
      getAllFarmStats({
        workspaceId: workspaceId as string,
        userId: userId as string,
      }),
    enabled: !!workspaceId && !!userId,
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
    queryFn: () =>
      getFarmFinanceStats({
        workspaceId: workspaceId as string,
        farmId,
        userId: userId as string,
      }),
    enabled: !!workspaceId && !!farmId && !!userId,
  });
  return { data, status, error };
};
