"use client";
import { SalesInfo } from "@/lib/types";
import { createDoc, getDocs, getFarmDocs } from "@/servers/crud-actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const SALES_STALE_TIME = 1000 * 60 * 2; // 2 minutes

export const useCreateSales = () => {
  const queryClient = useQueryClient();

  const { mutate: createSales, status } = useMutation({
    mutationFn: async (data: {
      workspaceId: string;
      userId: string;
      data: Omit<SalesInfo, "id" | "workspaces" | "users">;
    }) => {
      const result = await createDoc({ ...data, collection: "sales" });
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["sales", variables.workspaceId] });
      queryClient.invalidateQueries({ queryKey: ["farm-finance", variables.workspaceId] });
    },
  });

  return { createSales, status };
};

export const useGetFarmSales = (
  workspaceId: string | null,
  userId: string | null,
  farmId: string,
) => {
  const { data: sales, status, error } = useQuery({
    queryKey: ["sales", workspaceId, farmId],
    queryFn: async () => {
      const result = await getFarmDocs({
        collection: "sales",
        workspaceId: workspaceId as string,
        userId: userId as string,
        farmId,
      });
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!workspaceId && !!userId && !!farmId,
    staleTime: SALES_STALE_TIME,
  });

  return { sales, error, status };
};

export const useGetSales = (
  workspaceId: string | null,
  userId: string | null,
) => {
  const { data: sales, status, error } = useQuery({
    queryKey: ["sales", workspaceId],
    queryFn: async () => {
      const result = await getDocs({
        collection: "sales",
        workspaceId: workspaceId as string,
        userId: userId as string,
      });
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
     enabled: !!workspaceId && !!userId,
    staleTime: SALES_STALE_TIME,
  });

  return { sales, error, status };
};