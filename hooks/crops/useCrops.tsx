"use client";
import { CropInfo } from "@/lib/types";
import { createDoc, getDocs, getFarmDocs } from "@/servers/crud-actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const CROPS_STALE_TIME = 1000 * 60 * 5; // 5 minutes — seasonal data, changes moderately

export const useCreateCrop = () => {
  const queryClient = useQueryClient();

  const { mutate: createCrop, status } = useMutation({
    mutationFn: async (data: {
      workspaceId: string;
      userId: string;
      data: Omit<CropInfo, "id" | "workspaces" | "users">;
    }) => {
      const result = await createDoc({ ...data, collection: "crops" });
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["crops", variables.workspaceId] });
    },
  });

  return { createCrop, status };
};

export const useGetFarmCrops = (
  workspaceId: string | null,
  userId: string | null,
  farmId: string,
) => {
  const { data: crops, status, error } = useQuery({
    queryKey: ["crops", workspaceId, farmId],
    queryFn: async () => {
      const result = await getFarmDocs({
        collection: "crops",
        workspaceId: workspaceId as string,
        userId: userId as string,
        farmId: farmId as string,
      });
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!workspaceId && !!userId && !!farmId,
    staleTime: CROPS_STALE_TIME,
  });

  return { crops, error, status };
};

export const useGetCrops = (
  workspaceId: string | null,
  userId: string | null,
) => {
  const { data: crops, status, error } = useQuery({
    queryKey: ["crops", workspaceId],
    queryFn: async () => {
      const result = await getDocs({
        collection: "crops",
        workspaceId: workspaceId as string,
        userId: userId as string,
      });
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!workspaceId && !!userId,
    staleTime: CROPS_STALE_TIME,
  });

  return { crops, error, status };
};