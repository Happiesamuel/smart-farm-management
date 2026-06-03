"use client";
import { HarvestInfo } from "@/lib/types";
import { createDoc, getDocs, getFarmDocs } from "@/servers/crud-actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateHavest = () => {
  const queryClient = useQueryClient();

  const { mutate: createHarvest, status } = useMutation({
    mutationFn: (data: {
      workspaceId: string;
      userId: string;
      data: Omit<HarvestInfo, "id" | "workspaces" | "users">;
    }) =>
      createDoc({
        ...data,
        collection: "harvests",
      }),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["harvests", variables.workspaceId],
      });
    },
  });
  return { createHarvest, status };
};
export const useGetFarmHarvest = (
  workspaceId: string,
  userId: string,
  farmId: string,
) => {
  const {
    data: harvests,
    status,
    error,
  } = useQuery({
    queryKey: ["harvests", workspaceId, farmId],
    queryFn: () =>
      getFarmDocs({
        collection: "harvests",
        workspaceId,
        userId,
        farmId,
      }),
    enabled: !!workspaceId && !!userId && !!farmId,
  });
  return { harvests, error, status };
};

export const useGetHarvest = (workspaceId: string, userId: string) => {
  const {
    data: harvests,
    status,
    error,
  } = useQuery({
    queryKey: ["harvests", workspaceId],
    queryFn: () =>
      getDocs({
        collection: "harvests",
        workspaceId,
        userId,
      }),
  });
  return { harvests, error, status };
};
