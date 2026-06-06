"use client";
import { CropInfo } from "@/lib/types";
import { createDoc, getDocs, getFarmDocs } from "@/servers/crud-actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateCrop = () => {
  const queryClient = useQueryClient();

  const { mutate: createCrop, status } = useMutation({
    mutationFn: (data: {
      workspaceId: string;
      userId: string;
      data: Omit<CropInfo, "id" | "workspaces" | "users">;
    }) =>
      createDoc({
        ...data,
        collection: "crops",
      }),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["crops", variables.workspaceId],
      });
    },
  });
  return { createCrop, status };
};
export const useGetFarmCrops = (
  workspaceId: string | null,
  userId: string | null,
  farmId: string,
) => {
  const {
    data: crops,
    status,
    error,
  } = useQuery({
    queryKey: ["crops", workspaceId, farmId],
    queryFn: () =>
      getFarmDocs({
        collection: "crops",
        workspaceId: workspaceId as string,
        userId: userId as string,
        farmId: farmId as string,
      }),
    enabled: !!workspaceId && !!userId && !!farmId,
  });
  return { crops, error, status };
};

export const useGetCrops = (
  workspaceId: string | null,
  userId: string | null,
) => {
  const {
    data: crops,
    status,
    error,
  } = useQuery({
    queryKey: ["crops", workspaceId],
    queryFn: () =>
      getDocs({
        collection: "crops",
        workspaceId: workspaceId as string,
        userId: userId as string,
      }),
    enabled: !!workspaceId && !!userId,
  });
  return { crops, error, status };
};
