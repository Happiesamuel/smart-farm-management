"use client";
import { SalesInfo } from "@/lib/types";
import { createDoc, getDocs, getFarmDocs } from "@/servers/crud-actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateSales = () => {
  const queryClient = useQueryClient();

  const { mutate: createSales, status } = useMutation({
    mutationFn: (data: {
      workspaceId: string;
      userId: string;
      data: Omit<SalesInfo, "id" | "workspaces" | "users">;
    }) =>
      createDoc({
        ...data,
        collection: "sales",
      }),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["sales", variables.workspaceId],
      });
    },
  });
  return { createSales, status };
};

export const useGetFarmSales = (
  workspaceId: string|null,
  userId: string|null,
  farmId: string,
) => {
  const {
    data: sales,
    status,
    error,
  } = useQuery({
    queryKey: ["sales", workspaceId, farmId],
    queryFn: () =>
      getFarmDocs({
        collection: "sales",
        workspaceId:workspaceId as string,
        userId:userId as string,
        farmId,
      }),
    enabled: !!workspaceId && !!userId && !!farmId,
  });
  return { sales, error, status };
};

export const useGetSales = (workspaceId: string|null, userId: string|null) => {
  const {
    data: sales,
    status,
    error,
  } = useQuery({
    queryKey: ["sales", workspaceId],
    queryFn: () =>
      getDocs({
        collection: "sales",
        workspaceId:workspaceId as string,
        userId:userId as string,
      }),
  });
  return { sales, error, status };
};
